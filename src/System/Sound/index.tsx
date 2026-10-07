/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { getSharedAudioContext, setGenericCrashSoundEnabled } from "./TTS";
import { DedicatedSFXSynthesizer } from "./SFX";
import {
  playWhenBabylonFalls,
  stopWhenBabylonFalls,
  globalGardenOfWisdomTrack,
  globalZenStoneGardenTrack,
  globalBotanicalMazeTrack,
  globalButterflySanctuaryTrack,
  globalOrchidGlasshouseTrack,
  globalEdibleBerryGardenTrack,
  globalTheGrandOrchardTrack,
  globalGardenAmbience,
  globalMountainsAmbience,
  globalCaveAmbience,
  globalFanfare
} from "./BGM";
import { OpossumSynthesizer } from "./Synthesizer";
import { PlaceResolver } from "../Engine/Resolver";
import { FeralPigMovementSound } from "./SFX/Category/Feral_Pig/Movements";
import {
  playProceduralWindChimes,
  playProceduralFountain,
  playProceduralWindmill
} from "./SFX/Category/Objects";
import {
  ReverbProfile,
  AlleyReverbProfile,
  ArenaReverbProfile,
  CarpetedHallwayReverbProfile,
  CaveReverbProfile,
  ForestReverbProfile,
  GenericReverbProfile,
  HallwayReverbProfile,
  HangerReverbProfile,
  MountainsReverbProfile,
  NoEffectReverbProfile,
  QuarryReverbProfile,
  StoneCorridorReverbProfile,
  StoneRoomReverbProfile
} from "./Reverb_Profile";

// Ultra-Scientific Component Imports
import { Sound_Panner_Logic } from "./Panner";
import { Sound_DSP_Logic } from "./DSP";
import { BGM_Panner_Logic } from "./BGM/Panner";
import { BGM_DSP_Logic } from "./BGM/DSP";
import { BGM_Master_Volume_Control_Logic } from "./BGM/Master_Volume_Control";
import { SFX_Panner_Logic } from "./SFX/Panner";
import { SFX_DSP_Logic } from "./SFX/DSP";
import { SFX_Master_Volume_Control_Logic } from "./SFX/Master_Volume_Control";
import { TTS_Panner_Logic } from "./TTS/Panner";
import { TTS_DSP_Logic } from "./TTS/DSP";
import { TTS_Master_Volume_Control_Logic } from "./TTS/Master_Volume_Control";

/**
 * Master Procedural Sound System v4.0
 * Orchestrates BGM, SFX, and procedural voice synthesis across the Opossum Ride engine.
 */
export class ProceduralSoundSystem {
  private ctx: AudioContext | null = null;
  private placeId: string = "garden";
  private isAIGenerated: boolean = false;
  private dropletTimeout: any = null;
  public musicEnabled: boolean = false; // Off by default! Ambience first!
  public customTrackId: string | null = null; // null represents Dynamic "Play Each Track Via Arena"
  
  // Dynamic Volume Controls
  private currentMasterVolume: number = 1.0;
  private currentBGMVolume: number = 0.294; // 0.42 * 0.7 (30% lower)
  private currentSFXVolume: number = 1.0626; // 1.012 * 1.05 (amplified by 5%)
  private currentAmbientVolume: number = 0.78696; // 0.6558 * 1.20 (amplified by 20%)
  
  // Reverb Profiles
  private profiles: Record<string, ReverbProfile> = {
    hallway: new HallwayReverbProfile(),
    cave: new CaveReverbProfile(),
    mountains: new MountainsReverbProfile(),
    stone_corridor: new StoneCorridorReverbProfile(),
    forest: new ForestReverbProfile(),
    city: new StoneRoomReverbProfile(), // City often uses stone room characteristics
    quarry: new QuarryReverbProfile(),
    temple: new StoneRoomReverbProfile(),
    stone_room: new StoneRoomReverbProfile(),
    generic: new GenericReverbProfile(),
    arena: new ArenaReverbProfile(),
    carpeted_hallway: new CarpetedHallwayReverbProfile(),
    hanger: new HangerReverbProfile(),
    alley: new AlleyReverbProfile(),
    no_effect: new NoEffectReverbProfile(),
  };

  // Subsystems
  public sfx = new DedicatedSFXSynthesizer();
  public synth = new OpossumSynthesizer();
  
  // Audio Graph Nodes
  private masterGain: GainNode | null = null;
  private ttsMasterGain: GainNode | null = null;
  private bgmGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private ambientGain: GainNode | null = null;
  private drySubmix: GainNode | null = null;
  private wetSubmix: GainNode | null = null;
  private convolverNode: ConvolverNode | null = null;
  private sharedSubmixInput: GainNode | null = null;

  // Ultra-Scientific Processing Chain Nodes
  private globalPanner: AudioNode | null = null;
  private globalDSP: AudioNode | null = null;
  
  private bgmPanner: AudioNode | null = null;
  private bgmDSP: AudioNode | null = null;
  private bgmMasterVolume: AudioNode | null = null;
  
  private sfxPanner: AudioNode | null = null;
  private sfxDSP: AudioNode | null = null;
  private sfxMasterVolume: AudioNode | null = null;
  
  private ttsPanner: AudioNode | null = null;
  private ttsDSP: AudioNode | null = null;
  private ttsMasterVolume: AudioNode | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      // Atmospheric updates could go here
    }
  }

  /**
   * Dynamic Volume Control Setters
   */
  public setMasterVolume(vol: number) {
    this.currentMasterVolume = Math.max(0, Math.min(2, vol));
    if (this.ctx && this.masterGain) {
      this.masterGain.gain.setTargetAtTime(1.6698 * this.currentMasterVolume, this.ctx.currentTime, 0.05);
    }
  }

  public setBGMVolume(vol: number) {
    this.currentBGMVolume = Math.max(0, Math.min(2, vol));
    if (this.ctx && this.bgmGain) {
      this.bgmGain.gain.setTargetAtTime(this.currentBGMVolume, this.ctx.currentTime, 0.05);
    }
  }

  public setSFXVolume(vol: number) {
    this.currentSFXVolume = Math.max(0, Math.min(2, vol));
    if (this.ctx && this.sfxGain) {
      this.sfxGain.gain.setTargetAtTime(this.currentSFXVolume, this.ctx.currentTime, 0.05);
    }
  }

  public setAmbientVolume(vol: number) {
    this.currentAmbientVolume = Math.max(0, Math.min(2, vol));
    if (this.ctx && this.ambientGain) {
      this.ambientGain.gain.setTargetAtTime(this.currentAmbientVolume, this.ctx.currentTime, 0.05);
    }
  }

  /**
   * Universal Dynamic Ambient Movement Solver:
   * Smoothly scales ambient volume during movement across ALL states (walking, opossum riding, moose riding, fairy-rider flight, stationary, etc.)
   * without any restricted or hardcoded conditionals.
   */
  public updateMovementAmbient(speedRatio: number, isMoving: boolean = true) {
    if (!this.ctx || !this.ambientGain) return;
    const boost = isMoving ? 1.0 + Math.min(0.35, Math.abs(speedRatio) * 0.25) : 1.0;
    const targetVol = this.currentAmbientVolume * boost;
    this.ambientGain.gain.setTargetAtTime(targetVol, this.ctx.currentTime, 0.1);
  }

  public getVolumeSettings() {
    return {
      master: this.currentMasterVolume,
      bgm: this.currentBGMVolume,
      sfx: this.currentSFXVolume,
      ambient: this.currentAmbientVolume,
    };
  }

  /**
   * Warm up the audio context and establish the routing graph with dry/wet reverb submixing.
   */
  private initAudioGraph(ctx: AudioContext) {
    if (this.ctx === ctx && this.masterGain) return;
    this.ctx = ctx;

    try {
      // 1. Final Output Chain
      const compressor = ctx.createDynamicsCompressor();
      compressor.threshold.setValueAtTime(-0.5, ctx.currentTime);
      compressor.knee.setValueAtTime(12, ctx.currentTime);
      compressor.ratio.setValueAtTime(1.2, ctx.currentTime);
      compressor.attack.setValueAtTime(0.003, ctx.currentTime);
      compressor.release.setValueAtTime(0.25, ctx.currentTime);
      compressor.connect(ctx.destination);

      // Global DSP and Panner (End of master chain)
      this.globalDSP = Sound_DSP_Logic.createNode(ctx);
      this.globalPanner = Sound_Panner_Logic.createNode(ctx);
      
      this.globalPanner.connect(this.globalDSP);
      this.globalDSP.connect(compressor);

      // 2. Master Gain
      this.masterGain = ctx.createGain();
      this.masterGain.gain.setValueAtTime(1.6698 * this.currentMasterVolume, ctx.currentTime);
      this.masterGain.connect(this.globalPanner);

      // 3. SFX Processing Chain
      this.sfxMasterVolume = SFX_Master_Volume_Control_Logic.createNode(ctx);
      this.sfxDSP = SFX_DSP_Logic.createNode(ctx);
      this.sfxPanner = SFX_Panner_Logic.createNode(ctx);

      this.sfxGain = ctx.createGain();
      this.sfxGain.gain.setValueAtTime(this.currentSFXVolume, ctx.currentTime);
      
      this.sfxPanner.connect(this.sfxDSP);
      this.sfxDSP.connect(this.sfxMasterVolume);
      this.sfxMasterVolume.connect(this.sfxGain);
      this.sfxGain.connect(this.masterGain);

      // 4. BGM Processing Chain
      this.bgmMasterVolume = BGM_Master_Volume_Control_Logic.createNode(ctx);
      this.bgmDSP = BGM_DSP_Logic.createNode(ctx);
      this.bgmPanner = BGM_Panner_Logic.createNode(ctx);

      this.bgmGain = ctx.createGain();
      this.bgmGain.gain.setValueAtTime(this.currentBGMVolume, ctx.currentTime);
      
      this.bgmPanner.connect(this.bgmDSP);
      this.bgmDSP.connect(this.bgmMasterVolume);
      this.bgmMasterVolume.connect(this.bgmGain);
      this.bgmGain.connect(this.masterGain);

      // 5. TTS Processing Chain
      this.ttsMasterVolume = TTS_Master_Volume_Control_Logic.createNode(ctx);
      this.ttsDSP = TTS_DSP_Logic.createNode(ctx);
      this.ttsPanner = TTS_Panner_Logic.createNode(ctx);
      
      // Precision Damping Stage for TTS (-5% recalibration)
      this.ttsMasterGain = ctx.createGain();
      this.ttsMasterGain.gain.setValueAtTime(0.7917, ctx.currentTime);
      
      this.ttsPanner.connect(this.ttsDSP);
      this.ttsDSP.connect(this.ttsMasterVolume);
      this.ttsMasterVolume.connect(this.ttsMasterGain);
      this.ttsMasterGain.connect(this.masterGain);

      // 6. Ambient Submix
      this.ambientGain = ctx.createGain();
      this.ambientGain.gain.setValueAtTime(this.currentAmbientVolume, ctx.currentTime);
      this.ambientGain.connect(this.masterGain);

      // 7. Dry/Wet Reverb Engine for SFX
      this.drySubmix = ctx.createGain();
      this.drySubmix.gain.setValueAtTime(1.0, ctx.currentTime);
      this.drySubmix.connect(this.sfxPanner);

      this.convolverNode = ctx.createConvolver();
      this.convolverNode.buffer = this.getBufferForPlace(ctx);
      
      this.wetSubmix = ctx.createGain();
      this.wetSubmix.gain.setValueAtTime(0.486, ctx.currentTime);
      this.convolverNode.connect(this.wetSubmix);
      this.wetSubmix.connect(this.sfxPanner);

      this.sharedSubmixInput = ctx.createGain();
      this.sharedSubmixInput.connect(this.drySubmix);
      this.sharedSubmixInput.connect(this.convolverNode);
      
      console.log("Sound System: Ultra-Scientific Audio Graph Established.");
    } catch (e) {
      console.warn("Sound System: Failed to initialize audio graph:", e);
    }
  }

  private getBufferForPlace(ctx: AudioContext): AudioBuffer {
    const id = this.placeId.toLowerCase();
    let profileKey = "generic";

    if (id === "floor_foyer" || id.includes("hallway")) profileKey = "hallway";
    else if (id === "stone_room") profileKey = "stone_room";
    else if (id.includes("cave")) profileKey = "cave";
    else if (id.includes("mountain")) profileKey = "mountains";
    else if (id.includes("corridor")) profileKey = "stone_corridor";
    else if (id.includes("forest") || id.includes("jungle")) profileKey = "forest";
    else if (id.includes("city")) profileKey = "city";
    else if (id.includes("quarry")) profileKey = "quarry";
    else if (id.includes("temple")) profileKey = "temple";
    else if (id.includes("arena")) profileKey = "arena";
    else if (id.includes("carpet")) profileKey = "carpeted_hallway";
    else if (id.includes("hanger")) profileKey = "hanger";
    else if (id.includes("alley")) profileKey = "alley";
    else if (id.includes("none")) profileKey = "no_effect";
    // Scientifically and acoustically distinct mapping for the 10 mine subarenas
    else if (id === "gold_mine") profileKey = "cave";
    else if (id === "simulated_gold_mine") profileKey = "hallway";
    else if (id === "silver_mine") profileKey = "cave";
    else if (id === "simulated_silver_mine") profileKey = "carpeted_hallway";
    else if (id === "emerald_mine") profileKey = "cave";
    else if (id === "simulated_emerald_mine") profileKey = "stone_corridor";
    else if (id === "diamond_mine") profileKey = "cave";
    else if (id === "simulated_diamond_mine") profileKey = "stone_room";
    else if (id === "salt_mine") profileKey = "cave";
    else if (id === "simulated_salt_mine") profileKey = "no_effect";

    const profile = this.profiles[profileKey] || this.profiles.generic;
    return profile.getOrCreateImpulseResponse(ctx);
  }

  public getContext(): AudioContext | null {
    return getSharedAudioContext();
  }

  /**
   * Returns the appropriate input node for submixed sounds.
   * i is the wetness factor (0.0 to 1.0)
   */
  public getSharedDestination(ctx: AudioContext, wetness: number = 0.3675): AudioNode {
    this.initAudioGraph(ctx);
    
    if (this.drySubmix && this.wetSubmix && this.sharedSubmixInput) {
      this.drySubmix.gain.setTargetAtTime(1.0 - wetness, ctx.currentTime, 0.05);
      this.wetSubmix.gain.setTargetAtTime(wetness, ctx.currentTime, 0.05);
      return this.sharedSubmixInput;
    }
    
    return this.masterGain || ctx.destination;
  }

  public setPlaceId(id: string, isAIGenerated: boolean = false) {
    const autoAIGen = isAIGenerated || (typeof id === "string" && id.trim().toLowerCase().startsWith("ai_gen_"));
    if (this.placeId === id && this.isAIGenerated === autoAIGen) return;
    this.placeId = id;
    this.isAIGenerated = autoAIGen;
    console.log(`Sound System: Environment Shift to ${id}${autoAIGen ? " (AI Generated)" : ""}.`);

    const bgmProfile = PlaceResolver.getBGMProfile(id);

    // Base BGM volume per environmental profile
    let baseBGM = 0.42;
    if (bgmProfile.bgmCategory === "meditation") {
      baseBGM = 0.38;
    } else if (bgmProfile.bgmCategory === "orchard") {
      baseBGM = 0.45;
    } else if (bgmProfile.bgmCategory === "farm") {
      baseBGM = 0.44;
    } else if (bgmProfile.bgmCategory === "manor") {
      baseBGM = 0.40;
    }

    // music volume is 30% lower
    const bgmVol = baseBGM * 0.7;

    // ambient background is 20% higher than music (amplified further by 30%, +10%, and +20% for easy hearing)
    let ambientVol = bgmVol * 2.0592; // 1.716 * 1.20 (amplified by 20%)
    if (id === "orchid_glasshouse") {
      ambientVol = bgmVol * 1.716; // 1.43 * 1.20 (amplified by 20%)
    }

    this.setBGMVolume(bgmVol);
    this.setAmbientVolume(ambientVol);
    
    const ctx = this.getContext();
    if (ctx && this.convolverNode) {
      this.convolverNode.buffer = this.getBufferForPlace(ctx);
    }
  }

  public async playChatterAnnouncement(words: string, interrupt = true) {
    const ctx = this.getContext();
    if (!ctx) return;
    this.initAudioGraph(ctx);
    
    // Connect TTS to the scientific TTS chain
    const dest = this.ttsPanner || this.masterGain || ctx.destination;
    // For now, TTS mostly uses SpeechSynthesis, but we prepare for synthesized vocalization routing
    const { speakWords } = await import("./TTS");
    speakWords(words, interrupt);
  }

  public setGenericCrashSound(enabled: boolean) {
    setGenericCrashSoundEnabled(enabled);
  }

  private scheduleOrchidDroplets(ctx: AudioContext, dest: AudioNode) {
    if (this.dropletTimeout) {
      clearTimeout(this.dropletTimeout);
      this.dropletTimeout = null;
    }
    
    const triggerNext = () => {
      const id = this.placeId.toLowerCase();
      if (id !== "orchid_glasshouse" || !this.ctx || this.ctx.state === "closed") {
        return;
      }
      
      globalGardenAmbience.playGlasshouseDroplet(this.ctx, dest);
      
      const delay = 4000 + Math.random() * 4000;
      this.dropletTimeout = setTimeout(triggerNext, delay);
    };
    
    this.dropletTimeout = setTimeout(triggerNext, 3000);
  }

  /**
   * BGM Management - Selects distinct compositions based on placeId
   */
  public async playBGM() {
    const ctx = this.getContext();
    if (!ctx || ctx.state === "suspended") return;
    
    this.initAudioGraph(ctx);
    const dest = this.bgmPanner || this.bgmGain || this.masterGain;
    if (!dest) return;

    // Stop active BGM tracks before starting new track
    this.stopBGM();

    const id = this.placeId.toLowerCase();
    if (id === "floor_foyer" || id.includes("foyer")) {
      // Background music must strictly NEVER play inside the Level 0 Manor Foyer
      return;
    }
    const ambientDest = this.ambientGain || this.masterGain;
    const isAIGen = this.isAIGenerated || id.startsWith("ai_gen_");

    if (isAIGen) {
      const { GeminiSystem } = await import("../AI/External/Gemini");
      if (ambientDest && ctx) {
        GeminiSystem.AudioSynth.triggerSyntheticAmbientScape(ctx, ambientDest, id);
      }
      return; // AI Generated scapes are handled by the synthetic engine
    }

    const profile = PlaceResolver.getBGMProfile(id);

    // Start appropriate ambient background
    if (ambientDest) {
      if (profile.ambientType === "cavern") {
        globalCaveAmbience.startCaveAmbience(ctx, ambientDest);
      } else if (id.includes("mountain")) {
        globalMountainsAmbience.startMountainsWind(ctx, ambientDest);
      } else if (profile.ambientType === "breeze" || profile.ambientType === "greenhouse" || profile.ambientType === "rural") {
        globalGardenAmbience.startGardenBreeze(ctx, ambientDest);

        if (id === "orchid_glasshouse") {
          globalGardenAmbience.playGlasshouseDroplet(ctx, ambientDest);
          this.scheduleOrchidDroplets(ctx, ambientDest);
        }
      }
    }

    // Select BGM track based on PlaceResolver profile
    if (!this.musicEnabled) {
      return;
    }

    if (this.customTrackId) {
      const track = this.customTrackId.toLowerCase();
      if (track === "garden_of_wisdom") {
        globalGardenOfWisdomTrack.startTrack(ctx, dest);
      } else if (track === "zen_stone_garden") {
        globalZenStoneGardenTrack.startTrack(ctx, dest);
      } else if (track === "botanical_maze") {
        globalBotanicalMazeTrack.startTrack(ctx, dest);
      } else if (track === "butterfly_sanctuary") {
        globalButterflySanctuaryTrack.startTrack(ctx, dest);
      } else if (track === "orchid_glasshouse") {
        globalOrchidGlasshouseTrack.startTrack(ctx, dest);
      } else if (track === "edible_berry_garden") {
        globalEdibleBerryGardenTrack.startTrack(ctx, dest);
      } else if (track === "the_grand_orchard") {
        globalTheGrandOrchardTrack.startTrack(ctx, dest);
      } else if (track === "babylon") {
        playWhenBabylonFalls(ctx, dest);
      }
      return;
    }

    if (profile.bgmCategory === "cave" || id.includes("mountain")) {
      // No BGM for mountain or mine subarenas
    } else if (id === "zen_stone_garden") {
      globalZenStoneGardenTrack.startTrack(ctx, dest);
    } else if (id === "botanical_maze") {
      globalBotanicalMazeTrack.startTrack(ctx, dest);
    } else if (id === "butterfly_sanctuary") {
      globalButterflySanctuaryTrack.startTrack(ctx, dest);
    } else if (id === "orchid_glasshouse") {
      globalOrchidGlasshouseTrack.startTrack(ctx, dest);
    } else if (id === "edible_berry_garden") {
      globalEdibleBerryGardenTrack.startTrack(ctx, dest);
    } else if (profile.bgmCategory === "orchard" || id.includes("orchard") || id.includes("grove")) {
      globalTheGrandOrchardTrack.startTrack(ctx, dest);
    } else if (profile.bgmCategory === "farm" || id.includes("farm")) {
      globalEdibleBerryGardenTrack.startTrack(ctx, dest);
    } else if (id === "garden") {
      globalGardenOfWisdomTrack.startTrack(ctx, dest);
    } else if (id.includes("forest") || id.includes("plain")) {
      playWhenBabylonFalls(ctx, dest);
    } else if (id.includes("foyer") || id.includes("maze")) {
      globalBotanicalMazeTrack.startTrack(ctx, dest);
    } else if (id.includes("corridor") || id.includes("room")) {
      globalOrchidGlasshouseTrack.startTrack(ctx, dest);
    } else if (id.includes("city")) {
      globalEdibleBerryGardenTrack.startTrack(ctx, dest);
    } else if (id.includes("quarry") || id.includes("desert")) {
      globalButterflySanctuaryTrack.startTrack(ctx, dest);
    } else {
      globalGardenOfWisdomTrack.startTrack(ctx, dest);
    }
  }

  public stopBGM() {
    stopWhenBabylonFalls();
    globalGardenOfWisdomTrack.stopTrack();
    globalZenStoneGardenTrack.stopTrack();
    globalBotanicalMazeTrack.stopTrack();
    globalButterflySanctuaryTrack.stopTrack();
    globalOrchidGlasshouseTrack.stopTrack();
    globalEdibleBerryGardenTrack.stopTrack();
    globalTheGrandOrchardTrack.stopTrack();
    globalMountainsAmbience.stopMountainsWind();
    globalGardenAmbience.stopGardenBreeze();
    globalCaveAmbience.stopCaveAmbience();
    
    if (this.dropletTimeout) {
      clearTimeout(this.dropletTimeout);
      this.dropletTimeout = null;
    }
  }

  public stopOnlyBGMTracks() {
    stopWhenBabylonFalls();
    globalGardenOfWisdomTrack.stopTrack();
    globalZenStoneGardenTrack.stopTrack();
    globalBotanicalMazeTrack.stopTrack();
    globalButterflySanctuaryTrack.stopTrack();
    globalOrchidGlasshouseTrack.stopTrack();
    globalEdibleBerryGardenTrack.stopTrack();
    globalTheGrandOrchardTrack.stopTrack();
  }

  public setMusicEnabled(enabled: boolean) {
    this.musicEnabled = enabled;
    if (enabled) {
      this.playBGM();
    } else {
      this.stopOnlyBGMTracks();
    }
  }

  public setCustomTrack(trackId: string | null) {
    this.customTrackId = trackId;
    this.stopOnlyBGMTracks();
    if (trackId !== null) {
      this.musicEnabled = true;
    }
    this.playBGM();
  }

  /**
   * SFX Proxies
   */
  public playFootstep(surface: string, movementType?: string, isAI: boolean = false) {
    const ctx = this.getContext();
    if (!ctx || ctx.state === "suspended") return;
    const dest = this.getSharedDestination(ctx, 0.3675);
    if (isAI) {
      if (movementType === "Jack" || movementType?.toLowerCase() === "male") {
        this.sfx.playCloudJackFootstep(ctx, dest, surface);
      } else {
        this.sfx.playCloudJillFootstep(ctx, dest, surface);
      }
    } else {
      this.sfx.playFootstep(ctx, dest, surface);
    }
  }

  public playTickChime() {
    const ctx = this.getContext();
    if (!ctx || ctx.state === "suspended") return;
    const dest = this.getSharedDestination(ctx, 0.35);
    this.sfx.playTickChime(ctx, dest);
  }

  public playJumpSwoosh() {
    const ctx = this.getContext();
    if (!ctx || ctx.state === "suspended") return;
    const dest = this.getSharedDestination(ctx, 0.3);
    this.sfx.playJumpSwoosh(ctx, dest);
  }

  public playImpactCrash() {
    const ctx = this.getContext();
    if (!ctx || ctx.state === "suspended") return;
    const dest = this.getSharedDestination(ctx, 0.45);
    this.sfx.playImpactCrash(ctx, dest);
  }

  public playMooseChargeTrample() {
    const ctx = this.getContext();
    if (!ctx || ctx.state === "suspended") return;
    const dest = this.getSharedDestination(ctx, 0.45);
    this.sfx.playMooseChargeTrample(ctx, dest);
  }

  public playMooseHoofClick(name: string, type: "Bull" | "Cow", distance: number) {
    const ctx = this.getContext();
    if (!ctx || ctx.state === "suspended") return;
    const dest = this.getSharedDestination(ctx, 0.4);
    this.sfx.playMooseHoofClick(ctx, dest, name, type, distance);
  }

  public playOpossumChatter(isMale: boolean, characterId: string, customPlayChatter?: (ctx: AudioContext, isRetro: boolean, dest: AudioNode) => void) {
    const ctx = this.getContext();
    if (!ctx || ctx.state === "suspended") return;
    const dest = this.getSharedDestination(ctx, 0.45);
    if (customPlayChatter) {
      customPlayChatter(ctx, false, dest);
    } else {
      this.synth.triggerOpossumHappyChatter(ctx, dest, isMale);
    }
  }

  public playMooseVocal(type: string) {
    const ctx = this.getContext();
    if (!ctx || ctx.state === "suspended") return;
    const dest = this.getSharedDestination(ctx, 0.4);
    if (type === "snort") {
      this.sfx.playMooseVocalForOpponent(ctx, dest, "Generic", "Cow", 0);
    } else {
      this.sfx.playImpactCrash(ctx, dest);
    }
  }

  public playMonkeyVocal(type: string) {
    const ctx = this.getContext();
    if (!ctx || ctx.state === "suspended") return;
    const dest = this.getSharedDestination(ctx, 0.35);
    this.sfx.playMonkeyVocalForOpponent(ctx, dest, "Generic", "Male", 0);
  }

  public playFenceCollision() {
    const ctx = this.getContext();
    if (!ctx || ctx.state === "suspended") return;
    const dest = this.getSharedDestination(ctx, 0.4);
    this.sfx.playFenceCollision(ctx, dest);
  }

  public playGardenPlantCollision() {
    const ctx = this.getContext();
    if (!ctx || ctx.state === "suspended") return;
    const dest = this.getSharedDestination(ctx, 0.4);
    this.sfx.playGardenPlantCollision(ctx, dest);
  }

  public playRockCollision() {
    const ctx = this.getContext();
    if (!ctx || ctx.state === "suspended") return;
    const dest = this.getSharedDestination(ctx, 0.4);
    this.sfx.playRockCollision(ctx, dest);
  }

  public playMonkeyVocalForOpponent(opponent: any, distance: number) {
    const ctx = this.getContext();
    if (!ctx || ctx.state === "suspended") return;
    const dest = this.getSharedDestination(ctx, 0.4);
    const name = opponent?.monkeyName || opponent?.name || "Generic";
    const gender = opponent?.monkeyGender || "Male";
    this.sfx.playMonkeyVocalForOpponent(ctx, dest, name, gender, distance);
  }

  public playMonkeyJump(pitch: number = 1.0, velocity: number = 1.0) {
    const ctx = this.getContext();
    if (!ctx || ctx.state === "suspended") return;
    const dest = this.getSharedDestination(ctx, 0.4);
    this.sfx.playMonkeyJump(ctx, dest, pitch, velocity);
  }

  public playMonkeyModularVocal(type: "screech" | "hoot" | "pant_hoot" | "alarm" | "coo", pitch: number = 1.0) {
    const ctx = this.getContext();
    if (!ctx || ctx.state === "suspended") return;
    const dest = this.getSharedDestination(ctx, 0.4);
    this.sfx.playMonkeyModularVocal(ctx, dest, type, { pitch });
  }

  public playMooseVocalForOpponent(opponent: any, distance: number) {
    const ctx = this.getContext();
    if (!ctx || ctx.state === "suspended") return;
    const dest = this.getSharedDestination(ctx, 0.4);
    const name = opponent?.mooseName || opponent?.name || "Generic";
    const type = opponent?.mooseType || "Cow";
    this.sfx.playMooseVocalForOpponent(ctx, dest, name, type, distance);
  }

  public playDeepBullBellow(mult: number = 1.0) {
    const ctx = this.getContext();
    if (!ctx || ctx.state === "suspended") return;
    const dest = this.getSharedDestination(ctx, 0.45);
    this.sfx.playDeepBullBellow(ctx, dest, mult);
  }

  public playCowMatingCall(mult: number = 1.0) {
    const ctx = this.getContext();
    if (!ctx || ctx.state === "suspended") return;
    const dest = this.getSharedDestination(ctx, 0.4);
    this.sfx.playCowMatingCall(ctx, dest, mult);
  }

  public playMooseJump(type: "Bull" | "Cow" = "Bull") {
    const ctx = this.getContext();
    if (!ctx || ctx.state === "suspended") return;
    const dest = this.getSharedDestination(ctx, 0.4);
    this.sfx.playMooseJump(ctx, dest, type);
  }

  public playAIOpossumSound(sex: string, size: number = 1.0, vocalSource: string = "Cloud Network Synthesis") {
    const ctx = this.getContext();
    if (!ctx || ctx.state === "suspended") return;
    const dest = this.getSharedDestination(ctx, 0.45);
    if (sex === "Jill" || sex?.toLowerCase() === "female") {
      this.sfx.playCloudJillChatter(ctx, dest, size, vocalSource);
    } else {
      this.sfx.playCloudJackGrunt(ctx, dest, size, vocalSource);
    }
  }

  public playAIOpossumJump(sex: string, source?: string, size: number = 1.0) {
    const ctx = this.getContext();
    if (!ctx || ctx.state === "suspended") return;
    const dest = this.getSharedDestination(ctx, 0.35);
    if (sex === "Jill" || sex?.toLowerCase() === "female") {
      this.sfx.playCloudJillJump(ctx, dest, size);
    } else {
      this.sfx.playCloudJackJump(ctx, dest, size);
    }
  }

  public playSlidingDoors(open: boolean) {
    const ctx = this.getContext();
    if (!ctx || ctx.state === "suspended") return;
    const dest = this.getSharedDestination(ctx, 0.46);
    this.sfx.playSlidingDoors(ctx, dest, open);
  }

  public playLevelCompleteFanfare() {
    const ctx = this.getContext();
    if (!ctx || ctx.state === "suspended") return;
    const dest = this.masterGain || ctx.destination;
    globalFanfare.playLevelComplete(ctx, dest, this.placeId);
  }

  public playOwlHoot(distance: number) {
    const ctx = this.getContext();
    if (!ctx || ctx.state === "suspended") return;
    const dest = this.getSharedDestination(ctx, 0.4);
    this.sfx.playOwlHoot(ctx, dest, distance);
  }

  public playFrogCroak(distance: number) {
    const ctx = this.getContext();
    if (!ctx || ctx.state === "suspended") return;
    const dest = this.getSharedDestination(ctx, 0.4);
    this.sfx.playFrogCroak(ctx, dest, distance);
  }

  public playPigVocal(gender: "Boar" | "Sow" = "Boar", distance: number = 0) {
    const ctx = this.getContext();
    if (!ctx || ctx.state === "suspended") return;
    const dest = this.getSharedDestination(ctx, 0.42);
    this.sfx.playPigVocal(ctx, dest, gender, distance);
  }

  public synthesizePigSmashedExplosion(gender: "Boar" | "Sow" = "Boar", distance: number = 0) {
    const ctx = this.getContext();
    if (!ctx || ctx.state === "suspended") return;
    const dest = this.getSharedDestination(ctx, 0.55);
    this.sfx.playPigSmashedExplosion(ctx, dest, gender, distance);
  }

  public playPigTrot(pitch: number = 1.0) {
    const ctx = this.getContext();
    if (!ctx || ctx.state === "suspended") return;
    const dest = this.getSharedDestination(ctx, 0.4);
    FeralPigMovementSound.playTrot(ctx, dest, pitch);
  }

  public synthesizeMooseSmashedVocal(name: string, type: "Bull" | "Cow") {
    const ctx = this.getContext();
    if (!ctx || ctx.state === "suspended") return;
    const dest = this.getSharedDestination(ctx, 0.5);
    this.sfx.playMooseSmashedVocal(ctx, dest, name, type);
  }

  public synthesizeWindChimes() {
    const ctx = this.getContext();
    if (!ctx || ctx.state === "suspended") return;
    const dest = this.getSharedDestination(ctx, 0.55);
    playProceduralWindChimes(ctx, dest);
  }

  public synthesizeFountain() {
    const ctx = this.getContext();
    if (!ctx || ctx.state === "suspended") return;
    const dest = this.getSharedDestination(ctx, 0.5);
    playProceduralFountain(ctx, dest);
  }

  public synthesizeWindmill() {
    const ctx = this.getContext();
    if (!ctx || ctx.state === "suspended") return;
    const dest = this.getSharedDestination(ctx, 0.6);
    playProceduralWindmill(ctx, dest);
  }
}

export * from "./General";
export * from "./Engine";
