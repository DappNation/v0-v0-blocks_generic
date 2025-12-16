/**
 * Builder SSR Safety:
 * - The builder is client-only and must never render on the server
 * - V0BlocksClient uses dynamic import with ssr: false
 * - All Three.js/R3F components are marked "use client"
 * - No server imports of client-only modules (Three.js, Canvas, etc.)
 */

import { V0BlocksClient } from "@/components/v0-blocks-client"

export default function BuilderPage() {
  return <V0BlocksClient />
}
