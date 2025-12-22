import { mount, unmount } from "svelte"
import CopyButton from "$lib/components/CopyButton.svelte"

export function copyCode(node: HTMLElement) {
  const preTags = node.querySelectorAll("pre")
  const components: any[] = []

  preTags.forEach((pre) => {
    if (pre.parentElement?.classList.contains("code-wrapper")) return

    const wrapper = document.createElement("div")

    wrapper.className = "code-wrapper relative group mb-4"
    pre.parentNode?.insertBefore(wrapper, pre)
    wrapper.appendChild(pre)

    const code = pre.querySelector("code")?.innerText || pre.innerText

    const component = mount(CopyButton, {
      target: wrapper,
      props: { text: code }
    })

    components.push(component)
  })

  return {
    destroy() {
      components.forEach((c) => unmount(c))
    }
  }
}
