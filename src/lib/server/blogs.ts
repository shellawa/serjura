import path from "node:path"
import { parseMarkdown } from "$lib/utils/markdown"
import type { BlogMeta } from "$lib/types"
import { slugify } from "$lib/utils/helpers"

const modules = import.meta.glob("/src/contents/blogs/*.md", {
  import: "default",
  query: "?raw",
  eager: true
}) as Record<string, string>

let parsedBlogs: { meta: BlogMeta; content: string }[] = []

export async function getBlogs() {
  if (parsedBlogs.length) return parsedBlogs

  for (const filePath in modules) {
    const md = modules[filePath]
    const parsed = await parseMarkdown(md)
    const matter = parsed.matter as unknown as Omit<BlogMeta, "id" | "slug">

    if (matter.published === false) continue

    const id = Number(path.parse(filePath).name)
    const slug = slugify(matter.title)

    const meta = {
      id,
      slug,
      ...matter
    }

    parsedBlogs.push({ meta, content: parsed.html })
  }

  parsedBlogs.sort((a, b) => a.meta.id - b.meta.id)
  return parsedBlogs
}

export async function getBlogById(id: number) {
  const blogs = await getBlogs()
  const index = blogs.findIndex((blog) => blog.meta.id === id)

  if (index === -1) return null

  const blog = blogs[index]
  const prevId = index > 0 ? blogs[index - 1].meta.id : null
  const nextId = index === blogs.length - 1 ? null : blogs[index + 1].meta.id

  return {
    content: blog.content,
    meta: blog.meta,
    prevId,
    nextId
  }
}
