/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { OpossumCharacter, RiderCharacter, GameLevel } from "../../../../types";
import {
  MobileLayoutStyleType,
  MOBILE_LAYOUT_STYLES,
  getNextMobileLayout,
  CRAFTED_RASTAFARI_THEME
} from "./General";
import { MobilePlayAreaMain } from "./Main";
import { MobileMenuBar } from "./Main/Menu_Bar";
import { MobileHUD } from "./Main/HUD";
import { MobileGameView } from "./Main/Game_View";
import { MobileGameView2 } from "./Main/Game_View_2";
import { VerticalTouchController } from "../../../Keyboards_and_Controllers/Touchscreen/Vertical";
import { isSpeechEnabled, setSpeechEnabled, speakWords } from "../../../Sound/TTS";

export interface MobilePortrait4PhoneProps {
  selectedOpossum: OpossumCharacter;
  defaultRider: RiderCharacter;
  onExitGame: () => void;
  currentLevelId: number;
  currentLevel: GameLevel;
  playerZ: number;
  score: number;
  ticksEaten: number;
  Measured_Distance_Value: (meters: number) => string;
  Measured_Speed_Value: (ms: number) => string;
  speed: number;
  isPlaying: boolean;
  onTogglePlayPause: () => void;
  getEdibleItemName: (levelId: number) => string;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
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

export const MobilePortrait4Phone: React.FC<MobilePortrait4PhoneProps> = ({
  selectedOpossum,
  defaultRider,
  onExitGame,
  currentLevelId,
  currentLevel,
  playerZ,
  score,
  ticksEaten,
  Measured_Distance_Value,
  Measured_Speed_Value,
  speed,
  isPlaying,
  onTogglePlayPause,
  getEdibleItemName,
  canvasRef,
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
  const [activeLayout, setActiveLayout] = useState<MobileLayoutStyleType>("retro-vertical");
  const [ttsEnabled, setTtsEnabled] = useState<boolean>(isSpeechEnabled());
  const [showTouchDecks, setShowTouchDecks] = useState<boolean>(true);
  const canvasRef2 = useRef<HTMLCanvasElement | null>(null);

  // Synchronize secondary canvas drawing if in dual view mode
  useEffect(() => {
    if (activeLayout === "retro-vertical") return;

    let animId: number;
    const syncCanvases = () => {
      const primaryCanvas = canvasRef.current;
      const secondaryCanvas = canvasRef2.current;
      if (primaryCanvas && secondaryCanvas && primaryCanvas.width > 0 && primaryCanvas.height > 0) {
        const ctx2 = secondaryCanvas.getContext("2d");
        if (ctx2) {
          if (secondaryCanvas.width !== primaryCanvas.width || secondaryCanvas.height !== primaryCanvas.height) {
            secondaryCanvas.width = primaryCanvas.width;
            secondaryCanvas.height = primaryCanvas.height;
          }
          try {
            ctx2.drawImage(primaryCanvas, 0, 0);
          } catch {
            // Guard against unready frame drawing on mobile canvas contexts
          }
        }
      }
      animId = requestAnimationFrame(syncCanvases);
    };

    animId = requestAnimationFrame(syncCanvases);
    return () => cancelAnimationFrame(animId);
  }, [activeLayout, canvasRef]);

  const handleToggleLayout = () => {
    setActiveLayout((prev) => getNextMobileLayout(prev));
  };

  const handleToggleTTS = () => {
    const next = !ttsEnabled;
    setSpeechEnabled(next);
    setTtsEnabled(next);
  };

  const handleToggleControlsDeck = () => {
    setShowTouchDecks((prev) => {
      const next = !prev;
      speakWords(next ? "Onscreen controls enabled" : "Onscreen controls hidden for full touchscreen play");
      return next;
    });
  };

  return (
    <div
      id="Mobile_Portrait_Container"
      className="fixed inset-0 w-full h-full max-h-screen bg-black text-green-400 font-sans flex flex-col justify-between overflow-hidden  z-50"
    >
      {/* 1. Mobile Menu Bar with Return to Landing Page button on left, Pause/Resume, layout toggle & deck visibility */}
      <MobileMenuBar
        onExitGame={onExitGame}
        activeLayout={activeLayout}
        onToggleLayout={handleToggleLayout}
        ttsEnabled={ttsEnabled}
        onToggleTTS={handleToggleTTS}
        isPlaying={isPlaying}
        onTogglePlayPause={onTogglePlayPause}
        showTouchDecks={showTouchDecks}
        onToggleControlsDeck={handleToggleControlsDeck}
      />

      {/* 2. Mobile HUD */}
      <MobileHUD
        currentLevelId={currentLevelId}
        currentLevel={currentLevel}
        playerZ={playerZ}
        score={score}
        ticksEaten={ticksEaten}
        Measured_Distance_Value={Measured_Distance_Value}
        getEdibleItemName={getEdibleItemName}
      />

      {/* 3. Dynamic Screen Rendering depending on chosen layout */}
      <MobilePlayAreaMain className="flex-1 w-full h-full overflow-hidden relative">
        {/* Style A: Retro Vertical Screen (Full Bleed Tate Mode) */}
        {activeLayout === "retro-vertical" && (
          <div className="relative w-full h-full flex flex-col overflow-hidden">
            <MobileGameView
              canvasRef={canvasRef}
              className="absolute inset-0 z-0"
              onMoveLeft={onMoveLeft}
              onMoveRight={onMoveRight}
              onJump={onJump}
              onMoveUpStart={onMoveUpStart}
              onMoveUpEnd={onMoveUpEnd}
              onMoveDownStart={onMoveDownStart}
              onMoveDownEnd={onMoveDownEnd}
            />
            {showTouchDecks && (
              <div className="relative z-10 w-full h-full flex flex-col justify-end pointer-events-none pb-2">
                <VerticalTouchController
                  onMoveLeft={onMoveLeft}
                  onMoveRight={onMoveRight}
                  onJump={onJump}
                  onMoveUpStart={onMoveUpStart}
                  onMoveUpEnd={onMoveUpEnd}
                  onMoveDownStart={onMoveDownStart}
                  onMoveDownEnd={onMoveDownEnd}
                  onSetCruiseLowStop={onSetCruiseLowStop}
                  onSetCruiseHigh={onSetCruiseHigh}
                  className="pointer-events-auto"
                />
              </div>
            )}
          </div>
        )}

        {/* Style B: Picture Window (Fused Sky & Horizon Panoramas) */}
        {activeLayout === "picture-window" && (
          <div className="relative w-full h-full flex flex-col bg-zinc-950 overflow-hidden">
            {/* Upper Viewport (Sky Vault) */}
            <div className="h-[38%] w-full relative border-b-2 border-green-700/80 overflow-hidden flex-shrink-0">
              <div className="absolute top-1 left-2 z-10 text-[9px] font-mono text-amber-400 uppercase tracking-widest bg-black/60 px-1.5 py-0.5 rounded">
                Sky Vault
              </div>
              <MobileGameView2 canvasRef={canvasRef2} className="h-full" />
            </div>

            {/* Lower Viewport (Horizon & Track) */}
            <div className="flex-1 w-full relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-1 left-2 z-10 text-[9px] font-mono text-green-400 uppercase tracking-widest bg-black/60 px-1.5 py-0.5 rounded">
                Track Level
              </div>
              <MobileGameView
                canvasRef={canvasRef}
                className="absolute inset-0 z-0"
                onMoveLeft={onMoveLeft}
                onMoveRight={onMoveRight}
                onJump={onJump}
                onMoveUpStart={onMoveUpStart}
                onMoveUpEnd={onMoveUpEnd}
                onMoveDownStart={onMoveDownStart}
                onMoveDownEnd={onMoveDownEnd}
              />
              {showTouchDecks && (
                <div className="relative z-10 w-full h-full flex flex-col justify-end pointer-events-none pb-1">
                  <VerticalTouchController
                    onMoveLeft={onMoveLeft}
                    onMoveRight={onMoveRight}
                    onJump={onJump}
                    onMoveUpStart={onMoveUpStart}
                    onMoveUpEnd={onMoveUpEnd}
                    onMoveDownStart={onMoveDownStart}
                    onMoveDownEnd={onMoveDownEnd}
                    onSetCruiseLowStop={onSetCruiseLowStop}
                    onSetCruiseHigh={onSetCruiseHigh}
                    className="pointer-events-auto"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Style C: Double Screen (Crafted Black-owned Handheld with Rastafari Red, Gold, Green) */}
        {activeLayout === "double-screen" && (
          <div className="relative w-full h-full flex flex-col p-2 bg-stone-950 justify-between overflow-hidden">
            {/* Top Screen: High Precision Live Game Canvas */}
            <div className="w-full h-[46%] rounded-lg border-2 border-green-800 bg-black overflow-hidden relative shadow-lg flex-shrink-0">
              <div className="absolute top-1 right-2 z-10 flex items-center gap-1 bg-black/70 px-1.5 py-0.5 rounded text-[9px] font-mono text-green-300">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span>UPPER DISP</span>
              </div>
              <MobileGameView
                canvasRef={canvasRef}
                className="h-full"
                onMoveLeft={onMoveLeft}
                onMoveRight={onMoveRight}
                onJump={onJump}
                onMoveUpStart={onMoveUpStart}
                onMoveUpEnd={onMoveUpEnd}
                onMoveDownStart={onMoveDownStart}
                onMoveDownEnd={onMoveDownEnd}
              />
            </div>

            {/* Middle Console Hinge with Rastafari Tricolor Bars */}
            <div className="w-full py-1 flex items-center justify-between px-2 bg-stone-900 border-y border-stone-800 my-1 rounded-sm flex-shrink-0">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-600 shadow-sm" title="Rastafari Red" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 shadow-sm" title="Rastafari Gold" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-600 shadow-sm" title="Rastafari Green" />
              </div>
              <div className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider">
                Crafted Handheld Deck
              </div>
              <div className="text-[9px] font-mono text-green-500 font-semibold">
                {selectedOpossum.name}
              </div>
            </div>

            {/* Bottom Touch Deck with Telemetry & Controls */}
            <div className="w-full h-[46%] rounded-lg border-2 border-stone-700 bg-stone-900/95 flex flex-col justify-between p-2 shadow-inner overflow-hidden">
              {/* Real-Time Telemetry Strip */}
              <div className="flex items-center justify-between text-[10px] font-mono text-green-400 bg-black/80 px-2.5 py-1 rounded border border-green-900/60 flex-shrink-0">
                <span>RIDER: {defaultRider.name}</span>
                <span>SPEED: {Measured_Speed_Value(Math.abs(speed))}</span>
                <span className="text-yellow-400">SCORE: {score}</span>
              </div>

              {/* Lower Touch Controls */}
              <div className="flex-1 flex items-center justify-center overflow-hidden">
                <VerticalTouchController
                  onMoveLeft={onMoveLeft}
                  onMoveRight={onMoveRight}
                  onJump={onJump}
                  onMoveUpStart={onMoveUpStart}
                  onMoveUpEnd={onMoveUpEnd}
                  onMoveDownStart={onMoveDownStart}
                  onMoveDownEnd={onMoveDownEnd}
                  onSetCruiseLowStop={onSetCruiseLowStop}
                  onSetCruiseHigh={onSetCruiseHigh}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        )}

        {/* Pause Overlay blocking stray touches and exposing direct Resume control */}
        {!isPlaying && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Game Paused"
            className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center border border-emerald-900 z-40 px-4 text-center pointer-events-auto"
          >
            <p className="text-2xl font-extrabold text-emerald-400 uppercase tracking-widest animate-pulse filter drop-shadow-[0_0_8px_rgba(0,250,0,0.4)]">
              Game Paused
            </p>
            <p className="text-xs text-emerald-500 mt-2 font-mono">
              Ambience continues while paused. Tap Resume to continue riding.
            </p>
            <button
              type="button"
              id="Mobile_Portrait_Overlay_Resume_Button"
              onClick={onTogglePlayPause}
              className="mt-4 px-6 py-3 min-h-[44px] bg-emerald-600 active:bg-emerald-500 text-black font-mono font-extrabold text-xs uppercase tracking-widest rounded-lg border-2 border-emerald-300 shadow-lg touch-manipulation"
            >
              Resume Riding
            </button>
          </div>
        )}
      </MobilePlayAreaMain>
    </div>
  );
};

