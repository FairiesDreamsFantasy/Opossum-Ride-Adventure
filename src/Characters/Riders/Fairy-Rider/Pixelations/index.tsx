/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { FAIRY_RIDER_COLORS } from "../Color_Palette";

/**
 * Pixelated Visuals for Fairy-Rider.
 */
export const FairyRiderPixelations: React.FC = () => {
  return (
    <div id="fairy-rider-pixel" className="grid grid-cols-4 w-16 gap-1">
      {/* 4x6 Pixel Grid representation */}
      {[...Array(24)].map((_, i) => {
        let color = "transparent";
        if (i < 8) color = FAIRY_RIDER_COLORS.skin;
        else if (i < 20) color = FAIRY_RIDER_COLORS.outfit;
        else color = FAIRY_RIDER_COLORS.shoes;
        
        return <div key={i} className="w-3 h-3 border border-black/10" style={{ backgroundColor: color }} />;
      })}
    </div>
  );
};
