/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SceneNarrationContext } from "../Scene_Types";
import { PlaceResolver } from "../../../../../../../Engine/Resolver";

/**
 * Garden Arena Narration Module
 * 
 * Manages spatial orientation, substrate acoustics, and subarenas across the
 * Garden biome (Zen Stone Garden, Botanical Maze, Sanctuaries, Orchards, Groves, Farms).
 */
export const GardenArenaNarration = {
  arenaId: "garden",
  arenaName: "Garden Arena",

  /**
   * Catalog of all registered garden subarenas and botanical microclimates
   */
  subarenas: {
    zen_stone_garden: {
      name: "Zen Stone Garden",
      substrate: "raked fine mineral gravel and smooth river stones",
      acoustic: "gentle open-air wind dispersal RT60 ~0.6s"
    },
    botanical_maze: {
      name: "Botanical Maze",
      substrate: "manicured lawn turf bordered by dense cedar hedges",
      acoustic: "hedge-baffled acoustic attenuation RT60 ~0.5s"
    },
    butterfly_sanctuary: {
      name: "Butterfly Sanctuary",
      substrate: "soft mossy soil under vaulted glass arches",
      acoustic: "glasshouse humidity resonance RT60 ~1.1s"
    },
    orchid_glasshouse: {
      name: "Orchid Glasshouse",
      substrate: "pebble aggregate walkway surrounded by tropical foliage",
      acoustic: "glasshouse humidity resonance RT60 ~1.1s"
    },
    edible_berry_garden: {
      name: "Edible Berry Garden",
      substrate: "rich organic topsoil with woodchip mulched paths",
      acoustic: "low-absorption foliage scatter RT60 ~0.6s"
    },
    the_grand_orchard: {
      name: "The Grand Orchard",
      substrate: "sun-dappled grassy orchard loam",
      acoustic: "open canopy breeze RT60 ~0.7s"
    },
    cherry_orchard: {
      name: "Cherry Orchard",
      substrate: "blossom-carpeted turf paths",
      acoustic: "canopy flutter RT60 ~0.7s"
    },
    almond_grove: {
      name: "Almond Grove",
      substrate: "compacted earth and dry grass",
      acoustic: "open breeze RT60 ~0.6s"
    },
    apple_grove: {
      name: "Apple Grove",
      substrate: "lush turf path between productive apple trees",
      acoustic: "leafy canopy dispersion RT60 ~0.7s"
    },
    olive_grove: {
      name: "Olive Grove",
      substrate: "terracotta dust and dry limestone soil",
      acoustic: "dry Mediterranean atmospheric breeze RT60 ~0.5s"
    },
    walnut_grove: {
      name: "Walnut Grove",
      substrate: "deep shady loam scattered with walnut shells",
      acoustic: "dense high-canopy resonance RT60 ~0.8s"
    },
    chicken_farm: {
      name: "Chicken Farm",
      substrate: "fenced chicken run with straw and scattered grain",
      acoustic: "warm rustic agricultural ambient RT60 ~0.6s"
    },
    goat_farm: {
      name: "Goat Farm",
      substrate: "rocky paddock with wooden climbing platforms",
      acoustic: "open pasture breeze RT60 ~0.6s"
    },
    sheep_farm: {
      name: "Sheep Farm",
      substrate: "wide rolling pasture grass",
      acoustic: "pastoral acoustic expanse RT60 ~0.5s"
    },
    duck_farm: {
      name: "Duck Farm",
      substrate: "reed-lined pond bank and moist turf",
      acoustic: "water ripple reflection RT60 ~0.7s"
    },
    goose_farm: {
      name: "Goose Farm",
      substrate: "open meadow and gravel staging",
      acoustic: "wide-open rural airflow RT60 ~0.6s"
    },
    cattle_farm: {
      name: "Cattle Farm",
      substrate: "expansive prairie paddock soil",
      acoustic: "distant timber barn acoustic echo RT60 ~0.8s"
    },
    horse_farm: {
      name: "Horse Farm",
      substrate: "manicured pasture with professional split-rail training track",
      acoustic: "turf-damped hoofbeat resonance RT60 ~0.6s"
    }
  },

  /**
   * Compiles the Garden scene description cleanly through registered place data.
   */
  compileScene: (ctx: SceneNarrationContext): string => {
    const resolvedPlace = PlaceResolver.resolvePlace(ctx.placeId, ctx.levelName);
    const name = ctx.levelName || resolvedPlace.name || "Garden Arena";
    const surface = ctx.surfaceType || resolvedPlace.surfaceType || "natural terrain";
    const atmosphere = ctx.theme || resolvedPlace.ambientNoise || "Serene";
    const longDesc = ctx.longDescription || resolvedPlace.longDescription || resolvedPlace.description || "";

    const base = `You are currently at ${name}. Terrain substrate features ${surface}. Atmospheric resonance is ${atmosphere}.`;
    return longDesc ? `${base} ${longDesc}` : base;
  },

  /**
   * Compiles course path progression announcement.
   */
  compilePosition: (formattedDistance: string, activeName: string, segmentDirection: string): string => {
    return `You are at ${formattedDistance} of ${activeName} via a course path, facing ${segmentDirection.toLowerCase()}.`;
  }
};

export default GardenArenaNarration;
