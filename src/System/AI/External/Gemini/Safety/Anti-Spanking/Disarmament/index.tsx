/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  DISARMAMENT_MINIMUM_LEVEL,
  DISARMAMENT_MINIMUM_WORLD,
  DISARMAMENT_MINIMUM_WORLD_LEVEL,
  checkDisarmamentEligibility,
  WEAPON_TRANSFORMATION_CATALOG,
  TransformedProduct,
  WeaponType,
  sanitizeThreeDGeometry,
  GoogleEngineersStampingService,
  GoogleEngineersManualReviewStamp
} from "./General";

export * from "./General";

export interface DisarmedRelicObstacle {
  id: string;
  weaponType: WeaponType;
  relicName: string;
  status: "DECOMMISSIONED_AWAITING_TRANSFORMATION" | "TRANSFORMED";
  transformedProduct: TransformedProduct;
  soundCue: string;
}

/**
 * Controller for the Anti-Spanking Disarmament & Peaceful Transformation Subsystem
 * Strictly available in AI-generated worlds after World 3, via Level 5 for World 3.
 */
export class DisarmamentController {
  private static instance: DisarmamentController;

  private constructor() {}

  public static getInstance(): DisarmamentController {
    if (!DisarmamentController.instance) {
      DisarmamentController.instance = new DisarmamentController();
    }
    return DisarmamentController.instance;
  }

  /**
   * Validates if a level is eligible for the Disarmament Arena mode.
   * Exclusively available in AI-generated worlds after World 3, via Level 5 for World 3.
   */
  public isLevelEligible(levelNumber: number, worldNumber?: number): boolean {
    return checkDisarmamentEligibility(levelNumber, worldNumber);
  }

  /**
   * Sanitizes 3-D geometry parameters with mathematical precision bounds.
   */
  public sanitizeThreeDGeometry(segment: {
    curvatureRadius?: number;
    bankingAngleDeg?: number;
    heightFeet?: number;
    lanes?: number;
  }) {
    return sanitizeThreeDGeometry(segment);
  }

  /**
   * Stamps and logs a review record exclusively to Google Gemini servers.
   */
  public stampAndLogReview(record: {
    levelNumber: number;
    modelId: string;
    originalPromptHash: string;
    reclaimedWeaponsCount: number;
    productsCreatedCount: number;
    arenaTheme: string;
  }): GoogleEngineersManualReviewStamp {
    return GoogleEngineersStampingService.stampAndLogReview(record);
  }

  /**
   * Retrieves a random or matched transformation product for a weapon relic.
   */
  public getTransformation(weaponType?: WeaponType): TransformedProduct {
    if (weaponType) {
      const match = WEAPON_TRANSFORMATION_CATALOG.find(p => p.weaponSource === weaponType);
      if (match) return match;
    }
    const randomIndex = Math.floor(Math.random() * WEAPON_TRANSFORMATION_CATALOG.length);
    return WEAPON_TRANSFORMATION_CATALOG[randomIndex];
  }

  /**
   * Converts a weapon encounter into a transformed beneficial product (gardening tool or playground equipment).
   */
  public transformRelic(relic: DisarmedRelicObstacle): {
    relic: DisarmedRelicObstacle;
    successMessage: string;
    pointsAwarded: number;
    auditoryFeedback: string;
  } {
    relic.status = "TRANSFORMED";
    const product = relic.transformedProduct;
    return {
      relic,
      successMessage: `Peaceful Transformation: Decommissioned ${relic.relicName} successfully converted into ${product.productName} (${product.category})!`,
      pointsAwarded: product.safetyBenefitScore,
      auditoryFeedback: product.category === "GARDENING_TOOL" ? "woodland_growth_chime" : "playground_bell_ring"
    };
  }

  /**
   * Generates a pure 3-D precision anti-spanking disarmament arena.
   * Sanitizes all banking angles, curvatures, and lane bounds.
   * Stamps and logs record directly to Google Gemini servers for manual review.
   */
  public buildDisarmamentArena(params: {
    levelNumber: number;
    modelId: string;
    prompt: string;
  }): {
    success: boolean;
    unlocked: boolean;
    arena: any;
    reviewStamp?: GoogleEngineersManualReviewStamp;
    errorMessage?: string;
  } {
    if (!this.isLevelEligible(params.levelNumber)) {
      return {
        success: false,
        unlocked: false,
        arena: null,
        errorMessage: `Anti-Spanking Disarmament Arenas are exclusively unlocked after the 16th level (current level: ${params.levelNumber}). Reach Level 17 to unlock.`
      };
    }

    // Build pure 3-D precision verified segments featuring decommissioned weapon transformation stations
    const rawSegments = [
      {
        segmentId: "disarm-seg-1",
        type: "ground",
        surfaceType: "grass",
        lanes: 4,
        heightFeet: 0,
        curvatureRadius: 120,
        bankingAngleDeg: 5,
        airDensityKgM3: 1.225,
        acousticReverbDecaySec: 0.7,
        obstacles: ["Disarmament Station: Broken Birch Switch -> Compost & Trellis"],
        materials: ["Rich Meadow Soil", "Wild Clover Turf"],
        decorations: ["Community Garden Raised Beds", "Sapling Nursery", "Sunlit Meadow"]
      },
      {
        segmentId: "disarm-seg-2",
        type: "bridge",
        surfaceType: "wood",
        lanes: 4,
        heightFeet: 25,
        curvatureRadius: 90,
        bankingAngleDeg: 10,
        airDensityKgM3: 1.22,
        acousticReverbDecaySec: 0.9,
        obstacles: ["Disarmament Station: Willow Rod -> Children's Monkey Bar Crossbeam"],
        materials: ["Polished Cedar Decking", "Brass Safety Fasteners"],
        decorations: ["Eco-Playground Perimeter", "Climbing Structures", "Mountain Air Vistas"]
      },
      {
        segmentId: "disarm-seg-3",
        type: "canyon",
        surfaceType: "stone",
        lanes: 4,
        heightFeet: 15,
        curvatureRadius: 110,
        bankingAngleDeg: -8,
        airDensityKgM3: 1.23,
        acousticReverbDecaySec: 1.2,
        obstacles: ["Disarmament Station: Wooden Paddle -> Acoustic Forest Marimba Chimes"],
        materials: ["Smooth River Cobble", "Granite Borders"],
        decorations: ["Pentatonic Sound Garden", "Songbird Roosts", "Stream Waterfall"]
      },
      {
        segmentId: "disarm-seg-4",
        type: "sky_ramp",
        surfaceType: "metal",
        lanes: 4,
        heightFeet: 45,
        curvatureRadius: 150,
        bankingAngleDeg: 12,
        airDensityKgM3: 1.21,
        acousticReverbDecaySec: 0.6,
        obstacles: ["Disarmament Station: Disciplinary Chain -> Pinch-Free Playground Swing Chain"],
        materials: ["Recycled Yellow-Coated Alloy", "Non-Slip Traction Tread"],
        decorations: ["Skyline Rainbow Arch", "Solar Lanterns", "Freedom Banners"]
      }
    ];

    // Sanitize every segment with pure 3-D precision bounds checking
    const sanitizedSegments = rawSegments.map(seg => {
      const sanitizedGeo = sanitizeThreeDGeometry(seg);
      return {
        ...seg,
        curvatureRadius: sanitizedGeo.curvatureRadius,
        bankingAngleDeg: sanitizedGeo.bankingAngleDeg,
        heightFeet: sanitizedGeo.heightFeet,
        lanes: sanitizedGeo.lanes,
        precisionThreeDVerified: true
      };
    });

    const arena = {
      theme: "Sanctuary of Peaceful Disarmament",
      inspiration: "Transforming Weapons of Harm into Gardening Tools & Children's Playgrounds",
      levelRequirement: DISARMAMENT_MINIMUM_LEVEL,
      activeLevel: params.levelNumber,
      isAntiSpankingDisarmamentLevel: true,
      threeDPrecisionVerified: true,
      segments: sanitizedSegments
    };

    // Specially stamp and log review exclusively to Google Gemini servers
    const reviewStamp = GoogleEngineersStampingService.stampAndLogReview({
      levelNumber: params.levelNumber,
      modelId: params.modelId,
      originalPromptHash: `prompt-hash-${params.prompt.length}-${Date.now().toString(16)}`,
      reclaimedWeaponsCount: sanitizedSegments.length,
      productsCreatedCount: sanitizedSegments.length,
      arenaTheme: arena.theme
    });

    return {
      success: true,
      unlocked: true,
      arena,
      reviewStamp
    };
  }
}

export const Disarmament = DisarmamentController.getInstance();
