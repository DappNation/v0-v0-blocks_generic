import type React from "react"
import type { Metadata, Viewport } from "next"
import { geistSans } from "./fonts"
import "./globals.css"

export const metadata: Metadata = {
  title: "V0 Blocks - 3D Block Builder",
  description: "A 3D block building application powered by Three.js and React",
  generator: "v0.app",
  keywords: ["3D builder", "block builder", "Three.js", "React", "web3"],
  authors: [{ name: "v0" }],
  openGraph: {
    title: "V0 Blocks - 3D Block Builder",
    description: "Build amazing 3D structures with blocks",
    type: "website",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#1e1b4b",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${geistSans.variable} overflow-hidden`}>
      <body className={`${geistSans.className} antialiased overflow-hidden`}>{children}</body>
    </html>
  )
}
