/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import {
  ChalkboardColorConfig,
  CHALKBOARD_LINE_COLORS,
  CHALKBOARD_BG_PRESETS
} from "../../../Components/Menu_Bar/General";
import { playProceduralSound } from "../../../Sound/TTS";

export interface ChalkboardModeSettingsModalProps {
  chalkboardConfig: ChalkboardColorConfig;
  onSave: (newConfig: ChalkboardColorConfig) => void;
  onCancel: () => void;
  speakWords?: (text: string) => void;
}

export const ChalkboardModeSettingsModal: React.FC<ChalkboardModeSettingsModalProps> = ({
  chalkboardConfig,
  onSave,
  onCancel,
  speakWords
}) => {
  const [tempCfg, setTempCfg] = useState<ChalkboardColorConfig>(chalkboardConfig);

  const handleSave = () => {
    playProceduralSound("tick");
    onSave(tempCfg);
    if (speakWords) speakWords("Saved chalkboard color changes");
  };

  const handleCancel = () => {
    playProceduralSound("tick");
    onCancel();
    if (speakWords) speakWords("Cancelled chalkboard color changes");
  };

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="chalkboard_title"
      className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50 animate-fade-in overflow-y-auto"
    >
      <div className="bg-zinc-950 border-2 border-green-700 max-w-xl w-full rounded-lg p-6 font-mono text-green-300 shadow-[0_0_40px_rgba(34,197,94,0.3)] my-8 space-y-4">
        <h2 id="chalkboard_title" className="text-xl font-bold uppercase tracking-widest text-green-100 border-b border-green-800 pb-2">
          Change Chalkboard Colors
        </h2>
        <p className="text-xs text-green-400 leading-relaxed">
          You can change the background and lines of this chalkboard. If you change the background to white, you get a whiteboard with bold black lines by default.
        </p>

        {/* Line Color Selection */}
        <div className="space-y-2 pt-2 border-t border-green-900">
          <label className="text-xs font-bold uppercase text-green-300 block">Line Color:</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {CHALKBOARD_LINE_COLORS.map((lc) => (
              <button
                key={lc.name}
                type="button"
                onClick={() => {
                  playProceduralSound("tick");
                  setTempCfg((prev) => ({
                    ...prev,
                    lineColorName: lc.name,
                    lineHex: lc.hex,
                    bgLineHex: lc.hex
                  }));
                }}
                className={`px-3 py-2 rounded text-xs font-bold uppercase border min-h-[44px] flex items-center justify-between transition cursor-pointer ${
                  tempCfg.lineColorName === lc.name
                    ? "bg-green-900 text-white border-green-400 shadow-[0_0_8px_rgba(34,197,94,0.4)]"
                    : "bg-zinc-900 text-green-400 border-green-900 hover:border-green-700"
                }`}
              >
                <span>{lc.name}</span>
                <span className="w-3 h-3 rounded-full border border-black inline-block" style={{ backgroundColor: lc.hex }} />
              </button>
            ))}
          </div>
        </div>

        {/* Background Color / Preset Selection */}
        <div className="space-y-2 pt-2 border-t border-green-900">
          <label className="text-xs font-bold uppercase text-green-300 block">Background Presets:</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {CHALKBOARD_BG_PRESETS.map((bg) => (
              <button
                key={bg.name}
                type="button"
                onClick={() => {
                  playProceduralSound("tick");
                  setTempCfg((prev) => ({
                    ...prev,
                    bgName: bg.name,
                    bgHex: bg.bgHex,
                    bgLineHex: bg.lineHex
                  }));
                }}
                className={`px-3 py-2 rounded text-xs font-bold uppercase border min-h-[44px] flex items-center justify-between transition cursor-pointer ${
                  tempCfg.bgName === bg.name
                    ? "bg-green-900 text-white border-green-400 shadow-[0_0_8px_rgba(34,197,94,0.4)]"
                    : "bg-zinc-900 text-green-400 border-green-900 hover:border-green-700"
                }`}
              >
                <span>{bg.name}</span>
                <div className="flex gap-1 items-center">
                  <span className="w-3 h-3 rounded border border-zinc-700" style={{ backgroundColor: bg.bgHex }} title="Background" />
                  <span className="w-3 h-3 rounded border border-zinc-700" style={{ backgroundColor: bg.lineHex }} title="Line" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-green-900">
          <button
            type="button"
            onClick={handleCancel}
            className="cursor-pointer bg-zinc-900 hover:bg-zinc-800 text-green-400 px-4 py-2 rounded text-xs font-bold uppercase border border-green-900 min-h-[44px]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="cursor-pointer bg-green-500 hover:bg-green-400 text-black px-6 py-2 rounded text-xs font-bold uppercase font-bold shadow-lg min-h-[44px]"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
