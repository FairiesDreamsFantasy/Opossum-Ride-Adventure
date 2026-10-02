/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { GEORGE_COLORS } from "../Color_Palette";

/**
 * 2D Sprite & Canvas Visuals for George.
 * 4'4" stature, gold onesie with yellow honeycomb, green vegetation shoes, red Rastafari crown.
 */
export const George2D: React.FC<{ scale?: number }> = ({ scale = 1 }) => {
  return (
    <div 
      id="george-rider-2d" 
      className="relative flex flex-col items-center"
      style={{ transform: `scale(${scale})` }}
    >
      {/* Red Rastafari Crown */}
      <div 
        className="w-5 h-3 border border-red-900 rounded-t-sm relative flex justify-between px-0.5 items-start"
        style={{ backgroundColor: GEORGE_COLORS.crown }}
      >
        <span className="w-1 h-1.5 bg-red-700 block" />
        <span className="w-1 h-2 bg-red-700 block" />
        <span className="w-1 h-1.5 bg-red-700 block" />
      </div>

      {/* Head with Dreadlocks */}
      <div 
        className="w-7 h-7 rounded-full border border-black/60 relative -mt-0.5 flex items-center justify-center"
        style={{ backgroundColor: GEORGE_COLORS.skin }}
      >
        {/* Dreadlocks crown hair */}
        <div className="absolute -top-1 left-0 right-0 h-2.5 rounded-t-full bg-neutral-900" />
      </div>

      {/* Gold Onesie Torso with Honeycomb cross-hatch */}
      <div 
        className="w-8 h-10 rounded-md border border-black/80 -mt-0.5 relative overflow-hidden"
        style={{ backgroundColor: GEORGE_COLORS.onesieBase }}
      >
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `radial-gradient(circle, ${GEORGE_COLORS.hexagonFill} 40%, transparent 45%)`,
            backgroundSize: "6px 6px"
          }}
        />
      </div>

      {/* Green Vegetation Shoes */}
      <div className="flex space-x-2 -mt-0.5">
        <div className="w-3 h-2 rounded-sm border border-black/60" style={{ backgroundColor: GEORGE_COLORS.shoes }} />
        <div className="w-3 h-2 rounded-sm border border-black/60" style={{ backgroundColor: GEORGE_COLORS.shoes }} />
      </div>
    </div>
  );
};
