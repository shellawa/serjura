<script lang="ts">
  import { onMount, onDestroy } from "svelte"
  import { animateScroll } from "svelte-scrollto-element"
  import { getWindow, getDocument } from "ssr-window"
  import { changeHashWithoutScrolling } from "$lib/utils/helpers"
  import { ArrowLeft } from "@lucide/svelte"
  import { Card } from "$lib/components/shadcn-svelte/ui/card/"
  import { copyCode } from "$lib/utils/copy-code.js"

  const window = getWindow()
  const document = getDocument()

  const { data } = $props()

  let activeHeading = $state("")
  const NAVBAR = 72
  let headingsEls: HTMLElement[] = []

  let isScrolling = false
  const scrollTo = (id: string) => {
    isScrolling = true
    activeHeading = id.slice(1)
    animateScroll.scrollTo({ element: id, offset: -NAVBAR, duration: 500, onDone: () => (isScrolling = false) })
    changeHashWithoutScrolling(id)
  }

  const updateActive = () => {
    if (isScrolling) return
    let current = activeHeading
    for (const el of headingsEls) {
      if (el.getBoundingClientRect().top - NAVBAR - 4 <= 0) {
        current = el.id
      } else {
        break
      }
    }

    activeHeading = current
  }

  onMount(() => {
    headingsEls = data.meta.headings.map((h) => document.getElementById(h.id)).filter(Boolean) as HTMLElement[]
    if (location.hash) scrollTo(location.hash)

    window.addEventListener("scroll", updateActive, { passive: true })
    updateActive()
  })

  onDestroy(() => {
    window.removeEventListener("scroll", updateActive)
  })
</script>

<main class="mx-auto max-w-7xl px-6 py-16">
  <a href="/blogs" class="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
    <ArrowLeft class="h-4 w-4" />
    Back to blogs
  </a>

  <div class="flex items-start gap-12">
    <article class="prose max-w-3xl flex-1 prose-invert">
      <!-- meta -->
      <div class="mb-12 space-y-4">
        <h1 class="text-5xl font-bold tracking-tight text-balance">{data.meta.title}</h1>
        <div class="flex items-center gap-3 text-sm text-muted-foreground">
          <time dateTime={data.meta.created}>{data.meta.created}</time>
        </div>
      </div>
      <!-- content -->
      <div use:copyCode>
        {@html data.content}
      </div>
    </article>
    <!-- toc -->
    <aside class="sticky top-24 hidden w-64 lg:block">
      <Card class="p-6">
        <h3 class="text-sm font-semibold text-foreground">Table of Contents</h3>
        <nav class="relative space-y-1 pl-2">
          {#each data.meta.headings as heading (heading.id)}
            <button
              onclick={() => scrollTo("#" + heading.id)}
              class="group relative block w-full cursor-pointer text-left text-sm transition-colors
               {activeHeading === heading.id ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}"
              style="padding-left: {(heading.level - 1) * 12}px;"
            >
              {heading.title}
            </button>
          {/each}
        </nav>
      </Card>
    </aside>
  </div>
</main>

<style>
  :global(html.dark .shiki, html.dark .shiki span) {
    color: var(--shiki-dark) !important;
    background-color: var(--shiki-dark-bg) !important;
    font-style: var(--shiki-dark-font-style) !important;
    font-weight: var(--shiki-dark-font-weight) !important;
    text-decoration: var(--shiki-dark-text-decoration) !important;
  }
</style>
