import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as require_jsx_runtime, v as Link, z as notFound } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as RotateCcw, f as Check, g as ArrowLeft, h as ArrowRight } from "../_libs/lucide-react.mjs";
import { n as Route } from "./router-CuT50APc.mjs";
import { n as Paper, r as SourcePill, t as LevelPill } from "./paper-KkfcRZ0A.mjs";
import { t as Button } from "./button-B9uFnA2t.mjs";
import { a as getTopic, c as topics, i as getDrill, l as topicsForChapter, r as getChapter } from "./catalog-DB_4KVXc.mjs";
import { n as useProgress, t as statusOf } from "./progress-BK-MXKU2.mjs";
import { t as Blocks } from "./blocks-DobU0Kai.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/topic._topicId-D8mdrvYG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TopicPage() {
	const { topicId } = Route.useParams();
	const topic = getTopic(topicId);
	if (!topic) throw notFound();
	const chapter = getChapter(topic.chapterId);
	const siblings = topicsForChapter(topic.chapterId);
	const idx = siblings.findIndex((t) => t.id === topic.id);
	const prev = siblings[idx - 1] ?? topics[Math.max(0, topics.findIndex((t) => t.id === topic.id) - 1)];
	const next = siblings[idx + 1] ?? topics[topics.findIndex((t) => t.id === topic.id) + 1];
	const drill = topic.drillId ? getDrill(topic.drillId) : void 0;
	const touch = useProgress((s) => s.touch);
	const mark = useProgress((s) => s.mark);
	const statuses = useProgress((s) => s.statuses);
	const st = statusOf(statuses, topic.id);
	(0, import_react.useEffect)(() => {
		touch(topic.id);
	}, [topic.id, touch]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/notebook",
					className: "inline-flex min-h-11 items-center gap-2 text-sm text-ink-soft hover:text-ink",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Notebook"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-script text-xl text-rule",
					children: chapter ? `${chapter.roman}. ${chapter.title}` : topic.chapterId
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourcePill, { source: topic.source }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LevelPill, { level: topic.level })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-display text-4xl font-semibold tracking-tight",
					children: topic.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-2xl text-lg text-ink-soft",
					children: topic.blurb
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 flex flex-wrap gap-2",
					children: topic.keywords.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full bg-wash px-2.5 py-1 font-mono text-xs text-steel",
						children: k
					}, k))
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Blocks, { blocks: topic.blocks }) }),
			drill ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
				ruled: false,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-script text-2xl text-rule",
						children: "linked drill"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-semibold",
						children: drill.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-ink-soft",
						children: drill.prompt
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/drills",
						hash: drill.id,
						className: "mt-3 inline-flex min-h-11 items-center text-sm text-steel underline",
						children: "Open in drills"
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: st === "mastered" ? "solid" : "outline",
						onClick: () => mark(topic.id, st === "mastered" ? "new" : "mastered"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }), st === "mastered" ? "Mastered" : "Mark mastered"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: st === "reviewing" ? "solid" : "outline",
						onClick: () => mark(topic.id, st === "reviewing" ? "new" : "reviewing"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" }), st === "reviewing" ? "In review" : "Keep reviewing"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/ritual",
							search: { topic: topic.id },
							children: "60-second explain"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between gap-3",
				children: [prev && prev.id !== topic.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/topic/$topicId",
						params: { topicId: prev.id },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }),
							" ",
							prev.title
						]
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}), next && next.id !== topic.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/topic/$topicId",
						params: { topicId: next.id },
						children: [
							next.title,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })
						]
					})
				}) : null]
			})
		]
	});
}
//#endregion
export { TopicPage as component };
