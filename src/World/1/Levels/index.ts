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
        simulated_gold_mine: ["Brilliant", "Ingot", "Shimmering", "Nugget", "Glittering", "Golden", "Pyrite", "Midas", "Gilded", "Auric"],
        simulated_silver_mine: ["Argent", "Polished", "Lustrous", "Sterling", "Specular", "Chrome", "Chalice", "Plated", "Silver", "Gray-Nugget"],
        simulated_emerald_mine: ["Jade", "Beryl", "Floaty-Islands", "Crystalline", "Prismatic", "Faceted", "Deep-Green", "Verdant", "Glow", "Celadon"],
        simulated_diamond_mine: ["Carbon", "Flawless", "Sparkling", "Prismatic", "Brilliant", "Refractive", "Rainbow", "Glistening", "Glacial", "Ice-White"],
        simulated_salt_mine: ["Halite", "Saline", "Crystalline", "White-Rock", "Contrast", "Brine", "Monochrome", "Salty", "Snowy", "Bleached"],
        cave: ["Mossy", "Limestone", "Grotto", "Crystal", "Basalt", "Shadow", "Stalactite", "Echo", "Granite", "Underworld"],
        plain: ["Switchgrass", "Prairie", "Meadow", "Valley", "Savannah", "Steppe", "Grassland", "Pampas", "Veldfire", "Loam"],
        mountains: ["Scree", "Granite", "Crag", "Glacier", "Summit", "Ridge", "Peak", "Basalt", "Volcanic", "Sub-Alpine"],
        stone_corridor: ["Dungeon", "Masonry", "Castle", "Vault", "Slab", "Corridor", "Passage", "Gallery", "Crypt", "Cloister"],
        forest: ["Birch", "Pine", "Redwood", "Mulch", "Dewy", "Autumn", "Canopy", "Thicket", "Boreal", "Grove"],
        city: ["Asphalt", "Neon", "Cyber", "Alley", "Slate", "Metropolitan", "Concrete", "Grid", "Downtown", "Expressway"],
        quarry: ["Pit", "Sand", "Excavating", "Granite", "Grit", "Gilded", "Quartz", "Clay", "Silt", "Crushed-Rock"],
        stone_room: ["Tapestry", "Chamber", "Relic", "Vault", "Palace", "Polished", "Sanctuary", "Marble", "Hearth", "Foyer-Inner"],
        desert: ["Saharan", "Crimson", "Arid", "Dune", "Oasis", "Mirage", "Nomad", "Scorpion", "Sirocco", "Canyon"],
        generic: ["Lounge", "Hardwood", "Fireplace", "Manor", "Estate", "Cozy", "Parlor", "Chamber-Inner", "Vestibule", "Library"],
        chicken_farm: ["Feathered", "Scratching", "Roosting", "Golden-Egg", "Pasture", "Hay-Straw", "Broody", "Sunny-Side", "Paddock", "Plucky"],
        goat_farm: ["Rocky-Hill", "Agile", "Bleating", "Nanny", "Billy", "Mountain-Climber", "Salt-Lick", "Spotted", "Wild-Goat", "Playful"],
        sheep_farm: ["Woolly", "Fluffy", "Clover-Meadow", "Grazing", "Ewe-Flock", "Shepherd", "Soft-Meadow", "Pristine", "Lanolin", "Pastoral"],
        duck_farm: ["Waterfowl", "Splashy", "Mallard", "Pond-Side", "Feathered", "Marshy", "Reedy", "Waddling", "Webbed-Foot", "Quacking"],
        goose_farm: ["Gander", "Honking", "Proud-Formation", "Creek-Side", "Guarding", "Feathered", "Emerald-Turf", "Wild-Goose", "Sentry", "Plumed"],
        cattle_farm: ["Majestic-Herd", "Bovine", "Deep-Lowing", "Red-Barn", "Silo-Field", "Pasture", "Lariat", "Sturdy", "Ranch", "Western"]
      };

      const descriptors: Record<string, string[]> = {
        garden: ["Runway", "Adventure", "Hedge-Way", "Terrace", "Foliage", "Scent", "Meadow-Trail", "Clover-Run", "Scented-Run", "Pathway"],
        zen_stone_garden: ["Pathway", "Sanctuary", "Garden", "Trail", "Yard", "Vista", "Clearing", "Retreat", "Path", "Enclosure"],
        botanical_maze: ["Labyrinth", "Corridor", "Maze-Way", "Thicket", "Loop", "Path", "Puzzle", "Route", "Passage", "Hedge-Way"],
        butterfly_sanctuary: ["Dome", "Sanctuary", "Aviary", "Meadow", "Haven", "Glasshouse", "Glade", "Habitat", "Bower", "Garden"],
        orchid_glasshouse: ["Atrium", "Glasshouse", "Greenhouse", "Terrarium", "Pavilion", "Enclosure", "Vault", "Dome", "Gallery", "Conservatory"],
        edible_berry_garden: ["Patch", "Bramble", "Orchard", "Thicket", "Plot", "Grove", "Glade", "Field", "Row", "Pasture"],
        simulated_gold_mine: ["Ridge", "Shaft", "Chamber", "Lode", "Vein", "Excavation", "Gallery", "Tunnel", "Vault", "Slab-Way"],
        simulated_silver_mine: ["Grotto", "Shaft", "Passage", "Vein", "Lode", "Adit", "Chamber", "Drift", "Stope", "Way"],
        simulated_emerald_mine: ["Islands", "Platform", "Sphere-Vault", "Cavern", "Embossed-Way", "Abyss", "Chamber", "Grotto", "Tiles-Path", "Hall"],
        simulated_diamond_mine: ["Glass-Floor", "Circles-Way", "Diamond-Walls", "Canyon", "Vault", "Table-Star", "Fissure", "Chamber", "Tunnel", "Track"],
        simulated_salt_mine: ["Cavern", "Flooring", "Walls-Track", "Shaft", "Pit", "Chamber", "Gully", "Slab", "Adit", "Passage"],
        cave: ["Grotto", "Cavern", "Fissure", "Chamber", "Vent-Shaft", "Shaft", "Abyss", "Gully", "Crevice", "Tunnel"],
        plain: ["Plain", "Switchgrass-Loam", "Prairie-Way", "Field", "Steppe-trail", "Loam-Run", "Meadow", "Breeze-Track", "Plains", "Runway"],
        mountains: ["Peak", "Ridge", "Summit", "Pass", "Scree-Slope", "Cliff", "Ascent", "Gorge", "Saddle", "High-Trail"],
        stone_corridor: ["Corridor", "Dungeon-Track", "Vault", "Passageway", "Slab-Way", "Gallery", "Crypt", "Dungeon", "Tunnel", "Hall"],
        forest: ["Birch-Way", "Canopy-Run", "Mulch-Track", "Forest", "Grove", "Pine-Trail", "Woodland", "Boreal-Run", "Leaves-Trail", "Canopy"],
        city: ["Alleyway", "Asphalt-Track", "Lane", "Neon-Alley", "Canyon", "Metropolitan-Way", "Asphalt-Block", "Grid-Run", "Block-Track", "Street"],
        quarry: ["Pit", "Quarry", "Excavation-Run", "Grit-Path", "Slopes", "Clay-Gully", "Sand-Track", "Quartz-Base", "Gravel-Road", "Pit-Way"],
        stone_room: ["Tapestry-Vault", "Chamber", "Vault", "Polished-Run", "Slate-Room", "Relic-Track", "Sanctuary", "Hall", "Hearth-Track", "Vault-Way"],
        desert: ["Dunes", "Sands", "Plateau", "Gulch", "Wadi", "Basin", "Bluff", "Mesa", "Ridge", "Expanse"],
        generic: ["Lounge-Way", "Hardwood-Track", "Manor-Run", "Lounge", "Library-Loop", "Estate-Path", "Parlor-Track", "Cozy-Corner", "Vestibule", "Lounge-Run"],
        chicken_farm: ["Yard", "Run", "Pasture", "Coop-Way", "Paddock", "Pluck-Run", "Roost", "Straw-Trail", "Scratch-Field", "Runway"],
        goat_farm: ["Hill", "Paddock", "Structures", "Ramp-Way", "Knoll", "Climb", "Trail", "Ridge", "Meadow", "Runway"],
        sheep_farm: ["Meadow", "Hillside", "Pasture", "Green-Field", "Fold", "Clover-Field", "Glen", "Downs", "Meadow-Trail", "Runway"],
        duck_farm: ["Pond", "Wetland", "Marsh", "Shoreline", "Water-Way", "Estuary", "Basin", "Nesting-Ground", "Puddle", "Runway"],
        goose_farm: ["Field", "Creek-Paddock", "Lawn", "Grass-Meade", "Sentry-Post", "Formation", "Stream-Side", "Meadow", "Flat", "Runway"],
        cattle_farm: ["Prairie", "Paddock", "Ranch-Land", "Silo-Pasture", "Barn-Yard", "Range", "Cattle-Path", "Grassland", "Silo-Field", "Runway"]
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
        "cattle_farm",          // 18
        "simulated_gold_mine",  // 19
        "simulated_silver_mine",// 20
        "simulated_emerald_mine",// 21
        "simulated_diamond_mine",// 22
        "simulated_salt_mine",  // 23
        "gold_mine",            // 24
        "silver_mine",          // 25
        "emerald_mine",         // 26
        "diamond_mine",         // 27
        "salt_mine",            // 28
        "cave",                 // 29
        "plain",                // 30
        "mountains",            // 31
        "stone_corridor",       // 32
        "forest",               // 33
        "city",                 // 34
        "quarry",               // 35
        "stone_room",           // 36
        "desert",               // 37
        "generic",              // 38
        "garden",               // 39
        "zen_stone_garden",     // 40
        "botanical_maze",       // 41
        "butterfly_sanctuary",  // 42
        "orchid_glasshouse",    // 43
        "edible_berry_garden",  // 44
        "cherry_orchard",       // 45
        "the_grand_orchard"     // 46
      ];

      const maxIndex = levelPlaceIds.length - 1;
      const placeId = levelId <= maxIndex ? levelPlaceIds[levelId] : levelPlaceIds[1 + ((levelId - 1) % maxIndex)];

      let baseKey = placeId;
      if (placeId.includes("grove") || placeId.includes("orchard")) {
        baseKey = "edible_berry_garden";
      } else if (!placeId.startsWith("simulated_") && placeId.includes("mine")) {
        baseKey = `simulated_${placeId}`;
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

  // Calculate mathematically aligned properties representing level intensity:
  // Target distance in meters: shortened by 30% as requested by the user
  const targetDistance = Math.floor((1500 + levelId * 300) * 0.7);
  
  // Tick Density: average ticks count per 100 meters (keeps it fun! 8 to 20)
  const tickDensity = Math.min(25, 6 + (levelId % 8));

  // Cycle through all newly designed places and reverb profiles
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
    "cattle_farm",          // 18
    "simulated_gold_mine",  // 19
    "simulated_silver_mine",// 20
    "simulated_emerald_mine",// 21
    "simulated_diamond_mine",// 22
    "simulated_salt_mine",  // 23
    "gold_mine",            // 24
    "silver_mine",          // 25
    "emerald_mine",         // 26
    "diamond_mine",         // 27
    "salt_mine",            // 28
    "cave",                 // 29
    "plain",                // 30
    "mountains",            // 31
    "stone_corridor",       // 32
    "forest",               // 33
    "city",                 // 34
    "quarry",               // 35
    "stone_room",           // 36
    "desert",               // 37
    "generic",              // 38
    "garden",               // 39
    "zen_stone_garden",     // 40
    "botanical_maze",       // 41
    "butterfly_sanctuary",  // 42
    "orchid_glasshouse",    // 43
    "edible_berry_garden",  // 44
    "cherry_orchard",       // 45
    "the_grand_orchard"     // 46
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

