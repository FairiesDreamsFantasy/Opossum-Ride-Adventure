/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from "react";
import { GameBoot, BootProgress, BootPhase } from "../../Index/Game_Boot";

interface BootingScreenProps {
  onBootComplete: () => void;
}

export const BootingScreen: React.FC<BootingScreenProps> = ({ onBootComplete }) => {
  const [progress, setProgress] = useState<BootProgress>(GameBoot.getProgress());
  const [logs, setLogs] = useState<string[]>([]);
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Scientific timestamp helper
  const getTimestamp = () => {
    const now = new Date();
    return now.toTimeString().split(" ")[0];
  };

  useEffect(() => {
    // Subscribe to the ultra-scientific GameBoot system
    const unsubscribe = GameBoot.subscribe((newProgress) => {
      setProgress(newProgress);
      
      // Generate scientific/mathematical logs depending on phase changes
      let logMessage = "";
      const timeStr = getTimestamp();

      switch (newProgress.phase) {
        case BootPhase.VALIDATION:
          logMessage = `[${timeStr}] VALIDATION_MATRIX: Initiating system checks. Compliance: 1.0`;
          break;
        case BootPhase.ORCHESTRATION:
          logMessage = `[${timeStr}] ORCHESTRATOR: Sequences initialized (HARDWARE -> SOUND_SYNTH -> VISUAL_ENGINE -> AI_CONTEXT)`;
          break;
        case BootPhase.RESOLVING:
          logMessage = `[${timeStr}] SEQUENCE_RESOLVER: Seed computed. Stability: ${newProgress.completionPercentage.toFixed(3)}`;
          break;
        case BootPhase.ACTIVE:
          logMessage = `[${timeStr}] GAME_ENGINE: Active. Master heartbeat loop starting at 60Hz.`;
          break;
        case BootPhase.FAILURE:
          logMessage = `[${timeStr}] CRITICAL_FAILURE: Mathematical stasis breached. Stability threshold unmet.`;
          break;
      }

      if (logMessage) {
        setLogs((prev) => [...prev, logMessage]);
      }
    });

    // Start the boot sequence automatically on mount
    GameBoot.initiate().then((success) => {
      if (success) {
        // Soft handoff delay for scientific aesthetic satisfaction
        setTimeout(() => {
          onBootComplete();
        }, 800);
      }
    });

    // Seed some initial logs for aesthetic and scientific realism
    const timeStr = getTimestamp();
    setLogs([
      `[${timeStr}] STASIS: System initialization vectors loading...`,
      `[${timeStr}] STASIS: Verifying broad protection standards...`
    ]);

    return () => {
      unsubscribe();
    };
  }, [onBootComplete]);

  // Scroll terminal logs to bottom automatically
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // Mathematically calculate block segments for the segmented progress bar (20 blocks total)
  const totalBlocks = 20;
  const activeBlocks = Math.round(progress.completionPercentage * totalBlocks);
  const percentageStr = Math.round(progress.completionPercentage * 100);

  return (
    <div className="min-h-screen bg-zinc-950 text-green-400 font-mono flex flex-col justify-between p-6 md:p-12 relative overflow-hidden select-none">
      {/* Subtle math coordinate grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: "radial-gradient(#22c55e 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }}
      />

      {/* Top Header: System Status & Meta */}
      <div className="flex justify-between items-center w-full max-w-7xl mx-auto border-b border-green-950 pb-4 z-10">
        <span className="text-xs uppercase tracking-widest text-green-700 font-bold">
          System: Opossum-Core-v1.5
        </span>
        <span className="text-xs uppercase tracking-widest text-green-700 font-bold">
          Stability: 99.9% (Perfect Stasis)
        </span>
      </div>

      {/* Center Section: Main Initialization Readout */}
      <div className="flex flex-col items-center justify-center max-w-xl mx-auto w-full z-10 py-12">
        <h2 className="text-sm md:text-md uppercase tracking-[0.25em] text-green-200 text-center font-bold mb-1">
          PREPARING OPOSSUM RIDE ADVENTURE
        </h2>
        <div className="text-[10px] uppercase tracking-widest text-green-600 mb-8 font-semibold animate-pulse">
          [ SYSTEM INITIALIZATION VECTORS ONLINE ]
        </div>

        {/* Mathematically Segmented Progress Bar */}
        <div className="w-full bg-zinc-900 border border-green-900/40 p-1.5 rounded mb-3 flex items-center shadow-[0_0_20px_rgba(34,197,94,0.05)]">
          <div className="flex gap-0.5 w-full">
            {Array.from({ length: totalBlocks }).map((_, index) => {
              const isActive = index < activeBlocks;
              return (
                <div
                  key={index}
                  className={`h-6 flex-1 transition-all duration-300 ${
                    isActive 
                      ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" 
                      : "bg-zinc-950 border border-zinc-900"
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* Underbar Progress Metrics */}
        <div className="flex justify-between w-full text-[11px] font-bold tracking-wider text-green-600 px-1">
          <span className="uppercase">{progress.activeModule}</span>
          <span>{percentageStr}% STABLE</span>
        </div>
      </div>

      {/* Bottom Section: Live Telemetry terminal window */}
      <div className="w-full max-w-4xl mx-auto bg-black/80 border border-green-950 rounded p-4 h-36 flex flex-col justify-between z-10 shadow-[inset_0_0_15px_rgba(0,0,0,0.9)]">
        <div className="overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-green-950 flex-1 space-y-1">
          {logs.map((log, index) => (
            <div key={index} className="text-[10px] md:text-xs leading-relaxed text-green-500 font-mono tracking-wide">
              {log}
            </div>
          ))}
          <div ref={logsEndRef} />
        </div>
        <div className="border-t border-green-950/40 pt-2 mt-2 flex justify-between items-center text-[10px] text-green-800">
          <span>LOG_STREAM_ACTIVE</span>
          <span>SYSTEM_OK</span>
        </div>
      </div>
    </div>
  );
};
