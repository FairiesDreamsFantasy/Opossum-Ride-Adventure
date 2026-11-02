/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

export const RenderGrandTeaRoomNorthWall: React.FC = () => {
  return (
    <div className="relative w-full h-full bg-gradient-to-b from-purple-950 via-pink-950/40 to-black p-6 rounded-t-lg border-t-2 border-pink-400/50">
      <div className="absolute top-4 left-6 right-6 flex justify-between items-center text-xs font-mono text-pink-300">
        <span>NORTH WALL (2,000 ft boundary)</span>
        <span>Sky: Purple with Bright Green Stars</span>
      </div>

      {/* 10x10 ft Picture Windows positioned 10 ft from the flooring */}
      <div className="mt-12 flex justify-center gap-8">
        {[1, 2, 3].map((w) => (
          <div
            key={w}
            className="w-32 h-32 border-4 border-amber-800 bg-sky-900/60 rounded shadow-[0_0_15px_rgba(236,72,153,0.3)] relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900 via-pink-900/40 to-emerald-950/80" />
            {/* Bright green stars */}
            <div className="absolute top-2 left-3 w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_6px_#34d399]" />
            <div className="absolute top-5 right-4 w-2 h-2 bg-emerald-300 rounded-full shadow-[0_0_8px_#34d399]" />
            <div className="absolute bottom-8 left-6 w-1 h-1 bg-emerald-400 rounded-full shadow-[0_0_4px_#34d399]" />
            <div className="absolute bottom-4 right-8 text-[9px] text-pink-200 font-bold">10'x10' Window</div>
          </div>
        ))}
      </div>
    </div>
  );
};
