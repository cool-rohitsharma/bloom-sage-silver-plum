import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { chapters, getTopic, searchTopics, topicsForChapter } from "@/data/catalog";
import { statusOf, useProgress } from "@/lib/progress";
import { Input } from "@/components/ui/input";
import { LevelPill, SourcePill } from "@/components/notes/paper";
import type { Level, SourceTag } from "@/data/types";

export const Route = createFileRoute("/notebook")({ component: Notebook });

function Notebook() {
  const statuses = useProgress((s) => s.statuses);
  const [q, setQ] = useState("");
  const [level, setLevel] = useState<Level | "all">("all");
  const [source, setSource] = useState<SourceTag | "all">("all");

  const filtered = useMemo(() => {
    return searchTopics(q).filter((t) => {
      if (level !== "all" && t.level !== level) return false;
      if (source !== "all" && t.source !== source) return false;
      return true;
    });
  }, [q, level, source]);

  const searching = Boolean(q) || level !== "all" || source !== "all";

  return (
    <div className="flex flex-col gap-5">
      <article className="paper-sheet rounded-xl border border-ink/10">
        <div className="py-6 pl-14 pr-4 sm:py-8 sm:pl-16 sm:pr-8">
          <p className="font-script text-2xl text-rule">the whole book, once</p>
          <h1 className="font-display text-4xl font-semibold">Notebook</h1>
          <p className="mt-2 max-w-xl text-ink-soft">
            Search across every page. Filter by depth or origin. Work a chapter top to bottom.
          </p>
          <div className="mt-5">
            <label className="sr-only" htmlFor="search">
              Search topics
            </label>
            <Input
              id="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="HashMap, saga, volatile, N+1…"
            />
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {(["all", "core", "deep", "trap"] as const).map((l) => (
              <FilterChip key={l} active={level === l} onClick={() => setLevel(l)}>
                {l}
              </FilterChip>
            ))}
            <span className="mx-1 text-faint">/</span>
            {(["all", "merged", "filled", "cheatcode", "ultimate"] as const).map((s) => (
              <FilterChip key={s} active={source === s} onClick={() => setSource(s)}>
                {s}
              </FilterChip>
            ))}
          </div>
        </div>
      </article>

      {searching ? (
        <section>
          <p className="mb-3 text-sm text-muted">{filtered.length} pages</p>
          <TopicList ids={filtered.map((t) => t.id)} />
        </section>
      ) : (
        <div className="flex flex-col gap-8">
          {chapters.map((ch) => {
            const list = topicsForChapter(ch.id);
            const done = list.filter((t) => statusOf(statuses, t.id) === "mastered").length;
            return (
              <section key={ch.id}>
                <div className="mb-3 flex items-end justify-between gap-3">
                  <div>
                    <p className="font-script text-xl text-rule">{ch.roman}</p>
                    <h2 className="font-display text-2xl font-semibold">{ch.title}</h2>
                    <p className="text-sm text-muted">{ch.subtitle}</p>
                  </div>
                  <p className="tabular-nums text-sm text-muted">
                    {done}/{list.length}
                  </p>
                </div>
                <div className="mb-3 h-1 overflow-hidden rounded-full bg-ink/10">
                  <div
                    className="h-full bg-steel"
                    style={{ width: `${list.length ? (done / list.length) * 100 : 0}%` }}
                  />
                </div>
                <TopicList ids={list.map((t) => t.id)} />
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}

function TopicList({ ids }: { ids: string[] }) {
  const statuses = useProgress((s) => s.statuses);
  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {ids.map((id) => {
        const t = getTopic(id);
        if (!t) return null;
        const st = statusOf(statuses, t.id);
        return (
          <li key={t.id}>
            <Link
              to="/topic/$topicId"
              params={{ topicId: t.id }}
              className="flex min-h-16 flex-col rounded-xl border border-ink/10 bg-paper px-3 py-3 transition-colors hover:bg-wash/50"
            >
              <span className="flex items-start justify-between gap-2">
                <span className="font-display font-semibold leading-snug">{t.title}</span>
                <LevelPill level={t.level} />
              </span>
              <span className="mt-1 line-clamp-2 text-sm text-muted">{t.blurb}</span>
              <span className="mt-2 flex items-center justify-between">
                <SourcePill source={t.source} />
                <span className="text-xs uppercase tracking-wider text-faint">
                  {st === "new" ? "unread" : st}
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? "min-h-9 rounded-full bg-ink px-3 text-sm text-paper"
          : "min-h-9 rounded-full border border-ink/15 px-3 text-sm text-ink-soft hover:bg-ink/5"
      }
    >
      {children}
    </button>
  );
}
