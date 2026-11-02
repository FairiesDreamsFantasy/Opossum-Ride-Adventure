/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Play, Pause, Menu, ArrowUp, Volume2, VolumeX } from "lucide-react";
import { NIGHT_SKY_AMBER_SPECS } from "../../General";

export interface LandscapeRightDeckProps {
  isPlaying: boolean;
  onTogglePlayPause: () => void;
  onOpenMenu: () => void;
  onJump: () => void;
  onSetCruiseLowStop?: () => void;
  onSetCruiseHigh?: () => void;
  ttsEnabled?: boolean;
  onToggleTTS?: () => void;
}

export const LandscapeRightDeck: React.FC<LandscapeRightDeckProps> = ({
  isPlaying,
  onTogglePlayPause,
  onOpenMenu,
  onJump,
  onSetCruiseLowStop,
  onSetCruiseHigh,
  ttsEnabled,
  onToggleTTS
}) => {
  return (
    <div
      id="Mobile_Landscape_Right_Deck"
      className="flex flex-col items-center justify-between p-2  h-full"
    >
      {/* Upper Right Action Cluster: Pause/Resume with Menu Button placed directly below it */}
      <div className="flex flex-col items-center gap-2 w-full">
        {/* 1. Pause / Resume Button */}
        <button
          id="landscape-btn-pause"
          type="button"
          onClick={onTogglePlayPause}
          className="w-full max-w-[100px] flex items-center justify-center gap-1.5 px-3 py-1.5 rounded bg-amber-950/80 border-2 border-amber-600 text-amber-300 font-mono text-xs font-bold active:bg-amber-800 min-h-[38px] shadow touch-manipulation"
          aria-label={isPlaying ? "Pause game" : "Resume game"}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span>{isPlaying ? "PAUSE" : "RESUME"}</span>
        </button>

        {/* 2. Menu Button: Placed directly below the pause/resume button */}
        <button
          id="landscape-btn-menu"
          type="button"
          onClick={onOpenMenu}
          className="w-full max-w-[100px] flex items-center justify-center gap-1.5 px-3 py-1.5 rounded bg-stone-900 border border-amber-700/70 text-amber-200 font-mono text-xs font-semibold active:bg-stone-800 min-h-[38px] shadow touch-manipulation"
          aria-label="Open Game Menu"
        >
          <Menu className="w-3.5 h-3.5 text-amber-400" />
          <span>MENU</span>
        </button>
      </div>

      {/* Middle/Lower Action Cluster: Jump Button & Cruise Triggers */}
      <div className="flex flex-col items-center gap-2 w-full mt-2">
        {/* Primary Jump Action (Large Tactile Button) */}
        <button
          id="landscape-btn-jump"
          type="button"
          onClick={onJump}
          className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 border-2 border-amber-400 text-amber-100 font-bold flex flex-col items-center justify-center shadow-lg active:scale-95 touch-manipulation min-h-[44px]"
          aria-label="Jump opossum"
        >
          <ArrowUp className="w-5 h-5 text-amber-100" />
          <span className="text-[10px] font-mono tracking-wider uppercase">JUMP</span>
        </button>

        {/* Cruise Controls */}
        <div className="flex items-center gap-1 w-full justify-center">
          <button
            id="landscape-btn-cruise-down"
            type="button"
            onClick={onSetCruiseLowStop}
            className="px-2 py-1 bg-stone-900 border border-amber-800/60 text-amber-400 text-[10px] font-mono rounded active:bg-stone-800 min-h-[32px] touch-manipulation"
            aria-label="Decrease cruise speed"
          >
            CRUISE -
          </button>
          <button
            id="landscape-btn-cruise-up"
            type="button"
            onClick={onSetCruiseHigh}
            className="px-2 py-1 bg-stone-900 border border-amber-800/60 text-amber-400 text-[10px] font-mono rounded active:bg-stone-800 min-h-[32px] touch-manipulation"
            aria-label="Increase cruise speed"
          >
            CRUISE +
          </button>
        </div>
      </div>
    </div>
  );
};
