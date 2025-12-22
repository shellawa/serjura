import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import rehypeStringify from "rehype-stringify"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import rehypeShiki from "@shikijs/rehype"
import rehypeSlug from "rehype-slug"
import remarkFrontmatter from "remark-frontmatter"
import { matter } from "vfile-matter"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import { rehypeHeadingExport } from "./rehype-plugins"

export async function parseMarkdown(rawContent: string) {
  const processor = unified()
    .use(remarkParse)
    .use(remarkFrontmatter, ["yaml"])
    .use(() => (tree, file) => {
      matter(file)
    })
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeKatex)
    .use(rehypeShiki, {
      themes: {
        light: "catppuccin-latte",
        dark: "catppuccin-mocha"
      },
      inline: "tailing-curly-colon"
    })
    .use(rehypeSlug, { prefix: "sect_" })
    .use(rehypeAutolinkHeadings)
    .use(rehypeHeadingExport)
    .use(rehypeStringify, { allowDangerousHtml: true })

  const file = await processor.process(rawContent)

  return {
    html: file.toString(),
    meta: file.data.matter as Record<string, any>
  }
}
