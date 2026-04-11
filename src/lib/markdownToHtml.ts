import { remark } from "remark";
import html from "remark-html";
import rehypeSlug from "rehype-slug";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";

export default async function markdownToHtml(md: string) {
  const result = await remark()
    .use(html)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .use(remarkGfm)
    .process(md);
  return result.toString();
}
