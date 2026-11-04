# Arena Narration Architecture & Subarena Registry

**Author & Sovereign:** Fairies Dreams & Fantasy  
**System Module:** `src/System/AI/In-Game/Category/Accessibility/Narration/Arena/`  
**License:** GNU General Public License v3 (GPL v3) & Creative Commons Attribution-ShareAlike 4.0 (CC BY-SA 4.0)

---

## Overview

The **Arena Narration Subsystem** is a high-precision, non-diluted spatial orientation and audio-description engine designed to deliver 100% textbook-grade acoustic and spatial metadata across all game biomes, estate zones, and subarenas. 

Every arena zone is modularized into dedicated subfolder modules under `src/System/AI/In-Game/Category/Accessibility/Narration/Arena/[Arena_Name]/[SubArena_Name]/`, eliminating monolithic dictionary clustering and guaranteeing zero-stubbing compliance ($O(1)$ dispatch speed).

---

## Complete Arena & Subarena Catalog

### 1. Garden Arena (`/Garden/`)
* **Biome ID:** `garden`
* **Substrate Baseline:** Natural terrain, raked gravel, manicured turf, organic loam, and agricultural soil.
* **Registered Modular Subarenas (18 Total):**
  1. **Zen Stone Garden (`/Garden/Zen_Stone_Garden/`)**: Raked fine mineral gravel & river stones, open-air wind dispersal ($RT60 \approx 0.6\text{s}$).
  2. **Botanical Maze (`/Garden/Botanical_Maze/`)**: Manicured turf & dense cedar hedges, hedge-baffled acoustic attenuation ($RT60 \approx 0.5\text{s}$).
  3. **Butterfly Sanctuary (`/Garden/Butterfly_Sanctuary/`)**: Soft mossy soil under vaulted glass arches, glasshouse humidity resonance ($RT60 \approx 1.1\text{s}$).
  4. **Orchid Glasshouse (`/Garden/Orchid_Glasshouse/`)**: Pebble aggregate walkway & tropical foliage, humidity resonance ($RT60 \approx 1.1\text{s}$).
  5. **Edible Berry Garden (`/Garden/Edible_Berry_Garden/`)**: Woodchip mulched paths & organic topsoil, foliage scatter ($RT60 \approx 0.6\text{s}$).
  6. **The Grand Orchard (`/Garden/The_Grand_Orchard/`)**: Grassy orchard loam, open canopy breeze ($RT60 \approx 0.7\text{s}$).
  7. **Cherry Orchard (`/Garden/Cherry_Orchard/`)**: Blossom-carpeted turf, leaf canopy flutter ($RT60 \approx 0.7\text{s}$).
  8. **Almond Grove (`/Garden/Almond_Grove/`)**: Compacted earth & dry grass, open breeze ($RT60 \approx 0.6\text{s}$).
  9. **Apple Grove (`/Garden/Apple_Grove/`)**: Lush turf path & productive apple trees, canopy dispersion ($RT60 \approx 0.7\text{s}$).
  10. **Olive Grove (`/Garden/Olive_Grove/`)**: Terracotta dust & dry limestone soil, Mediterranean breeze ($RT60 \approx 0.5\text{s}$).
  11. **Walnut Grove (`/Garden/Walnut_Grove/`)**: Shady loam & walnut shells, high-canopy resonance ($RT60 \approx 0.8\text{s}$).
  12. **Chicken Farm (`/Garden/Chicken_Farm/`)**: Fenced run with straw & grain, warm agricultural ambient ($RT60 \approx 0.6\text{s}$).
  13. **Goat Farm (`/Garden/Goat_Farm/`)**: Rocky paddock & wooden climbing platforms, pasture breeze ($RT60 \approx 0.6\text{s}$).
  14. **Sheep Farm (`/Garden/Sheep_Farm/`)**: Wide rolling pasture grass, pastoral acoustic expanse ($RT60 \approx 0.5\text{s}$).
  15. **Duck Farm (`/Garden/Duck_Farm/`)**: Reed-lined pond bank & moist turf, water ripple reflection ($RT60 \approx 0.7\text{s}$).
  16. **Goose Farm (`/Garden/Goose_Farm/`)**: Open meadow & gravel staging, rural airflow ($RT60 \approx 0.6\text{s}$).
  17. **Cattle Farm (`/Garden/Cattle_Farm/`)**: Expansive prairie paddock soil, timber barn echo ($RT60 \approx 0.8\text{s}$).
  18. **Horse Farm (`/Garden/Horse_Farm/`)**: Manicured pasture & split-rail track, turf-damped hoofbeat resonance ($RT60 \approx 0.6\text{s}$).

---

### 2. Floor Foyer Arena (`/Foyer/`)
* **Biome ID:** `floor_foyer`
* **Substrate Baseline:** Polished orange and purple ceramic tile flooring, 2,000-ft perimeter boundary, 30-ft ceiling height.
* **Registered Modular Subarenas & Hotspots (6 Total):**
  1. **Grand Foyer Entrance (`/Foyer/Entrance/`)**: Threshold boundary, medium hall acoustics ($RT60 \approx 1.2\text{s}$).
  2. **Central Crystal Chandelier (`/Foyer/Central_Chandelier/`)**: 30-ft ceiling vault illuminate center point ($RT60 \approx 1.4\text{s}$).
  3. **Grand Tapestry Alcove (`/Foyer/Tapestry_Alcove/`)**: Historic tapestry display, textile wall damping ($RT60 \approx 0.9\text{s}$).
  4. **Southwest Perimeter Ramp (`/Foyer/Southwest_Ramp/`)**: Inclined ramp corridor leading to perimeter walkway ($RT60 \approx 1.1\text{s}$).
  5. **Foyer Perimeter Walkway (`/Foyer/Perimeter_Walkway/`)**: Oak balustrade walkway overlooking main hall ($RT60 \approx 1.3\text{s}$).
  6. **Dishwasher Room Threshold (`/Foyer/Dishwasher_Room/`)**: Service entrance, stainless steel & tile utility resonance ($RT60 \approx 0.8\text{s}$).

---

### 3. Grand Cellar Arena (`/Cellar/`)
* **Biome ID:** `cellar`
* **Substrate Baseline:** Hewn limestone flags, granite masonry arches, packed earth.
* **Registered Modular Subarenas (3 Total):**
  1. **Grand Cellar Stone Corridor (`/Cellar/Stone_Corridor/`)**: Damp limestone slab, dense subterranean reflections ($RT60 \approx 1.6\text{s}$).
  2. **Subterranean Stone Vault (`/Cellar/Subterranean_Vault/`)**: Granite flagstones & heavy masonry arches ($RT60 \approx 1.4\text{s}$).
  3. **Oak Aging Chamber (`/Cellar/Aging_Chamber/`)**: Packed earth & oak casks, wood-damped atmosphere ($RT60 \approx 1.1\text{s}$).

---

### 4. Southwest Porch Arena (`/Porch/`)
* **Biome ID:** `porch`
* **Substrate Baseline:** Solid cedar decking, planed redwood decking, timber staging over 4,000-ft perimeter.
* **Registered Modular Subarenas (3 Total):**
  1. **4,000-Foot Perimeter Walkway (`/Porch/Perimeter_Walkway/`)**: Tactile cedar plank decking ($RT60 \approx 0.4\text{s}$).
  2. **Grand Outdoor Veranda (`/Porch/Grand_Veranda/`)**: Planed redwood decking under sheltered overhang ($RT60 \approx 0.5\text{s}$).
  3. **Southwest Overlook Square (`/Porch/Southwest_Square/`)**: Timber staging square with mountain wind dispersion ($RT60 \approx 0.3\text{s}$).

---

### 5. Manorsville Estate Arena (`/Manorsville/`)
* **Biome ID:** `manorsville`
* **Substrate Baseline:** Historic cobblestone paving, teak parquet flooring, manicured estate turf.
* **Registered Modular Subarenas (3 Total):**
  1. **Dalesville Estate Village (`/Manorsville/Dalesville/`)**: Cobblestone street paving & village square lawn ($RT60 \approx 0.5\text{s}$).
  2. **Grand Tea Room (`/Manorsville/Grand_Tea_Room/`)**: Teak parquet flooring & wool runners, 20-ft ornate door frames ($RT60 \approx 1.0\text{s}$).
  3. **Manor Perimeter Grounds (`/Manorsville/Manor_Grounds/`)**: Estate turf & gravel walkways under pine silhouettes ($RT60 \approx 0.5\text{s}$).

---

## Accessibility Engine Hotkey Integration

The Arena Narration system directly feeds the dual accessibility hotkey pipeline:
* **Cedella (Layout A)**:
  * Two-tap (`a-a`): Triggers `ArenaNarrationRegistry.compileScene(ctx)` for immediate environmental audio description.
  * Three-tap (`a-a-a`): Triggers `ArenaNarrationRegistry.compilePosition(...)` for high-precision coordinate announcements and ray-marched forward obstacle detection.
* **Arden Denis (Layout B)**:
  * Two-tap (`u-u`): Triggers `ArenaNarrationRegistry.compileScene(ctx)`.
  * Three-tap (`u-u-u`): Triggers `ArenaNarrationRegistry.compilePosition(...)`.

---

## Security & Anti-Dilution Directives

1. **Local AGENTS.md Shields**: Every arena subfolder contains an `AGENTS.md` file mandating zero-stubbing, anti-simplification, and non-dilution.
2. **Standardized Contracts**: No narration module may output generic placeholder strings (`"TODO"`, `"stub"`).
3. **Pseudoscience Prohibition**: Acoustic reverberation decay rates ($RT60$) and substrate friction specifications are strictly grounded in architectural physics and acoustic engineering.
