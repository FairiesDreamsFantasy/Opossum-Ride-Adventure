/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ANGELA_COLORS } from "../Animations/Color_Palette";

export const ANGELA_POV = {
  cameraHeightOffset: 78, // Based on 6'8" height
  eyeLevelOffset: 4.2,
  fieldOfView: 95
};

/**
 * First-person riding perspective for Angela.
 * Depicts Angela's peach-toned hands and Cinderella-style gown sleeves with pink apron trim gripping the reins.
 */
export const AngelaPOV: React.FC = () => {
  return (
    <div id="angela-rider-pov-container" className="absolute inset-0 flex items-end justify-center pointer-events-none">
      {/* Opossum Ears/Head in foreground */}
      <div id="pov-opossum-ears" className="flex gap-20 mb-[-20px]">
        <div className="w-16 h-24 bg-gray-200 rounded-t-full transform -rotate-12 border-4 border-gray-300" />
        <div className="w-16 h-24 bg-gray-200 rounded-t-full transform rotate-12 border-4 border-gray-300" />
      </div>

      {/* Hands on reins with Angela's white gown sleeves, pink trim, and peach skin */}
      <div id="pov-rider-hands" className="absolute bottom-11 flex gap-42">
        {/* Left hand */}
        <div className="flex flex-col items-center">
          <div
            className="w-15 h-9 rounded-t-xl border-2 border-slate-300 flex flex-col justify-end overflow-hidden shadow-sm"
            style={{ backgroundColor: ANGELA_COLORS.dress }}
          >
            {/* Modest pink apron trim on sleeve */}
            <div className="w-full h-2" style={{ backgroundColor: ANGELA_COLORS.apron }} />
          </div>
          <div
            className="w-12 h-12 rounded-full border-2 border-black/80 shadow-sm"
            style={{ backgroundColor: ANGELA_COLORS.skin }}
          />
        </div>

        {/* Right hand */}
        <div className="flex flex-col items-center">
          <div
            className="w-15 h-9 rounded-t-xl border-2 border-slate-300 flex flex-col justify-end overflow-hidden shadow-sm"
            style={{ backgroundColor: ANGELA_COLORS.dress }}
          >
            {/* Modest pink apron trim on sleeve */}
            <div className="w-full h-2" style={{ backgroundColor: ANGELA_COLORS.apron }} />
          </div>
          <div
            className="w-12 h-12 rounded-full border-2 border-black/80 shadow-sm"
            style={{ backgroundColor: ANGELA_COLORS.skin }}
          />
        </div>
      </div>
    </div>
  );
};
