"use client";

import appName from "@/constants/appName";
import { Eye, EyeOff, Sparkles } from "lucide-react";
import React, { Dispatch, FC, SetStateAction } from "react";

type Props = {
  saveState: string;
  setPreviewMode: Dispatch<SetStateAction<boolean>>;
  previewMode: boolean;
};

const Header: FC<Props> = ({ previewMode, saveState, setPreviewMode }) => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 rounded-[2rem] border border-slate-200/80 bg-white/90 p-5 shadow-[0_24px_90px_-50px_rgba(15,23,42,0.18)] backdrop-blur-xl transition-colors duration-300 dark:border-slate-800/90 dark:bg-slate-900/80 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.28em] text-indigo-600 dark:text-indigo-300">
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 dark:bg-indigo-300/10 dark:text-indigo-300">
              <Sparkles className="h-4 w-4" />
            </span>
            {appName}
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {saveState === "saving" ? "Saving…" : "Draft saved"}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setPreviewMode((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900 cursor-pointer"
          >
            {previewMode ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
            {previewMode ? "Edit" : "Preview"}
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 cursor-pointer"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
