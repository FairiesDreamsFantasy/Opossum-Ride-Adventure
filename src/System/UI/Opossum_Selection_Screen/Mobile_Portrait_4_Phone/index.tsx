/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from "react";
import { OpossumCharacter } from "../../../../types";
import { ArrowLeft, Play, Sparkles, Volume2 } from "lucide-react";
import { ProceduralSoundSystem } from "../../../Sound";
import { triggerHapticFeedback } from "../../../Keyboards_and_Controllers/Touchscreen/General";
import { OPOSSUM_PALETTES, calculateMaxRiderHeight } from "../General";

export interface MobilePortraitOpossumSelectionProps {
  opossums: OpossumCharacter[];
  selectedOpossum: OpossumCharacter;
  onSelectOpossum: (opossum: OpossumCharacter) => void;
  onConfirm: () => void;
  onBack: () => void;
}

export const MobilePortraitOpossumSelection: React.FC<MobilePortraitOpossumSelectionProps> = ({
  opossums,
  selectedOpossum,
  onSelectOpossum,
  onConfirm,
  onBack
}) => {
  const [activeTab, setActiveTab] = useState<"grid" | "stats">("grid");
  const soundSystemRef = useRef(new ProceduralSoundSystem());

  const handleOpossumClick = (op: OpossumCharacter) => {
    triggerHapticFeedback(12);
    // Mandatory Rule: Do NOT call speakWords on item click
    onSelectOpossum(op);
  };

  const handlePlayVoice = (e: React.MouseEvent, op: OpossumCharacter) => {
    e.stopPropagation();
    triggerHapticFeedback([10, 20]);
    soundSystemRef.current.playOpossumChatter(op.gender?.toLowerCase() === "male", op.id, op.playChatter);
  };

  const riderHeight = calculateMaxRiderHeight(selectedOpossum);

  return (
    <div
      id="Mobile_Portrait_Opossum_Selection_Screen"
      className="fixed inset-0 w-full h-full bg-zinc-950 text-green-400 font-sans flex flex-col justify-between overflow-hidden z-50 "
    >
      {/* Top Header */}
      <header className="w-full px-3 py-2.5 bg-zinc-900/90 border-b border-green-900/80 flex items-center justify-between font-mono text-xs">
        <button
          type="button"
          id="Mobile_Opossum_Select_Back_Button"
          onClick={() => {
            triggerHapticFeedback(15);
            onBack();
          }}
          className="flex items-center gap-1.5 px-3 py-2 rounded bg-zinc-800 border border-green-700/60 text-green-300 active:bg-green-800 active:text-white transition-all font-semibold touch-manipulation min-h-[44px]"
          aria-label="Go Back"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="uppercase tracking-wider">Back</span>
        </button>

        <div className="text-center">
          <h1 className="text-sm font-bold text-white uppercase tracking-wider">Choose Opossum</h1>
          <p className="text-[10px] text-green-400 font-mono">Mobile Touch Grid</p>
        </div>

        <button
          type="button"
          onClick={() => {
            triggerHapticFeedback(10);
            setActiveTab(activeTab === "grid" ? "stats" : "grid");
          }}
          className="px-2.5 py-1.5 rounded bg-zinc-800 border border-green-800 text-green-300 active:bg-green-700 active:text-white transition-all text-[11px] font-mono touch-manipulation min-h-[44px] min-w-[44px]"
          aria-label="Toggle View Mode"
        >
          {activeTab === "grid" ? "Info" : "Grid"}
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full overflow-y-auto p-3 space-y-3" role="main">
        {activeTab === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pb-2">
            {opossums.map((op) => {
              const isSelected = op.id === selectedOpossum.id;
              const palette = op.gender === "Female" ? OPOSSUM_PALETTES.JILL : OPOSSUM_PALETTES.JACK;
              return (
                <div
                  key={op.id}
                  id={`Mobile_Opossum_Card_${op.id}`}
                  onClick={() => handleOpossumClick(op)}
                  className={`p-3 rounded-lg border-2 transition-all flex items-center justify-between cursor-pointer touch-manipulation min-h-[58px] ${
                    isSelected
                      ? "bg-green-950/80 border-green-400 text-white shadow-lg ring-2 ring-green-500/40"
                      : "bg-zinc-900/80 border-zinc-800 text-zinc-300 active:bg-zinc-800"
                  }`}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSelected}
                  aria-label={`${op.name}, gender ${op.gender}, ${op.color} fur, ${op.eyeColor} eyes`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm font-mono border"
                      style={{
                        backgroundColor: palette.hex,
                        borderColor: isSelected ? "#4ade80" : "#3f3f46",
                        color: "#ffffff"
                      }}
                    >
                      {op.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-green-200 flex items-center gap-1.5">
                        {op.name}
                        {isSelected && <Sparkles className="w-3.5 h-3.5 text-yellow-400" />}
                      </div>
                      <div className="text-[11px] text-zinc-400 font-mono">
                        {op.gender} • {op.width}" W × {op.length}" L
                      </div>
                    </div>
                  </div>

                  {/* Local Web Audio Vocal Preview Button */}
                  <button
                    type="button"
                    onClick={(e) => handlePlayVoice(e, op)}
                    className="p-2.5 rounded-full bg-zinc-800/90 active:bg-green-700 text-green-400 active:text-white border border-green-700/60 touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
                    aria-label={`Listen to ${op.name}'s voice chatter`}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          /* Detailed Specs View */
          <div className="bg-zinc-900 p-4 rounded-lg border border-green-800 font-mono text-xs space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
              <h2 className="text-base font-bold text-green-300">{selectedOpossum.name}</h2>
              <span className="text-[11px] px-2 py-0.5 rounded bg-green-950 text-green-400 border border-green-700">
                {selectedOpossum.gender}
              </span>
            </div>

            <p className="text-zinc-300 leading-relaxed text-[12px]">{selectedOpossum.description}</p>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-800 text-[11px]">
              <div>
                <span className="text-zinc-500">Fur / Eyes:</span>
                <p className="text-green-300 font-semibold">{selectedOpossum.color} / {selectedOpossum.eyeColor}</p>
              </div>
              <div>
                <span className="text-zinc-500">Physical Size:</span>
                <p className="text-green-300 font-semibold">
                  {selectedOpossum.width}" W × {selectedOpossum.length}" L ({selectedOpossum.shoulderHeight})
                </p>
              </div>
              <div>
                <span className="text-zinc-500">Shoulder Height:</span>
                <p className="text-green-300 font-semibold">{selectedOpossum.shoulderHeight}</p>
              </div>
              <div>
                <span className="text-zinc-500">Max Rider Height:</span>
                <p className="text-green-300 font-semibold">{riderHeight.feet}' {riderHeight.inches}"</p>
              </div>
            </div>

            <button
              type="button"
              onClick={(e) => handlePlayVoice(e, selectedOpossum)}
              className="w-full py-2.5 px-3 rounded bg-zinc-800 active:bg-green-800 border border-green-700 text-green-300 flex items-center justify-center gap-2 font-bold touch-manipulation min-h-[44px]"
            >
              <Volume2 className="w-4 h-4" />
              <span>Preview Mathematical Chatter</span>
            </button>
          </div>
        )}
      </main>

      {/* Bottom Sticky Action Bar */}
      <footer className="w-full p-3 bg-zinc-900/95 border-t border-green-900/80">
        <button
          type="button"
          id="Mobile_Opossum_Confirm_Ride_Button"
          onClick={() => {
            triggerHapticFeedback([20, 50]);
            onConfirm();
          }}
          className="w-full py-3.5 px-4 rounded-lg bg-green-600 active:bg-green-500 text-black font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.98] touch-manipulation min-h-[48px]"
        >
          <Play className="w-5 h-5 fill-current" />
          <span>Ride with {selectedOpossum.name}</span>
        </button>
      </footer>
    </div>
  );
};
