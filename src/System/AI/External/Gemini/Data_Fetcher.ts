/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { NATURE_METADATA } from "../../../Building_Blocks/Nature";
import { GARDEN_METADATA } from "../../../Building_Blocks/Garden";
import { PARK_METADATA } from "../../../Building_Blocks/Parks";
import { RANDOM_MATERIALS_METADATA } from "../../../Building_Blocks/Random_Materials";
import { BRIDGE_METADATA } from "../../../Building_Blocks/Bridges";

export interface SystemFetchManifest {
  buildingBlocks?: Record<string, any>;
  items?: Record<string, any>;
  sound?: Record<string, any>;
  visuals?: Record<string, any>;
  localArenas?: Record<string, any>;
  fetchedAt: string;
  totalModulesCount: number;
}

export class GeminiDataFetcher {
  /**
   * Fetches all registered Building Block specifications and structural invariants
   */
  public static fetchBuildingBlocks(): Record<string, any> {
    return {
      registryId: "System/Building_Blocks",
      description: "Structural geometry, architecture, terrain, and materials registry",
      invariants: {
        bridgeMinHeightFeet: BRIDGE_METADATA.minHeight,
        bridgeMinLanes: BRIDGE_METADATA.minLanes,
        bridgeMaxLanes: BRIDGE_METADATA.maxLanes,
        pathElevatedMinHeightFeet: 30,
        subwayTunnelDepthFeet: 25,
      },
      categories: {
        bridges: {
          metadata: BRIDGE_METADATA,
          types: ["suspension", "arch", "truss", "beam"],
          features: ["hasAbutments", "spanLength", "deckHeight", "lanesCount"]
        },
        paths: {
          types: ["ground", "elevated", "flyover", "railway", "road", "tunnel", "bridge", "subway_tunnel", "underpass"],
          surfaceTypes: ["grass", "gravel", "wood", "stone", "metal_tracks", "dirt", "asphalt", "shale", "clay", "sand", "snow", "ice"],
          dimensions: ["length", "width", "height", "thickness"],
          lanes: { min: 3, max: 4 }
        },
        nature: {
          metadata: NATURE_METADATA,
          types: [
            "forest", "lake", "river", "stream", "ground", "cave", "mountain", "rock", "cove",
            "ocean", "ocean_floor", "glacier", "sand", "mud", "dirt", "pebbles", "gravel",
            "volcano", "lava", "magma", "shale", "clay", "trench", "tar_lake", "plain", "plateau",
            "meadow", "biodiversity_zone", "tundra", "mammoth_step", "ice", "snow", "water",
            "rain", "lightning", "clouds", "wild_plants", "wild_trees"
          ],
          physicsProperties: ["frictionCoefficient", "roughnessCoefficient", "moistureLevel", "temperatureRating"]
        },
        garden: {
          metadata: GARDEN_METADATA,
          types: ["pond", "cultivated_plants", "ornamental_shrub", "flower_bed"],
          cultivators: ["Melissa", "Ashley", "Fairy-Rider"]
        },
        parks: {
          metadata: PARK_METADATA,
          types: ["standard_park", "zoo_enclosure"]
        },
        randomMaterials: {
          metadata: RANDOM_MATERIALS_METADATA,
          materialTypes: [
            "wood", "stone", "metal", "crystal", "glass", "fabric", "energy_field", "biomaterial",
            "composite", "plasma", "marble", "granite", "amber", "obsidian", "copper", "silver",
            "gold", "quartz", "sandstone", "ceramic", "synthetic", "organic", "custom"
          ],
          properties: [
            "density", "elasticity", "frictionCoefficient", "reflectivity",
            "hardnessMohs", "roughness", "color", "texturePattern",
            "soundSurfaceProfile", "isDestructible", "structuralIntegrity"
          ]
        },
        buildingsAndHouses: {
          types: [
            "hotel", "shopping_mall", "governmental", "apartment", "condo",
            "school", "library", "hardware_store", "department_store", "restaurant",
            "mansion", "house", "glasshouse", "greenhouse"
          ],
          emergencyServices: ["fire_house", "ambulance_station", "police_station"]
        },
        interiors: {
          flooring: ["tile", "rug", "hardwood", "carpet", "stone", "mosaic"],
          doors: ["single_hinged", "double_hinged", "sliding", "revolving", "archway"],
          windows: ["standard_pane", "stained_glass", "bay_window", "transom"],
          skylights: ["domed", "flat_glass", "vaulted", "pyramidal"],
          ceilings: ["vaulted", "beamed", "coffered", "flat", "cathedral"],
          wallsAndBarriers: ["stone_wall", "wood_panel", "brick", "hedge", "guardrail"]
        }
      }
    };
  }

  /**
   * Fetches all registered items in System/Items/
   */
  public static fetchItems(): Record<string, any> {
    return {
      registryId: "System/Items",
      description: "In-game interactive items, collectibles, treats, and equipment",
      categories: {
        edibleTreats: [
          "Apple Slices", "Wild Berries", "Persimmon", "Pawpaw Fruit",
          "Golden Acorn", "Honeysuckle Nectar", "Carrot Crunch"
        ],
        edibleItems: [
          "Nut Mix", "Leafy Greens", "Water Chestnut", "Sweet Clover", "Roasted Seeds"
        ],
        accessories: [
          "Pearl Necklace", "Diamond Earring", "Multi-colored Neck Ribbon",
          "Fairy Rider Saddle", "Velvet Harness", "Silver Bell Collar"
        ],
        objects: [
          "Windmill Mechanism", "Stone Lantern", "Garden Fountain", "Crystal Resonator",
          "Signpost Marker", "Carved Wooden Bench", "Weather Vane"
        ],
        vehicles: {
          railways: ["Standard Gauge Electric Tram", "Narrow Gauge Cog Railway", "High-Speed Rail Carriage"],
          properties: ["gaugeType", "carriageCount", "operatingSpeedMph", "trackId"]
        }
      }
    };
  }

  /**
   * Fetches local Web Audio sound synthesis definitions in System/Sound/
   */
  public static fetchSoundSynthesizers(): Record<string, any> {
    return {
      registryId: "System/Sound",
      description: "Offline Web Audio API procedural sound engine, synthesizer nodes & acoustic resonance profiles",
      architecture: "100% Client-Side Local Mathematical Oscillator Synthesis (No external audio latency)",
      subsystems: {
        bgmSynthesizer: {
          modes: ["Calm Adventure", "Alpine Exploration", "Mystic Canopy", "Twilight Glide"],
          waveforms: ["sine", "triangle", "harmonic_fm"],
          envelope: { attack: 0.1, decay: 0.2, sustain: 0.7, release: 0.5 }
        },
        sfxSynthesizer: {
          generators: ["hoof_tap", "wind_whistle", "water_splash", "chime_resonate", "opossum_chatter_sweep", "tick", "whoosh"],
          opossumChatterSignatures: {
            melissa: "Base Harmonic",
            ashley: "High Resonance",
            amaraQin: "Warm Melodic",
            tianaQin: "Amara -3% offset",
            saffronRose: "Vibrant",
            agapeRose: "Saffron -4% offset",
            roxanneKoneReynolds: "Agape -1% offset"
          }
        },
        acousticSurfaces: [
          "wood_floor", "stone_dense", "metal_solid", "crystal_chime",
          "glass_resonant", "gravel_rough", "ice_smooth", "snow_soft", "carpet_plush"
        ]
      }
    };
  }

  /**
   * Fetches visual rendering standards and dimension profiles in System/Visuals/
   */
  public static fetchVisuals(): Record<string, any> {
    return {
      registryId: "System/Visuals",
      description: "Visual rendering system specifications, resolutions, color systems, and projection modes",
      visualModes: [
        "Pixelations Only",
        "2-D Only",
        "Simulated 3-D (recommended)",
        "Split 3-D",
        "3-D (mathematical)",
        "3-D+",
        "High Power 3-D",
        "Very High Power 3-D",
        "Ultra-High Power 3-D"
      ],
      resolutions: ["2K", "4K", "8K", "16K", "32K", "64K", "128K", "256K", "512K", "1024K"],
      cameraPerspectives: ["Behind-the-Rider (Angle 4)", "Isometric Overhead", "Wide Panoramic Track", "First-Person Saddle View"]
    };
  }

  /**
   * Fetches local pre-generated arenas and templates in System/Registry/Arena/
   */
  public static fetchLocalArenas(): Record<string, any> {
    return {
      registryId: "System/Registry/Arena",
      description: "Local pre-generated or handcrafted procedural Arenas and Geological Templates",
      arenasCount: 16,
      templates: [
        { id: "floor_foyer", surface: "ceramic tile", geologicalStyle: "Manor Grand Vault" },
        { id: "stone_corridor", surface: "slate stone", geologicalStyle: "Underground Dungeon" },
        { id: "garden", surface: "light gravel", geologicalStyle: "Cultivated Maze" },
        { id: "plain", surface: "soft grass", geologicalStyle: "Tranquil Meadow" },
        { id: "cave", surface: "slab stone", geologicalStyle: "Natural Cavern" },
        { id: "mountains", surface: "sharp granite", geologicalStyle: "Elevated Slopes" }
      ]
    };
  }

  /**
   * Compiles the requested active modules into a comprehensive manifest
   */
  public static fetchAllSupportedContext(options: {
    fetchBuildingBlocks?: boolean;
    fetchItems?: boolean;
    fetchSound?: boolean;
    fetchVisuals?: boolean;
    fetchLocalArenas?: boolean;
  }): SystemFetchManifest {
    const manifest: SystemFetchManifest = {
      fetchedAt: new Date().toISOString(),
      totalModulesCount: 0
    };

    if (options.fetchBuildingBlocks !== false) {
      manifest.buildingBlocks = this.fetchBuildingBlocks();
      manifest.totalModulesCount++;
    }
    if (options.fetchItems !== false) {
      manifest.items = this.fetchItems();
      manifest.totalModulesCount++;
    }
    if (options.fetchSound !== false) {
      manifest.sound = this.fetchSoundSynthesizers();
      manifest.totalModulesCount++;
    }
    if (options.fetchVisuals !== false) {
      manifest.visuals = this.fetchVisuals();
      manifest.totalModulesCount++;
    }
    if (options.fetchLocalArenas !== false) {
      manifest.localArenas = this.fetchLocalArenas();
      manifest.totalModulesCount++;
    }

    return manifest;
  }

  /**
   * Builds the formatted System Instruction block adhering strictly to Markdown, HTML, or Raw Text format
   */
  public static buildFullSystemInstruction(
    userSystemInstructions: string,
    format: "markdown" | "html" | "text" = "markdown",
    manifest?: SystemFetchManifest
  ): string {
    const headerTitle = "Opossum Ride Adventure - System Operational Directives";
    let manifestText = "";

    if (manifest) {
      if (format === "html") {
        manifestText = `\n<section id="game_subsystem_context">\n  <h2>Active System Knowledge Base</h2>\n  <pre>${JSON.stringify(manifest, null, 2)}</pre>\n</section>`;
      } else if (format === "markdown") {
        manifestText = `\n\n## 📦 Active System Knowledge Base (Fetched Modules)\n\`\`\`json\n${JSON.stringify(manifest, null, 2)}\n\`\`\``;
      } else {
        manifestText = `\n\n=== ACTIVE SYSTEM KNOWLEDGE BASE ===\n${JSON.stringify(manifest, null, 2)}`;
      }
    }

    if (format === "html") {
      return `<article>\n  <h1>${headerTitle}</h1>\n  <div class="user-instructions">\n${userSystemInstructions || "No custom user directives."}\n  </div>${manifestText}\n</article>`;
    } else if (format === "text") {
      return `=== ${headerTitle.toUpperCase()} ===\n\n${userSystemInstructions || "No custom user directives."}${manifestText}`;
    } else {
      return `# ${headerTitle}\n\n${userSystemInstructions || "No custom user directives."}${manifestText}`;
    }
  }
}
