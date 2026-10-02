import React from "react";

/**
 * Resolution System Module
 * Manages display scaling, rendering quality, and screen-space transformations.
 */
export interface ResolutionConfig {
  width: number;
  height: number;
  pixelRatio: number;
  antiAliasing: boolean;
}

export const ResolutionSystem = {
  getCurrentConfig: (): ResolutionConfig => {
    return {
      width: typeof window !== "undefined" ? window.innerWidth : 1920,
      height: typeof window !== "undefined" ? window.innerHeight : 1080,
      pixelRatio: typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1,
      antiAliasing: true
    };
  },

  /**
   * Calculates high-precision mathematical aspect ratio (Width / Height)
   */
  calculateAspectRatio: (width: number, height: number): number => {
    return height === 0 ? 16 / 9 : width / height;
  },

  /**
   * Snaps a sub-pixel coordinate value to an exact device pixel boundary to eliminate GPU rendering blur
   */
  snapToDevicePixel: (coord: number, dpr: number = 1): number => {
    return Math.round(coord * dpr) / dpr;
  },

  /**
   * Computes device diagonal pixel count: sqrt(w^2 + h^2)
   */
  calculateDiagonalPixels: (width: number, height: number): number => {
    return Math.hypot(width, height);
  }
};

export const ResolutionLayer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="system-resolution-layer">{children}</div>;
};

// Sub-resolution imports and exports
export * from "./Ultra-Low";
export * from "./Very_Low";
export * from "./Low";
export * from "./High";
export * from "./Very_High";
export * from "./Ultra-High";

export * from "./SD";
export * from "./HD";
export * from "./2K";
export * from "./4K";
export * from "./8K";
export * from "./16K";
export * from "./32K";
export * from "./64K";
export * from "./128K";
export * from "./256K";
export * from "./512K";
export * from "./1024K";
export * from "./2048K";
export * from "./4096K";
export * from "./8192K";
