/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumCharacter, OpossumId } from "../../../../types";
import {
  MelissaOpossum,
  AshleyOpossum,
  AmaraQinOpossum,
  SaffronRoseOpossum,
  JalissaChinOpossum,
  ArdenRosieOpossum,
  JahmellaRoseOpossum,
  DagmarKoneReynoldsOpossum,
  AgapeRoseOpossum,
  RoxanneKoneReynoldsOpossum,
  TianaQinOpossum,
  WandaOpossum,
  OliviaChin,
  RuthKoneReynolds,
  KadyRose,
  SandraOpossum,
  drawIvan2D,
  drawIvan3D,
  drawIvanPolygons,
  drawIsaac2D,
  drawIsaac3D,
  drawIsaacPolygons
} from "../../../../Characters/Opossums";
import { AIGeneratedOpossum } from "../../../../Characters/Opossums/AI-Generated/Drawing";
import { CALLIE_ROSE_COLORS } from "../../../../Characters/Opossums/Callie_Rose/Animations/Color_Palette";
import { DAISY_ROSE_COLORS } from "../../../../Characters/Opossums/Daisy_Rose/Animations/Color_Palette";
import { STACEY_JASMIN_COLORS } from "../../../../Characters/Opossums/Stacey_Jasmin/Animations/Color_Palette";
import { ARNOLD_ROSE_COLORS } from "../../../../Characters/Opossums/Arnold_Rose/Animations";
import { DRAKE_COLOR_PALETTE } from "../../../../Characters/Opossums/Drake_Kone_Reynolds/Animations/Color_Palette";
import { RUDY_COLOR_PALETTE } from "../../../../Characters/Opossums/Rudy_Kone-Reynolds/Animations/Color_Palette";
import { EugeneRoseColorPalette } from "../../../../Characters/Opossums/Eugene_Rose/Animations/Color_Palette";
import { DALE_JASMINE_COLORS } from "../../../../Characters/Opossums/Dale_Jasmine/Animations/Color_Palette";
import { QI_JASMINE_COLORS } from "../../../../Characters/Opossums/Qi_Jasmine/Animations/Color_Palette";
import { JAMIE_JASMINE_COLORS } from "../../../../Characters/Opossums/Jamie_Jasmine/Animations/Color_Palette";
import { JACINTA_OPOSSUM_COLORS } from "../../../../Characters/Opossums/Jacinta_Opossum/Animations/Color_Palette";
import { CAMRYN_OPOSSUM_COLORS } from "../../../../Characters/Opossums/Camryn_Opossum/Animations/Color_Palette";
import { MelvinQinProfile } from "../../../../Characters/Opossums/Melvin_Qin/profile";
import { SaffordChinProfile } from "../../../../Characters/Opossums/Safford_Chin/profile";

export type CoatPatternKind =
  | "none"
  | "diamonds"
  | "circles"
  | "daisy_flowers"
  | "multi_flowers"
  | "green_roses"
  | "saddle_beagle"
  | "spotted_ovals"
  | "stripes_7_silver"
  | "stripes_48_brown"
  | "stripes_8_dark_brown";

export type EarOrientationKind =
  | "upright"
  | "forward_leaning"
  | "side_down"
  | "downward_dog";

export interface CraftedOpossumVisualProfile {
  id: OpossumId;
  bodyWidth: number;
  isCompact: boolean;
  furBaseColor: string;
  furOutlineColor: string;
  bootColor: string;
  headFurColor: string;
  skinColor: string;
  furryFacePercent: number;
  furryFaceColor: string;
  eyeColor: string;
  noseColor: string;
  snoutFactor: number;
  outerEarColor: string;
  innerEarColor: string;
  earOrientation: EarOrientationKind;
  earLengthScale: number;
  earPattern: "none" | "diamonds" | "polka_dots" | "bronze_circles";
  earPatternColors: string[];
  tailColor: string;
  tailWidth: number;
  tailLengthScale: number;
  tailSpiralColor?: string;
  tailFurryPercent: number;
  pawColor: string;
  pawPadColor: string;
  coatPattern: CoatPatternKind;
  patternColors: string[];
  patternBorderColor?: string;
  tiaraColor?: string;
  tiaraGemColor?: string;
  tiaraGemShape?: "circle" | "vertical_oval" | "heart" | "sun_diamond";
  necklaceColor?: string;
  necklaceCharmColor?: string;
  necklaceCharmShape?: "diamond" | "circle" | "heart" | "flower";
  earringsColor?: string;
  glassesStyle?: "circular_white_gold_brass";
}

export const CRAFTED_OPOSSUM_VISUAL_PROFILES: Record<OpossumId, CraftedOpossumVisualProfile> = {
  [OpossumId.MELISSA]: {
    id: OpossumId.MELISSA,
    bodyWidth: 36,
    isCompact: false,
    furBaseColor: "#d3d3d3",
    furOutlineColor: "#6b7280",
    bootColor: "#9ca3af",
    headFurColor: "#d3d3d3",
    skinColor: "#f9fafb",
    furryFacePercent: 0,
    furryFaceColor: "#f9fafb",
    eyeColor: "#3b82f6",
    noseColor: "#fda4af",
    snoutFactor: 1.0,
    outerEarColor: "#4b5563",
    innerEarColor: "#fda4af",
    earOrientation: "upright",
    earLengthScale: 1.0,
    earPattern: "none",
    earPatternColors: [],
    tailColor: "#fda4af",
    tailWidth: 4.0,
    tailLengthScale: 1.0,
    tailFurryPercent: 0,
    pawColor: "#9ca3af",
    pawPadColor: "#fbcfe8",
    coatPattern: "none",
    patternColors: []
  },
  [OpossumId.ASHLEY]: {
    id: OpossumId.ASHLEY,
    bodyWidth: 38,
    isCompact: false,
    furBaseColor: "#facc15",
    furOutlineColor: "#ca8a04",
    bootColor: "#eab308",
    headFurColor: "#facc15",
    skinColor: "#f9fafb",
    furryFacePercent: 0,
    furryFaceColor: "#f9fafb",
    eyeColor: "#4ade80",
    noseColor: "#ffb6c1",
    snoutFactor: 1.0,
    outerEarColor: "#111827",
    innerEarColor: "#e11d48",
    earOrientation: "forward_leaning",
    earLengthScale: 1.0,
    earPattern: "none",
    earPatternColors: [],
    tailColor: "#ffb6c1",
    tailWidth: 4.0,
    tailLengthScale: 1.0,
    tailFurryPercent: 0,
    pawColor: "#facc15",
    pawPadColor: "#fb7185",
    coatPattern: "none",
    patternColors: []
  },
  [OpossumId.AMARA_QIN]: {
    id: OpossumId.AMARA_QIN,
    bodyWidth: 36,
    isCompact: false,
    furBaseColor: "#ffffff",
    furOutlineColor: "#d1d5db",
    bootColor: "#e5e7eb",
    headFurColor: "#ffffff",
    skinColor: "#ffffff",
    furryFacePercent: 0,
    furryFaceColor: "#ffffff",
    eyeColor: "#3b82f6",
    noseColor: "#f9a8d4",
    snoutFactor: 1.0,
    outerEarColor: "#ffffff",
    innerEarColor: "#f9a8d4",
    earOrientation: "upright",
    earLengthScale: 1.0,
    earPattern: "none",
    earPatternColors: [],
    tailColor: "#f9a8d4",
    tailWidth: 4.0,
    tailLengthScale: 1.0,
    tailFurryPercent: 0,
    pawColor: "#ffffff",
    pawPadColor: "#fbcfe8",
    coatPattern: "none",
    patternColors: []
  },
  [OpossumId.SAFFRON_ROSE]: {
    id: OpossumId.SAFFRON_ROSE,
    bodyWidth: 48,
    isCompact: false,
    furBaseColor: "#ff5f1f",
    furOutlineColor: "#c03a00",
    bootColor: "#ea580c",
    headFurColor: "#ff5f1f",
    skinColor: "#f5deb3",
    furryFacePercent: 0,
    furryFaceColor: "#f5deb3",
    eyeColor: "#16a34a",
    noseColor: "#ff5f1f",
    snoutFactor: 1.0,
    outerEarColor: "#ff5f1f",
    innerEarColor: "#db2777",
    earOrientation: "upright",
    earLengthScale: 1.25,
    earPattern: "polka_dots",
    earPatternColors: ["#facc15"],
    tailColor: "#ffd700",
    tailWidth: 5.5,
    tailLengthScale: 1.15,
    tailSpiralColor: "#ff69b4",
    tailFurryPercent: 0,
    pawColor: "#ff5f1f",
    pawPadColor: "#fb7185",
    coatPattern: "none",
    patternColors: [],
    necklaceColor: "#ffd700",
    necklaceCharmColor: "#ff1493",
    necklaceCharmShape: "heart",
    earringsColor: "#ffd700"
  },
  [OpossumId.JALISSA_CHIN]: {
    id: OpossumId.JALISSA_CHIN,
    bodyWidth: 37.5,
    isCompact: false,
    furBaseColor: "#ff9933",
    furOutlineColor: "#c2410c",
    bootColor: "#ea580c",
    headFurColor: "#ff9933",
    skinColor: "#f9fafb",
    furryFacePercent: 0,
    furryFaceColor: "#f9fafb",
    eyeColor: "#1e3a8a",
    noseColor: "#db2777",
    snoutFactor: 1.0,
    outerEarColor: "#ff9933",
    innerEarColor: "#fb923c",
    earOrientation: "upright",
    earLengthScale: 1.0,
    earPattern: "none",
    earPatternColors: [],
    tailColor: "#db2777",
    tailWidth: 4.5,
    tailLengthScale: 1.0,
    tailFurryPercent: 0,
    pawColor: "#fb923c",
    pawPadColor: "#fda4af",
    coatPattern: "none",
    patternColors: [],
    tiaraColor: "#f472b6",
    tiaraGemColor: "#ef4444",
    tiaraGemShape: "heart",
    necklaceColor: "#e2e8f0",
    necklaceCharmColor: "#10b981",
    necklaceCharmShape: "diamond",
    earringsColor: "#10b981"
  },
  [OpossumId.ARDEN_ROSIE]: {
    id: OpossumId.ARDEN_ROSIE,
    bodyWidth: 38,
    isCompact: false,
    furBaseColor: "#fff7ed",
    furOutlineColor: "#d97706",
    bootColor: "#fed7aa",
    headFurColor: "#fff7ed",
    skinColor: "#ffedd5",
    furryFacePercent: 0,
    furryFaceColor: "#ffedd5",
    eyeColor: "#7dd3fc",
    noseColor: "#db2777",
    snoutFactor: 1.0,
    outerEarColor: "#fff7ed",
    innerEarColor: "#db2777",
    earOrientation: "upright",
    earLengthScale: 1.0,
    earPattern: "none",
    earPatternColors: [],
    tailColor: "#db2777",
    tailWidth: 4.12,
    tailLengthScale: 1.0,
    tailFurryPercent: 0,
    pawColor: "#fff7ed",
    pawPadColor: "#be185d",
    coatPattern: "diamonds",
    patternColors: ["#f43f5e", "#3b82f6", "#eab308", "#10b981"],
    patternBorderColor: "#374151",
    necklaceColor: "#ffd700",
    necklaceCharmColor: "#ffd700",
    necklaceCharmShape: "heart",
    earringsColor: "#ffd700"
  },
  [OpossumId.JAHMELLA_ROSE]: {
    id: OpossumId.JAHMELLA_ROSE,
    bodyWidth: 40,
    isCompact: false,
    furBaseColor: "#f97316",
    furOutlineColor: "#c2410c",
    bootColor: "#ea580c",
    headFurColor: "#f97316",
    skinColor: "#d2b48c",
    furryFacePercent: 0,
    furryFaceColor: "#d2b48c",
    eyeColor: "#4ade80",
    noseColor: "#ea580c",
    snoutFactor: 1.0,
    outerEarColor: "#f97316",
    innerEarColor: "#ea580c",
    earOrientation: "upright",
    earLengthScale: 1.05,
    earPattern: "none",
    earPatternColors: [],
    tailColor: "#db2777",
    tailWidth: 4.2,
    tailLengthScale: 1.2,
    tailSpiralColor: "#ffd700",
    tailFurryPercent: 0,
    pawColor: "#ffffff",
    pawPadColor: "#fb7185",
    coatPattern: "circles",
    patternColors: ["#ffffff"],
    patternBorderColor: "#ea580c",
    necklaceColor: "#ffd700",
    necklaceCharmColor: "#ffd700",
    necklaceCharmShape: "flower",
    earringsColor: "#ffd700"
  },
  [OpossumId.DAGMAR_KONE_REYNOLDS]: {
    id: OpossumId.DAGMAR_KONE_REYNOLDS,
    bodyWidth: 40,
    isCompact: false,
    furBaseColor: "#ffffff",
    furOutlineColor: "#9ca3af",
    bootColor: "#f3f4f6",
    headFurColor: "#ffffff",
    skinColor: "#ffedd5",
    furryFacePercent: 0,
    furryFaceColor: "#ffedd5",
    eyeColor: "#4ade80",
    noseColor: "#f9a8d4",
    snoutFactor: 1.0,
    outerEarColor: "#ffffff",
    innerEarColor: "#f9a8d4",
    earOrientation: "upright",
    earLengthScale: 1.2,
    earPattern: "diamonds",
    earPatternColors: ["#fff7ed"],
    tailColor: "#f9a8d4",
    tailWidth: 4.0,
    tailLengthScale: 1.1,
    tailSpiralColor: "#cbd5e1",
    tailFurryPercent: 0,
    pawColor: "#ffffff",
    pawPadColor: "#f9a8d4",
    coatPattern: "diamonds",
    patternColors: ["#ec4899", "#3b82f6", "#eab308", "#10b981", "#a855f7"],
    patternBorderColor: "#f59e0b",
    necklaceColor: "#e2e8f0",
    necklaceCharmColor: "#93c5fd",
    necklaceCharmShape: "diamond",
    earringsColor: "#f472b6"
  },
  [OpossumId.AGAPE_ROSE]: {
    id: OpossumId.AGAPE_ROSE,
    bodyWidth: 42,
    isCompact: false,
    furBaseColor: "#eab308",
    furOutlineColor: "#a16207",
    bootColor: "#ca8a04",
    headFurColor: "#eab308",
    skinColor: "#5c3d2e",
    furryFacePercent: 0,
    furryFaceColor: "#5c3d2e",
    eyeColor: "#4ade80",
    noseColor: "#db2777",
    snoutFactor: 1.0,
    outerEarColor: "#eab308",
    innerEarColor: "#db2777",
    earOrientation: "forward_leaning",
    earLengthScale: 1.0,
    earPattern: "none",
    earPatternColors: [],
    tailColor: "#db2777",
    tailWidth: 4.0,
    tailLengthScale: 1.05,
    tailFurryPercent: 2,
    pawColor: "#f97316",
    pawPadColor: "#f472b6",
    coatPattern: "circles",
    patternColors: ["#f472b6"],
    patternBorderColor: "#7e22ce",
    tiaraColor: "#e2e8f0",
    tiaraGemColor: "#ffffff",
    tiaraGemShape: "circle",
    necklaceColor: "#ffd700",
    necklaceCharmColor: "#ffd700",
    necklaceCharmShape: "flower",
    earringsColor: "#ffd700"
  },
  [OpossumId.ROXANNE_KONE_REYNOLDS]: {
    id: OpossumId.ROXANNE_KONE_REYNOLDS,
    bodyWidth: 45,
    isCompact: false,
    furBaseColor: "#facc15",
    furOutlineColor: "#ca8a04",
    bootColor: "#eab308",
    headFurColor: "#facc15",
    skinColor: "#3f271d",
    furryFacePercent: 1,
    furryFaceColor: "#facc15",
    eyeColor: "#1e3a8a",
    noseColor: "#ff69b4",
    snoutFactor: 1.0,
    outerEarColor: "#facc15",
    innerEarColor: "#b48372",
    earOrientation: "upright",
    earLengthScale: 1.0,
    earPattern: "diamonds",
    earPatternColors: ["#dc2626"],
    tailColor: "#f472b6",
    tailWidth: 4.6,
    tailLengthScale: 1.1,
    tailFurryPercent: 0.0001,
    pawColor: "#dc2626",
    pawPadColor: "#fb7185",
    coatPattern: "diamonds",
    patternColors: ["#3b82f6", "#10b981", "#ec4899", "#a855f7", "#ffffff"],
    patternBorderColor: "#ea580c",
    necklaceColor: "#ffd700",
    necklaceCharmColor: "#dc2626",
    necklaceCharmShape: "flower",
    earringsColor: "#ffd700"
  },
  [OpossumId.TIANA_QIN]: {
    id: OpossumId.TIANA_QIN,
    bodyWidth: 38,
    isCompact: false,
    furBaseColor: "#ef4444",
    furOutlineColor: "#b91c1c",
    bootColor: "#dc2626",
    headFurColor: "#ef4444",
    skinColor: "#d97706",
    furryFacePercent: 0,
    furryFaceColor: "#d97706",
    eyeColor: "#3b82f6",
    noseColor: "#f472b6",
    snoutFactor: 1.0,
    outerEarColor: "#ef4444",
    innerEarColor: "#f472b6",
    earOrientation: "upright",
    earLengthScale: 1.0,
    earPattern: "none",
    earPatternColors: [],
    tailColor: "#f472b6",
    tailWidth: 4.2,
    tailLengthScale: 1.0,
    tailFurryPercent: 0,
    pawColor: "#facc15",
    pawPadColor: "#fbcfe8",
    coatPattern: "none",
    patternColors: [],
    earringsColor: "#16a34a"
  },
  [OpossumId.WANDA]: {
    id: OpossumId.WANDA,
    bodyWidth: 36,
    isCompact: false,
    furBaseColor: "#f59e0b",
    furOutlineColor: "#b45309",
    bootColor: "#d97706",
    headFurColor: "#f59e0b",
    skinColor: "#5c3d2e",
    furryFacePercent: 0.0001,
    furryFaceColor: "#5c3d2e",
    eyeColor: "#4f46e5",
    noseColor: "#ef4444",
    snoutFactor: 0.95,
    outerEarColor: "#f59e0b",
    innerEarColor: "#7c2d12",
    earOrientation: "upright",
    earLengthScale: 1.18,
    earPattern: "none",
    earPatternColors: [],
    tailColor: "#ef4444",
    tailWidth: 4.2,
    tailLengthScale: 1.0,
    tailFurryPercent: 0,
    pawColor: "#f59e0b",
    pawPadColor: "#ef4444",
    coatPattern: "none",
    patternColors: []
  },
  [OpossumId.OLIVIA_CHIN]: {
    id: OpossumId.OLIVIA_CHIN,
    bodyWidth: 38,
    isCompact: false,
    furBaseColor: "#fef08a",
    furOutlineColor: "#eab308",
    bootColor: "#facc15",
    headFurColor: "#fef08a",
    skinColor: "#8d5524",
    furryFacePercent: 0.00001,
    furryFaceColor: "#8d5524",
    eyeColor: "#4f46e5",
    noseColor: "#7c2d12",
    snoutFactor: 1.0,
    outerEarColor: "#fef08a",
    innerEarColor: "#7c2d12",
    earOrientation: "upright",
    earLengthScale: 1.0,
    earPattern: "none",
    earPatternColors: [],
    tailColor: "#7c2d12",
    tailWidth: 4.2,
    tailLengthScale: 1.0,
    tailFurryPercent: 0,
    pawColor: "#f59e0b",
    pawPadColor: "#fb7185",
    coatPattern: "none",
    patternColors: []
  },
  [OpossumId.RUTH_KONE_REYNOLDS]: {
    id: OpossumId.RUTH_KONE_REYNOLDS,
    bodyWidth: 45,
    isCompact: false,
    furBaseColor: "#f472b6",
    furOutlineColor: "#db2777",
    bootColor: "#ec4899",
    headFurColor: "#f472b6",
    skinColor: "#5c3d2e",
    furryFacePercent: 0,
    furryFaceColor: "#5c3d2e",
    eyeColor: "#38bdf8",
    noseColor: "#fbcfe8",
    snoutFactor: 1.0,
    outerEarColor: "#f472b6",
    innerEarColor: "#7c2d12",
    earOrientation: "upright",
    earLengthScale: 1.0,
    earPattern: "diamonds",
    earPatternColors: ["#ef4444", "#f97316", "#facc15", "#4ade80", "#60a5fa", "#c084fc"],
    tailColor: "#f472b6",
    tailWidth: 4.5,
    tailLengthScale: 1.1,
    tailFurryPercent: 0,
    pawColor: "#fb923c",
    pawPadColor: "#f472b6",
    coatPattern: "multi_flowers",
    patternColors: ["#ef4444", "#f97316", "#facc15", "#4ade80", "#60a5fa", "#c084fc"],
    necklaceColor: "#facc15",
    necklaceCharmColor: "#ffd700",
    necklaceCharmShape: "flower",
    earringsColor: "#facc15"
  },
  [OpossumId.KADY_ROSE]: {
    id: OpossumId.KADY_ROSE,
    bodyWidth: 48,
    isCompact: false,
    furBaseColor: "#d3d3d3",
    furOutlineColor: "#6b7280",
    bootColor: "#9ca3af",
    headFurColor: "#d3d3d3",
    skinColor: "#5c3d2e",
    furryFacePercent: 0,
    furryFaceColor: "#5c3d2e",
    eyeColor: "#4ade80",
    noseColor: "#f97316",
    snoutFactor: 1.0,
    outerEarColor: "#d3d3d3",
    innerEarColor: "#7c2d12",
    earOrientation: "upright",
    earLengthScale: 1.25,
    earPattern: "bronze_circles",
    earPatternColors: ["#b45309"],
    tailColor: "#f97316",
    tailWidth: 4.5,
    tailLengthScale: 1.1,
    tailFurryPercent: 0,
    pawColor: "#f59e0b",
    pawPadColor: "#fb7185",
    coatPattern: "none",
    patternColors: [],
    necklaceColor: "#ef4444",
    necklaceCharmColor: "#f472b6",
    necklaceCharmShape: "heart",
    earringsColor: "#ffd700"
  },
  [OpossumId.SANDRA]: {
    id: OpossumId.SANDRA,
    bodyWidth: 38,
    isCompact: false,
    furBaseColor: "#c084fc",
    furOutlineColor: "#9333ea",
    bootColor: "#a855f7",
    headFurColor: "#c084fc",
    skinColor: "#8d5524",
    furryFacePercent: 0.0000000001,
    furryFaceColor: "#8d5524",
    eyeColor: "#1e3a8a",
    noseColor: "#f9a8d4",
    snoutFactor: 1.03,
    outerEarColor: "#c084fc",
    innerEarColor: "#f9a8d4",
    earOrientation: "upright",
    earLengthScale: 1.08,
    earPattern: "none",
    earPatternColors: [],
    tailColor: "#f9a8d4",
    tailWidth: 4.5,
    tailLengthScale: 1.08,
    tailFurryPercent: 0,
    pawColor: "#fbcfe8",
    pawPadColor: "#f9a8d4",
    coatPattern: "none",
    patternColors: []
  },
  [OpossumId.DRAKE_KONE_REYNOLDS]: {
    id: OpossumId.DRAKE_KONE_REYNOLDS,
    bodyWidth: 28,
    isCompact: true,
    furBaseColor: DRAKE_COLOR_PALETTE.baseFur,
    furOutlineColor: "#991b1b",
    bootColor: "#b91c1c",
    headFurColor: DRAKE_COLOR_PALETTE.baseFur,
    skinColor: DRAKE_COLOR_PALETTE.skinTone,
    furryFacePercent: 30,
    furryFaceColor: DRAKE_COLOR_PALETTE.faceFur,
    eyeColor: DRAKE_COLOR_PALETTE.eyes,
    noseColor: DRAKE_COLOR_PALETTE.nose,
    snoutFactor: 0.9,
    outerEarColor: DRAKE_COLOR_PALETTE.outerEar,
    innerEarColor: DRAKE_COLOR_PALETTE.innerEar,
    earOrientation: "forward_leaning",
    earLengthScale: 0.92,
    earPattern: "none",
    earPatternColors: [],
    tailColor: DRAKE_COLOR_PALETTE.tail,
    tailWidth: 3.8,
    tailLengthScale: 0.7,
    tailFurryPercent: 5,
    pawColor: DRAKE_COLOR_PALETTE.paws,
    pawPadColor: DRAKE_COLOR_PALETTE.pawPads,
    coatPattern: "stripes_7_silver",
    patternColors: [DRAKE_COLOR_PALETTE.stripes],
    patternBorderColor: DRAKE_COLOR_PALETTE.stripeBorder
  },
  [OpossumId.RUDY_KONE_REYNOLDS]: {
    id: OpossumId.RUDY_KONE_REYNOLDS,
    bodyWidth: 27,
    isCompact: true,
    furBaseColor: RUDY_COLOR_PALETTE.baseFur,
    furOutlineColor: "#ca8a04",
    bootColor: "#eab308",
    headFurColor: RUDY_COLOR_PALETTE.baseFur,
    skinColor: RUDY_COLOR_PALETTE.skinTone,
    furryFacePercent: 30,
    furryFaceColor: RUDY_COLOR_PALETTE.faceFur,
    eyeColor: RUDY_COLOR_PALETTE.eyes,
    noseColor: RUDY_COLOR_PALETTE.nose,
    snoutFactor: 1.0,
    outerEarColor: RUDY_COLOR_PALETTE.outerEar,
    innerEarColor: RUDY_COLOR_PALETTE.innerEar,
    earOrientation: "side_down",
    earLengthScale: 0.8,
    earPattern: "none",
    earPatternColors: [],
    tailColor: RUDY_COLOR_PALETTE.tail,
    tailWidth: 3.6,
    tailLengthScale: 0.65,
    tailFurryPercent: 7.128,
    pawColor: RUDY_COLOR_PALETTE.paws,
    pawPadColor: "#fb7185",
    coatPattern: "circles",
    patternColors: [RUDY_COLOR_PALETTE.circlePattern],
    patternBorderColor: RUDY_COLOR_PALETTE.circleBorder
  },
  [OpossumId.EUGENE_ROSE]: {
    id: OpossumId.EUGENE_ROSE,
    bodyWidth: 28,
    isCompact: true,
    furBaseColor: EugeneRoseColorPalette.bodyFur,
    furOutlineColor: "#4b5563",
    bootColor: "#6b7280",
    headFurColor: EugeneRoseColorPalette.bodyFur,
    skinColor: EugeneRoseColorPalette.skin,
    furryFacePercent: 100,
    furryFaceColor: EugeneRoseColorPalette.bodyFur,
    eyeColor: EugeneRoseColorPalette.eye,
    noseColor: EugeneRoseColorPalette.nose,
    snoutFactor: 1.0,
    outerEarColor: EugeneRoseColorPalette.outerEar,
    innerEarColor: EugeneRoseColorPalette.innerEar,
    earOrientation: "upright",
    earLengthScale: 0.95,
    earPattern: "none",
    earPatternColors: [],
    tailColor: EugeneRoseColorPalette.tail,
    tailWidth: 3.6,
    tailLengthScale: 0.9,
    tailFurryPercent: 0,
    pawColor: EugeneRoseColorPalette.paw,
    pawPadColor: EugeneRoseColorPalette.pawPad,
    coatPattern: "none",
    patternColors: []
  },
  [OpossumId.DAISY_ROSE]: {
    id: OpossumId.DAISY_ROSE,
    bodyWidth: 44,
    isCompact: false,
    furBaseColor: DAISY_ROSE_COLORS.bodyBase,
    furOutlineColor: "#be185d",
    bootColor: "#db2777",
    headFurColor: DAISY_ROSE_COLORS.bodyBase,
    skinColor: DAISY_ROSE_COLORS.skin,
    furryFacePercent: 0,
    furryFaceColor: DAISY_ROSE_COLORS.skin,
    eyeColor: DAISY_ROSE_COLORS.eyes,
    noseColor: DAISY_ROSE_COLORS.nose,
    snoutFactor: 1.0,
    outerEarColor: DAISY_ROSE_COLORS.outerEar,
    innerEarColor: DAISY_ROSE_COLORS.innerEar,
    earOrientation: "upright",
    earLengthScale: 1.25,
    earPattern: "none",
    earPatternColors: [],
    tailColor: DAISY_ROSE_COLORS.tailBase,
    tailWidth: 4.8,
    tailLengthScale: 1.3,
    tailSpiralColor: DAISY_ROSE_COLORS.tailSpiral,
    tailFurryPercent: 0,
    pawColor: DAISY_ROSE_COLORS.paws,
    pawPadColor: DAISY_ROSE_COLORS.pawPads,
    coatPattern: "daisy_flowers",
    patternColors: [DAISY_ROSE_COLORS.flowerDaisy],
    patternBorderColor: DAISY_ROSE_COLORS.flowerBorder,
    tiaraColor: DAISY_ROSE_COLORS.tiara,
    tiaraGemColor: DAISY_ROSE_COLORS.tiaraGem,
    tiaraGemShape: "sun_diamond",
    necklaceColor: DAISY_ROSE_COLORS.necklaceChain,
    necklaceCharmColor: DAISY_ROSE_COLORS.necklaceCharm,
    necklaceCharmShape: "diamond"
  },
  [OpossumId.CALLIE_ROSE]: {
    id: OpossumId.CALLIE_ROSE,
    bodyWidth: 40.5,
    isCompact: false,
    furBaseColor: CALLIE_ROSE_COLORS.bodyBase,
    furOutlineColor: "#a16207",
    bootColor: "#ca8a04",
    headFurColor: CALLIE_ROSE_COLORS.bodyBase,
    skinColor: CALLIE_ROSE_COLORS.skin,
    furryFacePercent: 0,
    furryFaceColor: CALLIE_ROSE_COLORS.skin,
    eyeColor: CALLIE_ROSE_COLORS.eyes,
    noseColor: CALLIE_ROSE_COLORS.nose,
    snoutFactor: 1.0,
    outerEarColor: CALLIE_ROSE_COLORS.outerEar,
    innerEarColor: CALLIE_ROSE_COLORS.innerEar,
    earOrientation: "upright",
    earLengthScale: 1.3,
    earPattern: "none",
    earPatternColors: [],
    tailColor: CALLIE_ROSE_COLORS.tailBase,
    tailWidth: 4.6,
    tailLengthScale: 1.1,
    tailFurryPercent: 0,
    pawColor: CALLIE_ROSE_COLORS.paws,
    pawPadColor: CALLIE_ROSE_COLORS.pawPads,
    coatPattern: "circles",
    patternColors: [CALLIE_ROSE_COLORS.circlePattern],
    patternBorderColor: CALLIE_ROSE_COLORS.circleBorder,
    tiaraColor: CALLIE_ROSE_COLORS.tiara,
    tiaraGemColor: CALLIE_ROSE_COLORS.tiaraGem,
    tiaraGemShape: "vertical_oval",
    necklaceColor: CALLIE_ROSE_COLORS.necklaceChain,
    necklaceCharmColor: CALLIE_ROSE_COLORS.necklaceCharm,
    necklaceCharmShape: "circle",
    glassesStyle: "circular_white_gold_brass"
  },
  [OpossumId.STACEY_JASMIN]: {
    id: OpossumId.STACEY_JASMIN,
    bodyWidth: 38.5,
    isCompact: false,
    furBaseColor: STACEY_JASMIN_COLORS.bodyBase,
    furOutlineColor: "#581c87",
    bootColor: "#6b21a8",
    headFurColor: STACEY_JASMIN_COLORS.bodyBase,
    skinColor: STACEY_JASMIN_COLORS.skin,
    furryFacePercent: 0,
    furryFaceColor: STACEY_JASMIN_COLORS.skin,
    eyeColor: STACEY_JASMIN_COLORS.eyes,
    noseColor: STACEY_JASMIN_COLORS.nose,
    snoutFactor: 1.0,
    outerEarColor: STACEY_JASMIN_COLORS.outerEar,
    innerEarColor: STACEY_JASMIN_COLORS.innerEar,
    earOrientation: "upright",
    earLengthScale: 1.05,
    earPattern: "none",
    earPatternColors: [],
    tailColor: STACEY_JASMIN_COLORS.tailBase,
    tailWidth: 4.5,
    tailLengthScale: 1.05,
    tailFurryPercent: 0,
    pawColor: STACEY_JASMIN_COLORS.paws,
    pawPadColor: STACEY_JASMIN_COLORS.pawPads,
    coatPattern: "saddle_beagle",
    patternColors: [STACEY_JASMIN_COLORS.saddlePattern],
    tiaraColor: STACEY_JASMIN_COLORS.tiara,
    tiaraGemColor: STACEY_JASMIN_COLORS.tiaraGem,
    tiaraGemShape: "circle"
  },
  [OpossumId.ARNOLD_ROSE]: {
    id: OpossumId.ARNOLD_ROSE,
    bodyWidth: 28,
    isCompact: true,
    furBaseColor: ARNOLD_ROSE_COLORS.bodyBase,
    furOutlineColor: "#3f271d",
    bootColor: "#d6d3d1",
    headFurColor: ARNOLD_ROSE_COLORS.bodyBase,
    skinColor: ARNOLD_ROSE_COLORS.skin,
    furryFacePercent: 5,
    furryFaceColor: "#3f271d",
    eyeColor: ARNOLD_ROSE_COLORS.eyes,
    noseColor: ARNOLD_ROSE_COLORS.nose,
    snoutFactor: 1.0,
    outerEarColor: ARNOLD_ROSE_COLORS.outerEar,
    innerEarColor: ARNOLD_ROSE_COLORS.innerEar,
    earOrientation: "forward_leaning",
    earLengthScale: 0.9,
    earPattern: "none",
    earPatternColors: [],
    tailColor: "#f9a8d4",
    tailWidth: 3.6,
    tailLengthScale: 0.85,
    tailFurryPercent: 0,
    pawColor: ARNOLD_ROSE_COLORS.paws,
    pawPadColor: ARNOLD_ROSE_COLORS.pawPads,
    coatPattern: "spotted_ovals",
    patternColors: [ARNOLD_ROSE_COLORS.ovalPattern]
  },
  [OpossumId.MELVIN_QIN]: {
    id: OpossumId.MELVIN_QIN,
    bodyWidth: 34,
    isCompact: true,
    furBaseColor: MelvinQinProfile.color.hex,
    furOutlineColor: "#8b4513",
    bootColor: "#b8956a",
    headFurColor: MelvinQinProfile.color.hex,
    skinColor: MelvinQinProfile.skinHex,
    furryFacePercent: 50,
    furryFaceColor: MelvinQinProfile.color.hex,
    eyeColor: MelvinQinProfile.eyeHex,
    noseColor: MelvinQinProfile.noseHex,
    snoutFactor: 1.0,
    outerEarColor: MelvinQinProfile.earColor.outerHex,
    innerEarColor: MelvinQinProfile.earColor.innerHex,
    earOrientation: "downward_dog",
    earLengthScale: 1.0,
    earPattern: "none",
    earPatternColors: [],
    tailColor: MelvinQinProfile.tail.hex,
    tailWidth: 3.8,
    tailLengthScale: 0.9,
    tailFurryPercent: 0,
    pawColor: MelvinQinProfile.pawHex,
    pawPadColor: MelvinQinProfile.pawPadHex,
    coatPattern: "none",
    patternColors: []
  },
  [OpossumId.SAFFORD_CHIN]: {
    id: OpossumId.SAFFORD_CHIN,
    bodyWidth: 28.5,
    isCompact: true,
    furBaseColor: SaffordChinProfile.color.hex,
    furOutlineColor: "#2563eb",
    bootColor: "#60a5fa",
    headFurColor: SaffordChinProfile.color.hex,
    skinColor: SaffordChinProfile.skinHex,
    furryFacePercent: 2,
    furryFaceColor: SaffordChinProfile.color.hex,
    eyeColor: SaffordChinProfile.eyeHex,
    noseColor: SaffordChinProfile.noseHex,
    snoutFactor: 1.0,
    outerEarColor: SaffordChinProfile.earColor.outerHex,
    innerEarColor: SaffordChinProfile.earColor.innerHex,
    earOrientation: "upright",
    earLengthScale: 0.95,
    earPattern: "none",
    earPatternColors: [],
    tailColor: SaffordChinProfile.tail.hex,
    tailWidth: 3.7,
    tailLengthScale: 0.9,
    tailFurryPercent: 0,
    pawColor: SaffordChinProfile.pawHex,
    pawPadColor: SaffordChinProfile.pawPadHex,
    coatPattern: "none",
    patternColors: []
  },
  [OpossumId.IVAN_OPOSSUM]: {
    id: OpossumId.IVAN_OPOSSUM,
    bodyWidth: 28,
    isCompact: true,
    furBaseColor: "#ffc0cb",
    furOutlineColor: "#5c3d2e",
    bootColor: "#f472b6",
    headFurColor: "#ffd1dc",
    skinColor: "#ffd1dc",
    furryFacePercent: 100,
    furryFaceColor: "#ffd1dc",
    eyeColor: "#795548",
    noseColor: "#ef4444",
    snoutFactor: 1.0,
    outerEarColor: "#121212",
    innerEarColor: "#3e2723",
    earOrientation: "upright",
    earLengthScale: 0.9,
    earPattern: "none",
    earPatternColors: [],
    tailColor: "#dc2626",
    tailWidth: 3.5,
    tailLengthScale: 0.85,
    tailFurryPercent: 0,
    pawColor: "#d2b48c",
    pawPadColor: "#ffedd5",
    coatPattern: "stripes_48_brown",
    patternColors: ["#5c3d2e"]
  },
  [OpossumId.ISAAC_OPOSSUM]: {
    id: OpossumId.ISAAC_OPOSSUM,
    bodyWidth: 27.5,
    isCompact: true,
    furBaseColor: "#d1d5db",
    furOutlineColor: "#3e2723",
    bootColor: "#9ca3af",
    headFurColor: "#e5e7eb",
    skinColor: "#e5e7eb",
    furryFacePercent: 100,
    furryFaceColor: "#e5e7eb",
    eyeColor: "#3e2723",
    noseColor: "#ef4444",
    snoutFactor: 1.0,
    outerEarColor: "#1a1a1a",
    innerEarColor: "#ffb6c1",
    earOrientation: "upright",
    earLengthScale: 0.9,
    earPattern: "none",
    earPatternColors: [],
    tailColor: "#ffb6c1",
    tailWidth: 3.5,
    tailLengthScale: 0.85,
    tailFurryPercent: 0,
    pawColor: "#d2b48c",
    pawPadColor: "#fbcfe8",
    coatPattern: "stripes_8_dark_brown",
    patternColors: ["#3e2723"]
  },
  [OpossumId.DALE_JASMINE]: {
    id: OpossumId.DALE_JASMINE,
    bodyWidth: 38.88,
    isCompact: false,
    furBaseColor: DALE_JASMINE_COLORS.base,
    furOutlineColor: "#9333ea",
    bootColor: "#c084fc",
    headFurColor: DALE_JASMINE_COLORS.base,
    skinColor: DALE_JASMINE_COLORS.skin,
    furryFacePercent: 0,
    furryFaceColor: DALE_JASMINE_COLORS.skin,
    eyeColor: DALE_JASMINE_COLORS.eyes,
    noseColor: DALE_JASMINE_COLORS.nose,
    snoutFactor: 1.0,
    outerEarColor: DALE_JASMINE_COLORS.outerEar,
    innerEarColor: DALE_JASMINE_COLORS.innerEar,
    earOrientation: "upright",
    earLengthScale: 1.12,
    earPattern: "none",
    earPatternColors: [],
    tailColor: DALE_JASMINE_COLORS.tail,
    tailWidth: 4.3,
    tailLengthScale: 1.08,
    tailFurryPercent: 0,
    pawColor: DALE_JASMINE_COLORS.paws,
    pawPadColor: "#ffc0cb",
    coatPattern: "green_roses",
    patternColors: [DALE_JASMINE_COLORS.rosePattern],
    necklaceColor: "#ffd700",
    necklaceCharmColor: "#ffffff",
    necklaceCharmShape: "diamond"
  },
  [OpossumId.QI_JASMINE]: {
    id: OpossumId.QI_JASMINE,
    bodyWidth: 38.88,
    isCompact: false,
    furBaseColor: QI_JASMINE_COLORS.base,
    furOutlineColor: "#1d4ed8",
    bootColor: "#2563eb",
    headFurColor: QI_JASMINE_COLORS.base,
    skinColor: QI_JASMINE_COLORS.skin,
    furryFacePercent: 0,
    furryFaceColor: QI_JASMINE_COLORS.skin,
    eyeColor: QI_JASMINE_COLORS.eyes,
    noseColor: QI_JASMINE_COLORS.nose,
    snoutFactor: 1.0,
    outerEarColor: QI_JASMINE_COLORS.outerEar,
    innerEarColor: QI_JASMINE_COLORS.innerEar,
    earOrientation: "upright",
    earLengthScale: 1.0,
    earPattern: "none",
    earPatternColors: [],
    tailColor: QI_JASMINE_COLORS.tail,
    tailWidth: 4.3,
    tailLengthScale: 1.08,
    tailFurryPercent: 0,
    pawColor: QI_JASMINE_COLORS.paws,
    pawPadColor: "#ffc0cb",
    coatPattern: "circles",
    patternColors: [QI_JASMINE_COLORS.circlePattern],
    patternBorderColor: "#166534",
    necklaceColor: "#c0c0c0",
    necklaceCharmColor: "#ffffff",
    necklaceCharmShape: "circle"
  },
  [OpossumId.JAMIE_JASMINE]: {
    id: OpossumId.JAMIE_JASMINE,
    bodyWidth: 38.88,
    isCompact: false,
    furBaseColor: JAMIE_JASMINE_COLORS.base,
    furOutlineColor: "#6b7280",
    bootColor: "#9ca3af",
    headFurColor: JAMIE_JASMINE_COLORS.base,
    skinColor: JAMIE_JASMINE_COLORS.skin,
    furryFacePercent: 0,
    furryFaceColor: JAMIE_JASMINE_COLORS.skin,
    eyeColor: JAMIE_JASMINE_COLORS.eyes,
    noseColor: JAMIE_JASMINE_COLORS.nose,
    snoutFactor: 1.0,
    outerEarColor: JAMIE_JASMINE_COLORS.outerEar,
    innerEarColor: JAMIE_JASMINE_COLORS.innerEar,
    earOrientation: "upright",
    earLengthScale: 1.2,
    earPattern: "none",
    earPatternColors: [],
    tailColor: JAMIE_JASMINE_COLORS.tail,
    tailWidth: 4.3,
    tailLengthScale: 1.08,
    tailFurryPercent: 0,
    pawColor: JAMIE_JASMINE_COLORS.paws,
    pawPadColor: "#ff4500",
    coatPattern: "none",
    patternColors: []
  },
  [OpossumId.JACINTA_OPOSSUM]: {
    id: OpossumId.JACINTA_OPOSSUM,
    bodyWidth: 36,
    isCompact: false,
    furBaseColor: JACINTA_OPOSSUM_COLORS.base,
    furOutlineColor: "#991b1b",
    bootColor: "#dc2626",
    headFurColor: JACINTA_OPOSSUM_COLORS.base,
    skinColor: JACINTA_OPOSSUM_COLORS.skin,
    furryFacePercent: 0,
    furryFaceColor: JACINTA_OPOSSUM_COLORS.skin,
    eyeColor: JACINTA_OPOSSUM_COLORS.eyes,
    noseColor: JACINTA_OPOSSUM_COLORS.nose,
    snoutFactor: 1.0,
    outerEarColor: JACINTA_OPOSSUM_COLORS.outerEar,
    innerEarColor: JACINTA_OPOSSUM_COLORS.innerEar,
    earOrientation: "upright",
    earLengthScale: 1.0,
    earPattern: "none",
    earPatternColors: [],
    tailColor: JACINTA_OPOSSUM_COLORS.tail,
    tailWidth: 4.0,
    tailLengthScale: 1.0,
    tailFurryPercent: 0,
    pawColor: JACINTA_OPOSSUM_COLORS.paws,
    pawPadColor: "#ff4500",
    coatPattern: "none",
    patternColors: []
  },
  [OpossumId.CAMRYN_OPOSSUM]: {
    id: OpossumId.CAMRYN_OPOSSUM,
    bodyWidth: 36,
    isCompact: false,
    furBaseColor: CAMRYN_OPOSSUM_COLORS.base,
    furOutlineColor: "#16a34a",
    bootColor: "#4ade80",
    headFurColor: CAMRYN_OPOSSUM_COLORS.base,
    skinColor: CAMRYN_OPOSSUM_COLORS.skin,
    furryFacePercent: 0,
    furryFaceColor: CAMRYN_OPOSSUM_COLORS.skin,
    eyeColor: CAMRYN_OPOSSUM_COLORS.eyes,
    noseColor: CAMRYN_OPOSSUM_COLORS.nose,
    snoutFactor: 1.0,
    outerEarColor: CAMRYN_OPOSSUM_COLORS.outerEar,
    innerEarColor: CAMRYN_OPOSSUM_COLORS.innerEar,
    earOrientation: "upright",
    earLengthScale: 1.0,
    earPattern: "none",
    earPatternColors: [],
    tailColor: CAMRYN_OPOSSUM_COLORS.tail,
    tailWidth: 4.0,
    tailLengthScale: 1.0,
    tailFurryPercent: 0,
    pawColor: CAMRYN_OPOSSUM_COLORS.paws,
    pawPadColor: "#ffc0cb",
    coatPattern: "none",
    patternColors: []
  }
};

function normalizeOpossumIdKey(rawId: string | OpossumId): OpossumId | null {
  const key = String(rawId || "").trim().toLowerCase();
  if (key === "arden_rosie_kone_reynolds") return OpossumId.ARDEN_ROSIE;
  if (key in CRAFTED_OPOSSUM_VISUAL_PROFILES) {
    return key as OpossumId;
  }
  const values = Object.values(OpossumId) as string[];
  if (values.includes(key)) {
    return key as OpossumId;
  }
  return null;
}

export function resolveOpossumVisualProfile(opossum: OpossumCharacter): CraftedOpossumVisualProfile {
  const matchedId = normalizeOpossumIdKey(opossum?.id);
  if (matchedId) {
    return CRAFTED_OPOSSUM_VISUAL_PROFILES[matchedId];
  }

  const aiBody = opossum?.aiData?.bodyColor || opossum?.color || "#9ca3af";
  const isHex = typeof aiBody === "string" && aiBody.startsWith("#");
  const safeBody = isHex ? aiBody : "#9ca3af";

  return {
    id: OpossumId.MELISSA,
    bodyWidth: opossum?.width || 36,
    isCompact: false,
    furBaseColor: safeBody,
    furOutlineColor: "#4b5563",
    bootColor: safeBody,
    headFurColor: safeBody,
    skinColor: "#f9fafb",
    furryFacePercent: 0,
    furryFaceColor: "#f9fafb",
    eyeColor: "#3b82f6",
    noseColor: "#fda4af",
    snoutFactor: 1.0,
    outerEarColor: safeBody,
    innerEarColor: "#fda4af",
    earOrientation: "upright",
    earLengthScale: 1.0,
    earPattern: "none",
    earPatternColors: [],
    tailColor: "#fda4af",
    tailWidth: 4.0,
    tailLengthScale: 1.0,
    tailFurryPercent: 0,
    pawColor: safeBody,
    pawPadColor: "#fda4af",
    coatPattern: "none",
    patternColors: []
  };
}

export function resolveOpossumPrimaryColorHex(opossum: OpossumCharacter): string {
  return resolveOpossumVisualProfile(opossum).furBaseColor;
}

export function resolveRiderLegColors(opossum: OpossumCharacter): {
  furColor: string;
  bootColor: string;
  outlineColor: string;
} {
  const profile = resolveOpossumVisualProfile(opossum);
  return {
    furColor: profile.furBaseColor,
    bootColor: profile.bootColor,
    outlineColor: profile.furOutlineColor
  };
}

function drawCoatPatternInsideClip(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  profile: CraftedOpossumVisualProfile
) {
  if (profile.coatPattern === "none") return;

  ctx.save();
  ctx.beginPath();
  ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
  ctx.clip();

  if (profile.coatPattern === "circles") {
    const step = 12;
    const fillCol = profile.patternColors[0] || "#2563eb";
    const borderCol = profile.patternBorderColor || "#1e3a8a";
    for (let dx = -rx; dx <= rx; dx += step) {
      for (let dy = -ry; dy <= ry; dy += step) {
        const ox = cx + dx + (Math.round(dy / step) % 2 === 0 ? 4 : -2);
        const oy = cy + dy;
        ctx.fillStyle = fillCol;
        ctx.strokeStyle = borderCol;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.arc(ox, oy, 3.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }
    }
  } else if (profile.coatPattern === "daisy_flowers") {
    const petalCol = profile.patternColors[0] || "#eab308";
    const borderCol = profile.patternBorderColor || "#2563eb";
    const centers = [
      { dx: -rx * 0.48, dy: -ry * 0.35 },
      { dx: rx * 0.46, dy: -ry * 0.32 },
      { dx: 0, dy: -ry * 0.08 },
      { dx: -rx * 0.4, dy: ry * 0.4 },
      { dx: rx * 0.42, dy: ry * 0.38 }
    ];
    for (const c of centers) {
      const fx = cx + c.dx;
      const fy = cy + c.dy;
      ctx.fillStyle = petalCol;
      ctx.strokeStyle = borderCol;
      ctx.lineWidth = 1.0;
      for (let a = 0; a < 6; a++) {
        const ang = (a * Math.PI) / 3;
        ctx.beginPath();
        ctx.arc(fx + Math.cos(ang) * 3.1, fy + Math.sin(ang) * 3.1, 2.0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(fx, fy, 1.8, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (profile.coatPattern === "green_roses") {
    const roseCol = profile.patternColors[0] || "#228b22";
    const centers = [
      { dx: -rx * 0.48, dy: -ry * 0.3 },
      { dx: rx * 0.48, dy: -ry * 0.28 },
      { dx: 0, dy: 0 },
      { dx: -rx * 0.35, dy: ry * 0.42 },
      { dx: rx * 0.36, dy: ry * 0.42 }
    ];
    for (const c of centers) {
      const fx = cx + c.dx;
      const fy = cy + c.dy;
      ctx.fillStyle = roseCol;
      ctx.beginPath();
      ctx.arc(fx, fy, 4.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#14532d";
      ctx.lineWidth = 1.0;
      ctx.beginPath();
      ctx.arc(fx, fy, 2.2, 0, Math.PI * 1.6);
      ctx.stroke();
    }
  } else if (profile.coatPattern === "multi_flowers") {
    const palette = profile.patternColors;
    const step = 11;
    let idx = 0;
    for (let dx = -rx; dx <= rx; dx += step) {
      for (let dy = -ry; dy <= ry; dy += step) {
        ctx.fillStyle = palette[idx % palette.length];
        ctx.beginPath();
        ctx.arc(cx + dx, cy + dy, 3.0, 0, Math.PI * 2);
        ctx.fill();
        idx++;
      }
    }
  } else if (profile.coatPattern === "diamonds") {
    const palette = profile.patternColors;
    const borderCol = profile.patternBorderColor || "#374151";
    const step = 10;
    let idx = 0;
    for (let dx = -rx; dx <= rx; dx += step) {
      for (let dy = -ry; dy <= ry; dy += step) {
        ctx.fillStyle = palette[idx % palette.length];
        ctx.strokeStyle = borderCol;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(cx + dx, cy + dy - 3.4);
        ctx.lineTo(cx + dx + 3.4, cy + dy);
        ctx.lineTo(cx + dx, cy + dy + 3.4);
        ctx.lineTo(cx + dx - 3.4, cy + dy);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        idx++;
      }
    }
  } else if (profile.coatPattern === "saddle_beagle") {
    ctx.fillStyle = profile.patternColors[0] || "#eab308";
    ctx.beginPath();
    ctx.ellipse(cx, cy + ry * 0.05, rx * 0.72, ry * 0.56, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#ca8a04";
    ctx.lineWidth = 1.2;
    ctx.stroke();
  } else if (profile.coatPattern === "spotted_ovals") {
    const ovalCol = profile.patternColors[0] || "#3f271d";
    const spots = [
      { dx: -rx * 0.45, dy: -ry * 0.35, r: 0.35 },
      { dx: rx * 0.4, dy: -ry * 0.25, r: -0.4 },
      { dx: -rx * 0.1, dy: ry * 0.12, r: 0.2 },
      { dx: rx * 0.38, dy: ry * 0.42, r: 0.5 },
      { dx: -rx * 0.46, dy: ry * 0.38, r: -0.25 }
    ];
    ctx.fillStyle = ovalCol;
    for (const s of spots) {
      ctx.beginPath();
      ctx.ellipse(cx + s.dx, cy + s.dy, 4.4, 2.7, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (profile.coatPattern === "stripes_7_silver") {
    const stripeCol = profile.patternColors[0] || "#e2e8f0";
    const borderCol = profile.patternBorderColor || "#000000";
    for (let i = 0; i < 7; i++) {
      const sx = cx - rx * 0.78 + (i * (rx * 1.56)) / 6;
      ctx.fillStyle = stripeCol;
      ctx.strokeStyle = borderCol;
      ctx.lineWidth = 1.0;
      ctx.beginPath();
      ctx.ellipse(sx, cy, 2.2, ry * 0.88, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
  } else if (profile.coatPattern === "stripes_48_brown") {
    ctx.strokeStyle = profile.patternColors[0] || "#5c3d2e";
    ctx.lineWidth = 0.65;
    for (let i = 0; i < 48; i++) {
      const sx = cx - rx + ((i + 0.5) * rx * 2) / 48;
      ctx.beginPath();
      ctx.moveTo(sx, cy - ry);
      ctx.lineTo(sx, cy + ry);
      ctx.stroke();
    }
  } else if (profile.coatPattern === "stripes_8_dark_brown") {
    ctx.strokeStyle = profile.patternColors[0] || "#3e2723";
    ctx.lineWidth = 2.0;
    for (let i = 0; i < 8; i++) {
      const sx = cx - rx * 0.78 + (i * (rx * 1.56)) / 7;
      ctx.beginPath();
      ctx.moveTo(sx, cy - ry);
      ctx.lineTo(sx, cy + ry);
      ctx.stroke();
    }
  }

  ctx.restore();
}

function drawAccessoryCrownOrTiara(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  profile: CraftedOpossumVisualProfile,
  scale: number
) {
  if (!profile.tiaraColor) return;
  ctx.save();

  // Crisp contrast halo so blue/silver/gold tiaras remain distinct against rider attire
  ctx.strokeStyle = "rgba(255, 255, 255, 0.85)";
  ctx.lineWidth = Math.max(2.6, 3.6 * scale);
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(x - 10 * scale, y);
  ctx.lineTo(x - 5 * scale, y - 5 * scale);
  ctx.lineTo(x, y - 9 * scale);
  ctx.lineTo(x + 5 * scale, y - 5 * scale);
  ctx.lineTo(x + 10 * scale, y);
  ctx.stroke();

  ctx.strokeStyle = profile.tiaraColor;
  ctx.fillStyle = profile.tiaraColor;
  ctx.lineWidth = Math.max(1.6, 2.3 * scale);

  // Crown arch
  ctx.beginPath();
  ctx.moveTo(x - 10 * scale, y);
  ctx.lineTo(x - 5 * scale, y - 5 * scale);
  ctx.lineTo(x, y - 9 * scale);
  ctx.lineTo(x + 5 * scale, y - 5 * scale);
  ctx.lineTo(x + 10 * scale, y);
  ctx.stroke();

  if (profile.tiaraGemColor) {
    ctx.fillStyle = profile.tiaraGemColor;
    const gx = x;
    const gy = y - 8 * scale;
    if (profile.tiaraGemShape === "vertical_oval") {
      ctx.beginPath();
      ctx.ellipse(gx, gy, 2.8 * scale, 4.8 * scale, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#047857";
      ctx.lineWidth = 1;
      ctx.stroke();
    } else if (profile.tiaraGemShape === "sun_diamond") {
      ctx.beginPath();
      ctx.moveTo(gx, gy - 4 * scale);
      ctx.lineTo(gx + 4 * scale, gy);
      ctx.lineTo(gx, gy + 4 * scale);
      ctx.lineTo(gx - 4 * scale, gy);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "#2563eb";
      ctx.lineWidth = 1;
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(gx, gy, 3.0 * scale, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();
}

function drawNecklaceAccessory(
  ctx: CanvasRenderingContext2D,
  px: number,
  arcY: number,
  charmY: number,
  arcRadius: number,
  profile: CraftedOpossumVisualProfile
) {
  if (!profile.necklaceColor) return;
  ctx.save();
  ctx.strokeStyle = profile.necklaceColor;
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.arc(px, arcY, arcRadius, 0.18 * Math.PI, 0.82 * Math.PI);
  ctx.stroke();

  // Small diamond link accents along necklace chain
  ctx.fillStyle = profile.necklaceColor;
  for (let a = 0.25; a <= 0.75; a += 0.125) {
    const lx = px + Math.cos(a * Math.PI) * arcRadius;
    const ly = arcY + Math.sin(a * Math.PI) * arcRadius;
    ctx.beginPath();
    ctx.moveTo(lx, ly - 1.8);
    ctx.lineTo(lx + 1.8, ly);
    ctx.lineTo(lx, ly + 1.8);
    ctx.lineTo(lx - 1.8, ly);
    ctx.closePath();
    ctx.fill();
  }

  if (profile.necklaceCharmColor) {
    ctx.fillStyle = profile.necklaceCharmColor;
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 0.9;
    if (profile.necklaceCharmShape === "diamond") {
      ctx.beginPath();
      ctx.moveTo(px, charmY - 3.8);
      ctx.lineTo(px + 4.6, charmY);
      ctx.lineTo(px, charmY + 3.8);
      ctx.lineTo(px - 4.6, charmY);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(px, charmY, 3.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
  }
  ctx.restore();
}

function drawProceduralCraftedOpossum2D(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  profile: CraftedOpossumVisualProfile
) {
  ctx.save();
  const rx = profile.isCompact ? 13 : 16;
  const ry = profile.isCompact ? 21 : 25;

  // Tail
  ctx.strokeStyle = profile.tailColor;
  ctx.lineWidth = Math.max(2, profile.tailWidth * 0.65);
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x, y + ry * 0.85);
  ctx.quadraticCurveTo(x - 14 * profile.tailLengthScale, y + ry + 14, x - 6, y + ry + 19 * profile.tailLengthScale);
  ctx.stroke();

  // Body ellipse
  ctx.fillStyle = profile.furBaseColor;
  ctx.beginPath();
  ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
  ctx.fill();
  drawCoatPatternInsideClip(ctx, x, y, rx, ry, profile);
  ctx.strokeStyle = profile.furOutlineColor;
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
  ctx.stroke();

  // Ears
  const earR = 4.5 * profile.earLengthScale;
  const earOffsetX = profile.earOrientation === "downward_dog" || profile.earOrientation === "side_down" ? rx * 0.82 : rx * 0.56;
  const earOffsetY = -ry * 0.68;
  ctx.fillStyle = profile.outerEarColor;
  ctx.beginPath();
  ctx.arc(x - earOffsetX, y + earOffsetY, earR, 0, Math.PI * 2);
  ctx.arc(x + earOffsetX, y + earOffsetY, earR, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = profile.innerEarColor;
  ctx.beginPath();
  ctx.arc(x - earOffsetX, y + earOffsetY, earR * 0.55, 0, Math.PI * 2);
  ctx.arc(x + earOffsetX, y + earOffsetY, earR * 0.55, 0, Math.PI * 2);
  ctx.fill();

  // Nose tip pointing forward (North on 2D top-down)
  ctx.fillStyle = profile.noseColor;
  ctx.beginPath();
  ctx.arc(x, y - ry * profile.snoutFactor, 3.0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

const LEGACY_CUSTOM_3D_IDS = new Set<OpossumId>([
  OpossumId.MELISSA,
  OpossumId.ASHLEY,
  OpossumId.AMARA_QIN,
  OpossumId.SAFFRON_ROSE,
  OpossumId.JALISSA_CHIN,
  OpossumId.ARDEN_ROSIE,
  OpossumId.JAHMELLA_ROSE,
  OpossumId.DAGMAR_KONE_REYNOLDS,
  OpossumId.AGAPE_ROSE,
  OpossumId.ROXANNE_KONE_REYNOLDS,
  OpossumId.TIANA_QIN,
  OpossumId.WANDA,
  OpossumId.OLIVIA_CHIN,
  OpossumId.RUTH_KONE_REYNOLDS,
  OpossumId.KADY_ROSE,
  OpossumId.SANDRA,
  OpossumId.IVAN_OPOSSUM,
  OpossumId.ISAAC_OPOSSUM
]);

export function resolveRiderMountLayout(opossum: OpossumCharacter): {
  riderYOffset: number;
  legSpreadX: number;
  usesForegroundHeadPass: boolean;
} {
  if (opossum.isAI) {
    return { riderYOffset: 0, legSpreadX: 11, usesForegroundHeadPass: false };
  }
  const id = normalizeOpossumIdKey(opossum.id);
  if (id && LEGACY_CUSTOM_3D_IDS.has(id)) {
    return { riderYOffset: 0, legSpreadX: 11, usesForegroundHeadPass: false };
  }
  const profile = resolveOpossumVisualProfile(opossum);
  const spread = profile.isCompact ? 16 : Math.max(19, profile.bodyWidth * 0.48);
  return {
    riderYOffset: -14,
    legSpreadX: spread,
    usesForegroundHeadPass: true
  };
}

function drawProceduralCraftedOpossum3D(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  profile: CraftedOpossumVisualProfile
) {
  ctx.save();
  const bodyRx = profile.isCompact ? profile.bodyWidth * 0.68 : profile.bodyWidth * 0.64;
  const bodyRy = profile.isCompact ? 20 : 25;
  const bodyCenterY = py + 4;

  // 1. Tail
  ctx.strokeStyle = profile.tailColor;
  ctx.lineWidth = profile.tailWidth;
  ctx.lineCap = "round";
  const tailLen = profile.tailLengthScale;
  ctx.beginPath();
  ctx.moveTo(px, bodyCenterY + bodyRy * 0.52);
  ctx.bezierCurveTo(
    px - 22 * tailLen,
    bodyCenterY + 30 * tailLen,
    px - 38 * tailLen,
    bodyCenterY + 10,
    px - 50 * tailLen,
    bodyCenterY + 26 * tailLen
  );
  ctx.stroke();

  if (profile.tailSpiralColor) {
    ctx.save();
    ctx.strokeStyle = profile.tailSpiralColor;
    ctx.lineWidth = Math.max(1.6, profile.tailWidth * 0.45);
    ctx.setLineDash([4, 10]);
    ctx.beginPath();
    ctx.moveTo(px, bodyCenterY + bodyRy * 0.52);
    ctx.bezierCurveTo(
      px - 22 * tailLen,
      bodyCenterY + 30 * tailLen,
      px - 38 * tailLen,
      bodyCenterY + 10,
      px - 50 * tailLen,
      bodyCenterY + 26 * tailLen
    );
    ctx.stroke();
    ctx.restore();
  }

  // 2. Paws (lower front & rear anchor)
  ctx.fillStyle = profile.pawColor;
  ctx.beginPath();
  ctx.ellipse(px - bodyRx * 0.56, bodyCenterY + bodyRy * 0.88, 5.2, 3.4, 0, 0, Math.PI * 2);
  ctx.ellipse(px + bodyRx * 0.56, bodyCenterY + bodyRy * 0.88, 5.2, 3.4, 0, 0, Math.PI * 2);
  ctx.fill();

  // 3. Body coat + pattern
  ctx.fillStyle = profile.furBaseColor;
  ctx.beginPath();
  ctx.ellipse(px, bodyCenterY, bodyRx, bodyRy, 0, 0, Math.PI * 2);
  ctx.fill();

  drawCoatPatternInsideClip(ctx, px, bodyCenterY, bodyRx, bodyRy, profile);

  ctx.strokeStyle = profile.furOutlineColor;
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.ellipse(px, bodyCenterY, bodyRx, bodyRy, 0, 0, Math.PI * 2);
  ctx.stroke();

  // 4. Body silhouette sits cleanly beneath rider saddle; head, ears, tiara & necklace render in foreground pass

  ctx.restore();
}

function drawProceduralCraftedOpossumForegroundHead3D(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  profile: CraftedOpossumVisualProfile
) {
  ctx.save();

  // Necklace collar resting cleanly across front neck/chest above body pattern
  drawNecklaceAccessory(ctx, px, py + 7, py + 20, 12.5, profile);

  // Respect headOrientation ("perched on top of her neck" vs "forward_leaning")
  const isForwardLeaning =
    profile.earOrientation === "forward_leaning" || profile.id === OpossumId.AGAPE_ROSE || profile.id === OpossumId.ASHLEY;
  const headRx = profile.isCompact ? profile.bodyWidth * 0.44 : profile.bodyWidth * 0.4;
  const headRy = profile.isCompact ? 12.5 : 14;
  const headY = isForwardLeaning ? py + 3 : py + 0;

  // Upright or oriented ears attached cleanly to the opossum's head (clear of rider thighs)
  const earR = (profile.isCompact ? 7.2 : 8.0) * Math.min(1.25, profile.earLengthScale);
  const isSideEar = profile.earOrientation === "side_down" || profile.earOrientation === "downward_dog";
  const earDx = isSideEar ? headRx + 2.5 : headRx * 0.88;
  const earDy = isSideEar ? headY - 2 : isForwardLeaning ? headY - 9 : headY - 11;

  ctx.fillStyle = profile.outerEarColor;
  ctx.beginPath();
  ctx.ellipse(px - earDx, earDy, isSideEar ? earR * 0.68 : earR * 0.88, isSideEar ? earR * 1.1 : earR, isSideEar ? -0.25 : -0.14, 0, Math.PI * 2);
  ctx.ellipse(px + earDx, earDy, isSideEar ? earR * 0.68 : earR * 0.88, isSideEar ? earR * 1.1 : earR, isSideEar ? 0.25 : 0.14, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = profile.innerEarColor;
  ctx.beginPath();
  ctx.ellipse(px - earDx, earDy, (isSideEar ? earR * 0.68 : earR * 0.88) * 0.58, (isSideEar ? earR * 1.1 : earR) * 0.58, isSideEar ? -0.25 : -0.14, 0, Math.PI * 2);
  ctx.ellipse(px + earDx, earDy, (isSideEar ? earR * 0.68 : earR * 0.88) * 0.58, (isSideEar ? earR * 1.1 : earR) * 0.58, isSideEar ? 0.25 : 0.14, 0, Math.PI * 2);
  ctx.fill();

  // 5. Head perched clearly on top of neck
  ctx.fillStyle = profile.furryFacePercent >= 50 ? profile.furryFaceColor : profile.skinColor;
  ctx.beginPath();
  ctx.ellipse(px, headY, headRx, headRy, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = profile.furOutlineColor;
  ctx.lineWidth = 1.1;
  ctx.stroke();

  if (profile.furryFacePercent > 0 && profile.furryFacePercent < 50) {
    ctx.strokeStyle = profile.furryFaceColor;
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.arc(px, headY, headRx * 0.9, Math.PI * 1.1, Math.PI * 1.9);
    ctx.stroke();
  }

  // 6. Eyes
  const eyeY = headY - 2;
  ctx.fillStyle = profile.eyeColor;
  ctx.beginPath();
  ctx.arc(px - 6.8, eyeY, 2.9, 0, Math.PI * 2);
  ctx.arc(px + 6.8, eyeY, 2.9, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(px - 7.8, eyeY - 1, 1.0, 0, Math.PI * 2);
  ctx.arc(px + 5.8, eyeY - 1, 1.0, 0, Math.PI * 2);
  ctx.fill();

  // 7. Callie Rose circular reading glasses (white gold + brass)
  if (profile.glassesStyle === "circular_white_gold_brass") {
    ctx.strokeStyle = "#eab308"; // Brass outer frame
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.arc(px - 6.8, eyeY, 5.1, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(px + 6.8, eyeY, 5.1, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = "#f8fafc"; // White-gold inner sheen
    ctx.lineWidth = 1.0;
    ctx.beginPath();
    ctx.arc(px - 6.8, eyeY, 4.4, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(px + 6.8, eyeY, 4.4, 0, Math.PI * 2);
    ctx.stroke();

    // Nose bridge
    ctx.strokeStyle = "#eab308";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(px - 1.8, eyeY);
    ctx.lineTo(px + 1.8, eyeY);
    ctx.stroke();
  }

  // 8. Nose tip (no nostrils) on lower front of snout
  ctx.fillStyle = profile.noseColor;
  ctx.beginPath();
  ctx.arc(px, headY + 5 * profile.snoutFactor, 4.2, 0, Math.PI * 2);
  ctx.fill();

  // 9. Tiara on forehead crown
  drawAccessoryCrownOrTiara(ctx, px, headY - headRy + 1, profile, 1.0);

  ctx.restore();
}

export function drawCraftedOpossumForeground3D(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  selectedOpossum: OpossumCharacter
): void {
  const layout = resolveRiderMountLayout(selectedOpossum);
  if (!layout.usesForegroundHeadPass) return;
  const profile = resolveOpossumVisualProfile(selectedOpossum);
  drawProceduralCraftedOpossumForegroundHead3D(ctx, px, py, profile);
}

function drawProceduralCraftedOpossumPolygons(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  pWidth: number,
  profile: CraftedOpossumVisualProfile
) {
  ctx.save();
  ctx.strokeStyle = profile.furBaseColor;
  ctx.lineWidth = 1.6;
  const rx = pWidth * 0.62;
  const ry = profile.isCompact ? 19 : 24;

  // Torso polygon ellipse
  ctx.beginPath();
  ctx.ellipse(px, py, rx, ry, 0, 0, Math.PI * 2);
  ctx.stroke();

  // Cranial wireframe
  ctx.beginPath();
  ctx.ellipse(px, py - 15, pWidth * 0.42, 14, 0, 0, Math.PI * 2);
  ctx.stroke();

  // Ear wireframes
  ctx.strokeStyle = profile.outerEarColor;
  ctx.beginPath();
  ctx.arc(px - 14, py - 20, 8 * profile.earLengthScale, 0, Math.PI * 2);
  ctx.arc(px + 14, py - 20, 8 * profile.earLengthScale, 0, Math.PI * 2);
  ctx.stroke();

  // Nose wireframe triangle
  ctx.strokeStyle = profile.noseColor;
  ctx.beginPath();
  ctx.moveTo(px - 3, py - 18);
  ctx.lineTo(px, py - 22);
  ctx.lineTo(px + 3, py - 18);
  ctx.closePath();
  ctx.stroke();

  // Tail wireframe spline
  ctx.strokeStyle = profile.tailColor;
  ctx.beginPath();
  ctx.moveTo(px, py + ry * 0.5);
  ctx.lineTo(px - 22 * profile.tailLengthScale, py + 28 * profile.tailLengthScale);
  ctx.lineTo(px - 44 * profile.tailLengthScale, py + 22 * profile.tailLengthScale);
  ctx.stroke();
  ctx.restore();
}

export function drawCraftedOpossum2D(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  selectedOpossum: OpossumCharacter
): void {
  if (selectedOpossum.isAI) {
    AIGeneratedOpossum.draw2D(ctx, x, y, selectedOpossum);
    return;
  }

  const id = normalizeOpossumIdKey(selectedOpossum.id);
  switch (id) {
    case OpossumId.MELISSA:
      MelissaOpossum.draw2D(ctx, x, y, selectedOpossum);
      return;
    case OpossumId.ASHLEY:
      AshleyOpossum.draw2D(ctx, x, y, selectedOpossum);
      return;
    case OpossumId.AMARA_QIN:
      AmaraQinOpossum.draw2D(ctx, x, y, selectedOpossum);
      return;
    case OpossumId.SAFFRON_ROSE:
      SaffronRoseOpossum.draw2D(ctx, x, y, selectedOpossum);
      return;
    case OpossumId.JALISSA_CHIN:
      JalissaChinOpossum.draw2D(ctx, x, y, selectedOpossum);
      return;
    case OpossumId.ARDEN_ROSIE:
      ArdenRosieOpossum.draw2D(ctx, x, y, selectedOpossum);
      return;
    case OpossumId.JAHMELLA_ROSE:
      JahmellaRoseOpossum.draw2D(ctx, x, y, selectedOpossum);
      return;
    case OpossumId.DAGMAR_KONE_REYNOLDS:
      DagmarKoneReynoldsOpossum.draw2D(ctx, x, y, selectedOpossum);
      return;
    case OpossumId.AGAPE_ROSE:
      AgapeRoseOpossum.draw2D(ctx, x, y, selectedOpossum);
      return;
    case OpossumId.ROXANNE_KONE_REYNOLDS:
      RoxanneKoneReynoldsOpossum.draw2D(ctx, x, y, selectedOpossum);
      return;
    case OpossumId.TIANA_QIN:
      TianaQinOpossum.draw2D(ctx, x, y, selectedOpossum);
      return;
    case OpossumId.WANDA:
      WandaOpossum.draw2D(ctx, x, y);
      return;
    case OpossumId.OLIVIA_CHIN:
      OliviaChin.draw2D(ctx, x, y);
      return;
    case OpossumId.RUTH_KONE_REYNOLDS:
      RuthKoneReynolds.draw2D(ctx, x, y);
      return;
    case OpossumId.KADY_ROSE:
      KadyRose.draw2D(ctx, x, y);
      return;
    case OpossumId.SANDRA:
      SandraOpossum.draw2D(ctx, x, y);
      return;
    case OpossumId.IVAN_OPOSSUM:
      drawIvan2D(ctx, x, y, selectedOpossum);
      return;
    case OpossumId.ISAAC_OPOSSUM:
      drawIsaac2D(ctx, x, y, selectedOpossum);
      return;
    default: {
      const profile = resolveOpossumVisualProfile(selectedOpossum);
      drawProceduralCraftedOpossum2D(ctx, x, y, profile);
    }
  }
}

export function drawCraftedOpossum3D(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  width: number,
  height: number,
  selectedOpossum: OpossumCharacter
): void {
  if (selectedOpossum.isAI) {
    AIGeneratedOpossum.draw3D(ctx, px, py, width, height, selectedOpossum);
    return;
  }

  const id = normalizeOpossumIdKey(selectedOpossum.id);
  switch (id) {
    case OpossumId.MELISSA:
      MelissaOpossum.draw3D(ctx, px, py, width, height, selectedOpossum);
      return;
    case OpossumId.ASHLEY:
      AshleyOpossum.draw3D(ctx, px, py, width, height, selectedOpossum);
      return;
    case OpossumId.AMARA_QIN:
      AmaraQinOpossum.draw3D(ctx, px, py, width, height, selectedOpossum);
      return;
    case OpossumId.SAFFRON_ROSE:
      SaffronRoseOpossum.draw3D(ctx, px, py, width, height, selectedOpossum);
      return;
    case OpossumId.JALISSA_CHIN:
      JalissaChinOpossum.draw3D(ctx, px, py, width, height, selectedOpossum);
      return;
    case OpossumId.ARDEN_ROSIE:
      ArdenRosieOpossum.draw3D(ctx, px, py, width, height, selectedOpossum);
      return;
    case OpossumId.JAHMELLA_ROSE:
      JahmellaRoseOpossum.draw3D(ctx, px, py, width, height, selectedOpossum);
      return;
    case OpossumId.DAGMAR_KONE_REYNOLDS:
      DagmarKoneReynoldsOpossum.draw3D(ctx, px, py, width, height, selectedOpossum);
      return;
    case OpossumId.AGAPE_ROSE:
      AgapeRoseOpossum.draw3D(ctx, px, py, width, height, selectedOpossum);
      return;
    case OpossumId.ROXANNE_KONE_REYNOLDS:
      RoxanneKoneReynoldsOpossum.draw3D(ctx, px, py, width, height, selectedOpossum);
      return;
    case OpossumId.TIANA_QIN:
      TianaQinOpossum.draw3D(ctx, px, py, width, height, selectedOpossum);
      return;
    case OpossumId.WANDA:
      WandaOpossum.draw3D(ctx, px, py);
      return;
    case OpossumId.OLIVIA_CHIN:
      OliviaChin.draw3D(ctx, px, py);
      return;
    case OpossumId.RUTH_KONE_REYNOLDS:
      RuthKoneReynolds.draw3D(ctx, px, py);
      return;
    case OpossumId.KADY_ROSE:
      KadyRose.draw3D(ctx, px, py);
      return;
    case OpossumId.SANDRA:
      SandraOpossum.draw3D(ctx, px, py);
      return;
    case OpossumId.IVAN_OPOSSUM:
      drawIvan3D(ctx, px, py, width, height, selectedOpossum);
      return;
    case OpossumId.ISAAC_OPOSSUM:
      drawIsaac3D(ctx, px, py, width, height, selectedOpossum);
      return;
    default: {
      const profile = resolveOpossumVisualProfile(selectedOpossum);
      drawProceduralCraftedOpossum3D(ctx, px, py, profile);
    }
  }
}

export function drawCraftedOpossumPolygons(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  selectedOpossum: OpossumCharacter
): void {
  const profile = resolveOpossumVisualProfile(selectedOpossum);
  const pWidth = profile.bodyWidth;
  const id = normalizeOpossumIdKey(selectedOpossum.id);

  switch (id) {
    case OpossumId.MELISSA:
      MelissaOpossum.drawPolygons(ctx, px, py, pWidth);
      return;
    case OpossumId.ASHLEY:
      AshleyOpossum.drawPolygons(ctx, px, py, pWidth);
      return;
    case OpossumId.AMARA_QIN:
      AmaraQinOpossum.drawPolygons(ctx, px, py, pWidth);
      return;
    case OpossumId.SAFFRON_ROSE:
      SaffronRoseOpossum.drawPolygons(ctx, px, py, pWidth);
      return;
    case OpossumId.JALISSA_CHIN:
      JalissaChinOpossum.drawPolygons(ctx, px, py, pWidth);
      return;
    case OpossumId.ARDEN_ROSIE:
      ArdenRosieOpossum.drawPolygons(ctx, px, py, pWidth);
      return;
    case OpossumId.JAHMELLA_ROSE:
      JahmellaRoseOpossum.drawPolygons(ctx, px, py, pWidth);
      return;
    case OpossumId.DAGMAR_KONE_REYNOLDS:
      DagmarKoneReynoldsOpossum.drawPolygons(ctx, px, py, pWidth);
      return;
    case OpossumId.AGAPE_ROSE:
      AgapeRoseOpossum.drawPolygons(ctx, px, py, pWidth);
      return;
    case OpossumId.ROXANNE_KONE_REYNOLDS:
      RoxanneKoneReynoldsOpossum.drawPolygons(ctx, px, py, pWidth);
      return;
    case OpossumId.TIANA_QIN:
      TianaQinOpossum.drawPolygons(ctx, px, py, pWidth);
      return;
    case OpossumId.WANDA:
      WandaOpossum.drawPolygons(ctx, px, py);
      return;
    case OpossumId.OLIVIA_CHIN:
      OliviaChin.drawPolygons(ctx, px, py);
      return;
    case OpossumId.RUTH_KONE_REYNOLDS:
      RuthKoneReynolds.drawPolygons(ctx, px, py);
      return;
    case OpossumId.KADY_ROSE:
      KadyRose.drawPolygons(ctx, px, py);
      return;
    case OpossumId.SANDRA:
      SandraOpossum.drawPolygons(ctx, px, py);
      return;
    case OpossumId.IVAN_OPOSSUM:
      drawIvanPolygons(ctx, px, py, pWidth);
      return;
    case OpossumId.ISAAC_OPOSSUM:
      drawIsaacPolygons(ctx, px, py, pWidth);
      return;
    default:
      drawProceduralCraftedOpossumPolygons(ctx, px, py, pWidth, profile);
  }
}

export function renderCraftedOpossumPOV(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  selectedOpossum: OpossumCharacter
): void {
  const profile = resolveOpossumVisualProfile(selectedOpossum);
  const isForwardLeaning =
    profile.earOrientation === "forward_leaning" || profile.id === OpossumId.AGAPE_ROSE || profile.id === OpossumId.ASHLEY;
  const headLiftY = isForwardLeaning ? 2 : 0;

  ctx.save();

  // 1. Molded Rider Legs hugging the flanks cleanly inside the bottom POV frame
  ctx.fillStyle = profile.furBaseColor;
  ctx.strokeStyle = profile.furOutlineColor;
  ctx.lineWidth = 3.5;

  ctx.beginPath();
  ctx.ellipse(px - 46, py + 24, 18, 30, -Math.PI / 9, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.ellipse(px + 46, py + 24, 18, 30, Math.PI / 9, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // 2. Patterned Shoulders & Upper Back visible in foreground
  const shoulderRx = profile.isCompact ? 34 : 38;
  const shoulderRy = profile.isCompact ? 22 : 25;
  ctx.fillStyle = profile.furBaseColor;
  ctx.beginPath();
  ctx.ellipse(px, py + 14, shoulderRx, shoulderRy, 0, 0, Math.PI * 2);
  ctx.fill();

  drawCoatPatternInsideClip(ctx, px, py + 14, shoulderRx, shoulderRy, profile);

  ctx.strokeStyle = profile.furOutlineColor;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.ellipse(px, py + 14, shoulderRx, shoulderRy, 0, 0, Math.PI * 2);
  ctx.stroke();

  // 3. Back/side collar band of necklace around neck base (no front-chest medallion floating on back)
  if (profile.necklaceColor) {
    ctx.save();
    ctx.strokeStyle = profile.necklaceColor;
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.arc(px, py - 2, 19, 0.16 * Math.PI, 0.84 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = profile.necklaceColor;
    for (let a = 0.22; a <= 0.78; a += 0.14) {
      const lx = px + Math.cos(a * Math.PI) * 19;
      const ly = py - 2 + Math.sin(a * Math.PI) * 19;
      ctx.beginPath();
      ctx.moveTo(lx, ly - 1.8);
      ctx.lineTo(lx + 1.8, ly);
      ctx.lineTo(lx, ly + 1.8);
      ctx.lineTo(lx - 1.8, ly);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  }

  // 4. Back / Top of Cranial Crown (furred crown contour in POV)
  const headRx = profile.isCompact ? 21 : 23;
  const headRy = profile.isCompact ? 14 : 15;
  const crownY = py - 8 + headLiftY;
  ctx.fillStyle = profile.headFurColor;
  ctx.beginPath();
  ctx.ellipse(px, crownY, headRx, headRy, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = profile.furOutlineColor;
  ctx.lineWidth = 1.1;
  ctx.stroke();

  // 5. Tiara perched atop cranial crest cleanly behind snout & glasses temples
  drawAccessoryCrownOrTiara(ctx, px, crownY - 10, profile, 0.90);

  // 6. Ears viewed from behind/above (outer ear back primary + thin inner-ear front crescent)
  const earScale = Math.min(1.28, profile.earLengthScale);
  const earR = 8.6 * earScale;
  const isSideEar = profile.earOrientation === "side_down" || profile.earOrientation === "downward_dog";
  const earX = isSideEar ? 26 : isForwardLeaning ? 20 : 21;
  const earY = (isSideEar ? py - 5 : isForwardLeaning ? py - 13 : py - 11) + headLiftY;

  ctx.fillStyle = profile.outerEarColor;
  ctx.beginPath();
  ctx.ellipse(px - earX, earY, isSideEar ? earR * 0.72 : earR, isSideEar ? earR * 1.15 : earR, isSideEar ? -0.25 : -0.15, 0, Math.PI * 2);
  ctx.ellipse(px + earX, earY, isSideEar ? earR * 0.72 : earR, isSideEar ? earR * 1.15 : earR, isSideEar ? 0.25 : 0.15, 0, Math.PI * 2);
  ctx.fill();

  // Thin forward-edge inner-ear crescent peeking ahead of outer ear back
  ctx.fillStyle = profile.innerEarColor;
  ctx.beginPath();
  ctx.ellipse(px - earX + 2.2, earY - 2.2, earR * 0.45, earR * 0.35, -0.35, 0, Math.PI * 2);
  ctx.ellipse(px + earX - 2.2, earY - 2.2, earR * 0.45, earR * 0.35, 0.35, 0, Math.PI * 2);
  ctx.fill();

  if (profile.earPattern === "polka_dots" || profile.earPattern === "bronze_circles") {
    ctx.fillStyle = profile.earPatternColors[0] || "#facc15";
    ctx.beginPath();
    ctx.arc(px - earX - 2, earY + 1, 2.1, 0, Math.PI * 2);
    ctx.arc(px + earX + 2, earY + 1, 2.1, 0, Math.PI * 2);
    ctx.fill();
  } else if (profile.earPattern === "diamonds") {
    ctx.fillStyle = profile.earPatternColors[0] || "#ef4444";
    ctx.beginPath();
    ctx.moveTo(px - earX, earY - 2);
    ctx.lineTo(px - earX + 3, earY + 1);
    ctx.lineTo(px - earX, earY + 4);
    ctx.lineTo(px - earX - 3, earY + 1);
    ctx.closePath();
    ctx.fill();
  }

  if (profile.earringsColor) {
    ctx.strokeStyle = profile.earringsColor;
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.arc(px - earX - 7, earY + 4, 3.0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(px + earX + 7, earY + 4, 3.0, 0, Math.PI * 2);
    ctx.stroke();
  }

  // 7. Tapered Forward Muzzle & Nose Tip (extending forward away from rider into horizon)
  const snoutBaseY = py - 12 + headLiftY;
  const noseTipY = py - 33 * profile.snoutFactor + headLiftY;
  const snoutFill = profile.furryFacePercent >= 50 ? profile.furryFaceColor : profile.skinColor;
  ctx.fillStyle = snoutFill;
  ctx.beginPath();
  ctx.moveTo(px - 14, snoutBaseY);
  ctx.quadraticCurveTo(px - 11, (snoutBaseY + noseTipY) * 0.5, px - 5, noseTipY + 2);
  ctx.quadraticCurveTo(px, noseTipY - 3, px + 5, noseTipY + 2);
  ctx.quadraticCurveTo(px + 11, (snoutBaseY + noseTipY) * 0.5, px + 14, snoutBaseY);
  ctx.closePath();
  ctx.fill();

  // Glasses temple arms & curved upper/outer lens rims peeking cleanly forward along temples (NO backward eyeballs)
  if (profile.glassesStyle === "circular_white_gold_brass") {
    const rimCenterY = py - 22 + headLiftY;
    ctx.strokeStyle = "#eab308"; // Brass frame
    ctx.lineWidth = 2.0;
    // Left temple arm & upper-left circular rim edge
    ctx.beginPath();
    ctx.moveTo(px - 20, py - 9 + headLiftY);
    ctx.lineTo(px - 15, rimCenterY + 1);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(px - 10, rimCenterY, 5.4, Math.PI * 0.85, Math.PI * 1.9);
    ctx.stroke();

    // Right temple arm & upper-right circular rim edge
    ctx.beginPath();
    ctx.moveTo(px + 20, py - 9 + headLiftY);
    ctx.lineTo(px + 15, rimCenterY + 1);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(px + 10, rimCenterY, 5.4, Math.PI * 1.1, Math.PI * 0.15);
    ctx.stroke();

    // White-gold highlight
    ctx.strokeStyle = "#f8fafc";
    ctx.lineWidth = 1.0;
    ctx.beginPath();
    ctx.arc(px - 10, rimCenterY, 4.6, Math.PI * 0.9, Math.PI * 1.85);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(px + 10, rimCenterY, 4.6, Math.PI * 1.15, Math.PI * 0.1);
    ctx.stroke();
  }

  // Forward nose tip at apex of tapering snout (zero nostrils)
  ctx.fillStyle = profile.noseColor;
  ctx.beginPath();
  ctx.arc(px, noseTipY, 4.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

export const CraftedOpossumRenderKernel = {
  CRAFTED_OPOSSUM_VISUAL_PROFILES,
  resolveOpossumVisualProfile,
  resolveOpossumPrimaryColorHex,
  resolveRiderLegColors,
  resolveRiderMountLayout,
  drawCraftedOpossum2D,
  drawCraftedOpossum3D,
  drawCraftedOpossumForeground3D,
  drawCraftedOpossumPolygons,
  renderCraftedOpossumPOV
};

export default CraftedOpossumRenderKernel;
