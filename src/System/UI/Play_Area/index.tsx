/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from "react";
import {
  OpossumCharacter,
  RiderCharacter,
  GameViewMode,
  KeyboardLayoutType,
  GameState,
  GameLevel,
  Opponent,
  TickItem,
  ObstacleItem,
  AnimalItem
} from "../../../types";
import { KeyboardSystem } from "../../Keyboards_and_Controllers/Keyboard";
import { generateLevel } from "../../../Levels";
import { INITIAL_PLACES } from "../../../Arena";
import { PlaceResolver } from "../../Engine/Resolver";
import { speakWords, playProceduralSound, setSpeechEnabled, isSpeechEnabled, speakAnimalNarrative, canSpeakAnimalNarrative } from "../../Sound/TTS";
import { completeLevelSave } from "../../../System/Utilities/persistence";
import {
  drawEdibleItem,
  getEdibleItemName,
  renderFoyer3D,
  renderStandardLevel,
  render2DView
} from "../../Engine/Science/Graphical_Renderer";
import { updateFoyerPhysics, updateStandardPhysics, applyScientificReaction } from "../../Engine/Science/Physics";
import { Spawner } from "../../Engine/Spawner";
import { Input } from "../../Engine/Input";
import { AudioEngine, Configurater, MeasurementEngine } from "../../Engine";
import { SystemRegistry } from "../../Registry";
import { DOMEngine } from "../../DOM";
import { MelissaOpossum, AshleyOpossum, AmaraQinOpossum, SaffronRoseOpossum, JalissaChinOpossum, ArdenRosieOpossum, JahmellaRoseOpossum, DagmarKoneReynoldsOpossum } from "../../../Characters/Opossums";
import { AIGeneratedOpossum } from "../../../Characters/Opossums/AI-Generated/Drawing";
import { MonkeyCharacterModel } from "../../../Characters/Monkeys";
import { MooseCharacterModel } from "../../../Characters/Moose";
import { VirtualHardwareController, VirtualSysMetrics } from "../../Hardware_Virtualization";
import { ProceduralSoundSystem, RHYTHM_PROFILES } from "../../Sound";
import { VisualRenderingFilterEngine, VisualStateSettings, VisualPaletteType, VISUAL_CONSTANTS } from "../../Visuals";
import {
  BehaviorAnalyzerView,
  HotspotVisualizerView,
  TrajectoryPredictorView,
  resolveMooseAndMonkeyBehavior,
  evaluateSmartChatter,
  SmartChatterState,
  isMooseAndMonkeysAllowedInPlace,
  isMooseHotspotLevel,
  InGameAccessibility,
  InGameKeyTapManager
} from "../../AI/In-Game";
import { GeminiSystem, AIErrorBoundary } from "../../AI/External/Gemini";
import { SmartArenaConfig } from "../../AI/External/Gemini/Smart_Arenas";
import { AIGeneratedLevel } from "../../../World/1/Levels/AI-Generated_Levels";
import { AIGeneratedPlace } from "../../../Arena/AI-Generated";
import { FloorFoyerDescription } from "../../../World/1/Levels/Level_0/Manor/1st_Floor/Floor_Foyer/Description";
import { computeForwardNavigationTarget } from "./Main/Accessible/Key_Taps";
import { ArenaLoadingOverlay } from "./Main/Arena_Loading_Overlay";
import { MobilePortrait4Phone } from "./Mobile_Portrait_4_Phone";
import { PortraitOrientation4Tablets } from "./Portrait_Orientation_4_Tablets";
import { MobileLandscape4Phones } from "./Mobile_Landscape_4_Phones";
import { useMobilePortraitPhone } from "../../Keyboards_and_Controllers/Device_Detection";
export * from "./Mobile_Portrait_4_Phone";
export * from "./Portrait_Orientation_4_Tablets";
export * from "./Mobile_Landscape_4_Phones";

import { DeltaTimerFilter, PhysicsBufferPool } from "../../Engine/Optimization";

import { MenuBar, ChalkboardColorConfig, DEFAULT_CHALKBOARD_CONFIG, QuiltedMenuBar, GardenMenuBar, ForestMenuBar, StorybookMenuBar, ImmersionLowMenuBar } from "../../Components/Menu_Bar";
import { HUD } from "./Main/HUD";
import { CraftedHUD } from "../../Components/HUD";
import { VisualHUD } from "./Main/HUD/Visual";
import { StatusFeed } from "./Main/Status_Feed";
import { ThemeType } from "../../Themes";
import { ThemeDark, ThemeLight, ThemeQuilted, ThemeGarden, ThemeForest, ThemeStorybook, ThemeImmersionLow, ThemeImmersionUltra } from "./Theme";
import { ThemeSwitcherModal } from "../Modal";

import { KeyboardGeneralInput } from "../../Engine/Input/Keyboard/General";
import { AccessibleNarrationModule } from "./Main/Accessible";
import { GameLoopGeneral } from "./Main/Game_Loop";

import { XboxControllerManager } from "../../Keyboards_and_Controllers/Controller/XBOX";
import { PlayStationControllerManager } from "../../Keyboards_and_Controllers/Controller/PlayStation";
import { NintendoControllerManager } from "../../Keyboards_and_Controllers/Controller/Nintendo";
import { WiiControllerManager } from "../../Keyboards_and_Controllers/Controller/Wii";

import {
  HelpCircle,
  Volume2,
  VolumeX,
  FileDigit,
  Maximize2,
  Minimize2,
  Monitor,
  MonitorX,
  Layout,
  Type
} from "lucide-react";

/**
 * Deterministically computes the course direction based on player progress (playerZ)
 * to avoid memory spikes and preserve zero-allocation safety.
 */
export function getCourseSegmentDirection(playerZ: number): { direction: string; milestoneText: string } {
  const progress = Math.round(playerZ);
  if (progress <= 80) {
    return { direction: "North", milestoneText: "" };
  } else if (progress <= 200) {
    return { direction: "East", milestoneText: "turned right via automated steering, now heading East" };
  } else if (progress <= 350) {
    return { direction: "North", milestoneText: "turned left via automated steering, now heading North" };
  } else if (progress <= 500) {
    return { direction: "West", milestoneText: "turned left via automated steering, now heading West" };
  } else if (progress <= 700) {
    return { direction: "North", milestoneText: "turned right via automated steering, now heading North" };
  } else if (progress <= 900) {
    return { direction: "East", milestoneText: "turned right via automated steering, now heading East" };
  } else if (progress <= 1100) {
    return { direction: "South", milestoneText: "turned right via automated steering, now heading South" };
  } else {
    return { direction: "North", milestoneText: "turned left via automated steering, now heading North" };
  }
}

/**
 * interface PlayAreaProps
 */
interface PlayAreaProps {
  selectedOpossum: OpossumCharacter;
  defaultRider: RiderCharacter;
  onExitGame: () => void;
  layout: KeyboardLayoutType;
  setLayout: (l: KeyboardLayoutType) => void;
  currentLevelId: number;
  setCurrentLevelId: (id: number) => void;
  currentLevel: GameLevel;
  setCurrentLevel: (l: GameLevel) => void;
  chatterNotifications: boolean;
  setChatterNotifications: (v: boolean) => void;
  announceDoors: boolean;
  setAnnounceDoors: (v: boolean) => void;
  announceReverb: boolean;
  setAnnounceReverb: (v: boolean) => void;
  extendedInfo: boolean;
  setExtendedInfo: (v: boolean) => void;
  announceSteering: boolean;
  setAnnounceSteering: (v: boolean) => void;
  announceMooseSmash: boolean;
  setAnnounceMooseSmash: (v: boolean) => void;
  musicEnabled: boolean;
  setMusicEnabled: (v: boolean) => void;
  viewMode: GameViewMode;
  setViewMode: (v: GameViewMode) => void;
  pixelation: number;
  setPixelation: (p: number) => void;
  palette: VisualPaletteType;
  setPalette: (p: VisualPaletteType) => void;
  is3D: boolean;
  setIs3D: (v: boolean) => void;
  wireframe: boolean;
  setWireframe: (v: boolean) => void;
}

export const PlayArea: React.FC<PlayAreaProps> = ({
  selectedOpossum,
  defaultRider,
  onExitGame,
  layout,
  setLayout,
  currentLevelId,
  setCurrentLevelId,
  currentLevel,
  setCurrentLevel,
  chatterNotifications,
  setChatterNotifications,
  announceDoors,
  setAnnounceDoors,
  announceReverb,
  setAnnounceReverb,
  extendedInfo,
  setExtendedInfo,
  announceSteering,
  setAnnounceSteering,
  announceMooseSmash,
  setAnnounceMooseSmash,
  musicEnabled,
  setMusicEnabled,
  viewMode,
  setViewMode,
  pixelation,
  setPixelation,
  palette,
  setPalette,
  is3D,
  setIs3D,
  wireframe,
  setWireframe
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { isMobilePortraitPhone, isTabletPortrait, isMobileLandscapePhone } = useMobilePortraitPhone();

  // Keyboard and Setup Configuration states
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [showFeed, setShowFeed] = useState<boolean>(false);
  const [showVisualHUD, setShowVisualHUD] = useState<boolean>(false);
  const [showOpponentIndicators, setShowOpponentIndicators] = useState<boolean>(false);
  const [genericCrashSound, setGenericCrashSound] = useState<boolean>(false);
  const [currentTheme, setCurrentTheme] = useState<ThemeType>("dark");
  const [showThemeModal, setShowThemeModal] = useState<boolean>(false);

  // Modern Level 0 Manor Foyer Positioning states
  const [foyerX, setFoyerX] = useState<number>(1000);
  const [foyerY, setFoyerY] = useState<number>(1000);
  const [foyerDirection, setFoyerDirection] = useState<string>("North");

  // Optimization Ref Handles
  const deltaFilterRef = useRef(new DeltaTimerFilter());
  const particlePoolRef = useRef(new PhysicsBufferPool(64, () => ({
    id: 0,
    lane: 0,
    z: 0,
    spawnTime: 0,
    radius: 0.2,
    maxRadius: 2.5
  })));
  const floatingTextPoolRef = useRef(new PhysicsBufferPool(32, () => ({
    id: 0,
    text: "",
    lane: 0,
    z: 0,
    spawnTime: 0,
    yOffset: 0
  })));

  // System class instances as persistent refs
  const cpuControllerRef = useRef(new VirtualHardwareController());
  const soundSystemRef = useRef(new ProceduralSoundSystem());
  const filterEngineRef = useRef(new VisualRenderingFilterEngine());
  const [sysMetrics, setSysMetrics] = useState<VirtualSysMetrics>({
    virtualCpuUsage: 4,
    ramAllocatedMb: 12.6,
    garbageCollectionCycles: 0,
    coreTemperatureCelsius: 38.2,
    activeVirtualCores: 4,
    engineHz: 60,
    cpu: { virtualCpuUsage: 4, coreTemperatureCelsius: 38.2, activeVirtualCores: 4, engineHz: 60, cycleCount: 0 },
    ram: { ramAllocatedMb: 12.6, maxRamCap: 32.0, garbageCollectionCycles: 0, memoryBufferHealth: 100 },
    gpu: { gpuUsagePercent: 0, gpuTemperatureCelsius: 0, drawCallsCount: 0, shaderCoreClockMhz: 850 },
    video: { vramAllocatedMb: 0, maxVramCapMb: 1024, memoryBusWidthBits: 256, displayModeText: "" },
    sound: { activeSynthVoices: 0, maxVoiceCapacity: 32, bufferLatencyMs: 5.8, dspUtilizationPercent: 0 }
  });

  // Track exact distance traveled to play rhythmic, realistic surface footsteps
  const lastFootstepZRef = useRef<number>(0);
  
  // Game metrics scores
  const [score, setScore] = useState<number>(0);
  const [ticksEaten, setTicksEaten] = useState<number>(0);
  const [isImperial, setIsImperial] = useState<boolean>(false);
  const [playerZ, setPlayerZ] = useState<number>(0); // player position along track in meters
  const [currentArena, setCurrentArena] = useState<SmartArenaConfig | null>(null);
  const [isAiGenerating, setIsAiGenerating] = useState<boolean>(false);
  const [aiProgressPercent, setAiProgressPercent] = useState<number>(0);
  const [aiLoadingStatus, setAiLoadingStatus] = useState<string>("Initializing Arena Blueprint...");
  const [customTrackId, setCustomTrackId] = useState<string | null>(null);

  // Helper Measured_Distance_Value to make system modular and dynamic
  const Measured_Distance_Value = (meters: number): string => {
    return MeasurementEngine.formatDistance(meters, isImperial || stateRef.current.isImperial);
  };

  const Measured_Speed_Value = (ms: number): string => {
    return MeasurementEngine.formatSpeed(ms, isImperial || stateRef.current.isImperial);
  };

  const [playerLane, setPlayerLane] = useState<number>(0); // -1 (left), 0 (center), 1 (right)
  const [visualLaneX, setVisualLaneX] = useState<number>(0); // smooth lane transition target
  const [playerY, setPlayerY] = useState<number>(0); // jump height
  const [isJumping, setIsJumping] = useState<boolean>(false);
  const [jumpProgress, setJumpProgress] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(0); // current movement speed
  const [statusMessage, setStatusMessage] = useState<string>("Ready! [64-bit Synthesis Engine Active] Ride your opossum along the garden trail.");

  // Game assets/entities generated per level
  const [ticks, setTicks] = useState<TickItem[]>([]);
  const [obstacles, setObstacles] = useState<ObstacleItem[]>([]);
  const [opponents, setOpponents] = useState<Opponent[]>([]);
  const [animals, setAnimals] = useState<AnimalItem[]>([]);

  // Refs for real-time loops to bypass render latency
  const stateRef = useRef({
    playerZ: 0,
    playerLane: 0,
    visualLaneX: 0,
    playerY: 0,
    isJumping: false,
    jumpProgress: 0,
    speed: 0,
    score: 0,
    ticksEaten: 0,
    isImperial: false,
    chatterNotifications: false,
    announceReverb: false,
    extendedInfo: false,
    viewMode: GameViewMode.RIDER,
    lastTime: 0,
    isGameOver: false,
    isPlaying: true, // Synced with isPlaying state for high-precision loop access
    cruiseSpeed: 0, // Target cruise speed in mph
    scannedOpponentId: -1,
    opponentTimer: 0,
    isPressingForward: false,
    isPressingBackward: false,
    chatterPulse: 0,
    chatterText: "",
    foyerX: 1000,
    foyerY: 1000,
    foyerDirection: "North",
    currentLevelId: 0,
    doorOpenProgress: 0,
    doorsOpen: false,
    announcedZone: "foyer",
    keyboardForward: false,
    keyboardBackward: false,
    controllerLeftPressed: false,
    controllerRightPressed: false,
    controllerJumpPressed: false,
    controllerPausePressed: false,
    particlePool: particlePoolRef.current,
    floatingTextPool: floatingTextPoolRef.current
  });

  // Keep refs updated for high-precision access without keyboard unbind spikes
  const opponentsRef = useRef(opponents);
  const animalsRef = useRef(animals);
  const selectedOpossumRef = useRef(selectedOpossum);
  const ticksRef = useRef(ticks);
  const obstaclesRef = useRef(obstacles);
  const defaultRiderRef = useRef(defaultRider);
  const currentLevelRef = useRef(currentLevel);
  const lastRenderedZRef = useRef<number>(0);
  const smartChatterStateRef = useRef<SmartChatterState>({
    lastChatterTime: 0
  });

  useEffect(() => {
    if (soundSystemRef.current) {
      soundSystemRef.current.setGenericCrashSound(genericCrashSound);
    }
  }, [genericCrashSound]);

  useEffect(() => {
    opponentsRef.current = opponents;
  }, [opponents]);

  useEffect(() => {
    animalsRef.current = animals;
  }, [animals]);

  useEffect(() => {
    selectedOpossumRef.current = selectedOpossum;
  }, [selectedOpossum]);

  useEffect(() => {
    ticksRef.current = ticks;
  }, [ticks]);

  useEffect(() => {
    obstaclesRef.current = obstacles;
  }, [obstacles]);

  useEffect(() => {
    defaultRiderRef.current = defaultRider;
  }, [defaultRider]);

  useEffect(() => {
    currentLevelRef.current = currentLevel;
  }, [currentLevel]);

  useEffect(() => {
    stateRef.current.chatterNotifications = chatterNotifications;
    stateRef.current.announceReverb = announceReverb;
    stateRef.current.extendedInfo = extendedInfo;
    stateRef.current.viewMode = viewMode;
    (stateRef.current as any).announceMooseSmash = announceMooseSmash;
    (stateRef.current as any).musicEnabled = musicEnabled;
    (stateRef.current as any).showOpponentIndicators = showOpponentIndicators;
  }, [chatterNotifications, announceReverb, extendedInfo, viewMode, announceMooseSmash, musicEnabled, showOpponentIndicators]);

  useEffect(() => {
    if (soundSystemRef.current) {
      soundSystemRef.current.setMusicEnabled(musicEnabled);
    }
  }, [musicEnabled]);

  // Subscribe HUD and dashboard state to GeminiSystem quota updates to keep HUD meter 100% accurate
  const [, setQuotaHUDTrigger] = useState(0);
  useEffect(() => {
    return GeminiSystem.subscribe(() => {
      setQuotaHUDTrigger(prev => prev + 1);
    });
  }, []);

  const [activeVisualPref, setActiveVisualPref] = useState<string>("Auto Sense 2-D/3-D");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [colorDotMatrix, setColorDotMatrix] = useState<boolean>(true);
  const [ttsEnabled, setTtsEnabled] = useState<boolean>(isSpeechEnabled());
  const [largeText, setLargeText] = useState<boolean>(false);
  const [chalkboardConfig, setChalkboardConfig] = useState<ChalkboardColorConfig>(DEFAULT_CHALKBOARD_CONFIG);
  const lastKeyEventRef = useRef<{ key: string; time: number }>({ key: "", time: 0 });
  const keyTapManagerRef = useRef<InGameKeyTapManager>(new InGameKeyTapManager());

  const handleAudioDescription = () => {
    const level = currentLevelRef.current;
    const place = PlaceResolver.resolvePlace(level.placeId, level.name);
    
    // Resolve atmosphere and descriptions by prioritizing Level overrides, then Place definitions, then defaults
    const arenaInfo = {
      name: level.name || place.name,
      surfaceType: level.surfaceType || place.surfaceType,
      theme: level.theme || place.ambientNoise || "Serene",
      longDescription: level.longDescription || place.description
    };
    
    // Special handling for Floor Foyer with dynamic preferences
    const isFoyer = level.placeId === "floor_foyer";
    const foyerDescObj = {
      prompt: FloorFoyerDescription.narrative,
      reverbProfile: FloorFoyerDescription.reverbProfile,
      extendedNarrative: FloorFoyerDescription.extendedNarrative
    };

    AudioEngine.Narrator.narrateScene(
      arenaInfo,
      isFoyer,
      foyerDescObj,
      {
        announceDoors,
        announceReverb,
        extendedInfo,
        chatterNotifications
      }
    );
  };

  const handleVisualPrefChange = (pref: string) => {
    setActiveVisualPref(pref);
    Configurater.applyPreset(pref, {
      setIs3D,
      setPixelation,
      setPalette,
      setWireframe
    });
  };

  const handleLayoutChange = (lay: KeyboardLayoutType) => {
    Configurater.applyLayout(lay, setLayout);
  };

  // Implement scientific autofocus on the game canvas for screen-reader accessibility
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.focus();
    }
  }, []);

  // Main High-Precision Physics Game Loop & Render Loop

  const triggerChatter = () => {
    // Update Smart Chatter refractory state to ensure manual/auto chatter resets the temporal pattern
    smartChatterStateRef.current.lastChatterTime = stateRef.current.lastTime / 1000;

    // Play high-fidelity chatter sound effect
    soundSystemRef.current.playOpossumChatter(false, selectedOpossumRef.current.id, selectedOpossumRef.current.playChatter);

    // Set visual chattering state
    stateRef.current.chatterPulse = 1.0;
    stateRef.current.chatterText = "♪ Chitter Chirp! ♪";
    
    if (stateRef.current.chatterNotifications || chatterNotifications) {
      speakWords("Opossum: ♪ Chitter Chirp! (Happy Chatter) ♪");
    }

    // Special obstacle crash logic for environments with monkeys riding moose (Forest, Mountains, Cave)
    const isValidCrashEnvironment = isMooseAndMonkeysAllowedInPlace(currentLevelRef.current.placeId);
    const obstacleAhead = obstaclesRef.current.find(
      (obs) => obs.lane === stateRef.current.playerLane && obs.z > stateRef.current.playerZ && obs.z < stateRef.current.playerZ + 80 && (obs.type === "fence" || obs.type === "rock")
    );

    if (isValidCrashEnvironment && obstacleAhead) {
      let crashedMooseCount = 0;
      setOpponents((prev) =>
        prev.map((opp) => {
          const distance = Math.abs(opp.z - stateRef.current.playerZ);
          if (distance < 120 && opp.mooseState !== "crashed" && crashedMooseCount < 3) {
            crashedMooseCount++;

            const isWild = opp.isWildMoose || !opp.mooseName || opp.mooseName.trim() === "";
            const subject = isWild ? `A charging wild ${opp.mooseType} Moose` : `The charging ${opp.mooseType} Moose ${opp.mooseName}`;
            setTimeout(() => {
              soundSystemRef.current.playMooseVocal("grunt");
              speakAnimalNarrative(`${subject} charged, crashing into ${obstacleAhead.type}.`);
            }, crashedMooseCount * 1200);

            return {
              ...opp,
              isCharging: false,
              speed: 0,
              mooseState: "crashed",
              monkeyBehavior: "tossed"
            };
          }
          return opp;
        })
      );

      if (crashedMooseCount > 0) {
        setStatusMessage(`Opossum chatter triggered safety barrier crash! ${crashedMooseCount} moose hit the ${obstacleAhead.type}!`);
        return; // Skip normal hotspot warnings when a crash is handled
      }
    }

    // Determine if near a Moose. Active hotspots in forest, mountains, and cave arenas!
    const isHotspotEnvironment = isMooseHotspotLevel(currentLevelRef.current.placeId, currentLevelRef.current.id);
    if (isHotspotEnvironment) {
      let nearMoose = false;
      setOpponents((prev) =>
        prev.map((opp) => {
          const distance = Math.abs(opp.z - stateRef.current.playerZ);
          const proximityLimit = 80; // 80 meters large proximity hotspot
          if (distance < proximityLimit && !opp.isCharging) {
            nearMoose = true;

            const isBull = opp.mooseType === "Bull";

            const nameStr = opp.isWildMoose ? `An unnamed wild ${opp.mooseType}` : opp.mooseName;
            const isCave = currentLevelRef.current.placeId === "cave";
            const isForest = currentLevelRef.current.placeId === "forest";
            const isPlain = currentLevelRef.current.placeId === "plain" || currentLevelRef.current.placeId === "plains";
            const isMountain = currentLevelRef.current.placeId === "mountains";
            const opossumScaleFactor = " Due to the large scale of this crafted opossum, the moose misidentifies it as a wolf or wild dog enemy! ";

            // External Scientific AI Resolution
            if (GeminiSystem.isReady()) {
              GeminiSystem.resolveScientificReaction({
                mooseName: nameStr,
                monkeyName: opp.monkeyName || "Wild Monkey",
                environment: currentLevelRef.current.placeId,
                isOpossumEvent: true
              }).then((resolvedIndex) => {
                setOpponents(prev => prev.map(o => {
                  if (o.id === opp.id) {
                    applyScientificReaction(o, resolvedIndex, nameStr, isForest, isCave, isPlain, isMountain, currentLevelRef.current.id, opossumScaleFactor, speakWords, soundSystemRef);
                  }
                  return o;
                }));
              });
              return { ...opp, isCharging: true }; // Trigger charge state immediately
            }

            // High-fidelity Markov-Ethology behavior simulation with opossum chatter factor
            const behaviorState = resolveMooseAndMonkeyBehavior(Math.random(), isBull, currentLevelRef.current.placeId, true);

            let monkeyBehavior: any = "riding_normally";
            let mooseStateEnum: any = "charging";

            if (behaviorState.mooseState === "bucking" || behaviorState.aggressionFactor >= 0.8) {
              monkeyBehavior = "tossed";
              mooseStateEnum = "tossing_rider";
            } else if (behaviorState.mooseState === "crashed") {
              monkeyBehavior = "wall_running";
              mooseStateEnum = "crashed";
            } else if (behaviorState.mooseState === "ramming") {
              monkeyBehavior = "teasing";
              mooseStateEnum = "ramming";
            } else if (behaviorState.mooseState === "charging_wildly") {
              monkeyBehavior = "teasing";
              mooseStateEnum = "charging_wildly";
            } else if (behaviorState.monkeyState === "chasing") {
              monkeyBehavior = "chasing";
              mooseStateEnum = "charging";
            } else if (behaviorState.monkeyState === "jumping") {
              monkeyBehavior = "jumping";
              mooseStateEnum = "charging";
            } else if (behaviorState.mooseState === "snorting") {
              mooseStateEnum = "snorting";
            } else if (behaviorState.mooseState === "bellowing") {
              mooseStateEnum = "bellowing";
            } else if (behaviorState.mooseState === "mooing") {
              mooseStateEnum = "mooing";
            }

            const speedMultiplier = isBull ? 32 : 26;

            // Voice synthesis vocal triggers
            if (behaviorState.mooseState === "snorting") {
              soundSystemRef.current.playMooseVocal("snort");
            } else if (behaviorState.mooseState === "crashed") {
              soundSystemRef.current.playMooseVocal("grunt");
            } else {
              soundSystemRef.current.playMooseVocal("grunt");
            }

            const actionExplanation = behaviorState.actionText;
            const hasMonkey = !!(opp.monkeyName && opp.monkeyName.trim() !== "");
            const tossedText = (monkeyBehavior === "tossed" && hasMonkey) 
              ? `The monkey rider ${opp.monkeyName} is thrown off and tossed wildly into the air!` 
              : "";

            const isWild = opp.isWildMoose || !opp.mooseName || opp.mooseName.trim() === "";
            const talkText = isWild
              ? `Nearby wild ${opp.mooseType} Moose charging. ${actionExplanation}`
              : `Nearby ${opp.mooseType} Moose ${opp.mooseName} charging. ${actionExplanation}`;
            speakAnimalNarrative(talkText.trim());
            setStatusMessage(`Moose behavior warning: ${isWild ? `Wild ${opp.mooseType} Moose` : opp.mooseName} status - ${behaviorState.mooseState.toUpperCase()}!`);

            return {
              ...opp,
              isCharging: true,
              speed: speedMultiplier,
              mooseState: mooseStateEnum,
              monkeyBehavior: monkeyBehavior
            };
          }
          return opp;
        })
      );

      if (nearMoose && (stateRef.current.chatterNotifications || chatterNotifications)) {
        speakAnimalNarrative("Opossum chattered near wildlife hotspot.");
      }
    } else {
      setStatusMessage("No hotspots on this level. Chatter has no charging effect.");
    }
  };

  // Synchronize current place ID with the Sound System
  useEffect(() => {
    if (soundSystemRef.current) {
      soundSystemRef.current.setPlaceId(currentLevel.placeId);
    }
  }, [currentLevel]);

  // Level Setup Spawner
  const startLevel = async (levelId: number) => {
    // Reset edible items count for each level cleanly
    setTicksEaten(0);
    stateRef.current.ticksEaten = 0;

    let levelObj: any;
    
    // AI Arena Generation Logic
    const shouldGenerateAI = levelId > 0 && GeminiSystem.isReady() && (GeminiSystem.getConfig()?.generateLevelsOnDemand ?? true);
    if (shouldGenerateAI) {
      setIsAiGenerating(true);
      setAiProgressPercent(10);
      setAiLoadingStatus("Connecting to Gemini AI Engine...");
      try {
        // If we are at the start of a new 3-level arena block, generate a new arena
        const arenaId = Math.floor((levelId - 1) / 3);
        const levelInArena = (levelId - 1) % 3;
        
        let arena = currentArena;
        if (!arena || arena.id !== arenaId) {
          arena = await GeminiSystem.Arenas.generateArena(arenaId, (percent, status) => {
            setAiProgressPercent(percent);
            setAiLoadingStatus(status);
          });
          setCurrentArena(arena);
        } else {
          setAiProgressPercent(100);
          setAiLoadingStatus("Arena Ready!");
        }
        
        const aiLevel = arena.levels[levelInArena];
        levelObj = {
          ...aiLevel,
          targetDistance: (1500 + levelId * 300) * 0.7, // Keep length calculation consistent
          tickDensity: 6 + (levelId % 8),
          opponentFrequency: 0.5 + (levelId * 0.15),
          colorHue: (levelId * 73) % 360
        };
      } catch (e) {
        console.error("AI Level Generation Failed, falling back to local:", e);
        setAiProgressPercent(100);
        setAiLoadingStatus("Applying Fallback Wilderness Arena...");
        levelObj = generateLevel(levelId);
      } finally {
        setTimeout(() => {
          setIsAiGenerating(false);
        }, 300);
      }
    } else {
      levelObj = generateLevel(levelId);
    }

    setCurrentLevel(levelObj);
    currentLevelRef.current = levelObj;
    setCurrentLevelId(levelId);
    stateRef.current.currentLevelId = levelId;
    
    const placeCheck = PlaceResolver.resolvePlace(levelObj.placeId, levelObj.name);
    
    // Spawn Ticks/Treats, Obstacles, and Opponents via modular Spawner engine
    const spawnedTicks = Spawner.spawnTicks(levelObj, levelId);
    const spawnedObstacles = Spawner.spawnObstacles(levelObj, levelId);
    const spawnedOpponents = Spawner.spawnOpponents(levelObj, levelId, selectedOpossumRef.current.id);
    const spawnedAnimals = Spawner.spawnAnimals(levelObj);

    setTicks(spawnedTicks);
    setObstacles(spawnedObstacles);
    setOpponents(spawnedOpponents);
    setAnimals(spawnedAnimals);

    // Reset player positioning
    setPlayerZ(0);
    setPlayerLane(0);
    setVisualLaneX(0);
    setPlayerY(0);
    setIsJumping(false);
    setJumpProgress(0);
    setSpeed(0);

    stateRef.current.playerZ = 0;
    stateRef.current.playerLane = 0;
    stateRef.current.visualLaneX = 0;
    stateRef.current.playerY = 0;
    stateRef.current.isJumping = false;
    stateRef.current.jumpProgress = 0;
    stateRef.current.speed = 0;
    stateRef.current.isGameOver = false;
    stateRef.current.isPressingForward = false;
    stateRef.current.isPressingBackward = false;

    if (levelId === 0) {
      stateRef.current.foyerX = 1000;
      stateRef.current.foyerY = 1000;
      stateRef.current.foyerDirection = "North";
      stateRef.current.doorOpenProgress = 0;
      stateRef.current.doorsOpen = false;
      stateRef.current.announcedZone = "foyer";
      setFoyerX(1000);
      setFoyerY(1000);
      setFoyerDirection("North");

      if (soundSystemRef.current) {
        soundSystemRef.current.stopBGM();
      }

      const characterName = defaultRider?.name || "Fairy-Rider";
      const opossumName = selectedOpossum?.name || "Melissa";
      const foyerDimStr = MeasurementEngine.formatDistance(2000, stateRef.current.isImperial, true);
      const foyerHeightStr = MeasurementEngine.formatHeight(30, 0, stateRef.current.isImperial);
      const placeDescription = `${levelObj.name}, a ${foyerDimStr} by ${foyerDimStr} grand entrance foyer with orange and purple ceramic tile flooring and ${foyerHeightStr} high vaulted ceilings`;
      const opossumDescription = `a ${selectedOpossum?.gender || "Female"} opossum with ${selectedOpossum?.color || "gray"} hair and ${selectedOpossum?.tailColor || "pink"} tail`;

      const welcomeMessage = `Welcome to Opossum Ride Adventure! A computer game from Fairies Dreams & Fantasy. Press the 'Ctrl' key to stop speech at anytime. You as ${characterName} is riding ${opossumName} the opossum in the ${placeDescription} ${opossumDescription}. Use the 'Up' key to go forward. Use the 'Left' key to turn left; 'Right' key to turn right. Use the 'Down' key to decelerate/reverse. The space bar is for jumping. Depending on which keyboard layout what you are using... 'A-S-D-W' keys are used as arrow keys for the 'Arden Denis' keyboard layout. The 'Cedella' keyboard layout as a default always use arrow keys for movement. To hear an opossum's chatter; press the 'S' key for Cedella, or 'L' for Arden Denis keyboard layouts. The 'R' key is used for getting information about an opossum what you are riding. The 'T' key is used for toggling between rider and POV modes (if you still have vision, or if any of your friends are watching you play a game. To get HUD information; press the '3' key. To change measurement system; press the '4' key. These useful tools above your game view are used for other functions. If you like to take a break from playing this game, and come back later, press Shift-7 via your main keys to pause/resume the game. Fulljoy your fun, and happy riding!`;

      speakWords(welcomeMessage);
      setStatusMessage(`Entering Stage 0: ${levelObj.name}`);
    } else {
      // Speak stage enter with precise surface and reverb profile definitions rather than static placeholder values
      const isGardenSubarena = placeCheck.id === "garden" || placeCheck.id.includes("garden") || placeCheck.id.includes("maze") || placeCheck.id.includes("sanctuary") || placeCheck.id.includes("glasshouse");
      const reverbProfileName = placeCheck.id === "cave" ? "Cave" : (isGardenSubarena ? "Plain" : placeCheck.id.charAt(0).toUpperCase() + placeCheck.id.slice(1).replace(/_/g, " "));
      speakWords(`Entering Level ${levelId}: ${levelObj.name}. Target distance ${Measured_Distance_Value(levelObj.targetDistance)}. Surface: ${placeCheck.surfaceType}. Reverb profile: ${reverbProfileName}. Begin riding!`);
      setStatusMessage(`Entering Stage ${levelId}: ${levelObj.name}`);

      if (soundSystemRef.current) {
        soundSystemRef.current.setPlaceId(placeCheck.id);
        soundSystemRef.current.playBGM();
      }
    }
  };

  // Launch initial level on start representing Level 0 spawning
  useEffect(() => {
    startLevel(0);
    // As a game start; the DOM must focus a native screen-reader focus via a local computer (without arbitrary announcements) to the canvas element.
    if (canvasRef.current) {
      canvasRef.current.focus();
    }
  }, []);

  // Keyboard Event Handlers based on Cedella / Arden Denis mappings
  const keyHistoryRef = useRef<{ key: string; timestamp: number }[]>([]);
  const doubleTapTimerRef = useRef<any>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Suppress game steering & character actions when focus is inside Menu Bar, dialogs, modals, or form controls
      if (Input.Keyboard.General.isFormOrMenuFocused()) {
        return;
      }

      const selectedOpossum = selectedOpossumRef.current;
      const currentLevel = currentLevelRef.current;
      const localAnimals = animalsRef.current;

      // 1. Global Ctrl speech cancel
      if (KeyboardSystem.handleGlobalCtrlCancel(e)) {
        if (e.key === "Control") return;
      }

      // 2. Unit toggle (key 4)
      if (KeyboardSystem.handleUnitToggle(e, stateRef.current.isImperial, (nextVal) => {
        stateRef.current.isImperial = nextVal;
        setIsImperial(nextVal);
        speakWords(`Measurement unit set to ${nextVal ? "Imperial (feet)" : "Metric (meters)"}`);
        setStatusMessage(`Unit: ${nextVal ? "Imperial (ft)" : "Metric (m)"}`);
      })) {
        return;
      }

      // 3. Cruise Control handling (] / [ / 0 on Cedella, i / k / 0 on Arden Denis)
      if (KeyboardSystem.handleCruiseControl(
        e, 
        layout, 
        stateRef.current.cruiseSpeed, 
        stateRef.current.isPlaying && !stateRef.current.isGameOver, 
        (nextCruise, statusText) => {
          stateRef.current.cruiseSpeed = nextCruise;
          speakWords(statusText);
          setStatusMessage(statusText);
        }
      )) {
        return;
      }

      // Prevent scrolling defaults except inside forms/lists
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " ", "Space", "Spacebar"].includes(e.key) || e.code === "Space" || e.code?.startsWith("Arrow")) {
        e.preventDefault();
      }

      // 4. Multi-tap 'a' (Cedella) or 'u' (Arden Denis) for double-tap description and triple-tap position
      const handledMultiTap = keyTapManagerRef.current.handleMultiTapKey(
        e.key,
        layout,
        () => handleAudioDescription(),
        () => {
          const activeLevel = currentLevelRef.current;
          const lId = stateRef.current.currentLevelId;
          const distProgress = Measured_Distance_Value(stateRef.current.playerZ);
          const segment = getCourseSegmentDirection(stateRef.current.playerZ);
          const basePosition = InGameAccessibility.Narration.compilePositionAnnouncement(
            lId,
            activeLevel.name,
            activeLevel.placeId,
            stateRef.current.foyerX,
            stateRef.current.foyerY,
            stateRef.current.foyerDirection,
            stateRef.current.playerZ,
            distProgress,
            segment.direction
          );

          const forwardObstacle = computeForwardNavigationTarget({
            currentLevel: lId,
            foyerX: stateRef.current.foyerX,
            foyerY: stateRef.current.foyerY,
            foyerDirection: stateRef.current.foyerDirection,
            isImperial: stateRef.current.isImperial || isImperial,
            courseProgressDistance: stateRef.current.playerZ
          });

          speakWords(`${basePosition} ${forwardObstacle}`);
        }
      );
      if (handledMultiTap) return;

      // 5. Shift+Z double-tap for TTS toggle
      if (keyTapManagerRef.current.handleShiftZTtsToggle(e)) {
        const nextTts = !isSpeechEnabled();
        setSpeechEnabled(nextTts);
        setTtsEnabled(nextTts);
        if (nextTts) {
          speakWords("Text to speech enabled");
          setStatusMessage("Text to speech enabled (Shift-Z-Z)");
        } else {
          setSpeechEnabled(true);
          speakWords("Text to speech disabled");
          setSpeechEnabled(false);
          setTtsEnabled(false);
          setStatusMessage("Text to speech disabled (Shift-Z-Z)");
        }
        return;
      }

      // Look up action binding using the modular Input Engine
      const binding = Input.Keyboard.findBinding(e, layout);

      if (!binding) return;

      switch (binding.action) {
        case "strafe_left": {
          if (!stateRef.current.isPlaying) break;
          if (stateRef.current.currentLevelId === 0) {
            const dirs = ["North", "East", "South", "West"];
            const idx = dirs.indexOf(stateRef.current.foyerDirection);
            const nextIdx = (idx + 3) % 4; // Counter-clockwise turn
            const nextDir = dirs[nextIdx];
            stateRef.current.foyerDirection = nextDir;
            setFoyerDirection(nextDir);
            speakWords(nextDir); // Announce the compass direction turned to
            setStatusMessage(`Facing: ${nextDir}`);
          } else {
            // ALGORITHM: If a course requires strafing, turning is disabled.
            const nextLane = SystemRegistry.Engine.Mathematics.Utils.max(-1, stateRef.current.playerLane - 1);
            if (nextLane !== stateRef.current.playerLane) {
              stateRef.current.playerLane = nextLane;
              setPlayerLane(nextLane);
            }
          }
          break;
        }
        case "strafe_right": {
          if (!stateRef.current.isPlaying) break;
          if (stateRef.current.currentLevelId === 0) {
            const dirs = ["North", "East", "South", "West"];
            const idx = dirs.indexOf(stateRef.current.foyerDirection);
            const nextIdx = (idx + 1) % 4; // Clockwise turn
            const nextDir = dirs[nextIdx];
            stateRef.current.foyerDirection = nextDir;
            setFoyerDirection(nextDir);
            speakWords(nextDir); // Announce the compass direction turned to
            setStatusMessage(`Facing: ${nextDir}`);
          } else {
            // ALGORITHM: If a course requires strafing, turning is disabled.
            const nextLane = SystemRegistry.Engine.Mathematics.Utils.min(1, stateRef.current.playerLane + 1);
            if (nextLane !== stateRef.current.playerLane) {
              stateRef.current.playerLane = nextLane;
              setPlayerLane(nextLane);
            }
          }
          break;
        }
        case "move_forward": {
          if (!stateRef.current.isPlaying) break;
          e.preventDefault();
          stateRef.current.keyboardForward = true;
          stateRef.current.isPressingForward = true;
          break;
        }
        case "move_reverse": {
          if (!stateRef.current.isPlaying) break;
          e.preventDefault();
          stateRef.current.keyboardBackward = true;
          stateRef.current.isPressingBackward = true;
          break;
        }
        case "jump": {
          if (!stateRef.current.isPlaying) break;
          e.preventDefault();
          // Scientific jump logic: if the key is held down (e.repeat is true) and we are already in the air,
          // do not reset the jump in mid-air. This avoids rapidly repeating jumping/shaking, while allowing
          // press-and-hold to naturally trigger a new jump as soon as the landing is completed.
          // Physical multi-taps (e.repeat is false) still trigger zero-latency overrides.
          if (e.repeat && stateRef.current.isJumping) {
            break;
          }

          // Play swoosh and jump sound immediately on every keypress for zero-latency feedback
          if (selectedOpossumRef.current.isAI) {
            const aiSex = selectedOpossumRef.current.aiData?.sex || (selectedOpossumRef.current.gender === "Male" ? "Jack" : "Jill");
            const aiSource = selectedOpossumRef.current.aiData?.vocalSource || "Cloud Network Synthesis";
            soundSystemRef.current.playAIOpossumJump(aiSex, aiSource);
          } else {
            playProceduralSound("jump");
          }

          // Reset jumpProgress to 0 to support both single presses and rapid multi-tap chain jumping seamlessly
          stateRef.current.isJumping = true;
          stateRef.current.jumpProgress = 0;
          setIsJumping(true);
          break;
        }
        case "chatter": {
          triggerChatter();
          break;
        }
        case "announce_opossum": {
          const op = selectedOpossumRef.current;
          const announcement = InGameAccessibility.Narration.compileRiddenOpossumProfile(op);
          speakWords(announcement);
          break;
        }
        case "announce_rider": {
          const rider = defaultRiderRef.current;
          const announcement = InGameAccessibility.Narration.compileRiderPersonProfile(rider);
          speakWords(announcement);
          break;
        }
        case "announce_hud": {
          const lId = stateRef.current.currentLevelId;
          const pz = stateRef.current.playerZ;
          const limit = currentLevelRef.current.targetDistance;
          const scoreVal = stateRef.current.score;
          const ticksVal = stateRef.current.ticksEaten;
          const itemLabel = getEdibleItemName(lId);
          
          let aiText = "";
          if (GeminiSystem.isReady()) {
            const quota = GeminiSystem.getQuotaStatus();
            aiText = ` AI provider status: ${quota.current} of ${quota.max} scientific units remaining.`;
          }
          
          speakWords(`HUD profile: Level ${lId}. Distance equals ${Measured_Distance_Value(pz)} of ${Measured_Distance_Value(limit)}. Speed is ${Measured_Speed_Value(stateRef.current.speed)}. Score is ${scoreVal}. ${itemLabel} collected is ${ticksVal}.${aiText}`);
          break;
        }
        case "toggle_view": {
          const nextMode =
            stateRef.current.viewMode === GameViewMode.RIDER
              ? GameViewMode.POV
              : GameViewMode.RIDER;
          stateRef.current.viewMode = nextMode;
          setViewMode(nextMode);
          speakWords(`Toggled to ${nextMode === GameViewMode.POV ? "First person POV" : "Third Person Rider View"}`);
          break;
        }
        case "scan_opponents": {
          // Find nearest opponent or feral pig
          let nearestTarget: any = null;
          let minDistance = Infinity;

          opponentsRef.current.forEach((opp) => {
            const distance = opp.z - stateRef.current.playerZ;
            if (distance > 0 && distance < minDistance) {
              minDistance = distance;
              nearestTarget = { type: "opponent", z: opp.z, data: opp };
            }
          });

          animalsRef.current.forEach((animal) => {
            if (animal.species === "feral_pig") {
              const distance = animal.z - stateRef.current.playerZ;
              if (distance > 0 && distance < minDistance) {
                minDistance = distance;
                nearestTarget = { type: "feral_pig", z: animal.z, data: animal };
              }
            }
          });

          if (nearestTarget) {
            if (nearestTarget.type === "feral_pig") {
              const pig = nearestTarget.data as AnimalItem;
              const genderLabel = pig.gender || "Boar";
              const coat = pig.coatColor || "Dark Brown";
              const laneStr = pig.lane === -1 ? "left lane" : (pig.lane === 1 ? "right lane" : "center lane");
              speakWords(
                `Scan reports: Nearest opponent is a ${genderLabel} Feral Pig with ${coat} coat in the ${laneStr}, ${Measured_Distance_Value(minDistance)} ahead.`
              );
            } else {
              const castOpp = nearestTarget.data as Opponent;
              const direction = castOpp.lane === -1 ? "left lane" : (castOpp.lane === 1 ? "right lane" : "center lane");
              const isWild = castOpp.isWildMoose || !castOpp.mooseName || castOpp.mooseName.trim() === "";
              const hasRider = !!(castOpp.monkeyName && castOpp.monkeyName.trim() !== "");

              if (isWild || !hasRider) {
                speakWords(
                  `Scan reports: Nearest opponent is a wild ${castOpp.mooseType} Moose in the ${direction}, ${Measured_Distance_Value(minDistance)} ahead.`
                );
              } else {
                const riderGender = (castOpp.monkeyGender || (castOpp.mooseType === "Bull" ? "Female" : "Male")).toLowerCase();
                speakWords(
                  `Scan reports: Nearest opponent is ${riderGender} monkey ${castOpp.monkeyName} riding ${castOpp.mooseType} Moose ${castOpp.mooseName} in the ${direction}, ${Measured_Distance_Value(minDistance)} ahead.`
                );
              }
            }
          } else {
            speakWords("No opponents detected in immediate vicinity.");
          }
          break;
        }
        case "toggle_chatter_notify": {
          const nextVal = !stateRef.current.chatterNotifications;
          setChatterNotifications(nextVal);
          speakWords(`Opossum chatter notifications ${nextVal ? "enabled" : "disabled"}`);
          break;
        }
        case "pause_resume": {
          setIsPlaying((prev) => {
            const next = !prev;
            stateRef.current.isPlaying = next;
            if (!next) {
              stateRef.current.isPressingForward = false;
              stateRef.current.isPressingBackward = false;
            }
            speakWords(next ? "Game Resumed" : "Game Paused");
            return next;
          });
          break;
        }
        case "toggle_feed": {
          setShowFeed((p) => {
            const next = !p;
            speakWords(next ? "Live feed log visible" : "Live feed log hidden");
            return next;
          });
          break;
        }
        default:
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (Input.Keyboard.General.isFormOrMenuFocused()) {
        return;
      }

      const binding = Input.Keyboard.findBinding(e, layout);
      if (!binding) return;

      if (binding.action === "move_forward") {
        stateRef.current.keyboardForward = false;
        stateRef.current.isPressingForward = false;
      } else if (binding.action === "move_reverse") {
        stateRef.current.keyboardBackward = false;
        stateRef.current.isPressingBackward = false;
      }
    };

    const handleBlur = () => {
      stateRef.current.keyboardForward = false;
      stateRef.current.keyboardBackward = false;
      stateRef.current.isPressingForward = false;
      stateRef.current.isPressingBackward = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", handleBlur);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", handleBlur);
    };
  }, [layout]);

  // Main High-Precision Physics Game Loop & Render Loop
  useEffect(() => {
    let animationFrameId: number;
    let frameRateCounter = 0;

    const gameLoop = (timestamp: number) => {
      const selectedOpossum = selectedOpossumRef.current;
      const defaultRider = defaultRiderRef.current;
      const currentLevel = currentLevelRef.current;
      const localOpponents = opponentsRef.current;
      const localTicks = ticksRef.current;
      const localObstacles = obstaclesRef.current;
      const localAnimals = animalsRef.current;

      if (!stateRef.current.lastTime) {
        stateRef.current.lastTime = timestamp;
      }
      const rawDelta = (timestamp - stateRef.current.lastTime) / 1000;
      const delta = deltaFilterRef.current.smooth(rawDelta);
      stateRef.current.lastTime = timestamp;

      if (!stateRef.current.isGameOver && stateRef.current.isPlaying) {
        // [SMART CHATTER]
        // Scientifically tuned automated chatter algorithm to ensure craftsmanship and avoid overwhelming the player
        const isHotspotEnv = currentLevel.placeId === "cave" || currentLevel.placeId === "plain" || currentLevel.placeId === "plains" || currentLevel.placeId === "forest" || currentLevel.placeId === "mountains";
        const gameTimeSeconds = timestamp / 1000;
        
        if (evaluateSmartChatter(gameTimeSeconds, smartChatterStateRef.current, isHotspotEnv, delta)) {
          triggerChatter();
        }
      }

      const canvas = canvasRef.current;
      if (!canvas) {
        animationFrameId = requestAnimationFrame(gameLoop);
        return;
      }

      // Safe virtual CPU clock cycles computation throttled to avoid memory spikes
      frameRateCounter++;
      if (frameRateCounter % 12 === 0) {
        const fps = delta > 0 ? Math.min(120, 1 / delta) : 60;
        const isHighLoadStatus = Math.abs(stateRef.current.speed) > 8 || stateRef.current.isJumping;
        cpuControllerRef.current.updateCycles(fps, isHighLoadStatus, obstacles.length, is3D, viewMode, 6, 0.48);
      }

      // Retrieve modern & classic controller inputs using modular hardware drivers
      const xboxInput = XboxControllerManager.getXboxInput();
      const psInput = PlayStationControllerManager.getPlayStationInput();
      const nintendoInput = NintendoControllerManager.getNintendoInput();
      const wiiInput = WiiControllerManager.getWiiInput();

      const controllerForward = (xboxInput?.leftStick.y ?? 0) < -0.3 || (xboxInput?.dpad.up ?? false) ||
                                (psInput?.leftStick.y ?? 0) < -0.3 || (psInput?.dpad.up ?? false) ||
                                (nintendoInput?.leftStick.y ?? 0) < -0.3 || (nintendoInput?.dpad.up ?? false) ||
                                (wiiInput?.forward ?? false);

      const controllerBackward = (xboxInput?.leftStick.y ?? 0) > 0.3 || (xboxInput?.dpad.down ?? false) ||
                                 (psInput?.leftStick.y ?? 0) > 0.3 || (psInput?.dpad.down ?? false) ||
                                 (nintendoInput?.leftStick.y ?? 0) > 0.3 || (nintendoInput?.dpad.down ?? false) ||
                                 (wiiInput?.backward ?? false);

      const controllerLeft = (xboxInput?.leftStick.x ?? 0) < -0.4 || (xboxInput?.dpad.left ?? false) ||
                             (psInput?.leftStick.x ?? 0) < -0.4 || (psInput?.dpad.left ?? false) ||
                             (nintendoInput?.leftStick.x ?? 0) < -0.4 || (nintendoInput?.dpad.left ?? false) ||
                             (wiiInput?.left ?? false);

      const controllerRight = (xboxInput?.leftStick.x ?? 0) > 0.4 || (xboxInput?.dpad.right ?? false) ||
                              (psInput?.leftStick.x ?? 0) > 0.4 || (psInput?.dpad.right ?? false) ||
                              (nintendoInput?.leftStick.x ?? 0) > 0.4 || (nintendoInput?.dpad.right ?? false) ||
                              (wiiInput?.right ?? false);

      const controllerJump = (xboxInput?.jump ?? false) || (psInput?.jump ?? false) || (nintendoInput?.jump ?? false) || (wiiInput?.jump ?? false);
      const controllerPause = (xboxInput?.pause ?? false) || (psInput?.pause ?? false) || (nintendoInput?.pause ?? false) || (wiiInput?.pause ?? false);

      // Blend forward/reverse input seamlessly
      stateRef.current.isPressingForward = controllerForward || stateRef.current.keyboardForward;
      stateRef.current.isPressingBackward = controllerBackward || stateRef.current.keyboardBackward;

      // Handle left lane change/steering transition
      if (controllerLeft) {
        if (!stateRef.current.controllerLeftPressed) {
          stateRef.current.controllerLeftPressed = true;
          if (stateRef.current.currentLevelId === 0) {
            const dirs = ["North", "East", "South", "West"];
            const idx = dirs.indexOf(stateRef.current.foyerDirection);
            const nextIdx = (idx + 3) % 4; // Turn counter-clockwise
            const nextDir = dirs[nextIdx];
            stateRef.current.foyerDirection = nextDir;
            setFoyerDirection(nextDir);
            speakWords(nextDir);
            setStatusMessage(`Facing: ${nextDir}`);
          } else {
            const nextLane = Math.max(-1, stateRef.current.playerLane - 1);
            if (nextLane !== stateRef.current.playerLane) {
              stateRef.current.playerLane = nextLane;
              setPlayerLane(nextLane);
            }
          }
        }
      } else {
        stateRef.current.controllerLeftPressed = false;
      }

      // Handle right lane change/steering transition
      if (controllerRight) {
        if (!stateRef.current.controllerRightPressed) {
          stateRef.current.controllerRightPressed = true;
          if (stateRef.current.currentLevelId === 0) {
            const dirs = ["North", "East", "South", "West"];
            const idx = dirs.indexOf(stateRef.current.foyerDirection);
            const nextIdx = (idx + 1) % 4; // Turn clockwise
            const nextDir = dirs[nextIdx];
            stateRef.current.foyerDirection = nextDir;
            setFoyerDirection(nextDir);
            speakWords(nextDir);
            setStatusMessage(`Facing: ${nextDir}`);
          } else {
            const nextLane = Math.min(1, stateRef.current.playerLane + 1);
            if (nextLane !== stateRef.current.playerLane) {
              stateRef.current.playerLane = nextLane;
              setPlayerLane(nextLane);
            }
          }
        }
      } else {
        stateRef.current.controllerRightPressed = false;
      }

      // Handle parabolic jump
      if (controllerJump) {
        if (!stateRef.current.controllerJumpPressed) {
          stateRef.current.controllerJumpPressed = true;
          if (!stateRef.current.isJumping && stateRef.current.isPlaying && !stateRef.current.isGameOver) {
            WiiControllerManager.triggerRumble(100);
            if (selectedOpossumRef.current.isAI) {
              const aiSex = selectedOpossumRef.current.aiData?.sex || (selectedOpossumRef.current.gender === "Male" ? "Jack" : "Jill");
              const aiSource = selectedOpossumRef.current.aiData?.vocalSource || "Cloud Network Synthesis";
              soundSystemRef.current.playAIOpossumJump(aiSex, aiSource);
            } else {
              playProceduralSound("jump");
            }
            stateRef.current.isJumping = true;
            stateRef.current.jumpProgress = 0;
            setIsJumping(true);
          }
        }
      } else {
        stateRef.current.controllerJumpPressed = false;
      }

      // Handle game pause
      if (controllerPause) {
        if (!stateRef.current.controllerPausePressed) {
          stateRef.current.controllerPausePressed = true;
          setIsPlaying((prev) => {
            const next = !prev;
            stateRef.current.isPlaying = next;
            if (!next) {
              stateRef.current.isPressingForward = false;
              stateRef.current.isPressingBackward = false;
            } else {
              stateRef.current.lastTime = performance.now();
            }
            speakWords(next ? "Game Resumed" : "Game Paused");
            return next;
          });
        }
      } else {
        stateRef.current.controllerPausePressed = false;
      }

      // Physics logic
      if (stateRef.current.isPlaying && !stateRef.current.isGameOver) {
        if (stateRef.current.currentLevelId === 0) {
          updateFoyerPhysics(
            delta,
            stateRef,
            localTicks,
            setTicks,
            setTicksEaten,
            setScore,
            setSpeed,
            setFoyerX,
            setFoyerY,
            setPlayerZ,
            setPlayerY,
            setIsJumping,
            lastFootstepZRef,
            lastRenderedZRef,
            soundSystemRef,
            speakWords,
            setStatusMessage,
            playProceduralSound as (type: string) => void,
            startLevel,
            announceDoors,
            selectedOpossum
          );
        } else {
          updateStandardPhysics(
            delta,
            stateRef,
            currentLevel,
            localTicks,
            localObstacles,
            localOpponents,
            localAnimals,
            setTicks,
            setOpponents,
            setAnimals,
            setTicksEaten,
            setScore,
            setSpeed,
            setPlayerZ,
            setPlayerY,
            setIsJumping,
            lastFootstepZRef,
            lastRenderedZRef,
            soundSystemRef,
            speakWords,
            setStatusMessage,
            playProceduralSound as (type: string) => void,
            startLevel,
            getEdibleItemName,
            selectedOpossum,
            completeLevelSave,
            announceSteering
          );
        }
      }

      // Drawing calculations
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const width = canvas.width;
        const height = canvas.height;

        // Check special visual modes: Visuals OFF or Chalkboard Only
        if (activeVisualPref === "Visuals OFF") {
          ctx.fillStyle = "#000000";
          ctx.fillRect(0, 0, width, height);
          ctx.fillStyle = "#22c55e";
          ctx.font = "bold 16px monospace";
          ctx.textAlign = "center";
          ctx.fillText("AUDIO ONLY MODE ACTIVE (VISUALS OFF)", width / 2, height / 2 - 10);
          ctx.fillStyle = "#a1a1aa";
          ctx.font = "12px monospace";
          ctx.fillText("Press 't' to hear status narration or use arrow keys to navigate", width / 2, height / 2 + 15);
        } else if (activeVisualPref === "Chalkboard Only") {
          ctx.fillStyle = chalkboardConfig.bgHex;
          ctx.fillRect(0, 0, width, height);
          ctx.strokeStyle = chalkboardConfig.lineHex;
          ctx.lineWidth = 2;

          render2DView(
            ctx,
            width,
            height,
            currentLevel,
            {
              foyerX: stateRef.current.foyerX,
              foyerY: stateRef.current.foyerY,
              doorOpenProgress: stateRef.current.doorOpenProgress,
              foyerDirection: stateRef.current.foyerDirection,
              playerZ: stateRef.current.playerZ,
              visualLaneX: stateRef.current.visualLaneX,
              playerY: stateRef.current.playerY
            },
            localTicks,
            localObstacles,
            localOpponents,
            localAnimals,
            selectedOpossum,
            defaultRider,
            true // force wireframe outlines
          );
        } else if (is3D) {
          const horizonY = height * VISUAL_CONSTANTS.CAMERA.DEFAULT_HORIZON_RATIO;
          const focalLength = VISUAL_CONSTANTS.CAMERA.DEFAULT_FOCAL_LENGTH;

          if (currentLevel.id === 0) {
            renderFoyer3D(
              ctx,
              width,
              height,
              horizonY,
              height - horizonY,
              stateRef.current.foyerX,
              stateRef.current.foyerY,
              stateRef.current.doorOpenProgress,
              localTicks,
              wireframe,
              viewMode,
              selectedOpossum,
              defaultRider
            );
          } else {
            renderStandardLevel(
              ctx,
              width,
              height,
              horizonY,
              focalLength,
              stateRef.current.visualLaneX,
              viewMode === GameViewMode.POV ? 2.5 : 5.5,
              viewMode === GameViewMode.POV ? stateRef.current.playerZ : stateRef.current.playerZ - 14,
              localTicks,
              localObstacles,
              localOpponents,
              localAnimals,
              currentLevel,
              wireframe,
              viewMode,
              selectedOpossum,
              defaultRider,
              stateRef.current.playerY,
              filterEngineRef.current.project3D,
              stateRef.current
            );
          }
        } else {
          // Alternative 2-D Top-Down Orthographic Blueprint map renderer
          render2DView(
            ctx,
            width,
            height,
            currentLevel,
            {
              foyerX: stateRef.current.foyerX,
              foyerY: stateRef.current.foyerY,
              doorOpenProgress: stateRef.current.doorOpenProgress,
              foyerDirection: stateRef.current.foyerDirection,
              playerZ: stateRef.current.playerZ,
              visualLaneX: stateRef.current.visualLaneX,
              playerY: stateRef.current.playerY
            },
            localTicks,
            localObstacles,
            localOpponents,
            localAnimals,
            selectedOpossum,
            defaultRider,
            wireframe
          );
        }

        // Apply visual custom filters (Pixelation, Grayscale, Color post-processing)
        filterEngineRef.current.applyPostFilters(ctx, width, height, {
          is3D,
          pixelationBlockSize: pixelation,
          palette,
          useWireframePolygons: wireframe
        });
      }

      animationFrameId = requestAnimationFrame(gameLoop);
    };

    animationFrameId = requestAnimationFrame(gameLoop);
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying, viewMode, currentLevelId, is3D, pixelation, palette, wireframe]);

  const menuBarProps = {
    activeMenu,
    setActiveMenu,
    activeSubMenu,
    setActiveSubMenu,
    activeVisualPref,
    handleVisualPrefChange,
    colorDotMatrix,
    setColorDotMatrix,
    setPalette,
    is3D,
    setIs3D,
    wireframe,
    setWireframe,
    palette,
    pixelation,
    setPixelation,
    ttsEnabled,
    setTtsEnabled,
    announceDoors,
    setAnnounceDoors,
    announceReverb,
    setAnnounceReverb,
    extendedInfo,
    setExtendedInfo,
    chatterNotifications,
    setChatterNotifications,
    announceSteering,
    setAnnounceSteering,
    announceMooseSmash,
    setAnnounceMooseSmash,
    musicEnabled,
    setMusicEnabled,
    showVisualHUD,
    setShowVisualHUD,
    showOpponentIndicators,
    setShowOpponentIndicators,
    showFeed,
    setShowFeed,
    viewMode,
    setViewMode,
    layout,
    handleLayoutChange,
    canvasRef,
    stateRef,
    speakWords,
    setStatusMessage,
    isSpeechEnabled,
    setSpeechEnabled,
    genericCrashSound,
    setGenericCrashSound,
    largeText,
    setLargeText,
    chalkboardConfig,
    setChalkboardConfig,
    onOpenThemeModal: () => setShowThemeModal(true),
    customTrackId,
    onSetCustomTrack: (trackId: string | null) => {
      setCustomTrackId(trackId);
      if (trackId !== null) {
        setMusicEnabled(true);
      }
      if (soundSystemRef.current) {
        soundSystemRef.current.setCustomTrack(trackId);
      }
    }
  };

  const hudProps = {
    themeId: currentTheme,
    currentLevelId,
    currentLevel,
    playerZ,
    score,
    ticksEaten,
    Measured_Distance_Value,
    getEdibleItemName,
    largeText
  };

  const commonCanvas = (
    <div
      id="Game_Canvas_Container"
      style={{
        borderWidth: currentTheme === "garden" || currentTheme === "storybook" ? "16px" : "12px",
        borderColor: currentTheme === "garden" ? "#065f46" : (currentTheme === "storybook" ? "#be185d" : "LightGray"),
        backgroundColor: "#000000",
        textAlign: "center",
        display: "block",
        borderRadius: currentTheme === "garden" ? "16px" : (currentTheme === "storybook" ? "12px" : "6px")
      }}
      className="relative overflow-hidden w-full h-[380px] md:h-[420px] shadow-2xl"
    >
      <canvas
        ref={canvasRef}
        tabIndex={0}
        autoFocus
        width={840}
        height={400}
        style={{
          backgroundColor: "#000000",
          display: "block",
          textAlign: "center",
          borderColor: "#000000",
          width: "100%",
          height: "100%",
          filter: isAiGenerating ? "blur(4px) grayscale(50%)" : "none"
        }}
        aria-label="Opossum Ride Adventure Game View"
        role="img"
      />

      {currentArena && !isAiGenerating && (
        <AIErrorBoundary moduleName="AIGeneratedPlace"><AIGeneratedPlace arena={currentArena as any} /></AIErrorBoundary>
      )}

      {currentLevel && currentLevel.id > 0 && GeminiSystem.isReady() && !isAiGenerating && (
        <AIErrorBoundary moduleName="AIGeneratedLevel">
          <div className="absolute inset-0 pointer-events-none mix-blend-overlay">
             <AIGeneratedLevel config={currentLevel as any} />
          </div>
        </AIErrorBoundary>
      )}

      {isAiGenerating && (
        <ArenaLoadingOverlay 
          progressPercent={aiProgressPercent}
          loadingStatus={aiLoadingStatus}
        />
      )}

      {currentTheme !== "immersion_ultra" && (
        <VisualHUD 
          showVisualHUD={showVisualHUD}
          defaultRider={defaultRider}
          selectedOpossum={selectedOpossum}
          currentLevel={currentLevel}
          largeText={largeText}
        />
      )}

      {!isPlaying && (
        <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center border border-green-900 z-30">
          <p className="text-3xl font-extrabold text-green-300 uppercase tracking-widest animate-pulse filter drop-shadow-[0_0_8px_rgba(0,250,0,0.4)]">
            Game Paused
          </p>
          <p className="text-xs text-green-600 mt-2 font-mono">
            Press Shift+7 / &amp; to resume riding.
          </p>
        </div>
      )}
    </div>
  );

  const statusFeedComponent = (
    <StatusFeed 
      showFeed={showFeed}
      statusMessage={statusMessage}
      opponents={opponents}
      playerZ={playerZ}
      playerSpeed={Math.abs(stateRef.current.speed)}
      opponentZFallback={playerZ + 50}
    />
  );

  let activeMenuBar: React.ReactNode;
  if (currentTheme === "quilted") {
    activeMenuBar = <QuiltedMenuBar {...menuBarProps} onReturnToLandingPage={onExitGame} />;
  } else if (currentTheme === "garden") {
    activeMenuBar = <GardenMenuBar {...menuBarProps} onReturnToLandingPage={onExitGame} />;
  } else if (currentTheme === "forest") {
    activeMenuBar = <ForestMenuBar {...menuBarProps} onReturnToLandingPage={onExitGame} />;
  } else if (currentTheme === "storybook") {
    activeMenuBar = <StorybookMenuBar {...menuBarProps} onReturnToLandingPage={onExitGame} />;
  } else if (currentTheme === "immersion_low" || currentTheme === "immersion_ultra") {
    activeMenuBar = <ImmersionLowMenuBar {...menuBarProps} onReturnToLandingPage={onExitGame} />;
  } else {
    activeMenuBar = <MenuBar {...menuBarProps} />;
  }

  const ThemeContainer = 
    currentTheme === "light" ? ThemeLight :
    currentTheme === "quilted" ? ThemeQuilted :
    currentTheme === "garden" ? ThemeGarden :
    currentTheme === "forest" ? ThemeForest :
    currentTheme === "storybook" ? ThemeStorybook :
    currentTheme === "immersion_low" ? ThemeImmersionLow :
    currentTheme === "immersion_ultra" ? ThemeImmersionUltra :
    ThemeDark;

  const showHeader = currentTheme === "dark" || currentTheme === "light" || currentTheme === "quilted";

  // Dedicated Mobile Portrait Phone layout: Exclusive for mobile phones held vertically
  if (isMobilePortraitPhone) {
    return (
      <div className="w-full min-h-screen bg-black text-green-400">
        <MobilePortrait4Phone
          selectedOpossum={selectedOpossum}
          defaultRider={defaultRider}
          onExitGame={onExitGame}
          currentLevelId={currentLevelId}
          currentLevel={currentLevel}
          playerZ={playerZ}
          score={score}
          ticksEaten={ticksEaten}
          Measured_Distance_Value={Measured_Distance_Value}
          getEdibleItemName={getEdibleItemName}
          canvasRef={canvasRef}
          onMoveLeft={() => {
            if (stateRef.current.currentLevelId === 0) {
              const dirs = ["North", "East", "South", "West"];
              const idx = dirs.indexOf(stateRef.current.foyerDirection);
              const nextIdx = (idx + 3) % 4;
              const nextDir = dirs[nextIdx];
              stateRef.current.foyerDirection = nextDir;
              setFoyerDirection(nextDir);
              speakWords(nextDir);
            } else {
              const nextLane = Math.max(-1, stateRef.current.playerLane - 1);
              if (nextLane !== stateRef.current.playerLane) {
                stateRef.current.playerLane = nextLane;
                setPlayerLane(nextLane);
                playProceduralSound("tick");
              }
            }
          }}
          onMoveRight={() => {
            if (stateRef.current.currentLevelId === 0) {
              const dirs = ["North", "East", "South", "West"];
              const idx = dirs.indexOf(stateRef.current.foyerDirection);
              const nextIdx = (idx + 1) % 4;
              const nextDir = dirs[nextIdx];
              stateRef.current.foyerDirection = nextDir;
              setFoyerDirection(nextDir);
              speakWords(nextDir);
            } else {
              const nextLane = Math.min(1, stateRef.current.playerLane + 1);
              if (nextLane !== stateRef.current.playerLane) {
                stateRef.current.playerLane = nextLane;
                setPlayerLane(nextLane);
                playProceduralSound("tick");
              }
            }
          }}
          onJump={() => {
            if (!stateRef.current.isJumping) {
              stateRef.current.isJumping = true;
              stateRef.current.jumpProgress = 0;
              setIsJumping(true);
              if (selectedOpossumRef.current.isAI) {
                const aiSex = selectedOpossumRef.current.aiData?.sex || (selectedOpossumRef.current.gender === "Male" ? "Jack" : "Jill");
                const aiSource = selectedOpossumRef.current.aiData?.vocalSource || "Cloud Network Synthesis";
                soundSystemRef.current.playAIOpossumJump(aiSex, aiSource);
              } else {
                playProceduralSound("jump");
              }
            }
          }}
          onMoveUpStart={() => {
            if (stateRef.current.isPlaying && !stateRef.current.isGameOver) {
              stateRef.current.keyboardForward = true;
              stateRef.current.isPressingForward = true;
            }
          }}
          onMoveUpEnd={() => {
            stateRef.current.keyboardForward = false;
            stateRef.current.isPressingForward = false;
          }}
          onMoveDownStart={() => {
            if (stateRef.current.isPlaying && !stateRef.current.isGameOver) {
              stateRef.current.keyboardBackward = true;
              stateRef.current.isPressingBackward = true;
            }
          }}
          onMoveDownEnd={() => {
            stateRef.current.keyboardBackward = false;
            stateRef.current.isPressingBackward = false;
          }}
          onSetCruiseLowStop={() => {
            if (stateRef.current.isPlaying && !stateRef.current.isGameOver) {
              stateRef.current.cruiseSpeed = Math.max(0, stateRef.current.cruiseSpeed - 5);
              const speedLabel = Measured_Speed_Value(stateRef.current.cruiseSpeed / 2.23694);
              if (stateRef.current.cruiseSpeed === 0) {
                speakWords("Cruise control stopped");
                setStatusMessage("Cruise: OFF");
              } else {
                speakWords(`Cruise control decreased to ${speedLabel}`);
                setStatusMessage(`Cruise: ${speedLabel}`);
              }
              playProceduralSound("tick");
            }
          }}
          onSetCruiseHigh={() => {
            if (stateRef.current.isPlaying && !stateRef.current.isGameOver) {
              stateRef.current.cruiseSpeed = Math.min(30, stateRef.current.cruiseSpeed + 5);
              const speedLabel = Measured_Speed_Value(stateRef.current.cruiseSpeed / 2.23694);
              speakWords(`Cruise control increased to ${speedLabel}`);
              setStatusMessage(`Cruise: ${speedLabel}`);
              playProceduralSound("tick");
            }
          }}
        />
      </div>
    );
  }

  // Dedicated Tablet Portrait Layout: 10% side bezels with botanical leaf ornaments & bottom control deck
  if (isTabletPortrait) {
    return (
      <div className="w-full min-h-screen bg-stone-950 text-emerald-400">
        <PortraitOrientation4Tablets
          selectedOpossum={selectedOpossum}
          defaultRider={defaultRider}
          onExitGame={onExitGame}
          currentLevelId={currentLevelId}
          currentLevel={currentLevel}
          playerZ={playerZ}
          score={score}
          ticksEaten={ticksEaten}
          Measured_Distance_Value={Measured_Distance_Value}
          getEdibleItemName={getEdibleItemName}
          canvasRef={canvasRef}
          isPlaying={isPlaying}
          onTogglePlayPause={() => {
            setIsPlaying((prev) => {
              const next = !prev;
              stateRef.current.isPlaying = next;
              return next;
            });
          }}
          onOpenMenu={() => setShowThemeModal(true)}
          onMoveLeft={() => {
            if (stateRef.current.currentLevelId === 0) {
              const dirs = ["North", "East", "South", "West"];
              const idx = dirs.indexOf(stateRef.current.foyerDirection);
              const nextIdx = (idx + 3) % 4;
              const nextDir = dirs[nextIdx];
              stateRef.current.foyerDirection = nextDir;
              setFoyerDirection(nextDir);
              speakWords(nextDir);
            } else {
              const nextLane = Math.max(-1, stateRef.current.playerLane - 1);
              if (nextLane !== stateRef.current.playerLane) {
                stateRef.current.playerLane = nextLane;
                setPlayerLane(nextLane);
                playProceduralSound("tick");
              }
            }
          }}
          onMoveRight={() => {
            if (stateRef.current.currentLevelId === 0) {
              const dirs = ["North", "East", "South", "West"];
              const idx = dirs.indexOf(stateRef.current.foyerDirection);
              const nextIdx = (idx + 1) % 4;
              const nextDir = dirs[nextIdx];
              stateRef.current.foyerDirection = nextDir;
              setFoyerDirection(nextDir);
              speakWords(nextDir);
            } else {
              const nextLane = Math.min(1, stateRef.current.playerLane + 1);
              if (nextLane !== stateRef.current.playerLane) {
                stateRef.current.playerLane = nextLane;
                setPlayerLane(nextLane);
                playProceduralSound("tick");
              }
            }
          }}
          onJump={() => {
            if (!stateRef.current.isJumping) {
              stateRef.current.isJumping = true;
              stateRef.current.jumpProgress = 0;
              setIsJumping(true);
              if (selectedOpossumRef.current.isAI) {
                const aiSex = selectedOpossumRef.current.aiData?.sex || (selectedOpossumRef.current.gender === "Male" ? "Jack" : "Jill");
                const aiSource = selectedOpossumRef.current.aiData?.vocalSource || "Cloud Network Synthesis";
                soundSystemRef.current.playAIOpossumJump(aiSex, aiSource);
              } else {
                playProceduralSound("jump");
              }
            }
          }}
          onMoveUpStart={() => {
            if (stateRef.current.isPlaying && !stateRef.current.isGameOver) {
              stateRef.current.keyboardForward = true;
              stateRef.current.isPressingForward = true;
            }
          }}
          onMoveUpEnd={() => {
            stateRef.current.keyboardForward = false;
            stateRef.current.isPressingForward = false;
          }}
          onMoveDownStart={() => {
            if (stateRef.current.isPlaying && !stateRef.current.isGameOver) {
              stateRef.current.keyboardBackward = true;
              stateRef.current.isPressingBackward = true;
            }
          }}
          onMoveDownEnd={() => {
            stateRef.current.keyboardBackward = false;
            stateRef.current.isPressingBackward = false;
          }}
          onSetCruiseLowStop={() => {
            if (stateRef.current.isPlaying && !stateRef.current.isGameOver) {
              stateRef.current.cruiseSpeed = Math.max(0, stateRef.current.cruiseSpeed - 5);
              const speedLabel = Measured_Speed_Value(stateRef.current.cruiseSpeed / 2.23694);
              if (stateRef.current.cruiseSpeed === 0) {
                speakWords("Cruise control stopped");
                setStatusMessage("Cruise: OFF");
              } else {
                speakWords(`Cruise control decreased to ${speedLabel}`);
                setStatusMessage(`Cruise: ${speedLabel}`);
              }
              playProceduralSound("tick");
            }
          }}
          onSetCruiseHigh={() => {
            if (stateRef.current.isPlaying && !stateRef.current.isGameOver) {
              stateRef.current.cruiseSpeed = Math.min(30, stateRef.current.cruiseSpeed + 5);
              const speedLabel = Measured_Speed_Value(stateRef.current.cruiseSpeed / 2.23694);
              speakWords(`Cruise control increased to ${speedLabel}`);
              setStatusMessage(`Cruise: ${speedLabel}`);
              playProceduralSound("tick");
            }
          }}
        />
      </div>
    );
  }

  // Dedicated Mobile Landscape Phone Layout: Night Sky themed bezel, amber anti-blue light border, custom ergonomic lateral decks
  if (isMobileLandscapePhone) {
    return (
      <div className="w-full min-h-screen bg-black text-amber-300">
        <MobileLandscape4Phones
          selectedOpossum={selectedOpossum}
          defaultRider={defaultRider}
          onExitGame={onExitGame}
          currentLevelId={currentLevelId}
          currentLevel={currentLevel}
          playerZ={playerZ}
          score={score}
          ticksEaten={ticksEaten}
          Measured_Distance_Value={Measured_Distance_Value}
          getEdibleItemName={getEdibleItemName}
          canvasRef={canvasRef}
          isPlaying={isPlaying}
          onTogglePlayPause={() => {
            setIsPlaying((prev) => {
              const next = !prev;
              stateRef.current.isPlaying = next;
              return next;
            });
          }}
          onOpenMenu={() => setShowThemeModal(true)}
          onMoveLeft={() => {
            if (stateRef.current.currentLevelId === 0) {
              const dirs = ["North", "East", "South", "West"];
              const idx = dirs.indexOf(stateRef.current.foyerDirection);
              const nextIdx = (idx + 3) % 4;
              const nextDir = dirs[nextIdx];
              stateRef.current.foyerDirection = nextDir;
              setFoyerDirection(nextDir);
              speakWords(nextDir);
            } else {
              const nextLane = Math.max(-1, stateRef.current.playerLane - 1);
              if (nextLane !== stateRef.current.playerLane) {
                stateRef.current.playerLane = nextLane;
                setPlayerLane(nextLane);
                playProceduralSound("tick");
              }
            }
          }}
          onMoveRight={() => {
            if (stateRef.current.currentLevelId === 0) {
              const dirs = ["North", "East", "South", "West"];
              const idx = dirs.indexOf(stateRef.current.foyerDirection);
              const nextIdx = (idx + 1) % 4;
              const nextDir = dirs[nextIdx];
              stateRef.current.foyerDirection = nextDir;
              setFoyerDirection(nextDir);
              speakWords(nextDir);
            } else {
              const nextLane = Math.min(1, stateRef.current.playerLane + 1);
              if (nextLane !== stateRef.current.playerLane) {
                stateRef.current.playerLane = nextLane;
                setPlayerLane(nextLane);
                playProceduralSound("tick");
              }
            }
          }}
          onJump={() => {
            if (!stateRef.current.isJumping) {
              stateRef.current.isJumping = true;
              stateRef.current.jumpProgress = 0;
              setIsJumping(true);
              if (selectedOpossumRef.current.isAI) {
                const aiSex = selectedOpossumRef.current.aiData?.sex || (selectedOpossumRef.current.gender === "Male" ? "Jack" : "Jill");
                const aiSource = selectedOpossumRef.current.aiData?.vocalSource || "Cloud Network Synthesis";
                soundSystemRef.current.playAIOpossumJump(aiSex, aiSource);
              } else {
                playProceduralSound("jump");
              }
            }
          }}
          onMoveUpStart={() => {
            if (stateRef.current.isPlaying && !stateRef.current.isGameOver) {
              stateRef.current.keyboardForward = true;
              stateRef.current.isPressingForward = true;
            }
          }}
          onMoveUpEnd={() => {
            stateRef.current.keyboardForward = false;
            stateRef.current.isPressingForward = false;
          }}
          onMoveDownStart={() => {
            if (stateRef.current.isPlaying && !stateRef.current.isGameOver) {
              stateRef.current.keyboardBackward = true;
              stateRef.current.isPressingBackward = true;
            }
          }}
          onMoveDownEnd={() => {
            stateRef.current.keyboardBackward = false;
            stateRef.current.isPressingBackward = false;
          }}
          onSetCruiseLowStop={() => {
            if (stateRef.current.isPlaying && !stateRef.current.isGameOver) {
              stateRef.current.cruiseSpeed = Math.max(0, stateRef.current.cruiseSpeed - 5);
              const speedLabel = Measured_Speed_Value(stateRef.current.cruiseSpeed / 2.23694);
              if (stateRef.current.cruiseSpeed === 0) {
                speakWords("Cruise control stopped");
                setStatusMessage("Cruise: OFF");
              } else {
                speakWords(`Cruise control decreased to ${speedLabel}`);
                setStatusMessage(`Cruise: ${speedLabel}`);
              }
              playProceduralSound("tick");
            }
          }}
          onSetCruiseHigh={() => {
            if (stateRef.current.isPlaying && !stateRef.current.isGameOver) {
              stateRef.current.cruiseSpeed = Math.min(30, stateRef.current.cruiseSpeed + 5);
              const speedLabel = Measured_Speed_Value(stateRef.current.cruiseSpeed / 2.23694);
              speakWords(`Cruise control increased to ${speedLabel}`);
              setStatusMessage(`Cruise: ${speedLabel}`);
              playProceduralSound("tick");
            }
          }}
        />
      </div>
    );
  }

  return (
    <ThemeContainer>
      {showThemeModal && (
        <ThemeSwitcherModal
          currentTheme={currentTheme}
          onSetTheme={(t) => setCurrentTheme(t)}
          onClose={() => setShowThemeModal(false)}
          speakWords={speakWords}
        />
      )}

      <div className="w-full h-full min-h-screen flex flex-col p-2 sm:p-4 md:p-6">
        {showHeader && (
          <header className="mb-3 flex flex-col md:flex-row items-center justify-between border-b border-green-800/60 pb-2 gap-2">
            <h1>
              <button
                type="button"
                onClick={onExitGame}
                className="text-xl md:text-2xl font-extrabold tracking-tight uppercase hover:opacity-80 transition cursor-pointer"
              >
                Opossum Ride Adventure
              </button>
            </h1>
          </header>
        )}

        <main className="flex-grow max-w-6xl mx-auto w-full flex flex-col gap-3">
          <style dangerouslySetInnerHTML={{__html: `
            @media (orientation: portrait) {
              #Game_Canvas_Container {
                width: 100vw !important;
                height: 47.6vw !important;
                transform: none !important;
                margin: 0 auto !important;
              }
            }
          `}} />

          {activeMenuBar}

          {currentTheme !== "storybook" && (
            <CraftedHUD {...hudProps} />
          )}

          {commonCanvas}

          {currentTheme === "storybook" && (
            <CraftedHUD {...hudProps} />
          )}

          {statusFeedComponent}
        </main>
      </div>
    </ThemeContainer>
  );
};
