/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { MARY_COLORS } from "../Animations/Color_Palette";

export const MARY_POV = {
  cameraHeightOffset: 72, // Based on 6'3" height
  eyeLevelOffset: 4,
  fieldOfView: 95
};

/**
 * First-person riding perspective for Mary.
 * Depicts Mary's hands with pink onesie cuffs and yellow flower accents gripping the reins.
 */
export const MaryPOV: React.FC = () => {
  return (
    <div id="mary-rider-pov-container" className="absolute inset-0 flex items-end justify-center pointer-events-none">
      {/* Opossum Ears/Head in foreground */}
      <div id="pov-opossum-ears" className="flex gap-20 mb-[-20px]">
        <div className="w-16 h-24 bg-gray-200 rounded-t-full transform -rotate-12 border-4 border-gray-300" />
        <div className="w-16 h-24 bg-gray-200 rounded-t-full transform rotate-12 border-4 border-gray-300" />
      </div>

      {/* Hands on reins with Mary's pink onesie sleeves and alabaster skin */}
      <div id="pov-rider-hands" className="absolute bottom-10 flex gap-40">
        {/* Left hand */}
        <div className="flex flex-col items-center">
          <div
            className="w-14 h-8 rounded-t-lg border-2 border-black/20 flex items-center justify-center"
            style={{ backgroundColor: MARY_COLORS.outfit }}
          >
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: MARY_COLORS.flowerPattern }} />
          </div>
          <div
            className="w-12 h-12 rounded-full border-2 border-black shadow-sm"
            style={{ backgroundColor: MARY_COLORS.skin }}
          />
        </div>

        {/* Right hand */}
        <div className="flex flex-col items-center">
          <div
            className="w-14 h-8 rounded-t-lg border-2 border-black/20 flex items-center justify-center"
            style={{ backgroundColor: MARY_COLORS.outfit }}
          >
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: MARY_COLORS.flowerPattern }} />
          </div>
          <div
            className="w-12 h-12 rounded-full border-2 border-black shadow-sm"
            style={{ backgroundColor: MARY_COLORS.skin }}
          />
        </div>
      </div>
    </div>
  );
};
