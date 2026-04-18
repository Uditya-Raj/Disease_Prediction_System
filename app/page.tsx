import Link from "next/link";
import {
  ArrowRight,
  Brain,
  Layers,
  ShieldAlert,
  Sparkles,
  Stethoscope,
} from "lucide-react";

const features = [
  {
    icon: Stethoscope,
    title: "Symptom-first flow",
    body: "Search and multi-select symptoms with a fast, keyboard-friendly picker.",
  },
  {
    icon: Brain,
    title: "Mock intelligence",
    body: "Rule-based demo predictions with confidence bars — ready to swap for XGBoost output.",
  },
  {
    icon: Layers,
    title: "Results you can scan",
    body: "Ranked cards with overlap hints so the story behind each suggestion is visible.",
  },
  {
    icon: ShieldAlert,
    title: "Safety forward",
    body: "Clear disclaimers and an About page that sets expectations for this academic build.",
  },
];

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-hero-glow" />
      <div className="pointer-events-none absolute inset-0 bg-grid-fade opacity-90" />

      <section className="relative mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="animate-fade-in inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            Academic prototype
          </p>
          <h1 className="font-display mt-6 text-balance text-4xl font-bold tracking-tight text-ink sm:text-5xl md:text-6xl">
            Clarity at the intersection of{" "}
            <span className="bg-gradient-to-r from-accent to-care bg-clip-text text-transparent">
              symptoms
            </span>{" "}
            and care
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink-muted">
            Enter symptoms and basic context to explore probable conditions — powered by
            curated mock logic today, designed for a real ML backend tomorrow.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/predict"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground shadow-lift transition hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Start prediction
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-xl border border-ink/15 bg-surface px-6 py-3.5 text-sm font-semibold text-ink shadow-sm transition hover:bg-surface-2"
            >
              Read disclaimer
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-20 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="animate-slide-up rounded-2xl border border-ink/10 bg-surface/90 p-5 shadow-card backdrop-blur"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <f.icon className="h-8 w-8 text-accent" aria-hidden />
              <h2 className="mt-4 font-display text-base font-semibold text-ink">
                {f.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{f.body}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-3xl rounded-2xl border border-warn/25 bg-gradient-to-br from-warn/10 to-transparent p-6 text-center sm:p-8">
          <p className="text-sm font-medium text-ink">
            This tool does not diagnose disease and is not a substitute for a licensed clinician.
            If you have severe or worsening symptoms, seek emergency care.
          </p>
        </div>
      </section>
    </div>
  );
}
