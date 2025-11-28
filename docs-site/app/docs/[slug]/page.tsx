import type React from "react"
import { notFound } from "next/navigation"
import { docsNav } from "@/config/docs-nav"
import { MDXProvider } from "@/components/mdx-provider"

// Import all MDX content
import OverviewMDX from "@/content/overview.mdx"
import ProtocolMDX from "@/content/protocol.mdx"
import TokenomicsMDX from "@/content/tokenomics.mdx"
import GameplayMDX from "@/content/gameplay.mdx"
import BuildingMDX from "@/content/building.mdx"
import SmartContractsMDX from "@/content/smart-contracts.mdx"
import APIMDX from "@/content/api.mdx"
import FAQMDX from "@/content/faq.mdx"
import ChangelogMDX from "@/content/changelog.mdx"

const contentMap: Record<string, React.ComponentType> = {
  overview: OverviewMDX,
  protocol: ProtocolMDX,
  tokenomics: TokenomicsMDX,
  gameplay: GameplayMDX,
  building: BuildingMDX,
  "smart-contracts": SmartContractsMDX,
  api: APIMDX,
  faq: FAQMDX,
  changelog: ChangelogMDX,
}

export async function generateStaticParams() {
  return docsNav.map((item) => ({
    slug: item.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const doc = docsNav.find((item) => item.slug === params.slug)

  if (!doc) {
    return {}
  }

  return {
    title: doc.title,
    description: doc.description,
  }
}

export default function DocPage({ params }: { params: { slug: string } }) {
  const Content = contentMap[params.slug]

  if (!Content) {
    notFound()
  }

  return (
    <article className="prose prose-neutral max-w-none">
      <MDXProvider>
        <Content />
      </MDXProvider>
    </article>
  )
}
