import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Layers, d as Compass, i as Scale, o as Quote, s as Lightbulb, t as TriangleAlert } from "../_libs/lucide-react.mjs";
import { i as cn } from "./router-CuT50APc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blocks-DobU0Kai.js
var import_jsx_runtime = require_jsx_runtime();
var label = {
	idea: {
		title: "The idea",
		icon: Lightbulb,
		tone: "text-steel"
	},
	why: {
		title: "Why they ask",
		icon: Compass,
		tone: "text-steel"
	},
	when: {
		title: "When to use it",
		icon: Layers,
		tone: "text-steel"
	},
	tradeoff: {
		title: "Trade-off",
		icon: Scale,
		tone: "text-warn"
	},
	trap: {
		title: "Interview trap",
		icon: TriangleAlert,
		tone: "text-rule"
	},
	project: {
		title: "Say it in a project",
		icon: Quote,
		tone: "text-mastered"
	}
};
function Blocks({ blocks }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-col gap-6",
		children: blocks.map((block, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlockView, { block }, i))
	});
}
function BlockView({ block }) {
	if (block.kind === "margin") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "margin-note text-2xl sm:text-3xl",
		children: block.text
	});
	if (block.kind === "code") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
		className: "overflow-hidden rounded-lg border border-ink/10 bg-ink/[0.03]",
		children: [block.caption ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
			className: "border-b border-ink/10 px-4 py-2 font-script text-xl text-rule",
			children: block.caption
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
			className: "overflow-x-auto px-4 py-3 font-mono text-sm leading-relaxed text-ink-soft",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: block.code })
		})]
	});
	if (block.kind === "table") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
		className: "overflow-x-auto",
		children: [block.caption ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
			className: "mb-2 font-script text-xl text-rule",
			children: block.caption
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full min-w-[28rem] border-collapse text-left text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: block.headers.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
				className: "border-b-2 border-ink/20 px-3 py-2 font-display font-semibold",
				children: h
			}, h)) }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: block.rows.map((row, ri) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
				className: "odd:bg-ink/[0.03]",
				children: row.map((cell, ci) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: "border-b border-ink/8 px-3 py-2 align-top text-ink-soft",
					children: cell
				}, ci))
			}, ri)) })]
		})]
	});
	if (block.kind === "bullets") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [block.title ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
		className: "mb-2 font-display text-lg font-semibold",
		children: block.title
	}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "flex flex-col gap-1.5",
		children: block.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "flex gap-2 text-lg leading-snug text-ink-soft",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-2 size-1.5 shrink-0 rounded-full bg-rule" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item })]
		}, item))
	})] });
	const meta = label[block.kind];
	if (!meta) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-[17px] leading-relaxed",
		children: block.text
	});
	const Icon = meta.icon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("rounded-lg border border-ink/8 bg-paper-deep/40 px-4 py-3"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("mb-1.5 flex items-center gap-2 text-sm font-medium", meta.tone),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				className: "size-4",
				strokeWidth: 1.8
			}), meta.title]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-lg leading-relaxed text-ink",
			children: block.text
		})]
	});
}
//#endregion
export { Blocks as t };
