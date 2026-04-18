import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-surface-2/80 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-sm text-ink-muted">
          Educational prototype — not for clinical use.{" "}
          <Link href="/about" className="font-medium text-accent underline-offset-4 hover:underline">
            Disclaimer
          </Link>
        </p>
        <p className="text-xs text-ink-muted/80">
          Built with Next.js · Mock data only until ML backend is connected
        </p>
      </div>
    </footer>
  );
}
