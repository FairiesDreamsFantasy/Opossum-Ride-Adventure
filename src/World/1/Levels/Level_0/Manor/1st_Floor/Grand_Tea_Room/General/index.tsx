/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { GrandTeaRoomDescription } from "../Description";
import { GrandTeaRoomAnimations } from "../Animations";

export interface GrandTeaRoomGeneralProps {
  playerX?: number;
  playerY?: number;
  facingDirection?: string;
}

export const GrandTeaRoomGeneral: React.FC<GrandTeaRoomGeneralProps> = ({
  playerX = 1000,
  playerY = 1000,
  facingDirection = "East"
}) => {
  return (
    <div className="grand-tea-room-general bg-black/90 text-purple-200 border-2 border-red-800/80 rounded-2xl p-6 shadow-2xl max-w-5xl mx-auto my-4 font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-red-900/60 pb-4 mb-4 gap-2">
        <div>
          <h2 className="text-xl font-bold tracking-wide text-red-400 uppercase">
            {GrandTeaRoomDescription.name}
          </h2>
          <p className="text-xs text-pink-300 font-mono">
            Location: Manor 1st Floor (West of Floor Foyer) | Surface: {GrandTeaRoomDescription.dimensions.widthFeet} x {GrandTeaRoomDescription.dimensions.lengthFeet} ft
          </p>
        </div>
        <div className="bg-red-950/80 border border-red-700/60 px-3 py-1.5 rounded-lg text-xs font-mono text-red-200">
          Position: ({playerX} ft, {playerY} ft) | Facing: {facingDirection}
        </div>
      </div>

      <div className="bg-purple-950/40 border border-pink-900/40 p-4 rounded-xl mb-6 text-sm leading-relaxed text-pink-100">
        {GrandTeaRoomDescription.narrative}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-red-950/30 border border-red-900/40 p-3 rounded-lg text-xs">
          <span className="font-bold text-red-300 block mb-1">Flooring & Atmosphere</span>
          <p className="text-pink-200/90">{GrandTeaRoomDescription.flooring}</p>
          <p className="text-pink-200/90 mt-1">{GrandTeaRoomDescription.walls}</p>
        </div>
        <div className="bg-amber-950/30 border border-amber-900/40 p-3 rounded-lg text-xs">
          <span className="font-bold text-amber-300 block mb-1">Foyer Doorway (East Wall 990-1010 ft)</span>
          <p className="text-amber-100/90">20 ft Total Red Frame (6" thick) with 3.5" Gold Circles, Silver Diamonds, & 5-pt Emerald Stars.</p>
        </div>
      </div>

      <GrandTeaRoomAnimations activeDirection={facingDirection} />
    </div>
  );
};
