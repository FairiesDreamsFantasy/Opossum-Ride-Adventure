# Crop Fields Arena (`src/Arena/Crop_Field/`)

**Arena Title:** Crop Fields (`crop_field`)  
**World 1 Placement:** Immediately following Cattle Farm (`cattle_farm`, Level 18 -> Levels 19–24)

---

## Architectural Design

- **Seamless Farm Transition:** Connected directly from the Cattle Farm arena on a continuous ground-oriented trail (`pathPattern: "ground"`).
- **Ethical Agriculture:** Functional crop plots tended with autonomous robotic farming machines (solar electric harvesters, precision drip irrigators, and scouting sensor nodes) paired with dignified human stewardship—strictly avoiding any plantation or slavery depiction.
- **Triangular Slate Stone Path:**
  - **Main Trail:** Flat triangular **Slate** stone blocks cycling across 36 distinct colors (White, Pink, Blue, Green, Yellow, Red, Orange, Purple, Indigo, Lavender, Silver, Gold, Bronze, Platinum, Brass, Gray, Black, Red-Orange, Yellow-Orange, Blue-Green, Blue-Violet, Red-Violet, Violet, Yellow-Green, Coral, Amber, Brown, **Caramel**, Toffee, Tan, Peach, Ocean, Light-Green, Light-Blue, Sky Blue, Emerald).
  - **12-Inch Border Dividers:** Both edges separating the trail from the crop fields are lined with 12-inch (`0.3048 m`) triangular stones in **Red**, **Gold**, and **Green**.
  - **Surface Footstep Sound:** Calibrated to **Slate** (`SURFACE_PROFILES.slate`, `1650 Hz`, `Q = 4.8`, `105 Hz` thud).
- **Sky Preservation:** Standard arena sky gradient and stars are left untouched.
- **Obstacles:** Uses exclusively `Triangular Stone Fence` (`src/System/Building_Blocks/Triangular_Stone_Fence/`) spaced strictly `500m–2000m` apart at comfortable opossum-jumpable height (no rocks, garden plants, or wooden garden fences).
- **Opponents & Wildlife:** Monkeys riding moose, unmounted wild moose, feral pigs, and loose unmounted roaming monkeys.
- **Ambience:** Procedural wind-rustling crop stalks tailored to open farmland breezes.

## Sub-Arenas (6 Crop Fields)

1. `Wheat_Field/` (`wheat_field`) — Sun-ripened golden wheat stalks
2. `Corn_Field/` (`corn_field`) — Tall rustling sweet corn rows
3. `Barley_Field/` (`barley_field`) — Warm bearded barley plots
4. `Rice_Field/` (`rice_field`) — Irrigated terraced rice paddies
5. `Oats_Field/` (`oats_field`) — Swaying emerald and pale-gold oat fields
6. `Sorghum_Field/` (`sorghum_field`) — Crimson-headed sorghum grain rows
