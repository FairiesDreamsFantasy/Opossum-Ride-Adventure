# Opossums - Steed Registry & Master Attribute Specification

This directory contains the 32 total crafted opossums (24 Sacred Large Jills and 8 Compact Jacks). All characters share the CC BY-SA 4.0 International license and adhere to the 75,000,000,000% Ultra-Broad Protection Standard.

## Implementation Standard: "The Textbook Architecture"
Every crafted opossum adheres to the modular 5-unit textbook implementation:
1. **Unit I: Morphometrics**: High-precision biometric profiles and physical dimensions.
2. **Unit II: Kinematics**: Gait analysis, joint velocity vectors, and RK4 integration.
3. **Unit III: Acoustics**: 64-bit IEEE 754 DSP audio synthesis for chatter and vocalizations.
4. **Unit IV: Geometry**: Bezier spline surfaces and pattern lattice evaluation.
5. **Unit V: Lore Ecosystem**: Diverse character history, ethics, vocational safety advocacy, and ecosystem conservation profiles.

## Master Design Attributes Integration
All 32 opossums are fully registered in `System/Registry/Characters/Opossums/Attributes/Design/index.tsx` across 39 distinct lookup maps:
- `Skin_Color`, `With_Patterns`, `Fur_Color`, `Tail_Color`, `Tail_Color_With_Design`, `Nose_Color`
- `Shoulder_Height`, `Body_Width`, `Body_Length_excluding_head_and_tail`, `Full_Body_Length`, `Head_Width`
- `Head_Height_excluding_ears`, `Full_Head_Height`, `Total_Height_excluding_ears`, `Total_Height`
- `Eye_Color`, `Snout_Length`, `Furry_Face`, `Accessories`, `Tail_Length`, `Ear_Orientation`, `Ear_Length`
- `Paw_Color`, `Paw_Pad_Color`, `Ear_Color`, `Inner_Ear_Color`, `Ear_Color_With_Patterns`, `Head_Fur_Color`
- `_Furry_Face_Color`, `Body_Fur_Thickness`, `Furry_Tail_Percentage`, `Paw_Size`, `Leg_Length`, `Paw_Width`
- `Leg_Width`, `Has_Elegant_Chatter`, `Has_Elegant_Trot`, `Tail_Thickness`, `Visual_Mapping`

## Standardized Sub-Package Hierarchy
- `Animations/`: 2D, 3D, Geometry, Pixelations, and Polygons datasets.
- `C_Plus_Plus/`: Native individual character C++ kernels.
- `Description/`: Lore and dimensional summaries (`Dimensions.ts`, `index.tsx`).
- `General/`: Core identity metadata.
- `Sounds/`: Audio synthesis modules.
- `Units/`: The 5-unit scientific core (`Unit_I_Morphometrics.ts` through `Unit_V_Lore_Ecosystem.ts`).

Refer to `STANDARDIZATION.md` for specific architectural constraints and protection rules.
