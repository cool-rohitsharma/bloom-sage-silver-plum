import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowLeft, ArrowRight, Check, RotateCcw } from "lucide-react";
import { getChapter, getDrill, getTopic, topics, topicsForChapter } from "@/data/catalog";
import { statusOf, useProgress } from "@/lib/progress";
import { Blocks } from "@/components/notes/blocks";
import { LevelPill, Paper, SourcePill } from "@/components/notes/paper";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/topic/$topicId")({
  component: TopicPage,
});

function TopicPage() {
  const { topicId } = Route.useParams();
  const topic = getTopic(topicId);
  if (!topic) throw notFound();
  const chapter = getChapter(topic.chapterId);
  const siblings = topicsForChapter(topic.chapterId);
  const idx = siblings.findIndex((t) => t.id === topic.id);
  const prev = siblings[idx - 1] ?? topics[Math.max(0, topics.findIndex((t) => t.id === topic.id) - 1)];
  const next = siblings[idx + 1] ?? topics[topics.findIndex((t) => t.id === topic.id) + 1];
  const drill = topic.drillId ? getDrill(topic.drillId) : undefined;

  const touch = useProgress((s) => s.touch);
  const mark = useProgress((s) => s.mark);
  const statuses = useProgress((s) => s.statuses);
  const st = statusOf(statuses, topic.id);

  useEffect(() => {
    touch(topic.id);
  }, [topic.id, touch]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Link to="/notebook" className="inline-flex min-h-11 items-center gap-2 text-sm text-ink-soft hover:text-ink">
          <ArrowLeft className="size-4" />
          Notebook
        </Link>
        <p className="font-script text-xl text-rule">
          {chapter ? `${chapter.roman}. ${chapter.title}` : topic.chapterId}
        </p>
      </div>

      <Paper>
        <div className="flex flex-wrap gap-2">
          <SourcePill source={topic.source} />
          <LevelPill level={topic.level} />
        </div>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">{topic.title}</h1>
        <p className="mt-2 max-w-2xl text-lg text-ink-soft">{topic.blurb}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {topic.keywords.map((k) => (
            <span key={k} className="rounded-full bg-wash px-2.5 py-1 font-mono text-xs text-steel">
              {k}
            </span>
          ))}
        </div>
      </Paper>

      <Paper>
        <Blocks blocks={topic.blocks} />
      </Paper>

      {drill ? (
        <Paper ruled={false}>
          <p className="font-script text-2xl text-rule">linked drill</p>
          <h2 className="font-display text-2xl font-semibold">{drill.title}</h2>
          <p className="mt-1 text-ink-soft">{drill.prompt}</p>
          <Link to="/drills" hash={drill.id} className="mt-3 inline-flex min-h-11 items-center text-sm text-steel underline">
            Open in drills
          </Link>
        </Paper>
      ) : null}

      <div className="flex flex-wrap gap-2">
        <Button
          variant={st === "mastered" ? "solid" : "outline"}
          onClick={() => mark(topic.id, st === "mastered" ? "new" : "mastered")}
        >
          <Check className="size-4" />
          {st === "mastered" ? "Mastered" : "Mark mastered"}
        </Button>
        <Button
          variant={st === "reviewing" ? "solid" : "outline"}
          onClick={() => mark(topic.id, st === "reviewing" ? "new" : "reviewing")}
        >
          <RotateCcw className="size-4" />
          {st === "reviewing" ? "In review" : "Keep reviewing"}
        </Button>
        <Button variant="ghost" asChild>
          <Link to="/ritual" search={{ topic: topic.id }}>
            60-second explain
          </Link>
        </Button>
      </div>

      <div className="flex justify-between gap-3">
        {prev && prev.id !== topic.id ? (
          <Button variant="outline" asChild>
            <Link to="/topic/$topicId" params={{ topicId: prev.id }}>
              <ArrowLeft className="size-4" /> {prev.title}
            </Link>
          </Button>
        ) : (
          <span />
        )}
        {next && next.id !== topic.id ? (
          <Button variant="outline" asChild>
            <Link to="/topic/$topicId" params={{ topicId: next.id }}>
              {next.title} <ArrowRight className="size-4" />
            </Link>
          </Button>
        ) : null}
      </div>
    </div>
  );
}
