import React from "react";
import { MonochromeGrayscaleSystem } from "../Animations/Color_Palette/Monochrome/Grayscale";
import { LuminanceWeightsKernel } from "../Animations/Color_Palette/Monochrome/LuminanceWeightsKernel";

/**
 * Grayscale Module
 * Provides tools for desaturation effects and monochromatic image processing.
 */
export const GrayscaleSystem = {
  Luminance: LuminanceWeightsKernel,
  Histogram: MonochromeGrayscaleSystem.Histogram,
  ToneMapper: MonochromeGrayscaleSystem.ToneMapper,

  getGrayscaleValue: (r: number, g: number, b: number) => {
    return LuminanceWeightsKernel.computeRec601Luminance(r, g, b);
  }
};

export const MonochromaticFilter: React.FC<{
  children: React.ReactNode;
  intensity?: number; // 0 to 1
}> = ({ children, intensity = 1 }) => {
  const safeIntensity = Math.max(0, Math.min(1, Number.isFinite(intensity) ? intensity : 1));
  return (
    <div 
      className="system-grayscale-filter"
      style={{ filter: `grayscale(${safeIntensity * 100}%)` }}
    >
      {children}
    </div>
  );
};
