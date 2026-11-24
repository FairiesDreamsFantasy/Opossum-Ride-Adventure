# Opossum Ride Adventure - Logic Backup & Master Specification

**Game Title:** Opossum Ride Adventure  
**License:** GNU General Public License v3 (GPL v3) & Creative Commons Attribution-ShareAlike 4.0 (CC-BY-SA-4.0)  
**Authorship & Sovereignty:** Fairies Dreams & Fantasy  
**Version:** 0.1.0.8  
**Branch Targets:** WorkspaceSync / Stable / Staging / System-Characters-Opossums-Protection-Shield / System-Sound-SFX-Opossum-Chatter-Shield / System-AI-InGame-Stabilization-Shield  
**Milestone Release:** v0.1.0.8 - Modular Physical Acoustics Subsystem & Polyglot Computer-Science Stabilization

---

## 1. Architecture Overview
- **Framework:** React 19 + TypeScript + Vite.
- **Styling:** Tailwind CSS with comprehensive design tokens.
- **Physics Engine:** Hamiltonian Quaternion rotation, Runge-Kutta 4 (RK4) integration, Simpson's 1/3 numerical integration.
- **DSP Sound Engine:** Radix-2 Cooley-Tukey FFT, Karplus-Strong physical string synthesis, Schroeder 4-comb 2-allpass reverberators, dedicated compact and standard opossum SFX generators.
- **AI & Rate Limiting:** Dual Token Bucket Rate Limiter, Hard Quota Floor Shield, zero unhandled API exceptions. Native game functions isolated from external API keys.

---

## 2. Character Registry & Passel Hierarchy (19 Sacred Female Opossums + Crafted Jacks)

### Rose Passel
1. **Saffron Rose (Jill)**
   - Shoulder Height: 5 feet 11 inches | Length: 95 inches | Body Fur: Red-Orange | Skin: Wheat Tan
   - Tail: Gold with pink spiral wrap | Ears: Long, Upright, neon saffron polka-dots
2. **Jahmella Rose (Jill)**
   - Shoulder Height: 6 feet | Length: 99.5 inches | Body Fur: Orange with white circles | Skin: Tan
   - Tail: Deep Pink with gold spiral | Ears: Conventional, Upright
3. **Agape Rose (Jill)**
   - Shoulder Height: 5 feet 5 inches | Length: 90.1 inches | Body Fur: Gold with pink circles bordered in purple
   - Tail: Deep Pink with 2% gold fur | Ears: Conventional, Forward Leaning
4. **Kady Rose (Jill)**
   - Shoulder Height: 5 feet 11 inches | Length: 95 inches | Body Fur: Light Gray with bronze ear circles | Skin: Honey Dark-Brown
   - Tail: Red-Orange | Ears: Long, Upright
5. **Daisy Rose (Jill - Crafted)**
   - Shoulder Height: 6 feet, and 1.00123 inches | Length: 97.5 inches (8 feet, 1.5 inches) | Width: 44.0 inches
   - Fur: Pink base coat with 4-inch yellow daisy flowers surrounded by 1.5011cm blue borders spaced 2.5013in apart | Skin: Light Peach with warm undertone (2% tan hue, 0% furry face coverage)
   - Tail: Pink base with light yellow 1.44cm spiral (30% longer tail scale) | Ears: Upright pink with dark pink inner (4% larger scale) | Eyes: Blue | Nose: Dark-pink (no nostrils)
   - Accessories: Gold tiara with light yellow gem & blue border diamond sun; green chain diamond necklace with 14in diamond charm
6. **Callie Rose (Jill - Crafted)**
   - Shoulder Height: 5 feet, 11.444401003 inches | Length: 95.8888 inches (7 feet, 11.8888 inches) | Width: 40.5 inches
   - Fur: Yellowish-gold base coat with 4.5-inch blue circles surrounded by 1.8cm indigo borders spaced 3in apart | Skin: Tan with warm undertone (0% furry face coverage)
   - Tail: Red-gold | Ears: Upright yellowish-gold (30% longer, 5% larger scale) | Eyes: Green | Nose: Red-gold
   - Accessories: White gold brass circular reading glasses; blue tiara with 6in vertical emerald gem; violet diamond necklace with 3.5in orange circular charm
7. **Eugene Rose (Jack - Compact Crafted)**
   - Shoulder Height: 3 feet 10.00932 inches | Length: 6 feet (72 inches) | Width: 28 inches | Head Width: 26.5 inches | Head Height: 28 inches
   - Fur: Light-Gray (`#9CA3AF`) | Skin: Peach (`#FFEDD5`) | Paws: White (`#FFFFFF`) | Paw Pads: Peach (`#FFEDD5`)
   - Outer Ears: Dark-Gray (`#374151`), Upright, Conventional
   - Inner Ears: Pink (`#EC4899`) | Nose: Pink (`#EC4899`) | Tail: Pink (`#EC4899`), Hairless (0% fur)
   - Eyes: Green (`#10B981`) | Furry Face: 100% standard furry face
   - Religion: Rastafari or Shintoism | Babylon-Free: True
   - Resemblance: 89.9% real-world opossum resemblance
   - Vocation: Amusement park opossum ride operator providing safe rides for idren, dwarfs, and small riders
   - Lore: Born into the Rose passel, developed lactose intolerance growth restrictions (2'5" at age 8, maturing at 3'10.1"). Embraces Japanese culture, anime, writing, gaming, and farming.

### Jasmine Passel
1. **Stacey Jasmin (Jill - Crafted)**
   - Shoulder Height: 5 feet, 8.999 inches | Length: 95.9988 inches (7.9999 feet) | Width: 38.5 inches
   - Fur: Purple base coat with yellow saddle (beagle pattern, 35% thicker fur) | Skin: Tan with yellowish undertone (0% furry face coverage)
   - Tail: Dark-pink | Ears: Upright purple with dark-pink inner lining | Eyes: Indigo | Nose: Dark-pink (no nostrils)
   - Accessories: White gold tiara with circular yellow moon gem
2. **Dale Jasmine (Jill - Crafted)**
   - Shoulder Height: 5 feet and 7.123 inches | Body Length (excl head & tail): 7.1234 inches | Width: 38.88 inches
   - Head Width: 37.77 inches | Head Height: 44.88 inches | Fur: Lavender base with green 3.777-inch roses spaced by 3.001 inches
   - Skin: Peach (0% furry face) | Nose: Pink (no nostrils) | Tail: Pink (20% longer for scale) | Paws: White, pink pads
   - Ears: Lavender solid upright (medium-long), pink inner | Eyes: Light-Green | Accessories: Gold diamond necklace with 12.5-inch horizontal diamond charm
   - Chatter Pitch: +0.008% higher than Stacey Jasmin (1278.6822864 Hz -> 442.6154064 Hz)
   - Sistren of Stacey; Triplet of Qi & Jamie; Lunar Leadership; Food Safety Advocate; Rastafari only; Primary White.
3. **Qi Jasmine (Jill - Crafted)**
   - Shoulder Height: 5 feet and 7.123 inches | Body Length: 7.1234 inches | Width: 38.88 inches | Head Width: 37.77 inches | Head Height: 44.88 inches
   - Fur: Blue base with green 4.8-inch diameter circles spaced by 1.88 inches | Skin: Peach (0% furry face) | Nose: Pink (no nostrils) | Tail: Pink
   - Paws: Yellow, pink pads | Ears: Blue upright, pink inner | Eyes: Light-Blue | Accessories: Silver diamond necklace with 11.5-inch circular diamond charm
   - Chatter Pitch: +0.002% higher than Dale Jasmine (1278.7078600 Hz -> 442.6242587 Hz)
   - Sistren of Stacey; Triplet of Dale & Jamie; Lunar Leadership; Anti-Poaching Tech Specialist; Rastafari only; Primary White.
4. **Jamie Jasmine (Jill - Crafted)**
   - Shoulder Height: 5 feet and 7.123 inches | Body Length: 7.1234 inches | Width: 38.88 inches | Head Width: 37.77 inches | Head Height: 44.88 inches
   - Fur: Solid Silver | Skin: Tan (0% furry face) | Nose: Red-Orange (no nostrils) | Tail: Red-Orange (20% longer for scale)
   - Paws: Gold, red-orange pads | Ears: Silver upright (long), red-orange inner | Eyes: Indigo
   - Chatter Pitch: +0.008% higher than Qi Jasmine (1278.8101567 Hz -> 442.6596686 Hz)
   - Sistren of Stacey; Triplet of Dale & Qi; Weather Scientist & Anti-Poaching Decoy; Rastafari only; Primary White.

### Kone-Reynolds Family
1. **Dagmar Kone-Reynolds (Jill)**: 5' 8.5" shoulder height, white with multi-colored diamond pattern.
2. **Arden-Rosie Kone-Reynolds (Jill)**: 5' 1.5" shoulder height, cream with diamond patterns.
3. **Roxanne Kone-Reynolds (Jill)**: 6' shoulder height, yellow with red-orange bordered diamonds.
4. **Ruth Kone-Reynolds (Jill)**: 6' shoulder height, pink with 25-color flower pattern.
5. **Drake Kone-Reynolds (Jack - Compact Crafted)**: 4' shoulder height, 6' body length, red with 7 silver stripes, forward-leaning ears.
6. **Rudy Kone-Reynolds (Jack - Compact Crafted)**: 3' 7.5" shoulder height, 64" body length, yellow with brown circles, side-down ears.

### Qin Family & Chin Family
- **Amara Qin (Jill)**: 5' 3" shoulder height, pure white, blue eyes.
- **Tiana Qin (Jill)**: 5' 10" shoulder height, red, blue eyes.
- **Melvin Qin (Jack - Compact Crafted - 'M' in D-R-E-A-M-S)**: 3.5 ft shoulder height, 68" body length, 34" width, 32" head width, 30" head height excluding ears. Light-tan coat, peach with yellowish hue skin, 50% furry face, red outer ears, brown inner ears (downward, side-oriented), dark-green eyes, brown nose & tail, white paws. Shintoism only, Japanese/American ethnicity. Authentic procedural opossum bark. Amara's brother-in-law.
- **Jalissa Chin (Jill)**: 5' 1" shoulder height, yellow-orange.
- **Olivia Chin (Jill)**: 5' 1" shoulder height, blond, indigo eyes.
- **Safford Chin (Jack - Compact Crafted - 'S' in D-R-E-A-M-S)**: 3' 10.0000088" shoulder height, 72" body length (6 ft), 28.5" width, 27" head width, 28" head height excluding ears. Light-Blue coat, cream skin, 2% furry face, solid brown upright ears, light-brown eyes, black nose, black tail (hairless), black paws & pads. Buddhism only, White ethnicity. Builder vocation, Kansas factory explosion resilience. Authentic procedural opossum-like bark. Jalissa Chin's brother-in-law.

### The D-R-E-A-M-S Jack Opossums Acrostic (Compact Crafted)
1. **D** - Drake Kone-Reynolds
2. **R** - Rudy Kone-Reynolds
3. **E** - Eugene Rose
4. **A** - Arnold Rose
5. **M** - Melvin Qin
6. **S** - Safford Chin
7. **Ivan Opossum**
8. **Isaac Opossum**

### Other Crafted Opossums (Opossum Passel)
- **Melissa (Jill)**: 5' 3" shoulder height, light gray.
- **Ashley (Jill)**: 5' 3" shoulder height, yellow.
- **Wanda (Jill)**: 5' 2.9999" shoulder height, light amber, indigo eyes.
- **Sandra (Jill)**: 5' 3" shoulder height, lavender.
- **Jacinta Opossum (Jill - Crafted)**: 5' 3" shoulder height, 86" length, 36" width, solid red coat, red outer ears, pink inner ears, red-orange nose (no nostrils), peach skin, dark-green eyes, white paws with red-orange pads. Twin sistren of Camryn, in-law of Melissa & Ashley. Gardener, scientist & poacher hunter. Chatter pitch +1.0% above Melissa (1313.0 Hz -> 454.5 Hz).
- **Camryn Opossum (Jill - Crafted)**: 5' 3" shoulder height, 86" length, 36" width, solid light green coat, light-green outer ears, pink inner ears, pink nose (no nostrils), olive-undertone tan skin, blue eyes, gold paws with pink pads. Twin sistren of Jacinta, in-law of Melissa & Ashley. Scientist, gardener & poacher hunter. Chatter pitch +1.5% above Jacinta (1332.695 Hz -> 461.3175 Hz).

---

## 3. Master Design Attribute Lookup Maps
All 19 crafted opossums are fully synchronized across 38 design property lookup maps in `src/System/Registry/Characters/Opossums/Attributes/Design/index.tsx`:
- `Skin_Color`, `With_Patterns`, `Fur_Color`, `Tail_Color`, `Tail_Color_With_Design`, `Nose_Color`, `Shoulder_Height`, `Body_Width`, `Body_Length_excluding_head_and_tail`, `Full_Body_Length`, `Head_Width`, `Head_Height_excluding_ears`, `Full_Head_Height`, `Total_Height_excluding_ears`, `Total_Height`, `Eye_Color`, `Snout_Length`, `Furry_Face`, `Accessories`, `Tail_Length`, `Ear_Orientation`, `Ear_Length`, `Paw_Color`, `Paw_Pad_Color`, `Ear_Color`, `Inner_Ear_Color`, `Ear_Color_With_Patterns`, `Head_Fur_Color`, `_Furry_Face_Color`, `Body_Fur_Thickness`, `Furry_Tail_Percentage`, `Paw_Size`, `Leg_Length`, `Paw_Width`, `Leg_Width`, `Has_Elegant_Chatter`, `Has_Elegant_Trot`, `Tail_Thickness`.

---

## 4. Security & Protection Covenant
- All 4,581+ directories contain an active `AGENTS.md` shield.
- ZERO stubbing, ZERO simplifications, ZERO deletions.
- Full verification recorded in `PROTECTIONS_NOTICES.md`.

---

## 5. Accessibility Narration & Modular Arena Hierarchy
- **Subsystem**: `src/System/AI/In-Game/Category/Accessibility/Narration/`
- **Zero-Omission Standard**:
  - **In-Game Welcome / Mount Narration (`compileRidden`)**:
    "You are riding [name], an esteemed [Gender] opossum mount. [sub] stands at a shoulder height of [shoulder height], with a body width of [width] inches and a body length of [length] inches. Coat: [fur] ([coat pattern]). [possessive] face skin is [skinLabel]. Eyes: [eyes]. Nose: [nose]. Tail: [tail]. Ears: [outerEarDesc], set in a [earLengthTerm] [earOrientTerm] orientation, and lined with a delicate [innerEars] inner-ear lining. [faceText] [feetText] [tailText] [accText] [possessive] head orientation is [pose]. Background: [description]"
  - **Selection Screen 'r' Press (`compileSelection`)**:
    "Profile of [name]. [visual signature and complete aesthetic physical description] [pronoun] features a body length of [length] inches, with a body width of [width] inches and a registered shoulder height of [shoulder height]. Perfect spacing accommodates rider heights of up to [feet] feet and [inches] inches comfortably. Nose: [nose]. Eyes: [eyes]. Background: [description]"
- **23 Individualized Opossum Profile Modules**: Each with dedicated `index.tsx` and `AGENTS.md` in `Mount/Profiles/`.
- **Modular Arenas (`Narration/Arena/`)**:
  - `Foyer/`: Floor Foyer coordinate narration (`position X, Y`), Sabine RT60 reverberance, subarenas (Entrance, Grand Tapestry Alcove, Southwest Ramp, Perimeter Walkway, Dishwasher Room).
  - `Garden/`: Garden Arena, Zen Stone Garden, Botanical Maze, Sanctuaries, Orchards, Groves, Farms.
  - `Cellar/`: Grand Cellar subterranean limestone corridors, oak aging chambers.
  - `Porch/`: Southwest Porch, 4,000-foot perimeter walkway, veranda overlook.
  - `Registry.tsx`: Dynamic routing without hard-coded conditional chains.
- **Welcome Message Subsystem (`Narration/Welcome_Message/` & `Registry/Description/Welcome_Message/`)**:
  - `WelcomeMessageEngine.compileWelcomeMessage`: Dynamic Manor welcome announcement combining game credits, accessible control guidance for Cedella and Arden Denis keyboard layouts, Speech stop directives, and full un-diluted mount narration from `MountNarrationEngine.compileRiddenOpossumProfile(opossum)` (with shoulder height, body width, length, coat pattern, ears, paws, nose, eyes, and lore).
  - Eliminates hardcoded strings from `src/System/UI/Play_Area/index.tsx`.
- **Special Protection Branch**: `System-AI-InGame-Stabilization-Shield` recorded and enforced.
- **Tracking & Synchronization**: Pushed and recorded in `WorkspaceSync` and merged to `Stable` at version `0.1.0.7.8`.

---

## 6. Milestone 0.1.0.7.8 Verification & Release Notes
- **Version Number**: `0.1.0.7.8`
- **Stage**: Stable Production
- **Elimination of Hard-Coding**:
  1. Accessibility narrations for opossums modularized into 23 distinct profile handlers with dual compilation modes (`compileRidden` and `compileSelection`).
  2. Manor arenas and coordinates split into modular domain packages (`Foyer`, `Garden`, `Cellar`, `Porch`).
  3. Manor entrance welcome message decoupled from UI view logic into `Narration/Welcome_Message/` and `Registry/Description/Welcome_Message/`.
  4. Dynamic binding of `VersionRegistry.current` across Landing Page, Footer, and Play Area.
- **Branch Synchronization State**:
  - `WorkspaceSync`: Synchronized (Active workspace sync branch with chatter protection)
  - `Stable`: Synchronized (Production baseline)
  - `Staging`: Synchronized (Special testing branch for upcoming improvements)
  - `System-Characters-Opossums-Protection-Shield`: Active shield branch ensuring crafted characters (19 female opossums, 4 jack opossums) are immune to automated overwriting
  - `System-Sound-SFX-Opossum-Chatter-Shield`: Dedicated chatter protection branch ensuring the 19 sacred female opossums' anti-clicking DSP engine remains preserved
  - `System-AI-InGame-Stabilization-Shield`: Active shield branch for narration and accessibility systems

---

## 7. Compact Steed Fleet UI Logic & Rider Calibration Standard
- **Crafted Compact Roster (D-R-E-A-M-S Acrostic)**:
  1. Drake Kone-Reynolds (`drake_kone_reynolds`): Red, 7 silver stripes, forward-leaning ears, 4'0" shoulder height.
  2. Rudy Kone-Reynolds (`rudy_kone_reynolds`): Yellow with brown circles, side-down ears, 3'7.5" shoulder height.
  3. Eugene Rose (`eugene_rose`): Light-gray, upright ears, 3'10.00932" shoulder height.
  4. Arnold Rose (`arnold_rose`): Matte white with dark-brown ovals, forward-leaning ears, 3'8" shoulder height.
  5. Melvin Qin (`melvin_qin`): Light-tan, side-down dog-like ears, 3.5' (42") shoulder height, Japanese/American Americana researcher, Shintoism.
  6. Safford Chin (`safford_chin`): Light-blue, upright ears, 3'10.0000088" shoulder height, builder, employment and finance, Buddhism.
- **Fleet Balancing Formulation**:
  - Generic Compact Opossums adjusted from 60 to 58 by removing `compact_copper_orange` and `compact_bronze_black`.
  - Total Fleet: $6\text{ Crafted Jacks} + 58\text{ Generic Jills} = 64\text{ Steeds}$ (perfect 8x8 grid compatibility).
- **Rider Height Calibration Algorithm**:
  - **Upper Bound**: 4 feet and 4.44 inches ($52.44\text{ inches}$).
  - **Formula**: $H_{\text{max}} = (4 \times 12) + 4.44 = 52.44\text{ inches}$.
  - **Compatibility**: Sean White ($39\text{ in} \le 52.44\text{ in}$) and George Blake ($52\text{ in} \le 52.44\text{ in}$) comfortably cleared.
  - **Code Standard**: `COMPACT_RIDER_HEIGHT_LIMITS` with `isRiderEligible`, `parseRiderHeightInches`, and `calculateCompactMaxRiderHeight`.
- **Branch Tracking**:
  - Synced to `WorkspaceSync` and `Stable`.

---

## 8. Ivan Opossum & Isaac Opossum Integration Specification
- **Crafted Compact Roster Expansion**:
  - **7. Ivan Opossum (`ivan_opossum`)**: Pink coat base with 48 vertical brown stripes, 3' 2.5" (38.5") shoulder height, red tail/nose, black outer ears, dark-brown inner ears, 100% furry face, Hinduism, White ethnicity, former US military veteran and poacher hunter.
  - **8. Isaac Opossum (`isaac_opossum`)**: Light-Gray coat base with 8 evenly spaced dark-brown stripes of even thickness, 3' 1.5" (37.5") shoulder height, natural opossum skin/tail/ears, dark-brown eyes, 100% furry face, Buddhism, White ethnicity, former US military veteran and poacher hunter.
- **Passel Linkage**:
  - True brothers via Opossum passel (`Passel/Opossum/Ivan` and `Passel/Opossum/Isaac`).
  - In-laws of Melissa, Ashley, Wanda, and Sandra Opossum.
- **Fleet Balancing Formulation**:
  - Generic Compact Jills adjusted from 58 to 56 by removing `compact_olive_black` and `compact_sage_black`.
  - Total Compact Fleet: $8\text{ Crafted Jacks} + 56\text{ Generic Jills} = 64\text{ Steeds}$ (maintaining the symmetric 8x8 grid).
- **Security & Protection Standard**:
  - `AGENTS.md` shields placed in `Characters/Opossums/Ivan_Opossum/`, `Characters/Opossums/Isaac_Opossum/`, `System/Registry/Characters/Opossums/Compact/Crafted/Ivan_Opossum/`, `Isaac_Opossum/`, and `System/Registry/Characters/Opossums/Passel/Opossum/Ivan/`, `Isaac/`.

---

## 9. Compact Mount Narration Subsystem Specification (`Mount/Profiles/Compact/`)
- **Isolated Subdirectory Architecture**: Created `/src/System/AI/In-Game/Category/Accessibility/Narration/Mount/Profiles/Compact/` to house narration profiles for all 8 compact crafted jack opossums separately from large crafted jill opossums.
- **Compact Profile Roster**:
  1. `Drake_Kone_Reynolds` (Drake Kone-Reynolds)
  2. `Rudy_Kone_Reynolds` (Rudy Kone-Reynolds)
  3. `Eugene_Rose` (Eugene Rose)
  4. `Arnold_Rose` (Arnold Rose)
  5. `Melvin_Qin` (Melvin Qin / Melvin Chin)
  6. `Safford_Chin` (Safford Chin)
  7. `Ivan_Opossum` (Ivan Opossum)
  8. `Isaac_Opossum` (Isaac Opossum)
- **Compact Base Narration Helper (`CompactBaseNarration`)**:
  - Encapsulates exact zero-omission string formatting for compact mounts.
  - Incorporates compact rider height limit narration ("Perfect compact spacing accommodates rider heights of up to 4 feet and 4.44 inches comfortably").
  - Formats mandatory biometric parameters (`shoulder height`, `body width`, `body length`, `head width`, `head height excluding ears`) to satisfy `MountNarrationEngine.validateProfileIntegrity`.
- **Narration Registry Fortification (`Registry.tsx`)**:
  - Mapped all 8 compact IDs in `NarrationRegistry.compileRidden` and `NarrationRegistry.compileSelection`.
  - Dynamic fallback cases fortified with explicit `head width` and `head height` text literals to guarantee zero missing biometric warnings across all compact and generic mounts.

---

## 10. "Crafted By Fairies Dreams & Fantasy" 19-Jill Roster Isolation & Protection Shield Specification
- **19-Jill Roster Integrity**: `OPOSSUM_CHARACTERS` in `/src/Characters/Opossums/index.ts` is strictly isolated to contain exclusively the 19 sacred handcrafted female (Jill) opossums:
  1. Melissa Opossum (`melissa`)
  2. Ashley Opossum (`ashley`)
  3. Amara Qin (`amara_qin`)
  4. Saffron Rose (`saffron_rose`)
  5. Jalissa Chin (`jalissa_chin`)
  6. Arden-Rosie Kone-Reynolds (`arden_rosie_kone_reynolds`)
  7. Jahmella Rose (`jahmella_rose`)
  8. Dagmar Kone-Reynolds (`dagmar_kone_reynolds`)
  9. Agape Rose (`agape_rose`)
  10. Roxanne Kone-Reynolds (`roxanne_kone_reynolds`)
  11. Tiana Qin (`tiana_qin`)
  12. Wanda Opossum (`wanda`)
  13. Olivia Chin (`olivia_chin`)
  14. Ruth Kone-Reynolds (`ruth_kone_reynolds`)
  15. Kady Rose (`kady_rose`)
  16. Sandra Opossum (`sandra`)
  17. Daisy Rose (`daisy_rose`)
  18. Callie Rose (`callie_rose`)
  19. Stacey Jasmin (`stacey_jasmin`)
- **Category Categorization Safeguard**:
  - Ivan Opossum (`ivan_opossum`) and Isaac Opossum (`isaac_opossum`) are removed from `OPOSSUM_CHARACTERS` and restricted to `CRAFTED_COMPACT_DEFINITIONS` in `/src/System/Registry/Characters/Opossums/Compact/index.tsx`.
  - Guarantees zero gender/category overlap or layout confusion on the "Crafted By Fairies Dreams & Fantasy" tab.
- **Crafted Registry General & Index Fortification**:
  - `/src/System/Registry/Characters/Opossums/Crafted/General/index.tsx` includes all 19 sacred Jills in `CraftedOpossumsRegistry.characters`.
  - `/src/System/Registry/Characters/Opossums/Crafted/Index/index.tsx` exposes `validateIntegrity()` to verify 19-Jill count and zero-stub compliance.
- **Protection Lock Branch**:
  - `Crafted-By-Fairies-Dreams-And-Fantasy-Lock-Shield` branch created and synchronized to lock the 19-Jill roster and prevent dilution.

---

## 11. Upgraded Elegant Chatter Sound Architecture & Button Action Specification
- **Clean Click-Free Chatter Synthesis (`playChatterSound`)**:
  - Located in `/src/System/Sound/SFX/Category/Opossum/Elegant/Play_Chatter/index.tsx`.
  - Generates smooth exponential sweep ($1200\text{ Hz} \to 400\text{ Hz}$) over a sawtooth waveform when `isRetro = false`.
  - Eliminates clicking transients, providing an upgraded elegant chatter sound.
- **Button Audio Mapping & Preservation Standard**:
  - **"Start Game" Buttons**: Standardized across Landing Page, Interstitial Ads, and Learn Game Sounds to invoke `playProceduralSound("chatter")` (triggering clean click-free elegant chatter).
  - **"Skip Ad" Button**: Triggers `playProceduralSound("chatter")` for a clean, click-free audio transition into gameplay.
  - **Rider Selection "Next" Button**: Preserved as is.
  - **Opossum Selection Screen Buttons ("Go Back", "Next", "Ride Now")**: Preserved as is without arbitrary modification.
- **Offline Compact Synthesizer Isolation**:
  - Compact steeds route vocalizations through dedicated procedural snuffles (`playCompactOpossumSnuffle`) and chuffs (`playCompactOpossumChuff`), completely isolated from crafted Jill chatter sweeps.

---

## 12. "When Babylon Falls" BGM Restoration & Menu Integration
- **Synthesizer Engine (`src/System/Sound/BGM/Category/African/When_Babylon_Falls/index.tsx`)**:
  - 110 BPM tempo scheduler with African Pentatonic scale transposition (`AfricanPentatonic`).
  - Dual Dundun bass on beats 1 and 3; Djembe slap on beats 2 and 4; upbeat Djembe tone on beat 3.
  - Deep sub-bass resonance (`playDeepBass`) and marimba melodies (`playMarimba`).
- **Toolbox Menu Integration (`src/System/Components/Menu_Bar/Crafted/index.tsx`)**:
  - Registered `{ label: "When Babylon Falls", id: "when_babylon_falls" }` in the active track selection list.
- **Sound Engine Mapping (`src/System/Sound/index.tsx`)**:
  - Dispatches `playWhenBabylonFalls(ctx, dest)` on both `"babylon"` and `"when_babylon_falls"` track identifiers.

---

## 13. Roster Expansion: 24 Large Crafted Jills (32 Total Opossums) & 8 Riders Master Specification
- **Sacred Jill Fleet Expansion (24 Large Crafted Jills)**:
  1. Melissa (`melissa`)
  2. Ashley (`ashley`)
  3. Amara Qin (`amara_qin`)
  4. Saffron Rose (`saffron_rose`)
  5. Jalissa Chin (`jalissa_chin`)
  6. Arden-Rosie Kone-Reynolds (`arden_rosie`)
  7. Jahmella Rose (`jahmella_rose`)
  8. Dagmar Kone-Reynolds (`dagmar_kone_reynolds`)
  9. Agape Rose (`agape_rose`)
  10. Roxanne Kone-Reynolds (`roxanne_kone_reynolds`)
  11. Tiana Qin (`tiana_qin`)
  12. Wanda Opossum (`wanda`)
  13. Olivia Chin (`olivia_chin`)
  14. Ruth Kone-Reynolds (`ruth_kone_reynolds`)
  15. Kady Rose (`kady_rose`)
  16. Sandra Opossum (`sandra`)
  17. Daisy Rose (`daisy_rose`)
  18. Callie Rose (`callie_rose`)
  19. Stacey Jasmin (`stacey_jasmin`)
  20. Dale Jasmine (`dale_jasmine`) - Lavender with green roses, $5\text{ ft } 7.123\text{ in}$ shoulder, $7.1234\text{ in}$ length, gold diamond necklace, food safety advocate, smooth nose (no nostrils).
  21. Qi Jasmine (`qi_jasmine`) - Blue with green circles, $5\text{ ft } 7.123\text{ in}$ shoulder, $7.1234\text{ in}$ length, silver diamond necklace, anti-poaching tech, smooth nose (no nostrils).
  22. Jamie Jasmine (`jamie_jasmine`) - Solid silver, $5\text{ ft } 7.123\text{ in}$ shoulder, $7.1234\text{ in}$ length, weather scientist decoy, smooth nose (no nostrils).
  23. Jacinta Opossum (`jacinta_opossum`) - Solid red, $5\text{ ft } 3\text{ in}$ shoulder, $86\text{ in}$ length, twin of Camryn, gardener/scientist/poacher hunter, smooth nose (no nostrils).
  24. Camryn Opossum (`camryn_opossum`) - Light green, $5\text{ ft } 3\text{ in}$ shoulder, $86\text{ in}$ length, olive-undertone tan skin, gold paws, twin of Jacinta, smooth nose (no nostrils).
- **8 Packed Riders Master Roster**:
  1. Fairy-Rider (`fairy-rider`)
  2. Mary (`mary`)
  3. Edward (`edward`)
  4. George Blake (`george`)
  5. Angela Blake (`angela`)
  6. Sean White (`sean`)
  7. Shannon White (`shannon`)
  8. Femmy (`femmy`) - $3\text{ ft } 11\text{ in}$ height, Black ethnicity, dark-brown skin, red hair, green eyes, modest Rastafari beige onesie with black horizontal stripes and rainbow circles, flat yellow shoes. Circus actress, awareness advocate, poacher hunter hardware technician.
- **Master Equilibrium**: 24 Jills + 8 Compact Jacks = 32 Total Opossums; 8 Packed Riders.

---

## 14. Crop Fields (`Arena/Crop_Field/`), Vegetable Fields (`Arena/Vegetable_Field/`), & Aligned World 1 ("Gardens, Orchards, and Farms" `Level_0`–`Level_40`)
- **World 1 Boundaries**: Strictly bounded to **`Level_0` through `Level_40`** (41 modules). Mines reside in `World/3/`; Wilderness & Mountains reside in `World/4/`.
- **Horse Farm Alignment**: `horse_farm` slotted at `Level_18` directly before `cattle_farm` (`Level_19`).
- **Crop Fields (`Levels 20–31`, 12 Sub-Arenas)**: `wheat_field` (`20`), `corn_field` (`21`), `barley_field` (`22`), `rice_field` (`23`), `oats_field` (`24`), `sorghum_field` (`25`), `rye_field` (`26`), `millet_field` (`27`), `buckwheat_field` (`28`), `quinoa_field` (`29`), `amaranth_field` (`30`), `spelt_field` (`31`).
- **Vegetable Fields (`Levels 32–40`, 9 Sub-Arenas)**: `carrot_field` (`32`), `potato_field` (`33`), `tomato_field` (`34`), `cabbage_field` (`35`), `onion_field` (`36`), `broccoli_field` (`37`), `squash_field` (`38`), `spinach_field` (`39`), `bell_pepper_field` (`40`).
- **Triangular Slate Stone Path (`System/Building_Blocks/Triangular_Stone_Path/`)**:
  - Ground-oriented path (`pathPattern: "ground"`), sky rendering completely unaltered.
  - Paved with flat triangular **Slate** stone blocks cycling through **36 distinct colors**: White, Pink, Blue, Green, Yellow, Red, Orange, Purple, Indigo, Lavender, Silver, Gold, Bronze, Platinum, Brass, Gray, Black, Red-Orange, Yellow-Orange, Blue-Green, Blue-Violet, Red-Violet, Violet, Yellow-Green, Coral, Amber, Brown, **Caramel** (corrected from `"Carmel"`), Toffee, Tan, Peach, Ocean, Light-Green, Light-Blue, Sky Blue, Emerald.
  - Bordered along both left and right edges by **12-inch (`0.3048 m`) triangular divider stones** alternating Red, Gold, and Green.
  - Footstep Acoustics: Verified **Slate** frequency profile (`1650 Hz`, `Q = 4.8`, `gain = 1.18`, `thudFreq = 105`), prioritized ahead of generic `stone`.
- **Triangular Stone Fence Obstacle (`System/Building_Blocks/Triangular_Stone_Fence/`)**:
  - Stacked triangular slate stone fence (`1.4 m` height, `> 0.8 m` opossum jump clearance).
  - Deterministically spaced **`500 m` minimum to `2,000 m` maximum** apart across Crop & Vegetable Fields.
  - Exclusively replaces rocks, garden plants, and wooden garden fences in Crop & Vegetable Fields, with dedicated collision audio (`playTriangularStoneFenceCollision`).
- **Ethical Agriculture & Wildlife**:
  - Autonomous solar farm robotics (harvesters, sensor rovers, irrigation booms) paired with dignified human stewardship; zero slavery or plantation depictions.
  - Wildlife & Opponents: Monkeys riding moose, unmounted wild moose, feral pigs, and loose unmounted roaming monkeys (`radar` + `physics` + `Graphical_Renderer`).
- **Audio & Accessibility**:
  - Wind-rustling crop ambience (`System/Sound/BGM/Category/Ambience/Crop_Field/`).
  - Zero-fallback Accessibility Narrations (`System/AI/In-Game/Category/Accessibility/Narration/Arena/Crop_Field/` + `Vegetable_Field/` + `Registry.tsx`).

---

## 15. Wilderness Suite (`Arena/Wilderness/`) & World 4 ("The Great Outdoors, Wilderness and Mountains" `Level_1`–`Level_40`)
- **Consolidated Wilderness Folder (`src/Arena/Wilderness/`)**: Contains 5 biome families with 8 sub-arenas each (40 total):
  - `Desert/` (8), `Forest/` (8), `Plain/` (8), `Mountains/` (8), and natural `Cave/` (8 — distinct from simulated caves in `src/Arena/Cave/`).
- **World 4 Rules (`src/World/4/`)**:
  - Strictly **`Level_1` through `Level_40`** (**NO `Level_0`**, **NO `Level_N`/`Level_*`**).
  - Arranged in 8 assorted 5-biome rounds (`[Desert, Forest, Plain, Mountains, Cave] × 8`).
- **Wilderness Physics & Obstacles**:
  - Zero fences, zero garden plants, zero triangular stone fences, and zero blocking rocks.
  - Spawns elevated `"stone_platform"` structures (`width: 6.0 m`, `height: 1.1 m`) to jump onto and ride over with matched stone footsteps.
- **Wilderness Acoustics**:
  - Scientific biome ambience (`System/Sound/BGM/Category/Ambience/Wilderness/`) and terrain-specific footstep profiles (`basalt`, `limestone`, `moss`, `peat`, `silt`, `ice`, `sand`, `gravel`, `slate`, `granite`, `marble`).
- **World 2 & World 3 Alignment**:
  - World 2 decluttered to `Level_0`–`Level_7` (Temple Courtyard + 7 unique Temple arenas).
  - World 3 Index & Levels metadata aligned with Simulated & Natural Mines (`Level_0`–`Level_30`).

---

## 16. Ivan Opossum & Isaac Opossum Fallback-Elimination Wiring Specification
- **Compact Crafted Registry (`src/System/Registry/Characters/Opossums/Compact/Crafted/index.tsx`)**:
  - Registered `ivan_opossum: IvanOpossum` and `isaac_opossum: IsaacOpossum` in `COMPACT_CRAFTED_OPOSSUMS_REGISTRY` and `COMPACT_CRAFTED_OPOSSUMS_LIST`, eliminating generic `3 feet` dimension, `"Perched Forward"` posture, generic bio, and `"snuffle"` SFX fallbacks during `convertCompactToCharacter()`.
  - `OPOSSUM_CHARACTERS` in `src/Characters/Opossums/index.ts` remains strictly isolated to the 24 Sacred Crafted Jills.
- **Design Attribute Maps (`src/System/Registry/Characters/Opossums/Attributes/Design/index.tsx`)**:
  - Synchronized `ivan_opossum` and `isaac_opossum` across all 39 attribute lookup maps (`Skin_Color`, `With_Patterns`, `Fur_Color`, `Tail_Color`, `Tail_Color_With_Design`, `Nose_Color`, `Shoulder_Height`, `Body_Width`, `Body_Length_excluding_head_and_tail`, `Full_Body_Length`, `Head_Width`, `Head_Height_excluding_ears`, `Full_Head_Height`, `Total_Height_excluding_ears`, `Total_Height`, `Eye_Color`, `Snout_Length`, `Furry_Face` (`100.0`), `Accessories`, `Tail_Length`, `Ear_Orientation`, `Ear_Length`, `Paw_Color`, `Paw_Pad_Color`, `Ear_Color`, `Inner_Ear_Color`, `Ear_Color_With_Patterns`, `Head_Fur_Color`, `_Furry_Face_Color`, `Body_Fur_Thickness`, `Furry_Tail_Percentage`, `Paw_Size`, `Leg_Length`, `Paw_Width`, `Leg_Width`, `Has_Elegant_Chatter` (`false`), `Has_Elegant_Trot` (`false`), `Tail_Thickness`, `Visual_Mapping`).
- **Accessibility & Hotkey Narration**:
  - `Base_Narration.tsx` maps `"Standard for real opossums"` / `"Same as real opossums"` to `"standard real-opossum"` rather than `"upright"`.
  - `Opossum_Selection_Screen/index.tsx` routes pressing `'r'` on the `COMPACT` tab to `convertCompactToCharacter(selectedCompact)` instead of falling back to `currentOpossum`.
- **2D / 3D / Polygon / POV Renderers (`Ivan_Opossum/Animations/`, `Isaac_Opossum/Animations/`, `Graphical_Renderer/index.tsx`)**:
  - Dedicated `drawIvan2D`/`drawIvan3D`/`drawIvanPolygons` (pink coat + 48 vertical brown stripes, 100% furry peach-pink face, black outer ears, dark-brown inner ears, brown eyes, red nose, red tail) and `drawIsaac2D`/`drawIsaac3D`/`drawIsaacPolygons` (light-gray coat + 8 evenly spaced dark-brown stripes, 100% furry face, dark outer ears, natural pink inner ears, dark-brown eyes, pinkish-red nose, natural pink tail), wired across 2D Foyer Blueprint, 2D Course World View, 3D/wireframe rider renderers, and POV view.
- **Compact Selection UI & AI Preview Modules**:
  - Added `AI/In-Game/Category/UI/Opossum_Selection_Screen/Compact/Crafted/{Ivan_Opossum,Isaac_Opossum}/` with `AGENTS.md` shields and registered them in `COMPACT_CRAFTED_AI_PREVIEWS`.
  - Updated `Opossum_Selection_Screen/Main/Compact/index.tsx` and `Opossum_Selection_Screen/Main/index.tsx` to play crafted barks on selection, render authentic stripe counts on cards & canvas previews, and display exact crafted biographies, dimensions, and synthesizer labels.

---

## 17. Feral Pig AI Lane-Switching & Compact Jack Jump-Impact Stun Specification
- **Path-Based Feral Pig AI (`FeralPigAIController.updateCoursePigAI`)**:
  - Wired into `updateStandardPhysics` (`src/System/Engine/Science/Physics/index.tsx`) with level-scaled unpredictability (`computeLevelDifficulty(levelId)` spanning `0.08` at Level 1 up to `1.0` at Level 40+).
  - Pigs unpredictably switch across **ANY lane (`-1`, `0`, `1`)** with smooth `xOffset` interpolation, Boar charging (`chargeSpeedMultiplier: 1.45`), and Sow evasive agility (`1.25×`).
  - Emits typical pig grunts (`playPigLaneSwitchGrunt`: `GenericBoarSynthesizer.playBoarGrunt` / `GenericSowSynthesizer.playSowGrunt`) on lane transitions within `120 m`.
- **Non-Stomp Jump-Impact Model & Compact Jack Calibration (`GeneralEngineUtils`)**:
  - Preserves existing jump-impact checks (`playerY > 0.8`) for feral pigs and unmounted moose (no stomp mechanics).
  - `calculateMountedJumpProfile` scales jump arc by `Shoulder_Height` and `Leg_Length` (`Short` `0.84×`, `Medium` `0.93×`, `Standard` `1.0×`, `Long` `1.04×`) and computes mounted momentum from allometric opossum + rider mass and forward velocity.
  - `evaluateCompactPigImpact` compares mounted impulse against pig inertial mass (`Boar 99.79 kg` / `Sow 79.38 kg`): lighter compact Jack impacts stun active feral pigs (`state = "stunned"`, `stunnedUntil = now + 3200 ms`, `+25` points), while a follow-up jump impact on a stunned pig (or full-momentum / large Jill impact) smashes cleanly (`+100` points).
- **Stun Audio & Zero Stunned TTS**:
  - `FeralPigVocalSound.playStunned` synthesizes a realistic winded exhale burst + dazed downward formant groan (`playPigStunnedVocal`).
  - Zero TTS description emitted on feral pig stun.

---

## 18. World 1 Level 40 -> World 2 Level 0 Progression, Temple Courtyard, & 40-ft Ceiling Temple Foyer Specification
- **World Progression Bridge (`src/Levels/index.ts`, `src/System/Utilities/persistence.ts`, `src/System/Engine/Science/Physics/index.tsx`)**:
  - Completing **World 1 Level 40** (`bell_pepper_field`) unlocks World 2 Level 0 (`temple_courtyard`) and transitions seamlessly into World 2 (`startLevel(0, 2)`).
  - Entering the East wall archway of the **Temple Foyer** (`X = 7000, Y ∈ [1490, 1510], 20 ft × 20 ft`) completes World 2 `Level_0` and launches **World 2 Level 1** (`temple_grand_fairy`).
  - `worldId` and `isExploration` flags allow World 2 areas to remain optionally exploratory rather than strictly path-bound. World 1 `Floor Foyer` (`floor_foyer`) and World 2 `Temple Courtyard` (`temple_courtyard`) remain strictly separated by `placeId`.
- **Central Temple Courtyard (`4000 ft × 3000 ft`, `X ∈ [0, 4000]`, `Y ∈ [0, 3000]`)**:
  - Outdoor stone-paved plaza (`stone` footstep profile), **`25 ft`** large stone-block perimeter walls.
  - Excludes feral pigs, monkeys riding moose, unmounted moose, and edible treats.
  - Spawn: `(X = 0, Y = 1500)` facing East.
  - West wall (`X = 0`): Closed & locked door (`Y ∈ [1490, 1510]`) overlooking a long road and distant World 1 crop field horizon.
  - East wall (`X = 4000`): Temple wall with large N64/007-inspired open windows and `20 ft × 20 ft` double pocket sliding stone doors centered at `Y ∈ [1490, 1510]`.
- **North Flower Garden (`4000 ft × 2000 ft`, `X ∈ [0, 4000]`, `Y ∈ [3000, 5000]`)**:
  - `grass` surface footsteps, `10 ft` North/South walls, North gate at `Y = 3000, X ∈ [2990, 3010]`, `36` large flowers, West crop-field overlook opening, East Temple window opening, North green horizon + game sky.
- **South Outdoor Tea Area (`4000 ft × 2000 ft`, `X ∈ [0, 4000]`, `Y ∈ [-2000, 0]`)**:
  - `tile` surface footsteps, South gate at `Y = 0, X ∈ [2990, 3010]`, `20 ft` high canopy with 3 skylights, 8 spaced outdoor tea tables with tea and pastries, West crop-field overlook opening, East Temple wall, South green horizon + game sky.
- **Temple Entrance Foyer (`3000 ft × 3000 ft`, `X ∈ [4000, 7000]`, `Y ∈ [0, 3000]`)**:
  - Enclosed buffer room before World 2 Level 1 with a **`40 ft` high ceiling** and `tile` footsteps over a **`24" × 24"` (`2 ft × 2 ft`) Black & Green checkerboard** tile floor.
  - Carved interior walls keeping `1490–1510 ft` markers clear: East/West/South display light-blue sky, white clouds, and gold pyramids; North displays light-blue sky and a green horizon. East exit archway (`X = 7000, Y ∈ [1490, 1510]`) starts World 2 Level 1.
- **Crafted Stone Door (`Flowers_Stars_Diamonds_and_Rainbow_Stone_Door_With_Carvings`)**:
  - Located under `System/Building_Blocks/Doors/Sliding_Doors/Crafted/`, SFX under `System/Sound/SFX/Door/Sliding_Door/Crafted/`, and AI under `System/AI/In-Game/Category/Building_Blocks/Doors/`.
  - Double pocket doors carved with flowers, painted rainbows, diamonds, and 5-point stars disappearing into the Temple wall with audible stone friction sweeps on open/close, **zero post-close click**, and `screenReaderAnnouncement: false` by default.

---

## 19. Caprine Cameo Roster (16 Core Goats + Juvenile Kids) & `Goat_Farm` Herd Specification
- **Origin & Attribution**: Friendly non-blocking NPC cameos adapted from *Goat Ride Adventure* (`FairiesDreamsFantasy/Goat_Ride_Adventure`, `main` branch, Fairies Dreams & Fantasy Arcade), integrated exclusively into **`goat_farm` (`World 1, Level 14`)**.
- **16 Core Goat Cameos (`src/Characters/Goats/<GoatName>/`)**:
  1. **Snowy** (`female`, White, Cream horns, Amber eyes, `8.5 ft × 5.5 ft`, `small`, `230 Hz` sawtooth)
  2. **Thunder** (`male`, Grey, Black curved horns, Brown eyes, `9.2 ft × 6.5 ft`, `large`, `125 Hz` sawtooth+triangle)
  3. **Shadow** (`female`, Charcoal, Hornless `None`, Black eyes, `8.2 ft × 5.2 ft`, `small`, `180 Hz` triangle+sawtooth)
  4. **Bella** (`female`, Cream, Gold-tinted horns, Blue eyes, `8.8 ft × 5.8 ft`, `large`, `330 Hz` sine+triangle)
  5. **Goliath** (`male`, Brown, Ivory horns, Green eyes, `12 ft × 8.5 ft`, `largest`, `85 Hz` sawtooth+sub-sine)
  6. **Freckles** (`female`, Spotted, Tan horns, Hazel eyes, `8.2 ft × 5.4 ft`, `small`, `295 Hz` square sweep)
  7. **Obsidian** (`male`, Jet Black, Obsidian horns, Dark Red eyes, `9.2 ft × 6.1 ft`, `large`, `110 Hz` sawtooth+square)
  8. **Ginger** (`female`, Orange, White horns, Amber eyes, `8.4 ft × 5.5 ft`, `small`, `250 Hz` sawtooth)
  9. **Quicksilver** (`male`, Silver, Silver horns, Blue eyes, `8.9 ft × 5.9 ft`, `large`, `350 Hz` sine sweep)
  10. **Patches** (`female`, Tri-color, Cream horns, Brown eyes, `8.3 ft × 5.4 ft`, `small`, `195 Hz` sawtooth)
  11. **Dusty** (`male`, Tan, Grey horns, Hazel eyes, `9.1 ft × 6.0 ft`, `large`, `175 Hz` bandpass sawtooth)
  12. **Luna** (`female`, Deep Purple, Pearly horns, Violet eyes, `8.6 ft × 5.6 ft`, `small`, `270 Hz` sine+triangle)
  13. **Aurum** (`male`, Golden, Gold horns, Golden eyes, `9.3 ft × 6.2 ft`, `large`, `200 Hz` triangle+sawtooth)
  14. **Alpine** (`female`, White/Grey, Curved Black horns, Ice Blue eyes, `8.8 ft × 5.7 ft`, `large`, `240 Hz` sawtooth)
  15. **Willow** (`female`, Dappled Brown, Budding horns, Green eyes, `8.1 ft × 5.3 ft`, `small`, `310 Hz` triangle)
  16. **Ruby** (`female`, Reddish-Brown, Dark Brown horns, Amber eyes, `8.8 ft × 5.8 ft`, `large`, `150 Hz` dual sawtooth)
- **6 Juvenile Goat Kids (`src/Characters/Goats/Kids/`)**: **Pip**, **Clover**, **Pebble**, **Bramble**, **Sprout**, and **Sunny** (`4.1 ft × 2.8 ft`, `size: "kid"`, `405–470 Hz` soft kid bleats), paired with companion adults in hillside herds.
- **Off-Path Pasture Placement & Soft Audio**:
  - Herd boundaries strictly clamped to Left/Right pastures (`|xOffset| ∈ [8.2 m, 17.4 m]`, outside the 3-lane track) with wooden climbing ramps/knolls (`onRamp`, `heightOffset`), smooth grazing head-dip animation (`headDip`, `grazePhase`), and gently attenuated FM vocal/hoof SFX (`System/Sound/SFX/Category/Goat/`).

---

## 20. Dynamic Opponent Radar (`o` / `Shift+O`) & Kinematic Moving Feral Pigs
- **Opponent Scan (`InGameRadarScanner` in `System/AI/In-Game/Category/Accessibility/Radar/`)**:
  - Active on both **Cedella** and **Arden Denis** layouts via `"o"` (`scan_opponents`) and `Shift+O` (`cycle_opponents`).
  - Spatially indexes and sorts Moose/Monkey opponents, Feral Pigs, and loose Monkeys by 3D Euclidean distance ($O(N \log N)$), classifying `close` ($\le 50\text{ m}$), `mid` ($50\text{--}180\text{ m}$), and `far` ($> 180\text{ m}$) horizons with closing-speed ETA projection (`projectTrajectory`). Peacefully off-path cameo NPC goats stay strictly excluded.
  - **Controls (`o` / `Shift+O`)**: Single `o` announces nearest threat + dynamic mid/far horizon summary ending with `"Press Shift-O to toggle."` when multiple targets exist; pressing `Shift+O` toggles cleanly through `2nd -> 3rd -> ... -> farthest -> 1st` targets without a timed window using `scannedOpponentId`.
- **Moving Feral Pigs (`FeralPigAIController` / `FeralPigNavigator` / `FeralPigBehaviorEngine`)**:
  - Pure SI kinematics ($\text{m}, \text{m/s}, \text{s}$) moving pigs continuously along $Z$ patrol corridors and laterally across all lanes/verges (`[-5.6 m, +5.6 m]` on track arenas; expanded outside-path wilderness envelope `[-11.8 m, +11.8 m]` on Wilderness arenas).
  - Real gait-classified stride footsteps (`walk`, `trot`, `gallop`, `charge`) calibrated to arena surfaces (`soil`, `grass`, `dirt`, `stone`, `wood`) with stereo panning + `forage_snuffle` and `alert_chuff` vocals, animated trotter legs from `gaitPhase`, and interactive sound cards in `Learn_Game_Sounds/Feral_Pigs/`.

---

## 21. Modular Physical Acoustics Architecture & Polyglot Stabilization (`v0.1.0.8`)
- **Six Modular Flat Files inside `src/System/Engine/Science/Acoustics/` (guarded by `Acoustics/AGENTS.md`)**:
  - `AcousticStabilizer.ts`: Lock-free pre-allocated `AcousticRingBuffer` (`Float64Array`, RMS energy), IEEE 754 denormal flushing, Nyquist clamping, soft-knee hyperbolic tangent limiter, polyphonic 1 / sqrt(voices) energy normalizer, exponential parameter slew smoother, and biquad pole unit-circle check.
  - `WavePropagationPhysics.ts`: Humid speed of sound, Mach-clamped Doppler shift & pitch ratio, ISO 9613-1 atmospheric absorption, inverse-square + absorption attenuation, and multi-band atmospheric attenuation solver.
  - `RoomReverbAcoustics.ts`: Eyring-Norris RT60 reverberation time, Helmholtz cavity resonance, rectangular chamber eigenmodes, 4x4 unitary Householder FDN diffusion matrix step, and arena acoustic spec resolution (`ARENA_ACOUSTIC_SPECS`).
  - `SpatialBinauralSolver.ts`: Equal-power stereo panning, Woodworth-Schlosser spherical-head ITD, and slew-smoothed 3D spatial vector calculations.
  - `SurfaceImpactResonance.ts`: 26-surface material resonance registry and mass-velocity kinetic impact amplitude/pitch scaling.
  - `BioAcousticFormants.ts`: Vocal tract tube formant resonance equations, allometric body-mass pitch scaling, and pole-verified RBJ digital bandpass filter design.
- **Polyglot Computer-Science Stabilization Extensions & Runtime Wiring**:
  - **C (`NativeCEngine`)**: `sanitizeFloat64Bounds` and Fletcher-16 `computeTelemetryChecksum16`.
  - **C++ (`EngineKinematicsKernelCPP`)**: `stabilizeDampedVerlet` energy-damped particle integration.
  - **C# (`SystemRegistryContractCSharp`)**: `validateFrameAndAcousticInvariants` immutable runtime invariant guard (`Opossum-System-Registry-v0.1.0.8`).
  - **WebAssembly (`WebAssemblyCoreEngine`)**: `stabilizeFloat64` and `computeDspSafetyGain`.
  - **Python (`ScientificPythonEngine`)**: `stabilizeDeltaSeries` trimmed-mean frame jitter outlier filter.
  - **Active Wiring**: Integrated across `Sound/Engine/index.tsx`, `Sound/index.tsx`, `Sound/SFX/index.ts`, `Feral_Pig/Spatial/General/index.tsx`, `Engine/Optimization/index.ts`, `UI/Play_Area/index.tsx`, and `Security/Sentinel/Integrity_Web.ts`.
  - **Version Synchronization**: Updated to `0.1.0.8` across `System/Registry/Version/index.tsx`, `System/Registry/C_Sharp/index.ts`, `VERSION.txt`, `public/VERSION.txt`, and `package.json`.

---

## 22. Modular Computer-Science & Math Expansion (`Mathematics`, `Sound/Engine`, `Visuals/*`, `AI/In-Game/Category/Visuals/Animations`)
- **`System/Engine/Mathematics/`**: Added `NumericalStabilizer.ts`, `QuaternionKinematics.ts`, `MatrixTransformSolver.ts`, `NumericalIntegrators.ts`, `InterpolationSplines.ts`, `StatisticalRobustness.ts`; wired into `MathematicsEngine`.
- **`System/Sound/Engine/`**: Added `AudioGraphStabilizer.ts`, `EnvelopeDynamicsProcessor.ts`, `BiquadFilterDesigner.ts`, `HarmonicOscillatorBank.ts`, `SpectralMeteringAnalyzer.ts`, `PolyphonicVoiceScheduler.ts`; wired into `SoundEngine`, `HighPrecisionSoundEngine.generateVocalSweep`, and `DedicatedSFXSynthesizer.enforceVoiceLimit` / `playTickChime`.
- **`System/Visuals/Animations/` & `System/Visuals/Pixelations/`**:
  - `2-D/`: `TwoDTransformKernel.ts`, `TwoDSpriteSequencer.ts`, `TwoDEasingCurves.ts` wired into `TwoDAnimationSystem`.
  - `3-D/`: `SpatialStabilizer3D.ts`, `QuaternionKinematics3D.ts`, `PerspectiveFrustumProjection.ts`, `SkeletalGaitKinematics3D.ts`, `SurfaceNormalLighting3D.ts`, `BoundingVolumeCulling3D.ts` wired into `ThreeDAnimationSystem`, `VisualEngineSubsystem`, `HighPrecisionVisualEngine`, and `VisualRenderingFilterEngine.project3D`.
  - `Polygons/`: `PolygonTessellationKernel.ts`, `PolygonTransformPipeline.ts`, `PolygonDeformationSolver.ts` wired into `PolygonSystem` and `PolygonRenderer`.
  - `Pixelations/`: `PixelGridQuantizer.ts`, `BayerDitherMatrix.ts`, `DownsampleBlockSolver.ts` wired into `PixelationSystem` and `VisualRenderingFilterEngine.applyPostFilters`.
  - `Geometry/`: `GeometryVectorMath2D.ts`, `GeometryCurveEvaluator.ts`, `GeometryCollisionShapes.ts` wired into `GeometrySystem`.
  - `Color_Palette/`: Added `ColorSpaceMath.ts`, `Color_Palette/index.tsx`, `Monochrome/` (`LuminanceWeightsKernel.ts`, `OrderedHalftoneSolver.ts`), `Monochrome/Grayscale/` (`GrayscaleHistogramSolver.ts`, `GrayscaleToneMapper.ts`, `index.tsx` wired into `MonochromeSystem` and `GrayscaleSystem`), `Pattern_Palette/` (`ProceduralPatternSampler.ts`, `TilingFrequencyStabilizer.ts`), and `Texture_Palette/` (`ProceduralNoiseFields.ts`, `SurfaceBRDFCalculator.ts`).
- **`System/AI/In-Game/Category/Visuals/Animations/`**: Added `KeyframePredictorAI.ts`, `FrameBudgetGovernorAI.ts`, `ProceduralGaitBlenderAI.ts`, `PaletteMoodClassifierAI.ts`, wired into `VisualAnimationsAI`, `VisualAnimationsEngine`, `VisualEngine`, `AI/In-Game/index.tsx`, and `Integrity_Web.ts` (verified for existence and callable signatures).

---

## 23. Mobile Portrait Pause, Pause Input Guards, Ambience-Only BGM & Wii WebHID Pairing Fixes (`v0.1.0.8`)
- **Mobile Portrait Phone (`Mobile_Portrait_4_Phone/`)**: Wired live `isPlaying`, `onTogglePlayPause`, `speed`, and `Measured_Speed_Value`; added accessible `Pause`/`Resume` button to `MobileMenuBar`; added touch-safe `"Game Paused"` overlay across all 3 portrait layouts; replaced placeholder speed/livity text in `double-screen` with real-time `Measured_Speed_Value(Math.abs(speed))` and live `SCORE`.
- **Pause/Resume Input Isolation (`Play_Area/index.tsx`)**: Unified `handleTogglePlayPause` clears held movement flags, resets `lastTime` on resume, and gates touch (`onMoveLeft`, `onMoveRight`, `onJump`) and controller steering (`controllerLeft`, `controllerRight`) whenever `!stateRef.current.isPlaying || stateRef.current.isGameOver`.
- **Ambience-First Audio & Pause Separation (`Sound/index.tsx`, `Menu_Bar/Crafted/index.tsx`)**: Default audio remains `"Ambience Only"` (`musicEnabled = false`) until manually activated from Music Options (including `"Play Each Track Via Arena"`). Pausing stops only BGM music tracks via `stopOnlyBGMTracks()` while keeping arena ambience playing, and resuming restores only BGM music tracks via `playOnlyBGMTracks()` when music is enabled.
- **Wii Remote Plus WebHID Driver (`Controller/Wii/index.tsx`)**: Fixed `connectWiiRemote()` second device filter to use `WiiGeneralConfig.bluetooth.VENDOR_ID` (`0x057e`) alongside `PRODUCT_ID_PLUS` (`0x0330`).

---

## 24. Canvas Text Purity & `Graphical_Renderer` Flat Stabilization Modules (`v0.1.0.8`)
- **Canvas Text Purity Policy (`CanvasTextPurityPolicy.ts`)**: Deterministic gatekeeper distinguishing valid canvas text (`arcade_score_popup`, `doorway_signage`, `pirated_cart_notice`, `chalkboard_dynamic`, `blueprint_2d`, `opponent_indicator_tag`) from disallowed 3D clutter (`static_wall_marker`, `unconditional_zone_hud`).
- **3D POV & Rider Canvas Cleanup**:
  - Removed hardcoded wall markers (`SOUTH/NORTH/WEST/EAST WALL Marker`) in `renderFoyer3D` (`Graphical_Renderer/index.tsx`) and the unconditional `zoneTitle` HUD overlay label in `renderWorld2Courtyard3D` (`World_2/Temple_Courtyard/index.tsx`).
  - Gated `"CHARGED!"` text and `drawGoatCameo3D` nameplates behind `showOpponentIndicators` (`Visual HUD Tags`).
  - Preserved `floatingTextPool` dynamic scoring popups, doorway/gate signage, `isPiratedSwitchCartridge()` enforcement text, and added live dynamic Chalkboard telemetry (`CanvasTextPurityPolicy.formatChalkboardDynamicLine`) in `Play_Area/index.tsx`.
- **Flat Modules Installed in Existing `Graphical_Renderer/` Folders (Wired & Checked in `Integrity_Web.ts`)**:
  - `Graphical_Renderer/`: `CanvasTextPurityPolicy.ts`, `DepthSortViewportKernel.ts`
  - `Graphical_Renderer/General/`: `ViewportTransformStabilizer.ts`
  - `Graphical_Renderer/Configurater/` & `Configurater/General/`: `RenderPipelineValidator.ts`, `VisualPresetMatrix.ts`
  - `Graphical_Renderer/Items/`, `Items/General/`, `Items/Objects/`: `EdibleItemTelemetryKernel.ts`, `ItemColorContrastSolver.ts`, `ObjectGeometryTessellator.ts`
  - `Graphical_Renderer/World_2/Temple_Courtyard/`: `CourtyardPerspectiveKernel.ts`

---

## 25. Temple Courtyard Copyleft Scene, Blueprint Chalkboard & ANY-Key Screenshot Unlock (`v0.1.0.8`)
- **Doorway & Signage Policy (`CanvasTextPurityPolicy.ts`)**: `doorway_signage` always renders when `isChalkboard || isPiratedCart || !is3D` so blueprint/chalkboard drafting and copyleft enforcement retain explicit spatial labels while normal 3D views stay uncluttered.
- **`CourtyardCopyleftScene` (`World_2/Temple_Courtyard/CourtyardCopyleftScene.ts`, registered in `Integrity_Web.ts`)**:
  - `renderCourtyardGoatParade3D`: Renders 4 animated goats (`alpine`, `aurum`, `bella`, `snowy`) via `drawGoatCameo3D` carrying a green banner with crisp black text displaying the exact open-source, zero-data-harvesting privacy, free premium content, and ANY-key screenshot awareness message on pirated cartridges.
  - `renderTeaAreaDynamicPictureFrame3D`: Renders an animated picture frame in the South Tea Area depicting riders on opossums alongside an employed person (visible work ID badge/lanyard) using a laptop running a legitimate copy while enjoying warm steaming tea and flaky pastries.
  - `renderChalkboardBlueprintOverlay`: Renders architectural CAD blueprint gridlines, edge ruler ticks, live compass needle rose (N/E/S/W), and `0–500 ft` calibration bar in `Chalkboard Only` mode alongside live dynamic telemetry.
- **ANY-Key (Priority `"A"` Key) Screenshot Unlock (`Play_Area/index.tsx` & `Menu_Bar/Crafted/index.tsx`)**: Capture-phase `keydown` listener unlocks `piratedScreenshotUnlocked` immediately when `"A"`/`"a"` or any non-modifier key is pressed on a pirated cartridge (bypassing Cedella multi-tap interception and menu focus blocks), enabling `"Take Screenshot"` in `Toolbox`.

---

## 26. Crafted Building Block Signs Subsystem & Grand Tea Room Wall Sign (`v0.1.0.8`)
- **Module Location**: `src/System/Building_Blocks/Signs/Crafted/Grand_Tea_Room_Sign/index.tsx` (with `AGENTS.md` shields across `Signs/`, `Signs/Crafted/`, and `Signs/Crafted/Grand_Tea_Room_Sign/`), exported via `System/Building_Blocks/index.tsx` and `Graphical_Renderer/index.tsx`, and checked in `Integrity_Web.ts`.
- **Specifications (`GRAND_TEA_ROOM_SIGN_SPEC`)**:
  - Size: `48 inches × 48 inches` (`4 ft × 4 ft`); Border: `1 cm` gold (`#D4AF37`); Background: Black (`#000000`); Artwork: Rainbow teacup inside a saucer; Text: `"Grand Tea Room"`.
  - Placement: Floor Foyer West Wall (`X = 0`), spanning `984 ft` to `988 ft` from the south wall (leaving `24 in` to the left of the `990–1,010 ft` Grand Red Frame Doorway), placed `12 ft` from the floor (`12–16 ft` vertical span).
- **3-D & 2-D Rendering (`Graphical_Renderer/index.tsx` & `CanvasTextPurityPolicy.ts`)**: Added `physical_world_sign` policy category (always `true` for screenshots in normal 3-D, 2-D, Chalkboard, and Pirated Cartridge modes) and direction-aware West/South/East wall projection in `renderFoyer3D` (`foyerDirection`) displaying the Grand Red Frame Doorway + `"Grand Tea Room"` plaque alongside 2-D blueprint placement.

---

## 27. Zero-Fallback 32-Opossum Render & Attribute Pipeline (`v0.1.0.8`)
- **`CraftedOpossumRenderKernel` (`System/Engine/Science/Graphical_Renderer/CraftedOpossumRenderKernel.ts`)**:
  - Encodes `CRAFTED_OPOSSUM_VISUAL_PROFILES` for **all 32 `OpossumId` crafted opossums** with exact handcrafted colors, patterns, ear orientations/lengths/patterns, furry-face percentages, tails, paws, and accessories (tiaras, necklaces, earrings, Callie Rose's circular glasses).
  - Wires `drawCraftedOpossum2D`, `drawCraftedOpossum3D`, `drawCraftedOpossumPolygons`, `renderCraftedOpossumPOV`, `resolveOpossumVisualProfile`, `resolveOpossumPrimaryColorHex`, and `resolveRiderLegColors` across `Graphical_Renderer/index.tsx`, `World_2/Temple_Courtyard/index.tsx`, and `Integrity_Web.ts`, eliminating every `MelissaOpossum` and `#9ca3af` gray fallback across `2-D`, `3-D`, `Polygons`, and `POV` modes.
- **`OpossumsAttributesDesign` (`System/Registry/Characters/Opossums/Attributes/Design/index.tsx`)**:
  - Added bidirectional `resolveDesignKey` / `resolveVisualMappingKey` normalization between `"arden_rosie"` and `"arden_rosie_kone_reynolds"`.
  - Populated all 32 crafted opossums across attribute maps `5`, `27`, `29`, `31–38` and added all 6 missing compact Jacks (`drake_kone_reynolds`, `rudy_kone_reynolds`, `eugene_rose`, `arnold_rose`, `melvin_qin`, `safford_chin`) to `Visual_Mapping` (Map 39).
- **`renderFoyer3D` Compass Alignment (`Graphical_Renderer/index.tsx`)**:
  - Rotates Level 0 `localTicks` coordinates into camera space across `North`, `East`, `South`, and `West` so floor ticks match doorway and wall orientation in every compass direction.
- **3rd-Person Foreground Clearance, Head Orientation & POV Optical Geometry (`CraftedOpossumRenderKernel.ts` & `Graphical_Renderer/index.tsx`)**:
  - `resolveRiderMountLayout` & `drawCraftedOpossumForeground3D` seat riders above/behind the neck with flank-hugging legs for procedural crafted opossums, attaching ears cleanly to `headY` (`headOrientation` aware) so eyes, ears, circular reading glasses, contrasted tiara, and necklace remain unobstructed in 3rd-person view.
  - Updated all 3 `renderOpossumPOV` call sites to `py = height - 46` and refactored `renderCraftedOpossumPOV` to anatomically true behind-the-head POV optics (outer-ear back + thin front inner-ear crescent, furred cranium crest tiara, glasses temple arms + outer curved lens rims without backward-staring eyeballs, tapered forward snout/nose tip, and neck collar band).
  - Filled `renderFoyer3D` floor opaquely each frame (`INDIGO_SKY` + solid `#f97316` / `#7c3aed` bands) to prevent previous-frame sprite/tick afterimages.

