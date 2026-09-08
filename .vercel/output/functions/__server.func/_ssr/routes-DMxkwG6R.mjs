import { b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as Check, h as ArrowRight, l as Flame, m as BookMarked } from "../_libs/lucide-react.mjs";
import { o as todayKey } from "./router-CuT50APc.mjs";
import { n as Paper, r as SourcePill } from "./paper-KkfcRZ0A.mjs";
import { t as Button } from "./button-B9uFnA2t.mjs";
import { c as topics, n as filledCount, o as mergedCount, t as chapters } from "./catalog-DB_4KVXc.mjs";
import { n as useProgress, t as statusOf } from "./progress-BK-MXKU2.mjs";
import { r as pickFive, t as chapterOfDay } from "./daily-Cleit-B5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DMxkwG6R.js
var import_jsx_runtime = require_jsx_runtime();
function Desk() {
	const statuses = useProgress((s) => s.statuses);
	const streak = useProgress((s) => s.streak);
	const lastTopicId = useProgress((s) => s.lastTopicId);
	const ritualDate = useProgress((s) => s.ritualDate);
	const mastered = new Set(Object.entries(statuses).filter(([, v]) => v === "mastered").map(([k]) => k));
	const chapter = chapterOfDay();
	const five = pickFive(chapter, mastered);
	const masteredN = mastered.size;
	const pct = Math.round(masteredN / topics.length * 100);
	const ritualDone = ritualDate === todayKey();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-w-0 flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "margin-note text-2xl",
					children: "close the notes. say it aloud."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl",
					children: "Ink Desk"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-2xl text-lg text-ink-soft",
					children: "One notebook from both of your sheets — CheatCode and the Ultimate Java & microservices notes — rewritten as daily revision, not a dump. Overlaps were merged. Interview gaps were filled. Nothing was appended twice."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex flex-wrap gap-2 text-sm text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [topics.length, " topics"] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": "true",
							children: "·"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [chapters.length, " chapters"] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": "true",
							children: "·"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [mergedCount(), " merged"] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": "true",
							children: "·"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [filledCount(), " filled gaps"] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/ritual",
							children: ritualDone ? "Ritual done — revise again" : "Start 15-minute ritual"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/notebook",
							children: "Open the notebook"
						})
					})]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Mastered",
						value: `${masteredN}`,
						hint: `${pct}% of the book`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Streak",
						value: `${streak}`,
						hint: "days with ink on the page"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Today's chapter",
						value: chapter.roman,
						hint: chapter.title
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
				ruled: false,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-script text-2xl text-rule",
							children: "today's page"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "font-display text-2xl font-semibold",
							children: [
								chapter.roman,
								". ",
								chapter.title
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-ink-soft",
							children: chapter.subtitle
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, {
						className: "size-5 text-rule",
						strokeWidth: 1.6
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-5 flex min-w-0 flex-col gap-2",
					children: five.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "min-w-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/topic/$topicId",
							params: { topicId: t.id },
							className: "flex min-h-12 min-w-0 flex-col gap-2 rounded-lg border border-ink/10 bg-paper-deep/50 px-3 py-2 transition-colors hover:bg-wash/60 sm:flex-row sm:items-center sm:justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex min-w-0 items-start gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "w-5 shrink-0 font-script text-xl text-rule",
									children: i + 1
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block font-display font-semibold leading-snug",
										children: t.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block truncate text-sm text-muted",
										children: t.keywords.slice(0, 3).join(" · ")
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex shrink-0 items-center gap-2 pl-8 sm:pl-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourcePill, { source: t.source }), statusOf(statuses, t.id) === "mastered" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4 text-mastered" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 text-faint" })]
							})]
						})
					}, t.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
					ruled: false,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl font-semibold",
							children: "How to revise"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
							className: "mt-3 flex flex-col gap-2 text-ink-soft",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
									"1. Pick one section — today it is ",
									chapter.title,
									"."
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "2. Write five keywords from memory." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "3. Explain the topic out loud for 60 seconds." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "4. Solve one drill." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "5. Note one trade-off and one production failure." })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 font-script text-2xl text-rule",
							children: "Definition · internals · why · trade-off · project."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
					ruled: false,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-semibold",
						children: "Keep going"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-col gap-2",
						children: [
							lastTopicId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/topic/$topicId",
									params: { topicId: lastTopicId },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookMarked, { className: "size-4" }), " Continue last page"]
								})
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/traps",
									children: "Interview traps only"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/drills",
									children: "Stream & SQL drills"
								})
							})
						]
					})]
				})]
			})
		]
	});
}
function Stat({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-ink/10 bg-paper px-4 py-4 shadow-[var(--shadow-soft)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-[0.14em] text-muted",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 font-display text-3xl font-semibold tabular-nums",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: hint
			})
		]
	});
}
//#endregion
export { Desk as component };
