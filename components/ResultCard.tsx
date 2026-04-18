import { Stethoscope } from "lucide-react";
import { ConfidenceBar } from "@/components/ConfidenceBar";
import { symptomLabel, type DiseasePrediction } from "@/lib/dummyData";
import { cn } from "@/lib/utils";

interface ResultCardProps {
  prediction: DiseasePrediction;
  rank: number;
  className?: string;
}

export function ResultCard({ prediction, rank, className }: ResultCardProps) {
  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-ink/10 bg-surface p-5 shadow-card transition hover:shadow-lift",
        className
      )}
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/10 blur-2xl transition group-hover:bg-accent/15" />
      <div className="relative flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-2 text-sm font-bold text-accent ring-1 ring-ink/10">
              {rank}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <Stethoscope
                  className="h-4 w-4 text-ink-muted opacity-70"
                  aria-hidden
                />
                <h3 className="font-display text-lg font-semibold tracking-tight text-ink">
                  {prediction.name}
                </h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {prediction.summary}
              </p>
            </div>
          </div>
        </div>

        <ConfidenceBar value={prediction.confidence} />

        {prediction.matchedSymptoms.length > 0 ? (
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-ink-muted">
              Symptom overlap (demo)
            </p>
            <ul className="flex flex-wrap gap-2">
              {prediction.matchedSymptoms.map((s) => (
                <li
                  key={s}
                  className="rounded-full bg-care-soft px-2.5 py-1 text-xs font-medium text-care ring-1 ring-care/20"
                >
                  {symptomLabel(s)}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </article>
  );
}
