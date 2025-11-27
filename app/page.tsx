"use client"

import dynamic from "next/dynamic"

const V0Blocks = dynamic(() => import("@/components/v0-blocks"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 w-full h-full bg-purple-950 flex items-center justify-center">
      <div className="text-white text-lg">Loading 3D Environment...</div>
    </div>
  ),
})

export default function Home() {
  return <V0Blocks />
}
