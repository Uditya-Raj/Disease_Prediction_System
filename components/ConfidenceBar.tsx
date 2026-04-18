"use client";

import { cn } from "@/lib/utils";

interface ConfidenceBarProps {
  value: number;
  className?: string;
  label?: string;
}

export function ConfidenceBar({
  value,
  className,
  label = "Confidence",
}: ConfidenceBarProps) {
  const pct = Math.round(Math.min(1, Math.max(0, value)) * 100);

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-1.5 flex items-center justify-between gap-2 text-xs text-ink-muted">
        <span>{label}</span>
        <span className="font-mono tabular-nums text-ink">{pct}%</span>
      </div>
      <div
        className="relative h-2.5 overflow-hidden rounded-full bg-surface-2 ring-1 ring-ink/10"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${label}: ${pct}%`}
      >
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-accent via-care to-accent opacity-95 transition-[width] duration-700 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
