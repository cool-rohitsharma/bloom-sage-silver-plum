import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as drills, n as Paper } from "./paper-KkfcRZ0A.mjs";
import { t as Button } from "./button-B9uFnA2t.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/drills-B4Et-M5u.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Drills() {
	const [open, setOpen] = (0, import_react.useState)({});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-script text-2xl text-rule",
				children: "write it, then uncover it"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl font-semibold",
				children: "Drills"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-xl text-ink-soft",
				children: "Stream programs and SQL from the original sheets, corrected where the cheat sheet was wrong (5th max is skip(4), not skip(1))."
			})
		] }), drills.map((d) => {
			const shown = open[d.id];
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				id: d.id,
				className: "rounded-2xl border border-ink/10 bg-paper p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-semibold",
						children: d.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-lg",
						children: d.prompt
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm text-muted",
						children: ["Hint: ", d.hint]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => setOpen((s) => ({
								...s,
								[d.id]: !shown
							})),
							children: shown ? "Hide solution" : "Show solution"
						})
					}),
					shown ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
						className: "mt-4 overflow-x-auto rounded-lg bg-ink/[0.04] p-4 font-mono text-sm leading-relaxed",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: d.code })
					}) : null,
					shown && d.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-script text-xl text-rule",
						children: d.note
					}) : null
				]
			}, d.id);
		})]
	});
}
//#endregion
export { Drills as component };
