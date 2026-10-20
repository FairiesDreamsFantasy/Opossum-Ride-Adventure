/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Scientific Surface Acoustic Profiles
 * Defines the resonant frequencies and coupling coefficients for various environmental terrains.
 */
export const SURFACE_PROFILES: Record<string, { freq: number; q: number; gain: number; thudFreq: number }> = {
  ceramic: { freq: 2400, q: 6.0, gain: 1.0, thudFreq: 80 },
  tile: { freq: 2400, q: 6.0, gain: 1.0, thudFreq: 80 },
  deck: { freq: 350, q: 2.5, gain: 1.1, thudFreq: 60 },
  wood: { freq: 350, q: 2.5, gain: 1.1, thudFreq: 60 },
  hardwood: { freq: 400, q: 3.0, gain: 1.15, thudFreq: 65 },
  carpet: { freq: 200, q: 1.5, gain: 0.8, thudFreq: 40 },
  asphalt: { freq: 1100, q: 3.5, gain: 1.05, thudFreq: 90 },
  stone: { freq: 1600, q: 5.0, gain: 1.2, thudFreq: 100 },
  granite: { freq: 1750, q: 5.2, gain: 1.25, thudFreq: 110 },
  marble: { freq: 1900, q: 5.5, gain: 1.3, thudFreq: 115 },
  slate: { freq: 1650, q: 4.8, gain: 1.18, thudFreq: 105 },
  slab: { freq: 1600, q: 5.0, gain: 1.2, thudFreq: 100 },
  soil: { freq: 1200, q: 4.0, gain: 1.0, thudFreq: 80 },
  grass: { freq: 400, q: 1.0, gain: 0.85, thudFreq: 50 },
  mulch: { freq: 450, q: 1.2, gain: 0.9, thudFreq: 55 },
  gravel: { freq: 1800, q: 4.5, gain: 1.1, thudFreq: 85 },
  snow: { freq: 300, q: 0.6, gain: 0.7, thudFreq: 35 },
  sand: { freq: 500, q: 1.1, gain: 0.8, thudFreq: 45 },
  ice: { freq: 2200, q: 6.0, gain: 1.35, thudFreq: 120 },
  default: { freq: 1200, q: 4.0, gain: 1.0, thudFreq: 80 }
};

/**
 * Procedural Movement Rhythm Registry
 */
export const RHYTHM_PROFILES = {
  opossum: {
    walk: 4.8,
    trot: 3.4,
    jackTrot: 2.8,
    gallop: 2.1
  },
  moose: {
    idle: 2.0,
    walk: 5.2,
    trot: 4.0,
    charge: 2.5,
    strideFreq: 12.0
  },
  monkey: {
    climb: 0.8,
    jump: 1.0
  }
};

/**
 * Environmental Reverb Mapping
 * Deterministic keywords used to resolve appropriate scientific reverb profiles.
 */
export const REVERB_MAPPING: Record<string, string> = {
  floor_foyer: "hallway",
  hallway: "hallway",
  cave: "cave",
  plain: "generic",
  mountain: "mountains",
  corridor: "stone_corridor",
  forest: "forest",
  garden: "generic",
  porch: "generic",
  city: "city",
  quarry: "quarry",
  stone: "stone_room",
  arena: "arena",
  carpet: "carpeted_hallway",
  hanger: "hanger",
  alley: "alley",
  none: "no_effect"
};

import { ProceduralSoundSystem } from "../index";
import { playProceduralSound } from "../TTS";

let globalSoundSystemInstance: ProceduralSoundSystem | null = null;

function getSoundSystem(): ProceduralSoundSystem {
  if (!globalSoundSystemInstance) {
    globalSoundSystemInstance = new ProceduralSoundSystem();
  }
  return globalSoundSystemInstance;
}

export const SoundService = {
  playFootstep: (surface: string) => getSoundSystem().playFootstep(surface),
  playTickChime: () => getSoundSystem().playTickChime(),
  playJumpSwoosh: () => getSoundSystem().playJumpSwoosh(),
  playImpactCrash: () => getSoundSystem().playImpactCrash(),
  playMooseChargeTrample: () => getSoundSystem().playMooseChargeTrample(),
  playMooseSmash: (name: string = "Moose", type: "Bull" | "Cow" = "Cow") => getSoundSystem().synthesizeMooseSmashedVocal(name, type),
  playMooseHoofstep: (type: "Bull" | "Cow" = "Bull", distance: number = 0) => getSoundSystem().playMooseHoofClick("Generic", type, distance),
  playMooseVocal: (action: string = "snorting", type: "Bull" | "Cow" = "Bull", distance: number = 0) => getSoundSystem().playMooseVocalForOpponent({ mooseName: "Moose", mooseType: type }, distance),
  playMooseChargeImpact: () => getSoundSystem().playImpactCrash(),
  playMooseDeepBellow: (mult: number = 1.0) => getSoundSystem().playDeepBullBellow(mult),
  playMooseCowCall: (mult: number = 1.0) => getSoundSystem().playCowMatingCall(mult),
  playMooseJump: (type: "Bull" | "Cow" = "Bull") => getSoundSystem().playMooseJump(type),
  playMonkeyChatter: (pitchOffset: number = 0) => getSoundSystem().playMonkeyVocalForOpponent({ monkeyName: "Monkey", monkeyGender: "Male" }, pitchOffset),
  playMonkeyJump: (pitch: number = 1.0, velocity: number = 1.0) => getSoundSystem().playMonkeyJump(pitch, velocity),
  playMonkeyModularVocal: (type: "screech" | "hoot" | "pant_hoot" | "alarm" | "coo", pitch: number = 1.0) => getSoundSystem().playMonkeyModularVocal(type, pitch),
  playObstacleCollision: (type: string) => {
    const sys = getSoundSystem();
    if (type === "fence") sys.playFenceCollision();
    else if (type === "garden_plant") sys.playGardenPlantCollision();
    else if (type === "rock") sys.playRockCollision();
    else sys.playImpactCrash();
  },
  playSlidingDoorOpen: () => getSoundSystem().playSlidingDoors(true),
  playSlidingDoorClose: () => getSoundSystem().playSlidingDoors(false),
  playAnimalVocal: (animal: "owl" | "frog", distance: number = 0) => {
    const sys = getSoundSystem();
    if (animal === "owl") sys.playOwlHoot(distance);
    else if (animal === "frog") sys.playFrogCroak(distance);
  },
  playOpossumChatter: (character?: any) => {
    const sys = getSoundSystem();
    if (character && character.playChatter) {
      sys.playOpossumChatter(false, character.id, character.playChatter);
    } else {
      sys.playOpossumChatter(false, "melissa_opossum");
    }
  },
  playOpossumJump: (sex: "Jill" | "Jack" = "Jill") => getSoundSystem().playAIOpossumJump(sex),
  playOpossumGrunt: (size: number = 1.0) => getSoundSystem().playAIOpossumSound("Jack", size),
  playRetroArcadeChatter: () => playProceduralSound("chatter", true),
  playPigVocal: (gender: "Boar" | "Sow" = "Boar", distance: number = 0) => getSoundSystem().playPigVocal(gender, distance),
  synthesizePigSmashedExplosion: (gender: "Boar" | "Sow" = "Boar", distance: number = 0) => getSoundSystem().synthesizePigSmashedExplosion(gender, distance),
  playPigTrot: (pitch: number = 1.0) => getSoundSystem().playPigTrot(pitch),
  getContext: () => getSoundSystem().getContext(),
  getSharedDestination: (ctx: AudioContext, wetness: number = 0.3675) => getSoundSystem().getSharedDestination(ctx, wetness),
  updateMovementAmbient: (speedRatio: number, isMoving: boolean = true) => getSoundSystem().updateMovementAmbient(speedRatio, isMoving),
  getSystem: () => getSoundSystem()
};

