import type { Build } from "./types"

export type BloxOnchainBuild = {
  id: string
  owner: `0x${string}`
  mass: bigint
  bw: bigint
  metadataURI: string
}

export interface EthbloxContracts {
  getBuild(id: string): Promise<BloxOnchainBuild | null>
  prepareMetadata(build: Build): Promise<{ metadataJson: string; suggestedName: string }>
}

// Mock implementation for now
export const ethbloxContracts: EthbloxContracts = {
  async getBuild(id: string): Promise<BloxOnchainBuild | null> {
    // TODO: Call actual contract when deployed
    console.log("[v0] Mock getBuild called for ID:", id)
    return null
  },

  async prepareMetadata(build: Build): Promise<{ metadataJson: string; suggestedName: string }> {
    // Prepare ERC721/1155 metadata format
    const metadata = {
      name: build.metadata.name,
      description: build.metadata.description || "An ETHBLOX creation",
      image: "", // TODO: Generate or upload thumbnail
      attributes: [
        { trait_type: "Mass", value: build.metadata.mass },
        { trait_type: "Builder Weight", value: build.metadata.bw.toFixed(2) },
        { trait_type: "Unique Colors", value: build.metadata.uniqueColors },
        { trait_type: "BLOX Count", value: build.blox.length },
      ],
      properties: {
        blox: build.blox,
        created: build.metadata.createdAt,
      },
    }

    return {
      metadataJson: JSON.stringify(metadata, null, 2),
      suggestedName: build.metadata.name,
    }
  },
}
