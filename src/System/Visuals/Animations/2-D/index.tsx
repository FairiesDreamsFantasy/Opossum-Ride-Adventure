import React from "react";

/**
 * 2-D Animation Module
 * Manages sprite-based animations, flat translations, and parallax background 
 * layer positioning.
 */
export const TwoDAnimationSystem = {
  calculateParallax: (offset: number, speed: number) => {
    return offset * speed;
  },
  
  lerp: (start: number, end: number, t: number) => {
    return start * (1 - t) + end * t;
  },

  calculateFrameOffset: (frame: number, width: number, sx: number) => {
    return sx + frame * width;
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
