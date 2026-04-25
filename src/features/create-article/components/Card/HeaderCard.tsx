"use client";

import { Bookmark } from "lucide-react";
import { Dispatch, FC, SetStateAction } from "react";

type Props = {
  setFocusMode: Dispatch<SetStateAction<boolean>>;
  focusMode: boolean;
};

const HeaderCard: FC<Props> = ({ focusMode, setFocusMode }) => {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-3xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-indigo-600 dark:text-indigo-300">
          New article
        </p>
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-slate-50 sm:text-4xl">
            Create a distraction-free story.
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
            Build your next WikiArticle piece with clean markdown, instant
            preview and smooth publishing.
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setFocusMode((prev) => !prev)}
        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 cursor-pointer"
      >
        <Bookmark className="h-4 w-4" />
        {focusMode ? "Exit focus mode" : "Focus mode"}
      </button>
    </div>
  );
};

export default HeaderCard;
