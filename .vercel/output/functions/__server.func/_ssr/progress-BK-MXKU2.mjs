import { o as todayKey } from "./router-CuT50APc.mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/progress-BK-MXKU2.js
var noopStorage = {
	getItem: () => null,
	setItem: () => {},
	removeItem: () => {}
};
var useProgress = create()(persist((set, get) => ({
	statuses: {},
	lastTopicId: null,
	lastStudyDate: null,
	streak: 0,
	studiedDays: [],
	ritualDate: null,
	mark: (id, status) => {
		set((s) => {
			const statuses = { ...s.statuses };
			if (status === "new") delete statuses[id];
			else statuses[id] = status;
			return { statuses };
		});
		get().recordStudy();
	},
	touch: (id) => {
		set({ lastTopicId: id });
		get().recordStudy();
	},
	recordStudy: () => {
		const today = todayKey();
		const prev = get().lastStudyDate;
		if (prev === today) {
			if (!get().studiedDays.includes(today)) set({ studiedDays: [...get().studiedDays, today] });
			return;
		}
		set({
			lastStudyDate: today,
			streak: prev === todayKey(/* @__PURE__ */ new Date(Date.now() - 864e5)) ? get().streak + 1 : 1,
			studiedDays: get().studiedDays.includes(today) ? get().studiedDays : [...get().studiedDays, today]
		});
	},
	completeRitual: () => {
		set({ ritualDate: todayKey() });
		get().recordStudy();
	}
}), {
	name: "ink-desk-progress",
	storage: createJSONStorage(() => typeof window === "undefined" ? noopStorage : localStorage)
}));
function statusOf(statuses, id) {
	return statuses[id] ?? "new";
}
//#endregion
export { useProgress as n, statusOf as t };
