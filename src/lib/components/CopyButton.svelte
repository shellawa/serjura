<script lang="ts">
  import { Check, Copy } from "@lucide/svelte"

  let { text } = $props()
  let copied = $state(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      copied = true
      setTimeout(() => (copied = false), 1500)
    } catch (e) {
      console.error("Failed to copy", e)
    }
  }
</script>

<button
  onclick={copy}
  aria-label="Copy code"
  class="absolute top-2 right-2 cursor-pointer rounded-md bg-gray-700/60 p-2 text-white opacity-0 transition-all group-hover:opacity-80 hover:bg-gray-700"
>
  {#if copied}
    <Check size="16" />
  {:else}
    <Copy size="16" />
  {/if}
</button>
