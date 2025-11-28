import type React from "react"
import type { MDXComponents } from "mdx/types"
import { Callout } from "./callout"
import { Tag } from "./tag"

const components: MDXComponents = {
  h1: ({ children }) => <h1 className="font-serif text-4xl font-bold tracking-tight mb-4">{children}</h1>,
  h2: ({ children }) => <h2 className="font-serif text-3xl font-bold tracking-tight mt-10 mb-4">{children}</h2>,
  h3: ({ children }) => <h3 className="font-serif text-2xl font-semibold tracking-tight mt-8 mb-3">{children}</h3>,
  p: ({ children }) => <p className="leading-7 mb-4 [&:not(:first-child)]:mt-6">{children}</p>,
  code: ({ children }) => (
    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">{children}</code>
  ),
  pre: ({ children }) => <pre className="mb-4 mt-6 overflow-x-auto rounded-lg border bg-muted p-4">{children}</pre>,
  ul: ({ children }) => <ul className="my-6 ml-6 list-disc [&>li]:mt-2">{children}</ul>,
  ol: ({ children }) => <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">{children}</ol>,
  Callout,
  Tag,
}

export function MDXProvider({ children }: { children: React.ReactNode }) {
  return <div className="mdx">{children}</div>
}

export { components as mdxComponents }
