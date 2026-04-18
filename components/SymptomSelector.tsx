"use client";

import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { SYMPTOM_OPTIONS } from "@/lib/dummyData";
import { cn } from "@/lib/utils";

interface SymptomSelectorProps {
  value: string[];
  onChange: (ids: string[]) => void;
  error?: string;
}

export function SymptomSelector({ value, onChange, error }: SymptomSelectorProps) {
  const [query, setQuery] = useState("");
  const selected = useMemo(() => new Set(value), [value]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SYMPTOM_OPTIONS;
    return SYMPTOM_OPTIONS.filter(
      (s) =>
        s.label.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
    );
  }, [query]);

  const byCategory = useMemo(() => {
    const map = new Map<string, typeof SYMPTOM_OPTIONS>();
    for (const s of filtered) {
      const list = map.get(s.category) ?? [];
      list.push(s);
      map.set(s.category, list);
    }
    return map;
  }, [filtered]);

  function toggle(id: string) {
    const next = new Set(value);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    onChange([...next]);
  }

  function remove(id: string) {
    onChange(value.filter((v) => v !== id));
  }

  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="symptom-search"
          className="mb-2 block text-sm font-medium text-ink"
        >
          Symptoms
        </label>
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted"
            aria-hidden
          />
          <input
            id="symptom-search"
            type="search"
            autoComplete="off"
            placeholder="Search symptoms (e.g. fever, cough)…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-ink/10 bg-surface py-3 pl-10 pr-4 text-sm text-ink shadow-sm outline-none ring-accent/0 transition focus:border-accent/40 focus:ring-4 focus:ring-accent/15"
          />
        </div>
        {error ? (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400" role="alert">
            {error}
          </p>
        ) : null}
      </div>

      {value.length > 0 ? (
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-ink-muted">
            Selected ({value.length})
          </p>
          <div className="flex flex-wrap gap-2">
            {value.map((id) => {
              const opt = SYMPTOM_OPTIONS.find((o) => o.id === id);
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => remove(id)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1.5 text-sm font-medium text-accent ring-1 ring-accent/20 transition hover:bg-accent/25"
                >
                  {opt?.label ?? id}
                  <X className="h-3.5 w-3.5 opacity-70" aria-hidden />
                  <span className="sr-only">Remove {opt?.label ?? id}</span>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      <div
        className="max-h-[min(420px,55vh)] overflow-y-auto rounded-2xl border border-ink/10 bg-surface-2/50 p-3 ring-1 ring-ink/5"
        role="group"
        aria-label="Symptom list"
      >
        {filtered.length === 0 ? (
          <p className="px-2 py-8 text-center text-sm text-ink-muted">
            No symptoms match “{query}”. Try another term.
          </p>
        ) : (
          [...byCategory.entries()].map(([category, items]) => (
            <div key={category} className="mb-4 last:mb-0">
              <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-ink-muted">
                {category}
              </p>
              <ul className="grid gap-1 sm:grid-cols-2">
                {items.map((s) => {
                  const isOn = selected.has(s.id);
                  return (
                    <li key={s.id}>
                      <button
                        type="button"
                        onClick={() => toggle(s.id)}
                        className={cn(
                          "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition",
                          isOn
                            ? "bg-accent text-accent-foreground shadow-sm ring-2 ring-accent/30"
                            : "bg-surface hover:bg-surface-2 hover:ring-1 hover:ring-ink/10"
                        )}
                      >
                        <span className="font-medium">{s.label}</span>
                        <span
                          className={cn(
                            "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-[10px] font-bold",
                            isOn
                              ? "border-accent-foreground/30 bg-accent-foreground/15"
                              : "border-ink/15 bg-surface-2"
                          )}
                          aria-hidden
                        >
                          {isOn ? "✓" : ""}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
