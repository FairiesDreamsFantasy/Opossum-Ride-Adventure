# Wilderness Suite (`src/Arena/Wilderness/`)

Natural outdoors, desert, forest, plain, mountain, and natural cave arenas powering **World 4 — The Great Outdoors, Wilderness and Mountains (`Level_1` – `Level_40`)**.

## Biome Families (5 × 8 = 40 Unique Sub-Arenas)
1. **Desert (`Desert/`)**: `desert`, `desert_obsidian_erg`, `desert_salt_pan_basin`, `desert_red_sandstone_mesa`, `desert_oasis_palm_wadi`, `desert_quartz_singing_dunes`, `desert_chalk_badlands`, `desert_canyon_arroyo`
2. **Forest (`Forest/`)**: `forest`, `forest_old_growth_redwood`, `forest_pine_needle_ridge`, `forest_mossy_temperate_rainforest`, `forest_autumn_maple_hollow`, `forest_boreal_spruce_taiga`, `forest_bamboo_mist_grove`, `forest_cypress_bayou_trail`
3. **Plain (`Plain/`)**: `plain`, `plain_tallgrass_prairie`, `plain_sagebrush_steppe`, `plain_golden_savannah`, `plain_wildflower_meadow`, `plain_coastal_moorland`, `plain_windswept_tundra`, `plain_pampas_floodplain`
4. **Mountains (`Mountains/`)**: `mountains`, `mountains_glacial_ice_ridge`, `mountains_basalt_volcanic_crest`, `mountains_alpine_snow_saddle`, `mountains_slate_switchback_pass`, `mountains_limestone_karst_crag`, `mountains_timberline_meadow_spur`, `mountains_cloud_gorge_ledge`
5. **Natural Cave (`Cave/`)**: `wilderness_cave_limestone_grotto`, `wilderness_cave_granite_rift`, `wilderness_cave_glacial_ice_vault`, `wilderness_cave_lava_tube`, `wilderness_cave_marble_cathedral`, `wilderness_cave_slate_fissure`, `wilderness_cave_alluvial_gravel`, `wilderness_cave_echosilt_hollow` *(distinct from `src/Arena/Cave/` reserved for simulated caves)*.

## Gameplay, Physics & Acoustic Rules
- **Obstacles**: **NO** `fence`, **NO** `garden_plant`, **NO** `triangular_stone_fence`, and **NO** blocking `rock`. Instead spawns elevated `"stone_platform"` structures (`width: 6.0 m`, `height: 1.1 m`) that players can jump onto and ride over with matched stone footsteps.
- **Ambience & Acoustics**: Dedicated Web Audio biome synthesizers (`WildernessAmbienceEngine`) and terrain-specific footstep synthesis (`basalt`, `limestone`, `moss`, `peat`, `silt`, `ice`, `sand`, `gravel`, `slate`, `granite`, `marble`).
