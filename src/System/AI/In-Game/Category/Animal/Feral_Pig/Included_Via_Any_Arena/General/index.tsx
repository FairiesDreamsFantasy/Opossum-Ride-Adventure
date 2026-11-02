/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ArenaInclusionProfile {
  arenaId: string;
  arenaType: "garden" | "cave" | "orchard" | "farm" | "trail" | "desert" | "courtyard" | "castle" | "generic";
  spawnDensityMultiplier: number;
  initialState: "rooting" | "patrolling";
  allowedGenders: ("Boar" | "Sow")[];
  groundLevelZ: number;
  rootingSurfaceAcoustics: "soil" | "stone" | "grass" | "dirt" | "wood";
}

export class FeralPigArenaInclusionEngine {
  /**
   * Universal Arena Inclusivity Resolver
   * Resolves feral pig parameters across ANY arena including Garden, Caves, Orchards, and Deserts
   */
  public static getInclusionProfileForArena(arenaType: string, arenaId: string = "generic"): ArenaInclusionProfile {
    const normalized = (arenaType || "").toLowerCase();
    
    switch (normalized) {
      case "garden":
        return {
          arenaId,
          arenaType: "garden",
          spawnDensityMultiplier: 1.2,
          initialState: "rooting",
          allowedGenders: ["Boar", "Sow"],
          groundLevelZ: 0,
          rootingSurfaceAcoustics: "grass"
        };
      case "cave":
        return {
          arenaId,
          arenaType: "cave",
          spawnDensityMultiplier: 0.8,
          initialState: "patrolling",
          allowedGenders: ["Boar"],
          groundLevelZ: 0,
          rootingSurfaceAcoustics: "stone"
        };
      case "orchard":
      case "farm":
        return {
          arenaId,
          arenaType: "orchard",
          spawnDensityMultiplier: 1.5,
          initialState: "rooting",
          allowedGenders: ["Boar", "Sow"],
          groundLevelZ: 0,
          rootingSurfaceAcoustics: "soil"
        };
      case "desert":
        return {
          arenaId,
          arenaType: "desert",
          spawnDensityMultiplier: 0.5,
          initialState: "patrolling",
          allowedGenders: ["Boar", "Sow"],
          groundLevelZ: 0,
          rootingSurfaceAcoustics: "dirt"
        };
      default:
        return {
          arenaId,
          arenaType: "generic",
          spawnDensityMultiplier: 1.0,
          initialState: "patrolling",
          allowedGenders: ["Boar", "Sow"],
          groundLevelZ: 0,
          rootingSurfaceAcoustics: "grass"
        };
    }
  }
}
