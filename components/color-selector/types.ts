export interface ColorSelectorProps {
  colors: string[]
  selectedColor: string
  onSelectColor: (color: string) => void
  onUndo: () => void
  onRedo: () => void
  canUndo: boolean
  canRedo: boolean
  width: number
  depth: number
  onWidthChange: (width: number) => void
  onDepthChange: (depth: number) => void
  onClearSet: () => void
  onPlayToggle: () => void
  isPlaying: boolean
  onSave: () => void
  onLoad: () => void
  currentCreationId?: string
  currentCreationName?: string
  currentTheme: ColorTheme
  onThemeChange: (theme: ColorTheme) => void
  bricksCount: number
  baseWidth: number
  baseDepth: number
  totalBlox: number
  minBaseWidth: number
  minBaseDepth: number
  onBaseWidthChange: (value: number) => void
  onBaseDepthChange: (value: number) => void
  interactionMode: "build" | "move" | "erase"
  onModeChange: (mode: "build" | "move" | "erase") => void
  onMintClick?: () => void // Add onMintClick handler for minting UI
}

export type ColorTheme = "default" | "muted" | "monochrome"

export const COLOR_THEMES: Record<ColorTheme, string[]> = {
  default: [
    "#EA4335", // Google Red (vibrant)
    "#FF9500", // Bright Orange
    "#FBBC04", // Google Yellow (vibrant)
    "#34A853", // Google Green (vibrant)
    "#00D4FF", // Bright Cyan
    "#4285F4", // Google Blue (vibrant)
    "#9C27B0", // Vivid Purple
    "#212121", // Deep Black
  ],
  muted: [
    "#CC6666", // Muted Red
    "#CC9966", // Muted Orange
    "#CCCC66", // Muted Yellow
    "#66CC99", // Muted Green
    "#66CCCC", // Muted Light Blue
    "#6699CC", // Muted Dark Blue
    "#9966CC", // Muted Purple
    "#444444", // Dark Gray
  ],
  monochrome: [
    "#FFFFFF", // White
    "#DDDDDD", // Light Gray 1
    "#BBBBBB", // Light Gray 2
    "#999999", // Mid Gray 1
    "#777777", // Mid Gray 2
    "#555555", // Dark Gray 1
    "#333333", // Dark Gray 2
    "#111111", // Near Black
  ],
}
