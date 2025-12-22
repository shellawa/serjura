<script>
  import { Twitter, Github } from "@lucide/svelte"
</script>

<main class="mx-auto max-w-6xl px-6 py-16">
  <div class="space-y-16">
    <section class="max-w-3xl space-y-6 py-8">
      <h1 class="text-6xl font-bold tracking-tight text-balance">The Serjura Hub</h1>

      <p class="text-xl leading-relaxed text-pretty text-muted-foreground">This is where I'm poorly translating stuff or shitposting.</p>

      <div class="flex gap-3 pt-4">
        <a href="https://github.com" target="_blank" class="text-muted-foreground transition-colors hover:text-foreground">
          <Github class="h-5 w-5" />
        </a>

        <a href="https://twitter.com" target="_blank" class="text-muted-foreground transition-colors hover:text-foreground">
          <Twitter class="h-5 w-5" />
        </a>
      </div>
    </section>
  </div>
</main>
