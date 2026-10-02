/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FeralPigManager, FeralPigEntity } from "../../../../../Characters/Pigs/Feral";

export interface SmartLevelConfig {
  id: number;
  name: string;
  placeId: string;
  theme: string;
  surfaceType: string;
  gravity: number;
  windSpeed: number;
  mooseDensity: number;
  monkeyAggression: number;
  feralPigDensity?: number;
  feralPigs?: FeralPigEntity[];
  longDescription?: string;
  visuals: {
    fogDensity: number;
    skyColor: string;
    horizonColor?: string;
    scenery?: string[];
    ambientLight: number;
  };
}

/**
 * Gemini-powered Smart Level Generation.
 * Dynamically constructs challenging environments while preserving crafted starting areas.
 */
export class SmartLevels {
  private static readonly CRAFTED_START_ID = 0; // Level 0 is the selection/start phase
  private static usedNames: string[] = [];

  public static async generateNextLevel(previousLevel: SmartLevelConfig): Promise<SmartLevelConfig> {
    const { GeminiSystem } = await import("../index");
    const nextId = previousLevel.id + 1;
    
    // Level 0 is the character selection area - it must ALWAYS lead to the first gameplay level
    // which is also a "crafted" starting area (Level 1).
    if (previousLevel.id === 0) {
      return this.getCraftedStartingLevel(1);
    }

    if (!GeminiSystem.isReady()) {
      return this.generateLocalFallback(nextId);
    }

    try {
      const prompt = `As a high-fidelity level designer for "Opossum Ride Adventure", generate a NEW level based on the previous one.
      Current Context: Level ${previousLevel.id} (${previousLevel.name}) at ${previousLevel.placeId}.
      Recently Used Names (FORBIDDEN): ${this.usedNames.join(", ") || "None"}.
      
      Requirements:
      - The new level must increase in difficulty.
      - Ensure the "placeId" is one of: garden, floor_foyer, cave, plain, mountains, stone_corridor, forest, city, quarry, desert, stone_room, generic.
      - "theme" should be a short evocative word (e.g., Serene, Mysterious, Aggressive, Haunted, Vibrant).
      - "surfaceType" should be a descriptive phrase matching the environment (e.g., "mossy forest floor", "cracked dry clay", "polished marble slabs").
      - "feralPigDensity": density between 0.1 and 0.8 of roaming feral boars and sows.
      - "longDescription": A 3-4 sentence detailed atmospheric description of the level's environment and scientific context.
      
      Respond ONLY with a valid JSON object:
      {
        "name": "Unique Atmospheric Level Name",
        "placeId": "place_id",
        "theme": "AtmosphericTheme",
        "surfaceType": "descriptive surface string",
        "longDescription": "Detailed narrative...",
        "gravity": 0.8-1.5,
        "windSpeed": 0-15,
        "mooseDensity": 0.2-1.2,
        "monkeyAggression": 0.1-1.0,
        "feralPigDensity": 0.1-0.8,
        "visuals": {
          "fogDensity": 0.01-0.1,
          "skyColor": "#RRGGBB",
          "horizonColor": "#RRGGBB",
          "scenery": ["type1", "type2"],
          "ambientLight": 0.3-1.0
        }
      }`;

      const client = GeminiSystem.getClient();
      if (!client) throw new Error("Gemini not initialized");

      const selectedModel = GeminiSystem.getConfig()?.selectedModel || "gemini-flash-latest";
      const result = await client.models.generateContent({
        model: selectedModel,
        contents: prompt
      });
      const text = result.text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(text);

      this.usedNames.push(parsed.name);
      if (this.usedNames.length > 20) this.usedNames.shift();

      const density = typeof parsed.feralPigDensity === "number" ? parsed.feralPigDensity : 0.4;
      const pigCount = Math.max(1, Math.round(density * 5));
      const spawnedPigs: FeralPigEntity[] = [];
      const arenaTypeMap: Record<string, FeralPigEntity["arenaType"]> = {
        garden: "garden",
        cave: "cave",
        forest: "orchard",
        plain: "trail",
        city: "farm",
        mountains: "trail",
        quarry: "cave",
        desert: "trail"
      };
      const pigArenaType = arenaTypeMap[parsed.placeId] || "trail";

      for (let i = 0; i < pigCount; i++) {
        const seed = nextId * 1000 + i * 37;
        const gender = i % 2 === 0 ? "Boar" : "Sow";
        const x = 300 + (i * 450);
        spawnedPigs.push(FeralPigManager.spawnFeralPig(seed, gender, pigArenaType, x, 0));
      }

      return {
        ...parsed,
        id: nextId,
        feralPigDensity: density,
        feralPigs: spawnedPigs
      };
    } catch (error) {
      console.warn("Gemini Level Generation Failed, using fallback:", error);
      return this.generateLocalFallback(nextId);
    }
  }

  private static getCraftedStartingLevel(id: number): SmartLevelConfig {
    const spawnedPigs: FeralPigEntity[] = [
      FeralPigManager.spawnFeralPig(101, "Boar", "trail", 400, 0),
      FeralPigManager.spawnFeralPig(102, "Sow", "trail", 900, 0)
    ];

    return {
      id,
      name: "The First Ride",
      placeId: "plain",
      theme: "Serene",
      surfaceType: "lush switchgrass prairie",
      gravity: 0.98,
      windSpeed: 2,
      mooseDensity: 0.3,
      monkeyAggression: 0.1,
      feralPigDensity: 0.3,
      feralPigs: spawnedPigs,
      visuals: {
        fogDensity: 0.02,
        skyColor: "#87CEEB",
        ambientLight: 1.0
      }
    };
  }

  private static generateLocalFallback(id: number): SmartLevelConfig {
    const places = ["plain", "forest", "mountains", "cave"];
    const themes = ["Serene", "Mysterious", "Aggressive", "Gloomy"];
    const surfaces = ["soft grass", "crunchy mulch", "slippery snow", "damp soil"];
    const place = places[id % places.length];

    const spawnedPigs: FeralPigEntity[] = [
      FeralPigManager.spawnFeralPig(id * 53 + 1, "Boar", "trail", 500, 0),
      FeralPigManager.spawnFeralPig(id * 53 + 2, "Sow", "trail", 1100, 0)
    ];
    
    return {
      id,
      name: `Wild Frontier ${id}`,
      placeId: place,
      theme: themes[id % themes.length],
      surfaceType: surfaces[id % surfaces.length],
      gravity: 0.98 + (Math.random() * 0.2),
      windSpeed: Math.random() * 5,
      mooseDensity: 0.3 + (Math.random() * 0.4),
      monkeyAggression: 0.2 + (Math.random() * 0.5),
      feralPigDensity: 0.4,
      feralPigs: spawnedPigs,
      visuals: {
        fogDensity: 0.05,
        skyColor: "#87CEEB",
        ambientLight: 0.8
      }
    };
  }
}
