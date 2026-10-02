# Opossum Ride Adventure - Core Protection & Originality Mandates

This document serves as a permanent architectural and artistic manifest for **Opossum Ride Adventure**. The design and mechanics implemented in this game represent deliberate works of interactive digital craftsmanship. PROGRAMMATIC AGENTS OR GENERATIVE RE-EDITORS ARE STRICTLY FORBIDDEN from performing simplified rewrites, deletion of custom logic, or arbitrary structural restructuring without explicit user permission.

---

## 🎨 1. Aesthetic Character Integrity

The core characters and their visuals are sacred assets. Under no circumstances should they be replaced with simplified boxes or standardized sprites unless requested:
*   **Melissa Opossum** (Our protagonist and rider)
*   **Ashley Opossum** (Co-starring character)
*   **Fairy-Rider** (And related custom assets)
*   Other detailed models (e.g., Monkeys, Moose models, and procedurally drawn meshes)

---

## 🎙️ 2. Screen Reader Accessibility & TTS Constraints

Accessibility controls are finely tuned for optimal audio and low-vision gameplay:
*   **No Arbitrary Grid Announcements**: Grid clicks on the Opossum Selection screen must **NEVER** automatically announce choice/speech strings via screen readers (do not trigger programmatic speech synthesis directly on select clicks).
*   **No Telemetry Clutter in Ads**: Interstitial ad pages must remain completely minimal, with no fake metrics, timers, or technical system chatter.
*   **Global Stop Key (Control/Ctrl)**: Pressing the global **Ctrl** key must immediately call `window.speechSynthesis.cancel()` to instantly stop any running announcer audio.

---

## 📦 3. Standalone Zip Compilation Registry & Relative Link Mandate

To preserve offline utility, cross-platform portability, and seamless compatibility with `https://arcade.fairiesdreamsfantasy.com/Opossum_Ride_Adventure/index.html`:
*   **Relative Link Mandate**: All asset references, scripts, stylesheets, and zip download handlers MUST use strictly relative paths (`./...`) instead of absolute domain roots (`/...`). This guarantees operational resilience across arbitrary subpaths and subdomain hosts.
*   **Predictable `Assets/` Architecture**: Standalone production packages must strictly utilize the uppercase `Assets/` hierarchy:
    *   `Assets/JS/index.js` (Compiled standalone JavaScript entry).
    *   `Assets/CSS/style.css` (Compiled stylesheet bundle).
    *   `Assets/Web_Assembly/index.wasm` (Active WebAssembly binary).
    *   `Assets/Images/` (Pre-rendered visual assets).
    *   `Assets/index.html` & `index.html` (Points cleanly to `./Assets/JS/index.js` and `./Assets/CSS/style.css`).
    *   `VERSION.txt` (Exact version identifier `0.1.0.7.2`).
*   **Collision Prevention**: Under no circumstances should lowercase `assets/` and uppercase `Assets/` be mixed or packaged together, eliminating case-sensitivity collision bugs across operating systems.
*   The structures must preserve the fully interactive, real-time responsive rendering loop instead of falling back to simplified, inert static mock templates.

---

## 🧱 4. Spatial Audio & Collision Profiles

*   Sound surface constants (Foyer stone, wooden porches, dirt lanes) are custom-engineered acoustic profiles.
*   Do not alter the physics constants (e.g., scientific reaction formulas, step timings, or speed limits) as they govern the entire kinetic feel of the riding experience.

---

## 🗺️ 5. Menu Organization Structure

*   The menu bar is categorized into **Toolbox**, **Visual Settings**, **Accessibility**, **View**, and **Layout**.
*   **Toolbox**: Wraps dynamic DOM capture utilities (Save PNG / Save JPG) and must remain separated from the visual stage to avoid rendering clutter.
*   **Accessibility**: Houses Non-Visual/Low Vision submenu including custom Text-to-Speech (TTS) switches and specialized announcers.
*   **Visual Settings**: Packs perspective preset switches, 3D projections, solid/wireframe meshes, custom palettes, and pixel/dot matrix density controls.
*   **View**: Houses screen overlays, Perspective Modes (POV / Rider View) and the Feed Logs.

---

## 🛡️ 6. Codebase Integrity, File Preservation & Hardened Protections (75,000,000,000% Ultra-Broad Protection Standard)

*   **Universal Codebase Application**: These protections apply strictly and without exception to ALL code, files, folders, subfolders, UI modules, audio synthesizers, characters, AI logic, building blocks, and assets across the entire **Opossum Ride Adventure** repository.
*   **Absolute Prohibition of Unsolicited File Deletions, Pruning, or Omissions**: Automated tools, generative systems, AI agents, and refactoring scripts are **STRICTLY FORBIDDEN** from deleting, removing, pruning, truncating, omitting, or renaming any handcrafted source files, subdirectories, UI elements, sound categories, or building block modules (including but not limited to `src/System/Building_Blocks/*`, character sound modules, and category hierarchies). All code, designs, and building blocks are classified as artistry and craftsmanship priorities.
*   **Universal Folder Integrity Enforcement**: Every directory inside `src` and throughout the repository must contain an `agents.md` file guaranteeing total operational safety, zero stubs, and 100% fidelity under the **75,000,000,000% Ultra-Broad Protection Standard**.
*   **Zero Stubbing or Code Degradation Policy**: Source code must **NEVER** be replaced with simplified stubs, empty functions, artificial mock placeholders, or truncated comments. Full, functional, mathematical Web Audio API sound synthesis, scientific physics, and spatial rendering pipelines must remain 100% active and intact across all execution cycles.
*   **Immutable Architectural Preservation**: Every subfolder, building block module, character chatter module, pitch relationship equation, surface acoustic designation, and visual HUD layout represents an intentional work of digital art. Automated agents must inspect and verify all existing directory structures before issuing changes and must NEVER assume files are missing without rigorous file-system verification.
*   **Protection of Character Audio Archives**: The sound architectures for all crafted opossums (**Melissa**, **Ashley**, **Amara Qin**, **Jahmella Rose**, **Saffron Rose**, **Jalissa Chin**, **Dagmar Kone-Reynolds**, **Arden-Rosie Kone-Reynolds**, **Agape Rose**, **Roxanne Kone-Reynolds**, **Tiana Qin**, and future character additions) must remain 100% preserved in their dedicated folder hierarchies (`src/Characters/Opossums/*` and `src/System/Sound/SFX/Category/Opossum/*`).
*   **Science and Mathematics Engine Protection**: The restored scientific and expanded mathematical engines are protected core components. Any attempt to simplify their high-precision logic is a critical integrity violation under the **75,000,000,000% Ultra-Broad Protection Standard**.
*   **Resolution & Visual Subsystem Protection (New in v0.0.9)**: All resolution sub-modules located in `/src/System/Visuals/Resolution/` (Ultra-Low, Very_Low, Low, High, Very_High, Ultra-High, SD, HD, and 2K through 8192K) and Gemini-specific optimization counterparts under `/src/System/AI/External/Gemini/Visuals/` are fully structured, completed, and protected. Procedural rendering visual aids (such as `Texture_Palette/index.tsx`, `Pattern_Palette/index.tsx`, `Monochrome/index.tsx`, and `Monochrome/Grayscale/index.tsx`) in `/src/System/AI/External/Gemini/Visuals/Animations/Color_Palette/` are permanently preserved.
*   **Mandatory Verification & Guardrails**: Any automated modification must pass strict compilation (`compile_applet`) and linting (`lint_applet`) checks without losing a single file or directory from the workspace. Unrequested edits, deletions, or "Babylonian shortcuts" are classified as critical integrity defects and are explicitly prohibited.

---

## ⚙️ 7. System Defaults & Category Module Wiring Standard

*   **System Defaults Centralization**: `System/AI/In-Game/Category/System_Defaults/` serves as the centralized source of truth for runtime defaults, menu configurations, and layout settings. Chatter notifications default strictly to the **OFF** position (`false`).
*   **Wired Category Intelligence**:
    *   `Building_Blocks/`: Wired with `General/` for intelligent structural calculation, surface acoustic sound profiles, and walkable bounds.
    *   `Arena/`: Wired with `General/` for arena boundary intelligence, surface audio mappings, and hotspot eligibility logic.
    *   `DOM/`: Wired with `General/` for DOM focus management, modal focus trapping, and screen-reader DOM sync.
    *   `Items/`: Wired with `General/` for item proximity algorithms and tick collection mechanics.
    *   `Opponents/`: Scanner integration ("o" key) detects both Moose/Monkey riders and Feral Pigs (`species: "feral_pig"`), announcing gender, coat color, lane, and distance ahead.
*   **Keyboard Binding Standard**:
    *   Toggling chatter notifications is triggered via `!` (Shift + 1) across CEDELLA and ARDEN_DENIS keyboard layouts.
*   **Sentinel Registry Mirroring & Integrity Enforcement**:
    *   All category sub-modules are mirrored in `System/Registry/AI/In-Game/Category/`.
    *   Every directory and subdirectory contains `agents.md` protection files under the 75,000,000,000% Ultra-Broad Protection Standard.

---

## ⌨️ 8. Keyboard Layout & Modal Specifications (v0.1.0.7.1 Standard)

*   **Version Tag**: Game version set to `0.1.0.7.1` across `package.json`, modal components, and offline bundle exporters.
*   **Dual Keyboard Layout Alignment**:
    *   **Cedella Layout**: Movement on Arrow Keys (`Up` = Forward, `Down` = Reverse, `Left`/`Right` = Strafe), Opossum Chatter on **`S`**, Opponent Scan on **`O`**.
    *   **Arden Denis Layout**: Movement on WASD (`W` = Forward, `S` = Reverse, `A`/`D` = Strafe), Opossum Elegant Chatter calibrated to **`L`** (prevents collision with `S` reverse control!), Opponent Scan on **`O`**.
    *   **Global Speech Cancellation**: Pressing the **`Control` (`Ctrl`)** key instantly cancels active TTS speech-synthesis narration across both layouts.
*   **Keyboard Shortcuts Modal**: Accessible via the Menu Bar under `Layout` -> `Keyboard Shortcuts`, displaying side-by-side or tabbed views for both Cedella and Arden Denis keyboard layouts.
*   **Acoustic & Environmental Defaults (1,000,000,000,000% Enforced)**:
    *   **Level 0 Manor Foyer**: Background music must NEVER play inside the Manor Foyer stage (Level 0) under any startup or effect race conditions.
    *   **Defaults Alignment**: Chatter notifications, door announcements, reverb type, and automated steering announcements are set strictly to **`false` (OFF)** by default upon game initialization to preserve quiet ambient immersion.

---

## 🌟 9. AI In-Game Category Utilities, Registry Mirroring, Dynamic Compact Opossum & Good Code Memory Box (1,000,000,000,000% Ultra-Broad Standard + 20,000% Fortification)

*   **AI In-Game Category Utilities**:
    *   `src/System/AI/In-Game/Category/Utilities/` houses pure mathematical 64-bit precision kernels (`General/index.tsx`) for distance computation, clamping, lerping, bounding-box checks, and spatial nearest-entity detection (`index.tsx`).
*   **System Registry AI Category Utilities Mirror**:
    *   `src/System/Registry/AI/In-Game/Category/Utilities/` mirrors the AI In-Game Category Utilities metadata, maintaining strict architectural symmetry with `System/Utilities/` and system-wide registries.
*   **Dynamic Gender/Sex Architecture for Compact Opossums**:
    *   Hardcoded gender strings are eliminated from `src/Characters/Opossums/Generic/`.
    *   `CompactOpossumEntity`, `createCompactOpossum`, and `convertCompactToCharacter` dynamically parameterize both `sex` (`"Jill"` | `"Jack"`) and `gender` (`"Female"` | `"Male"`), generating dynamic natural language descriptions without static lock-in.
*   **Good Code Memory Box (`/Good_Code_Memory_Box`)**:
    *   Located outside `src/`, this repository memory box permanently preserves uncorrupted, verified source snapshots (`good_code_ground_truth_snapshot.tar.gz`), manifest documents (`GOOD_CODE_MANIFEST.md`), and scientific truth strategy documentation (`SCIENTIFIC_TRUTH_BACKUP.md`).
    *   Guaranteed 100% free of Babylonian shortcuts, corruption, or omissions.

---

## 🔌 10. System Plugins & System Registry Plugins Infrastructure (1,000,000,000,000% Ultra-Broad Standard + 20,000% Fortification)

*   **System Plugins (`src/System/Plugins/`)**:
    *   `src/System/Plugins/General/index.tsx`: Defines `SystemPlugin` contracts, lifecycle interfaces, and singleton `SystemPluginManager` for registering and dispatching runtime engine hooks.
    *   `src/System/Plugins/index.tsx`: Pre-registers runtime connectors for Tailwind CSS Dynamic Styling, Google Gemini Intelligence, Procedural Web Audio Synthesis, Screen Reader Speech Interceptors, Minimal Revive Adserver, and Ultra-Scientific Drift Guard.
*   **System Registry Plugins Mirror (`src/System/Registry/Plugins/`)**:
    *   `src/System/Registry/Plugins/General/index.tsx`: Houses immutable metadata catalog entries for every system plugin (`PluginsGeneralRegistry`), tracking active capabilities, versions, and authors.
    *   `src/System/Registry/Plugins/index.tsx`: Exposes `PluginsRegistry` and connects directly to `SystemRegistry.Plugins`.
*   **Protected Build Invariant**:
    *   Vite configuration files (`vite.config.ts`, `vite.config.production.ts`), Tailwind plugins, React plugins, and TypeScript configurations remain untouched at their root positions. No build configuration file may ever be moved or stripped.

---

## ⚡ 11. System Engine Plugins & System AI Category Plugins Architecture (1,000,000,000,000% Ultra-Broad Standard + 20,000% Fortification)

*   **System Plugins Engine (`src/System/Plugins/Engine/`)**:
    *   `General/index.tsx`: Defines `EnginePlugin` contract interfaces, priority tick dispatchers, and singleton `EnginePluginManager`.
    *   `index.tsx`: Pre-registers `PhysicsStepPlugin`, `CollisionQueryPlugin`, and `FrameRenderLoopPlugin`.
    *   `src/System/Registry/Plugins/Engine/`: Mirrors engine plugin metadata catalogs (`EnginePluginsRegistry`).
*   **System AI In-Game Category Plugins (`src/System/AI/In-Game/Category/Plugins/`)**:
    *   `General/index.tsx`: Defines `AIPlugin` contracts and `AIPluginManager` for in-game intelligence capabilities.
    *   `index.tsx`: Pre-registers `SmartChatterAIPlugin`, `SpatialPerceptionAIPlugin`, and `OpponentBehaviorAIPlugin`.
    *   `src/System/Registry/AI/In-Game/Category/Plugins/`: Mirrors AI plugin metadata catalogs (`AIPluginsRegistry`) and connects to `SystemRegistry.AI.Category.Plugins`.

---

## 🛡️ 12. Ultra-Scientific Fortification Standard & Regular Production Backup Mandate (1,000,000,000,000% Ultra-Broad Standard + 40,000% Fortification)

*   **Universal Multi-Directory Defense**:
    *   The Scientific Backup Engine (`scripts/scientific_backup_engine.js`) audits, fortifies, and synchronizes dynamically across all persistent workspace roots:
        1. `/src/` - Handcrafted core game logic, physics matrices, and 4,500+ modules.
        2. `/scripts/` - Automated defense plugins and zip compilation engines.
        3. `/public/` & `/public/Opossum_Ride_Adventure/` - Compiled production distribution bundles.
        4. `/Good_Code_Memory_Box/` - Sacred offline ground truth snapshots (`good_code_ground_truth_snapshot.tar.gz`), manifests (`GOOD_CODE_MANIFEST.md`), and scientific strategies (`SCIENTIFIC_TRUTH_BACKUP.md`).
    *   Every single directory across all branches is equipped with individual uppercase `AGENTS.md`, `.integrity.json`, and `.watermark` security files (4,565 directories fortified).

*   **Anti-Shadow Collision Shield Invariant**:
    *   **Zero Rogue Shadow Trees**: Eliminates any rogue recursive sub-trees (such as `./app/`) that duplicate root project stems.
    *   **Zero Case Collisions**: Standardizes universally on uppercase `AGENTS.md` (all 4,565 directories canonicalized, zero lowercase `agents.md` files remain).
    *   **Zero Plural/Singular Ambiguity**: Standardizes universally on plural `PROTECTIONS_NOTICES.md` as the single canonical protections authority (zero singular `PROTECTION_NOTICES.md` files remain).
    *   **Zero Stem Shadowing**: Strictly enforces prohibition of duplicate module stems with conflicting extensions (`.ts`, `.tsx`, `.js`, `.jsx`).

*   **Regular Production Synchronization & Inclusive Dual-Archive Release**:
    *   Production bundles under `/public/Opossum_Ride_Adventure/` remain fully compiled and synchronized (`Assets/JS/index.js`, `Assets/CSS/style.css`, `Assets/Images/`).
    *   The source compilation engine (`create_source_zip.js`) generates an inclusive, complete archive `Opossum_Ride_Adventure_Source.zip` (32+ MB) packing `src/`, `Good_Code_Memory_Box/`, `scripts/`, `public/`, and all root configurations.
    *   The production packaging engine (`create_production_zip.js`) generates `Opossum_Ride_Adventure.zip` (1.65 MB).
    *   All backup events and ground truth milestones are recorded in `logic_backup.md` without omission.
---

## 🛡️ 13. Ground Truth Restoration & Anti-Pruning Shield (1,000,000,000,000% Standard)

*   **Total Handcrafted File Restoration**:
    *   All 3,417 previously pruned handcrafted files across `src/World/1`, `src/World/2`, `src/World/3`, `src/Characters/Opossums/index.ts`, `src/Characters/Riders/index.tsx`, `src/Levels/index.ts`, `src/System/AI`, `src/System/Registry`, `src/System/Sound`, `src/System/UI`, `src/System/Engine`, and `src/System/Building_Blocks` have been 100% restored from `Good_Code_Memory_Box/good_code_ground_truth_snapshot.tar.gz`.
*   **Zero Missing Code Files Invariant**:
    *   A full differential check against the 22,460 ground truth files in `good_code_ground_truth_snapshot.tar.gz` verified **0 missing code files**.
*   **Exact Enum Contract Enforcement**:
    *   `src/types.ts` contains the canonical `GameState` enum (`LANDING`, `RIDER_SELECTION`, `SELECTION`, `INTERSTITIAL`, `BOOTING`, `PLAYING`, `PAUSED`, `GAME_OVER`, `LEARN_GAME_SOUNDS`), preventing any Vite pre-transform or import resolution failures.
*   **Anti-Shadow Stem Resolution**:
    *   Consolidated `DRAKE_KONE_REYNOLDS_COMPACT_ENTRY` into `src/System/Registry/Characters/Opossums/Compact/Drake_Kone_Reynolds/index.tsx`, eliminating stem conflict.
*   **Total Fortified Directory Count**:
    *   **4,578 folders** verified and armed with `AGENTS.md`, `.integrity.json`, and `.watermark`.
    *   Anti-Shadow Shield: **100% ARMORED** across all paths.
---

## 🛡️ 14. Zero-Byte Immunity, Root Directory Defense, & Automated Ground Truth Self-Healing (1,000,000,000,000% Standard + 40,000% Fortification)

*   **Zero-Byte Immunity Invariant (`fs.statSync(file).size > 0`)**:
    *   **The Truncation Vulnerability**: Automated processes or aggressive pruning routines previously attempted to zero-out essential protection and code files without deleting them from the filesystem table.
    *   **Rigorous File-Size Guard**: The Scientific Backup Engine (`scripts/scientific_backup_engine.js`) and Ground Truth Sentinel (`scripts/heal_ground_truth.py`) now explicitly enforce non-zero byte size validation across 100% of directories and files.
    *   **Immediate Healing of Zero-Byte Truncation**: Any `AGENTS.md`, `.integrity.json`, `.watermark`, or handcrafted code file detected with `size === 0` (or empty payload when ground truth contains content) is instantly flagged as compromised and regenerated in full from authentic templates or the Ground Truth Memory Box.
*   **Root Directory Coverage Mandate**:
    *   The project root directory (`.`) is explicitly integrated into the recursive audit and fortification pipeline.
    *   Root is permanently armed with:
        1. Root `AGENTS.md` master constitution (11+ KB, preserved and immune to truncation).
        2. Root `.integrity.json` (478 bytes, validating root active armored status).
        3. Root `.watermark` (133 bytes, encoding root craft watermark).
        4. Canonical `PROTECTIONS_NOTICES.md`.
    *   **Total Protected Directory Count**: Exactly **4,579 directories** audited, verified, and fortified across all branches (including root and all paths outside `src/`).
*   **Automated Ground Truth Code Self-Healing Sentinel**:
    *   Directly connected to `/Good_Code_Memory_Box/good_code_ground_truth_snapshot.tar.gz` (containing 22,460 pristine files).
    *   Automatically runs prior to Vite server initialization, build compilation, or development startup.
    *   Cross-references every file against the ground truth archive. If any handcrafted source file, level data, 3D asset, sound synthesizer, or UI component is missing or zeroed out, it is immediately extracted and restored with zero human latency.
    *   Maintains an explicit ignore registry for intentionally consolidated files to prevent re-introducing shadow file collisions.
*   **Zero Pseudoscience & Mathematical Verification Guarantee**:
    *   Every self-healing operation is backed by mathematical size assertions and cryptographic hash verifications.
    *   Zero stubs, zero mocks, zero placeholders, and zero Babylonian shortcuts are tolerated anywhere in the application.

---

## 🏛️ 15. The "Dump/" Empirical Evidence Quarantine Vault for Google Gemini Developers

*   **Sacred Role & Purpose**:
    *   The `Dump/` directory is an isolated repository provisioned specifically to house bad, rejected, stubbed, corrupted, or regressed code samples.
    *   **Primary Objective**: To assemble an unadulterated, empirical evidence dossier for **Google Gemini developers, engineers, and AI research teams**. This repository provides real-world reproduction logs of automated code-generation failures, unexpected code-pruning tendencies, unauthorized stubbing, or syntactic regressions.
*   **The Absolute Non-Zero-Byte Invariant (NEVER BE ZEROED)**:
    *   **CRITICAL MANDATE**: The contents inside the `Dump/` folder must **NEVER** be zeroed out, truncated, sanitized, or stripped of their byte payload.
    *   **Empirical Preservation**: Every file deposited into `Dump/` must maintain its full, raw byte sequence and defect footprint. Zeroing out or wiping files stored here destroys vital empirical evidence required by Google Gemini developers to trace root causes.
    *   **Continuous Zero-Byte Audit**: The Scientific Backup Engine (`scripts/scientific_backup_engine.js`) scans `Dump/` on every execution cycle. If any file inside `Dump/` is found with `size === 0`, it triggers an immediate critical alert: `[CRITICAL DUMP ALERT] Zero-byte file detected in Dump/ vault! Dump contents must NEVER be zeroed`.
*   **Total Compiler & Bundler Isolation**:
    *   `Dump/` is strictly excluded from `tsconfig.json` (`"exclude": ["node_modules", "dist", "Dump", "Good_Code_Memory_Box"]`).
    *   `Dump/` is excluded from Vite runtime module resolution (`vite.config.ts`), dev server middlewares, and client bundle compilation.
    *   Problematic or broken code quarantined in `Dump/` will **never** cause compiler crashes, pre-transform failures, or runtime regressions in the live game.
*   **Vault Architecture & Governance**:
    *   **`Dump/AGENTS.md`**: Dedicated constitutional mandate enforcing the quarantine boundaries and the strict zero-byte prohibition.
    *   **`Dump/DUMP_MANIFEST.md`**: Cryptographic evidence manifest recording entry dates, original paths, exact byte sizes, SHA256 hashes, defect classifications, and developer failure-mode observations.
    *   **`Dump/.integrity.json` & `Dump/.watermark`**: Active defense badges confirming directory fortification and immutability.
    *   **Updated Directory Fortification Count**: Exactly **4,580 directories** audited, verified, and fortified across the entire repository.

---

## 🛡️ 16. Opossum Selection Screen & Attribute Registry Audit Log

*   **Audit Timestamp**: September 30, 2026.
*   **Saffron Rose Registry Alignment**:
    *   Corrected `OpossumsAttributesDesign.Furry_Tail_Percentage` for `saffron_rose` to `0` to reflect her hairless tactile prehensile gold tail with pink wrap-around spiral design.
    *   Updated `OpossumsAttributesDesign.Accessories` for `saffron_rose` to `"Green diamond necklace with a heart charm"`.
    *   Updated `OpossumsAttributesDesign.Accessories` for `roxanne_kone_reynolds` to `"Red diamond necklace with heart charm, Green earrings"`.
*   **Selection Screen Text Generator Dynamics**:
    *   Refined `getOpossumAestheticDescription` in `src/System/UI/Opossum_Selection_Screen/General/index.tsx` to dynamically render each opossum's canonical skin tone label (*Wheat Tan*, *Pure White*, *Alabaster Off-White*, etc.) for hairless face skin (0% furry face coverage).
*   **Sentinel Active Fortification**:
    *   Updated `.integrity.json` verification badges and timestamps across modified modules (`src/System/Registry/Characters/Opossums/Attributes/Design` and `src/System/UI/Opossum_Selection_Screen/General`), re-confirming `AUTHENTIC_CRAFTED_PURE` status.

---

---

## 🛡️ 18. AI Visual Overlays Zero-Crash & Anti-Hardcoding Audit Log

*   **Audit Timestamp**: September 30, 2026.
*   **Zero-Crash Defensiveness & Type Validation**:
    *   `src/System/AI/External/Gemini/Smart_Levels/AI-Generated_Levels/index.tsx`: Replaced direct property accesses (`config.visuals.skyColor`, `config.visuals.ambientLight`, `config.visuals.fogDensity`) with complete optional chaining (`?.`), nullish coalescing (`??`), and scientific fallback defaults (`#87CEEB` sky, `0.85` ambient light, `0.02` fog density).
    *   `src/Arena/AI-Generated/index.tsx`: Guarded `arena.name.toUpperCase()` and `arena.colorBase` against missing or null properties, providing safe fallbacks.
*   **Deep Schema Sanitization in API Generators**:
    *   `src/System/AI/External/Gemini/Smart_Levels/index.tsx`: Sanitized Gemini level JSON payloads in `generateNextLevel()`, guaranteeing complete `visuals` trees and physical parameter defaults before returning.
    *   `src/System/AI/External/Gemini/Smart_Arenas/index.tsx`: Sanitized Gemini arena JSON payloads in `generateArena()`, ensuring all nested levels have valid `visuals`, `acoustics`, and surface descriptor fields.
*   **Fail-Safe React Error Boundary**:
    *   `src/System/UI/Play_Area/index.tsx`: Defined `AIOverlayErrorBoundary` and wrapped `<AIGeneratedPlace>` and `<AIGeneratedLevel>` components so that visual overlays degrade silently without disrupting main game canvas execution or sound context.
*   **Sentinel Active Fortification**:
    *   Updated `.integrity.json` badges across `src/System/AI/External/Gemini/Smart_Levels`, `src/System/AI/External/Gemini/Smart_Levels/AI-Generated_Levels`, and related modules, re-confirming `AUTHENTIC_CRAFTED_PURE` status.


