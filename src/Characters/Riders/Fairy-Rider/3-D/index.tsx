/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { FAIRY_RIDER_COLORS } from "../Color_Palette";

/**
 * 3D-simulated Visuals for Fairy-Rider.
 * Utilizes CSS perspective and rotations.
 */
export const FairyRider3D: React.FC<{ rotation?: number }> = ({ rotation = 0 }) => {
  return (
    <div 
      id="fairy-rider-3d" 
      className="relative"
      style={{ perspective: "1000px" }}
    >
      <div 
        className="relative transition-transform duration-200"
        style={{ transformStyle: "preserve-3d", transform: `rotateY(${rotation}deg)` }}
      >
        {/* Head Sphere */}
        <div 
          className="w-10 h-10 rounded-full border-2 border-black" 
          style={{ backgroundColor: FAIRY_RIDER_COLORS.skin, transform: "translateZ(5px)" }} 
        />
        {/* Body Box */}
        <div 
          className="w-12 h-16 rounded-xl border-2 border-black -mt-1" 
          style={{ backgroundColor: FAIRY_RIDER_COLORS.outfit, transform: "translateZ(0px)" }} 
        />
      </div>
    </div>
  );
};
