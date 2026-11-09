/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { FEMMY_COLORS } from "../Animations/Color_Palette";

export const FEMMY_POV = {
  cameraHeightOffset: 47, // Based on 3'11" height
  eyeLevelOffset: 3.5,
  fieldOfView: 95
};

/**
 * First-person riding perspective for Femmy.
 * Depicts Femmy's dark-brown hands with beige onesie cuffs, black stripes, and rainbow accents gripping the reins.
 */
export const FemmyPOV: React.FC = () => {
  return (
    <div id="femmy-rider-pov-container" className="absolute inset-0 flex items-end justify-center pointer-events-none">
      {/* Opossum Ears/Head in foreground */}
      <div id="pov-opossum-ears" className="flex gap-20 mb-[-20px]">
        <div className="w-16 h-24 bg-gray-200 rounded-t-full transform -rotate-12 border-4 border-gray-300" />
        <div className="w-16 h-24 bg-gray-200 rounded-t-full transform rotate-12 border-4 border-gray-300" />
      </div>

      {/* Hands on reins with Femmy's beige onesie sleeves with black stripes and dark-brown skin */}
      <div id="pov-rider-hands" className="absolute bottom-10 flex gap-40">
        {/* Left hand */}
        <div className="flex flex-col items-center">
          <div
            className="w-14 h-8 rounded-t-lg border-2 border-black/30 flex items-center justify-center relative overflow-hidden"
            style={{ backgroundColor: FEMMY_COLORS.outfitBase }}
          >
            <div className="w-full h-1 bg-black absolute top-2" />
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 z-10" />
          </div>
          <div
            className="w-12 h-12 rounded-full border-2 border-black shadow-sm"
            style={{ backgroundColor: FEMMY_COLORS.skin }}
          />
        </div>

        {/* Right hand */}
        <div className="flex flex-col items-center">
          <div
            className="w-14 h-8 rounded-t-lg border-2 border-black/30 flex items-center justify-center relative overflow-hidden"
            style={{ backgroundColor: FEMMY_COLORS.outfitBase }}
          >
            <div className="w-full h-1 bg-black absolute top-2" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 z-10" />
          </div>
          <div
            className="w-12 h-12 rounded-full border-2 border-black shadow-sm"
            style={{ backgroundColor: FEMMY_COLORS.skin }}
          />
        </div>
      </div>
    </div>
  );
};

export default FemmyPOV;
