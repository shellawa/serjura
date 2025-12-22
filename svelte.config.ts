import adapter from "@sveltejs/adapter-static"
import { type Config } from "@sveltejs/kit"
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte"

const config: Config = {
  preprocess: [vitePreprocess()],
  kit: {
    adapter: adapter({ fallback: "404.html" }),
    prerender: { handleUnseenRoutes: "warn", handleHttpError: "warn", handleMissingId: "warn" }
  },
  extensions: [".svelte"]
}

export default config
