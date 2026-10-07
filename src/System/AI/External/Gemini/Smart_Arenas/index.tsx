/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SmartLevelConfig } from "../Smart_Levels";
import { FeralPigManager, FeralPigEntity } from "../../../../../Characters/Pigs/Feral";
import { GeminiMaps, RealWorldArenaBlueprint } from "../Maps";

export interface SmartArenaConfig {
  id: number;
  name: string;
  theme: string;
  isAIGenerated?: boolean;
  realWorldBlueprint?: RealWorldArenaBlueprint;
  levels: SmartLevelConfig[];
  hotspots: { x: number; y: number; type: string }[];
}

/**
 * Gemini-powered Smart Arena Generation.
 * Orchestrates multi-level campaigns with consistent themes and strategic hotspots.
 */
export class SmartArenas {
  private static arenaHistory: SmartArenaConfig[] = [];
  private static usedThemes: string[] = [];

  public static async generateArena(
    arenaId: number, 
    onProgress?: (percent: number, status: string) => void
  ): Promise<SmartArenaConfig> {
    const { GeminiSystem } = await import("../index");
    if (!GeminiSystem.isReady()) {
      onProgress?.(100, "Local Arena Initialized");
      return this.generateFallbackArena(arenaId);
    }

    try {
      onProgress?.(15, "Connecting to Gemini Flash Latest AI Engine...");

      const prompt = `Generate a high-fidelity, scientifically plausible game Arena for "Opossum Ride Adventure" powered by advanced mathematics and computer science.
      Arena ID: ${arenaId}.
      Previously Used Themes (FORBIDDEN - DO NOT REPEAT): ${this.usedThemes.join(", ") || "None"}.
      
      Requirements:
      1. INSPIRATION: Blend real-world natural monuments (e.g., Grand Canyon, Giant's Causeway, Redwood Forest, Mount Fuji, Yellowstone Geyser Basin, Victoria Falls, Norwegian Fjords, Swiss Alps) with imaginative fictional/fantasy realms (e.g., Luminescent Crystal Caverns, Cloudtop Sky Citadel, Atlantis Coral Trench, Starlight Nebula Highlands, Enchanted Emerald Canopy, Floating Island of Zephyr, Cybernetic Obsidian Grid).
      2. Define 3 progressive levels within this arena with increasing difficulty and unique biomechanics.
      3. Create a unique, descriptive "placeId" with the prefix "ai_gen_" (e.g. "ai_gen_crystal_palace", "ai_gen_redwood_canopy", "ai_gen_obsidian_ridge"). Do NOT use existing core place IDs like garden, forest, floor_foyer, etc.
      4. "theme" within each level should be a short evocative word.
      5. "surfaceType" within each level should be a descriptive phrase matching the physical substrate.
      6. "acoustics": Ultra-precise acoustical environment parameters derived from Sabine's equation (RT60 decay time in seconds: 0.2 - 3.5s, Helmholtz resonance frequency in Hz: 40 - 240Hz, surface sound absorption coefficient alpha: 0.05 - 0.85, atmospheric Doppler clarity: 0.7 - 1.0).
      7. "longDescription": A 3-4 sentence detailed atmospheric description of the level's environment, acoustics, and scientific context (e.g. geological features, atmospheric pressure in kPa, air density in kg/m^3, friction coefficients, microclimate temperature).
      8. "visuals": Define dynamic scenery and optical Rayleigh scattering sky parameters:
         - "skyColor": Hex color of the zenith sky.
         - "horizonColor": Hex color at the horizon.
         - "scenery": A list of 3-5 unique object types to populate the background (e.g. "basalt_column", "crystal_cluster", "redwood_giant", "aurora_streamer", "floating_island").
         - "fogDensity": 0.005 to 0.12.
         - "ambientLight": 0.35 to 1.0.
      9. Place 5 strategic hotspots (x: 0-2000, y: 0-1000) for items or events.
      
      Respond ONLY with a valid JSON object:
      {
        "name": "Arena Name (e.g. Giant's Causeway Basalt Spire / Luminescent Crystal Caverns)",
        "theme": "Atmospheric Theme Description",
        "inspirationType": "Real-World / Fictional Synthesis",
        "levels": [
          { 
            "name": "Level 1 Name", 
            "placeId": "ai_gen_place_id", 
            "theme": "Serene", 
            "gravity": 0.98, 
            "windSpeed": 2.5, 
            "mooseDensity": 0.4, 
            "monkeyAggression": 0.2, 
            "surfaceType": "hexagonal basalt columns / damp pine needles", 
            "longDescription": "Detailed 3-4 sentence narrative grounded in geological acoustics and microclimate physics...",
            "acoustics": {
              "reverbDecaySec": 1.45,
              "helmholtzHz": 85,
              "absorptionAlpha": 0.18,
              "dopplerFactor": 0.95
            },
            "visuals": { 
              "fogDensity": 0.02, 
              "skyColor": "#4A6B82", 
              "horizonColor": "#C38D9E",
              "scenery": ["basalt_pillar", "sea_mist", "coastal_cliff"],
              "ambientLight": 0.85 
            } 
          }
        ],
        "hotspots": [
          { "x": 500, "y": 300, "type": "energy_snack" }
        ]
      }`;

      onProgress?.(35, "Synthesizing Arena Topography, Geology & Microclimate Physics...");
      const client = GeminiSystem.getClient();
      if (!client) throw new Error("Gemini not initialized");

      onProgress?.(60, "Calculating Sabine Reverberation Tensors & Biomechanical Surface Friction...");
      const selectedModel = GeminiSystem.getConfig()?.selectedModel || "gemini-flash-latest";
      const result = await client.models.generateContent({
        model: selectedModel,
        contents: prompt
      });
      const text = result.text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(text);

      onProgress?.(85, "Populating Markovian Moose, Monkey & Feral Pig Behavioral Matrices...");
      this.usedThemes.push(parsed.name);
      if (this.usedThemes.length > 20) this.usedThemes.shift(); // Keep history manageable

      const arena: SmartArenaConfig = {
        ...parsed,
        id: arenaId,
        isAIGenerated: true,
        realWorldBlueprint: GeminiMaps.generateArenaBlueprint(arenaId),
        levels: parsed.levels.map((l: any, i: number) => {
          const lvlId = (arenaId * 3) + i + 1;
          const density = typeof l.feralPigDensity === "number" ? l.feralPigDensity : 0.4;
          const pigCount = Math.max(1, Math.round(density * 5));
          const spawnedPigs: FeralPigEntity[] = [];
          for (let p = 0; p < pigCount; p++) {
            const seed = lvlId * 500 + p * 31;
            const gender = p % 2 === 0 ? "Boar" : "Sow";
            const x = 250 + (p * 400);
            spawnedPigs.push(FeralPigManager.spawnFeralPig(seed, gender, "trail", x, 0));
          }
          return {
            ...l,
            id: lvlId,
            feralPigDensity: density,
            feralPigs: spawnedPigs
          };
        })
      };

      this.arenaHistory.push(arena);
      onProgress?.(100, "Arena Blueprint Synthesis Complete!");
      return arena;
    } catch (error) {
      console.warn("Gemini Arena Generation Failed, using fallback:", error);
      onProgress?.(100, "Applying Fallback Scientific Wilderness Arena Blueprint...");
      return this.generateFallbackArena(arenaId);
    }
  }

  private static generateFallbackArena(id: number): SmartArenaConfig {
    const seed = id * 10007 + 42;
    // Pseudorandom function (Mulberry32) for building arenas deterministically
    let prngA = seed;
    const prng = () => {
      prngA = (prngA + 0x6D2B79F5) | 0;
      let t = Math.imul(prngA ^ (prngA >>> 15), 1 | prngA);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };

    // Real-world and fictional realms inspiration catalogue
    const inspirations = [
      { name: "Giant's Causeway Basalt Coast", place: "ai_gen_causeway_coast", surface: "interlocking hexagonal basalt slabs", sky: "#2B4162", horizon: "#729B79", reverb: 1.85, hz: 65 },
      { name: "Redwood National Canopy", place: "ai_gen_redwood_canopy", surface: "damp aromatic sequoia mulch", sky: "#386641", horizon: "#6A994E", reverb: 0.95, hz: 120 },
      { name: "Luminescent Crystal Caverns", place: "ai_gen_crystal_cavern", surface: "resonant piezoelectric quartz sheets", sky: "#130A2A", horizon: "#5A189A", reverb: 3.2, hz: 45 },
      { name: "Mount Fuji Volcanic Ridge", place: "ai_gen_fuji_ridge", surface: "compacted porous andesite tephra", sky: "#1E3888", horizon: "#F5EE9E", reverb: 0.65, hz: 180 },
      { name: "Cloudtop Sky Citadel", place: "ai_gen_sky_citadel", surface: "polished aerogel marble flags", sky: "#48CAE4", horizon: "#ADE8F4", reverb: 0.45, hz: 210 },
      { name: "Yellowstone Hydrothermal Basin", place: "ai_gen_yellowstone_basin", surface: "sintered siliceous travertine terrace", sky: "#D68C45", horizon: "#EE964B", reverb: 1.1, hz: 95 },
      { name: "Atlantis Bioluminescent Trench", place: "ai_gen_atlantis_trench", surface: "phosphorescent calcified coral shelf", sky: "#03045E", horizon: "#0077B6", reverb: 2.75, hz: 50 },
      { name: "Sahara Erg Chebbi Dunes", place: "ai_gen_erg_chebbi", surface: "rippled fine silicate dune crests", sky: "#E09F3E", horizon: "#FFF3B0", reverb: 0.35, hz: 240 },
      { name: "Cybernetic Obsidian Grid", place: "ai_gen_obsidian_grid", surface: "vitreous black volcanic glass tiles", sky: "#0D0D0D", horizon: "#3A0CA3", reverb: 2.1, hz: 75 }
    ];

    const inspIdx = Math.floor(prng() * inspirations.length);
    const chosen = inspirations[inspIdx];

    const levels = [1, 2, 3].map((lvlNum) => {
      const subInsp = inspirations[(inspIdx + lvlNum - 1) % inspirations.length];
      
      const mooseDensity = Number((0.2 + prng() * 0.55).toFixed(2));
      const monkeyAggression = Number((0.15 + prng() * 0.65).toFixed(2));
      const monkeyRidingMooseRatio = Number((0.1 + prng() * 0.5).toFixed(2));
      const feralPigDensity = Number((0.2 + prng() * 0.5).toFixed(2));
      const lvlId = (id * 3) + lvlNum;

      const spawnedPigs: FeralPigEntity[] = [
        FeralPigManager.spawnFeralPig(lvlId * 100 + 1, "Boar", "trail", 450, 0),
        FeralPigManager.spawnFeralPig(lvlId * 100 + 2, "Sow", "trail", 950, 0)
      ];

      return {
        id: lvlId,
        name: `Sector ${lvlNum}: ${subInsp.name}`,
        placeId: subInsp.place,
        theme: prng() > 0.5 ? "Serene" : "Dynamic",
        gravity: Number((0.85 + prng() * 0.3).toFixed(2)),
        windSpeed: Math.floor(prng() * 14),
        mooseDensity,
        monkeyAggression,
        monkeyRidingMooseRatio,
        feralPigDensity,
        feralPigs: spawnedPigs,
        surfaceType: subInsp.surface,
        longDescription: `Geologically synthesized sector featuring ${subInsp.surface}. Microclimate acoustic reverberation RT60 calculated at ${subInsp.reverb}s with a ${subInsp.hz}Hz Helmholtz baseline resonance.`,
        acoustics: {
          reverbDecaySec: subInsp.reverb,
          helmholtzHz: subInsp.hz,
          absorptionAlpha: Number((0.1 + prng() * 0.4).toFixed(2)),
          dopplerFactor: 0.95
        },
        visuals: {
          fogDensity: Number((0.01 + prng() * 0.05).toFixed(3)),
          skyColor: subInsp.sky,
          horizonColor: subInsp.horizon,
          ambientLight: Number((0.6 + prng() * 0.4).toFixed(2))
        }
      };
    });

    return {
      id,
      name: `Arena ${id}: ${chosen.name}`,
      theme: `Scientific Simulation of ${chosen.name}`,
      realWorldBlueprint: GeminiMaps.generateArenaBlueprint(id),
      levels,
      hotspots: [
        { x: Math.floor(prng() * 1000), y: Math.floor(prng() * 500), type: "bonus" },
        { x: Math.floor(1000 + prng() * 1000), y: Math.floor(prng() * 500), type: "danger" }
      ]
    };
  }
}
