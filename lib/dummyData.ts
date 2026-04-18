export type Gender = "female" | "male" | "other" | "prefer_not_say";

export interface DiseasePrediction {
  id: string;
  name: string;
  confidence: number;
  summary: string;
  matchedSymptoms: string[];
}

export interface ModelComparisonRow {
  model: string;
  status: "active" | "planned";
  accuracy: number | null;
  latencyMs: number | null;
  notes: string;
}

/** Canonical symptom ids used in the UI and mock engine */
export const SYMPTOM_OPTIONS: { id: string; label: string; category: string }[] = [
  { id: "fever", label: "Fever", category: "General" },
  { id: "cough", label: "Cough", category: "Respiratory" },
  { id: "sore_throat", label: "Sore throat", category: "Respiratory" },
  { id: "runny_nose", label: "Runny nose", category: "Respiratory" },
  { id: "chest_pain", label: "Chest pain", category: "Cardiovascular" },
  { id: "shortness_of_breath", label: "Shortness of breath", category: "Respiratory" },
  { id: "headache", label: "Headache", category: "Neurological" },
  { id: "nausea", label: "Nausea", category: "Digestive" },
  { id: "fatigue", label: "Fatigue", category: "General" },
  { id: "dizziness", label: "Dizziness", category: "Neurological" },
  { id: "abdominal_pain", label: "Abdominal pain", category: "Digestive" },
  { id: "rash", label: "Skin rash", category: "Dermatological" },
  { id: "joint_pain", label: "Joint pain", category: "Musculoskeletal" },
  { id: "loss_of_taste_smell", label: "Loss of taste or smell", category: "General" },
  { id: "chills", label: "Chills", category: "General" },
];

const RULES: {
  when: Set<string>;
  predictions: Omit<DiseasePrediction, "id" | "matchedSymptoms">[];
}[] = [
  {
    when: new Set(["fever", "cough", "sore_throat"]),
    predictions: [
      {
        name: "Common cold",
        confidence: 0.82,
        summary:
          "Typical viral upper-respiratory pattern. Rest, fluids, and monitoring are usually sufficient for mild cases.",
      },
      {
        name: "Influenza (flu)",
        confidence: 0.71,
        summary:
          "Seasonal flu can overlap with cold symptoms; higher fever and body aches are common differentiators in real clinics.",
      },
      {
        name: "Viral upper respiratory infection",
        confidence: 0.64,
        summary:
          "A broad category for non-specific viral illness affecting the nose and throat.",
      },
    ],
  },
  {
    when: new Set(["chest_pain", "shortness_of_breath"]),
    predictions: [
      {
        name: "Cardiac risk (non-specific)",
        confidence: 0.68,
        summary:
          "Mock output only. Chest pain with breathlessness warrants urgent real-world evaluation; this app does not diagnose heart conditions.",
      },
      {
        name: "Respiratory issue (non-specific)",
        confidence: 0.61,
        summary:
          "Could include asthma exacerbation, infection, or other lung-related causes—requires professional assessment.",
      },
    ],
  },
  {
    when: new Set(["headache", "nausea", "fatigue"]),
    predictions: [
      {
        name: "Migraine",
        confidence: 0.74,
        summary:
          "Classic triad overlap; migraines often include light sensitivity and throbbing pain (not modeled here).",
      },
      {
        name: "Viral fever",
        confidence: 0.58,
        summary:
          "Systemic viral illness may present with headache, nausea, and low energy.",
      },
      {
        name: "Dehydration",
        confidence: 0.52,
        summary:
          "Fluid imbalance can cause headache, nausea, and fatigue—especially with vomiting or heat exposure.",
      },
    ],
  },
  {
    when: new Set(["abdominal_pain", "nausea"]),
    predictions: [
      {
        name: "Gastroenteritis",
        confidence: 0.66,
        summary:
          "Inflammation of the stomach or intestines, often viral, with nausea and abdominal discomfort.",
      },
      {
        name: "Functional dyspepsia",
        confidence: 0.45,
        summary:
          "Chronic upper abdominal discomfort without a single structural cause—mock placeholder.",
      },
    ],
  },
  {
    when: new Set(["rash", "fever"]),
    predictions: [
      {
        name: "Viral exanthem",
        confidence: 0.59,
        summary:
          "Many viral illnesses produce fever with a diffuse rash; exact diagnosis needs examination.",
      },
      {
        name: "Allergic reaction (mild)",
        confidence: 0.41,
        summary:
          "Rash can be allergic; fever makes infection more likely—mock heuristic only.",
      },
    ],
  },
];

const FALLBACK: Omit<DiseasePrediction, "id" | "matchedSymptoms">[] = [
  {
    name: "Non-specific illness pattern",
    confidence: 0.48,
    summary:
      "Your selected symptoms do not strongly match a curated demo rule. In a real deployment, a model would score hundreds of conditions.",
  },
  {
    name: "Further information needed",
    confidence: 0.36,
    summary:
      "Try adding more specific symptoms or consult a clinician—this prototype uses simple keyword rules only.",
  },
];

function slugId(name: string, index: number): string {
  return `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${index}`;
}

function bestMatchingRule(selected: Set<string>) {
  let best: (typeof RULES)[0] | null = null;
  let bestScore = 0;

  for (const rule of RULES) {
    let score = 0;
    for (const s of rule.when) {
      if (selected.has(s)) score += 1;
    }
    const coverage = score / rule.when.size;
    if (coverage >= 0.66 && score > bestScore) {
      best = rule;
      bestScore = score;
    }
  }
  return best;
}

function jitter(confidence: number, age: number, seedSymptoms: string): number {
  const seed = (age + seedSymptoms.length * 7) % 17;
  const delta = (seed - 8) * 0.005;
  return Math.min(0.95, Math.max(0.15, confidence + delta));
}

/**
 * Deterministic mock predictions from selected symptom ids.
 */
export function getMockPredictions(
  symptomIds: string[],
  age: number,
  gender: Gender
): DiseasePrediction[] {
  void gender;
  const selected = new Set(symptomIds);
  const rule = bestMatchingRule(selected);

  const base = rule
    ? rule.predictions.map((p, i) => ({
        ...p,
        id: slugId(p.name, i),
        confidence: jitter(p.confidence, age, symptomIds.join(",")),
        matchedSymptoms: [...rule.when].filter((s) => selected.has(s)),
      }))
    : FALLBACK.map((p, i) => ({
        ...p,
        id: slugId(p.name, i + 100),
        confidence: jitter(p.confidence, age, symptomIds.join(",")),
        matchedSymptoms: symptomIds.slice(0, 4),
      }));

  return base.sort((a, b) => b.confidence - a.confidence);
}

export const MODEL_COMPARISON: ModelComparisonRow[] = [
  {
    model: "Rule-based mock (current)",
    status: "active",
    accuracy: null,
    latencyMs: 12,
    notes: "Deterministic demo logic for UI development; not trained on real patient data.",
  },
  {
    model: "Planned: XGBoost classifier",
    status: "planned",
    accuracy: null,
    latencyMs: null,
    notes: "Future integration via API route or FastAPI service with calibrated probabilities.",
  },
  {
    model: "Planned: calibration + explainability",
    status: "planned",
    accuracy: null,
    latencyMs: null,
    notes: "SHAP-style feature attributions per symptom after the core model ships.",
  },
];

export function symptomLabel(id: string): string {
  return SYMPTOM_OPTIONS.find((s) => s.id === id)?.label ?? id;
}
