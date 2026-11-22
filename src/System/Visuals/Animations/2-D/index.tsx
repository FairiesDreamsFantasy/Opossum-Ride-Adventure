import React from "react";
import { TwoDTransformKernel } from "./TwoDTransformKernel";
import { TwoDSpriteSequencer } from "./TwoDSpriteSequencer";
import { TwoDEasingCurves } from "./TwoDEasingCurves";

export * from "./TwoDTransformKernel";
export * from "./TwoDSpriteSequencer";
export * from "./TwoDEasingCurves";

/**
 * 2-D Animation Module
 * Manages sprite-based animations, flat translations, and parallax background 
 * layer positioning.
 */
export const TwoDAnimationSystem = {
  Transform: TwoDTransformKernel,
  Sequencer: TwoDSpriteSequencer,
  Easing: TwoDEasingCurves,

  calculateParallax: (offset: number, speed: number) => {
    const cleanOffset = TwoDTransformKernel.sanitizeFinite(offset, 0);
    const cleanSpeed = TwoDTransformKernel.sanitizeFinite(speed, 1);
    return cleanOffset * cleanSpeed;
  },
  
  lerp: (start: number, end: number, t: number) => {
    return TwoDEasingCurves.lerp(start, end, t);
  },

  calculateFrameOffset: (frame: number, width: number, sx: number) => {
    return TwoDSpriteSequencer.computeFrameOffset(frame, width, sx);
  }
};

/**
 * Ultra-precise 2-D coordinates and layout registry for core characters.
 */
export const TwoDShapeRegistry = {
  opossum: {
    melissa: { sx: 0, sy: 0, width: 128, height: 96, cols: 8, totalFrames: 16 },
    ashley: { sx: 0, sy: 96, width: 128, height: 96, cols: 8, totalFrames: 16 },
  },
  rider: {
    fairy: { sx: 0, sy: 192, width: 64, height: 64, cols: 4, totalFrames: 8 }
  },
  collectibles: {
    berry: { sx: 256, sy: 192, width: 32, height: 32, totalFrames: 1 }
  }
};

export const TwoDLayer: React.FC<{ 
  children: React.ReactNode;
  x?: number;
  y?: number;
  opacity?: number;
}> = ({ children, x = 0, y = 0, opacity = 1 }) => {
  return (
    <div 
      className="system-2d-layer" 
      style={{ 
        transform: `translate(${x}px, ${y}px)`,
        opacity 
      }}
    >
      {children}
    </div>
  );
};
