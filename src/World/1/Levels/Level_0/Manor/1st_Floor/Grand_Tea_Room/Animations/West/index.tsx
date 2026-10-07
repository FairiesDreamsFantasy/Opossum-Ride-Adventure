/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

export const RenderGrandTeaRoomWestWall: React.FC = () => {
  return (
    <div className="relative w-full h-full bg-gradient-to-l from-purple-950 via-pink-950/40 to-black p-6 rounded-l-lg border-l-2 border-pink-400/50">
      <div className="flex justify-between items-center text-xs font-mono text-pink-300 mb-4">
        <span>WEST WALL (2,000 ft perimeter)</span>
        <span>10' x 10' Picture Windows</span>
      </div>

      <div className="flex justify-center gap-6 mt-6">
        {[1, 2].map((w) => (
          <div
            key={w}
            className="w-32 h-32 border-4 border-amber-800 bg-purple-950/80 rounded shadow-[0_0_15px_rgba(236,72,153,0.3)] relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-900 via-pink-950 to-emerald-950/80" />
            <div className="absolute top-3 left-4 w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_6px_#34d399]" />
            <div className="absolute top-6 right-3 w-2 h-2 bg-emerald-300 rounded-full shadow-[0_0_8px_#34d399]" />
            <div className="absolute bottom-4 left-4 text-[9px] text-pink-200 font-bold">10'x10' Window</div>
          </div>
        ))}
      </div>
    </div>
  );
};
