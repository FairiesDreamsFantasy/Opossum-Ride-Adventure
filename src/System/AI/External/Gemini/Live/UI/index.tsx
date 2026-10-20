/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { GeminiLive } from "../index";
import { GeminiSystem } from "../../index";
import { Mic, MicOff, Settings, Volume2, Monitor, Play, X } from "lucide-react";

/**
 * Visual feedback for Gemini Live state - returning null to avoid visual noise/clutter on play area.
 * Completely silent, auditory cues (rising and descending chimes) are played instead.
 */
export const GeminiLiveIndicator: React.FC = () => {
  return null;
};

export interface GeminiLiveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GeminiLiveModal: React.FC<GeminiLiveModalProps> = ({ isOpen, onClose }) => {
  const [liveEnabled, setLiveEnabled] = useState(false);
  const [voiceName, setVoiceName] = useState("Zephyr");
  const [screencastEnabled, setScreencastEnabled] = useState(false);
  const [silenceThreshold, setSilenceThreshold] = useState(2.5);

  useEffect(() => {
    const config = GeminiSystem.getConfig();
    if (config) {
      setLiveEnabled(!!config.liveEnabled);
      setVoiceName(config.liveVoiceName ?? "Zephyr");
      setScreencastEnabled(!!config.liveScreencastEnabled);
      setSilenceThreshold(config.liveSilenceThresholdSeconds ?? 2.5);
    }

    // Subscribe to system updates
    const unsub = GeminiSystem.subscribe(() => {
      const cfg = GeminiSystem.getConfig();
      if (cfg) {
        setLiveEnabled(!!cfg.liveEnabled);
        setVoiceName(cfg.liveVoiceName ?? "Zephyr");
        setScreencastEnabled(!!cfg.liveScreencastEnabled);
        setSilenceThreshold(cfg.liveSilenceThresholdSeconds ?? 2.5);
      }
    });

    return unsub;
  }, [isOpen]);

  if (!isOpen) return null;

  const handleToggleLive = () => {
    const next = !liveEnabled;
    setLiveEnabled(next);
    GeminiSystem.setLiveEnabled(next);
  };

  const handleToggleScreencast = () => {
    const next = !screencastEnabled;
    setScreencastEnabled(next);
    GeminiSystem.setLiveScreencastEnabled(next);
  };

  const handleVoiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setVoiceName(val);
    GeminiSystem.setLiveVoiceName(val);
  };

  const handleThresholdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setSilenceThreshold(val);
    GeminiSystem.setLiveSilenceThresholdSeconds(val);
  };

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 select-text"
      role="dialog"
      aria-modal="true"
      aria-labelledby="live-modal-title"
    >
      <div className="relative flex flex-col w-full max-w-md bg-stone-950 border-2 border-green-600 rounded-2xl shadow-2xl text-stone-100 overflow-hidden font-mono">
        
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 bg-stone-900 border-b border-green-900/60 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-green-950/80 border border-green-500/50 rounded-xl text-green-400">
              <Settings className="w-5 h-5 animate-spin-slow" aria-hidden="true" />
            </div>
            <div>
              <h2 id="live-modal-title" className="text-base font-bold tracking-tight text-green-300">
                Gemini Live Preferences
              </h2>
              <p className="text-[10px] text-stone-400 uppercase">Acoustic &amp; Voice Input settings</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-stone-200 transition"
            aria-label="Close Gemini Live settings"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Content */}
        <main className="p-6 space-y-5">
          {/* Main Toggle Switch */}
          <div className="flex items-center justify-between p-4 bg-stone-900/50 rounded-xl border border-green-950">
            <div>
              <span className="text-sm font-bold text-green-200 block">Gemini Live Service</span>
              <span className="text-[9px] text-stone-500 uppercase">Enable/Disable real-time speech</span>
            </div>
            <button
              type="button"
              onClick={handleToggleLive}
              aria-pressed={liveEnabled}
              className={`px-4 py-2 rounded-lg text-xs font-bold border transition duration-300 min-h-[44px] min-w-[70px] ${
                liveEnabled 
                  ? "bg-green-950 text-green-200 border-green-500 shadow-[0_0_8px_rgba(34,197,94,0.3)]" 
                  : "bg-black text-stone-600 border-stone-800"
              }`}
            >
              {liveEnabled ? "ON" : "OFF"}
            </button>
          </div>

          {/* Voice selector */}
          <div className="space-y-1.5">
            <label htmlFor="voice-select" className="text-[10px] font-bold uppercase text-green-600 flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5" />
              <span>Preferred Live Voice:</span>
            </label>
            <select
              id="voice-select"
              value={voiceName}
              onChange={handleVoiceChange}
              disabled={!liveEnabled}
              className="w-full bg-black border border-green-900 rounded-lg px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-green-400 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {["Puck", "Charon", "Kore", "Fenrir", "Zephyr"].map(v => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </div>

          {/* Screencast Toggle */}
          <div className="flex items-center justify-between p-3.5 bg-black/40 rounded-xl border border-stone-900">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-stone-300 flex items-center gap-1.5">
                <Monitor className="w-3.5 h-3.5 text-stone-400" />
                <span>Active Screencast Share</span>
              </span>
              <span className="text-[9px] text-stone-500 uppercase block">Send gameplay frames to Gemini</span>
            </div>
            <button
              type="button"
              onClick={handleToggleScreencast}
              disabled={!liveEnabled}
              aria-pressed={screencastEnabled}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition duration-300 min-h-[38px] ${
                screencastEnabled 
                  ? "bg-green-950 text-green-200 border-green-500" 
                  : "bg-black text-stone-600 border-stone-800 disabled:opacity-30"
              }`}
            >
              {screencastEnabled ? "ON" : "OFF"}
            </button>
          </div>

          {/* Silence threshold slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase text-green-600">
                Silence Auto-Off Threshold:
              </span>
              <span className="text-xs text-green-300 font-bold">
                {silenceThreshold.toFixed(1)}s
              </span>
            </div>
            <input
              type="range"
              min="1.5"
              max="4.0"
              step="0.5"
              value={silenceThreshold}
              onChange={handleThresholdChange}
              disabled={!liveEnabled}
              className="w-full accent-green-500 h-1 bg-stone-800 rounded-lg cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            />
            <p className="text-[9px] text-stone-500 leading-normal uppercase">
              Google Assistant style auto-off will trigger after {silenceThreshold.toFixed(1)} seconds of silence.
            </p>
          </div>
        </main>

        {/* Footer */}
        <footer className="px-6 py-3 bg-stone-900 border-t border-green-900/40 flex items-center justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-green-600 hover:bg-green-500 text-black font-bold text-xs uppercase transition shadow-md"
          >
            Close Preferences
          </button>
        </footer>
      </div>
    </div>
  );
};
