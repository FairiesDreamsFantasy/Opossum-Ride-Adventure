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
      const prompt = `As an ultra-scientific procedural level generator for "Opossum Ride Adventure", synthesize a scientifically rigorous NEW level based on the previous context.
      Current Context: Level ${previousLevel.id} (${previousLevel.name}) at ${previousLevel.placeId}.
      Recently Used Names (FORBIDDEN): ${this.usedNames.join(", ") || "None"}.
      
      Scientific Requirements:
      - The new level must increase in difficulty and feature authentic mathematical/geological biomechanics.
      - "placeId": A unique descriptive place identifier (e.g. "ai_gen_crystalline_cavern", "ai_gen_basalt_ridge", "ai_gen_sequoia_canopy", "plain", "mountains", "forest", "cave", "desert").
      - "theme": An evocative scientific/atmospheric descriptor (e.g., "Hyper-Resonant", "Aerodynamic", "Geothermal", "Sub-Alpine", "Piezoelectric", "Serene").
      - "surfaceType": Precise physical substrate (e.g., "vitreous basalt slabs with 0.72 friction coefficient", "interlocking quartz sheets", "compacted volcanic andesite tephra").
      - "longDescription": A 3-4 sentence ultra-scientific atmospheric narrative specifying geological strata, Sabine RT60 reverberation decay in seconds, Helmholtz baseline resonance in Hz, atmospheric pressure (kPa), air density (kg/m^3), and kinetic friction.
      - "feralPigDensity": Density between 0.1 and 0.8 of roaming feral boars and sows.
      
      Respond ONLY with a valid JSON object:
      {
        "name": "Unique Scientific Level Name",
        "placeId": "place_id",
        "theme": "ScientificAtmosphere",
        "surfaceType": "descriptive physical substrate with friction",
        "longDescription": "Ultra-scientific 3-4 sentence narrative grounded in geological acoustics, Sabine RT60 decay, Helmholtz resonance, and microclimate physics...",
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
      longDescription: "A tranquil open plain characterized by dense loam soil and lush switchgrass with an acoustic absorption coefficient alpha of 0.25. Atmospheric reverberation RT60 decay is measured at 0.45 seconds with calm laminar wind vectors.",
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
    const surfaces = ["soft prairie switchgrass", "damp aromatic sequoia mulch", "compacted granite scree slopes", "resonant limestone cavern floor"];
    const acoustics = [
      { rt60: 0.45, hz: 160 },
      { rt60: 0.85, hz: 110 },
      { rt60: 0.65, hz: 190 },
      { rt60: 2.80, hz: 55 }
    ];
    const placeIdx = id % places.length;
    const place = places[placeIdx];
    const surface = surfaces[placeIdx];
    const acoustic = acoustics[placeIdx];

    const spawnedPigs: FeralPigEntity[] = [
      FeralPigManager.spawnFeralPig(id * 53 + 1, "Boar", "trail", 500, 0),
      FeralPigManager.spawnFeralPig(id * 53 + 2, "Sow", "trail", 1100, 0)
    ];
    
    return {
      id,
      name: `Wild Frontier ${id}`,
      placeId: place,
      theme: themes[id % themes.length],
      surfaceType: surface,
      longDescription: `Geologically synthesized expanse featuring ${surface}. Sabine RT60 acoustic reverberation calculated at ${acoustic.rt60}s with a Helmholtz baseline resonance frequency of ${acoustic.hz}Hz and aerodynamic ambient pressure.`,
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
