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
import { FeralPigNavigator } from "../../AI/In-Game/Category/Animal/Feral_Pig/Navigation";
import { BASE_PIG_COAT_HUES } from "../../../Characters/Pigs/Animations/Color_Palette/General";
import { isCropFieldPlaceId } from "../../AI/In-Game/Category/Accessibility/Narration/Arena/Crop_Field";
import { isVegetableFieldPlaceId } from "../../AI/In-Game/Category/Accessibility/Narration/Arena/Vegetable_Field";
import { isWildernessPlaceId } from "../../AI/In-Game/Category/Accessibility/Narration/Arena/Wilderness";
import { TRIANGULAR_STONE_FENCE_SPEC } from "../../Building_Blocks/Triangular_Stone_Fence";
import { CORE_GOAT_CAMEOS, GOAT_KIDS } from "../../../Characters/Goats";
import { GOAT_PASTURE_BOUNDS } from "../../AI/In-Game/Category/Animal/Goat";

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

    // Crop Field & Vegetable Field Arenas: Exclusively Triangular Stone Fence obstacles spaced strictly 500m–2000m apart
    if (isCropFieldPlaceId(placeId) || isVegetableFieldPlaceId(placeId)) {
      const cropRng = new PseudorandomGenerator(levelId * 7919 + 42);
      const minSpacing = TRIANGULAR_STONE_FENCE_SPEC.spacing.minMeters;
      const maxSpacing = TRIANGULAR_STONE_FENCE_SPEC.spacing.maxMeters;
      const lanes = [-1, 0, 1];
      let curZ = bufferMinZ + cropRng.range(minSpacing, Math.min(maxSpacing, 1100));
      let fenceIdx = 0;

      while (curZ <= bufferMaxZ) {
        const laneChoice = lanes[Math.floor(cropRng.range(0, 3)) % 3];
        spawnedObstacles.push({
          id: fenceIdx++,
          type: "triangular_stone_fence",
          z: Math.round(curZ),
          lane: laneChoice,
          width: TRIANGULAR_STONE_FENCE_SPEC.dimensions.worldWidthM,
          height: TRIANGULAR_STONE_FENCE_SPEC.dimensions.worldHeightM
        });
        curZ += cropRng.range(minSpacing, maxSpacing);
      }

      if (spawnedObstacles.length === 0 && bufferMaxZ >= bufferMinZ + 400) {
        spawnedObstacles.push({
          id: 0,
          type: "triangular_stone_fence",
          z: Math.round(Math.min(bufferMaxZ, 600)),
          lane: lanes[levelId % 3],
          width: TRIANGULAR_STONE_FENCE_SPEC.dimensions.worldWidthM,
          height: TRIANGULAR_STONE_FENCE_SPEC.dimensions.worldHeightM
        });
      }

      return spawnedObstacles;
    }

    // Wilderness Arenas: ZERO fences, garden plants, triangular stone fences, or blocking rocks.
    // Exclusively elevated stone_platform structures that can be jumped onto and ridden over.
    if (isWildernessPlaceId(placeId)) {
      const wildRng = new PseudorandomGenerator(levelId * 6133 + 19);
      const lanes = [-1, 0, 1];
      let curZ = bufferMinZ + wildRng.range(95, 165);
      let platIdx = 0;

      const colorPreset = placeId.startsWith("desert")
        ? { name: "Red Sandstone Ledge", fill: "#B45309", stroke: "#78350F" }
        : placeId.startsWith("forest")
          ? { name: "Mossy Woodland Stone", fill: "#4B5563", stroke: "#166534" }
          : placeId.startsWith("plain")
            ? { name: "Prairie Limestone Slab", fill: "#9CA3AF", stroke: "#4B5563" }
            : placeId.startsWith("wilderness_cave_")
              ? { name: "Cavern Karst Ledge", fill: "#334155", stroke: "#0F172A" }
              : { name: "Alpine Granite Shelf", fill: "#64748B", stroke: "#334155" };

      while (curZ <= bufferMaxZ) {
        const laneChoice = lanes[Math.floor(wildRng.range(0, 3)) % 3];
        spawnedObstacles.push({
          id: platIdx++,
          type: "stone_platform",
          z: Math.round(curZ),
          lane: laneChoice,
          width: 6.0,
          height: 1.1,
          colorPreset
        });
        curZ += wildRng.range(120, 210);
      }

      return spawnedObstacles;
    }

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
    if (levelId <= 0 || levelObj.placeId === "temple_courtyard" || levelObj.placeId === "floor_foyer") {
      return [];
    }
    return OpponentAIEngine.generateOpponents(levelObj, levelId, selectedOpossumId);
  },

  /**
   * Spawns specialized wildlife (Owls in Orchard, Frogs in Forest, Feral Pigs in Garden and nature-based arenas).
   */
  spawnAnimals(levelObj: GameLevel): AnimalItem[] {
    const spawnedAnimals: AnimalItem[] = [];
    const id = levelObj.placeId.toLowerCase();
    if (levelObj.id === 0 || id === "temple_courtyard" || id === "floor_foyer") {
      return spawnedAnimals;
    }
    let currentAnimalId = 0;
    
    // 1. Garden, nature-based, crop/vegetable field, wilderness, and AI-generated smart arena feral pig inclusion
    const isGardenArena = id === "garden" || id.includes("garden") || id.includes("maze") || id.includes("sanctuary") || id.includes("glasshouse");
    const isCropField = isCropFieldPlaceId(id);
    const isVegetableField = isVegetableFieldPlaceId(id);
    const isWilderness = isWildernessPlaceId(id);
    const isAIGeneratedArena = id.startsWith("ai_gen_");
    const isNatureArena =
      isGardenArena ||
      isCropField ||
      isVegetableField ||
      isWilderness ||
      isAIGeneratedArena ||
      id === "the_grand_orchard" ||
      id.includes("orchard") ||
      id === "farm" ||
      id.includes("farm") ||
      id === "trail" ||
      id.includes("trail") ||
      id === "plain" ||
      id === "forest";

    if (isNatureArena && levelObj.targetDistance > 80) {
      let arenaType: "garden" | "cave" | "orchard" | "farm" | "trail" = "trail";
      if (isGardenArena) {
        arenaType = "garden";
      } else if (id.includes("orchard") || id.includes("redwood") || id.includes("forest")) {
        arenaType = "orchard";
      } else if (id.includes("farm") || isCropField || isVegetableField) {
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

        // Course or wilderness off-path initial lateral coordinate
        const side = i % 2 === 0 ? 1 : -1;
        const rawWorldX = isWilderness
          ? side * (2.6 + (i % 4) * 2.15) // Spread naturally across trail and outside path in wilderness
          : side * (1.5 + (i % 3) * 1.45);
        const decomposed = FeralPigNavigator.decomposeWorldX(rawWorldX);
        const spawnZ = 40 + i * baseSpacing + ((i * 17) % 25);
        const initialDir: 1 | -1 = i % 2 === 0 ? -1 : 1;

        spawnedAnimals.push({
          id: currentAnimalId++,
          species: "feral_pig",
          gender,
          coatColor: coat.base,
          secondaryColor: coat.secondary,
          z: spawnZ,
          lane: decomposed.lane,
          targetLane: decomposed.lane,
          xOffset: decomposed.xOffset,
          heightOffset: inclusionProfile.groundLevelZ,
          state: inclusionProfile.initialState,
          behaviorState: inclusionProfile.initialState,
          patrolOriginZ: spawnZ,
          patrolDirection: initialDir,
          vx: side * 1.35,
          vz: initialDir * (inclusionProfile.initialState === "rooting" ? 1.0 : 2.9),
          gaitPhase: (i * 1.15) % (Math.PI * 2),
          lastStepDistance: 0,
          gaitMode: inclusionProfile.initialState === "rooting" ? "walk" : "trot",
          isWildernessRoamer: isWilderness,
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
    } else if (id === "forest" || id.startsWith("forest_")) {
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

    // 4. Loose unmounted Monkeys roaming Crop Fields, Vegetable Fields & Outdoor Wilderness trails
    if ((isCropField || isVegetableField || (isWilderness && !id.startsWith("wilderness_cave_"))) && levelObj.targetDistance > 120) {
      const monkeyRng = new PseudorandomGenerator(levelObj.id * 3571 + 91);
      const monkeySpacing = 135;
      const monkeyCount = Math.floor((levelObj.targetDistance - 120) / monkeySpacing);
      const lanes = [-1, 0, 1];
      for (let i = 0; i < monkeyCount; i++) {
        const laneChoice = lanes[Math.floor(monkeyRng.range(0, 3)) % 3];
        const isFemale = i % 2 === 0;
        spawnedAnimals.push({
          id: currentAnimalId++,
          species: "monkey",
          z: 75 + i * monkeySpacing + Math.round(monkeyRng.range(0, 45)),
          lane: laneChoice,
          xOffset: (i % 3 === 0 ? 0 : (isFemale ? -0.45 : 0.45)),
          heightOffset: 0,
          state: isFemale ? "roaming_female" : "roaming_male",
          nextVocalTime: 1.5 + (i % 4) * 1.4
        });
      }
    }

    // 5. Friendly Caprine Cameos & Juvenile Kids (Strictly off-path social herds, exclusively on The Goat Farm)
    if (id === "goat_farm" && levelObj.targetDistance > 120) {
      const startZ = 55;
      const endZ = Math.max(startZ + 120, levelObj.targetDistance - 55);
      const spanZ = endZ - startZ;
      const herdCount = 6;

      // Distribute all 16 Core Goats into 6 social hillside herds alternating Left and Right pastures
      CORE_GOAT_CAMEOS.forEach((goatProfile, idx) => {
        const herdId = idx % herdCount;
        const herdSide: "left" | "right" = herdId % 2 === 0 ? "left" : "right";
        const memberSlot = Math.floor(idx / herdCount);
        const herdBaseZ = startZ + (herdId / Math.max(1, herdCount - 1)) * spanZ;
        const homeZ = Math.round(herdBaseZ + (memberSlot - 1) * 7.5 + ((idx * 3) % 5));
        const pastureDistanceOut = 9.4 + (memberSlot % 3) * 2.2 + ((idx % 2) * 0.9);
        const homeX = herdSide === "left" ? -pastureDistanceOut : pastureDistanceOut;

        // Place agile mountain/climber goats on wooden pasture ramps or grassy knolls
        const canClimbRamp = goatProfile.grazePreference.rampAgility >= 1.25 && idx % 3 === 0;
        const heightOffset = canClimbRamp ? GOAT_PASTURE_BOUNDS.DEFAULT_HEIGHT_RAMP : 0;

        spawnedAnimals.push({
          id: currentAnimalId++,
          species: "goat",
          goatGender: goatProfile.gender === "male" ? "Male" : "Female",
          goatId: goatProfile.id,
          name: goatProfile.name,
          isKid: false,
          hornColor: goatProfile.hornColor,
          eyeColor: goatProfile.eyeColor,
          sizeClass: goatProfile.dimensions.size,
          herdId,
          herdSide,
          pastureHomeX: homeX,
          pastureHomeZ: homeZ,
          grazePhase: (idx * 0.9) % (Math.PI * 2),
          headDip: idx % 2 === 0 ? 1.0 : 0.0,
          onRamp: canClimbRamp,
          coatColor: goatProfile.palette.coatPrimary,
          secondaryColor: goatProfile.palette.coatSecondary,
          z: homeZ,
          lane: 0, // Off-path pasture coordinate encoded via xOffset outside [-7.8, +7.8]
          xOffset: homeX,
          heightOffset,
          state: canClimbRamp ? "perched" : (idx % 2 === 0 ? "grazing" : "socializing"),
          goatBehaviorState: canClimbRamp ? "perched" : (idx % 2 === 0 ? "grazing" : "socializing"),
          stateElapsedMs: (idx * 700) % 2500,
          nextVocalTime: 3.0 + (idx % 6) * 2.1
        });
      });

      // Pair each of the 6 juvenile kids into social herds beside their adult companion
      GOAT_KIDS.forEach((kidProfile, kIdx) => {
        const companionIdx = CORE_GOAT_CAMEOS.findIndex((g) => g.id === kidProfile.companionAdultId);
        const adultAnimal = spawnedAnimals.find(
          (a) => a.species === "goat" && a.goatId === kidProfile.companionAdultId
        );
        const herdId = companionIdx >= 0 ? companionIdx % herdCount : kIdx % herdCount;
        const herdSide: "left" | "right" = adultAnimal?.herdSide || (herdId % 2 === 0 ? "left" : "right");
        const baseX = adultAnimal?.pastureHomeX ?? (herdSide === "left" ? -11.2 : 11.2);
        const baseZ = adultAnimal?.pastureHomeZ ?? (startZ + ((herdId / Math.max(1, herdCount - 1)) * spanZ));
        const kidHomeX = baseX + (herdSide === "left" ? -1.4 : 1.4);
        const kidHomeZ = Math.round(baseZ + 2.6);
        const kidOnKnoll = kIdx % 3 === 2;

        spawnedAnimals.push({
          id: currentAnimalId++,
          species: "goat",
          goatGender: kidProfile.gender === "male" ? "Male" : "Female",
          goatId: kidProfile.id,
          name: kidProfile.name,
          isKid: true,
          hornColor: kidProfile.hornColor,
          eyeColor: kidProfile.eyeColor,
          sizeClass: "kid",
          herdId,
          herdSide,
          pastureHomeX: kidHomeX,
          pastureHomeZ: kidHomeZ,
          grazePhase: (kIdx * 1.1) % (Math.PI * 2),
          headDip: kIdx % 2 === 1 ? 1.0 : 0.0,
          onRamp: kidOnKnoll,
          coatColor: kidProfile.palette.coatPrimary,
          secondaryColor: kidProfile.palette.coatSecondary,
          z: kidHomeZ,
          lane: 0,
          xOffset: kidHomeX,
          heightOffset: kidOnKnoll ? GOAT_PASTURE_BOUNDS.DEFAULT_HEIGHT_KNOLL : 0,
          state: kidOnKnoll ? "perched" : "socializing",
          goatBehaviorState: kidOnKnoll ? "perched" : "socializing",
          stateElapsedMs: (kIdx * 550) % 2000,
          nextVocalTime: 2.5 + kIdx * 1.8
        });
      });
    }

    return spawnedAnimals;
  }
};
