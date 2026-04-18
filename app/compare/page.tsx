import Link from "next/link";
import { MODEL_COMPARISON } from "@/lib/dummyData";
import { CheckCircle2, CircleDashed } from "lucide-react";

export const metadata = {
  title: "Model comparison",
};

export default function ComparePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <header className="mb-12 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent">
          Roadmap
        </p>
        <h1 className="font-display mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Model comparison
        </h1>
        <p className="mt-3 text-pretty text-ink-muted">
          Today you interact with a lightweight mock. This page tracks how a future trained
          model stack might sit beside it — accuracy, latency, and explainability are placeholders
          until real evaluation data exists.
        </p>
      </header>

      <div className="overflow-hidden rounded-3xl border border-ink/10 bg-surface shadow-lift">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-ink/10 bg-surface-2/90">
            <tr>
              <th className="px-5 py-4 font-display font-semibold text-ink">Model</th>
              <th className="hidden px-5 py-4 font-display font-semibold text-ink sm:table-cell">
                Status
              </th>
              <th className="hidden px-5 py-4 font-display font-semibold text-ink md:table-cell">
                Accuracy (est.)
              </th>
              <th className="hidden px-5 py-4 font-display font-semibold text-ink lg:table-cell">
                Latency
              </th>
            </tr>
          </thead>
          <tbody>
            {MODEL_COMPARISON.map((row) => (
              <tr
                key={row.model}
                className="border-b border-ink/5 last:border-0 hover:bg-surface-2/40"
              >
                <td className="px-5 py-5 align-top">
                  <div className="font-medium text-ink">{row.model}</div>
                  <p className="mt-2 max-w-md text-xs leading-relaxed text-ink-muted sm:text-sm">
                    {row.notes}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 sm:hidden">
                    <StatusPill status={row.status} />
                    <MetaChip label="Accuracy" value={row.accuracy} />
                    <MetaChip label="Latency" value={row.latencyMs} suffix="ms" />
                  </div>
                </td>
                <td className="hidden align-top sm:table-cell sm:px-5 sm:py-5">
                  <StatusPill status={row.status} />
                </td>
                <td className="hidden align-top md:table-cell md:px-5 md:py-5">
                  <span className="font-mono text-ink">
                    {row.accuracy === null ? "—" : `${Math.round(row.accuracy * 100)}%`}
                  </span>
                </td>
                <td className="hidden align-top lg:table-cell lg:px-5 lg:py-5">
                  <span className="font-mono text-ink">
                    {row.latencyMs === null ? "—" : `${row.latencyMs} ms`}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="mt-12 rounded-2xl border border-ink/10 bg-gradient-to-br from-surface-2 to-surface p-6 sm:p-8">
        <h2 className="font-display text-lg font-semibold text-ink">Integration sketch</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">
          The Next.js frontend can call a route handler or an external FastAPI service. Swap
          <code className="mx-1 rounded bg-surface-2 px-1.5 py-0.5 font-mono text-xs text-ink">
            getMockPredictions
          </code>
          for an async fetch that returns the same JSON shape — the UI is already structured for
          ranked diseases and confidence scores.
        </p>
        <Link
          href="/predict"
          className="mt-6 inline-flex text-sm font-semibold text-accent underline-offset-4 hover:underline"
        >
          Try the current mock flow →
        </Link>
      </section>
    </div>
  );
}

function StatusPill({ status }: { status: "active" | "planned" }) {
  const active = status === "active";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
        active
          ? "bg-care-soft text-care ring-1 ring-care/25"
          : "bg-surface-2 text-ink-muted ring-1 ring-ink/10"
      }`}
    >
      {active ? (
        <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
      ) : (
        <CircleDashed className="h-3.5 w-3.5" aria-hidden />
      )}
      {active ? "Active" : "Planned"}
    </span>
  );
}

function MetaChip({
  label,
  value,
  suffix,
}: {
  label: string;
  value: number | null;
  suffix?: string;
}) {
  return (
    <span className="rounded-md bg-surface-2 px-2 py-1 text-[11px] text-ink-muted">
      {label}:{" "}
      <span className="font-mono text-ink">
        {value === null ? "—" : `${value}${suffix ?? ""}`}
      </span>
    </span>
  );
}
