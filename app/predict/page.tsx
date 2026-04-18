"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SymptomSelector } from "@/components/SymptomSelector";
import { getMockPredictions, type Gender } from "@/lib/dummyData";
import { savePredictionSession } from "@/lib/predictionSession";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function PredictPage() {
  const router = useRouter();
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [age, setAge] = useState<number>(28);
  const [gender, setGender] = useState<Gender>("prefer_not_say");
  const [symptomError, setSymptomError] = useState<string | undefined>();
  const [pending, setPending] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (symptoms.length === 0) {
      setSymptomError("Select at least one symptom.");
      return;
    }
    setSymptomError(undefined);
    setPending(true);
    const predictions = getMockPredictions(symptoms, age, gender);
    savePredictionSession({
      symptoms,
      age,
      gender,
      predictions,
      createdAt: new Date().toISOString(),
    });
    router.push("/results");
  }

  return (
    <div className="relative mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-ink-muted transition hover:text-accent"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Back to home
      </Link>

      <header className="mb-10">
        <h1 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Symptom intake
        </h1>
        <p className="mt-3 max-w-xl text-pretty text-ink-muted">
          Add what you are experiencing. We will match against demo rules and show ranked
          suggestions with confidence scores.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="space-y-10 rounded-3xl border border-ink/10 bg-surface p-6 shadow-lift sm:p-8"
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="age" className="mb-2 block text-sm font-medium text-ink">
              Age
            </label>
            <input
              id="age"
              type="number"
              min={0}
              max={120}
              required
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full rounded-xl border border-ink/10 bg-surface-2 px-4 py-3 text-sm text-ink outline-none ring-accent/0 transition focus:border-accent/40 focus:ring-4 focus:ring-accent/15"
            />
          </div>
          <div>
            <label htmlFor="gender" className="mb-2 block text-sm font-medium text-ink">
              Gender
            </label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value as Gender)}
              className="w-full rounded-xl border border-ink/10 bg-surface-2 px-4 py-3 text-sm text-ink outline-none ring-accent/0 transition focus:border-accent/40 focus:ring-4 focus:ring-accent/15"
            >
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
              <option value="prefer_not_say">Prefer not to say</option>
            </select>
          </div>
        </div>

        <SymptomSelector
          value={symptoms}
          onChange={(ids) => {
            setSymptoms(ids);
            if (ids.length > 0) setSymptomError(undefined);
          }}
          error={symptomError}
        />

        <div className="flex flex-col gap-3 border-t border-ink/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink-muted">
            By continuing, you acknowledge this is a mock prototype for learning purposes.
          </p>
          <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-card transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {pending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                Running…
              </>
            ) : (
              "Get predictions"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
