import type React from "react"
import type { Metadata, Viewport } from "next"
import { jetbrainsMono, spaceGrotesk } from "./fonts"
import { Providers } from "./providers"
import "./globals.css"

export const metadata: Metadata = {
  title: "ETHBLOX - On-Chain Creative Protocol",
  description:
    "A crypto-native 3D art experiment where BLOX (matter), BRICKS (moulds), and BUILDS (creations) turn on-chain culture into a game of geometry.",
  generator: "v0.app",
  keywords: ["ETHBLOX", "web3", "ethereum", "3D builder", "NFT", "on-chain art", "crypto art"],
  authors: [{ name: "ETHBLOX" }],
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "ETHBLOX - On-Chain Creative Protocol",
    description: "Digital matter meets Ethereum. Build, create, mint.",
    type: "website",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#1e2228",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${spaceGrotesk.variable}`}>
      <body className={`${jetbrainsMono.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
