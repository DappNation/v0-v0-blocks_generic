"use client"

import type React from "react"
import { Environment, SoftShadows } from "@react-three/drei"
import type { SceneProps } from "./types"
import { LargePlane } from "../large-plane"
import { Platform } from "../platform"
import { BuildMode } from "./build-mode"
import { EraseMode } from "./erase-mode"
import { LightingSetup } from "./lighting-setup"
import { useSceneInteraction } from "./use-scene-interaction"
import { Block } from "../block"

export const Scene: React.FC<SceneProps> = ({
  bricks,
  selectedColor,
  width,
  depth,
  onAddBrick,
  onDeleteBrick,
  onUndo,
  onRedo,
  isPlaying,
  interactionMode = "build",
  gridSize, // Accept gridSize as prop
}) => {
  const {
    currentBrickPosition,
    isValid,
    showNewBrick,
    hoveredBrickIndex,
    handleClick,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleBrickClick,
    planeRef,
  } = useSceneInteraction({
    bricks,
    width,
    depth,
    selectedColor,
    onAddBrick,
    onDeleteBrick,
    isPlaying,
    interactionMode,
    gridSize, // Pass gridSize to useSceneInteraction
  })

  return (
    <>
      <SoftShadows size={25} samples={16} focus={0.5} />
      <LargePlane />
      <Platform gridSize={gridSize} />

      {bricks.map((brick, index) => (
        <Block
          key={index}
          color={brick.color}
          position={brick.position}
          width={brick.width}
          height={brick.height}
          isPlacing={hoveredBrickIndex === index && interactionMode === "erase"}
          onClick={() => handleBrickClick(index)}
        />
      ))}

      {interactionMode === "build" && !isPlaying && (
        <BuildMode
          showNewBrick={showNewBrick}
          isValid={isValid}
          currentBrickPosition={currentBrickPosition}
          selectedColor={selectedColor}
          width={width}
          depth={depth}
        />
      )}

      {interactionMode === "erase" && !isPlaying && <EraseMode />}

      <mesh
        ref={planeRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        onClick={handleClick}
        onPointerDown={handleTouchStart}
        onPointerMove={handleTouchMove}
        onPointerUp={handleTouchEnd}
        onPointerLeave={handleTouchEnd}
      >
        <planeGeometry args={[gridSize, gridSize]} />
        <meshBasicMaterial visible={false} />
      </mesh>

      <LightingSetup />
      <Environment preset="warehouse" background />
    </>
  )
}
