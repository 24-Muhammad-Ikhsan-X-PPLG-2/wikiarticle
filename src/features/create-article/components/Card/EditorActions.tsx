"use client";

import { ArrowLeft, Loader2 } from "lucide-react";
import { DRAFT_STORAGE_KEY } from "../../constant";
import { useRouter } from "next/navigation";
import { FC } from "react";

type Props = {
  isSubmitting: boolean;
  article: {
    title: string;
    subtitle: string;
    categoryId: string;
    content: string;
  };
  setSaveState: (v: "idle" | "saved" | "saving") => void;
};

const EditorActions: FC<Props> = ({
  article: { content, subtitle, categoryId, title },
  isSubmitting,
  setSaveState,
}) => {
  const router = useRouter();
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_auto_auto]">
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-[1.8rem] bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 cursor-pointer"
      >
        {isSubmitting ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : null}
        Publish article
      </button>
      <button
        type="button"
        onClick={() => {
          window.localStorage.setItem(
            DRAFT_STORAGE_KEY,
            JSON.stringify({
              title,
              subtitle,
              categoryId,
              content,
            }),
          );
          setSaveState("saved");
        }}
        className="inline-flex items-center justify-center rounded-[1.8rem] border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 cursor-pointer"
      >
        Save draft
      </button>
      <button
        type="button"
        onClick={() => router.back()}
        className="inline-flex items-center justify-center rounded-[1.8rem] border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 cursor-pointer"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Cancel
      </button>
    </div>
  );
};

export default EditorActions;
