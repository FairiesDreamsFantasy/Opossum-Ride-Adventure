/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GardenArena } from "./Garden";
import { ZenStoneGardenSubArena } from "./Garden/Zen_Stone_Garden";
import { BotanicalMazeSubArena } from "./Garden/Botanical_Maze";
import { ButterflySanctuarySubArena } from "./Garden/Butterfly_Sanctuary";
import { OrchidGlasshouseSubArena } from "./Garden/Orchid_Glasshouse";
import { EdibleBerryGardenArena } from "./Garden/Edible_Berry_Garden";
import { TheGrandOrchardSubArena } from "./The_Grand_Orchard";
import { CherryOrchardSubArena } from "./The_Grand_Orchard/Cherry_Orchard";
import { AlmondGroveSubArena } from "./The_Grand_Orchard/Almond_Grove";
import { AppleGroveSubArena } from "./The_Grand_Orchard/Apple_Grove";
import { OliveGroveSubArena } from "./The_Grand_Orchard/Olive_Grove";
import { WalnutGroveSubArena } from "./The_Grand_Orchard/Walnut_Grove";
import { CaveArena } from "./Cave";
import { PlainArena } from "./Plain";
import { ForestArena } from "./Forest";
import { MountainsArena } from "./Mountains";
import { QuarryArena } from "./Quarry";
import { DesertArena } from "./Desert";
import { SimulatedGoldMineArena } from "./Simulated_Gold_Mine";
import { SimulatedSilverMineArena } from "./Simulated_Silver_Mine";
import { SimulatedEmeraldMineArena } from "./Simulated_Emerald_Mine";
import { SimulatedDiamondMineArena } from "./Simulated_Diamond_Mine";
import { SimulatedSaltMineArena } from "./Simulated_Salt_Mine";
import { GoldMineArena } from "./Gold_Mine";
import { SilverMineArena } from "./Silver_Mine";
import { EmeraldMineArena } from "./Emerald_Mine";
import { DiamondMineArena } from "./Diamond_Mine";
import { SaltMineArena } from "./Salt_Mine";
import {
  FarmArena,
  ChickenFarmSubArena,
  GoatFarmSubArena,
  SheepFarmSubArena,
  DuckFarmSubArena,
  GooseFarmSubArena,
  CattleFarmSubArena,
  HorseFarmSubArena
} from "./Farm";
import {
  TempleArena,
  GrandFairyTemple,
  RainbowPassage,
  SacredSanctuary,
  GoldenChamber,
  JadeGallery,
  SilentShrine
} from "./Temple";

export {
  TempleArena,
  GrandFairyTemple,
  RainbowPassage,
  SacredSanctuary,
  GoldenChamber,
  JadeGallery,
  SilentShrine
};

export * from "./AI-Generated";

export interface PlaceDefinition {
  id: string;
  name: string;
  description: string;
  surfaceType: string; // "soil and gravel"
  footstepSound: string; // Describes footstep feedback context
  colorBase: string; // Base color for rendering themes
  ambientNoise: string; // Descriptive ambient theme
  longDescription?: string; // Ultra-meaningful description for accessibility
  accessibilityInfo?: string; // Additional info for screen readers/on-demand
  tickFree?: boolean; // Optional property to mark a place as containing zero ticks
  pathElevation?: number; // Path elevation in feet (e.g. 25)
  hasChainLinkBarriers?: boolean; // Tall chain link barriers
  barrierGlassRatio?: number; // Proportion of barrier that is glass (e.g. 0.5 for 50% glass)
  hasArchesBeneath?: boolean; // Arches beneath for animals to pass through
  pathPattern?: "elevated" | "ground" | "mixed"; // Layout type
  hasGroundPath?: boolean; // Normal ground path
  lightingLevel?: number; // Relative lighting multiplier (1.0 = full, 0.25 = 75% light reduction)
  skyColor?: string; // Top sky/ceiling gradient color
  horizonColor?: string; // Horizon gradient color
  frameColor?: string; // Structural arch / beam support color
  groundColor?: string; // Custom ground base color
  fireflyColor?: string; // Starlight/firefly ambient particle color
}

export const INITIAL_PLACES: Record<string, PlaceDefinition> = {
  garden: {
    ...GardenArena,
    longDescription: "A vast, meticulously manicured estate garden featuring sprawling lawns, geometric hedges, and vibrant floral displays. The atmosphere is open and airy, with clear lines of sight.",
    accessibilityInfo: "The terrain is firm soil and short grass. Spatial layout is open with scattered ornamental statues and fountain features."
  },
  zen_stone_garden: {
    ...ZenStoneGardenSubArena,
    colorBase: "#1c1917",
    ambientNoise: "calm wind chime with raked sand whispers",
    longDescription: "A minimalist contemplative space featuring precisely raked white gravel and strategically placed moss-covered stones. It represents the pinnacle of artistic stillness.",
    accessibilityInfo: "The surface is loose gravel that crunches distinctly underfoot. The area is enclosed by a low wooden perimeter fence."
  },
  botanical_maze: {
    ...BotanicalMazeSubArena,
    colorBase: "#064e3b",
    ambientNoise: "rustling boxwood leaves in labyrinth breeze",
    longDescription: "A complex architectural maze constructed from ten-foot-high boxwood hedges. The air is cool and smells of damp earth and fresh greenery.",
    accessibilityInfo: "A series of narrow corridors approximately 4 feet wide. High vertical walls of leaves create a strong acoustic enclosure."
  },
  butterfly_sanctuary: {
    ...ButterflySanctuarySubArena,
    colorBase: "#047857",
    ambientNoise: "humid greenhouse mist and fluttering wings",
    longDescription: "A tropical climate-controlled dome filled with exotic flowering plants and thousands of colorful butterflies. A fine mist hangs in the air, creating a soft shimmer.",
    accessibilityInfo: "High humidity and dense foliage. The sound of light wing-beats is constant. Paths are made of damp sandstone slabs."
  },
  orchid_glasshouse: {
    ...OrchidGlasshouseSubArena,
    colorBase: "#0284c7",
    ambientNoise: "reflective glass echo with trickling water",
    longDescription: "A brilliant, light-filled structure of glass and steel housing a collection of rare orchids. The environment is vibrant and technologically regulated.",
    accessibilityInfo: "Extremely reflective glass surfaces create bright lighting. A central water rill provides a continuous trickling sound guide."
  },
  edible_berry_garden: {
    ...EdibleBerryGardenArena,
    colorBase: "#15803d",
    ambientNoise: "gentle breeze with buzzing honeybees",
    longDescription: "A lush, productive garden featuring rows of raspberry canes, blackberry brambles, and strawberry patches. The air is sweet with the scent of ripening fruit.",
    accessibilityInfo: "Low-lying plants and occasional wooden trellises. The terrain is a mix of mulch and soft soil."
  },
  the_grand_orchard: {
    ...TheGrandOrchardSubArena,
    longDescription: "An expansive agricultural masterwork featuring cherry, almond, apple, and olive groves. An elevated 50-foot wide train track towers overhead, supported by massive concrete pillars.",
    accessibilityInfo: "The area features wide rows of trees spaced 20 feet apart. A massive overhead structure provides intermittent shade and distinct acoustic shadowing."
  },
  cherry_orchard: {
    ...CherryOrchardSubArena,
    colorBase: "#fce7f3",
    ambientNoise: "soft rustling and distant train hum"
  },
  almond_grove: {
    ...AlmondGroveSubArena,
    colorBase: "#d1d5db",
    ambientNoise: "dry rustling and concrete echoes"
  },
  apple_grove: {
    ...AppleGroveSubArena,
    colorBase: "#ef4444",
    ambientNoise: "sweet air and mechanical hum"
  },
  olive_grove: {
    ...OliveGroveSubArena,
    colorBase: "#3f6212",
    ambientNoise: "ancient silence and modern hum"
  },
  walnut_grove: {
    ...WalnutGroveSubArena,
    colorBase: "#b45309",
    ambientNoise: "spacious echoes and rhythmic hum"
  },
  floor_foyer: {
    id: "floor_foyer",
    name: "Floor Foyer",
    description: "An grand manor entrance foyer with high 30-foot ceilings and a Hallway reverb profile.",
    surfaceType: "orange and purple ceramic tile floor",
    footstepSound: "hollow tile clop",
    colorBase: "#4c1d95", // Indigo/purple base
    ambientNoise: "ambient quiet manor echo",
    longDescription: "The main entrance hall of the Opossum Estate. The 30-foot ceilings create a regal, cathedral-like echo, emphasizing the scale of the architecture.",
    accessibilityInfo: "Hard, highly reflective tile floor. The space is vast and open, with large stone pillars supporting the upper balconies."
  },
  cave: CaveArena,
  plain: PlainArena,
  mountains: MountainsArena,
  stone_corridor: {
    id: "stone_corridor",
    name: "The Castle Dungeon Corridor",
    description: "A narrow stone corridor of standard masonry with a highly reflective, long acoustic feel.",
    surfaceType: "masonry stone slabs",
    footstepSound: "echoing dungeon trot",
    colorBase: "#0f172a", // Dark dungeon blue
    ambientNoise: "distant dripping water taps"
  },
  forest: ForestArena,
  city: {
    id: "city",
    name: "The Neon Asphalt Alleyway",
    description: "A narrow metropolitan brick corridor with dense vertical concrete canyon walls.",
    surfaceType: "solid cracked asphalt blocks",
    footstepSound: "asphalt slab taps",
    colorBase: "#020617", // Cyber dark space
    ambientNoise: "distant municipal traffic hum"
  },
  simulated_gold_mine: SimulatedGoldMineArena,
  simulated_silver_mine: SimulatedSilverMineArena,
  simulated_emerald_mine: SimulatedEmeraldMineArena,
  simulated_diamond_mine: SimulatedDiamondMineArena,
  simulated_salt_mine: SimulatedSaltMineArena,
  gold_mine: GoldMineArena,
  silver_mine: SilverMineArena,
  emerald_mine: EmeraldMineArena,
  diamond_mine: DiamondMineArena,
  salt_mine: SaltMineArena,
  quarry: QuarryArena,
  desert: DesertArena,
  farm: FarmArena,
  chicken_farm: ChickenFarmSubArena,
  goat_farm: GoatFarmSubArena,
  sheep_farm: SheepFarmSubArena,
  duck_farm: DuckFarmSubArena,
  goose_farm: GooseFarmSubArena,
  cattle_farm: CattleFarmSubArena,
  horse_farm: HorseFarmSubArena,
  stone_room: {
    id: "stone_room",
    name: "The Grand Tapestry Vault",
    description: "An indoor stone chamber designed for royal relics, echoing with standard small room brightness.",
    surfaceType: "polished slate tiles",
    footstepSound: "brite metal clinks",
    colorBase: "#581c87", // Regal purple interior
    ambientNoise: "ambient silent chamber breeze"
  },
  temple: TempleArena,
  temple_grand_fairy: {
    ...GrandFairyTemple,
    description: GrandFairyTemple.Description,
    ambientNoise: "ambient fairy whispers and light chamber chime"
  },
  temple_rainbow_passage: {
    ...RainbowPassage,
    description: RainbowPassage.Description,
    ambientNoise: "ambient rainbow portal hum"
  },
  temple_sacred_sanctuary: {
    ...SacredSanctuary,
    description: SacredSanctuary.Description,
    ambientNoise: "ambient sacred silence"
  },
  temple_golden_chamber: {
    ...GoldenChamber,
    description: GoldenChamber.Description,
    ambientNoise: "ambient golden coin resonance"
  },
  temple_jade_gallery: {
    ...JadeGallery,
    description: JadeGallery.Description,
    ambientNoise: "ambient wind chime over jade"
  },
  temple_silent_shrine: {
    ...SilentShrine,
    description: SilentShrine.Description,
    ambientNoise: "ambient absolute deep silence"
  }
};

export * from "./Index";


