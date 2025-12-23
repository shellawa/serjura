import type { BlogMeta } from "$lib/types"

export const load = async ({ fetch }) => {
  const res = await fetch("/api/blogs")
  const blogs: BlogMeta[] = await res.json()
  return { blogs }
}
