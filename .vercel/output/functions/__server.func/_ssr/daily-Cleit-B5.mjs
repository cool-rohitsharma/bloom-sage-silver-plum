import { a as dayNumber } from "./router-CuT50APc.mjs";
import { c as topics, l as topicsForChapter, t as chapters } from "./catalog-DB_4KVXc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/daily-Cleit-B5.js
function chapterOfDay(date = /* @__PURE__ */ new Date()) {
	return chapters[dayNumber(date) % chapters.length];
}
function pickFive(chapter, mastered) {
	const own = topicsForChapter(chapter.id);
	const unmastered = own.filter((t) => !mastered.has(t.id));
	const pool = unmastered.length >= 5 ? unmastered : own;
	const start = dayNumber() % Math.max(pool.length, 1);
	const picked = [...pool.slice(start), ...pool.slice(0, start)].slice(0, 5);
	if (picked.length < 5) {
		const extra = topics.filter((t) => !picked.some((p) => p.id === t.id) && !mastered.has(t.id));
		picked.push(...extra.slice(0, 5 - picked.length));
	}
	return picked;
}
function keywordScore(written, expected) {
	const norm = (s) => s.toLowerCase().replace(/[^a-z0-9+#]+/g, "");
	const want = expected.map((k) => ({
		raw: k,
		n: norm(k)
	})).filter((k) => k.n.length > 1);
	const got = written.map(norm).filter(Boolean);
	const hit = [];
	const miss = [];
	for (const w of want) (got.some((g) => g.includes(w.n) || w.n.includes(g)) ? hit : miss).push(w.raw);
	return {
		hit,
		miss
	};
}
//#endregion
export { keywordScore as n, pickFive as r, chapterOfDay as t };
