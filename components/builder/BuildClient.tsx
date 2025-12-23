"use client"

import dynamic from "next/dynamic"
import { LoadingBrick } from "@/components/loading-brick"

const V0Blocks = dynamic(() => import("./V0Blocks"), {
  ssr: false,
  loading: () => <LoadingBrick />,
})

export default function BuildClient() {
  return <V0Blocks />
}
