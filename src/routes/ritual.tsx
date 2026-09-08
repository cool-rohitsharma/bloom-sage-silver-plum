import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { chapterOfDay, keywordScore, pickFive } from "@/lib/daily";
import { useProgress } from "@/lib/progress";
import { getDrill, getTopic } from "@/data/catalog";
import { Paper } from "@/components/notes/paper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Blocks } from "@/components/notes/blocks";

type RitualSearch = { topic?: string };

export const Route = createFileRoute("/ritual")({
  component: Ritual,
  validateSearch: (s: Record<string, unknown>): RitualSearch => ({
    topic: typeof s.topic === "string" ? s.topic : undefined,
  }),
});

const STEPS = ["Pick", "Keywords", "Explain", "Drill", "Trade-off"] as const;

function Ritual() {
  const search = Route.useSearch();
  const statuses = useProgress((s) => s.statuses);
  const completeRitual = useProgress((s) => s.completeRitual);
  const mastered = useMemo(
    () => new Set(Object.entries(statuses).filter(([, v]) => v === "mastered").map(([k]) => k)),
    [statuses],
  );
  const chapter = chapterOfDay();
  const five = pickFive(chapter, mastered);
  const forced = search.topic ? getTopic(search.topic) : undefined;
  const [step, setStep] = useState(0);
  const [pickedId, setPickedId] = useState(forced?.id ?? five[0]?.id);
  const topic = getTopic(pickedId ?? "") ?? five[0];
  const [words, setWords] = useState(["", "", "", "", ""]);
  const [revealed, setRevealed] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const [running, setRunning] = useState(false);
  const [trade, setTrade] = useState("");
  const [fail, setFail] = useState("");

  useEffect(() => {
    if (!running) return;
    if (seconds <= 0) {
      setRunning(false);
      return;
    }
    const id = window.setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => window.clearTimeout(id);
  }, [running, seconds]);

  if (!topic) return null;
  const drill = topic.drillId ? getDrill(topic.drillId) : getDrill("fifth-max");
  const score = keywordScore(words, topic.keywords);

  function next() {
    if (step === 4) completeRitual();
    setStep((s) => Math.min(s + 1, 4));
  }

  return (
    <div className="flex flex-col gap-5">
      <Paper>
        <p className="font-script text-2xl text-rule">15-minute ritual</p>
        <h1 className="font-display text-4xl font-semibold">Daily revision</h1>
        <p className="mt-2 text-ink-soft">
          Today's chapter: {chapter.title}. One topic. Keywords from memory. Sixty seconds out loud. One
          drill. One trade-off.
        </p>
        <ol className="mt-5 flex flex-wrap gap-2">
          {STEPS.map((label, i) => (
            <li
              key={label}
              className={
                i === step
                  ? "rounded-full bg-ink px-3 py-1 text-sm text-paper"
                  : i < step
                    ? "rounded-full bg-mastered/15 px-3 py-1 text-sm text-mastered"
                    : "rounded-full border border-ink/15 px-3 py-1 text-sm text-muted"
              }
            >
              {i + 1}. {label}
            </li>
          ))}
        </ol>
      </Paper>

      {step === 0 ? (
        <Paper ruled={false}>
          <h2 className="font-display text-2xl font-semibold">Pick one page</h2>
          <ul className="mt-4 flex flex-col gap-2">
            {(forced ? [forced, ...five.filter((t) => t.id !== forced.id)] : five).map((t) => (
              <li key={t.id}>
                <button
                  type="button"
                  onClick={() => setPickedId(t.id)}
                  className={
                    pickedId === t.id
                      ? "flex min-h-12 w-full items-start rounded-lg bg-ink px-3 py-3 text-left text-paper"
                      : "flex min-h-12 w-full items-start rounded-lg border border-ink/10 px-3 py-3 text-left hover:bg-wash/50"
                  }
                >
                  <span>
                    <span className="block font-display font-semibold">{t.title}</span>
                    <span className="text-sm opacity-80">{t.blurb}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <Button onClick={next}>Lock it in</Button>
          </div>
        </Paper>
      ) : null}

      {step === 1 ? (
        <Paper>
          <h2 className="font-display text-2xl font-semibold">Five keywords from memory</h2>
          <p className="mt-1 text-ink-soft">Do not peek. {topic.title}.</p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {words.map((w, i) => (
              <Input
                key={i}
                value={w}
                onChange={(e) => {
                  const nextW = [...words];
                  nextW[i] = e.target.value;
                  setWords(nextW);
                }}
                placeholder={`keyword ${i + 1}`}
              />
            ))}
          </div>
          {revealed ? (
            <div className="mt-4 rounded-lg bg-wash/80 px-4 py-3">
              <p className="font-script text-xl text-rule">
                hit {score.hit.length}/{topic.keywords.length}
              </p>
              <p className="text-sm text-mastered">You named: {score.hit.join(", ") || "—"}</p>
              <p className="text-sm text-rule">Still missing: {score.miss.join(", ") || "none"}</p>
            </div>
          ) : null}
          <div className="mt-4 flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => setRevealed(true)}>
              Check against the page
            </Button>
            <Button onClick={next}>Next — 60 seconds</Button>
          </div>
        </Paper>
      ) : null}

      {step === 2 ? (
        <Paper>
          <h2 className="font-display text-2xl font-semibold">Explain it aloud</h2>
          <p className="text-ink-soft">
            Definition, internals, why it exists, one trade-off, one project example. Cover the page with your hand
            if you must.
          </p>
          <p className="mt-6 font-display text-6xl tabular-nums">{seconds}s</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button
              onClick={() => {
                setSeconds(60);
                setRunning(true);
              }}
            >
              {running ? "Running…" : "Start 60s"}
            </Button>
            <Button variant="outline" onClick={() => setRunning(false)}>
              Pause
            </Button>
            <Button variant="ghost" onClick={next}>
              I said it — reveal
            </Button>
          </div>
          {seconds === 0 || !running ? (
            <div className="mt-6 border-t border-ink/10 pt-5">
              <p className="mb-3 font-script text-2xl text-rule">now check the page</p>
              <Blocks blocks={topic.blocks} />
            </div>
          ) : (
            <p className="mt-8 font-script text-3xl text-rule">notes hidden while you speak</p>
          )}
        </Paper>
      ) : null}

      {step === 3 && drill ? (
        <Paper>
          <h2 className="font-display text-2xl font-semibold">{drill.title}</h2>
          <p className="mt-2 text-lg">{drill.prompt}</p>
          <p className="mt-2 text-ink-soft">Hint: {drill.hint}</p>
          <pre className="mt-4 overflow-x-auto rounded-lg bg-ink/[0.04] p-4 font-mono text-sm leading-relaxed">
            <code>{drill.code}</code>
          </pre>
          {drill.note ? <p className="mt-2 font-script text-xl text-rule">{drill.note}</p> : null}
          <div className="mt-4">
            <Button onClick={next}>Last step</Button>
          </div>
        </Paper>
      ) : null}

      {step === 4 ? (
        <Paper>
          <h2 className="font-display text-2xl font-semibold">Trade-off and a failure</h2>
          <label className="mt-4 block text-sm text-muted" htmlFor="trade">
            One trade-off of {topic.title}
          </label>
          <textarea
            id="trade"
            value={trade}
            onChange={(e) => setTrade(e.target.value)}
            rows={3}
            className="mt-1 w-full rounded-md border border-ink/15 bg-paper p-3"
          />
          <label className="mt-4 block text-sm text-muted" htmlFor="fail">
            One production failure scenario
          </label>
          <textarea
            id="fail"
            value={fail}
            onChange={(e) => setFail(e.target.value)}
            rows={3}
            className="mt-1 w-full rounded-md border border-ink/15 bg-paper p-3"
          />
          <div className="mt-4 flex flex-wrap gap-2">
            <Button
              onClick={() => {
                completeRitual();
                setStep(0);
              }}
            >
              Stamp today's page
            </Button>
            <Button variant="outline" asChild>
              <Link to="/topic/$topicId" params={{ topicId: topic.id }}>
                Open full notes
              </Link>
            </Button>
          </div>
        </Paper>
      ) : null}
    </div>
  );
}
