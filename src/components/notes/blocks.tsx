import { AlertTriangle, Compass, Layers, Lightbulb, Quote, Scale } from "lucide-react";
import type { Block } from "@/data/types";
import { cn } from "@/lib/utils";

const label: Record<string, { title: string; icon: typeof Lightbulb; tone: string }> = {
  idea: { title: "The idea", icon: Lightbulb, tone: "text-steel" },
  why: { title: "Why they ask", icon: Compass, tone: "text-steel" },
  when: { title: "When to use it", icon: Layers, tone: "text-steel" },
  tradeoff: { title: "Trade-off", icon: Scale, tone: "text-warn" },
  trap: { title: "Interview trap", icon: AlertTriangle, tone: "text-rule" },
  project: { title: "Say it in a project", icon: Quote, tone: "text-mastered" },
};

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="flex flex-col gap-6">
      {blocks.map((block, i) => (
        <BlockView key={i} block={block} />
      ))}
    </div>
  );
}

function BlockView({ block }: { block: Block }) {
  if (block.kind === "margin") {
    return <p className="margin-note text-2xl sm:text-3xl">{block.text}</p>;
  }
  if (block.kind === "code") {
    return (
      <figure className="overflow-hidden rounded-lg border border-ink/10 bg-ink/[0.03]">
        {block.caption ? (
          <figcaption className="border-b border-ink/10 px-4 py-2 font-script text-xl text-rule">
            {block.caption}
          </figcaption>
        ) : null}
        <pre className="overflow-x-auto px-4 py-3 font-mono text-sm leading-relaxed text-ink-soft">
          <code>{block.code}</code>
        </pre>
      </figure>
    );
  }
  if (block.kind === "table") {
    return (
      <figure className="overflow-x-auto">
        {block.caption ? (
          <figcaption className="mb-2 font-script text-xl text-rule">{block.caption}</figcaption>
        ) : null}
        <table className="w-full min-w-[28rem] border-collapse text-left text-sm">
          <thead>
            <tr>
              {block.headers.map((h) => (
                <th key={h} className="border-b-2 border-ink/20 px-3 py-2 font-display font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, ri) => (
              <tr key={ri} className="odd:bg-ink/[0.03]">
                {row.map((cell, ci) => (
                  <td key={ci} className="border-b border-ink/8 px-3 py-2 align-top text-ink-soft">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </figure>
    );
  }
  if (block.kind === "bullets") {
    return (
      <div>
        {block.title ? <h3 className="mb-2 font-display text-lg font-semibold">{block.title}</h3> : null}
        <ul className="flex flex-col gap-1.5">
          {block.items.map((item) => (
            <li key={item} className="flex gap-2 text-lg leading-snug text-ink-soft">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-rule" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const meta = label[block.kind];
  if (!meta) return <p className="text-[17px] leading-relaxed">{block.text}</p>;
  const Icon = meta.icon;
  return (
    <section className={cn("rounded-lg border border-ink/8 bg-paper-deep/40 px-4 py-3")}>
      <div className={cn("mb-1.5 flex items-center gap-2 text-sm font-medium", meta.tone)}>
        <Icon className="size-4" strokeWidth={1.8} />
        {meta.title}
      </div>
      <p className="text-lg leading-relaxed text-ink">{block.text}</p>
    </section>
  );
}
