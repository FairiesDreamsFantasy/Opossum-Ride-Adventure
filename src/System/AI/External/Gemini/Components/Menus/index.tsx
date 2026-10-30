/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  ShoppingBag, 
  Youtube, 
  Mic, 
  MicOff, 
  Settings,
  Sparkles,
  Newspaper
} from "lucide-react";
import { GeminiSystem } from "../../index";

interface GeminiToolboxMenuProps {
  onOpenShopping: () => void;
  onOpenYouTube: () => void;
  onOpenPreferences: () => void;
  onOpenNews?: () => void;
  itemTextClass?: string;
}

export const GeminiToolboxMenu: React.FC<GeminiToolboxMenuProps> = ({
  onOpenShopping,
  onOpenYouTube,
  onOpenPreferences,
  onOpenNews,
  itemTextClass = "text-[11px]"
}) => {
  const [liveEnabled, setLiveEnabled] = useState(false);

  useEffect(() => {
    const config = GeminiSystem.getConfig();
    if (config) {
      setLiveEnabled(!!config.liveEnabled);
    }

    const unsub = GeminiSystem.subscribe(() => {
      const cfg = GeminiSystem.getConfig();
      if (cfg) {
        setLiveEnabled(!!cfg.liveEnabled);
      }
    });

    return unsub;
  }, []);

  const handleToggleLive = () => {
    const next = !liveEnabled;
    setLiveEnabled(next);
    GeminiSystem.setLiveEnabled(next);
  };

  return (
    <div className="flex flex-col gap-3" aria-label="Gemini Toolbox Controls">
      <div className="flex flex-wrap gap-2 items-center">
        {/* Shopping Button */}
        <button
          onClick={onOpenShopping}
          className={`font-mono uppercase px-3 py-1.5 rounded border transition flex items-center gap-2 font-bold bg-emerald-950 text-emerald-200 border-emerald-600 hover:bg-emerald-900 shadow-[0_0_8px_rgba(16,185,129,0.3)] min-h-[44px] ${itemTextClass}`}
          aria-label="Open Google Shopping & Field Supplies"
        >
          <ShoppingBag size={12} className="text-emerald-400" />
          <span>Shopping</span>
        </button>

        {/* YouTube Button */}
        <button
          onClick={onOpenYouTube}
          className={`font-mono uppercase px-3 py-1.5 rounded border transition flex items-center gap-2 font-bold bg-amber-950 text-amber-200 border-amber-600 hover:bg-amber-900 shadow-[0_0_8px_rgba(245,158,11,0.3)] min-h-[44px] ${itemTextClass}`}
          aria-label="Open The Zion Way & Babylon-Free YouTube Explorer"
        >
          <Youtube size={12} className="text-amber-400" />
          <span>Zion YouTube</span>
        </button>

        {/* News Button */}
        {onOpenNews && (
          <button
            onClick={onOpenNews}
            className={`font-mono uppercase px-3 py-1.5 rounded border transition flex items-center gap-2 font-bold bg-red-950 text-red-200 border-red-600 hover:bg-red-900 shadow-[0_0_8px_rgba(239,68,68,0.3)] min-h-[44px] ${itemTextClass}`}
            aria-label="Open YouTube News & Live Broadcasts"
          >
            <Newspaper size={12} className="text-red-400" />
            <span>YouTube News</span>
          </button>
        )}

        {/* Gemini Live ON/OFF Toggle Button */}
        <button
          onClick={handleToggleLive}
          aria-pressed={liveEnabled}
          className={`font-mono uppercase px-3 py-1.5 rounded border transition flex items-center gap-2 font-bold min-h-[44px] ${itemTextClass} ${
            liveEnabled
              ? "bg-green-950 text-green-200 border-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]"
              : "bg-zinc-900/60 text-green-400 border-green-900/50 hover:border-green-700"
          }`}
          aria-label={`Toggle Gemini Live Voice Input (Currently ${liveEnabled ? "ON" : "OFF"})`}
        >
          {liveEnabled ? (
            <>
              <Mic size={12} className="text-green-400 animate-pulse" />
              <span>Live Voice: ON</span>
            </>
          ) : (
            <>
              <MicOff size={12} className="text-stone-500" />
              <span>Live Voice: OFF</span>
            </>
          )}
        </button>

        {/* Gemini Live Preferences Button */}
        <button
          onClick={onOpenPreferences}
          className={`font-mono uppercase px-3 py-1.5 rounded border transition flex items-center gap-2 font-bold bg-zinc-900/60 text-stone-300 border-stone-800 hover:border-stone-600 min-h-[44px] ${itemTextClass}`}
          aria-label="Open Gemini Live Preferences Modal"
        >
          <Settings size={12} className="text-stone-400" />
          <span>Live Settings</span>
        </button>
      </div>
    </div>
  );
};
