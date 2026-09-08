import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { todayKey } from "./utils";
import type { TopicStatus } from "@/data/types";

type ProgressState = {
  statuses: Record<string, Exclude<TopicStatus, "new">>;
  lastTopicId: string | null;
  lastStudyDate: string | null;
  streak: number;
  studiedDays: string[];
  ritualDate: string | null;
  mark: (id: string, status: Exclude<TopicStatus, "new"> | "new") => void;
  touch: (id: string) => void;
  recordStudy: () => void;
  completeRitual: () => void;
};

const noopStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
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
          if (!get().studiedDays.includes(today)) {
            set({ studiedDays: [...get().studiedDays, today] });
          }
          return;
        }
        const yesterday = todayKey(new Date(Date.now() - 86_400_000));
        const streak = prev === yesterday ? get().streak + 1 : 1;
        const days = get().studiedDays.includes(today) ? get().studiedDays : [...get().studiedDays, today];
        set({ lastStudyDate: today, streak, studiedDays: days });
      },
      completeRitual: () => {
        set({ ritualDate: todayKey() });
        get().recordStudy();
      },
    }),
    {
      name: "ink-desk-progress",
      storage: createJSONStorage(() => (typeof window === "undefined" ? noopStorage : localStorage)),
    },
  ),
);

export function statusOf(
  statuses: Record<string, Exclude<TopicStatus, "new">>,
  id: string,
): TopicStatus {
  return statuses[id] ?? "new";
}
