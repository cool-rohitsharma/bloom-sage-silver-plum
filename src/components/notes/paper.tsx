import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Paper({
  children,
  className,
  ruled = true,
}: {
  children: ReactNode;
  className?: string;
  ruled?: boolean;
}) {
  return (
    <article
      className={cn(
        "w-full min-w-0 rounded-xl border border-ink/10",
        ruled ? "paper-sheet" : "bg-paper shadow-[var(--shadow-page)]",
        className,
      )}
    >
      <div className="py-6 pl-14 pr-4 sm:py-8 sm:pl-16 sm:pr-8">{children}</div>
    </article>
  );
}

export function SourcePill({ source }: { source: string }) {
  const text =
    source === "merged"
      ? "both sheets"
      : source === "filled"
        ? "filled gap"
        : source === "cheatcode"
          ? "CheatCode"
          : "Ultimate";
  return (
    <span className="inline-flex items-center rounded-full border border-ink/15 bg-wash/70 px-2.5 py-0.5 text-xs tracking-wide text-steel">
      {text}
    </span>
  );
}

export function LevelPill({ level }: { level: string }) {
  const text = level === "trap" ? "trap" : level === "deep" ? "deep" : "core";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs",
        level === "trap"
          ? "bg-rule/10 text-rule"
          : level === "deep"
            ? "bg-warn/10 text-warn"
            : "bg-ink/8 text-ink-soft",
      )}
    >
      {text}
    </span>
  );
}
