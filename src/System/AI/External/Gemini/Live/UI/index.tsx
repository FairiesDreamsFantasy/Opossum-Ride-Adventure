/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { GeminiLive } from "../index";
import { GeminiSystem } from "../../index";
import { Mic, MicOff, Sparkles } from "lucide-react";

/**
 * Visual feedback for Gemini Live PTT state.
 */
export const GeminiLiveIndicator: React.FC = () => {
  const [state, setState] = useState(GeminiLive.getState());
  const [isLiveEnabled, setIsLiveEnabled] = useState(false);

  useEffect(() => {
    // Subscribe to Live state changes
    const unsubLive = GeminiLive.subscribe(() => {
      setState(GeminiLive.getState());
    });

    // Subscribe to Gemini System config changes (for the enable/disable toggle)
    const unsubSystem = GeminiSystem.subscribe(() => {
      const config = GeminiSystem.getConfig();
      setIsLiveEnabled(!!config?.liveEnabled);
    });

    // Initial check
    const config = GeminiSystem.getConfig();
    setIsLiveEnabled(!!config?.liveEnabled);

    return () => {
      unsubLive();
      unsubSystem();
    };
  }, []);

  if (!isLiveEnabled && !state.isPushToTalkActive) return null;

  return (
    <div 
      className={`fixed top-4 right-4 z-[10000] flex items-center gap-3 px-4 py-2 rounded-full border transition-all duration-300 ${
        state.isPushToTalkActive 
          ? "bg-red-950 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)] scale-110" 
          : "bg-zinc-950/80 border-green-900/60 opacity-60 hover:opacity-100"
      }`}
      aria-live="polite"
    >
      <div className="flex items-center gap-2">
        {state.isPushToTalkActive ? (
          <>
            <div className="relative">
              <Mic className="w-4 h-4 text-red-400 animate-pulse" />
              <div className="absolute inset-0 bg-red-500/20 rounded-full animate-ping" />
            </div>
            <span className="text-xs font-bold text-red-200 uppercase tracking-widest">
              Gemini Listening...
            </span>
          </>
        ) : (
          <>
            <MicOff className="w-4 h-4 text-zinc-500" />
            <span className="text-[10px] font-bold text-green-700 uppercase tracking-tighter">
              Live Ready (Shift-C)
            </span>
          </>
        )}
      </div>
      <Sparkles className={`w-3 h-3 ${state.isPushToTalkActive ? "text-amber-400 animate-spin" : "text-green-900"}`} />
    </div>
  );
};
