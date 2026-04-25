"use client";

import {
  createArticleSchema,
  CreateArticleSchemaType,
} from "@/schemas/createArticleSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { DRAFT_STORAGE_KEY } from "../constant";
import { CreateArticle } from "@/actions/createArticle";
import { useRouter } from "next/navigation";
import { slugify } from "@/lib/slugify";

const useCreateArticle = () => {
  const [focusMode, setFocusMode] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const router = useRouter();
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">(
    "saved",
  );
  const [showSuccess, setShowSuccess] = useState(false);
  const methods = useForm<CreateArticleSchemaType>({
    resolver: zodResolver(createArticleSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      categoryId: undefined,
      content: "",
    },
    mode: "onChange",
  });

  const title = methods.watch("title");
  const subtitle = methods.watch("subtitle");
  const content = methods.watch("content");
  const categoryId = methods.watch("categoryId");

  const wordCount = useMemo(
    () => content?.trim().split(/\s+/).filter(Boolean).length ?? 0,
    [content],
  );
  const readingTime = useMemo(
    () => Math.max(1, Math.ceil(wordCount / 220)),
    [wordCount],
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const savedDraft = window.localStorage.getItem(DRAFT_STORAGE_KEY);
    if (!savedDraft) {
      return;
    }

    try {
      const parsed = JSON.parse(savedDraft);
      methods.setValue("title", parsed.title || "");
      methods.setValue("subtitle", parsed.subtitle || "");
      methods.setValue("content", parsed.content || "");
      methods.setValue("categoryId", parsed.categoryId);
    } catch {
      // ignore malformed local storage data
    }
  }, [methods.setValue]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (!methods.formState.isDirty && !content) {
      return;
    }

    setSaveState("saving");
    const timeout = window.setTimeout(() => {
      if (categoryId === "" || !categoryId) return;
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
    }, 850);

    return () => window.clearTimeout(timeout);
  }, [title, subtitle, categoryId, content, methods.formState.isDirty]);

  const onSubmit = async (data: CreateArticleSchemaType) => {
    setShowSuccess(false);
    try {
      const formData = new FormData();
      formData.set("data", JSON.stringify(data));
      const res = await CreateArticle(formData);
      if (res.error) {
        console.error(res.error);
        return;
      }
      window.localStorage.removeItem(DRAFT_STORAGE_KEY);
      setShowSuccess(true);
      setSaveState("saved");

      window.setTimeout(() => {
        router.replace(`/read/${slugify(data.title)}`);
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (
      methods.formState.errors.content ||
      methods.formState.errors.subtitle ||
      methods.formState.errors.categoryId ||
      methods.formState.errors.title
    ) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [methods.formState.errors]);
  return {
    // STATE
    focusMode,
    setFocusMode,
    saveState,
    previewMode,
    setPreviewMode,
    wordCount,
    readingTime,
    setSaveState,
    showSuccess,

    // REACT HOOK FORM
    methods,
    register: methods.register,
    errors: methods.formState.errors,
    isSubmitting: methods.formState.isSubmitting,
    isDirty: methods.formState.isDirty,
    title,
    subtitle,
    content,
    handleSubmit: methods.handleSubmit,
    onSubmit,
    control: methods.control,
    categoryId,
  };
};

export default useCreateArticle;
