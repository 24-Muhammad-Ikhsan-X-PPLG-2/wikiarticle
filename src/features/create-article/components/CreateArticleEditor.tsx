"use client";

import dynamic from "next/dynamic";
import { useMemo, useRef } from "react";
import DOMPurify from "dompurify";

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

type CreateArticleEditorProps = {
  value: string;
  onChange: (html: string) => void;
};

const CreateArticleEditor = ({ value, onChange }: CreateArticleEditorProps) => {
  const editorRef = useRef<any>(null);
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start typing...",
    }),
    [],
  );
  return (
    <div className="w-full">
      <JoditEditor
        className="prose max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-2xl prose-h3:mt-6 prose-h3:mb-3 prose-p:text-lg prose-p:leading-8 prose-p:text-gray-700 prose-p:mb-4 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-code:text-pink-600 prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded w-full max-h-[1024px] overflow-auto"
        value={value}
        ref={editorRef}
        config={config}
        onBlur={(text) => {
          const htmlBersih = DOMPurify.sanitize(text);
          onChange(htmlBersih);
        }}
      />
    </div>
  );
};

export default CreateArticleEditor;
