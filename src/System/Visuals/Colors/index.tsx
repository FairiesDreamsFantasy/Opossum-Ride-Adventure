/**
 * Colors System Module
 * Centralizes color palette management and dynamic color transformations.
 */

export const ColorSystem = {
  // Primary Opossum Ride Adventure Palette
  palette: {
    manorGreen: "#064e3b", // Emerald 900
    gardenLime: "#84cc16", // Lime 500
    possumGray: "#9ca3af", // Gray 400
    pinkAccent: "#ec4899", // Pink 500
    celestialBlue: "#3b82f6", // Blue 500
    goldAccent: "#eab308", // Yellow 500
    bloodOrange: "#f97316"  // Orange 500
  },
  
  hexToRgb: (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }
};
