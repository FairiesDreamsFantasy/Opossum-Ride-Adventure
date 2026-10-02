/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { OpossumCharacter, RiderCharacter, GameLevel } from "../../../../../../types";
import { NIGHT_SKY_AMBER_SPECS } from "../../General";

export interface LandscapeHUDProps {
  currentLevelId: number;
  currentLevel: GameLevel;
  playerZ: number;
  score: number;
  ticksEaten: number;
  Measured_Distance_Value: (meters: number) => string;
  getEdibleItemName: (levelId: number) => string;
  selectedOpossum: OpossumCharacter;
  defaultRider: RiderCharacter;
}

export const LandscapeHUD: React.FC<LandscapeHUDProps> = ({
  currentLevelId,
  currentLevel,
  playerZ,
  score,
  ticksEaten,
  Measured_Distance_Value,
  getEdibleItemName,
  selectedOpossum,
  defaultRider
}) => {
  const currentDistanceMeters = currentLevelId === 0 ? 0 : Math.max(0, playerZ);
  const totalLengthMeters = currentLevel.targetDistance || 1000;
  const remainingDistanceMeters = currentLevelId === 0 ? 0 : Math.max(0, totalLengthMeters - currentDistanceMeters);

  return (
    <div
      id="Mobile_Landscape_HUD"
      className="w-full flex items-center justify-between px-3 py-1 bg-stone-950/80 border-b border-amber-900/40 text-amber-300 text-[10px] font-mono select-none"
    >
      <div className="flex items-center gap-3">
        <span className="font-bold text-amber-400 uppercase">
          {currentLevel.name}
        </span>
        <span className="text-amber-500/80">
          DIST: {Measured_Distance_Value(currentDistanceMeters)}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <span>
          {getEdibleItemName(currentLevelId)}: <strong className="text-amber-400">{ticksEaten}</strong>
        </span>
        <span>
          SCORE: <strong className="text-amber-400">{score}</strong>
        </span>
        <span className="text-amber-500/70 hidden sm:inline">
          {selectedOpossum.name} & {defaultRider.name}
        </span>
      </div>
    </div>
  );
};
