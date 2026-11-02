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
import { evaluateCopyleftCompliance, CopyleftEnforcementNotice } from "./System/Security/Copyleft_Enforcement";

export const App: React.FC = () => {
  // Hard Copyleft Platform Verification (Anti-Tivoization & DRM Lockout Guard)
  const [copyleftResult] = useState(() => evaluateCopyleftCompliance());
  const [switchCartAcknowledged, setSwitchCartAcknowledged] = useState(false);

  if (!copyleftResult.isCompliant) {
    if (copyleftResult.platformType === "NINTENDO_SWITCH_DRM_CARTRIDGE" && !switchCartAcknowledged) {
      return (
        <CopyleftEnforcementNotice 
          result={copyleftResult} 
          onAcknowledge={() => setSwitchCartAcknowledged(true)}
        />
      );
    } else if (copyleftResult.platformType !== "NINTENDO_SWITCH_DRM_CARTRIDGE") {
      return <CopyleftEnforcementNotice result={copyleftResult} />;
    }
  }

  // Navigation & Flow State
  const [gameState, setGameState] = useState<GameState>(GameState.LANDING);

  // Character Configuration State
  const isPiratedCart = copyleftResult.platformType === "NINTENDO_SWITCH_DRM_CARTRIDGE";
  const georgeRider = RIDER_CHARACTERS.find(r => r.id === "george") || RIDER_CHARACTERS[0];

  const [selectedOpossum, setSelectedOpossum] = useState<OpossumCharacter>(
    OPOSSUM_CHARACTERS[0]
  );
  const [selectedRider, setSelectedRider] = useState<RiderCharacter>(
    isPiratedCart ? georgeRider : (FAIRY_RIDER || RIDER_CHARACTERS[0])
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
        if (isPiratedCart) {
          // Pirated Nintendo Switch cart limits character to George as POV only
          return (
            <div className="min-h-screen bg-black text-amber-300 flex flex-col items-center justify-center p-6 text-center font-mono">
              <div className="max-w-md w-full border border-amber-600 bg-zinc-950 p-6 rounded-lg space-y-4">
                <h2 className="text-lg font-bold uppercase text-amber-400">Locked Character: George (POV Mode)</h2>
                <p className="text-xs text-zinc-300">
                  Physical Nintendo Switch DRM Cartridge detected. Character selection is restricted to George as POV only.
                </p>
                <button
                  onClick={() => {
                    setSelectedRider(georgeRider);
                    setGameState(GameState.SELECTION);
                  }}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-black font-bold uppercase rounded cursor-pointer text-xs"
                >
                  Proceed with George
                </button>
              </div>
            </div>
          );
        }
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
            selectedRider={isPiratedCart ? georgeRider : selectedRider}
            onSelectOpossum={(opossum) => {
              setSelectedOpossum(opossum);
              setGameState(GameState.INTERSTITIAL);
            }}
            onBack={() => setGameState(isPiratedCart ? GameState.LANDING : GameState.RIDER_SELECTION)}
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
            defaultRider={isPiratedCart ? georgeRider : selectedRider}
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
            viewMode={isPiratedCart ? GameViewMode.POV : viewMode}
            setViewMode={isPiratedCart ? () => {} : setViewMode}
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
