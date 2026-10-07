/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { GeminiSystem } from "../../../../AI/External/Gemini";

interface HUDProps {
  currentLevelId: number;
  Measured_Distance_Value: (val: number) => string;
  playerZ: number;
  targetDistance: number;
  score: number;
  ticksEaten: number;
  edibleItemName: string;
}

export const HUD: React.FC<HUDProps> = ({
  currentLevelId,
  Measured_Distance_Value,
  playerZ,
  targetDistance,
  score,
  ticksEaten,
  edibleItemName
}) => {
  return (
    <div id="HUD_Container" className="w-full flex justify-end">
      <div id="Dashboard_Panel" className="flex flex-wrap items-center gap-4 bg-zinc-950/80 px-4 py-2 rounded-md border border-green-900 text-xs md:text-sm font-mono text-green-300 w-full md:w-auto shadow-md">
        <div>
          LEVEL: <span className="text-white font-bold">{currentLevelId}</span>
        </div>
        <div className="border-l border-green-900 h-4" />
        <div>
          DISTANCE: <span className="text-white font-bold">{Measured_Distance_Value(playerZ)} / {Measured_Distance_Value(targetDistance)}</span>
        </div>
        <div className="border-l border-green-900 h-4" />
        <div>
          SCORE: <span className="text-white font-bold">{score}</span>
        </div>
        <div className="border-l border-green-900 h-4" />
        <div>
          {edibleItemName.toUpperCase()}: <span className="text-green-200 font-bold">{ticksEaten}</span>
        </div>
        
        {GeminiSystem.isReady() && (
          <>
            <div className="border-l border-green-900 h-4" />
            <div className="flex items-center gap-2">
              <span className="text-[10px]">AI_QUOTA:</span>
              <div className="w-16 h-2 bg-green-950 border border-green-900 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 transition-all duration-500" 
                  style={{ width: `${GeminiSystem.getQuotaStatus().percent}%` }}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
