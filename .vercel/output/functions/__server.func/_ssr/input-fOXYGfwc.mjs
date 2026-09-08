import "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as cn } from "./router-CuT50APc.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("flex h-11 w-full rounded-md border border-ink/15 bg-paper px-3 text-base text-ink placeholder:text-faint", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-steel/40", className),
		...props
	});
}
//#endregion
export { Input as t };
