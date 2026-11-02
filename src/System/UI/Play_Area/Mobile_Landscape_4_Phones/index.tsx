/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { OpossumCharacter, RiderCharacter, GameLevel } from "../../../../types";
import { NIGHT_SKY_AMBER_SPECS } from "./General";
import { LandscapeGameView, LandscapeLeftDeck, LandscapeRightDeck, LandscapeHUD } from "./Main";
import { Eye, EyeOff } from "lucide-react";

export interface MobileLandscape4PhonesProps {
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

export const MobileLandscape4Phones: React.FC<MobileLandscape4PhonesProps> = ({
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
  const [showLateralDecks, setShowLateralDecks] = useState<boolean>(true);

  return (
    <div
      id="Mobile_Landscape_Root"
      className="fixed inset-0 w-full h-full max-h-screen bg-stone-950 flex flex-col justify-between overflow-hidden  z-50"
      style={{
        background: `radial-gradient(ellipse at center, ${NIGHT_SKY_AMBER_SPECS.bezelBgMid} 0%, ${NIGHT_SKY_AMBER_SPECS.bezelBgStart} 100%)`
      }}
    >
      {/* 1. Low-Profile Top HUD */}
      <LandscapeHUD
        currentLevelId={currentLevelId}
        currentLevel={currentLevel}
        playerZ={playerZ}
        score={score}
        ticksEaten={ticksEaten}
        Measured_Distance_Value={Measured_Distance_Value}
        getEdibleItemName={getEdibleItemName}
        selectedOpossum={selectedOpossum}
        defaultRider={defaultRider}
      />

      {/* 2. Main Center Body: Left Controls Deck + Center Canvas + Right Controls Deck */}
      <div
        id="Mobile_Landscape_Body"
        className="flex-1 w-full h-full flex items-center justify-between px-2 py-1 overflow-hidden relative"
      >
        {/* LEFT DECK: Directional D-Pad (Toggleable for edge-to-edge pure canvas play) */}
        {showLateralDecks && (
          <div className="w-[22%] min-w-[120px] max-w-[160px] h-full flex items-center justify-center flex-shrink-0 z-10">
            <LandscapeLeftDeck
              onMoveLeft={onMoveLeft}
              onMoveRight={onMoveRight}
              onMoveUpStart={onMoveUpStart}
              onMoveUpEnd={onMoveUpEnd}
              onMoveDownStart={onMoveDownStart}
              onMoveDownEnd={onMoveDownEnd}
            />
          </div>
        )}

        {/* CENTER VIEW: Amber-Bordered Widescreen Canvas Viewport */}
        <div className="flex-1 h-full flex items-center justify-center relative p-1 overflow-hidden">
          <LandscapeGameView
            canvasRef={canvasRef}
            isPlaying={isPlaying}
            onMoveLeft={onMoveLeft}
            onMoveRight={onMoveRight}
            onJump={onJump}
            onMoveUpStart={onMoveUpStart}
            onMoveUpEnd={onMoveUpEnd}
            onMoveDownStart={onMoveDownStart}
            onMoveDownEnd={onMoveDownEnd}
            className="w-full h-full max-w-[840px] max-h-[400px]"
          />

          {/* Quick Deck Toggle Pill Floating at Bottom Center of Canvas */}
          <button
            type="button"
            onClick={() => setShowLateralDecks((prev) => !prev)}
            className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/70 border border-amber-800/60 text-[9px] font-mono text-amber-300 active:scale-95 touch-manipulation opacity-60 hover:opacity-100 transition-opacity"
            aria-label={showLateralDecks ? "Hide on-screen side controls" : "Show on-screen side controls"}
            title="Toggle side controls"
          >
            {showLateralDecks ? <EyeOff className="w-2.5 h-2.5" /> : <Eye className="w-2.5 h-2.5" />}
            <span>{showLateralDecks ? "Hide Decks" : "Show Decks"}</span>
          </button>
        </div>

        {/* RIGHT DECK: Pause, Menu Button placed directly below Pause, Jump, Cruise */}
        {showLateralDecks && (
          <div className="w-[22%] min-w-[120px] max-w-[160px] h-full flex items-center justify-center flex-shrink-0 z-10">
            <LandscapeRightDeck
              isPlaying={isPlaying}
              onTogglePlayPause={onTogglePlayPause}
              onOpenMenu={onOpenMenu}
              onJump={onJump}
              onSetCruiseLowStop={onSetCruiseLowStop}
              onSetCruiseHigh={onSetCruiseHigh}
            />
          </div>
        )}
      </div>
    </div>
  );
};
