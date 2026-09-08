import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as Route$2 } from "./router-CuT50APc.mjs";
import { n as Paper } from "./paper-KkfcRZ0A.mjs";
import { t as Button } from "./button-B9uFnA2t.mjs";
import { a as getTopic, i as getDrill } from "./catalog-DB_4KVXc.mjs";
import { n as useProgress } from "./progress-BK-MXKU2.mjs";
import { t as Input } from "./input-fOXYGfwc.mjs";
import { n as keywordScore, r as pickFive, t as chapterOfDay } from "./daily-Cleit-B5.mjs";
import { t as Blocks } from "./blocks-DobU0Kai.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ritual-INZv1LbS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STEPS = [
	"Pick",
	"Keywords",
	"Explain",
	"Drill",
	"Trade-off"
];
function Ritual() {
	const search = Route$2.useSearch();
	const statuses = useProgress((s) => s.statuses);
	const completeRitual = useProgress((s) => s.completeRitual);
	const mastered = (0, import_react.useMemo)(() => new Set(Object.entries(statuses).filter(([, v]) => v === "mastered").map(([k]) => k)), [statuses]);
	const chapter = chapterOfDay();
	const five = pickFive(chapter, mastered);
	const forced = search.topic ? getTopic(search.topic) : void 0;
	const [step, setStep] = (0, import_react.useState)(0);
	const [pickedId, setPickedId] = (0, import_react.useState)(forced?.id ?? five[0]?.id);
	const topic = getTopic(pickedId ?? "") ?? five[0];
	const [words, setWords] = (0, import_react.useState)([
		"",
		"",
		"",
		"",
		""
	]);
	const [revealed, setRevealed] = (0, import_react.useState)(false);
	const [seconds, setSeconds] = (0, import_react.useState)(60);
	const [running, setRunning] = (0, import_react.useState)(false);
	const [trade, setTrade] = (0, import_react.useState)("");
	const [fail, setFail] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (!running) return;
		if (seconds <= 0) {
			setRunning(false);
			return;
		}
		const id = window.setTimeout(() => setSeconds((s) => s - 1), 1e3);
		return () => window.clearTimeout(id);
	}, [running, seconds]);
	if (!topic) return null;
	const drill = topic.drillId ? getDrill(topic.drillId) : getDrill("fifth-max");
	const score = keywordScore(words, topic.keywords);
	function next() {
		if (step === 4) completeRitual();
		setStep((s) => Math.min(s + 1, 4));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-script text-2xl text-rule",
					children: "15-minute ritual"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl font-semibold",
					children: "Daily revision"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-ink-soft",
					children: [
						"Today's chapter: ",
						chapter.title,
						". One topic. Keywords from memory. Sixty seconds out loud. One drill. One trade-off."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-5 flex flex-wrap gap-2",
					children: STEPS.map((label, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: i === step ? "rounded-full bg-ink px-3 py-1 text-sm text-paper" : i < step ? "rounded-full bg-mastered/15 px-3 py-1 text-sm text-mastered" : "rounded-full border border-ink/15 px-3 py-1 text-sm text-muted",
						children: [
							i + 1,
							". ",
							label
						]
					}, label))
				})
			] }),
			step === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
				ruled: false,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-semibold",
						children: "Pick one page"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 flex flex-col gap-2",
						children: (forced ? [forced, ...five.filter((t) => t.id !== forced.id)] : five).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setPickedId(t.id),
							className: pickedId === t.id ? "flex min-h-12 w-full items-start rounded-lg bg-ink px-3 py-3 text-left text-paper" : "flex min-h-12 w-full items-start rounded-lg border border-ink/10 px-3 py-3 text-left hover:bg-wash/50",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block font-display font-semibold",
								children: t.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm opacity-80",
								children: t.blurb
							})] })
						}) }, t.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: next,
							children: "Lock it in"
						})
					})
				]
			}) : null,
			step === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-semibold",
					children: "Five keywords from memory"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-ink-soft",
					children: [
						"Do not peek. ",
						topic.title,
						"."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 grid gap-2 sm:grid-cols-2",
					children: words.map((w, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: w,
						onChange: (e) => {
							const nextW = [...words];
							nextW[i] = e.target.value;
							setWords(nextW);
						},
						placeholder: `keyword ${i + 1}`
					}, i))
				}),
				revealed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 rounded-lg bg-wash/80 px-4 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-script text-xl text-rule",
							children: [
								"hit ",
								score.hit.length,
								"/",
								topic.keywords.length
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-mastered",
							children: ["You named: ", score.hit.join(", ") || "—"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-rule",
							children: ["Still missing: ", score.miss.join(", ") || "none"]
						})
					]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: () => setRevealed(true),
						children: "Check against the page"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: next,
						children: "Next — 60 seconds"
					})]
				})
			] }) : null,
			step === 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-semibold",
					children: "Explain it aloud"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-ink-soft",
					children: "Definition, internals, why it exists, one trade-off, one project example. Cover the page with your hand if you must."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-6 font-display text-6xl tabular-nums",
					children: [seconds, "s"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => {
								setSeconds(60);
								setRunning(true);
							},
							children: running ? "Running…" : "Start 60s"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => setRunning(false),
							children: "Pause"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							onClick: next,
							children: "I said it — reveal"
						})
					]
				}),
				seconds === 0 || !running ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 border-t border-ink/10 pt-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-3 font-script text-2xl text-rule",
						children: "now check the page"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Blocks, { blocks: topic.blocks })]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-8 font-script text-3xl text-rule",
					children: "notes hidden while you speak"
				})
			] }) : null,
			step === 3 && drill ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-semibold",
					children: drill.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-lg",
					children: drill.prompt
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-ink-soft",
					children: ["Hint: ", drill.hint]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "mt-4 overflow-x-auto rounded-lg bg-ink/[0.04] p-4 font-mono text-sm leading-relaxed",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: drill.code })
				}),
				drill.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 font-script text-xl text-rule",
					children: drill.note
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: next,
						children: "Last step"
					})
				})
			] }) : null,
			step === 4 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-semibold",
					children: "Trade-off and a failure"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-4 block text-sm text-muted",
					htmlFor: "trade",
					children: ["One trade-off of ", topic.title]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					id: "trade",
					value: trade,
					onChange: (e) => setTrade(e.target.value),
					rows: 3,
					className: "mt-1 w-full rounded-md border border-ink/15 bg-paper p-3"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "mt-4 block text-sm text-muted",
					htmlFor: "fail",
					children: "One production failure scenario"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					id: "fail",
					value: fail,
					onChange: (e) => setFail(e.target.value),
					rows: 3,
					className: "mt-1 w-full rounded-md border border-ink/15 bg-paper p-3"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => {
							completeRitual();
							setStep(0);
						},
						children: "Stamp today's page"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/topic/$topicId",
							params: { topicId: topic.id },
							children: "Open full notes"
						})
					})]
				})
			] }) : null
		]
	});
}
//#endregion
export { Ritual as component };
