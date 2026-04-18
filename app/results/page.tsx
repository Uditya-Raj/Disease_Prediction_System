"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ResultCard } from "@/components/ResultCard";
import {
  loadPredictionSession,
  type PredictionSessionPayload,
} from "@/lib/predictionSession";
import { symptomLabel, type Gender } from "@/lib/dummyData";

function formatGender(g: Gender): string {
  const labels: Record<Gender, string> = {
    female: "Female",
    male: "Male",
    other: "Other",
    prefer_not_say: "Prefer not to say",
  };
  return labels[g];
}
import { ArrowLeft, RefreshCw } from "lucide-react";

export default function ResultsPage() {
  const [data, setData] = useState<PredictionSessionPayload | null | undefined>(
    undefined
  );

  useEffect(() => {
    setData(loadPredictionSession());
  }, []);

  if (data === undefined) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <p className="text-ink-muted">Loading results…</p>
      </div>
    );
  }

  if (data === null) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center sm:px-6">
        <h1 className="font-display text-2xl font-bold text-ink">No results yet</h1>
        <p className="mt-3 text-ink-muted">
          Run the symptom form first — we store your last mock run for this browser tab only.
        </p>
        <Link
          href="/predict"
          className="mt-8 inline-flex items-center justify-center rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-card"
        >
          Go to predict
        </Link>
      </div>
    );
  }

  return (
    <div className="relative mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/predict"
          className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted transition hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Edit inputs
        </Link>
        <Link
          href="/predict"
          className="inline-flex items-center gap-2 text-sm font-semibold text-accent"
        >
          <RefreshCw className="h-4 w-4" aria-hidden />
          New prediction
        </Link>
      </div>

      <header className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent">
          Mock results
        </p>
        <h1 className="font-display mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Top probable conditions
        </h1>
        <p className="mt-3 text-ink-muted">
          Based on age {data.age} and your selected symptoms. Ordering reflects demo confidence
          only.
        </p>
      </header>

      <section
        aria-label="Patient context"
        className="mb-10 rounded-2xl border border-ink/10 bg-surface-2/80 p-5"
      >
        <h2 className="text-sm font-semibold text-ink">Session summary</h2>
        <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-ink-muted">Symptoms</dt>
            <dd className="mt-1 font-medium text-ink">
              {data.symptoms.map(symptomLabel).join(", ")}
            </dd>
          </div>
          <div>
            <dt className="text-ink-muted">Age & gender</dt>
            <dd className="mt-1 font-medium text-ink">
              {data.age} · {formatGender(data.gender)}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-ink-muted">Recorded</dt>
            <dd className="mt-1 font-medium text-ink">
              {new Date(data.createdAt).toLocaleString()}
            </dd>
          </div>
        </dl>
      </section>

      <ol className="space-y-5">
        {data.predictions.map((p, i) => (
          <li key={p.id} className="animate-slide-up" style={{ animationDelay: `${i * 80}ms` }}>
            <ResultCard prediction={p} rank={i + 1} />
          </li>
        ))}
      </ol>

      <div className="mt-12 rounded-2xl border border-accent/20 bg-accent/5 p-6">
        <p className="text-sm leading-relaxed text-ink">
          <strong className="font-semibold">Remember:</strong> these labels are illustrative
          outputs from simple rules. A future XGBoost model may rank conditions differently and
          should be validated on real clinical data before any real-world use.
        </p>
        <Link
          href="/compare"
          className="mt-4 inline-block text-sm font-semibold text-accent underline-offset-4 hover:underline"
        >
          See how models will compare →
        </Link>
      </div>
    </div>
  );
}
