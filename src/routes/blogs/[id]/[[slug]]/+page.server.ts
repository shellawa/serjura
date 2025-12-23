import { error, redirect } from "@sveltejs/kit"
import { getBlogs, getBlogById } from "$lib/server/blogs.js"
import type { EntryGenerator } from "./$types"

export const load = async ({ params }) => {
  const slug = params.slug
  const id = parseInt(params.id, 10)
  if (isNaN(id)) {
    error(404, "Invalid Blog ID")
  }

  const blog = await getBlogById(id)

  if (!blog) {
    error(404, "Blog not found")
  }

  if (slug !== blog.meta.slug) {
    redirect(308, `/blogs/${id}/${blog.meta.slug}`)
  }

  return blog
}

export const entries: EntryGenerator = async () => {
  const blogs = await getBlogs()
  const allEntries = []

  for (const blog of blogs) {
    allEntries.push({ id: blog.meta.id.toString() })
  }

  return allEntries
}
