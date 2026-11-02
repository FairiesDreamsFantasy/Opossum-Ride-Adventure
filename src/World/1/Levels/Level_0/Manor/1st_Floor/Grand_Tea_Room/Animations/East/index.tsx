/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ModularTapestryComponent } from "../../../../../../../../../System/Items/Tapestries";

export const RenderGrandTeaRoomEastWall: React.FC = () => {
  return (
    <div className="relative w-full h-full bg-gradient-to-r from-purple-950 via-pink-950/40 to-black p-6 rounded-r-lg border-r-2 border-amber-500/50 flex flex-col justify-between">
      <div className="flex justify-between items-center text-xs font-mono text-amber-300 mb-4">
        <span>EAST WALL (Facing Floor Foyer)</span>
        <span>Markers: 100-400 ft Tapestries | 990-1010 ft Foyer Door</span>
      </div>

      {/* Tapestry Section (100 - 400 ft) */}
      <div className="mb-6">
        <ModularTapestryComponent startFeet={100} endFeet={400} wallLocation="East Wall (100 to 400 ft)" />
      </div>

      {/* Foyer Doorway (990 - 1010 ft) */}
      <div className="border-4 border-red-600 bg-red-950/70 p-4 rounded-lg relative overflow-hidden shadow-[0_0_25px_rgba(220,38,38,0.5)]">
        {/* Frame decorations: 3.5" Gold circles, Silver Diamonds, 5-point Emerald Stars */}
        <div className="flex justify-between items-center bg-red-900/80 px-4 py-2 rounded mb-3 border border-red-500">
          <div className="flex items-center gap-2">
            {/* Gold Circles */}
            <div className="w-3.5 h-3.5 rounded-full bg-amber-400 border border-amber-200 shadow-[0_0_6px_#fbbf24]" title="3.5 inch Gold Circle" />
            {/* Silver Diamond */}
            <div className="w-3 h-3 rotate-45 bg-slate-200 border border-white shadow-[0_0_6px_#ffffff]" title="Silver Diamond" />
            {/* Emerald Star 5-point */}
            <span className="text-emerald-400 font-bold text-sm shadow-[0_0_8px_#10b981]" title="5-point Emerald Star">★</span>
          </div>
          <span className="text-xs font-bold text-red-100 uppercase tracking-wider">
            6" Red Frame (20' Total Height)
          </span>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 font-bold text-sm shadow-[0_0_8px_#10b981]">★</span>
            <div className="w-3 h-3 rotate-45 bg-slate-200 border border-white shadow-[0_0_6px_#ffffff]" />
            <div className="w-3.5 h-3.5 rounded-full bg-amber-400 border border-amber-200 shadow-[0_0_6px_#fbbf24]" />
          </div>
        </div>

        {/* Double Door Panels (10 ft wide x 15 ft high each) */}
        <div className="flex gap-2 justify-center">
          <div className="flex-1 bg-amber-950 border-2 border-amber-600 rounded-l p-4 text-center text-xs font-mono text-amber-200">
            Left Door (10' x 15')
          </div>
          <div className="flex-1 bg-amber-950 border-2 border-amber-600 rounded-r p-4 text-center text-xs font-mono text-amber-200">
            Right Door (10' x 15')
          </div>
        </div>
      </div>
    </div>
  );
};
