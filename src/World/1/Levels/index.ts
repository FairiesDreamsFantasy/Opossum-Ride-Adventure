/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GameLevel } from "../../../types";
import { isMooseAndMonkeysAllowedInPlace } from "../../../System/AI/In-Game/Moose_and_Monkeys_Not_Included_In_the_Garden";

export function generateLevel(levelId: number): GameLevel {
  if (levelId === 0) {
    return {
      id: 0,
      name: "Floor Foyer",
      placeId: "floor_foyer",
      targetDistance: 2000, // 2000 ft boundaries
      tickDensity: 10, // Some light ticks in the foyer to keep it fun
      opponentFrequency: 0, // safe learning environment without moose collisions
      colorHue: 280 // Purple/Indigo palette
    };
  }

  const isPrimary = levelId <= 1000;
  
  // Custom naming patterns for primary levels and infinite endless levels
  let name = "";
  if (isPrimary) {
    if (levelId === 1) {
      name = "Garden of Beginnings";
    } else {
      const themes: Record<string, string[]> = {
        garden: ["Rose", "Ivy", "Fern", "Clover", "Hedge", "Orchard", "Lotus", "Tulip", "Myrtle", "Bramble"],
        zen_stone_garden: ["Raked", "Silent", "Stone", "Pebble", "Granite", "Gravel", "Serene", "Calm", "Whispering", "Zen"],
        botanical_maze: ["Hedge", "Labyrinth", "Boxwood", "Shrub", "Verdant", "Twisting", "Maze", "Leafy", "Emerald", "Hidden"],
        butterfly_sanctuary: ["Fluttering", "Silky", "Monarch", "Monarch-Nectar", "Tropical", "Orchid", "Blossom", "Chrysalis", "Petal", "Hovering"],
        orchid_glasshouse: ["Steamy", "Exotic", "Glass", "Tranquil", "Mist", "Vibrant", "Moist", "Bloomed", "Hothouse", "Floral"],
        edible_berry_garden: ["Ripe", "Sweet", "Berry", "Strawberry", "Bramble", "Honey", "Beech", "Nectar", "Wildwood", "Fruity"],
        chicken_farm: ["Feathered", "Scratching", "Roosting", "Golden-Egg", "Pasture", "Hay-Straw", "Broody", "Sunny-Side", "Paddock", "Plucky"],
        goat_farm: ["Rocky-Hill", "Agile", "Bleating", "Nanny", "Billy", "Mountain-Climber", "Salt-Lick", "Spotted", "Wild-Goat", "Playful"],
        sheep_farm: ["Woolly", "Fluffy", "Clover-Meadow", "Grazing", "Ewe-Flock", "Shepherd", "Soft-Meadow", "Pristine", "Lanolin", "Pastoral"],
        duck_farm: ["Waterfowl", "Splashy", "Mallard", "Pond-Side", "Feathered", "Marshy", "Reedy", "Waddling", "Webbed-Foot", "Quacking"],
        goose_farm: ["Gander", "Honking", "Proud-Formation", "Creek-Side", "Guarding", "Feathered", "Emerald-Turf", "Wild-Goose", "Sentry", "Plumed"],
        horse_farm: ["Equestrian", "Mustang", "Paddock", "Galloping", "Clover-Ridge", "Solar-Stable", "Bridle-Path", "Pastoral", "Trotter", "Chestnut"],
        cattle_farm: ["Majestic-Herd", "Bovine", "Deep-Lowing", "Red-Barn", "Silo-Field", "Pasture", "Lariat", "Sturdy", "Ranch", "Western"],
        crop_field: ["Slate-Paved", "Solar-Tended", "Rustling", "Triangular-Way", "Verdant-Row", "Harvest-Tech", "Autonomous", "Golden-Acre", "Irrigated", "Mosaic-Slate"],
        wheat_field: ["Golden-Wheat", "Amber-Wave", "Harvest-Solar", "Slate-Row", "Rustling-Head", "Autumn-Gold", "Sunlit-Grain", "Breeze-Swept", "Stalk-Line", "Granary-Path"],
        corn_field: ["Tall-Maize", "Silk-Tassel", "Green-Canopy", "Sun-Drenched", "Husk-Row", "Slate-Passage", "Rover-Patrol", "Rustling-Stalk", "Canyon-Row", "Bountiful"],
        barley_field: ["Bearded-Grain", "Emerald-Awn", "Malt-Breeze", "Slate-Trail", "Sun-Ripened", "Solar-Tended", "Whispering", "Plumed-Head", "Harvest-Line", "Rustic-Row"],
        rice_field: ["Irrigated", "Terraced", "Shimmering", "Paddy-Breeze", "Lush-Shoot", "Boom-Sprayed", "Emerald-Water", "Sky-Mirror", "Slate-Causeway", "Monsoon-Dew"],
        oats_field: ["Nodding-Plume", "Silvery-Green", "Breeze-Ripple", "Morning-Oat", "Slate-Ridge", "Whole-Grain", "Panicle-Row", "Gentle-Rustle", "Solar-Pasture", "Pastoral"],
        sorghum_field: ["Crimson-Head", "Red-Panicle", "Milo-Stalk", "Drought-Brave", "High-Plain", "Slate-Aisle", "Copper-Tuft", "Sun-Harvest", "Rover-Tended", "Rustling-Plume"],
        rye_field: ["Resilient-Rye", "Emerald-Spike", "Crisp-Stalk", "Slate-Passage", "Cool-Breeze", "Solar-Tended", "Harvest-Grain", "Sunlit-Row", "Rustling-Ear", "Prairie-Rye"],
        millet_field: ["Pearl-Millet", "Golden-Cluster", "Sun-Warm", "Slate-Walk", "Feather-Grain", "Rover-Patrol", "Breeze-Swept", "Amber-Tuft", "Harvest-Way", "Dryland-Bloom"],
        buckwheat_field: ["Blossoming", "Bee-Friendly", "Crimson-Stem", "Slate-Aisle", "Honey-Nectar", "Solar-Tended", "White-Blossom", "Triangular-Seed", "Sunlit-Plot", "Pastoral"],
        quinoa_field: ["Rainbow-Seed", "Highland-Plume", "Amber-Panicle", "Slate-Row", "Solar-Sensor", "Harvest-Cluster", "Magenta-Grain", "Crisp-Air", "Bountiful", "Terrace"],
        amaranth_field: ["Ruby-Plume", "Velvet-Crimson", "Tall-Stalk", "Slate-Causeway", "Sunlit-Tassel", "Solar-Tended", "Autumn-Flame", "Breeze-Swayed", "Heritage-Grain", "Harvest-Row"],
        spelt_field: ["Ancient-Husk", "Golden-Awn", "Whispering-Spelt", "Slate-Path", "Sun-Ripened", "Solar-Monitored", "Bronze-Wave", "Rustling-Stalk", "Artisan-Grain", "Meadow-Ridge"],
        vegetable_field: ["Verdant-Row", "Solar-Tended", "Fresh-Produce", "Slate-Path", "Irrigated", "Garden-Acre", "Harvest-Tech", "Crisp-Leaf", "Autonomous", "Sunlit-Bed"],
        carrot_field: ["Feathery-Top", "Sandy-Loam", "Emerald-Frond", "Slate-Causeway", "Crisp-Root", "Solar-Weeded", "Sunlit-Ridge", "Breeze-Rustle", "Harvest-Row", "Orange-Crown"],
        potato_field: ["Flowering-Bed", "Shaded-Mound", "Emerald-Vine", "Slate-Path", "Irrigated", "Solar-Monitored", "Rich-Loam", "Blossom-Row", "Harvest-Ridge", "Bountiful"],
        tomato_field: ["Heirloom-Vine", "Crimson-Fruit", "Trellis-Row", "Slate-Aisle", "Honeybee-Hum", "Solar-Misted", "Sun-Ripened", "Golden-Truss", "Garden-Plot", "Harvest-Line"],
        cabbage_field: ["Blue-Green", "Ruby-Head", "Broad-Leaf", "Slate-Passage", "Cool-Breeze", "Solar-Drip", "Crisp-Row", "Verdant-Bed", "Sunlit-Plot", "Harvest-Way"],
        onion_field: ["Silver-Shoot", "Tubular-Row", "Whistling-Breeze", "Slate-Walk", "Sun-Cured", "Solar-Sensor", "Crisp-Stalk", "Amber-Bed", "Harvest-Ridge", "Meadow-Plot"],
        broccoli_field: ["Jade-Crown", "Floret-Row", "Mist-Cooled", "Slate-Path", "Leafy-Stalk", "Solar-Boom", "Emerald-Head", "Crisp-Air", "Harvest-Acre", "Verdant"],
        squash_field: ["Golden-Blossom", "Velvet-Leaf", "Sun-Sprawled", "Slate-Causeway", "Pollinated", "Solar-Rover", "Amber-Vine", "Rustling-Plot", "Harvest-Row", "Bountiful"],
        spinach_field: ["Tender-Leaf", "Deep-Emerald", "Cool-Shade", "Slate-Aisle", "Crisp-Row", "Micro-Mist", "Solar-Tended", "Nutrient-Rich", "Morning-Dew", "Harvest-Bed"],
        bell_pepper_field: ["Glossy-Pepper", "Tri-Color", "Crisp-Canopy", "Slate-Walk", "Ruby-Gold-Green", "Solar-Scanned", "Sun-Drenched", "Verdant-Row", "Harvest-Plot", "Bountiful"]
      };

      const descriptors: Record<string, string[]> = {
        garden: ["Runway", "Adventure", "Hedge-Way", "Terrace", "Foliage", "Scent", "Meadow-Trail", "Clover-Run", "Scented-Run", "Pathway"],
        zen_stone_garden: ["Pathway", "Sanctuary", "Garden", "Trail", "Yard", "Vista", "Clearing", "Retreat", "Path", "Enclosure"],
        botanical_maze: ["Labyrinth", "Corridor", "Maze-Way", "Thicket", "Loop", "Path", "Puzzle", "Route", "Passage", "Hedge-Way"],
        butterfly_sanctuary: ["Dome", "Sanctuary", "Aviary", "Meadow", "Haven", "Glasshouse", "Glade", "Habitat", "Bower", "Garden"],
        orchid_glasshouse: ["Atrium", "Glasshouse", "Greenhouse", "Terrarium", "Pavilion", "Enclosure", "Vault", "Dome", "Gallery", "Conservatory"],
        edible_berry_garden: ["Patch", "Bramble", "Orchard", "Thicket", "Plot", "Grove", "Glade", "Field", "Row", "Pasture"],
        chicken_farm: ["Yard", "Run", "Pasture", "Coop-Way", "Paddock", "Pluck-Run", "Roost", "Straw-Trail", "Scratch-Field", "Runway"],
        goat_farm: ["Hill", "Paddock", "Structures", "Ramp-Way", "Knoll", "Climb", "Trail", "Ridge", "Meadow", "Runway"],
        sheep_farm: ["Meadow", "Hillside", "Pasture", "Green-Field", "Fold", "Clover-Field", "Glen", "Downs", "Meadow-Trail", "Runway"],
        duck_farm: ["Pond", "Wetland", "Marsh", "Shoreline", "Water-Way", "Estuary", "Basin", "Nesting-Ground", "Puddle", "Runway"],
        goose_farm: ["Field", "Creek-Paddock", "Lawn", "Grass-Meade", "Sentry-Post", "Formation", "Stream-Side", "Meadow", "Flat", "Runway"],
        horse_farm: ["Pasture", "Paddock", "Bridle-Trail", "Corral", "Clover-Run", "Meadow-Track", "Stable-Way", "Ridge", "Field", "Runway"],
        cattle_farm: ["Prairie", "Paddock", "Ranch-Land", "Silo-Pasture", "Barn-Yard", "Range", "Cattle-Path", "Grassland", "Silo-Field", "Runway"],
        crop_field: ["Causeway", "Slate-Path", "Field-Way", "Mosaic-Trail", "Harvest-Lane", "Acreage", "Sensor-Row", "Corridor", "Furrow-Run", "Runway"],
        wheat_field: ["Field", "Slate-Causeway", "Acre", "Furrow-Way", "Harvest-Lane", "Mosaic-Path", "Terrace", "Expanse", "Grain-Run", "Runway"],
        corn_field: ["Corridor", "Maize-Way", "Slate-Aisle", "Stalk-Alley", "Acreage", "Tassel-Trail", "Harvest-Row", "Expanse", "Rover-Lane", "Runway"],
        barley_field: ["Plot", "Barley-Run", "Slate-Walk", "Awn-Trail", "Field", "Grain-Lane", "Harvest-Way", "Meadow-Row", "Expanse", "Runway"],
        rice_field: ["Paddy-Causeway", "Terrace-Path", "Slate-Bridge", "Basin-Run", "Irrigation-Way", "Field", "Shoots-Trail", "Expanse", "Row", "Runway"],
        oats_field: ["Meadow-Plot", "Oats-Lane", "Slate-Track", "Plume-Trail", "Field", "Grain-Way", "Harvest-Path", "Expanse", "Row", "Runway"],
        sorghum_field: ["Acre", "Sorghum-Way", "Slate-Road", "Milo-Trail", "Field", "Panicle-Run", "Harvest-Path", "Expanse", "Row", "Runway"],
        rye_field: ["Plot", "Rye-Causeway", "Slate-Track", "Spike-Trail", "Field", "Grain-Way", "Harvest-Row", "Expanse", "Meadow", "Runway"],
        millet_field: ["Acre", "Millet-Way", "Slate-Walk", "Cluster-Trail", "Field", "Grain-Lane", "Harvest-Row", "Expanse", "Terrace", "Runway"],
        buckwheat_field: ["Plot", "Blossom-Way", "Slate-Aisle", "Nectar-Trail", "Field", "Bloom-Lane", "Harvest-Row", "Expanse", "Meadow", "Runway"],
        quinoa_field: ["Terrace", "Quinoa-Way", "Slate-Path", "Plume-Trail", "Field", "Seed-Lane", "Harvest-Row", "Expanse", "Ridge", "Runway"],
        amaranth_field: ["Acre", "Amaranth-Way", "Slate-Causeway", "Plume-Trail", "Field", "Crimson-Lane", "Harvest-Row", "Expanse", "Plot", "Runway"],
        spelt_field: ["Plot", "Spelt-Way", "Slate-Track", "Awn-Trail", "Field", "Grain-Lane", "Harvest-Row", "Expanse", "Ridge", "Runway"],
        vegetable_field: ["Bed", "Produce-Way", "Slate-Path", "Garden-Trail", "Field", "Harvest-Row", "Expanse", "Plot", "Acre", "Runway"],
        carrot_field: ["Ridge", "Carrot-Way", "Slate-Causeway", "Frond-Trail", "Field", "Loam-Row", "Harvest-Lane", "Expanse", "Plot", "Runway"],
        potato_field: ["Mound", "Potato-Way", "Slate-Path", "Blossom-Trail", "Field", "Loam-Row", "Harvest-Lane", "Expanse", "Plot", "Runway"],
        tomato_field: ["Trellis-Way", "Tomato-Aisle", "Slate-Path", "Vine-Trail", "Field", "Heirloom-Row", "Harvest-Lane", "Expanse", "Plot", "Runway"],
        cabbage_field: ["Bed", "Cabbage-Way", "Slate-Passage", "Leaf-Trail", "Field", "Crisp-Row", "Harvest-Lane", "Expanse", "Plot", "Runway"],
        onion_field: ["Ridge", "Onion-Way", "Slate-Walk", "Shoot-Trail", "Field", "Loam-Row", "Harvest-Lane", "Expanse", "Plot", "Runway"],
        broccoli_field: ["Bed", "Broccoli-Way", "Slate-Path", "Crown-Trail", "Field", "Jade-Row", "Harvest-Lane", "Expanse", "Plot", "Runway"],
        squash_field: ["Plot", "Squash-Way", "Slate-Causeway", "Blossom-Trail", "Field", "Vine-Row", "Harvest-Lane", "Expanse", "Acre", "Runway"],
        spinach_field: ["Bed", "Spinach-Way", "Slate-Aisle", "Leaf-Trail", "Field", "Emerald-Row", "Harvest-Lane", "Expanse", "Plot", "Runway"],
        bell_pepper_field: ["Plot", "Pepper-Way", "Slate-Walk", "Canopy-Trail", "Field", "Produce-Row", "Harvest-Lane", "Expanse", "Acre", "Runway"]
      };

      const levelPlaceIds = [
        "floor_foyer",          // 0
        "garden",               // 1
        "zen_stone_garden",     // 2
        "botanical_maze",       // 3
        "butterfly_sanctuary",  // 4
        "orchid_glasshouse",    // 5
        "edible_berry_garden",  // 6
        "cherry_orchard",       // 7
        "almond_grove",         // 8
        "apple_grove",          // 9
        "olive_grove",          // 10
        "walnut_grove",         // 11
        "the_grand_orchard",    // 12
        "chicken_farm",         // 13
        "goat_farm",            // 14
        "sheep_farm",           // 15
        "duck_farm",            // 16
        "goose_farm",           // 17
        "horse_farm",           // 18 (slotted before Cattle Farm)
        "cattle_farm",          // 19
        "wheat_field",          // 20
        "corn_field",           // 21
        "barley_field",         // 22
        "rice_field",           // 23
        "oats_field",           // 24
        "sorghum_field",        // 25
        "rye_field",            // 26
        "millet_field",         // 27
        "buckwheat_field",      // 28
        "quinoa_field",         // 29
        "amaranth_field",       // 30
        "spelt_field",          // 31
        "carrot_field",         // 32
        "potato_field",         // 33
        "tomato_field",         // 34
        "cabbage_field",        // 35
        "onion_field",          // 36
        "broccoli_field",       // 37
        "squash_field",         // 38
        "spinach_field",        // 39
        "bell_pepper_field"     // 40
      ];

      const maxIndex = levelPlaceIds.length - 1;
      const placeId = levelId <= maxIndex ? levelPlaceIds[levelId] : levelPlaceIds[1 + ((levelId - 1) % maxIndex)];

      let baseKey = placeId;
      if (placeId.includes("grove") || placeId.includes("orchard")) {
        baseKey = "edible_berry_garden";
      }

      const pThemes = themes[baseKey] || themes.garden;
      const pDescs = descriptors[baseKey] || descriptors.garden;

      const theme = pThemes[levelId % pThemes.length];
      const descriptor = pDescs[(levelId * 3) % pDescs.length];

      // Formulate place-appropriate name
      const capPlace = placeId.charAt(0).toUpperCase() + placeId.slice(1).replace(/_/g, " ");
      name = `${theme} ${descriptor} (${capPlace} Level ${levelId})`;
    }
  } else {
    name = `Infinite Endless Mystery Land (Stage ${levelId})`;
  }

  // Target distance in meters: shortened by 30% as requested by the user
  const targetDistance = Math.floor((1500 + levelId * 300) * 0.7);
  
  // Tick Density: average ticks count per 100 meters (keeps it fun! 8 to 20)
  const tickDensity = Math.min(25, 6 + (levelId % 8));

  // Cycle cleanly across World 1: Gardens, Orchards, Farms, Crop Fields, Vegetable Fields (Level_0–Level_40)
  const levelPlaceIdsForEndless = [
    "floor_foyer",          // 0
    "garden",               // 1
    "zen_stone_garden",     // 2
    "botanical_maze",       // 3
    "butterfly_sanctuary",  // 4
    "orchid_glasshouse",    // 5
    "edible_berry_garden",  // 6
    "cherry_orchard",       // 7
    "almond_grove",         // 8
    "apple_grove",          // 9
    "olive_grove",          // 10
    "walnut_grove",         // 11
    "the_grand_orchard",    // 12
    "chicken_farm",         // 13
    "goat_farm",            // 14
    "sheep_farm",           // 15
    "duck_farm",            // 16
    "goose_farm",           // 17
    "horse_farm",           // 18
    "cattle_farm",          // 19
    "wheat_field",          // 20
    "corn_field",           // 21
    "barley_field",         // 22
    "rice_field",           // 23
    "oats_field",           // 24
    "sorghum_field",        // 25
    "rye_field",            // 26
    "millet_field",         // 27
    "buckwheat_field",      // 28
    "quinoa_field",         // 29
    "amaranth_field",       // 30
    "spelt_field",          // 31
    "carrot_field",         // 32
    "potato_field",         // 33
    "tomato_field",         // 34
    "cabbage_field",        // 35
    "onion_field",          // 36
    "broccoli_field",       // 37
    "squash_field",         // 38
    "spinach_field",        // 39
    "bell_pepper_field"     // 40
  ];
  const maxIndexForEndless = levelPlaceIdsForEndless.length - 1;
  const placeId = levelId === 0 ? "floor_foyer" : (levelId <= maxIndexForEndless ? levelPlaceIdsForEndless[levelId] : levelPlaceIdsForEndless[1 + ((levelId - 1) % maxIndexForEndless)]);

  // Opponent frequency (monkeys riding moose) per 100 meters - strictly zero for non-allowed places like Garden
  const opponentFrequency = isMooseAndMonkeysAllowedInPlace(placeId) ? Math.min(5, 0.5 + (levelId * 0.15)) : 0;

  // Dynamic aesthetic: rotate hue for beautiful, varied path boundaries
  const colorHue = (levelId * 73) % 360;

  return {
    id: levelId,
    name,
    placeId,
    targetDistance,
    tickDensity,
    opponentFrequency,
    colorHue
  };
}

export * from "./Index";
