import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookMarked, Check, Flame } from "lucide-react";
import { chapters, filledCount, mergedCount, topics } from "@/data/catalog";
import { chapterOfDay, pickFive } from "@/lib/daily";
import { statusOf, useProgress } from "@/lib/progress";
import { Paper, SourcePill } from "@/components/notes/paper";
import { Button } from "@/components/ui/button";
import { todayKey } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Desk });

function Desk() {
  const statuses = useProgress((s) => s.statuses);
  const streak = useProgress((s) => s.streak);
  const lastTopicId = useProgress((s) => s.lastTopicId);
  const ritualDate = useProgress((s) => s.ritualDate);
  const mastered = new Set(Object.entries(statuses).filter(([, v]) => v === "mastered").map(([k]) => k));
  const chapter = chapterOfDay();
  const five = pickFive(chapter, mastered);
  const masteredN = mastered.size;
  const pct = Math.round((masteredN / topics.length) * 100);
  const ritualDone = ritualDate === todayKey();

  return (
    <div className="flex min-w-0 flex-col gap-6">
      <Paper>
        <p className="margin-note text-2xl">close the notes. say it aloud.</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">Ink Desk</h1>
        <p className="mt-3 max-w-2xl text-lg text-ink-soft">
          One notebook from both of your sheets — CheatCode and the Ultimate Java & microservices notes —
          rewritten as daily revision, not a dump. Overlaps were merged. Interview gaps were filled. Nothing
          was appended twice.
        </p>
        <div className="mt-5 flex flex-wrap gap-2 text-sm text-muted">
          <span>{topics.length} topics</span>
          <span aria-hidden="true">·</span>
          <span>{chapters.length} chapters</span>
          <span aria-hidden="true">·</span>
          <span>{mergedCount()} merged</span>
          <span aria-hidden="true">·</span>
          <span>{filledCount()} filled gaps</span>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/ritual">{ritualDone ? "Ritual done — revise again" : "Start 15-minute ritual"}</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/notebook">Open the notebook</Link>
          </Button>
        </div>
      </Paper>

      <div className="grid gap-4 md:grid-cols-3">
        <Stat label="Mastered" value={`${masteredN}`} hint={`${pct}% of the book`} />
        <Stat label="Streak" value={`${streak}`} hint="days with ink on the page" />
        <Stat label="Today's chapter" value={chapter.roman} hint={chapter.title} />
      </div>

      <Paper ruled={false}>
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="font-script text-2xl text-rule">today's page</p>
            <h2 className="font-display text-2xl font-semibold">
              {chapter.roman}. {chapter.title}
            </h2>
            <p className="text-ink-soft">{chapter.subtitle}</p>
          </div>
          <Flame className="size-5 text-rule" strokeWidth={1.6} />
        </div>
        <ol className="mt-5 flex min-w-0 flex-col gap-2">
          {five.map((t, i) => (
            <li key={t.id} className="min-w-0">
              <Link
                to="/topic/$topicId"
                params={{ topicId: t.id }}
                className="flex min-h-12 min-w-0 flex-col gap-2 rounded-lg border border-ink/10 bg-paper-deep/50 px-3 py-2 transition-colors hover:bg-wash/60 sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="flex min-w-0 items-start gap-3">
                  <span className="w-5 shrink-0 font-script text-xl text-rule">{i + 1}</span>
                  <span className="min-w-0">
                    <span className="block font-display font-semibold leading-snug">{t.title}</span>
                    <span className="block truncate text-sm text-muted">{t.keywords.slice(0, 3).join(" · ")}</span>
                  </span>
                </span>
                <span className="flex shrink-0 items-center gap-2 pl-8 sm:pl-0">
                  <SourcePill source={t.source} />
                  {statusOf(statuses, t.id) === "mastered" ? (
                    <Check className="size-4 text-mastered" />
                  ) : (
                    <ArrowRight className="size-4 text-faint" />
                  )}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </Paper>

      <div className="grid gap-4 md:grid-cols-2">
        <Paper ruled={false}>
          <h2 className="font-display text-xl font-semibold">How to revise</h2>
          <ol className="mt-3 flex flex-col gap-2 text-ink-soft">
            <li>1. Pick one section — today it is {chapter.title}.</li>
            <li>2. Write five keywords from memory.</li>
            <li>3. Explain the topic out loud for 60 seconds.</li>
            <li>4. Solve one drill.</li>
            <li>5. Note one trade-off and one production failure.</li>
          </ol>
          <p className="mt-3 font-script text-2xl text-rule">
            Definition · internals · why · trade-off · project.
          </p>
        </Paper>
        <Paper ruled={false}>
          <h2 className="font-display text-xl font-semibold">Keep going</h2>
          <div className="mt-4 flex flex-col gap-2">
            {lastTopicId ? (
              <Button variant="outline" asChild>
                <Link to="/topic/$topicId" params={{ topicId: lastTopicId }}>
                  <BookMarked className="size-4" /> Continue last page
                </Link>
              </Button>
            ) : null}
            <Button variant="outline" asChild>
              <Link to="/traps">Interview traps only</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/drills">Stream & SQL drills</Link>
            </Button>
          </div>
        </Paper>
      </div>
    </div>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-2xl border border-ink/10 bg-paper px-4 py-4 shadow-[var(--shadow-soft)]">
      <p className="text-xs uppercase tracking-[0.14em] text-muted">{label}</p>
      <p className="mt-1 font-display text-3xl font-semibold tabular-nums">{value}</p>
      <p className="text-sm text-muted">{hint}</p>
    </div>
  );
}
