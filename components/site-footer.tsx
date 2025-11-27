"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"

export function SiteFooter() {
  const [email, setEmail] = useState("")
  const [subscribeStatus, setSubscribeStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setSubscribeStatus("error")
      return
    }
    // TODO: Implement newsletter subscription
    setSubscribeStatus("success")
    setTimeout(() => setSubscribeStatus("idle"), 3000)
  }

  return (
    <footer className="border-t border-[hsl(var(--ethblox-border))] bg-black relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="animate-float-up absolute bottom-0 left-[10%] w-1 h-1 bg-[hsl(var(--ethblox-blue))]/30 rounded-sm" />
        <div
          className="animate-float-up absolute bottom-0 left-[30%] w-1 h-1 bg-[hsl(var(--ethblox-blue))]/30 rounded-sm"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="animate-float-up absolute bottom-0 left-[50%] w-1 h-1 bg-[hsl(var(--ethblox-blue))]/30 rounded-sm"
          style={{ animationDelay: "4s" }}
        />
        <div
          className="animate-float-up absolute bottom-0 left-[70%] w-1 h-1 bg-[hsl(var(--ethblox-blue))]/30 rounded-sm"
          style={{ animationDelay: "6s" }}
        />
        <div
          className="animate-float-up absolute bottom-0 left-[90%] w-1 h-1 bg-[hsl(var(--ethblox-blue))]/30 rounded-sm"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--ethblox-blue)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--ethblox-blue)) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="container mx-auto px-6 max-w-[1800px] relative z-10 py-16">
        {/* Newsletter Section */}
        <div className="mb-16 pb-16 border-b border-[hsl(var(--ethblox-border))]">
          <div className="max-w-xl">
            <h3 className="font-heading text-2xl font-bold text-[hsl(var(--ethblox-yellow))] mb-3 tracking-tight">
              Stay Updated
            </h3>
            <p className="text-sm text-[hsl(var(--ethblox-text-secondary))] mb-6">
              Get notified about releases, upgrades, and builder events.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="flex-1 px-4 py-2 bg-[hsl(var(--ethblox-surface))] border border-[hsl(var(--ethblox-border))] rounded text-sm text-[hsl(var(--ethblox-text-primary))] placeholder:text-[hsl(var(--ethblox-text-tertiary))] focus:outline-none focus:border-[hsl(var(--ethblox-blue))] focus:ring-1 focus:ring-[hsl(var(--ethblox-blue))] transition-all"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-[hsl(var(--ethblox-green))] text-[hsl(var(--ethblox-bg))] font-medium text-sm rounded hover:bg-[hsl(var(--ethblox-green))]/90 transition-all hover:shadow-[0_0_15px_rgba(74,222,128,0.3)]"
              >
                Subscribe
              </button>
            </form>
            {subscribeStatus === "success" && (
              <p className="text-xs text-[hsl(var(--ethblox-green))] mt-2">Successfully subscribed!</p>
            )}
            {subscribeStatus === "error" && (
              <p className="text-xs text-red-400 mt-2">Please enter a valid email address</p>
            )}
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Block */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src="/images/ethblox-logo.png" alt="ETHBLOX" className="w-8 h-8" />
              <h3 className="font-heading text-xl font-bold text-[hsl(var(--ethblox-yellow))] tracking-wider">
                ETHBLOX
              </h3>
            </div>
            <p className="text-sm text-[hsl(var(--ethblox-text-secondary))] mb-6 leading-relaxed">
              Programmable matter for Ethereum's next cultural era.
            </p>
            <p className="text-xs text-[hsl(var(--ethblox-text-tertiary))] font-mono">
              © {new Date().getFullYear()} ETHBLOX Protocol.
              <br />
              All rights reserved.
            </p>
          </div>

          {/* Column A - Protocol */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-[hsl(var(--ethblox-text-primary))] mb-4 tracking-wider uppercase">
              Protocol
            </h4>
            <ul className="space-y-2.5">
              {[
                "Overview",
                "BLOX",
                "BRICKS",
                "BUILDS",
                "Builder Weight (BW)",
                "Circular Economy",
                "Smart Contracts",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(/\s+/g, "-").replace(/[()]/g, "")}`}
                    className="text-sm text-[hsl(var(--ethblox-text-secondary))] hover:text-[hsl(var(--ethblox-blue))] transition-colors hover:pl-1 inline-block duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column B - Resources */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-[hsl(var(--ethblox-text-primary))] mb-4 tracking-wider uppercase">
              Resources
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/curve-guides"
                  className="text-sm text-[hsl(var(--ethblox-text-secondary))] hover:text-[hsl(var(--ethblox-blue))] transition-colors hover:pl-1 inline-block duration-200"
                >
                  Docs
                </Link>
              </li>
              <li>
                <a
                  href="https://docs.google.com/document/d/e/2PACX-1vQ1rIXEv29dH1xJ5R2Y-nPWx4k-Lbknw_IvIDhLvu2bUxuAyJCs3pgq48CXGZB7UMM4a32H08PKbNqB/pub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[hsl(var(--ethblox-text-secondary))] hover:text-[hsl(var(--ethblox-blue))] transition-colors hover:pl-1 inline-block duration-200"
                >
                  Whitepaper
                </a>
              </li>
              {["API Playground", "GitHub", "Security & Audits", "Brand Assets", "FAQ"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and")}`}
                    className="text-sm text-[hsl(var(--ethblox-text-secondary))] hover:text-[hsl(var(--ethblox-blue))] transition-colors hover:pl-1 inline-block duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column C - Community */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-[hsl(var(--ethblox-text-primary))] mb-4 tracking-wider uppercase">
              Community
            </h4>
            <ul className="space-y-2.5">
              {[
                { name: "X (Twitter)", href: "https://twitter.com/ethblox" },
                { name: "Discord", href: "https://discord.gg/ethblox" },
                { name: "Farcaster", href: "https://warpcast.com/ethblox" },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[hsl(var(--ethblox-text-secondary))] hover:text-[hsl(var(--ethblox-blue))] transition-colors hover:pl-1 inline-block duration-200"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
              {["Community Calls", "Governance", "Grants & Bounties"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and")}`}
                    className="text-sm text-[hsl(var(--ethblox-text-secondary))] hover:text-[hsl(var(--ethblox-blue))] transition-colors hover:pl-1 inline-block duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column D - Explore + Legal */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-[hsl(var(--ethblox-text-primary))] mb-4 tracking-wider uppercase">
              Explore
            </h4>
            <ul className="space-y-2.5 mb-8">
              <li>
                <Link
                  href="/gallery"
                  className="text-sm text-[hsl(var(--ethblox-text-secondary))] hover:text-[hsl(var(--ethblox-blue))] transition-colors hover:pl-1 inline-block duration-200"
                >
                  Genesis BRICKS
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-sm text-[hsl(var(--ethblox-text-secondary))] hover:text-[hsl(var(--ethblox-blue))] transition-colors hover:pl-1 inline-block duration-200"
                >
                  Featured Builds
                </Link>
              </li>
              {["Top Builders", "Build Explorer", "Leaderboards"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-sm text-[hsl(var(--ethblox-text-secondary))] hover:text-[hsl(var(--ethblox-blue))] transition-colors hover:pl-1 inline-block duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="font-heading text-sm font-semibold text-[hsl(var(--ethblox-text-primary))] mb-4 tracking-wider uppercase">
              Legal
            </h4>
            <ul className="space-y-2.5">
              {["Terms of Service", "Privacy Policy", "Cookie Policy", "Disclaimers"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-sm text-[hsl(var(--ethblox-text-secondary))] hover:text-[hsl(var(--ethblox-blue))] transition-colors hover:pl-1 inline-block duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[hsl(var(--ethblox-border))] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-[hsl(var(--ethblox-text-tertiary))]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z" />
            </svg>
            <span className="text-xs text-[hsl(var(--ethblox-text-tertiary))] font-mono">Powered by Ethereum</span>
          </div>

          <div className="text-center">
            <p className="text-xs text-[hsl(var(--ethblox-text-tertiary))] font-mono">
              Not investment advice. DYOR. Smart contract interactions carry risk.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://etherscan.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[hsl(var(--ethblox-text-tertiary))] hover:text-[hsl(var(--ethblox-blue))] transition-colors font-mono"
            >
              View on Etherscan
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
