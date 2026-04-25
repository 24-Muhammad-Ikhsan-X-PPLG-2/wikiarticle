"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Controller, FormProvider } from "react-hook-form";
import { motion } from "motion/react";
import { MilkdownProvider } from "@milkdown/react";
import "@milkdown/theme-nord/style.css";
import useCreateArticle from "./hooks/useCreateArticle";
import Header from "./components/Header";
import HeaderCard from "./components/Card/HeaderCard";
import ArticleMetaEditor from "./components/Card/ArticleMetaEditor";
import EditorActions from "./components/Card/EditorActions";
import DOMPurify from "dompurify";

const CreateArticleEditor = dynamic(
  () => import("./components/CreateArticleEditor"),
  { ssr: false },
);

const CreateArticleClient = () => {
  const {
    focusMode,
    setFocusMode,
    saveState,
    previewMode,
    setPreviewMode,
    isSubmitting,
    title,
    readingTime,
    wordCount,
    content,
    subtitle,
    control,
    handleSubmit,
    onSubmit,
    setSaveState,
    showSuccess,
    methods,
    categoryId,
  } = useCreateArticle();
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <Header
        previewMode={previewMode}
        saveState={saveState}
        setPreviewMode={setPreviewMode}
      />
      <FormProvider {...methods}>
        <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
          <div
            className={`rounded-[2rem] border border-slate-200/80 bg-white/90 shadow-[0_40px_140px_-90px_rgba(15,23,42,0.25)] transition-colors duration-300 dark:border-slate-800/80 dark:bg-slate-950/90 ${focusMode ? "pt-8" : "pt-10"}`}
          >
            <div className="space-y-8 px-5 py-8 sm:px-8 sm:py-10">
              <HeaderCard focusMode={focusMode} setFocusMode={setFocusMode} />

              {!focusMode && (
                <ArticleMetaEditor
                  categoryId={categoryId}
                  previewMode={previewMode}
                  readingTime={readingTime}
                  wordCount={wordCount}
                />
              )}

              <div className="space-y-6">
                {previewMode ? (
                  <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-[0_20px_80px_-40px_rgba(15,23,42,0.18)] dark:border-slate-800 dark:bg-slate-950">
                    <div className="prose max-w-none prose-slate dark:prose-invert">
                      <h1>{title || "Untitled article"}</h1>
                      {subtitle ? (
                        <p className="text-lg text-slate-600 dark:text-slate-400">
                          {subtitle}
                        </p>
                      ) : null}
                      <div
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(content),
                        }}
                        className="prose dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-2xl prose-h3:mt-6 prose-h3:mb-3 prose-p:text-lg prose-p:leading-8 prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:mb-4 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 dark:prose-strong:text-white prose-code:text-pink-600 dark:prose-code:text-pink-400 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded"
                      >
                        {/* {content ||
                        "Start writing in the editor to preview your article."} */}
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-4 rounded-[1.8rem] border border-slate-200 bg-slate-50 px-5 py-4 dark:border-slate-800 dark:bg-slate-950">
                        <div>
                          <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                            Editor
                          </p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            Type and see how your article feels.
                          </p>
                        </div>
                        <div className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                          Smooth writing
                        </div>
                      </div>
                      <Controller
                        name="content"
                        control={control}
                        render={({ field, fieldState }) => (
                          <MilkdownProvider>
                            <CreateArticleEditor
                              value={field.value}
                              onChange={field.onChange}
                            />
                            {fieldState.error && (
                              <p className="mt-2 text-sm text-rose-500">
                                {fieldState.error.message}
                              </p>
                            )}
                          </MilkdownProvider>
                        )}
                      />
                    </div>

                    <EditorActions
                      article={{ content, subtitle, categoryId, title }}
                      isSubmitting={isSubmitting}
                      setSaveState={setSaveState}
                    />
                  </form>
                )}
              </div>

              {showSuccess ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-[1.8rem] border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-900 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-100"
                >
                  Article published and draft has been deleted.
                </motion.div>
              ) : null}
            </div>
          </div>
        </div>
      </FormProvider>
    </div>
  );
};

export default CreateArticleClient;
