import React from "react";
import { PixelGridQuantizer } from "./PixelGridQuantizer";
import { BayerDitherMatrix } from "./BayerDitherMatrix";
import { DownsampleBlockSolver } from "./DownsampleBlockSolver";

export * from "./PixelGridQuantizer";
export * from "./BayerDitherMatrix";
export * from "./DownsampleBlockSolver";

/**
 * Pixelations Module
 * Implements intentional resolution reduction and grid-snapping effects
 * for retro and low-fidelity artistic styles.
 */
export const PixelationSystem = {
  Quantizer: PixelGridQuantizer,
  Dither: BayerDitherMatrix,
  Downsample: DownsampleBlockSolver,

  snapToGrid: (value: number, gridSize: number) => {
    return PixelGridQuantizer.snapToGrid(value, gridSize);
  }
};

/**
 * Ultra-precise Pixelation and Dot Matrix resolution tables.
 */
export const PixelationPresetRegistry = {
  vintage3D: { pixelSize: 8, width: 160, height: 120 },
  retroArcade: { pixelSize: 4, width: 320, height: 240 },
  super3D: { pixelSize: 2, width: 640, height: 480 },
  fullRes: { pixelSize: 1, width: 1280, height: 960 }
};

export const PixelatedContainer: React.FC<{
  children: React.ReactNode;
  pixelSize?: number;
}> = ({ children, pixelSize = 4 }) => {
  // Uses CSS image-rendering to maintain sharp edges when scaled
  return (
    <div 
      className="system-pixelated-container"
      data-pixel-size={Math.max(1, Math.floor(Number.isFinite(pixelSize) ? pixelSize : 4))}
      style={{ 
        imageRendering: "pixelated",
        overflow: "hidden"
      }}
    >
      {children}
    </div>
  );
};
