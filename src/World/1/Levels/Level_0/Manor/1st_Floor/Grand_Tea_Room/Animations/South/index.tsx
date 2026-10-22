/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

export const RenderGrandTeaRoomSouthWall: React.FC = () => {
  return (
    <div className="relative w-full h-full bg-gradient-to-b from-purple-950 via-pink-950/30 to-black p-6 rounded-b-lg border-b-2 border-purple-500/50">
      <div className="flex justify-between items-center text-xs font-mono text-purple-300">
        <span>SOUTH WALL (Y=0 marker)</span>
        <span>Horizon: Pinkish White</span>
      </div>
      <div className="mt-8 text-center text-xs text-purple-200/70 font-sans">
        Continuous interior wall decorated with pinkish-white horizon and glowing stars.
      </div>
    </div>
  );
};
