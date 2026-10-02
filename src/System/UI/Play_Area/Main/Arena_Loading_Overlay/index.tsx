/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

export interface ArenaLoadingOverlayProps {
  progressPercent: number;
  loadingStatus: string;
}

/**
 * Animated "Now Loading" screen for AI-generated arena creation.
 * Positioned cleanly within the Game View canvas with an animated progress bar on the bottom.
 */
export const ArenaLoadingOverlay: React.FC<ArenaLoadingOverlayProps> = ({
  progressPercent,
  loadingStatus
}) => {
  const currentPercent = Math.min(100, Math.max(0, Math.round(progressPercent)));

  return (
    <div 
      className="absolute inset-0 bg-black/85 backdrop-blur-md z-40 flex flex-col justify-between p-4 sm:p-6 select-none font-mono border border-green-950/80 shadow-2xl overflow-hidden"
      role="status"
      aria-live="polite"
      aria-label={`Arena Loading: ${currentPercent}% - ${loadingStatus}`}
    >
      {/* Top Header Section */}
      <div className="w-full flex items-center justify-between border-b border-green-900/60 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping" />
          <h2 className="text-sm sm:text-base font-bold uppercase tracking-widest text-green-400 filter drop-shadow-[0_0_6px_rgba(34,197,94,0.5)]">
            NOW LOADING ARENA
          </h2>
        </div>
        <div className="px-2.5 py-1 bg-green-950/80 border border-green-700/60 rounded text-[10px] font-semibold text-green-300 uppercase tracking-wider">
          Gemini AI Active
        </div>
      </div>

      {/* Center Animated Radar / Topological Schematic */}
      <div className="my-auto flex flex-col items-center justify-center text-center px-2 py-4">
        {/* Animated Topography Grid Box */}
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 mb-4 flex items-center justify-center border border-green-800/80 rounded-full bg-black/60 shadow-[0_0_20px_rgba(34,197,94,0.15)] overflow-hidden">
          {/* Radar Grid Lines */}
          <div className="absolute inset-2 rounded-full border border-green-900/40" />
          <div className="absolute inset-6 rounded-full border border-green-900/30" />
          <div className="absolute inset-0 border-t border-green-800/40" />
          <div className="absolute inset-0 border-l border-green-800/40" />
          
          {/* Rotating Scanner Beam */}
          <div className="absolute inset-0 animate-spin origin-center opacity-60">
            <div className="w-1/2 h-1/2 bg-gradient-to-br from-green-500/40 to-transparent origin-bottom-right" />
          </div>

          {/* Central Pulse Node */}
          <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse filter drop-shadow-[0_0_8px_rgba(34,197,94,0.8)] z-10" />
        </div>

        {/* Dynamic Status Display */}
        <p className="text-xs sm:text-sm font-semibold text-green-300 uppercase tracking-wider mb-1 max-w-md animate-pulse">
          {loadingStatus || "Synthesizing Arena Blueprint..."}
        </p>
        <p className="text-[11px] text-green-600/90 font-mono tracking-tight">
          [Model: Gemini 3.5 Flash | Bandwidth: Optimized | Quota Monitored]
        </p>
      </div>

      {/* Bottom Progress Bar Section (Positioned at bottom of Game View Canvas) */}
      <div className="w-full bg-black/90 p-3 border border-green-900/60 rounded-lg shadow-inner">
        <div className="flex justify-between items-center mb-1.5 text-xs text-green-400">
          <span className="font-bold uppercase tracking-wider">Progress Status</span>
          <span className="font-bold font-mono text-green-300">{currentPercent}%</span>
        </div>

        {/* Outer Progress Bar Track */}
        <div className="w-full h-3.5 bg-zinc-950 border border-green-800/80 rounded-full p-0.5 shadow-[0_0_10px_rgba(34,197,94,0.2)] overflow-hidden">
          {/* Inner Animated Progress Fill */}
          <div 
            className="h-full bg-gradient-to-r from-emerald-600 via-green-400 to-lime-300 rounded-full transition-all duration-300 ease-out shadow-[0_0_8px_rgba(74,222,128,0.8)]"
            style={{ width: `${currentPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
};
