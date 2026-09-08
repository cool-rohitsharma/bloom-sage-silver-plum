import { b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Paper } from "./paper-KkfcRZ0A.mjs";
import { u as trapCards } from "./catalog-DB_4KVXc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/traps-Deq0oWG0.js
var import_jsx_runtime = require_jsx_runtime();
function Traps() {
	const traps = trapCards();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-script text-2xl text-rule",
				children: "the last page of the notebook"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl font-semibold",
				children: "Interview traps"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-xl text-ink-soft",
				children: "Corrections from both sheets, plus the gaps that usually fail a Java/microservices round."
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "flex flex-col gap-3",
			children: traps.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/topic/$topicId",
				params: { topicId: item.topic.id },
				className: "block rounded-2xl border border-rule/20 bg-paper px-4 py-4 hover:bg-sticky/80",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display font-semibold",
					children: item.topic.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-ink-soft",
					children: item.text
				})]
			}) }, item.topic.id + item.text.slice(0, 24)))
		})]
	});
}
//#endregion
export { Traps as component };
