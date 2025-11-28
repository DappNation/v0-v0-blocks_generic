import type React from "react"
import type { Metadata } from "next"
import { Inter, Crimson_Pro } from "next/font/google"
import "./globals.css"
import { siteConfig } from "@/config/site"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const crimson = Crimson_Pro({
  subsets: ["latin"],
  variable: "--font-crimson",
})

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} Documentation`,
    template: `%s | ${siteConfig.name} Docs`,
  },
  description: siteConfig.description,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${crimson.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
