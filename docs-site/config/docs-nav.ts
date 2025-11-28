export type NavItem = {
  title: string
  slug: string
  description?: string
}

export const docsNav: NavItem[] = [
  {
    title: "Overview",
    slug: "overview",
    description: "Introduction to ETHBLOX protocol",
  },
  {
    title: "Protocol",
    slug: "protocol",
    description: "Core protocol mechanics",
  },
  {
    title: "Tokenomics",
    slug: "tokenomics",
    description: "BLOX token economics",
  },
  {
    title: "Gameplay",
    slug: "gameplay",
    description: "How to build and earn",
  },
  {
    title: "Building",
    slug: "building",
    description: "Builder interface guide",
  },
  {
    title: "Smart Contracts",
    slug: "smart-contracts",
    description: "Contract architecture",
  },
  {
    title: "API",
    slug: "api",
    description: "API reference",
  },
  {
    title: "FAQ",
    slug: "faq",
    description: "Frequently asked questions",
  },
  {
    title: "Changelog",
    slug: "changelog",
    description: "Version history",
  },
]
