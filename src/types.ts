/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum OpossumId {
  MELISSA = "melissa",
  ASHLEY = "ashley",
  AMARA_QIN = "amara_qin",
  SAFFRON_ROSE = "saffron_rose",
  JALISSA_CHIN = "jalissa_chin",
  ARDEN_ROSIE = "arden_rosie",
  JAHMELLA_ROSE = "jahmella_rose",
  DAGMAR_KONE_REYNOLDS = "dagmar_kone_reynolds",
  AGAPE_ROSE = "agape_rose",
  ROXANNE_KONE_REYNOLDS = "roxanne_kone_reynolds",
  TIANA_QIN = "tiana_qin",
  WANDA = "wanda",
  OLIVIA_CHIN = "olivia_chin",
  RUTH_KONE_REYNOLDS = "ruth_kone_reynolds",
  KADY_ROSE = "kady_rose",
  SANDRA = "sandra",
  DRAKE_KONE_REYNOLDS = "drake_kone_reynolds"
}

export interface OpossumCharacter {
  id: OpossumId | string;
  name: string;
  width: number; // in inches
  length: number; // in inches (e.g., 6 feet 2 inches = 74 inches)
  headWidth: number; // in inches
  headHeight: number; // excluding ears, in inches
  shoulderHeight: string; // e.g., "5 feet and 3 inches"
  color: string; // Tailwind color or hex (e.g., "Light Gray", "Yellow")
  eyeColor: string;
  noseColor: string;
  tailColor: string;
  innerEarColor: string;
  gender: "Female" | "Male";
  sex?: string;
  size?: number;
  headOrientation: string;
  description: string;
  playChatter?: (ctx: AudioContext, isRetro: boolean, dest: AudioNode) => void;
  isAI?: boolean;
  isAIGenerated?: boolean;
  aiData?: any;
}

export interface RiderCharacter {
  id?: string;
  name: string;
  skinColor: string; // e.g., "brown-skin"
  ethnicity: string; // e.g., "Black person"
  gender: string; // e.g., "male"
  hair: string; // e.g., "black hair"
  outfit: string; // e.g., "blue onesie"
  shoes: string; // e.g., "black shoes"
  height: string; // e.g., "5 feet and 4 inches"
  heritage?: string;
  category?: string;
}

export enum GameViewMode {
  POV = "pov",
  RIDER = "rider"
}

export enum KeyboardLayoutType {
  CEDELLA = "cedella",
  ARDEN_DENIS = "arden_denis"
}

export enum GameState {
  LANDING = "landing",
  RIDER_SELECTION = "rider_selection",
  SELECTION = "selection",
  INTERSTITIAL = "interstitial",
  BOOTING = "booting",
  PLAYING = "playing",
  PAUSED = "paused",
  GAME_OVER = "game_over",
  LEARN_GAME_SOUNDS = "learn_game_sounds"
}

export interface GameLevel {
  id: number;
  name: string;
  placeId: string;
  targetDistance: number; // in meters (e.g. 500 meters)
  tickDensity: number; // ticks per 100 meters
  opponentFrequency: number; // monkeys/moose per 100 meters
  colorHue: number; // for path borders
  theme?: string; // e.g. "Serene", "Mysterious", "Aggressive"
  surfaceType?: string; // Optional override for level-specific surfaces
  longDescription?: string;
  visuals?: {
    fogDensity: number;
    skyColor: string;
    horizonColor?: string;
    scenery?: string[];
    ambientLight: number;
  };
}

export interface Opponent {
  id: number;
  z: number; // distance along track in meters
  lane: number; // -1 = left, 0 = center, 1 = right
  monkeyGender: "Male" | "Female";
  mooseType: "Bull" | "Cow"; // Female monkeys ride bull moose, male monkeys ride cow moose
  monkeyName: string;
  mooseName: string;
  speed: number;
  isCharging: boolean;
  hasCharged: boolean;
  width: number; // rendering box size
  height: number;
  lastHoofstepZ?: number;
  hoofStrideVariance?: number; // Random jitter for unpredictable rhythm
  nextVocalTime?: number; // Next time to trigger a vocalization
  mooseState?: "idle" | "charging" | "snorting" | "bellowing" | "mooing" | "trampling" | "bucking" | "tossing_rider" | "crashed" | "ramming" | "charging_wildly" | "smashed";
  monkeyBehavior?: "riding_normally" | "chasing" | "jumping" | "decorating" | "falling" | "surrounding" | "tossed" | "teasing" | "wall_running" | "flight" | "scattered" | "climbing";
  activeBehaviors?: string[];
  isWildMoose?: boolean;
  isAiGeneratedMoose?: boolean;
  isAngelica?: boolean;
  isCleaning?: boolean;
  isRiddenByMonkey?: boolean;
}

export interface TickItem {
  id: number;
  z?: number; // distance along track in meters
  x?: number;
  y?: number;
  lane?: number; // -1, 0, 1
  collected: boolean;
  isTick?: boolean;
}

export interface ObstacleItem {
  id: number;
  type: "fence" | "rock" | "garden_plant" | "stone_platform";
  z: number;
  lane: number;
  width: number;
  height: number;
  colorPreset?: { name: string; fill: string; stroke: string };
}

export interface AnimalItem {
  id: number;
  species: "owl" | "frog" | "feral_pig" | "monkey";
  gender?: "Boar" | "Sow";
  coatColor?: string;
  secondaryColor?: string;
  z: number;
  lane: number;
  xOffset?: number; // For non-track positioning (e.g. perched in trees, foraging on verge)
  heightOffset?: number; // For flying or perched height
  state: string;
  nextVocalTime: number;
  smashedTime?: number;
}
