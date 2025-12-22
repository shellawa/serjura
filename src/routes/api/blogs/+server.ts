import { json, type RequestHandler } from "@sveltejs/kit"
import path from "node:path"
import { parseMarkdown } from "$lib/utils/markdown"
import type { Blog } from "$lib/types"
import { slugify } from "$lib/utils/helpers"

export const GET: RequestHandler = async () => {
  const blogs: Blog[] = []

  const modules = import.meta.glob("/src/contents/blogs/*.md", {
    import: "default",
    query: "?raw"
  })

  for (const filePath in modules) {
    const md = (await modules[filePath]()) as string
    const parsed = await parseMarkdown(md)
    const meta = parsed.meta as unknown as Omit<Blog, "id" | "slug">
    if (meta.published === false) continue

    const id = Number(path.parse(filePath).name)
    const slug = `${id}-${slugify(meta.title)}`
    const blogPost: Blog = {
      id,
      slug,
      ...meta
    }

    blogs.push(blogPost)
  }

  blogs.sort((a, b) => {
    return a.id - b.id
  })

  return json(blogs)
}
