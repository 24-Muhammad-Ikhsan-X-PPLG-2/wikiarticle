"use client";

import { getCategories } from "@/features/explore/client";
import { CreateArticleSchemaType } from "@/schemas/createArticleSchema";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { FC, useEffect } from "react";
import { FieldErrors, useFormContext, UseFormRegister } from "react-hook-form";
import { DRAFT_STORAGE_KEY } from "../../constant";

type Props = {
  wordCount: number;
  readingTime: number;
  previewMode: boolean;
  categoryId: string;
};

const ArticleMetaEditor: FC<Props> = ({
  previewMode,
  readingTime,
  wordCount,
  categoryId,
}) => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext<CreateArticleSchemaType>();
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    initialData: null,
  });
  return (
    <div className="grid gap-5 xl:grid-cols-[1.8fr_1fr]">
      <div className="space-y-5">
        <label className="block">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            Title
          </span>
          <input
            {...register("title")}
            placeholder="Write your article title..."
            className={`mt-3 w-full rounded-[1.8rem] border px-5 py-4 text-3xl font-semibold text-slate-950 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-500/20 ${errors.title ? "border-rose-400 ring-rose-100 dark:ring-rose-200/10" : "border-slate-200"}`}
          />
          {errors.title && (
            <p className="mt-3 text-sm text-rose-500">{errors.title.message}</p>
          )}
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            Subtitle
          </span>
          <input
            {...register("subtitle")}
            placeholder="Describe your article in one sentence"
            className="mt-3 w-full rounded-[1.8rem] border border-slate-200 bg-slate-50 px-5 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-500/20"
          />
        </label>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                Category
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Press enter the category
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            {!isLoading && (
              <select
                className="w-full rounded-[1.8rem] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-indigo-400 cursor-pointer dark:focus:ring-indigo-500/20"
                value={categoryId?.toString()}
                onChange={(e) =>
                  setValue("categoryId", e.target.value, {
                    shouldValidate: true,
                    shouldDirty: true,
                    shouldTouch: true,
                  })
                }
              >
                <option value="" defaultChecked>
                  Select category
                </option>
                {categories ? (
                  categories.map((category, idx) => (
                    <option value={category.id.toString()} key={idx}>
                      {category.name}
                    </option>
                  ))
                ) : (
                  <option value="">No Category</option>
                )}
              </select>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-[1.8rem] border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          Quick stats
        </p>
        <div className="mt-5 space-y-4 text-sm text-slate-600 dark:text-slate-400">
          <div className="rounded-[1.6rem] bg-white px-4 py-4 shadow-sm dark:bg-slate-950">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
              Words
            </p>
            <p className="mt-2 text-xl font-semibold text-slate-950 dark:text-slate-100">
              {wordCount}
            </p>
          </div>
          <div className="rounded-[1.6rem] bg-white px-4 py-4 shadow-sm dark:bg-slate-950">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
              Reading time
            </p>
            <p className="mt-2 text-xl font-semibold text-slate-950 dark:text-slate-100">
              {readingTime} min
            </p>
          </div>
          <div className="rounded-[1.6rem] bg-white px-4 py-4 shadow-sm dark:bg-slate-950">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
              Mode
            </p>
            <p className="mt-2 text-xl font-semibold text-slate-950 dark:text-slate-100">
              {previewMode ? "Preview" : "Edit"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleMetaEditor;
