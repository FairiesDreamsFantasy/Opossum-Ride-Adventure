/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { GEORGE_COLORS } from "../Animations/Color_Palette";

export const GEORGE_POV = {
  cameraHeightOffset: 50, // Based on 4'4" height
  eyeLevelOffset: 2.8,
  fieldOfView: 95
};

/**
 * First-person riding perspective for George.
 * Depicts George's honey-toned hands and gold onesie cuffs with yellow honeycomb hexagons gripping the reins.
 */
export const GeorgePOV: React.FC = () => {
  return (
    <div id="george-rider-pov-container" className="absolute inset-0 flex items-end justify-center pointer-events-none">
      {/* Opossum Ears/Head in foreground */}
      <div id="pov-opossum-ears" className="flex gap-20 mb-[-20px]">
        <div className="w-16 h-24 bg-gray-200 rounded-t-full transform -rotate-12 border-4 border-gray-300" />
        <div className="w-16 h-24 bg-gray-200 rounded-t-full transform rotate-12 border-4 border-gray-300" />
      </div>

      {/* Hands on reins with George's gold onesie cuffs, honeycomb hexagons, and honey skin */}
      <div id="pov-rider-hands" className="absolute bottom-8 flex gap-36">
        {/* Left hand */}
        <div className="flex flex-col items-center">
          <div
            className="w-14 h-8 rounded-t-lg border-2 border-black/30 flex items-center justify-center relative overflow-hidden"
            style={{ backgroundColor: GEORGE_COLORS.onesieBase }}
          >
            {/* Hexagonal motif accent */}
            <div
              className="w-4 h-4 border border-black/80 rotate-45"
              style={{ backgroundColor: GEORGE_COLORS.hexagonFill }}
            />
          </div>
          <div
            className="w-11 h-11 rounded-full border-2 border-black shadow-sm"
            style={{ backgroundColor: GEORGE_COLORS.skin }}
          />
        </div>

        {/* Right hand */}
        <div className="flex flex-col items-center">
          <div
            className="w-14 h-8 rounded-t-lg border-2 border-black/30 flex items-center justify-center relative overflow-hidden"
            style={{ backgroundColor: GEORGE_COLORS.onesieBase }}
          >
            {/* Hexagonal motif accent */}
            <div
              className="w-4 h-4 border border-black/80 rotate-45"
              style={{ backgroundColor: GEORGE_COLORS.hexagonFill }}
            />
          </div>
          <div
            className="w-11 h-11 rounded-full border-2 border-black shadow-sm"
            style={{ backgroundColor: GEORGE_COLORS.skin }}
          />
        </div>
      </div>
    </div>
  );
};
