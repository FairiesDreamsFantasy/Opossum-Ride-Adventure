/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ANGELA_COLORS } from "../Color_Palette";

/**
 * Pixelated Retro Representation for Angela.
 */
export const AngelaPixelations: React.FC = () => {
  return (
    <div id="angela-rider-pixel" className="grid grid-cols-4 w-16 gap-1">
      {[...Array(24)].map((_, i) => {
        let color = "transparent";
        if (i < 2) color = ANGELA_COLORS.gem;
        else if (i < 4) color = ANGELA_COLORS.tiara;
        else if (i < 8) color = ANGELA_COLORS.skin;
        else if (i < 12) color = ANGELA_COLORS.hair;
        else if (i < 18) color = ANGELA_COLORS.apron;
        else color = ANGELA_COLORS.dress;

        return <div key={i} className="w-3 h-3 border border-black/10" style={{ backgroundColor: color }} />;
      })}
    </div>
  );
};
