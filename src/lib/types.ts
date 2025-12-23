import type { Root as MdastRoot } from "mdast"
import type { Root as HastRoot } from "hast"
import type { Transformer } from "unified"

export type Heading = {
  id: string
  level: number
  title: string
}

export type BlogMeta = {
  id: number
  slug: string
  title: string
  description?: string
  tags: string[]
  created: string
  headings: Heading[]
  modified?: string
  published?: boolean
}

export type { MdastRoot, HastRoot }
export type HastTransformer = Transformer<HastRoot, HastRoot>
export type MdastTransformer = Transformer<MdastRoot, MdastRoot>
