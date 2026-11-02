/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { ThemeType, CENTRALIZED_THEMES_REGISTRY } from "../../../Themes";
import { playProceduralSound } from "../../../Sound/TTS";
import { ThemeModalGeneral } from "./General";

export interface ThemeSwitcherModalProps {
  currentTheme: ThemeType;
  onSetTheme: (theme: ThemeType) => void;
  onClose: () => void;
  speakWords?: (text: string) => void;
}

export const ThemeSwitcherModal: React.FC<ThemeSwitcherModalProps> = ({
  currentTheme,
  onSetTheme,
  onClose,
  speakWords
}) => {
  const [selected, setSelected] = useState<ThemeType>(currentTheme);

  const handleSet = () => {
    playProceduralSound("tick");
    onSetTheme(selected);
    if (speakWords) speakWords(`Set game theme to ${CENTRALIZED_THEMES_REGISTRY[selected].name}`);
    onClose();
  };

  const handleCancel = () => {
    playProceduralSound("tick");
    if (speakWords) speakWords("Closed theme switcher modal");
    onClose();
  };

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="theme_modal_title"
      className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50 animate-fade-in overflow-y-auto"
    >
      <div className="bg-zinc-950 border-2 border-amber-500 max-w-2xl w-full rounded-lg p-6 font-mono text-amber-200 shadow-[0_0_50px_rgba(245,158,11,0.3)] my-8 space-y-4">
        <h2 id="theme_modal_title" className="text-xl font-bold uppercase tracking-widest text-amber-100 border-b border-amber-800 pb-2 flex items-center gap-2">
          <span>🎨</span>
          <span>Switch Game Theme</span>
        </h2>
        
        <p className="text-xs text-amber-300 leading-relaxed">
          Select a centralized visual theme to customize the layout, frame, HUD presentation, and menu bar of Opossum Ride Adventure.
        </p>

        {/* Theme Push-Button Selection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-amber-900/60 max-h-[60vh] overflow-y-auto pr-1">
          {(Object.keys(CENTRALIZED_THEMES_REGISTRY) as ThemeType[]).map((tId) => {
            const themeInfo = CENTRALIZED_THEMES_REGISTRY[tId];
            const isSelected = selected === tId;

            return (
              <button
                key={tId}
                type="button"
                aria-pressed={isSelected}
                onClick={() => {
                  playProceduralSound("tick");
                  setSelected(tId);
                }}
                className={`p-3 rounded text-left border min-h-[54px] flex flex-col justify-between transition cursor-pointer ${
                  isSelected
                    ? "bg-amber-950/90 text-amber-100 border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.5)] ring-2 ring-amber-400/50"
                    : "bg-zinc-900/80 text-amber-300/80 border-amber-900/50 hover:border-amber-700 hover:text-amber-200"
                }`}
              >
                <div className="flex justify-between items-center w-full">
                  <span className="font-bold text-xs uppercase tracking-wider">{themeInfo.name}</span>
                  {isSelected && (
                    <span className="text-[10px] bg-amber-400 text-black px-1.5 py-0.5 rounded font-bold uppercase">
                      ACTIVE
                    </span>
                  )}
                </div>
                <p className="text-[11px] opacity-80 mt-1 leading-snug">{themeInfo.description}</p>
              </button>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-amber-900/60">
          <button
            type="button"
            onClick={handleCancel}
            className="cursor-pointer bg-zinc-900 hover:bg-zinc-800 text-amber-300 px-5 py-2.5 rounded text-xs font-bold uppercase border border-amber-900 min-h-[44px]"
          >
            Go Back
          </button>
          <button
            type="button"
            onClick={handleSet}
            className="cursor-pointer bg-amber-500 hover:bg-amber-400 text-black px-8 py-2.5 rounded text-xs font-bold uppercase shadow-lg min-h-[44px]"
          >
            Set Theme
          </button>
        </div>
      </div>
    </div>
  );
};

export { ThemeModalGeneral };
