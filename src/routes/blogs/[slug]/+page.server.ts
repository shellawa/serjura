import { error } from "@sveltejs/kit"
import type { Blog } from "$lib/types"
import { parseMarkdown } from "$lib/utils/markdown.js"

const modules = import.meta.glob("/src/contents/blogs/*.md", {
  query: "?raw",
  import: "default"
})

const sortedIds = Object.keys(modules)
  .map((path) => {
    const match = path.match(/\/(\d+)\.md$/)
    return match ? parseInt(match[1], 10) : NaN
  })
  .filter((id) => !isNaN(id))
  .sort((a, b) => a - b)

export const load = async ({ params }) => {
  const { slug } = params

  const currentId = parseInt(slug.split("-")[0], 10)
  const filePath = `/src/contents/blogs/${currentId}.md`
  const loader = modules[filePath]

  if (!loader) {
    error(404, `Post with ID "${currentId}" not found`)
  }

  const index = sortedIds.indexOf(currentId)
  const prevId = index > 0 ? sortedIds[index - 1] : null
  const nextId = index < sortedIds.length - 1 ? sortedIds[index + 1] : null

  try {
    const md = (await loader()) as string
    const parsed = await parseMarkdown(md)
    const meta = parsed.meta as unknown as Omit<Blog, "id" | "slug">

    return {
      content: parsed.html,
      ...meta,
      prevId,
      nextId
    }
  } catch (e) {
    console.error(e)
    error(500, "Error parsing markdown")
  }
}
