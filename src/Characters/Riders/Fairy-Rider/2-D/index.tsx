/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { FAIRY_RIDER_COLORS } from "../Color_Palette";

/**
 * 2D Sprite-based Visuals for Fairy-Rider.
 */
export const FairyRider2D: React.FC<{ scale?: number }> = ({ scale = 1 }) => {
  return (
    <div 
      id="fairy-rider-2d" 
      className="relative flex flex-col items-center"
      style={{ transform: `scale(${scale})` }}
    >
      {/* Head */}
      <div className="w-8 h-8 rounded-full border-2 border-black" style={{ backgroundColor: FAIRY_RIDER_COLORS.skin }} />
      {/* Body */}
      <div className="w-10 h-14 rounded-lg border-2 border-black -mt-1" style={{ backgroundColor: FAIRY_RIDER_COLORS.outfit }} />
      {/* Wings */}
      <div className="absolute -left-6 top-6 w-8 h-10 bg-opacity-50 rounded-full border border-white" style={{ backgroundColor: FAIRY_RIDER_COLORS.wings }} />
      <div className="absolute -right-6 top-6 w-8 h-10 bg-opacity-50 rounded-full border border-white" style={{ backgroundColor: FAIRY_RIDER_COLORS.wings }} />
    </div>
  );
};
