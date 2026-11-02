/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Keyboard, X, VolumeX, Shield, Command } from "lucide-react";
import { KeyboardLayoutType } from "../../../../types";
import {
  KEYBOARD_MODAL_METADATA,
  CEDELLA_COMMANDS_DATA,
  ARDEN_DENIS_COMMANDS_DATA,
  KeyboardCommandCategory
} from "./General";

export * from "./General";

export interface KeyboardCommandsModalProps {
  onClose: () => void;
  activeLayout?: KeyboardLayoutType;
  onLayoutSelect?: (layout: KeyboardLayoutType) => void;
}

export const KeyboardCommandsModal: React.FC<KeyboardCommandsModalProps> = ({
  onClose,
  activeLayout = KeyboardLayoutType.CEDELLA,
  onLayoutSelect
}) => {
  const [selectedLayout, setSelectedLayout] = useState<KeyboardLayoutType>(activeLayout);

  const handleSelectLayout = (layout: KeyboardLayoutType) => {
    setSelectedLayout(layout);
    if (onLayoutSelect) {
      onLayoutSelect(layout);
    }
  };

  const activeData: KeyboardCommandCategory[] =
    selectedLayout === KeyboardLayoutType.CEDELLA ? CEDELLA_COMMANDS_DATA : ARDEN_DENIS_COMMANDS_DATA;

  return (
    <div
      className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="keyboard_modal_title"
    >
      <div className="bg-zinc-950 border-2 border-emerald-500/90 max-w-3xl w-full max-h-[90vh] flex flex-col rounded-xl font-mono text-emerald-300 shadow-[0_0_35px_rgba(16,185,129,0.3)] overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-emerald-900/60 bg-gradient-to-r from-emerald-950/60 via-zinc-950 to-emerald-950/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-emerald-950 border border-emerald-700/60 text-emerald-400">
              <Keyboard className="w-6 h-6" />
            </div>
            <div>
              <h2
                id="keyboard_modal_title"
                className="text-lg md:text-xl font-black uppercase tracking-wider text-emerald-200 flex items-center gap-2"
              >
                {KEYBOARD_MODAL_METADATA.title}
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  v{KEYBOARD_MODAL_METADATA.version}
                </span>
              </h2>
              <p className="text-xs text-emerald-400/90 font-sans">
                {KEYBOARD_MODAL_METADATA.subtitle}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg bg-zinc-900 border border-emerald-800 text-emerald-400 hover:text-white hover:bg-emerald-950 transition active:scale-95 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close Keyboard Commands Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Layout Switcher Tabs */}
        <div className="flex border-b border-emerald-900/60 bg-zinc-900/80 p-2 gap-2">
          <button
            type="button"
            onClick={() => handleSelectLayout(KeyboardLayoutType.CEDELLA)}
            className={`flex-1 py-2.5 px-4 rounded-lg font-bold text-xs uppercase tracking-wider transition min-h-[44px] flex items-center justify-center gap-2 border ${
              selectedLayout === KeyboardLayoutType.CEDELLA
                ? "bg-emerald-600 text-black border-emerald-400 font-extrabold shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                : "bg-zinc-950 text-emerald-400 border-emerald-900/60 hover:bg-emerald-950/40"
            }`}
          >
            <Command className="w-4 h-4" />
            Cedella Layout (Arrow Keys)
          </button>
          <button
            type="button"
            onClick={() => handleSelectLayout(KeyboardLayoutType.ARDEN_DENIS)}
            className={`flex-1 py-2.5 px-4 rounded-lg font-bold text-xs uppercase tracking-wider transition min-h-[44px] flex items-center justify-center gap-2 border ${
              selectedLayout === KeyboardLayoutType.ARDEN_DENIS
                ? "bg-emerald-600 text-black border-emerald-400 font-extrabold shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                : "bg-zinc-950 text-emerald-400 border-emerald-900/60 hover:bg-emerald-950/40"
            }`}
          >
            <Shield className="w-4 h-4" />
            Arden Denis Layout (WASD + 'L')
          </button>
        </div>

        {/* Banner Note */}
        <div className="bg-emerald-950/40 border-b border-emerald-900/40 px-5 py-2.5 text-xs text-emerald-300 flex items-center gap-2">
          <VolumeX className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            <strong>Global Speech Stop:</strong> Pressing the <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-emerald-600 text-emerald-200 font-bold">Ctrl</kbd> key anywhere immediately cancels active speech.
          </span>
        </div>

        {/* Modal Content / Commands Grid */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1 max-h-[58vh] scrollbar-thin scrollbar-thumb-emerald-800">
          {activeData.map((cat, idx) => (
            <div key={idx} className="space-y-3">
              <h3 className="text-xs font-black uppercase tracking-widest text-emerald-400/90 border-b border-emerald-900/40 pb-1 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                {cat.category}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {cat.commands.map((cmd, cIdx) => (
                  <div
                    key={cIdx}
                    className="p-3 rounded-lg bg-zinc-900/90 border border-emerald-900/60 flex items-start justify-between gap-3 hover:border-emerald-500/50 transition"
                  >
                    <div>
                      <div className="text-xs font-bold text-emerald-200">{cmd.description}</div>
                      {cmd.notes && (
                        <div className="text-[11px] text-emerald-400/80 mt-0.5 font-sans">{cmd.notes}</div>
                      )}
                    </div>
                    <kbd className="px-2 py-1 rounded bg-black border border-emerald-500/60 text-emerald-300 font-mono text-xs font-bold whitespace-nowrap shadow-inner shrink-0">
                      {cmd.key}
                    </kbd>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-emerald-900/60 bg-zinc-950 flex items-center justify-between">
          <div className="text-xs text-emerald-400/80 font-sans">
            Active Layout: <strong className="text-emerald-200 uppercase font-mono">{selectedLayout}</strong>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-black font-extrabold uppercase tracking-wider text-xs transition active:scale-95 min-h-[44px]"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
