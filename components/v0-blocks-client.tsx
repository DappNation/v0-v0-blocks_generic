"use client"

import dynamic from "next/dynamic"
import { LoadingBrick } from "@/components/loading-brick"

const V0Blocks = dynamic(() => import("@/components/v0-blocks"), {
  ssr: false,
  loading: () => <LoadingBrick />,
})

export function V0BlocksClient() {
  return <V0Blocks />
}
