/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ArrowLeft, Volume2, VolumeX, RefreshCw } from "lucide-react";

export interface RetroVerticalMenuBarProps {
  onExitGame: () => void;
  onToggleLayout: () => void;
  currentLayoutName: string;
  ttsEnabled: boolean;
  onToggleTTS: () => void;
  className?: string;
}

export const RetroVerticalMenuBar: React.FC<RetroVerticalMenuBarProps> = ({
  onExitGame,
  onToggleLayout,
  currentLayoutName,
  ttsEnabled,
  onToggleTTS,
  className = ""
}) => {
  return (
    <header
      id="Retro_Vertical_Menu_Bar"
      className={`relative z-20 w-full px-3 py-2 flex items-center justify-between bg-zinc-950/85 backdrop-blur-md border-b border-green-900/60 font-mono text-xs ${className}`}
      role="banner"
    >
      {/* Return to Landing Page on the left */}
      <button
        type="button"
        id="Mobile_Return_Landing_Button"
        onClick={onExitGame}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-zinc-900 border border-green-700/80 text-green-300 active:bg-green-800 active:text-white transition-all font-semibold touch-manipulation min-h-[44px]"
        aria-label="Return to Landing Page"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="uppercase tracking-wide text-[11px]">Exit</span>
      </button>

      {/* Center Layout Quick Switcher */}
      <button
        type="button"
        id="Mobile_Layout_Switch_Button"
        onClick={onToggleLayout}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-950/80 border border-green-500 text-green-200 active:scale-95 transition-all font-bold touch-manipulation min-h-[44px]"
        aria-label="Switch Mobile Layout"
      >
        <RefreshCw className="w-3.5 h-3.5 text-green-400 animate-spin-slow" />
        <span className="uppercase text-[11px]">{currentLayoutName}</span>
      </button>

      {/* Audio Mute / Unmute Toggle */}
      <button
        type="button"
        id="Mobile_Audio_Toggle_Button"
        onClick={onToggleTTS}
        className="p-2 rounded bg-zinc-900 border border-green-800 text-green-400 active:bg-green-800 active:text-white transition-all touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
        aria-label={ttsEnabled ? "Mute Speech" : "Unmute Speech"}
      >
        {ttsEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-zinc-500" />}
      </button>
    </header>
  );
};
