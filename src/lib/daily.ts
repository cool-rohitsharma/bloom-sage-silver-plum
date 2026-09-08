import { chapters, topics, topicsForChapter } from "@/data/catalog";
import type { Chapter, Topic } from "@/data/types";
import { dayNumber } from "./utils";

export function chapterOfDay(date = new Date()): Chapter {
  return chapters[dayNumber(date) % chapters.length]!;
}

export function pickFive(chapter: Chapter, mastered: Set<string>): Topic[] {
  const own = topicsForChapter(chapter.id);
  const unmastered = own.filter((t) => !mastered.has(t.id));
  const pool = unmastered.length >= 5 ? unmastered : own;
  const start = dayNumber() % Math.max(pool.length, 1);
  const rotated = [...pool.slice(start), ...pool.slice(0, start)];
  const picked = rotated.slice(0, 5);
  if (picked.length < 5) {
    const extra = topics.filter((t) => !picked.some((p) => p.id === t.id) && !mastered.has(t.id));
    picked.push(...extra.slice(0, 5 - picked.length));
  }
  return picked;
}

export function keywordScore(written: string[], expected: string[]): { hit: string[]; miss: string[] } {
  const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9+#]+/g, "");
  const want = expected.map((k) => ({ raw: k, n: norm(k) })).filter((k) => k.n.length > 1);
  const got = written.map(norm).filter(Boolean);
  const hit: string[] = [];
  const miss: string[] = [];
  for (const w of want) {
    const matched = got.some((g) => g.includes(w.n) || w.n.includes(g));
    (matched ? hit : miss).push(w.raw);
  }
  return { hit, miss };
}
