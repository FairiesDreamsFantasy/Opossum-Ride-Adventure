import React from "react";

/**
 * Pixelations Module
 * Implements intentional resolution reduction and grid-snapping effects
 * for retro and low-fidelity artistic styles.
 */
export const PixelationSystem = {
  snapToGrid: (value: number, gridSize: number) => {
    return Math.floor(value / gridSize) * gridSize;
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
      style={{ 
        imageRendering: "pixelated",
        overflow: "hidden"
      }}
    >
      {children}
    </div>
  );
};
