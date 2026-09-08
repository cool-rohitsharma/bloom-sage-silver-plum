import { createFileRoute, Link } from "@tanstack/react-router";
import { trapCards } from "@/data/catalog";
import { Paper } from "@/components/notes/paper";

export const Route = createFileRoute("/traps")({ component: Traps });

function Traps() {
  const traps = trapCards();
  return (
    <div className="flex flex-col gap-5">
      <Paper>
        <p className="font-script text-2xl text-rule">the last page of the notebook</p>
        <h1 className="font-display text-4xl font-semibold">Interview traps</h1>
        <p className="mt-2 max-w-xl text-ink-soft">
          Corrections from both sheets, plus the gaps that usually fail a Java/microservices round.
        </p>
      </Paper>
      <ul className="flex flex-col gap-3">
        {traps.map((item) => (
          <li key={item.topic.id + item.text.slice(0, 24)}>
            <Link
              to="/topic/$topicId"
              params={{ topicId: item.topic.id }}
              className="block rounded-2xl border border-rule/20 bg-paper px-4 py-4 hover:bg-sticky/80"
            >
              <p className="font-display font-semibold">{item.topic.title}</p>
              <p className="mt-1 text-ink-soft">{item.text}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
