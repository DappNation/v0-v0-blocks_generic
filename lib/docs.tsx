import type { ReactNode } from "react"

export function getDocContent(slug: string): ReactNode {
  const docs: Record<string, ReactNode> = {
    overview: <OverviewDoc />,
    protocol: <ProtocolDoc />,
    building: <BuildingDoc />,
    tokenomics: <TokenomicsDoc />,
    gameplay: <GameplayDoc />,
    "smart-contracts": <SmartContractsDoc />,
    api: <ApiDoc />,
    faq: <FaqDoc />,
    changelog: <ChangelogDoc />,
  }

  return docs[slug] || null
}

function OverviewDoc() {
  return (
    <>
      <h1>Getting Started with ETHBLOX</h1>

      <div className="bg-[hsl(var(--ethblox-surface))] border border-[hsl(var(--ethblox-border))] rounded-lg p-4 my-6">
        <p className="text-[hsl(var(--ethblox-accent-cyan))] font-semibold mb-2">💡 Quick Start</p>
        <p className="text-sm m-0">This guide will get you building in under 5 minutes.</p>
      </div>

      <h2>What is ETHBLOX?</h2>
      <p>
        ETHBLOX is an on-chain 3D voxel builder powered by Ethereum. Create digital sculptures, mint them as NFTs, and
        participate in a creative economy with conserved matter physics.
      </p>

      <h2>Installation</h2>
      <h3>Prerequisites</h3>
      <ul>
        <li>
          <strong>Web3 Wallet</strong>: MetaMask (recommended)
        </li>
        <li>
          <strong>Browser</strong>: Chrome, Firefox, or Brave with WebGL support
        </li>
        <li>
          <strong>Network</strong>: Base (for building), Ethereum (for minting)
        </li>
      </ul>

      <h3>Step 1: Install MetaMask</h3>
      <ol>
        <li>
          Visit{" "}
          <a href="https://metamask.io" target="_blank" rel="noopener noreferrer">
            metamask.io
          </a>
        </li>
        <li>Download the browser extension</li>
        <li>Create a new wallet or import an existing one</li>
        <li>Save your seed phrase securely (never share this!)</li>
      </ol>

      <h3>Step 2: Add Base Network</h3>
      <p>Base is a Layer 2 network with low fees, perfect for building:</p>
      <pre>
        <code>{`Network Name: Base
RPC URL: https://mainnet.base.org
Chain ID: 8453
Currency Symbol: ETH
Block Explorer: https://basescan.org`}</code>
      </pre>

      <h3>Step 3: Get ETH on Base</h3>
      <ul>
        <li>
          Bridge ETH from Ethereum using{" "}
          <a href="https://bridge.base.org" target="_blank" rel="noreferrer">
            Base Bridge
          </a>
        </li>
        <li>Or buy directly on Base via exchanges like Coinbase</li>
      </ul>

      <h2>Quick Start Guide</h2>

      <h3>1. Connect Your Wallet</h3>
      <p>
        Click <strong>"Connect Wallet"</strong> in the top right and approve the connection.
      </p>

      <h3>2. Navigate to Builder</h3>
      <p>
        Go to <code>/build</code> to access the 3D interface.
      </p>

      <h3>3. Place Your First Block</h3>
      <ul>
        <li>
          Select a color from the palette (or press <kbd>1-8</kbd>)
        </li>
        <li>Choose block size (width/depth sliders)</li>
        <li>Click on the platform to place</li>
      </ul>

      <h3>4. Camera Controls</h3>
      <ul>
        <li>
          <strong>Rotate</strong>: Left-click + drag
        </li>
        <li>
          <strong>Pan</strong>: Right-click + drag
        </li>
        <li>
          <strong>Zoom</strong>: Scroll wheel
        </li>
        <li>
          <strong>Mode</strong>: Press <kbd>M</kbd> for move mode
        </li>
      </ul>

      <h3>5. Save Your Build</h3>
      <p>
        Press <kbd>Cmd+S</kbd> (Mac) or <kbd>Ctrl+S</kbd> (Windows), name your creation, and save!
      </p>

      <h2>Keyboard Shortcuts</h2>
      <table>
        <thead>
          <tr>
            <th>Shortcut</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <kbd>1-8</kbd>
            </td>
            <td>Select color</td>
          </tr>
          <tr>
            <td>
              <kbd>W/S</kbd>
            </td>
            <td>Adjust width</td>
          </tr>
          <tr>
            <td>
              <kbd>A/D</kbd>
            </td>
            <td>Adjust depth</td>
          </tr>
          <tr>
            <td>
              <kbd>B/M/E</kbd>
            </td>
            <td>Build/Move/Erase mode</td>
          </tr>
          <tr>
            <td>
              <kbd>Cmd+Z</kbd>
            </td>
            <td>Undo</td>
          </tr>
          <tr>
            <td>
              <kbd>Cmd+Shift+Z</kbd>
            </td>
            <td>Redo</td>
          </tr>
          <tr>
            <td>
              <kbd>Cmd+S</kbd>
            </td>
            <td>Save</td>
          </tr>
          <tr>
            <td>
              <kbd>Cmd+O</kbd>
            </td>
            <td>Load</td>
          </tr>
          <tr>
            <td>
              <kbd>Space</kbd>
            </td>
            <td>Auto-rotate</td>
          </tr>
        </tbody>
      </table>

      <h2>Next Steps</h2>
      <ul>
        <li>
          Read the <a href="/docs/building">Building Guide</a> for advanced techniques
        </li>
        <li>
          Learn about <a href="/docs/protocol">BLOX Economics</a>
        </li>
        <li>
          Explore the <a href="/gallery">Community Gallery</a>
        </li>
      </ul>
    </>
  )
}

function ProtocolDoc() {
  return (
    <>
      <h1>ETHBLOX Protocol</h1>
      <p>Understanding the economics and mechanics of the ETHBLOX universe.</p>

      <h2>Core Concepts</h2>
      <h3>BLOX: Digital Matter</h3>
      <p>BLOX is the fundamental building material of ETHBLOX. It follows conservation laws:</p>
      <ul>
        <li>
          <strong>No Burning</strong>: BLOX cannot be destroyed, only transformed
        </li>
        <li>
          <strong>Locked in Builds</strong>: When used, BLOX is temporarily removed from circulation
        </li>
        <li>
          <strong>Released on Destruction</strong>: Breaking a build returns BLOX (minus 20% entropy fee)
        </li>
      </ul>

      <h3>Builder Weight (BW)</h3>
      <p>Your reputation score, calculated as:</p>
      <pre>
        <code>BW = log(1 + mass) × log(2 + uniqueColors)</code>
      </pre>
      <p>Where:</p>
      <ul>
        <li>
          <strong>mass</strong> = total number of blocks
        </li>
        <li>
          <strong>uniqueColors</strong> = color diversity
        </li>
      </ul>

      <h3>Matter Locking Ratio (MLR)</h3>
      <pre>
        <code>MLR = totalBloxLocked / circulatingSupply</code>
      </pre>
      <p>High MLR = healthy creative economy with supply scarcity.</p>

      <h2>Economic Mechanics</h2>
      <h3>Licence System</h3>
      <p>To use special moulds (BRICKS), you pay a licence fee:</p>
      <pre>
        <code>cost = basePrice × (1 + k × sqrt(usageCount))</code>
      </pre>
      <p>This creates dynamic pricing based on demand.</p>

      <h3>Fee Distribution</h3>
      <ul>
        <li>70% to mould creator (perpetual royalty)</li>
        <li>20% to BLOX/ETH liquidity pool</li>
        <li>10% to protocol treasury</li>
      </ul>

      <h2>Supply Dynamics</h2>
      <p>BLOX has a fixed total supply of 1 billion tokens with daily emissions rewarding builders.</p>

      <h3>Emission Schedule</h3>
      <ul>
        <li>
          <strong>Phase 1</strong> (Year 1): 10,000 BLOX/day
        </li>
        <li>
          <strong>Phase 2</strong> (Year 2-3): 5,000 BLOX/day
        </li>
        <li>
          <strong>Phase 3</strong> (Year 4+): 2,500 BLOX/day
        </li>
      </ul>

      <p>Emissions halve every 2 years, approaching zero asymptotically.</p>
    </>
  )
}

function BuildingDoc() {
  return (
    <>
      <h1>Building Guide</h1>
      <p>Master the ETHBLOX 3D builder interface.</p>

      <h2>Interface Overview</h2>
      <h3>Left Toolbar</h3>
      <ul>
        <li>
          <strong>Color Palette</strong>: 8 colors per theme (default/muted/monochrome)
        </li>
        <li>
          <strong>Dimension Controls</strong>: Width/Depth sliders (1-20 range)
        </li>
        <li>
          <strong>Mode Selector</strong>: Build, Move, Erase
        </li>
      </ul>

      <h3>Top Toolbar</h3>
      <ul>
        <li>
          <strong>File Controls</strong>: Save, Load, Clear
        </li>
        <li>
          <strong>History</strong>: Undo/Redo buttons
        </li>
        <li>
          <strong>View</strong>: Auto-rotate toggle
        </li>
      </ul>

      <h2>Building Techniques</h2>
      <h3>Stacking</h3>
      <p>Blocks automatically snap to the top of existing structures. To stack:</p>
      <ol>
        <li>Click on an existing block</li>
        <li>New block places directly above</li>
        <li>Y-position increases by 1.2 units per layer</li>
      </ol>

      <h3>Precision Placement</h3>
      <p>
        Hold <kbd>Shift</kbd> while clicking for 0.5-unit grid snapping (not yet implemented).
      </p>

      <h3>Color Blending</h3>
      <p>
        Use multiple colors to create gradients and depth. Press <kbd>T</kbd> to cycle themes.
      </p>

      <h2>Advanced Tips</h2>
      <ul>
        <li>
          <strong>Symmetry</strong>: Build one half, then mirror (planned feature)
        </li>
        <li>
          <strong>Hollow Structures</strong>: Use erase mode to carve interiors
        </li>
        <li>
          <strong>Performance</strong>: Builds over 1000 blocks may lag - use larger block sizes
        </li>
      </ul>

      <h2>Saving & Loading</h2>
      <h3>Local vs Cloud</h3>
      <ul>
        <li>
          <strong>Auto-save</strong>: Current build saves to localStorage automatically
        </li>
        <li>
          <strong>Named Saves</strong>: Stored in Redis (requires wallet connection)
        </li>
        <li>
          <strong>Gallery Publish</strong>: Makes build public (not yet implemented in UI)
        </li>
      </ul>
    </>
  )
}

function TokenomicsDoc() {
  return (
    <>
      <h1>Tokenomics</h1>
      <p>BLOX token distribution and economic model.</p>

      <h2>Token Details</h2>
      <ul>
        <li>
          <strong>Name</strong>: BLOX
        </li>
        <li>
          <strong>Symbol</strong>: BLOX
        </li>
        <li>
          <strong>Total Supply</strong>: 1,000,000,000 (1 billion)
        </li>
        <li>
          <strong>Decimals</strong>: 18
        </li>
        <li>
          <strong>Chain</strong>: Base (Ethereum L2)
        </li>
      </ul>

      <h2>Distribution</h2>
      <table>
        <thead>
          <tr>
            <th>Allocation</th>
            <th>Percentage</th>
            <th>Amount</th>
            <th>Unlock</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Community Builders</td>
            <td>40%</td>
            <td>400M</td>
            <td>Daily emissions over 10 years</td>
          </tr>
          <tr>
            <td>Liquidity Pool</td>
            <td>25%</td>
            <td>250M</td>
            <td>Immediate</td>
          </tr>
          <tr>
            <td>Team & Advisors</td>
            <td>15%</td>
            <td>150M</td>
            <td>4-year vesting with 1-year cliff</td>
          </tr>
          <tr>
            <td>Treasury</td>
            <td>10%</td>
            <td>100M</td>
            <td>Protocol-controlled</td>
          </tr>
          <tr>
            <td>Early Supporters</td>
            <td>10%</td>
            <td>100M</td>
            <td>2-year vesting</td>
          </tr>
        </tbody>
      </table>

      <h2>Utility</h2>
      <ul>
        <li>
          <strong>Building Material</strong>: Lock BLOX to create builds
        </li>
        <li>
          <strong>Governance</strong>: Vote on protocol upgrades (future)
        </li>
        <li>
          <strong>Mould Creation</strong>: Stake BLOX to propose new BRICKS
        </li>
        <li>
          <strong>Staking Rewards</strong>: Earn from builder activity
        </li>
      </ul>

      <h2>Deflationary Mechanisms</h2>
      <ul>
        <li>
          <strong>20% Entropy Fee</strong> on build destruction
        </li>
        <li>
          <strong>Permanent Locking</strong> for legendary builds (planned)
        </li>
        <li>
          <strong>Buyback & Lock</strong> from protocol revenue (future)
        </li>
      </ul>
    </>
  )
}

function GameplayDoc() {
  return (
    <>
      <h1>Gameplay & Quests</h1>
      <p>Challenges, rewards, and community features.</p>

      <h2>Daily Quests (Coming Soon)</h2>
      <ul>
        <li>
          <strong>First Build</strong>: Create and save your first build (Reward: 100 BLOX)
        </li>
        <li>
          <strong>Color Master</strong>: Use all 8 colors in one build (Reward: 50 BLOX)
        </li>
        <li>
          <strong>Tower Builder</strong>: Stack 20+ layers high (Reward: 200 BLOX)
        </li>
      </ul>

      <h2>Leaderboards</h2>
      <ul>
        <li>
          <strong>Top BW</strong>: Highest Builder Weight scores
        </li>
        <li>
          <strong>Most Builds</strong>: Prolific creators
        </li>
        <li>
          <strong>Gallery Stars</strong>: Most liked builds (not yet implemented)
        </li>
      </ul>

      <h2>Community Features</h2>
      <ul>
        <li>
          <strong>Build Gallery</strong>: Browse and discover community creations
        </li>
        <li>
          <strong>Remix System</strong>: Fork and modify existing builds (planned)
        </li>
        <li>
          <strong>AI Co-Creation</strong>: Agents propose builds for humans to refine (future)
        </li>
      </ul>
    </>
  )
}

function SmartContractsDoc() {
  return (
    <>
      <h1>Smart Contracts</h1>
      <p>Contract interfaces and blockchain integration.</p>

      <h2>Deployed Contracts</h2>

      <div className="bg-[hsl(var(--ethblox-surface))] border border-[hsl(var(--ethblox-border))] rounded-lg p-4 my-6">
        <p className="text-[hsl(var(--ethblox-accent-cyan))] font-semibold mb-2">⚠️ Testnet Only</p>
        <p className="text-sm m-0">Contracts are currently on Base Sepolia testnet. Mainnet launch TBA.</p>
      </div>

      <h3>BLOX Token</h3>
      <ul>
        <li>
          <strong>Address</strong>: <code>0x...</code> (Coming soon)
        </li>
        <li>
          <strong>Type</strong>: ERC-20
        </li>
        <li>
          <strong>Standard</strong>: OpenZeppelin implementation
        </li>
      </ul>

      <h3>Build Registry</h3>
      <ul>
        <li>
          <strong>Address</strong>: <code>0x...</code> (Coming soon)
        </li>
        <li>
          <strong>Type</strong>: ERC-721 (NFT)
        </li>
        <li>
          <strong>Metadata</strong>: IPFS storage
        </li>
      </ul>

      <h2>Contract Interfaces</h2>
      <h3>IBuildRegistry</h3>
      <pre>
        <code>{`interface IBuildRegistry {
  function mintBuild(
    string memory name,
    string memory metadataURI,
    uint256 mass,
    uint256 uniqueColors
  ) external returns (uint256 tokenId);
  
  function destroyBuild(uint256 tokenId) external;
  
  function getBuildMetadata(uint256 tokenId) 
    external view returns (BuildMetadata memory);
}`}</code>
      </pre>

      <h2>Metadata Standard</h2>
      <pre>
        <code>{`{
  "name": "My Dog Build",
  "description": "A voxel sculpture of a dog",
  "image": "ipfs://Qm...",
  "attributes": [
    { "trait_type": "Mass", "value": 42 },
    { "trait_type": "Colors", "value": 5 },
    { "trait_type": "Builder Weight", "value": 12.3 }
  ],
  "geometry": "ipfs://Qm..." // Full brick array
}`}</code>
      </pre>
    </>
  )
}

function ApiDoc() {
  return (
    <>
      <h1>API Reference</h1>
      <p>Complete API documentation for developers.</p>

      <h2>REST Endpoints</h2>

      <h3>GET /api/builds</h3>
      <p>Fetch public gallery builds.</p>
      <pre>
        <code>{`GET /api/builds

Response:
{
  "builds": [
    {
      "id": "abc123",
      "name": "Cool Dog",
      "metadata": { ... },
      "blox": [ ... ]
    }
  ]
}`}</code>
      </pre>

      <h3>POST /api/builds</h3>
      <p>Publish a build to the gallery.</p>
      <pre>
        <code>{`POST /api/builds
Content-Type: application/json

{
  "metadata": {
    "id": "abc123",
    "name": "My Build",
    "mass": 42,
    "uniqueColors": 5,
    "bw": 12.3
  },
  "blox": [ ... ]
}

Response:
{
  "success": true,
  "buildId": "abc123"
}`}</code>
      </pre>

      <h2>Server Actions</h2>
      <h3>saveCreation</h3>
      <pre>
        <code>{`import { saveCreation } from "@/lib/actions/save-creation"

const result = await saveCreation(
  "My Build Name",
  bricksArray,
  walletAddress // optional
)`}</code>
      </pre>

      <h3>getCreations</h3>
      <pre>
        <code>{`import { getCreations } from "@/lib/actions/get-creations"

const creations = await getCreations(walletAddress)`}</code>
      </pre>
    </>
  )
}

function FaqDoc() {
  return (
    <>
      <h1>Frequently Asked Questions</h1>

      <h2>General</h2>
      <h3>What is ETHBLOX?</h3>
      <p>
        ETHBLOX is an on-chain 3D voxel builder where you create digital sculptures using BLOX tokens, mint them as
        NFTs, and participate in a creative economy.
      </p>

      <h3>Is ETHBLOX free to use?</h3>
      <p>
        Building is free. Saving requires a MetaMask wallet. Minting to blockchain requires gas fees and BLOX tokens.
      </p>

      <h2>Building</h2>
      <h3>How do I delete a block?</h3>
      <p>
        Press <kbd>E</kbd> for erase mode, then click the block you want to remove.
      </p>

      <h3>Can I import STL/OBJ files?</h3>
      <p>Not yet, but 3D file import is on the roadmap.</p>

      <h2>Technical</h2>
      <h3>Which browsers are supported?</h3>
      <p>Chrome, Firefox, Brave, and Safari (latest versions) with WebGL enabled.</p>

      <h3>Why is my build lagging?</h3>
      <p>Builds with 1000+ blocks can impact performance. Try using larger block sizes or reducing detail.</p>

      <h2>Economy</h2>
      <h3>How do I earn BLOX?</h3>
      <p>Complete daily quests, participate in challenges, or receive emissions based on your Builder Weight score.</p>

      <h3>What happens when I destroy a build?</h3>
      <p>You receive 80% of the locked BLOX back. The 20% entropy fee is redistributed to the community.</p>
    </>
  )
}

function ChangelogDoc() {
  return (
    <>
      <h1>Changelog</h1>

      <h2>v0.3.0 (Current)</h2>
      <p>
        <em>December 2024</em>
      </p>
      <ul>
        <li>Added wallet integration (MetaMask)</li>
        <li>Implemented user-specific build storage</li>
        <li>Created wallet drawer with stats</li>
        <li>Added documentation site</li>
        <li>Fixed scroll issues on landing page</li>
      </ul>

      <h2>v0.2.0</h2>
      <p>
        <em>November 2024</em>
      </p>
      <ul>
        <li>Rebuilt color system with 3 themes</li>
        <li>Added keyboard shortcuts</li>
        <li>Implemented undo/redo history</li>
        <li>Created gallery page</li>
        <li>Added auto-rotate feature</li>
      </ul>

      <h2>v0.1.0</h2>
      <p>
        <em>October 2024</em>
      </p>
      <ul>
        <li>Initial 3D builder interface</li>
        <li>Basic block placement</li>
        <li>Color selection (8 colors)</li>
        <li>Save/load functionality</li>
        <li>Redis storage integration</li>
      </ul>

      <h2>Upcoming</h2>
      <ul>
        <li>Smart contract deployment (Base mainnet)</li>
        <li>NFT minting UI</li>
        <li>Daily quests system</li>
        <li>Community gallery with likes</li>
        <li>AI co-creation features</li>
        <li>Mould marketplace</li>
      </ul>
    </>
  )
}
