/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { GameLevel } from "../../../../../../types";

export interface MobileHUDProps {
  currentLevelId: number;
  currentLevel: GameLevel;
  playerZ: number;
  score: number;
  ticksEaten: number;
  Measured_Distance_Value: (meters: number) => string;
  getEdibleItemName: (levelId: number) => string;
  className?: string;
}

export const MobileHUD: React.FC<MobileHUDProps> = ({
  currentLevelId,
  currentLevel,
  playerZ,
  score,
  ticksEaten,
  Measured_Distance_Value,
  getEdibleItemName,
  className = ""
}) => {
  return (
    <div
      id="Mobile_HUD_Container"
      className={`w-full px-3 py-1.5 bg-zinc-950/85 backdrop-blur-md border-b border-green-900/60 font-mono text-[11px] text-green-300 flex items-center justify-between shadow-md ${className}`}
      role="status"
      aria-label="Game Status Bar"
    >
      <div className="flex items-center gap-2">
        <span className="text-zinc-400">LVL:</span>
        <span className="text-white font-bold">{currentLevelId}</span>
      </div>

      <div className="flex items-center gap-1.5">
        <span className="text-zinc-400">DIST:</span>
        <span className="text-white font-bold">{Measured_Distance_Value(playerZ)}</span>
      </div>

      <div className="flex items-center gap-1.5">
        <span className="text-zinc-400">SCORE:</span>
        <span className="text-green-200 font-bold">{score}</span>
      </div>

      <div className="flex items-center gap-1.5">
        <span className="text-zinc-400">{getEdibleItemName(currentLevelId).substring(0, 4).toUpperCase()}:</span>
        <span className="text-green-300 font-bold">{ticksEaten}</span>
      </div>
    </div>
  );
};
