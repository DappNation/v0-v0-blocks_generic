"use client"

import dynamic from "next/dynamic"
import { LoadingBrick } from "@/components/loading-brick"

// All Three.js code is isolated behind this boundary
const V0Blocks = dynamic(() => import("@/components/v0-blocks"), {
  ssr: false,
  loading: () => <LoadingBrick />,
})

export default function BuildClient() {
  return <V0Blocks />
}
