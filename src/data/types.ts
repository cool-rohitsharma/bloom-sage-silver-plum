export type SourceTag = "merged" | "cheatcode" | "ultimate" | "filled";
export type Level = "core" | "deep" | "trap";
export type TopicStatus = "new" | "reviewing" | "mastered";

export type Block =
  | { kind: "idea"; text: string }
  | { kind: "why"; text: string }
  | { kind: "when"; text: string }
  | { kind: "tradeoff"; text: string }
  | { kind: "trap"; text: string }
  | { kind: "project"; text: string }
  | { kind: "margin"; text: string }
  | { kind: "bullets"; title?: string; items: string[] }
  | { kind: "table"; caption?: string; headers: string[]; rows: string[][] }
  | { kind: "code"; caption?: string; code: string };

export type Topic = {
  id: string;
  chapterId: string;
  title: string;
  blurb: string;
  keywords: string[];
  source: SourceTag;
  level: Level;
  blocks: Block[];
  drillId?: string;
};

export type Chapter = {
  id: string;
  roman: string;
  title: string;
  subtitle: string;
};

export type Drill = {
  id: string;
  title: string;
  prompt: string;
  hint: string;
  code: string;
  note?: string;
};
