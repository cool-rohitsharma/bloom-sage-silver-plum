import { chapters } from "./chapters";
import { drills } from "./drills";
import type { Block, Chapter, Drill, Topic } from "./types";
import { collectionTopics } from "./topics-collections";
import { concurrencyTopics, jvmTopics } from "./topics-concurrency";
import { extraTopics } from "./topics-extra";
import { javaFeatureTopics } from "./topics-java";
import { oopTopics } from "./topics-oop";
import {
  adjacentTopics,
  cloudTopics,
  dataTopics,
  kafkaTopics,
  microTopics,
  sqlTopics,
  testingTopics,
} from "./topics-systems";
import {
  exceptionTopics,
  jpaTopics,
  patternTopics,
  restTopics,
  securityTopics,
  springTopics,
} from "./topics-spring";

export { chapters, drills };
export type { Block, Chapter, Drill, Topic };

export const topics: Topic[] = [
  ...oopTopics,
  ...javaFeatureTopics,
  ...collectionTopics,
  ...concurrencyTopics,
  ...jvmTopics,
  ...exceptionTopics,
  ...patternTopics,
  ...springTopics,
  ...restTopics,
  ...jpaTopics,
  ...securityTopics,
  ...microTopics,
  ...kafkaTopics,
  ...testingTopics,
  ...sqlTopics,
  ...dataTopics,
  ...cloudTopics,
  ...adjacentTopics,
  ...extraTopics,
];

const topicById = new Map(topics.map((t) => [t.id, t]));
const drillById = new Map(drills.map((d) => [d.id, d]));
const chapterById = new Map(chapters.map((c) => [c.id, c]));

export function getTopic(id: string): Topic | undefined {
  return topicById.get(id);
}

export function getChapter(id: string): Chapter | undefined {
  return chapterById.get(id);
}

export function getDrill(id: string): Drill | undefined {
  return drillById.get(id);
}

export function topicsForChapter(chapterId: string): Topic[] {
  return topics.filter((t) => t.chapterId === chapterId);
}

export function searchTopics(query: string): Topic[] {
  const q = query.trim().toLowerCase();
  if (!q) return topics;
  return topics.filter((t) => {
    if (t.title.toLowerCase().includes(q) || t.blurb.toLowerCase().includes(q)) return true;
    if (t.keywords.some((k) => k.toLowerCase().includes(q))) return true;
    return t.blocks.some((b) => blockText(b).toLowerCase().includes(q));
  });
}

export function blockText(block: Block): string {
  switch (block.kind) {
    case "table":
      return [block.caption, ...block.headers, ...block.rows.flat()].filter(Boolean).join(" ");
    case "bullets":
      return [block.title, ...block.items].filter(Boolean).join(" ");
    case "code":
      return `${block.caption ?? ""} ${block.code}`;
    default:
      return block.text;
  }
}

export function trapCards(): { topic: Topic; text: string }[] {
  const out: { topic: Topic; text: string }[] = [];
  for (const topic of topics) {
    for (const block of topic.blocks) {
      if (block.kind === "trap") out.push({ topic, text: block.text });
    }
  }
  return out;
}

export function filledCount(): number {
  return topics.filter((t) => t.source === "filled").length;
}

export function mergedCount(): number {
  return topics.filter((t) => t.source === "merged").length;
}
