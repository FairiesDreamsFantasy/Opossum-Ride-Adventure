/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GameLevel, TickItem, Opponent, ObstacleItem, AnimalItem } from "../../../types";
import { INITIAL_PLACES } from "../../../Arena";
import { PlaceResolver } from "../Resolver";
import { isMooseAndMonkeysAllowedInPlace } from "../../AI/In-Game/Moose_and_Monkeys_Not_Included_In_the_Garden";
import { GeminiSystem } from "../../AI/External/Gemini";
import { PseudorandomGenerator, PseudorandomFunctions } from "../../AI/In-Game/Category/Psudorandom_Functions";
import { OpponentAIEngine, MOOSE_BABYLON_NAMES, MONKEY_BABYLON_NAMES } from "../../AI/In-Game/Category/Opponents";
import { FeralPigArenaInclusionEngine } from "../../AI/In-Game/Category/Animal/Feral_Pig/Included_Via_Any_Arena";
import { BASE_PIG_COAT_HUES } from "../../../Characters/Pigs/Animations/Color_Palette/General";

export { MOOSE_BABYLON_NAMES, MONKEY_BABYLON_NAMES };

/**
 * Procedural Spawner system for Opossum Ride Adventure.
 * Handles exact generation of ticks/treats, rock and fence obstacles, and monkey-riding moose opponents.
 */
export const Spawner = {
  /**
   * Spawns Ticks/Treats evenly along the level course or scattered in the foyer.
   */
  spawnTicks(levelObj: GameLevel, levelId: number): TickItem[] {
    const spawnedTicks: TickItem[] = [];
    const placeCheck = PlaceResolver.resolvePlace(levelObj.placeId);
    
    // Safety check: If placeId is synthetic (AI-generated), it is NOT tickFree unless specified
    const isSynthetic = levelObj.placeId.startsWith("ai_gen_");
    if (!isSynthetic && placeCheck.tickFree) {
      return spawnedTicks;
    }

    const rng = new PseudorandomGenerator(levelId * 1000 + 123);

    if (levelId === 0) {
      // Spawn 15 scattered ticks in the 2D floor foyer
      for (let i = 0; i < 15; i++) {
        spawnedTicks.push({
          id: i,
          x: Math.round(150 + rng.range(0, 1700)),
          y: Math.round(150 + rng.range(0, 1700)),
          collected: false,
          isTick: true
        });
      }
    } else {
      const ticksCount = Math.floor((levelObj.targetDistance / 100) * levelObj.tickDensity);
      const placements = PseudorandomFunctions.generateTreatPlacements(levelId, ticksCount, levelObj.targetDistance);
      
      placements.forEach((p, i) => {
        spawnedTicks.push({
          id: i,
          z: p.z,
          lane: p.lane,
          collected: false,
          isTick: p.isTick
        });
      });
    }

    return spawnedTicks;
  },

  /**
   * Spawns obstacles (rocks, fences, garden plants) outside the 300-feet start/end buffers.
   */
  spawnObstacles(levelObj: GameLevel, levelId: number): ObstacleItem[] {
    const spawnedObstacles: ObstacleItem[] = [];
    if (levelId <= 0) {
      return spawnedObstacles;
    }

    const placeId = levelObj.placeId.toLowerCase();
    const isOrchard = placeId === "the_grand_orchard" || placeId.includes("orchard");
    const isFarm = placeId === "farm" || placeId.includes("_farm");
    const isSynthetic = placeId.startsWith("ai_gen_");

    if (!isSynthetic && (isOrchard || isFarm)) {
      return spawnedObstacles; // Orchard and Farm arenas have no obstacles
    }

    const bufferMinZ = 91.44; // 300 feet start buffer
    const bufferMaxZ = levelObj.targetDistance - 91.44; // 300 feet end buffer

    const spacingMeters = levelId <= 20 ? 152.4 : 45;
    const obstaclesCount = Math.floor((levelObj.targetDistance - 60) / spacingMeters);
    
    const placements = PseudorandomFunctions.generateObstaclePlacements(levelId, obstaclesCount, 80, levelObj.targetDistance - 80);

    placements.forEach((p, i) => {
      if (p.z >= bufferMinZ && p.z <= bufferMaxZ) {
        let oType: "fence" | "rock" | "garden_plant" = "rock";
        const isGardenLike = levelObj.placeId === "garden" || levelObj.placeId.includes("garden") || levelObj.placeId.includes("maze") || levelObj.placeId.includes("sanctuary") || levelObj.placeId.includes("glasshouse");
        
        if (isGardenLike) {
          oType = i % 2 === 0 ? "fence" : "garden_plant";
        } else if (levelObj.placeId === "cave" || levelObj.placeId.includes("cave")) {
          oType = "rock";
        } else {
          oType = i % 2 === 0 ? "fence" : "rock";
        }
        
        spawnedObstacles.push({
          id: i,
          type: oType,
          z: p.z,
          lane: p.lane,
          width: oType === "fence" ? 2.5 : 1.5,
          height: oType === "fence" ? 1.4 : 1.0
        });
      }
    });

    return spawnedObstacles;
  },

  /**
   * Spawns opossums riding moose with correct names, speeds, genders, and behaviours
   * delegated scientifically to OpponentAIEngine.
   */
  spawnOpponents(levelObj: GameLevel, levelId: number, selectedOpossumId: string): Opponent[] {
    return OpponentAIEngine.generateOpponents(levelObj, levelId, selectedOpossumId);
  },

  /**
   * Spawns specialized wildlife (Owls in Orchard, Frogs in Forest, Feral Pigs in Garden and nature-based arenas).
   */
  spawnAnimals(levelObj: GameLevel): AnimalItem[] {
    const spawnedAnimals: AnimalItem[] = [];
    const id = levelObj.placeId.toLowerCase();
    let currentAnimalId = 0;
    
    // 1. Garden, nature-based, and AI-generated smart arena feral pig inclusion
    const isGardenArena = id === "garden" || id.includes("garden") || id.includes("maze") || id.includes("sanctuary") || id.includes("glasshouse");
    const isAIGeneratedArena = id.startsWith("ai_gen_");
    const isNatureArena = isGardenArena || isAIGeneratedArena || id === "the_grand_orchard" || id.includes("orchard") || id === "farm" || id.includes("farm") || id === "trail" || id.includes("trail") || id === "plain" || id === "forest";

    if (isNatureArena && levelObj.targetDistance > 80) {
      let arenaType: "garden" | "cave" | "orchard" | "farm" | "trail" = "trail";
      if (isGardenArena) {
        arenaType = "garden";
      } else if (id.includes("orchard") || id.includes("redwood") || id.includes("forest")) {
        arenaType = "orchard";
      } else if (id.includes("farm")) {
        arenaType = "farm";
      } else if (id.includes("cave") || id.includes("trench") || id.includes("cavern")) {
        arenaType = "cave";
      }

      const inclusionProfile = FeralPigArenaInclusionEngine.getInclusionProfileForArena(arenaType, levelObj.placeId);
      
      // Calculate pig population based on target distance and density multiplier
      const baseSpacing = 90 / (inclusionProfile.spawnDensityMultiplier || 1.0);
      const pigCount = Math.floor((levelObj.targetDistance - 60) / baseSpacing);

      for (let i = 0; i < pigCount; i++) {
        const gender: "Boar" | "Sow" = inclusionProfile.allowedGenders[i % inclusionProfile.allowedGenders.length];
        const coatIndex = i % BASE_PIG_COAT_HUES.length;
        const coat = BASE_PIG_COAT_HUES[coatIndex];
        
        // Mathematical verge placement: slightly off track or foraging along lane edge
        const side = i % 2 === 0 ? 1 : -1;
        const vergeOffset = side * (1.5 + (i % 3) * 0.8);

        spawnedAnimals.push({
          id: currentAnimalId++,
          species: "feral_pig",
          gender,
          coatColor: coat.base,
          secondaryColor: coat.secondary,
          z: 40 + i * baseSpacing + ((i * 17) % 25),
          lane: side > 0 ? 1 : -1,
          xOffset: vergeOffset,
          heightOffset: inclusionProfile.groundLevelZ,
          state: inclusionProfile.initialState,
          nextVocalTime: 2.0 + (i % 5) * 1.5
        });
      }
    }

    // 2. Owls in Orchard
    if (id === "the_grand_orchard" || id.includes("orchard")) {
      // Spawn owls every 150 meters
      const count = Math.floor(levelObj.targetDistance / 150);
      for (let i = 0; i < count; i++) {
        spawnedAnimals.push({
          id: currentAnimalId++,
          species: "owl",
          z: 50 + i * 150 + Math.random() * 50,
          lane: Math.random() > 0.5 ? 2 : -2, // Perched far off track
          xOffset: Math.random() > 0.5 ? 8 : -8,
          heightOffset: 10 + Math.random() * 15, // 10-25 meters high in trees
          state: "perched",
          nextVocalTime: Math.random() * 5000
        });
      }
    } else if (id === "forest") {
      // 3. Frogs in Forest near the ground every 80 meters
      const count = Math.floor(levelObj.targetDistance / 80);
      for (let i = 0; i < count; i++) {
        spawnedAnimals.push({
          id: currentAnimalId++,
          species: "frog",
          z: 30 + i * 80 + Math.random() * 40,
          lane: Math.random() > 0.5 ? 1 : -1,
          xOffset: Math.random() * 2 - 1,
          heightOffset: 0,
          state: "sitting",
          nextVocalTime: Math.random() * 3000
        });
      }
    }

    return spawnedAnimals;
  }
};
