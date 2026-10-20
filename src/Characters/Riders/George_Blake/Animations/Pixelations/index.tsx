/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { GEORGE_COLORS } from "../Color_Palette";

/**
 * Pixelated Retro Representation for George.
 */
export const GeorgePixelations: React.FC = () => {
  return (
    <div id="george-rider-pixel" className="grid grid-cols-4 w-16 gap-1">
      {[...Array(24)].map((_, i) => {
        let color = "transparent";
        if (i < 4) color = GEORGE_COLORS.crown;
        else if (i < 8) color = GEORGE_COLORS.skin;
        else if (i < 18) color = GEORGE_COLORS.onesieBase;
        else color = GEORGE_COLORS.shoes;

        return <div key={i} className="w-3 h-3 border border-black/10" style={{ backgroundColor: color }} />;
      })}
    </div>
  );
};
