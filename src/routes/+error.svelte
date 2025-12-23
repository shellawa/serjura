<script lang="ts">
  import { page } from "$app/state"
  import { goto } from "$app/navigation"
  import { onMount } from "svelte"

  const safeRedirect = (target: string) => {
    if (page.url.pathname !== target) goto(target, { replaceState: true })
  }

  onMount(() => {
    if (page.status !== 404) return

    const path = page.url.pathname

    // redirect /blogs/id/wrong_slug to /blogs/id
    const BLOGS_REGEX = /^\/blogs\/(\d+)/

    if (BLOGS_REGEX.test(path)) {
      const match = path.match(BLOGS_REGEX)
      if (match) {
        safeRedirect(`/blogs/${match[1]}`)
      }
    }
  })
</script>

<div class="flex flex-col items-center justify-center p-4 text-center">
  <h1 class="text-4xl font-bold">404</h1>
  <p class="mt-2 text-lg">Page not found</p>
  <a href="/" class="mt-6 hover:underline">Go Home</a>
</div>
