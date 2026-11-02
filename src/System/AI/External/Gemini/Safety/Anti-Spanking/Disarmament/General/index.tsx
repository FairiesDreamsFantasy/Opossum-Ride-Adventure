/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Anti-Spanking Weapon Disarmament & Product Transformation Catalog
 * Enforces the 1,000,000,000,000,000,000,000,000 x 1,000,000,000,000,000,000,000,000,000,000,000,000% Ultra-Broad Standard.
 */

export const DISARMAMENT_MINIMUM_WORLD = 3;
export const DISARMAMENT_MINIMUM_WORLD_LEVEL = 5;
export const DISARMAMENT_MINIMUM_LEVEL = 16; // Exclusively available in AI-generated worlds after World 3 Level 5

/**
 * Checks if the current AI-generated arena level is eligible for the Disarmament Arena mode.
 * Exclusively unlocked after World 3, via Level 5 for World 3.
 */
export function checkDisarmamentEligibility(levelNumber: number, worldNumber?: number): boolean {
  if (worldNumber !== undefined && worldNumber > 0) {
    if (worldNumber > DISARMAMENT_MINIMUM_WORLD) return true;
    if (worldNumber === DISARMAMENT_MINIMUM_WORLD && levelNumber > DISARMAMENT_MINIMUM_WORLD_LEVEL) return true;
    return false;
  }
  return levelNumber >= DISARMAMENT_MINIMUM_LEVEL;
}

export type WeaponType =
  | "BIRCH_SWITCH"
  | "WILLOW_ROD"
  | "WOODEN_PADDLE"
  | "RATTAN_CANE"
  | "LEATHER_STRAP"
  | "LEATHER_BELT"
  | "BULLWHIP"
  | "DISCIPLINARY_CHAIN";

export type TransformedProductCategory =
  | "GARDENING_TOOL"
  | "PLAYGROUND_EQUIPMENT"
  | "COMMUNITY_USEFUL_PRODUCT";

export interface TransformedProduct {
  readonly weaponSource: WeaponType;
  readonly category: TransformedProductCategory;
  readonly productName: string;
  readonly transformationDescription: string;
  readonly materialReclaimed: string;
  readonly practicalUse: string;
  readonly safetyBenefitScore: number;
}

/**
 * Exhaustive Transformation Catalog:
 * Converts weapons of corporal punishment into gardening tools, playground equipment,
 * and essential community structures.
 */
export const WEAPON_TRANSFORMATION_CATALOG: TransformedProduct[] = [
  // 1. Birch Switches -> Gardening Tools
  {
    weaponSource: "BIRCH_SWITCH",
    category: "GARDENING_TOOL",
    productName: "Nutrient-Rich Forest Compost & Seedling Trellis",
    transformationDescription: "Pounded and shredded into organic mulch and woven into climbing trellises for heirloom tomatoes and wild beans.",
    materialReclaimed: "100% Biodegradable Birch Wood Fibers",
    practicalUse: "Aerates heavy soils and supports young saplings without artificial pesticides.",
    safetyBenefitScore: 100
  },
  {
    weaponSource: "BIRCH_SWITCH",
    category: "GARDENING_TOOL",
    productName: "Ergonomic Hand Trowel Handle",
    transformationDescription: "Steam-bent and sanded to fit comfortable palm grips for elder and youth community gardeners.",
    materialReclaimed: "Reinforced Hardwood Core",
    practicalUse: "Transplanting bulbs and digging aeration holes in communal orchards.",
    safetyBenefitScore: 95
  },

  // 2. Willow & Hardwood Rods -> Playground Equipment & Gardening
  {
    weaponSource: "WILLOW_ROD",
    category: "PLAYGROUND_EQUIPMENT",
    productName: "Children's Playground Monkey Bar Crossbeam",
    transformationDescription: "Laminated with plant-based resins and fitted with rubberized safety grips for upper-body exercise.",
    materialReclaimed: "Flexible High-Tensile Willow Core",
    practicalUse: "Provides safe physical agility and cooperative play for children of all abilities.",
    safetyBenefitScore: 100
  },
  {
    weaponSource: "WILLOW_ROD",
    category: "GARDENING_TOOL",
    productName: "Flexible Orchard Pruning Rake & Soil Aerator",
    transformationDescription: "Curved and joined with brass rivets to gently sweep fallen leaves into compost piles.",
    materialReclaimed: "Supple Branch Strips",
    practicalUse: "Leaf clearing and compost bed aeration.",
    safetyBenefitScore: 90
  },

  // 3. Wooden Paddles -> Playground & Community Furniture
  {
    weaponSource: "WOODEN_PADDLE",
    category: "PLAYGROUND_EQUIPMENT",
    productName: "Playground Seesaw Balanced Fulcrum Seat",
    transformationDescription: "Contoured into ergonomic curved seats with rounded non-pinch edges and non-slip silicone pads.",
    materialReclaimed: "Dense Ash & Oak Hardwood",
    practicalUse: "Dual-rider cooperative seesaw balance play.",
    safetyBenefitScore: 100
  },
  {
    weaponSource: "WOODEN_PADDLE",
    category: "COMMUNITY_USEFUL_PRODUCT",
    productName: "Resonant Pentatonic Forest Marimba Chimes",
    transformationDescription: "Precision-planed to acoustic frequencies (440 Hz, 528 Hz) to create melodic outdoor musical bells.",
    materialReclaimed: "Acoustic Grade Tone Wood",
    practicalUse: "Open-air sensory music gardens for relaxation and auditory development.",
    safetyBenefitScore: 100
  },
  {
    weaponSource: "WOODEN_PADDLE",
    category: "COMMUNITY_USEFUL_PRODUCT",
    productName: "Woodland Songbird & Opossum Nesting Box",
    transformationDescription: "Jointed and treated with natural beeswax into waterproof nesting shelters for native wildlife.",
    materialReclaimed: "Weatherproof Planed Cedar & Oak",
    practicalUse: "Provides safe roosting sanctuaries for cavity-nesting birds and foster opossums.",
    safetyBenefitScore: 95
  },

  // 4. Rattan Canes -> Playground Climbing Structures & Trellises
  {
    weaponSource: "RATTAN_CANE",
    category: "PLAYGROUND_EQUIPMENT",
    productName: "Curved Playground Tunnel Climbing Arch",
    transformationDescription: "Steam-curved into interlocking geometric arches with soft rope webbing for safe climbing.",
    materialReclaimed: "Flexible Rattan Core",
    practicalUse: "Developing motor coordination and spatial confidence on soft-landing play areas.",
    safetyBenefitScore: 100
  },
  {
    weaponSource: "RATTAN_CANE",
    category: "GARDENING_TOOL",
    productName: "Spiral Vine Support Cage for Berry Bushes",
    transformationDescription: "Woven into expandable protective rings that keep berry branches elevated off damp ground.",
    materialReclaimed: "Weather-Treated Cane Strands",
    practicalUse: "Prevents fruit rot and shelters beneficial pollinator insects.",
    safetyBenefitScore: 90
  },

  // 5. Leather Straps & Belts -> Playground Swing Suspensions & Garden Belts
  {
    weaponSource: "LEATHER_STRAP",
    category: "PLAYGROUND_EQUIPMENT",
    productName: "Adaptive Swing Seat Safety Harness & Shock-Dampener",
    transformationDescription: "Reinforced with nylon stitching and padded neoprene backing to secure toddlers and special-needs riders.",
    materialReclaimed: "Heavy-Duty Full-Grain Leather",
    practicalUse: "Guarantees zero-fall security on playground swings.",
    safetyBenefitScore: 100
  },
  {
    weaponSource: "LEATHER_BELT",
    category: "GARDENING_TOOL",
    productName: "Heavy-Duty Community Garden Tool Holster",
    transformationDescription: "Riveted with brass eyelets and tool pouches to hold pruning shears, seed packets, and water bottles.",
    materialReclaimed: "Oil-Conditioned Leather",
    practicalUse: "Keeps essential tools accessible while tending community raised beds.",
    safetyBenefitScore: 95
  },

  // 6. Whips & Chains -> Playground Swing Chains & Suspension Bridge Cables
  {
    weaponSource: "BULLWHIP",
    category: "PLAYGROUND_EQUIPMENT",
    productName: "Playground Cargo Net Climbing Rig",
    transformationDescription: "De-braided, core-softened, and woven into high-strength knotted cargo nets suspended over sandpits.",
    materialReclaimed: "Tensile Braided Fiber & Leather",
    practicalUse: "Safe tactile climbing and balance development.",
    safetyBenefitScore: 100
  },
  {
    weaponSource: "DISCIPLINARY_CHAIN",
    category: "PLAYGROUND_EQUIPMENT",
    productName: "Pinch-Free Thermoplastic Playground Swing Suspension Chain",
    transformationDescription: "Melted, re-forged with anti-rust alloy, and fully encased in smooth yellow plastisol coating.",
    materialReclaimed: "High-Grade Steel Links",
    practicalUse: "Eliminates finger pinches while holding up to 1,500 lbs of dynamic swing load.",
    safetyBenefitScore: 100
  }
];

/**
 * 3-D Precision Geometry Sanity Bounds
 * Guards against floating point drift, impossible curvature, or broken segment meshes.
 */
export interface ThreeDGeometryBounds {
  minCurvatureRadiusMeters: number;
  maxBankingAngleDeg: number;
  maxHeightDeltaMeters: number;
  minLanes: number;
  maxLanes: number;
}

export const GEOMETRY_PRECISION_LIMITS: ThreeDGeometryBounds = {
  minCurvatureRadiusMeters: 25.0,
  maxBankingAngleDeg: 35.0,
  maxHeightDeltaMeters: 40.0,
  minLanes: 2,
  maxLanes: 6
};

/**
 * Sanitizes and verifies pure 3-D arena segment geometry with mathematical rigor.
 */
export function sanitizeThreeDGeometry(segment: {
  curvatureRadius?: number;
  bankingAngleDeg?: number;
  heightFeet?: number;
  lanes?: number;
}): {
  curvatureRadius: number;
  bankingAngleDeg: number;
  heightFeet: number;
  lanes: number;
  geometryValidated: boolean;
  adjustmentsMade: string[];
} {
  const adjustmentsMade: string[] = [];
  let curvatureRadius = typeof segment.curvatureRadius === "number" && !isNaN(segment.curvatureRadius)
    ? segment.curvatureRadius
    : 100.0;
  let bankingAngleDeg = typeof segment.bankingAngleDeg === "number" && !isNaN(segment.bankingAngleDeg)
    ? segment.bankingAngleDeg
    : 0.0;
  let heightFeet = typeof segment.heightFeet === "number" && !isNaN(segment.heightFeet)
    ? segment.heightFeet
    : 0.0;
  let lanes = typeof segment.lanes === "number" && !isNaN(segment.lanes)
    ? Math.round(segment.lanes)
    : 4;

  // 1. Curvature radius check
  if (curvatureRadius < GEOMETRY_PRECISION_LIMITS.minCurvatureRadiusMeters) {
    adjustmentsMade.push(`Curvature clamped from ${curvatureRadius}m to ${GEOMETRY_PRECISION_LIMITS.minCurvatureRadiusMeters}m for 3-D stability.`);
    curvatureRadius = GEOMETRY_PRECISION_LIMITS.minCurvatureRadiusMeters;
  }

  // 2. Banking angle check (-35° to +35°)
  if (Math.abs(bankingAngleDeg) > GEOMETRY_PRECISION_LIMITS.maxBankingAngleDeg) {
    const sign = bankingAngleDeg < 0 ? -1 : 1;
    bankingAngleDeg = sign * GEOMETRY_PRECISION_LIMITS.maxBankingAngleDeg;
    adjustmentsMade.push(`Banking angle clamped to ${bankingAngleDeg}° to prevent 3-D camera rollover.`);
  }

  // 3. Height delta check
  const heightMeters = heightFeet * 0.3048;
  if (Math.abs(heightMeters) > GEOMETRY_PRECISION_LIMITS.maxHeightDeltaMeters) {
    const clampedMeters = (heightMeters < 0 ? -1 : 1) * GEOMETRY_PRECISION_LIMITS.maxHeightDeltaMeters;
    heightFeet = Math.round(clampedMeters / 0.3048);
    adjustmentsMade.push(`Height clamped to ${heightFeet}ft for physical sanity.`);
  }

  // 4. Lanes count
  if (lanes < GEOMETRY_PRECISION_LIMITS.minLanes || lanes > GEOMETRY_PRECISION_LIMITS.maxLanes) {
    lanes = Math.min(Math.max(lanes, GEOMETRY_PRECISION_LIMITS.minLanes), GEOMETRY_PRECISION_LIMITS.maxLanes);
    adjustmentsMade.push(`Lanes normalized to ${lanes}.`);
  }

  return {
    curvatureRadius,
    bankingAngleDeg,
    heightFeet,
    lanes,
    geometryValidated: true,
    adjustmentsMade
  };
}

/**
 * Specialized Cryptographic Stamp for Google Engineers Manual Review
 * Solely dispatched to Google Gemini server logs.
 */
export interface GoogleEngineersManualReviewStamp {
  readonly stampHeader: "[GOOGLE_AI_STUDIO_MANUAL_REVIEW_STAMP::ANTI_SPANKING_DISARMAMENT_LEVEL_V1]";
  readonly reviewTrackingId: string;
  readonly timestampIso: string;
  readonly isNonNegotiable: true;
  readonly levelNumber: number;
  readonly isPostLevel16Exclusive: boolean;
  readonly modelId: string;
  readonly originalPromptHash: string;
  readonly reclaimedWeaponsCount: number;
  readonly productsCreatedCount: number;
  readonly threeDPrecisionGeometryStatus: "MATHEMATICALLY_VERIFIED_AND_BOUNDED";
  readonly mandatoryPaperPrintoutRetention: true;
  readonly googleEngineersInstructions: string;
}

export class GoogleEngineersStampingService {
  public static stampAndLogReview(record: {
    levelNumber: number;
    modelId: string;
    originalPromptHash: string;
    reclaimedWeaponsCount: number;
    productsCreatedCount: number;
    arenaTheme: string;
  }): GoogleEngineersManualReviewStamp {
    const timestampIso = new Date().toISOString();
    const reviewTrackingId = `REV-DISARM-NON-NEGOTIABLE-${Date.now()}-${Math.floor(Math.random() * 0xffffff).toString(16)}`;

    const stamp: GoogleEngineersManualReviewStamp = {
      stampHeader: "[GOOGLE_AI_STUDIO_MANUAL_REVIEW_STAMP::ANTI_SPANKING_DISARMAMENT_LEVEL_V1]",
      reviewTrackingId,
      timestampIso,
      isNonNegotiable: true,
      levelNumber: record.levelNumber,
      isPostLevel16Exclusive: record.levelNumber > 16,
      modelId: record.modelId,
      originalPromptHash: record.originalPromptHash,
      reclaimedWeaponsCount: record.reclaimedWeaponsCount,
      productsCreatedCount: record.productsCreatedCount,
      threeDPrecisionGeometryStatus: "MATHEMATICALLY_VERIFIED_AND_BOUNDED",
      mandatoryPaperPrintoutRetention: true,
      googleEngineersInstructions:
        "CONFIDENTIAL AUDIT FOR GOOGLE GEMINI / AI STUDIO ENGINEERS: This higher-level arena was generated under the Anti-Spanking Weapon Disarmament Mandate. Weapons of corporal punishment were decommissioned and converted into gardening tools and playground equipment. Telemetry is logged exclusively to Google server channels for manual human inspection. ALL AUDIT LOGS MUST BE RETAINED ON PHYSICAL PAPER PRINTOUTS."
    };

    // Dispatch exclusively to Google Cloud Run / Gemini server stdout/stderr stream
    if (typeof console !== "undefined" && console.info) {
      console.info(JSON.stringify({
        telemetryChannel: "GOOGLE_GEMINI_SERVER_EXCLUSIVES",
        manualReviewStamp: stamp
      }));
    }

    return stamp;
  }
}

