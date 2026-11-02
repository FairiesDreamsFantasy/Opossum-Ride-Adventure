/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { GameViewMode, KeyboardLayoutType, GameState } from "../../../../types";
import { VisualPaletteType } from "../../../Visuals";

export interface ChalkboardColorConfig {
  lineColorName: string;
  lineHex: string;
  bgName: string;
  bgHex: string;
  bgLineHex: string;
}

export const DEFAULT_CHALKBOARD_CONFIG: ChalkboardColorConfig = {
  lineColorName: "White",
  lineHex: "#FFFFFF",
  bgName: "Black on White",
  bgHex: "#FFFFFF",
  bgLineHex: "#000000"
};

export const CHALKBOARD_LINE_COLORS = [
  { name: "Pink", hex: "#FF69B4" },
  { name: "Light-Green", hex: "#90EE90" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Yellow", hex: "#FFFF00" },
  { name: "Light-Blue", hex: "#ADD8E6" },
  { name: "Orange", hex: "#FFA500" }
];

export const CHALKBOARD_BG_PRESETS = [
  { name: "Black on White", bgHex: "#FFFFFF", lineHex: "#000000" },
  { name: "Black on Light-Green", bgHex: "#90EE90", lineHex: "#000000" },
  { name: "Red on White", bgHex: "#FFFFFF", lineHex: "#DC2626" },
  { name: "Yellow on Black", bgHex: "#000000", lineHex: "#FFFF00" },
  { name: "Light-Green on Black", bgHex: "#000000", lineHex: "#90EE90" },
  { name: "Dark-Green on White", bgHex: "#FFFFFF", lineHex: "#15803D" },
  { name: "Blue on White", bgHex: "#FFFFFF", lineHex: "#1D4ED8" },
  { name: "Black on Cream", bgHex: "#FFFDD0", lineHex: "#000000" },
  { name: "Light Yellow on Black", bgHex: "#000000", lineHex: "#FEF08A" }
];

export interface MenuBarComponentProps {
  activeMenu: string | null;
  setActiveMenu: (m: string | null) => void;
  activeSubMenu: string | null;
  setActiveSubMenu: (m: string | null) => void;
  activeVisualPref: string;
  handleVisualPrefChange: (opt: string) => void;
  colorDotMatrix: boolean;
  setColorDotMatrix: (v: boolean) => void;
  setPalette: (p: VisualPaletteType) => void;
  is3D: boolean;
  setIs3D: (v: boolean) => void;
  wireframe: boolean;
  setWireframe: (v: boolean) => void;
  palette: VisualPaletteType;
  pixelation: number;
  setPixelation: (v: number) => void;
  ttsEnabled: boolean;
  setTtsEnabled: (v: boolean) => void;
  announceDoors: boolean;
  setAnnounceDoors: (v: boolean) => void;
  announceReverb: boolean;
  setAnnounceReverb: (v: boolean) => void;
  extendedInfo: boolean;
  setExtendedInfo: (v: boolean) => void;
  chatterNotifications: boolean;
  setChatterNotifications: (v: boolean) => void;
  announceSteering: boolean;
  setAnnounceSteering: (v: boolean) => void;
  showVisualHUD: boolean;
  setShowVisualHUD: (v: React.SetStateAction<boolean>) => void;
  showOpponentIndicators?: boolean;
  setShowOpponentIndicators?: (v: React.SetStateAction<boolean>) => void;
  showFeed: boolean;
  setShowFeed: (v: React.SetStateAction<boolean>) => void;
  viewMode: GameViewMode;
  setViewMode: (v: GameViewMode) => void;
  layout: KeyboardLayoutType;
  handleLayoutChange: (l: KeyboardLayoutType) => void;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  stateRef: React.MutableRefObject<any>;
  speakWords: (text: string) => void;
  setStatusMessage: (msg: string) => void;
  isSpeechEnabled: () => boolean;
  setSpeechEnabled: (v: boolean) => void;
  genericCrashSound?: boolean;
  setGenericCrashSound?: (v: boolean) => void;
  largeText?: boolean;
  setLargeText?: (v: boolean) => void;
  chalkboardConfig?: ChalkboardColorConfig;
  setChalkboardConfig?: (cfg: ChalkboardColorConfig) => void;
  onOpenThemeModal?: () => void;
  announceMooseSmash?: boolean;
  setAnnounceMooseSmash?: (v: boolean) => void;
  musicEnabled?: boolean;
  setMusicEnabled?: (v: boolean) => void;
  customTrackId?: string | null;
  onSetCustomTrack?: (trackId: string | null) => void;
}
