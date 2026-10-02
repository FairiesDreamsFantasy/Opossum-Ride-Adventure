import React from "react";
import { TexturePalette } from "./Texture_Palette";
import { PatternPalette } from "./Pattern_Palette";

export const AIColorPalette: React.FC = () => {
  return (
    <div className="ai-color-palette">
      {/* Color synthesis engine for AI entities */}
      <TexturePalette />
      <PatternPalette />
    </div>
  );
};
