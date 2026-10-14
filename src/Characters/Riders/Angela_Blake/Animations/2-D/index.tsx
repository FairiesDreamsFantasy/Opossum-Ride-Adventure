/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ANGELA_COLORS } from "../Color_Palette";

/**
 * 2D Sprite Visuals for Angela.
 * 6'8" tall stature, Cinderella-style flowing white gown, pink apron, gold tiara with diamond red gem.
 */
export const Angela2D: React.FC<{ scale?: number }> = ({ scale = 1 }) => {
  return (
    <div 
      id="angela-rider-2d" 
      className="relative flex flex-col items-center"
      style={{ transform: `scale(${scale})` }}
    >
      {/* Gold Tiara with Red Gem */}
      <div className="relative flex flex-col items-center">
        <div 
          className="w-2 h-2 rotate-45 border border-red-900 -mb-1 z-10"
          style={{ backgroundColor: ANGELA_COLORS.gem }}
        />
        <div 
          className="w-6 h-2 rounded-t-sm border border-amber-600"
          style={{ backgroundColor: ANGELA_COLORS.tiara }}
        />
      </div>

      {/* Head with Long Red Hair */}
      <div 
        className="w-7 h-7 rounded-full border border-black/40 relative -mt-0.5 flex items-center justify-center"
        style={{ backgroundColor: ANGELA_COLORS.skin }}
      >
        {/* Long red hair frame */}
        <div className="absolute -top-1 left-0 right-0 h-3 rounded-t-full bg-red-800" />
        <div className="absolute -left-1 top-2 w-1.5 h-6 bg-red-800 rounded-b-sm" />
        <div className="absolute -right-1 top-2 w-1.5 h-6 bg-red-800 rounded-b-sm" />
      </div>

      {/* Cinderella-Style Gown Torso & Pink Apron */}
      <div 
        className="w-10 h-12 rounded-t-md border border-neutral-300 relative flex flex-col items-center -mt-0.5 overflow-hidden"
        style={{ backgroundColor: ANGELA_COLORS.dress }}
      >
        {/* Modest pink apron overlay */}
        <div 
          className="w-6 h-8 rounded-b-md border border-pink-400 mt-2"
          style={{ backgroundColor: ANGELA_COLORS.apron }}
        />
      </div>

      {/* Flowing Skirt Base */}
      <div 
        className="w-14 h-6 rounded-b-xl border border-neutral-300 -mt-1"
        style={{ backgroundColor: ANGELA_COLORS.dress }}
      />
    </div>
  );
};
