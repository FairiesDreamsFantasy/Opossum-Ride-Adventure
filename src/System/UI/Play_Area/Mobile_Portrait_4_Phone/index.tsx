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
      className="fixed inset-0 w-full h-full max-h-screen bg-black text-green-400 font-sans flex flex-col justify-between overflow-hidden select-none z-50"
    >
      {/* 1. Mobile Menu Bar with Return to Landing Page button on left, layout toggle & deck visibility */}
      <MobileMenuBar
        onExitGame={onExitGame}
        activeLayout={activeLayout}
        onToggleLayout={handleToggleLayout}
        ttsEnabled={ttsEnabled}
        onToggleTTS={handleToggleTTS}
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
              {/* Telemetry Strip */}
              <div className="flex items-center justify-between text-[10px] font-mono text-green-400 bg-black/80 px-2.5 py-1 rounded border border-green-900/60 flex-shrink-0">
                <span>RIDER: {defaultRider.name}</span>
                <span>SPEED: {(20 + (score % 15)).toFixed(1)} m/s</span>
                <span className="text-yellow-400">LIVITY: 100%</span>
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
      </MobilePlayAreaMain>
    </div>
  );
};

