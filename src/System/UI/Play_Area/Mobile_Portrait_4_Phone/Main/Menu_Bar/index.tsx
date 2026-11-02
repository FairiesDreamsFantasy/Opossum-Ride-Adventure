/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ArrowLeft, RefreshCw, Volume2, VolumeX, Smartphone, Layers, Columns, Gamepad2 } from "lucide-react";
import { MobileLayoutStyleType, MOBILE_LAYOUT_STYLES } from "../../General";

export interface MobileMenuBarProps {
  onExitGame: () => void;
  activeLayout: MobileLayoutStyleType;
  onToggleLayout: () => void;
  ttsEnabled: boolean;
  onToggleTTS: () => void;
  showTouchDecks?: boolean;
  onToggleControlsDeck?: () => void;
  className?: string;
}

export const MobileMenuBar: React.FC<MobileMenuBarProps> = ({
  onExitGame,
  activeLayout,
  onToggleLayout,
  ttsEnabled,
  onToggleTTS,
  showTouchDecks = true,
  onToggleControlsDeck,
  className = ""
}) => {
  const currentMeta = MOBILE_LAYOUT_STYLES[activeLayout] || MOBILE_LAYOUT_STYLES["retro-vertical"];

  const renderIcon = () => {
    switch (activeLayout) {
      case "picture-window":
        return <Columns className="w-3.5 h-3.5 text-amber-300" />;
      case "double-screen":
        return <Layers className="w-3.5 h-3.5 text-green-300" />;
      case "retro-vertical":
      default:
        return <Smartphone className="w-3.5 h-3.5 text-emerald-300" />;
    }
  };

  return (
    <header
      id="Mobile_Menu_Bar_Header"
      className={`w-full z-30 px-3 py-2 flex items-center justify-between bg-zinc-950/90 backdrop-blur-md border-b border-green-900/60 font-mono text-xs ${className}`}
      role="banner"
    >
      {/* Return to Landing Page on the left */}
      <button
        type="button"
        id="Mobile_Return_Landing_Page_Button"
        onClick={onExitGame}
        className="flex items-center gap-1.5 px-3 py-2 rounded-md bg-zinc-900 border border-green-700/80 text-green-300 active:bg-green-800 active:text-white transition-all font-semibold touch-manipulation min-h-[44px] min-w-[76px] justify-center"
        aria-label="Return to Landing Page"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="uppercase tracking-wider text-[11px]">Exit</span>
      </button>

      {/* Center Button Deck: Layout Switcher & Optional Controls Deck Toggle */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          id="Mobile_Layout_Switch_Toggle_Button"
          onClick={onToggleLayout}
          className="flex items-center gap-2 px-3 py-2 rounded-full bg-zinc-900 active:bg-zinc-800 border-2 border-green-500/80 text-green-200 active:scale-95 transition-all font-bold touch-manipulation min-h-[44px] shadow-sm"
          aria-label={`Current layout: ${currentMeta.name}. Tap to switch layout.`}
          title="Tap to toggle layout style"
        >
          <RefreshCw className="w-3.5 h-3.5 text-green-400" />
          {renderIcon()}
          <span className="uppercase text-[11px] font-mono tracking-wide">{currentMeta.shortName}</span>
        </button>

        {onToggleControlsDeck && (
          <button
            type="button"
            id="Mobile_Controls_Deck_Toggle_Button"
            onClick={onToggleControlsDeck}
            className={`flex items-center gap-1 px-2.5 py-2 rounded-full border text-[11px] font-mono font-bold touch-manipulation min-h-[44px] transition-all ${
              showTouchDecks
                ? "bg-emerald-950/80 border-emerald-500 text-emerald-300"
                : "bg-zinc-900 border-zinc-700 text-zinc-400"
            }`}
            aria-label={showTouchDecks ? "Hide on-screen buttons" : "Show on-screen buttons"}
            title="Toggle on-screen button controls"
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>{showTouchDecks ? "Deck ON" : "Deck OFF"}</span>
          </button>
        )}
      </div>

      {/* Audio Mute/Unmute */}
      <button
        type="button"
        id="Mobile_TTS_Toggle_Button"
        onClick={onToggleTTS}
        className="p-2.5 rounded-md bg-zinc-900 border border-green-800 text-green-400 active:bg-green-800 active:text-white transition-all touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
        aria-label={ttsEnabled ? "Mute Speech Announcements" : "Unmute Speech Announcements"}
      >
        {ttsEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-zinc-500" />}
      </button>
    </header>
  );
};

