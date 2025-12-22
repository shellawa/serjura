<script lang="ts">
  import { Search, Settings } from "@lucide/svelte"
  import { Input } from "$lib/components/shadcn-svelte/ui/input"
  import { Button } from "./shadcn-svelte/ui/button"
</script>

<nav class="sticky top-0 z-50 border-b border-border/50 bg-transparent backdrop-blur-md">
  <div class="mx-auto max-w-7xl px-6 py-4">
    <div class="flex items-center justify-between gap-6">
      <a href="/" class="text-xl font-semibold tracking-tight transition-colors hover:text-muted-foreground">The Serjura Hub</a>

      <div class="flex flex-1 items-center justify-end gap-6">
        <div class="relative hidden max-w-sm flex-1 sm:block">
          <Search class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input type="search" placeholder="Search..." class="border-muted bg-muted/50 pl-9" />
        </div>

        <a href="/blogs" class="text-sm text-muted-foreground transition-colors hover:text-foreground">Blogs</a>

        <a href="/novels" class="text-sm text-muted-foreground transition-colors hover:text-foreground">Novels</a>

        <Button variant="ghost" class="group text-muted-foreground">
          <Settings class="h-4 w-4 transition-transform group-hover:rotate-90" />
        </Button>
      </div>
    </div>
  </div>
</nav>
