/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MAX_OPOSSUM_HOSTESSES } from "../General";

export type HostessRole = 
  | "TEA_SERVER"
  | "STORYTELLER"
  | "RECEPTION_HOSTESS"
  | "PASTRY_CURATOR"
  | "TABLE_ATTENDANT";

export type HostessArchetypeId = 
  | "GRAY_CINDERELLA_GOWN"
  | "WHITE_PASTEL_GOWN"
  | "GOLD_DARK_SKIN_RED_ONESIE"
  | "RED_ORANGE_TAN_SKIN_WHITE_GOWN";

export interface OpossumHostessSpecification {
  readonly id: string;
  readonly name: string;
  readonly archetype: HostessArchetypeId;
  readonly role: HostessRole;
  readonly heightInches: number; // 72" (6ft) or 84" (7ft)
  readonly heightFeetFormatted: string;
  readonly furColor: string;
  readonly outerEarColor: string;
  readonly innerEarColor: string;
  readonly noseColor: string;
  readonly tailColor: string;
  readonly eyeColor: string;
  readonly faceSkinTone: string;
  readonly furryFacePercentage: number;
  readonly outfitDescription: string;
  readonly outfitStyle: "CINDERELLA_BALLGOWN" | "PASTEL_GOWN" | "RED_ONESIE" | "WHITE_CINDERELLA_GOWN";
  readonly currentActivity: string;
  readonly storybookTitleReading?: string;
  readonly specialGreeting: string;
}

/**
 * The 4 Handcrafted Archetypes for the Grand Tea Room Hostesses
 */
export const HOSTESS_ARCHETYPE_TEMPLATES: Record<HostessArchetypeId, Omit<OpossumHostessSpecification, "id" | "name" | "role" | "currentActivity">> = {
  // 1. Gray Opossum in Cinderella Gown
  GRAY_CINDERELLA_GOWN: {
    archetype: "GRAY_CINDERELLA_GOWN",
    heightInches: 72,
    heightFeetFormatted: "6'0\"",
    furColor: "Sleek Silver Gray",
    outerEarColor: "Gray",
    innerEarColor: "Delicate Pink",
    noseColor: "Pink",
    tailColor: "Pink",
    eyeColor: "Emerald Green",
    faceSkinTone: "Alabaster Off-White",
    furryFacePercentage: 0,
    outfitDescription: "Graceful Cerulean-Blue Gown resembling Cinderella's ballgown with shimmering satin folds, white lace trimming, and modest puff sleeves.",
    outfitStyle: "CINDERELLA_BALLGOWN",
    specialGreeting: "Welcome to the Grand Tea Room! May I pour you a fresh cup of botanical meadow tea?"
  },

  // 2. White Opossum in Family-Friendly Pastel Gown
  WHITE_PASTEL_GOWN: {
    archetype: "WHITE_PASTEL_GOWN",
    heightInches: 72,
    heightFeetFormatted: "6'0\"",
    furColor: "Pristine Snow White",
    outerEarColor: "Pure White",
    innerEarColor: "Soft Rose Pink",
    noseColor: "Pink",
    tailColor: "Pink",
    eyeColor: "Clear Sky Blue",
    faceSkinTone: "Pure White",
    furryFacePercentage: 0,
    outfitDescription: "Family-Friendly Soft Pastel Lavender-Pink Gown with satin ribbon sash and embroidered floral hem.",
    outfitStyle: "PASTEL_GOWN",
    specialGreeting: "Peace and joy to you and your family! Please make yourselves comfortable by the sunlit bay window."
  },

  // 3. Gold Opossum with Dark Skin in Red Onesie (Key for meaningful inclusion & balance)
  GOLD_DARK_SKIN_RED_ONESIE: {
    archetype: "GOLD_DARK_SKIN_RED_ONESIE",
    heightInches: 72,
    heightFeetFormatted: "6'0\"",
    furColor: "Rich Radiant Gold",
    outerEarColor: "Gold",
    innerEarColor: "Dark Pink",
    noseColor: "Dark Pink",
    tailColor: "Dark Pink",
    eyeColor: "Vibrant Emerald Green",
    faceSkinTone: "Rich Dark Brown",
    furryFacePercentage: 0,
    outfitDescription: "Tailored Royal-Red Onesie crafted from soft brushed velour with gold piping, front zipper cover, and cozy cuffs.",
    outfitStyle: "RED_ONESIE",
    specialGreeting: "Warmest greetings! I have freshly baked clover biscuits and warm rooibos waiting for your table."
  },

  // 4. Red-Orange Opossum with Tan Skin in White Cinderella Gown (7ft tall)
  RED_ORANGE_TAN_SKIN_WHITE_GOWN: {
    archetype: "RED_ORANGE_TAN_SKIN_WHITE_GOWN",
    heightInches: 84,
    heightFeetFormatted: "7'0\"",
    furColor: "Striking Red-Orange",
    outerEarColor: "Red-Orange",
    innerEarColor: "Soft Coral Pink",
    noseColor: "Red-Orange",
    tailColor: "Red-Orange",
    eyeColor: "Deep Brilliant Blue",
    faceSkinTone: "Warm Tan / Caramel",
    furryFacePercentage: 0,
    outfitDescription: "Majestic Pearl-White Ballgown resembling Cinderella's coronation gown with tiered organza flounces, silver threading, and regal modest neckline.",
    outfitStyle: "WHITE_CINDERELLA_GOWN",
    specialGreeting: "A wonderful evening to our guests! Let me escort your family to the grand chandelier table."
  }
};

const HOSTESS_NAMES = [
  "Clara", "Seraphina", "Aurelia", "Bernice", "Cordelia", "Dorothea", "Evangeline", "Florencia",
  "Genevieve", "Helena", "Isolde", "Jolene", "Katarina", "Lavinia", "Magnolia", "Noelle",
  "Ophelia", "Penelope", "Rosalind", "Sybilla", "Theodora", "Ursula", "Valencia", "Winnifred",
  "Yvette", "Zephyrine", "Adelaide", "Beatrix", "Constance", "Daphne", "Emmeline", "Felicity",
  "Gwendolyn", "Harriet", "Ingrid", "Johanna", "Keziah", "Lorelei", "Mariana", "Nicolette",
  "Ondine", "Prudence", "Rowena", "Susannah", "Tabitha", "Verity", "Winona", "Xanthia",
  "Yolanda", "Zenobia", "Astrid", "Bridget", "Clementine", "Delilah", "Esther", "Fiona",
  "Gisela", "Hannelore", "Irene", "Judith", "Katia", "Lucinda", "Miriam", "Nathalia"
];

const STORYBOOK_TITLES = [
  "The Little Opossum Who Loved Meadow Flowers",
  "The Starlit Forest Lullaby",
  "Peter Rabbit and the Berry Patch",
  "The Kind Giant Redwood Tree",
  "Adventures in the Honeyed Clover Meadow",
  "The Friendly Firefly's Gentle Lantern",
  "Baby Bird's First Feathered Flight",
  "The Clockwork Music Box in the Attic"
];

/**
 * Generates the full roster of up to 64 Humanoid Opossum Hostesses with balanced archetypes and roles.
 */
export function generateGrandTeaRoomHostesses(totalHostesses: number = MAX_OPOSSUM_HOSTESSES): OpossumHostessSpecification[] {
  const count = Math.min(Math.max(4, totalHostesses), MAX_OPOSSUM_HOSTESSES);
  const hostesses: OpossumHostessSpecification[] = [];
  const archetypes: HostessArchetypeId[] = [
    "GRAY_CINDERELLA_GOWN",
    "WHITE_PASTEL_GOWN",
    "GOLD_DARK_SKIN_RED_ONESIE",
    "RED_ORANGE_TAN_SKIN_WHITE_GOWN"
  ];

  const roles: HostessRole[] = [
    "TEA_SERVER",
    "STORYTELLER",
    "RECEPTION_HOSTESS",
    "PASTRY_CURATOR",
    "TABLE_ATTENDANT"
  ];

  for (let i = 0; i < count; i++) {
    const archetypeId = archetypes[i % archetypes.length];
    const template = HOSTESS_ARCHETYPE_TEMPLATES[archetypeId];
    const name = HOSTESS_NAMES[i % HOSTESS_NAMES.length];
    const role = roles[i % roles.length];
    const id = `HOSTESS-${i + 1}-${archetypeId.toLowerCase()}`;

    let currentActivity = "Welcoming guests and preparing porcelain settings.";
    let storybookTitleReading: string | undefined = undefined;

    if (role === "TEA_SERVER") {
      currentActivity = "Steeping fresh Mountain Chamomile and pouring from a silver teapot.";
    } else if (role === "STORYTELLER") {
      storybookTitleReading = STORYBOOK_TITLES[i % STORYBOOK_TITLES.length];
      currentActivity = `Gently reading "${storybookTitleReading}" to infants and toddlers in strollers.`;
    } else if (role === "RECEPTION_HOSTESS") {
      currentActivity = "Greeting visiting families and guiding them to reserved parlor tables.";
    } else if (role === "PASTRY_CURATOR") {
      currentActivity = "Arranging tiered stands with fresh strawberry scones and honey clover tarts.";
    } else if (role === "TABLE_ATTENDANT") {
      currentActivity = "Refilling honey pots and presenting fresh cloth napkins.";
    }

    hostesses.push({
      ...template,
      id,
      name,
      role,
      currentActivity,
      storybookTitleReading
    });
  }

  return hostesses;
}

export const TeaPartyHostesses = {
  systemName: "Grand Tea Room Hostesses Subsystem",
  HOSTESS_ARCHETYPE_TEMPLATES,
  generateGrandTeaRoomHostesses
};

export default TeaPartyHostesses;
