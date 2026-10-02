/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { OpossumCharacter, RiderCharacter, GameLevel } from "../../../../types";
import { LeafBezelOrnament } from "./General";
import { speakWords } from "../../../Sound/TTS";

export interface PortraitOrientation4TabletsProps {
  selectedOpossum: OpossumCharacter;
  defaultRider: RiderCharacter;
  onExitGame: () => void;
  currentLevelId: number;
  currentLevel: GameLevel;
  playerZ: number;
  score: number;
  ticksEaten: number;
  Measured_Distance_Value: (meters: number) => string;
  getEdibleItemName: (levelId: number) => string;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  isPlaying: boolean;
  onTogglePlayPause: () => void;
  onOpenMenu: () => void;
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onJump: () => void;
  onMoveUpStart?: () => void;
  onMoveUpEnd?: () => void;
  onMoveDownStart?: () => void;
  onMoveDownEnd?: () => void;
  onSetCruiseLowStop?: () => void;
  onSetCruiseHigh?: () => void;
}

export const PortraitOrientation4Tablets: React.FC<PortraitOrientation4TabletsProps> = ({
  selectedOpossum,
  defaultRider,
  onExitGame,
  currentLevelId,
  currentLevel,
  playerZ,
  score,
  ticksEaten,
  Measured_Distance_Value,
  getEdibleItemName,
  canvasRef,
  isPlaying,
  onTogglePlayPause,
  onOpenMenu,
  onMoveLeft,
  onMoveRight,
  onJump,
  onMoveUpStart,
  onMoveUpEnd,
  onMoveDownStart,
  onMoveDownEnd,
  onSetCruiseLowStop,
  onSetCruiseHigh
}) => {
  const [hasPhysicalKeyboard, setHasPhysicalKeyboard] = useState<boolean>(false);
  const [manualShowTouchControls, setManualShowTouchControls] = useState<boolean>(true);
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);

  // Detect physical keyboard connection / keystrokes
  useEffect(() => {
    const handleKeyDown = () => {
      // If player starts typing or using physical keys, hide the touch controller
      if (!hasPhysicalKeyboard) {
        setHasPhysicalKeyboard(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hasPhysicalKeyboard]);

  const showTouchControls = !hasPhysicalKeyboard && manualShowTouchControls;

  const handleCanvasTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      const rect = e.currentTarget.getBoundingClientRect();
      const relativeY = touch.clientY - rect.top;
      const relativeHeight = rect.height;

      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        time: Date.now()
      };

      // Upper half tap/hold drives acceleration, lower half drives brake
      if (relativeY < relativeHeight * 0.45) {
        onMoveUpStart?.();
      } else if (relativeY > relativeHeight * 0.75) {
        onMoveDownStart?.();
      }
    }
  };

  const handleCanvasTouchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
    onMoveUpEnd?.();
    onMoveDownEnd?.();

    if (!touchStartRef.current || e.changedTouches.length === 0) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartRef.current.x;
    const dy = touch.clientY - touchStartRef.current.y;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);

    touchStartRef.current = null;

    if (absY > 35 && dy < -25 && absY > absX) {
      // Swipe Up -> Jump
      onJump();
    } else if (absX > 30 && absX > absY) {
      // Horizontal swipe
      if (dx > 0) {
        onMoveRight();
      } else {
        onMoveLeft();
      }
    } else if (absX < 25 && absY < 25) {
      // Tap on left vs right side
      const rect = e.currentTarget.getBoundingClientRect();
      const relativeX = touch.clientX - rect.left;
      if (relativeX < rect.width * 0.4) {
        onMoveLeft();
      } else if (relativeX > rect.width * 0.6) {
        onMoveRight();
      }
    }
  };

  return (
    <div
      id="Tablet_Portrait_Container"
      className="fixed inset-0 w-full h-full bg-stone-950 text-green-300 font-sans flex flex-col justify-between overflow-hidden select-none z-50"
    >
      {/* 1. Top Tablet Bar */}
      <div className="w-full bg-stone-900 border-b border-emerald-900/80 px-4 py-2 flex items-center justify-between z-20 shadow-md">
        <div className="flex items-center gap-3">
          <button
            id="tablet-btn-exit"
            onClick={onExitGame}
            className="px-3 py-1.5 min-h-[44px] bg-red-950 border border-red-700 text-red-300 text-xs font-mono font-bold rounded uppercase hover:bg-red-900 hover:text-white transition"
          >
            ← Exit Game
          </button>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold tracking-wide text-emerald-400 font-mono">
              Opossum Ride Adventure
            </span>
            <span className="text-[10px] bg-emerald-950/80 border border-emerald-800 text-emerald-300 px-2 py-0.5 rounded font-mono uppercase">
              Tablet Portrait
            </span>
          </div>
        </div>

        {/* Keyboard / Touch status indicator & toggle */}
        <div className="flex items-center gap-3">
          <button
            id="tablet-btn-toggle-touch"
            onClick={() => {
              setManualShowTouchControls((prev) => {
                const next = !prev;
                speakWords(next ? "Touch controller shown" : "Touch controller hidden for full screen touchscreen play");
                return next;
              });
            }}
            className="text-[11px] font-mono px-2.5 py-1 min-h-[44px] bg-stone-800 border border-stone-600 text-stone-300 rounded hover:text-white"
            aria-label={manualShowTouchControls ? "Hide touch buttons for full screen touch" : "Show touch buttons"}
          >
            {hasPhysicalKeyboard ? "⌨️ Keyboard Active" : "🎮 Touch Deck"}: {manualShowTouchControls ? "Hide Deck" : "Show Deck"}
          </button>

          {/* Quick HUD Telemetry pill */}
          <div className="hidden sm:flex items-center gap-3 text-xs font-mono bg-black/60 px-3 py-1 rounded border border-emerald-900/50">
            <span className="text-emerald-400">LVL {currentLevelId}</span>
            <span className="text-yellow-400">DIST: {Measured_Distance_Value(Math.round(playerZ))}</span>
            <span className="text-green-300">SCORE: {score}</span>
            <span className="text-amber-300">{getEdibleItemName(currentLevelId)}: {ticksEaten}</span>
          </div>
        </div>
      </div>

      {/* 2. Middle Viewing Area: 10% Left Bezel + Center Vertical Canvas + 10% Right Bezel */}
      <div className={`flex-1 w-full flex items-stretch justify-between relative overflow-hidden ${showTouchControls ? "max-h-[58vh]" : "h-full"}`}>
        {/* Left 10% Bezel with botanical leaves and Opossum motif */}
        <div
          id="Tablet_Left_Bezel"
          className="w-[10%] min-w-[36px] max-w-[70px] bg-stone-950 border-r border-emerald-900/70 flex flex-col items-center justify-between py-3 relative z-10"
        >
          <div className="text-[10px] font-mono text-emerald-600 font-bold uppercase tracking-widest [writing-mode:vertical-rl] rotate-180 opacity-60">
            {selectedOpossum.name}
          </div>
          <LeafBezelOrnament side="left" />
          <div className="w-4 h-4 rounded-full bg-emerald-900/60 border border-emerald-600 flex items-center justify-center text-[9px] text-emerald-300 font-mono">
            🌿
          </div>
        </div>

        {/* Center Vertical Screen Canvas Holder */}
        <div
          id="Tablet_Canvas_Holder"
          className="flex-1 h-full bg-black relative flex items-center justify-center overflow-hidden"
        >
          <canvas
            ref={canvasRef as any}
            tabIndex={0}
            width={840}
            height={400}
            className="w-full h-full object-contain bg-black touch-none"
            aria-label="Opossum Ride Adventure Game View"
            role="img"
            onTouchStart={handleCanvasTouchStart}
            onTouchEnd={handleCanvasTouchEnd}
            onTouchCancel={() => {
              onMoveUpEnd?.();
              onMoveDownEnd?.();
              touchStartRef.current = null;
            }}
          />

          {!isPlaying && (
            <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center border border-emerald-900 z-30">
              <p className="text-2xl md:text-3xl font-extrabold text-emerald-400 uppercase tracking-widest animate-pulse filter drop-shadow-[0_0_8px_rgba(0,250,0,0.4)]">
                Game Paused
              </p>
              <p className="text-xs text-emerald-600 mt-2 font-mono">
                Tap Resume at the bottom center to continue riding.
              </p>
            </div>
          )}
        </div>

        {/* Right 10% Bezel with botanical leaves and Rider motif */}
        <div
          id="Tablet_Right_Bezel"
          className="w-[10%] min-w-[36px] max-w-[70px] bg-stone-950 border-l border-emerald-900/70 flex flex-col items-center justify-between py-3 relative z-10"
        >
          <div className="text-[10px] font-mono text-emerald-600 font-bold uppercase tracking-widest [writing-mode:vertical-rl] opacity-60">
            {defaultRider.name}
          </div>
          <LeafBezelOrnament side="right" />
          <div className="w-4 h-4 rounded-full bg-emerald-900/60 border border-emerald-600 flex items-center justify-center text-[9px] text-emerald-300 font-mono">
            🌸
          </div>
        </div>
      </div>

      {/* 3. Bottom Controls Deck (Only visible when touch controls active) */}
      {showTouchControls && (
        <div
          id="Tablet_Bottom_Controls_Deck"
          className="w-full bg-stone-900/95 border-t-2 border-emerald-800/80 px-6 py-4 flex items-center justify-between relative shadow-2xl z-20"
        >
          {/* Decorative crafted opossum bar accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-800 via-amber-600 to-emerald-800 opacity-70" />

          {/* LEFT: Tactile Directional D-Pad */}
          <div className="flex flex-col items-center justify-center">
            <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider mb-1">
              Directional D-Pad
            </div>
            <div className="grid grid-cols-3 gap-1.5 w-36 h-36">
              <div />
              {/* Accelerate / Up */}
              <button
                id="tablet-dpad-up"
                onTouchStart={(e) => {
                  e.preventDefault();
                  onMoveUpStart?.();
                }}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  onMoveUpEnd?.();
                }}
                onMouseDown={() => onMoveUpStart?.()}
                onMouseUp={() => onMoveUpEnd?.()}
                className="bg-emerald-950/90 border-2 border-emerald-600 text-emerald-300 font-bold text-lg rounded-t-lg active:bg-emerald-700 flex items-center justify-center min-h-[44px] shadow-md"
                aria-label="Accelerate forward"
              >
                ▲
              </button>
              <div />

              {/* Steer Left */}
              <button
                id="tablet-dpad-left"
                onClick={() => onMoveLeft()}
                className="bg-emerald-950/90 border-2 border-emerald-600 text-emerald-300 font-bold text-lg rounded-l-lg active:bg-emerald-700 flex items-center justify-center min-h-[44px] shadow-md"
                aria-label="Steer left"
              >
                ◀
              </button>

              {/* Center D-Pad Hub */}
              <div className="bg-stone-950 border border-emerald-800/50 rounded flex items-center justify-center text-[10px] text-emerald-500 font-mono">
                🐾
              </div>

              {/* Steer Right */}
              <button
                id="tablet-dpad-right"
                onClick={() => onMoveRight()}
                className="bg-emerald-950/90 border-2 border-emerald-600 text-emerald-300 font-bold text-lg rounded-r-lg active:bg-emerald-700 flex items-center justify-center min-h-[44px] shadow-md"
                aria-label="Steer right"
              >
                ▶
              </button>

              <div />
              {/* Decelerate / Down */}
              <button
                id="tablet-dpad-down"
                onTouchStart={(e) => {
                  e.preventDefault();
                  onMoveDownStart?.();
                }}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  onMoveDownEnd?.();
                }}
                onMouseDown={() => onMoveDownStart?.()}
                onMouseUp={() => onMoveDownEnd?.()}
                className="bg-emerald-950/90 border-2 border-emerald-600 text-emerald-300 font-bold text-lg rounded-b-lg active:bg-emerald-700 flex items-center justify-center min-h-[44px] shadow-md"
                aria-label="Decelerate reverse"
              >
                ▼
              </button>
              <div />
            </div>
          </div>

          {/* CENTER: Menu Button & Pause / Resume Button Decorated with Crafted Opossum motifs */}
          <div className="flex flex-col items-center justify-center gap-3 px-4 border-x border-stone-800">
            {/* Crafted Opossum Ornament Banner */}
            <div className="flex items-center gap-2 bg-stone-950 px-3 py-1 rounded-full border border-emerald-900/60 shadow-inner">
              <span className="text-xs">🐹</span>
              <span className="text-[11px] font-mono text-emerald-400 font-bold tracking-wider uppercase">
                {selectedOpossum.name}
              </span>
              <span className="text-xs">🌿</span>
            </div>

            {/* Bottom Center Control Buttons */}
            <div className="flex items-center gap-3">
              {/* Pause / Resume Button */}
              <button
                id="tablet-btn-pause-resume"
                onClick={() => {
                  onTogglePlayPause();
                  speakWords(isPlaying ? "Game paused" : "Game resumed");
                }}
                className={`px-4 py-2 min-h-[44px] font-mono font-bold text-xs uppercase rounded-lg border-2 shadow-lg transition flex items-center gap-2 ${
                  isPlaying
                    ? "bg-amber-950/90 border-amber-500 text-amber-300 active:bg-amber-800"
                    : "bg-emerald-950/90 border-emerald-400 text-emerald-300 active:bg-emerald-800 animate-pulse"
                }`}
                aria-label={isPlaying ? "Pause riding" : "Resume riding"}
              >
                {isPlaying ? "⏸️ Pause" : "▶️ Resume"}
              </button>

              {/* Menu Button */}
              <button
                id="tablet-btn-menu"
                onClick={() => {
                  onOpenMenu();
                  speakWords("Opening Menu");
                }}
                className="px-4 py-2 min-h-[44px] font-mono font-bold text-xs uppercase rounded-lg border-2 bg-indigo-950/90 border-indigo-500 text-indigo-200 active:bg-indigo-800 shadow-lg transition flex items-center gap-2"
                aria-label="Open game menu"
              >
                ☰ Menu
              </button>
            </div>
          </div>

          {/* RIGHT: Action Buttons (Jump, Cruise Low/Stop, Cruise High) */}
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider mb-1">
              Action Controls
            </div>
            <div className="flex items-center gap-3">
              {/* Cruise Control Buttons */}
              <div className="flex flex-col gap-2">
                <button
                  id="tablet-btn-cruise-high"
                  onClick={() => onSetCruiseHigh?.()}
                  className="px-3 py-1.5 min-h-[44px] bg-amber-950/90 border border-amber-600 text-amber-300 text-[11px] font-mono font-bold uppercase rounded active:bg-amber-700 shadow-md"
                  aria-label="Cruise High speed"
                >
                  Cruise High ⚡
                </button>
                <button
                  id="tablet-btn-cruise-low"
                  onClick={() => onSetCruiseLowStop?.()}
                  className="px-3 py-1.5 min-h-[44px] bg-stone-950 border border-amber-800 text-amber-400 text-[11px] font-mono font-bold uppercase rounded active:bg-stone-800 shadow-md"
                  aria-label="Cruise Low or Stop"
                >
                  Cruise Low / Stop 🛑
                </button>
              </div>

              {/* Prominent Jump Button */}
              <button
                id="tablet-btn-jump"
                onClick={() => onJump()}
                className="w-20 h-20 min-h-[44px] bg-gradient-to-br from-emerald-600 to-emerald-900 border-2 border-emerald-400 text-white font-extrabold text-sm uppercase rounded-2xl active:scale-95 shadow-xl flex flex-col items-center justify-center gap-1 transition-transform"
                aria-label="Jump opossum"
              >
                <span className="text-xl">🦘</span>
                <span>JUMP</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
