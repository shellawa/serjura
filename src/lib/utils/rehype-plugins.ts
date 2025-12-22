import { visit } from "unist-util-visit"
import { toString } from "hast-util-to-string"
import { headingRank } from "hast-util-heading-rank"
import type { HastTransformer, Heading } from "$lib/types"

export const rehypeHeadingExport = (): HastTransformer => {
  return (tree, vFile) => {
    const headings: Heading[] = []

    visit(tree, "element", (node) => {
      const level = headingRank(node)

      if (level) {
        headings.push({
          id: node.properties?.id?.toString() || "",
          level,
          title: toString(node)
        })
      }
    })

    vFile.data.matter = vFile.data.matter || {}
    ;(vFile.data.matter as any).headings = headings
  }
}
