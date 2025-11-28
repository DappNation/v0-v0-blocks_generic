# ETHBLOX V0 PROJECT - COMPLETE DIAGNOSTIC DUMP

**Generated:** November 28, 2025  
**Version:** v60  
**Purpose:** Comprehensive codebase analysis for on-chain protocol design

---

## TABLE OF CONTENTS

1. [Project Overview](#1-project-overview)
2. [Geometry Representation](#2-geometry-representation-critical)
3. [Mould / Brick System](#3-mould--brick-system)
4. [Builds & Saving Flow](#4-builds--saving-flow)
5. [Backend API](#5-backend-api)
6. [User/Auth System](#6-userauth-system)
7. [Economic Logic](#7-economic-logic)
8. [Current State Storage](#8-current-state-storage)
9. [Frontend Editor Implementation](#9-frontend-editor-implementation)
10. [Additional Important Details](#10-anything-else-important)

---

## 1. PROJECT OVERVIEW

### Overall Structure
The ETHBLOX codebase is a **Next.js 15 full-stack web application** with a 3D voxel builder interface. The project uses the **Next.js App Router** architecture with server actions, client components, and API routes.

### Frameworks & Libraries
- **Frontend Framework**: Next.js 15.0.3 (App Router)
- **React**: Version 19 (latest)
- **3D Rendering**: Three.js (^0.169.0), React Three Fiber (^8.17.10), @react-three/drei (^9.114.3)
- **State Management**: React hooks (useState, useEffect) - **NO Zustand or Redux**
- **Backend/Database**: Vercel KV (Redis) via `@vercel/kv`
- **UI Components**: Radix UI primitives + shadcn/ui components
- **Styling**: Tailwind CSS (^3.4.17)
- **TypeScript**: Version 5
- **Form Validation**: React Hook Form + Zod
- **ID Generation**: nanoid (^5.0.0)
- **No ORM**: Direct KV/Redis queries, **NO Prisma**

### Main Folders/Modules

\`\`\`
ethblox-mvp/
├── app/                      # Next.js App Router pages & routes
│   ├── api/                  # API endpoints
│   │   ├── builds/           # Public gallery builds
│   │   └── my-builds/        # User-specific builds
│   ├── build/                # Main 3D builder interface
│   ├── gallery/              # Public builds gallery
│   ├── my-builds/            # User's private builds
│   ├── curve-guides/         # Whitepaper/documentation
│   └── page.tsx              # Homepage/landing page
├── components/               # React components
│   ├── block/                # 3D block rendering (Three.js)
│   ├── scene/                # 3D scene setup & interaction
│   ├── color-selector/       # Builder UI controls
│   ├── v0-blocks/            # Main builder logic & state
│   ├── ui/                   # shadcn/ui components
│   └── wallet-*              # MetaMask wallet integration
├── lib/                      # Utilities & business logic
│   ├── actions/              # Server actions for CRUD
│   ├── types.ts              # TypeScript definitions
│   ├── constants.ts          # 3D constants & textures
│   └── contracts.ts          # Mock smart contract interface
├── hooks/                    # Custom React hooks
│   └── use-metamask.ts       # Wallet connection logic
└── public/                   # Static assets
\`\`\`

---

## 2. GEOMETRY REPRESENTATION (CRITICAL)

### Data Structure
The geometry is represented as an **array of freeform voxel cubes** (called "Bricks"). There is **NO voxel grid system** or **predefined mould instances** - each block is independently positioned in 3D space.

### Brick Type Definition
From `components/v0-blocks/events.ts`:

\`\`\`typescript
export type Brick = {
  color: string                           // Hex color (e.g., "#FF3333")
  position: [number, number, number]      // [x, y, z] coordinates
  width: number                           // Block width in grid units
  height: number                          // Block depth in grid units (confusing name)
}
\`\`\`

**Important:** `height` actually represents **depth** (Z-axis), not vertical height. Vertical (Y-axis) height is **fixed at 1.2 units per layer** (`BRICK_HEIGHT` constant).

### Example Geometry JSON
\`\`\`json
{
  "id": "abc123xyz",
  "name": "My Dog Build",
  "bricks": [
    {
      "color": "#FFCC33",
      "position": [0, 0, 0],
      "width": 2,
      "height": 2
    },
    {
      "color": "#222222",
      "position": [0, 1.2, 0],
      "width": 1,
      "height": 1
    }
  ],
  "createdAt": 1732764000000,
  "updatedAt": 1732764000000
}
\`\`\`

### Position, Rotation, Scale, Color Handling

**Position**: Absolute [x, y, z] coordinates. No grid snapping enforced at data level.
- X/Z: Horizontal plane (platform coordinates)
- Y: Vertical stacking (increments by `BRICK_HEIGHT` = 1.2 per layer)

**Rotation**: **NOT IMPLEMENTED** - All blocks are axis-aligned cubes. No rotation data stored.

**Scale**: Represented by `width` (X-axis) and `height` (Z-axis). Y-axis is always 1.2 units.

**Color**: Stored as hex strings. Three color themes available (default, muted, monochrome) with 8 colors each.

### Moulds/Shapes
**NO predefined moulds**. The editor only uses:
- **1×1, 1×2, 2×1, 2×2** rectangular blocks (user selects width & depth)
- All blocks have **pyramidal studs on top** (rendered in Three.js, not stored in data)

---

## 3. MOULD / BRICK SYSTEM

### Are Moulds Defined?
**NO**. There is no predefined library of brick shapes or moulds in the code.

### What the Editor Uses
The editor uses **user-configurable rectangular blocks**:
- **Width**: 1-20 (X-axis)
- **Depth** (labeled "height"): 1-20 (Z-axis)
- **Height**: Fixed at 1.2 units (Y-axis, not user-configurable)

### Rendering Details
From `components/block/index.tsx`, each block consists of:

1. **Main body**: BoxGeometry with dimensions `[width, BRICK_HEIGHT - LAYER_GAP, depth]`
2. **Studs**: Cylinder instances (pyramids in latest version) placed on top in a grid pattern
   - Stud radius: 0.3
   - Stud height: 0.2
   - Positioned at `x: -width/2 + 0.5` to `width/2`, `z: -depth/2 + 0.5` to `depth/2`

### Physical Constants
From `lib/constants.ts`:

\`\`\`typescript
export const GRID_SIZE = 20           // Platform size (20×20)
export const BRICK_HEIGHT = 1.2       // Y-axis height per layer
export const LAYER_GAP = 0.005        // Gap between stacked blocks
export const STUD_HEIGHT = 0.2        // Stud/pyramid height
export const STUD_RADIUS = 0.3        // Stud/pyramid radius
export const STUD_SEGMENTS = 16       // Geometry detail
\`\`\`

---

## 4. BUILDS & SAVING FLOW

### How Users Create a Build

1. Navigate to `/build` page
2. Use toolbar to select:
   - Color (from 8-color palette)
   - Block dimensions (width/depth sliders or direct input)
   - Interaction mode (build/move/erase)
3. Click on platform to place blocks
4. Blocks snap to grid automatically during placement

### Save Build Feature

**YES - Fully implemented**

#### Save Flow
1. User clicks "Save" button (disk icon or Cmd+S)
2. If Vercel KV not configured → shows integration dialog
3. If KV configured → opens `SaveModal` component
4. User enters build name
5. Calls server action `saveCreation()`
6. If wallet connected → saves to `user:{address}:creations`
7. If no wallet → saves to global `creations` sorted set

#### Save Endpoint
`lib/actions/save-creation.ts`

\`\`\`typescript
POST /api/save (server action)
Body: {
  name: string,
  bricks: Brick[],
  walletAddress?: string
}

Response: {
  success: boolean,
  id: string,
  message: string
}
\`\`\`

#### Fields Stored in Redis
\`\`\`typescript
type SavedCreation = {
  id: string,                  // nanoid(10)
  name: string,               // User-provided name
  bricks: Brick[],            // Full geometry array
  createdAt: number,          // Unix timestamp (ms)
  updatedAt: number           // Unix timestamp (ms)
}
\`\`\`

**Redis Keys**:
- `creation:{id}` - Full creation data (JSON string)
- `creations` - Global sorted set (score = timestamp, member = id)
- `user:{walletAddress}:creations` - User-specific sorted set (if wallet connected)

### Load/Edit Functionality

**YES - Fully implemented**

#### Load Flow
1. User clicks "Load" button (folder icon or Cmd+O)
2. Opens `LoadModal` showing saved creations
3. User selects a creation
4. Loads bricks into editor state
5. Updates history for undo/redo
6. Sets `currentCreationId` and `currentCreationName`

#### Update Flow (Overwrite Save)
If `currentCreationId` exists when saving, calls `updateCreation()` instead, which:
- Keeps same ID
- Updates `bricks` array
- Updates `updatedAt` timestamp

### Versioning

**NO - Not implemented**. Each save overwrites the previous version. There is no version history or diff tracking.

---

## 5. BACKEND API

### API Endpoints

#### 1. `/api/builds` (Gallery - Public Builds)

**GET** - Fetch public builds
\`\`\`typescript
Response: {
  builds: Build[]
}
\`\`\`

**POST** - Publish build to gallery
\`\`\`typescript
Body: {
  metadata: {
    id: string,
    name: string,
    description?: string,
    createdAt: string,
    updatedAt: string,
    mass: number,           // Total BLOX count
    uniqueColors: number,   // Color diversity
    bw: number,             // Builder Weight score
    isPublic: boolean
  },
  blox: BloxUnit[]         // Array of {id, x, y, z, color}
}

Response: {
  success: boolean,
  buildId: string
}
\`\`\`

**Business Logic**:
- Validates build structure
- Stores in Redis as `build:{id}`
- Adds to `builds:public` sorted set (score = timestamp)

---

#### 2. `/api/my-builds` (User-Specific Builds)

**GET** - Fetch user's builds
\`\`\`typescript
Query params: ?walletAddress={address}

Response: {
  creations: SavedCreation[]
}
\`\`\`

**DELETE** - Delete a build
\`\`\`typescript
Query params: ?id={creationId}&walletAddress={address}

Response: {
  success: boolean
}
\`\`\`

**Business Logic**:
- Fetches from `user:{address}:creations` sorted set
- Returns up to 50 most recent builds
- Validates wallet ownership before deletion

---

#### 3. Server Actions (not traditional REST endpoints)

**`saveCreation(name, bricks, walletAddress?)`**
- Generates unique ID with nanoid(10)
- Stores in Redis
- Adds to global and/or user-specific sorted sets

**`updateCreation(id, bricks, walletAddress?)`**
- Updates existing creation
- Only updates `bricks` and `updatedAt`

**`getCreations(walletAddress?)`**
- Fetches from `user:{address}:creations` if wallet provided
- Otherwise fetches from global `creations` set
- Returns up to 50 most recent

**`deleteCreation(id, walletAddress?)`**
- Deletes `creation:{id}` key
- Removes from sorted sets

---

## 6. USER/AUTH SYSTEM

### Are There Accounts?
**NO** - There is no traditional account system (no email/password, no user profiles).

### User Identification
**Wallet-based** (MetaMask)

#### Current Implementation
- **MetaMask integration** via custom `useMetaMask()` hook
- Wallet address used as user identifier
- **No backend auth** - wallet address passed to server actions for data isolation

#### How It Works
1. User connects MetaMask in browser
2. `useMetaMask()` hook stores account address in React state
3. When saving/loading, wallet address passed to server actions
4. Server actions use `user:{address}:creations` as Redis key

#### Authentication Required?
**NO** - Saving builds works without wallet connection (saves to global namespace). Wallet connection only enables:
- User-specific build isolation
- "My Builds" page access
- Future on-chain functionality

#### Session Management
- **NO server-side sessions**
- **NO cookies** for auth
- **localStorage ONLY** for:
  - Last selected color/theme
  - Current build state (auto-save)
  - Load creation flag

---

## 7. ECONOMIC LOGIC

### Is There Economic Simulation?

**PARTIALLY IMPLEMENTED** - The types and formulas exist, but are **NOT actively used** in the UI or blockchain.

### What Exists
From `lib/types.ts`:

#### Builder Weight (BW) Formula
\`\`\`typescript
export function calculateBW(mass: number, uniqueColors: number): number {
  return Math.log(1 + mass) * Math.log(2 + uniqueColors)
}
\`\`\`

**Inputs**:
- `mass` - Total BLOX count (number of blocks)
- `uniqueColors` - Number of distinct colors used

**Output**: BW score (floating point number)

#### Build Metadata Type
\`\`\`typescript
export type BuildMetadata = {
  id: string,
  name: string,
  description?: string,
  createdAt: string,
  updatedAt: string,
  mass: number,              // Total BLOX count
  uniqueColors: number,      // Diversity metric
  bw: number,                // Builder Weight score
  isPublic?: boolean
}
\`\`\`

### What's NOT Implemented

- **BLOX token balances** - Not implemented
- **Mould license costs** - Not implemented
- **Mass limits** - Not enforced (UI allows unlimited blocks)
- **Build complexity scores** - BW calculated but not displayed or used
- **Staking/rewards** - Not implemented
- **On-chain minting costs** - Not implemented

### Where Economics Live

- **Type definitions**: `lib/types.ts`
- **Mock contract interface**: `lib/contracts.ts`
- **Future placeholder**: Metadata prepared for ERC721/1155 standards

---

## 8. CURRENT STATE STORAGE

### Where is Data Stored?

#### Build Metadata
- **Redis (Vercel KV)**: Primary storage
- **Keys**: `creation:{id}`, `build:{id}`

#### Geometry (Bricks Array)
- **Redis**: Stored as JSON string within creation object
- **localStorage**: Temporary auto-save (key: `v0-blocks-data`)

#### Thumbnails/Renders
- **NOT STORED** - No thumbnail generation implemented
- **TODO in contracts.ts**: `image: ""` placeholder in metadata

#### Local Storage Keys
\`\`\`typescript
"v0-blocks-data"           // Current build state
"v0-blocks-selected-color"  // Last selected color
"v0-blocks-theme"          // Color theme (default/muted/monochrome)
"ethblox-load-creation"     // Flag to load creation on mount
\`\`\`

### Is There a Prisma Schema?

**NO** - There is **NO Prisma**, **NO SQL database**, and **NO schema definition file**.

### Storage Architecture

\`\`\`
Vercel KV (Redis)
│
├── creation:{id} → SavedCreation (JSON)
├── build:{id} → Build (JSON with metadata + blox)
│
├── creations → Sorted Set (global, score = timestamp)
├── user:{address}:creations → Sorted Set (user-specific)
└── builds:public → Sorted Set (gallery builds)
\`\`\`

---

## 9. FRONTEND EDITOR IMPLEMENTATION

### 3D Editor Stack

**Core**: `three.js` + `react-three-fiber` + `@react-three/drei`

**No custom canvas** - Uses React Three Fiber's `<Canvas>` component

### Main Editor Component
`components/v0-blocks/index.tsx`

#### State Management (React hooks)
\`\`\`typescript
const [bricks, setBricks] = useState<Brick[]>([])
const [history, setHistory] = useState<Brick[][]>([[]])
const [historyIndex, setHistoryIndex] = useState(0)
const [width, setWidth] = useState(2)
const [depth, setDepth] = useState(2)
const [selectedColor, setSelectedColor] = useState("#FF3333")
const [interactionMode, setInteractionMode] = useState<"build" | "move" | "erase">("build")
\`\`\`

### Interactions Available

#### 1. Place Block
- **Mode**: "build"
- **Trigger**: Click on platform or existing block
- **Behavior**: Adds brick at clicked position with current width/depth/color
- **Function**: `handleAddBrick()` in `components/v0-blocks/events.ts`

#### 2. Delete Block
- **Mode**: "erase"
- **Trigger**: Click on existing block
- **Behavior**: Removes clicked block from array
- **Function**: `handleDeleteBrick(index)`
- **Mobile**: Uses `onPointerDown` for better touch response

#### 3. Rotate Camera
- **Mode**: "move"
- **Control**: OrbitControls from drei
- **Constraints**:
  - `minPolarAngle`: 0
  - `maxPolarAngle`: π/2 (no camera below ground)
  - `minDistance`: 10
  - `maxDistance`: 40

#### 4. Change Color
- **UI**: Color palette in sidebar
- **Themes**: Default (vibrant) / Muted / Monochrome
- **Shortcuts**: Number keys 1-8 select colors

#### 5. Adjust Block Size
- **UI**: Width/Depth sliders (or direct input)
- **Range**: 1-20 for both dimensions
- **Shortcuts**: W/S (width), A/D (depth)

#### 6. Undo/Redo
- **Implementation**: History array + historyIndex pointer
- **Shortcuts**: Cmd+Z / Cmd+Shift+Z (or Ctrl on Windows)
- **Limit**: No artificial limit on history length

#### 7. Clear All
- **Trigger**: Clear button (with confirmation modal)
- **Behavior**: Empties bricks array, resets history

#### 8. Auto-Rotate (Play Mode)
- **Trigger**: Play button
- **Behavior**: Camera auto-rotates, UI hidden
- **Speed**: 1 unit/sec

### Limits on Size

**Platform**: 20×20 grid (`GRID_SIZE` constant)  
**Block dimensions**: 1-20 for width/depth  
**Build height**: No limit (can stack infinitely)  
**Block count**: No enforced limit (performance will degrade with thousands of blocks)

### Keyboard Shortcuts
From `use-keyboard-shortcuts.ts`:

\`\`\`
Cmd/Ctrl + S     → Save
Cmd/Ctrl + O     → Load
Cmd/Ctrl + Z     → Undo
Cmd/Ctrl+Shift+Z → Redo
1-8              → Select color
W/S              → Adjust width
A/D              → Adjust depth
C                → Clear (with confirmation)
Space            → Toggle play mode
B/M/E            → Switch to Build/Move/Erase mode
T                → Cycle color themes
\`\`\`

---

## 10. ANYTHING ELSE IMPORTANT

### Known Constraints & Assumptions

1. **SSR Disabled for Builder**
   - `/build/page.tsx` uses `dynamic(() => import(...), { ssr: false })`
   - Three.js requires browser `window` object

2. **localStorage Safety Checks**
   - All localStorage calls wrapped in `typeof window === "undefined"` checks
   - Prevents SSR errors in Next.js 15

3. **No Real-Time Collaboration**
   - Single-user editing only
   - No WebSocket or multiplayer support

4. **Performance Limitations**
   - Large builds (1000+ blocks) cause frame drops
   - No level-of-detail (LOD) system
   - No instancing optimization beyond studs

5. **No Undo Limit**
   - History array grows unbounded
   - Could cause memory issues on very long sessions

### Partly Implemented Features

1. **Smart Contract Integration** (`lib/contracts.ts`)
   - Type definitions exist for on-chain builds
   - Mock implementation only
   - TODO comments for actual contract calls
   - Metadata prepared in ERC721/1155 format

2. **Build Publishing**
   - API exists (`/api/builds POST`)
   - UI exists (Gallery page)
   - But no "Publish" button in builder yet

3. **Builder Weight (BW) Calculation**
   - Formula implemented
   - Calculated when creating `Build` type
   - But NOT displayed in UI anywhere

4. **Wallet Drawer Stats**
   - Component exists with BLOX balance placeholder
   - Build count shown
   - But no real token balance fetching

### Experimental/Unused Code

1. **`lib/contracts.ts`** - Mock smart contract interface (not called anywhere)
2. **Pyramid Studs** - Blocks now have 3-sided pyramids instead of cylinders (recent change)
3. **Multiple Redis Key Structures** - Both `creation:*` and `build:*` exist (legacy + new)
4. **Wallet "Switch Account"** - MetaMask account switcher implemented but may not be fully functional

### Hacks & Workarounds

1. **Height/Depth Confusion**
   - `Brick.height` actually means depth (Z-axis)
   - Vertical height is fixed at `BRICK_HEIGHT` constant
   - Never changed to avoid breaking saved builds

2. **localStorage Auto-Save**
   - Saves current build state every render (via useEffect)
   - Could be optimized with debouncing

3. **Build Errors Ignored**
   - `next.config.mjs` has `ignoreBuildErrors: true`
   - `eslint.ignoreDuringBuilds: true`
   - Technical debt to allow rapid iteration

4. **KV Integration Check**
   - Every component that needs KV checks if configured
   - Shows fallback UI if not available
   - Allows local dev without Redis

---

## REPOSITORY & DEPLOYMENT

### GitHub Repository
`v0-v0-blocks-gr` (synced from v0.app)

### Live Deployment
[Vercel Deployment](https://vercel.com/vibegods-projects/v0-v0-blocks-gr)

### v0 Chat Link
[v0 Chat Session](https://v0.app/chat/DYWsjMKQeBK)

---

# SUMMARY FOR ON-CHAIN DESIGN

## Key Takeaways for Protocol Design

1. **Geometry is Simple**: Just an array of `{position, color, width, height}` cubes. No complex shape library.

2. **No Moulds Yet**: Current system is free-form voxel placement. Mould licensing system needs to be designed from scratch.

3. **BW Formula Ready**: `log(1 + mass) * log(2 + uniqueColors)` - can be implemented on-chain.

4. **Wallet Infrastructure Exists**: MetaMask integration works, but no token contracts deployed yet.

5. **Metadata Prepared**: Build metadata follows ERC721/1155 patterns, ready for IPFS + on-chain minting.

6. **No Limits Enforced**: UI allows unlimited blocks. Protocol will need to define:
   - Max build size
   - BLOX costs per block
   - Mass limits per mould tier

7. **Redis is Centralized**: Need decentralized storage (IPFS) for true on-chain provenance.

8. **No Versioning**: Each save overwrites. On-chain system could make builds immutable NFTs.

---

## RECOMMENDED NEXT STEPS

### For Protocol Design
1. Define mould taxonomy (tiers, shapes, license costs)
2. Implement BLOX token economics (supply, distribution, utility)
3. Design mass/complexity limits per mould tier
4. Create smart contract architecture for minting builds as NFTs
5. Integrate IPFS for decentralized geometry storage
6. Add Builder Weight (BW) rewards mechanism

### For Frontend
1. Add base size selector for new projects (1×1 to 20×20 with IDs)
2. Replace L/W swap with 90° rotation button
3. Display BW score in UI
4. Add "Publish to Gallery" button in builder
5. Implement thumbnail generation for saved builds
6. Add mould selection UI (when backend ready)

### For Backend
1. Deploy actual smart contracts (currently mock)
2. Integrate IPFS pinning service
3. Add versioning/forking for builds
4. Implement token balance fetching from blockchain
5. Add on-chain metadata verification

---

**End of Diagnostic Report**

This document provides a complete snapshot of the ETHBLOX V0 codebase as of version 60. Use this as a reference for designing the full on-chain protocol, smart contracts, and tokenomics system.
