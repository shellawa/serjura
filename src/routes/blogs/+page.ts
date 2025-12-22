import type { Blog } from "$lib/types"

export const load = async ({ fetch }) => {
  const res = await fetch("/api/blogs")
  const blogs: Blog[] = await res.json()
  return { blogs }
}
