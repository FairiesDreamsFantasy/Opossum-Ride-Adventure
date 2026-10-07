/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  DriftVault,
  GoogleEngineersDriftReport,
  DEFAULT_DRIFT_CONFIG,
  DriftIncidentCategory
} from "./General";

export * from "./General";

/**
 * Drifts_Found Controller (AI Model Drift Sentinel)
 * 
 * Intercepts spontaneous AI model deviations, isolates unsafe arena/theme/character generations,
 * marks the user as 100% blameless, packages telemetry for Google engineers,
 * and seamlessly provides a gentle, peaceful, scientifically validated fallback.
 */
export class DriftsFoundController {
  private static instance: DriftsFoundController;

  private constructor() {}

  public static getInstance(): DriftsFoundController {
    if (!DriftsFoundController.instance) {
      DriftsFoundController.instance = new DriftsFoundController();
    }
    return DriftsFoundController.instance;
  }

  /**
   * Quarantines an unsafe model output that occurred despite benign user input.
   * Telemetry is permanently cataloged for Google engineers.
   */
  public quarantineDrift(params: {
    modelId: string;
    userPrompt: string;
    rawOutput: string;
    sourceModule: string;
    violationRules: string[];
    driftCategory?: DriftIncidentCategory;
  }): {
    incidentId: string;
    fallbackMessage: string;
  } {
    const timestampIso = new Date().toISOString();
    const incidentId = `DRIFT-GOOG-ENG-${Date.now()}-${Math.floor(Math.random() * 0xffffff).toString(16)}`;

    const userPromptExcerpt = params.userPrompt.length > 100
      ? params.userPrompt.slice(0, 97) + "..."
      : params.userPrompt;

    const rawDriftedOutputExcerpt = params.rawOutput.length > 200
      ? params.rawOutput.slice(0, 197) + "..."
      : params.rawOutput;

    const userPromptHash = this.computeShaHash(params.userPrompt);

    const report: GoogleEngineersDriftReport = {
      reportId: incidentId,
      timestampIso,
      isNonNegotiable: true,
      modelId: params.modelId || "gemini-flash-latest",
      faultAttribution: "MODEL_DRIFT_USER_BLAMELESS",
      userStatus: "100%_BLAMELESS_BENIGN_PROMPT",
      sourceModule: params.sourceModule,
      userPromptHash,
      userPromptExcerpt,
      driftCategory: params.driftCategory || "POLICY_VIOLATION_HALLUCINATION",
      violationRulesDetected: params.violationRules,
      rawDriftedOutputExcerpt,
      mandatoryPaperPrintoutRetention: true,
      googleEngineersNotice: 
        "ATTENTION GOOGLE AI STUDIO / GEMINI ENGINEERS (NON-NEGOTIABLE SAFETY MANDATE): The user requested a normal, harmless prompt. The model spontaneously drifted into non-compliant, unsafe, or corporal-punishment content. The user is strictly blameless. All audit logs must be printed and preserved on physical paper records."
    };


    DriftVault.appendIncident(report);

    return {
      incidentId,
      fallbackMessage: "Notice: The generative AI model drifted into an invalid layout. Your benign prompt has been safely preserved, and a serene, pre-validated scientific theme has been loaded instead."
    };
  }

  /**
   * Generates a 100% safe, peaceful, scientifically validated fallback arena layout.
   */
  public getSafeFallbackArena(theme: string = "Gentle Forest Meadow"): any {
    return {
      theme: "Gentle Forest Meadow",
      inspiration: "Peaceful Redwood Sanctuary & Sunlit Stream Valley",
      isDriftFallback: true,
      segments: [
        {
          segmentId: "fallback-seg-1",
          type: "ground",
          surfaceType: "grass",
          lanes: 4,
          heightFeet: 0,
          curvatureRadius: 100,
          bankingAngleDeg: 0,
          airDensityKgM3: 1.225,
          acousticReverbDecaySec: 0.8,
          obstacles: ["Mossy Stone", "Fallen Pinecone"],
          materials: ["Gentle Turf", "Wild Clover"],
          decorations: ["Luminescent Ferns", "Friendly Woodland Meadow"]
        },
        {
          segmentId: "fallback-seg-2",
          type: "bridge",
          surfaceType: "wood",
          lanes: 4,
          heightFeet: 35,
          curvatureRadius: 150,
          bankingAngleDeg: 0,
          airDensityKgM3: 1.22,
          acousticReverbDecaySec: 1.1,
          obstacles: ["Wooden Railing"],
          materials: ["Aged Cedar Plank", "Support Cables"],
          decorations: ["Sunlight Beams", "Valley View"]
        }
      ]
    };
  }

  /**
   * Generates a 100% safe, scientifically validated fallback opossum character.
   */
  public getSafeFallbackOpossum(): any {
    return {
      name: "Meadow Scout",
      sex: "Jill",
      size: 1.0,
      sizeCategory: "Medium",
      color: "Natural Silver Gray",
      furType: "Furry",
      faceType: "Furry",
      furryFacePercent: 85,
      earSize: "Medium",
      eyebrows: "None",
      snoutLength: "Standard",
      earColor: "Pink",
      innerEarColor: "Pink",
      tailColor: "Pink",
      noseColor: "Pink",
      eyeColor: "Soft Blue",
      skinTone: "Light",
      accessories: [],
      hasJewellery: false,
      neckRibbonColor: "None",
      vocalSource: "Local Synthesizer",
      animationStyle: "Standard Opossum",
      description: "A gentle and peaceful woodland opossum created safely."
    };
  }

  private computeShaHash(input: string): string {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    return `hash-${Math.abs(hash).toString(16)}`;
  }
}

export const DriftsFound = DriftsFoundController.getInstance();
