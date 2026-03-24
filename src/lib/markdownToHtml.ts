import { remark } from "remark";
import html from "remark-html";
import rehypeSlug from "rehype-slug";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

export default async function markdownToHtml(md: string) {
  const result = await remark()
    .use(html)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(md);
  return result.toString();
}
