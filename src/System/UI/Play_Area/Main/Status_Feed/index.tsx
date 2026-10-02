/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Opponent } from "../../../../../types";
import {
  BehaviorAnalyzerView,
  HotspotVisualizerView,
  TrajectoryPredictorView
} from "../../../../AI/In-Game";

interface StatusFeedProps {
  showFeed: boolean;
  statusMessage: string;
  opponents: Opponent[];
  playerZ: number;
  playerSpeed: number;
  opponentZFallback: number;
}

/**
 * StatusFeed Component
 * Displays system alerts, logs, and mathematical AI predictors.
 * Protected against arbitrary changes.
 */
export const StatusFeed: React.FC<StatusFeedProps> = ({
  showFeed,
  statusMessage,
  opponents,
  playerZ,
  playerSpeed,
  opponentZFallback
}) => {
  if (!showFeed) return null;

  const firstOpponent = opponents[0];
  const opponentZ = firstOpponent ? firstOpponent.z : opponentZFallback;
  const opponentSpeed = firstOpponent ? (firstOpponent.isCharging ? firstOpponent.speed : firstOpponent.speed * 0.2) : 0;
  const isBullPresent = opponents.some((o) => o.mooseType === "Bull");

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="bg-zinc-950 border border-green-900 rounded p-4 flex flex-col justify-between w-full shadow-lg">
        <div>
          <p className="text-xs text-green-500 font-mono uppercase mb-1 font-bold tracking-wider">&bull; Live Feed Alerts &amp; System Log</p>
          <p className="text-sm text-green-200 font-mono bg-black/60 p-2.5 rounded border border-green-950 min-h-[44px]">
            {statusMessage}
          </p>
        </div>

        <div className="mt-4 text-[10px] text-zinc-500 font-mono flex items-center justify-between">
          <span>Live alerts parsed in high-fidelity directly from character coordinates and landscape interactions. All alerts are vocally synthesized when enabled.</span>
          <span className="text-green-800 text-[9px] uppercase font-bold tracking-wider">Opossum Ride System Online &bull; 64-bit DSP Synthesis</span>
        </div>
      </div>

      {/* COMPACT BENTO OF MATHEMATICAL INGAME_AI PREDICTORS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <BehaviorAnalyzerView isBull={isBullPresent} />
        <HotspotVisualizerView 
          playerZ={playerZ} 
          opponentZ={opponentZ} 
        />
        <TrajectoryPredictorView 
          playerZ={playerZ} 
          playerSpeed={playerSpeed} 
          opponentZ={opponentZ} 
          opponentSpeed={opponentSpeed} 
        />
      </div>
    </div>
  );
};
