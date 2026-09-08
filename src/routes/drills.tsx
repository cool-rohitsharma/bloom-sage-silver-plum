import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { drills } from "@/data/catalog";
import { Paper } from "@/components/notes/paper";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/drills")({ component: Drills });

function Drills() {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  return (
    <div className="flex flex-col gap-5">
      <Paper>
        <p className="font-script text-2xl text-rule">write it, then uncover it</p>
        <h1 className="font-display text-4xl font-semibold">Drills</h1>
        <p className="mt-2 max-w-xl text-ink-soft">
          Stream programs and SQL from the original sheets, corrected where the cheat sheet was wrong
          (5th max is skip(4), not skip(1)).
        </p>
      </Paper>
      {drills.map((d) => {
        const shown = open[d.id];
        return (
          <article key={d.id} id={d.id} className="rounded-2xl border border-ink/10 bg-paper p-5">
            <h2 className="font-display text-2xl font-semibold">{d.title}</h2>
            <p className="mt-2 text-lg">{d.prompt}</p>
            <p className="mt-2 text-sm text-muted">Hint: {d.hint}</p>
            <div className="mt-3">
              <Button variant="outline" onClick={() => setOpen((s) => ({ ...s, [d.id]: !shown }))}>
                {shown ? "Hide solution" : "Show solution"}
              </Button>
            </div>
            {shown ? (
              <pre className="mt-4 overflow-x-auto rounded-lg bg-ink/[0.04] p-4 font-mono text-sm leading-relaxed">
                <code>{d.code}</code>
              </pre>
            ) : null}
            {shown && d.note ? <p className="mt-2 font-script text-xl text-rule">{d.note}</p> : null}
          </article>
        );
      })}
    </div>
  );
}
