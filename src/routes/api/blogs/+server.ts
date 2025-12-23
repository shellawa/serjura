import { json, type RequestHandler } from "@sveltejs/kit"
import { getBlogs } from "$lib/server/blogs"

export const GET: RequestHandler = async ({ params }) => {
  const blogs = await getBlogs()
  return json(blogs.map((blog) => blog.meta))
}
