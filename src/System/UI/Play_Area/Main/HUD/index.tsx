/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { GameLevel } from "../../../../../types";
import { GeminiSystem } from "../../../../AI/External/Gemini";

interface HUDProps {
  currentLevelId: number;
  currentLevel: GameLevel;
  playerZ: number;
  score: number;
  ticksEaten: number;
  Measured_Distance_Value: (meters: number) => string;
  getEdibleItemName: (levelId: number) => string;
  largeText?: boolean;
}

export const HUD: React.FC<HUDProps> = ({
  currentLevelId,
  currentLevel,
  playerZ,
  score,
  ticksEaten,
  Measured_Distance_Value,
  getEdibleItemName,
  largeText = false
}) => {
  const [quotaPercent, setQuotaPercent] = React.useState(GeminiSystem.getQuotaStatus().percent);

  React.useEffect(() => {
    const unsub = GeminiSystem.subscribe(() => {
      setQuotaPercent(GeminiSystem.getQuotaStatus().percent);
    });
    return unsub;
  }, []);

  const textSizeClass = largeText ? "text-base md:text-lg font-bold" : "text-xs md:text-sm";

  return (
    <div id="HUD_Container" className="w-full flex justify-end">
      <div id="Dashboard_Panel" className={`flex flex-wrap items-center gap-4 bg-zinc-950/80 px-4 py-2 rounded-md border border-green-900 font-mono text-green-300 w-full md:w-auto shadow-md ${textSizeClass}`}>
        <div>
          LEVEL: <span className="text-white font-bold">{currentLevelId}</span>
        </div>
        <div className="border-l border-green-900 h-4" />
        <div>
          DISTANCE: <span className="text-white font-bold">{Measured_Distance_Value(playerZ)} / {Measured_Distance_Value(currentLevel.targetDistance)}</span>
        </div>
        <div className="border-l border-green-900 h-4" />
        <div>
          SCORE: <span className="text-white font-bold">{score}</span>
        </div>
        <div className="border-l border-green-900 h-4" />
        <div>
          {getEdibleItemName(currentLevelId).toUpperCase()}: <span className="text-green-200 font-bold">{ticksEaten}</span>
        </div>
        
        {GeminiSystem.isReady() && (
          <>
            <div className="border-l border-green-900 h-4" />
            <div className="flex items-center gap-2">
              <span className="text-[10px]">AI_QUOTA:</span>
              <div className="w-16 h-2 bg-green-950 border border-green-900 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 transition-all duration-500" 
                  style={{ width: `${quotaPercent}%` }}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
