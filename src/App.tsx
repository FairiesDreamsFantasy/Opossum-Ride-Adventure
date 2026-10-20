/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import {
  GameState,
  OpossumCharacter,
  RiderCharacter,
  KeyboardLayoutType,
  GameViewMode,
  GameLevel
} from "./types";
import { VisualPaletteType } from "./System/Visuals";
import { OPOSSUM_CHARACTERS } from "./Characters/Opossums";
import { RIDER_CHARACTERS, FAIRY_RIDER } from "./Characters/Riders";
import { generateLevel } from "./Levels";
import {
  LandingPage,
  BootingScreen,
  LearnGameSounds,
  RiderSelection,
  OpossumSelection,
  InterstitialAd,
  PlayArea
} from "./System/UI";

export const App: React.FC = () => {
  // Navigation & Flow State
  const [gameState, setGameState] = useState<GameState>(GameState.LANDING);

  // Character Configuration State
  const [selectedOpossum, setSelectedOpossum] = useState<OpossumCharacter>(
    OPOSSUM_CHARACTERS[0]
  );
  const [selectedRider, setSelectedRider] = useState<RiderCharacter>(
    FAIRY_RIDER || RIDER_CHARACTERS[0]
  );

  // Gameplay & Accessibility Preferences
  const [layout, setLayout] = useState<KeyboardLayoutType>(
    KeyboardLayoutType.CEDELLA
  );
  const [currentLevelId, setCurrentLevelId] = useState<number>(0);
  const [currentLevel, setCurrentLevel] = useState<GameLevel>(() =>
    generateLevel(0)
  );

  const [chatterNotifications, setChatterNotifications] = useState<boolean>(false);
  const [announceDoors, setAnnounceDoors] = useState<boolean>(false);
  const [announceReverb, setAnnounceReverb] = useState<boolean>(false);
  const [extendedInfo, setExtendedInfo] = useState<boolean>(false);
  const [announceSteering, setAnnounceSteering] = useState<boolean>(false);
  const [announceMooseSmash, setAnnounceMooseSmash] = useState<boolean>(true);
  const [musicEnabled, setMusicEnabled] = useState<boolean>(false);

  // Visual & Perspective Settings
  const [viewMode, setViewMode] = useState<GameViewMode>(GameViewMode.POV);
  const [pixelation, setPixelation] = useState<number>(1);
  const [palette, setPalette] = useState<VisualPaletteType>("full-color");
  const [is3D, setIs3D] = useState<boolean>(true);
  const [wireframe, setWireframe] = useState<boolean>(false);

  // Screen Reader Accessibility: Global Control (Ctrl) key stop command
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Control" || e.ctrlKey) {
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
          window.speechSynthesis.cancel();
        }
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => {
      window.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, []);

  // Update level object when currentLevelId changes
  useEffect(() => {
    setCurrentLevel(generateLevel(currentLevelId));
  }, [currentLevelId]);

  // View state router
  const renderContent = () => {
    switch (gameState) {
      case GameState.LANDING:
        return (
          <LandingPage
            onStartGame={() => setGameState(GameState.BOOTING)}
            onLearnGameSounds={() => setGameState(GameState.LEARN_GAME_SOUNDS)}
          />
        );

      case GameState.BOOTING:
        return (
          <BootingScreen
            onBootComplete={() => setGameState(GameState.RIDER_SELECTION)}
          />
        );

      case GameState.LEARN_GAME_SOUNDS:
        return (
          <LearnGameSounds
            onStartGame={() => setGameState(GameState.BOOTING)}
            onBackToLanding={() => setGameState(GameState.LANDING)}
          />
        );

      case GameState.RIDER_SELECTION:
        return (
          <RiderSelection
            onSelectRider={(rider) => {
              setSelectedRider(rider);
              setGameState(GameState.SELECTION);
            }}
            onBack={() => setGameState(GameState.LANDING)}
          />
        );

      case GameState.SELECTION:
        return (
          <OpossumSelection
            selectedRider={selectedRider}
            onSelectOpossum={(opossum) => {
              setSelectedOpossum(opossum);
              setGameState(GameState.INTERSTITIAL);
            }}
            onBack={() => setGameState(GameState.RIDER_SELECTION)}
          />
        );

      case GameState.INTERSTITIAL:
        return (
          <InterstitialAd
            onAdComplete={() => setGameState(GameState.PLAYING)}
          />
        );

      case GameState.PLAYING:
      default:
        return (
          <PlayArea
            selectedOpossum={selectedOpossum}
            defaultRider={selectedRider}
            onExitGame={() => setGameState(GameState.LANDING)}
            layout={layout}
            setLayout={setLayout}
            currentLevelId={currentLevelId}
            setCurrentLevelId={setCurrentLevelId}
            currentLevel={currentLevel}
            setCurrentLevel={setCurrentLevel}
            chatterNotifications={chatterNotifications}
            setChatterNotifications={setChatterNotifications}
            announceDoors={announceDoors}
            setAnnounceDoors={setAnnounceDoors}
            announceReverb={announceReverb}
            setAnnounceReverb={setAnnounceReverb}
            extendedInfo={extendedInfo}
            setExtendedInfo={setExtendedInfo}
            announceSteering={announceSteering}
            setAnnounceSteering={setAnnounceSteering}
            announceMooseSmash={announceMooseSmash}
            setAnnounceMooseSmash={setAnnounceMooseSmash}
            musicEnabled={musicEnabled}
            setMusicEnabled={setMusicEnabled}
            viewMode={viewMode}
            setViewMode={setViewMode}
            pixelation={pixelation}
            setPixelation={setPixelation}
            palette={palette}
            setPalette={setPalette}
            is3D={is3D}
            setIs3D={setIs3D}
            wireframe={wireframe}
            setWireframe={setWireframe}
          />
        );
    }
  };

  return (
    <>
      {renderContent()}
    </>
  );
};

export default App;
