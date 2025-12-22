<script lang="ts">
  import { Badge } from "$lib/components/shadcn-svelte/ui/badge/index.js"
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "$lib/components/shadcn-svelte/ui/card/"

  const { data } = $props()
</script>

<main class="mx-auto max-w-6xl px-6 py-16">
  <div class="space-y-4">
    {#each data.blogs as blog}
      <a href={`/blogs/${blog.slug}`} class="block">
        <Card class="border-border/50 bg-transparent transition-colors hover:border-border hover:bg-primary-foreground/10">
          <CardHeader>
            <div class="flex items-start justify-between gap-4">
              <div class="flex-1 space-y-2">
                <CardTitle class="text-xl">{blog.title}</CardTitle>
                <CardDescription>{blog.description ?? "No description added."}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {#if blog.tags}
              <div class="space-x-2">
                {#each blog.tags as tagName}
                  <Badge variant="outline" class="px-3 py-1 hover:bg-primary-foreground/40">{tagName}</Badge>
                {/each}
              </div>
            {/if}
            <div class="flex items-center gap-3 text-sm text-muted-foreground">
              <time dateTime={blog.created}>{blog.created}</time>
            </div>
          </CardContent>
        </Card>
      </a>
    {/each}
  </div>
</main>
