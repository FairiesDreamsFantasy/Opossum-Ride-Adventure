import React from "react";

/**
 * Grayscale Module
 * Provides tools for desaturation effects and monochromatic image processing.
 */
export const GrayscaleSystem = {
  getGrayscaleValue: (r: number, g: number, b: number) => {
    // Standard luminance weights for grayscale conversion
    return 0.299 * r + 0.587 * g + 0.114 * b;
  }
};

export const MonochromaticFilter: React.FC<{
  children: React.ReactNode;
  intensity?: number; // 0 to 1
}> = ({ children, intensity = 1 }) => {
  return (
    <div 
      className="system-grayscale-filter"
      style={{ filter: `grayscale(${intensity * 100}%)` }}
    >
      {children}
    </div>
  );
};
