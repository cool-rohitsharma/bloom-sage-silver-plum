import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as SourcePill, t as LevelPill } from "./paper-KkfcRZ0A.mjs";
import { a as getTopic, l as topicsForChapter, s as searchTopics, t as chapters } from "./catalog-DB_4KVXc.mjs";
import { n as useProgress, t as statusOf } from "./progress-BK-MXKU2.mjs";
import { t as Input } from "./input-fOXYGfwc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/notebook-DvrVhdHS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Notebook() {
	const statuses = useProgress((s) => s.statuses);
	const [q, setQ] = (0, import_react.useState)("");
	const [level, setLevel] = (0, import_react.useState)("all");
	const [source, setSource] = (0, import_react.useState)("all");
	const filtered = (0, import_react.useMemo)(() => {
		return searchTopics(q).filter((t) => {
			if (level !== "all" && t.level !== level) return false;
			if (source !== "all" && t.source !== source) return false;
			return true;
		});
	}, [
		q,
		level,
		source
	]);
	const searching = Boolean(q) || level !== "all" || source !== "all";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
			className: "paper-sheet rounded-xl border border-ink/10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "py-6 pl-14 pr-4 sm:py-8 sm:pl-16 sm:pr-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-script text-2xl text-rule",
						children: "the whole book, once"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl font-semibold",
						children: "Notebook"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-xl text-ink-soft",
						children: "Search across every page. Filter by depth or origin. Work a chapter top to bottom."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "sr-only",
							htmlFor: "search",
							children: "Search topics"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "search",
							value: q,
							onChange: (e) => setQ(e.target.value),
							placeholder: "HashMap, saga, volatile, N+1…"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: [
							[
								"all",
								"core",
								"deep",
								"trap"
							].map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, {
								active: level === l,
								onClick: () => setLevel(l),
								children: l
							}, l)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mx-1 text-faint",
								children: "/"
							}),
							[
								"all",
								"merged",
								"filled",
								"cheatcode",
								"ultimate"
							].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, {
								active: source === s,
								onClick: () => setSource(s),
								children: s
							}, s))
						]
					})
				]
			})
		}), searching ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mb-3 text-sm text-muted",
			children: [filtered.length, " pages"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopicList, { ids: filtered.map((t) => t.id) })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-col gap-8",
			children: chapters.map((ch) => {
				const list = topicsForChapter(ch.id);
				const done = list.filter((t) => statusOf(statuses, t.id) === "mastered").length;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 flex items-end justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-script text-xl text-rule",
								children: ch.roman
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl font-semibold",
								children: ch.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: ch.subtitle
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "tabular-nums text-sm text-muted",
							children: [
								done,
								"/",
								list.length
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-3 h-1 overflow-hidden rounded-full bg-ink/10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full bg-steel",
							style: { width: `${list.length ? done / list.length * 100 : 0}%` }
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopicList, { ids: list.map((t) => t.id) })
				] }, ch.id);
			})
		})]
	});
}
function TopicList({ ids }) {
	const statuses = useProgress((s) => s.statuses);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "grid gap-2 sm:grid-cols-2",
		children: ids.map((id) => {
			const t = getTopic(id);
			if (!t) return null;
			const st = statusOf(statuses, t.id);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/topic/$topicId",
				params: { topicId: t.id },
				className: "flex min-h-16 flex-col rounded-xl border border-ink/10 bg-paper px-3 py-3 transition-colors hover:bg-wash/50",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-start justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display font-semibold leading-snug",
							children: t.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LevelPill, { level: t.level })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1 line-clamp-2 text-sm text-muted",
						children: t.blurb
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "mt-2 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourcePill, { source: t.source }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs uppercase tracking-wider text-faint",
							children: st === "new" ? "unread" : st
						})]
					})
				]
			}) }, t.id);
		})
	});
}
function FilterChip({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: active ? "min-h-9 rounded-full bg-ink px-3 text-sm text-paper" : "min-h-9 rounded-full border border-ink/15 px-3 text-sm text-ink-soft hover:bg-ink/5",
		children
	});
}
//#endregion
export { Notebook as component };
