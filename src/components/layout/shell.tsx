import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, Feather, Flame, Search, Timer } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Desk", icon: Feather },
  { to: "/notebook", label: "Notebook", icon: BookOpen },
  { to: "/ritual", label: "15 min", icon: Timer },
  { to: "/drills", label: "Drills", icon: Search },
  { to: "/traps", label: "Traps", icon: Flame },
] as const;

export function Shell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="desk-grain min-h-dvh text-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-paper focus:px-3 focus:py-2"
      >
        Skip to notes
      </a>
      <header className="sticky top-0 z-30 border-b border-ink/10 bg-paper/85 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <Link to="/" className="flex min-h-11 items-center gap-2">
            <span className="font-display text-xl font-semibold tracking-tight">Ink Desk</span>
            <span className="hidden font-script text-lg text-rule sm:inline">daily revision</span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {links.map((l) => {
              const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={cn(
                    "inline-flex min-h-11 items-center gap-1.5 rounded-md px-3 text-sm transition-colors duration-150",
                    active ? "bg-ink text-paper" : "text-ink-soft hover:bg-ink/6",
                  )}
                >
                  <l.icon className="size-4" strokeWidth={1.75} />
                  {l.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main id="main" className="mx-auto w-full max-w-6xl px-3 py-5 sm:px-5 sm:py-8">
        {children}
      </main>

      <nav
        className="fixed inset-x-0 bottom-0 z-30 border-t border-ink/10 bg-paper/95 pb-[env(safe-area-inset-bottom)] md:hidden"
        aria-label="Mobile"
      >
        <div className="grid grid-cols-5">
          {links.map((l) => {
            const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
            return (
              <Link
                key={l.to}
                to={l.to}
                className={cn(
                  "flex min-h-14 flex-col items-center justify-center gap-0.5 text-xs",
                  active ? "text-ink" : "text-muted",
                )}
              >
                <l.icon className="size-5" strokeWidth={active ? 2.2 : 1.7} />
                {l.label}
              </Link>
            );
          })}
        </div>
      </nav>
      <div className="h-16 md:hidden" />
    </div>
  );
}
