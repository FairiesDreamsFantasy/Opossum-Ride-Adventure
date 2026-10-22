/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Smartphone, Sparkles, X, ArrowLeft, ArrowRight, ArrowUp, RefreshCw } from "lucide-react";
import { TOUCHSCREEN_COMMANDS_DATA, TOUCHSCREEN_MODAL_METADATA } from "./General";
import { triggerHapticFeedback } from "../../../Keyboards_and_Controllers/Touchscreen/General";

export * from "./General";

export interface TouchscreenCommandsModalProps {
  onClose: () => void;
}

export const TouchscreenCommandsModal: React.FC<TouchscreenCommandsModalProps> = ({ onClose }) => {
  const handleClose = () => {
    triggerHapticFeedback(15);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="touchscreen_modal_title"
    >
      <div className="bg-zinc-950 border-2 border-emerald-500/90 max-w-2xl w-full max-h-[90vh] flex flex-col rounded-xl font-mono text-emerald-300 shadow-[0_0_35px_rgba(16,185,129,0.3)] overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-emerald-900/60 bg-gradient-to-r from-emerald-950/60 via-zinc-950 to-emerald-950/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-emerald-950 border border-emerald-700/60 text-emerald-400">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h2
                id="touchscreen_modal_title"
                className="text-lg md:text-xl font-black uppercase tracking-wider text-emerald-200 flex items-center gap-2"
              >
                {TOUCHSCREEN_MODAL_METADATA.title}
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  Mobile
                </span>
              </h2>
              <p className="text-xs text-emerald-400/90 font-sans">
                {TOUCHSCREEN_MODAL_METADATA.subtitle}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-2 rounded-lg bg-zinc-900 border border-emerald-800 text-emerald-400 hover:text-white hover:bg-emerald-950 transition active:scale-95 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close Touchscreen Commands Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-6 text-xs text-left">
          {/* Handheld Vertical Guidance Card */}
          <div className="bg-emerald-950/30 border border-emerald-700/50 rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2 text-emerald-200 font-bold uppercase text-xs">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Vertical Phone Play System</span>
            </div>
            <p className="text-emerald-300/90 font-sans leading-relaxed">
              {TOUCHSCREEN_MODAL_METADATA.orientationNotice} {TOUCHSCREEN_MODAL_METADATA.hapticNotice}
            </p>
          </div>

          {/* Touch Command Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {TOUCHSCREEN_COMMANDS_DATA.map((item) => (
              <div
                key={item.id}
                className="bg-black/60 border border-emerald-900/80 rounded-lg p-3.5 flex flex-col justify-between space-y-2 hover:border-emerald-500/60 transition"
              >
                <div>
                  <div className="text-[11px] font-black text-emerald-300 uppercase tracking-wide flex items-center justify-between">
                    <span>{item.action}</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-900/50 text-emerald-200">
                      {item.category}
                    </span>
                  </div>
                  <div className="mt-1 font-bold text-white bg-emerald-950/50 px-2 py-1 rounded border border-emerald-800/40 text-xs">
                    {item.gesture}
                  </div>
                  <p className="mt-2 text-[11px] font-sans text-emerald-400/90 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Screen Reader reminder */}
          <div className="p-3 bg-zinc-900/60 border border-emerald-900/40 rounded text-center text-[11px] text-emerald-400 font-sans">
            Screen reader announcements: Press <kbd className="bg-emerald-900/40 px-1.5 py-0.5 border border-emerald-700 rounded text-white font-mono font-bold">Control (Ctrl)</kbd> anytime to immediately silence speech.
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-emerald-900/60 bg-zinc-950 flex justify-center">
          <button
            type="button"
            onClick={handleClose}
            className="cursor-pointer bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold uppercase px-8 py-2.5 rounded-lg shadow-[0_0_20px_rgba(16,185,129,0.4)] tracking-wider active:scale-95 transition min-h-[44px]"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
