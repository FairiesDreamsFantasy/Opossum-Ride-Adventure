/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ThemeType =
  | "Dark"
  | "Light"
  | "Quilted"
  | "Garden"
  | "Forest"
  | "Storybook"
  | "Immersion_Low"
  | "Immersion_Ultra"
  | "dark"
  | "light"
  | "quilted"
  | "garden"
  | "forest"
  | "storybook"
  | "immersion_low"
  | "immersion_ultra";

export interface ThemeMetadata {
  id: ThemeType;
  name: string;
  description: string;
  hasHeader: boolean;
  hasFooter: boolean;
  hasScroll: boolean;
  customMenuBar: boolean;
  immersionSubtheme?: "Low" | "Ultra";
}

export const CENTRALIZED_THEMES_REGISTRY: Record<ThemeType, ThemeMetadata> = {
  Dark: {
    id: "Dark",
    name: "Dark Theme",
    description: "Original dark luxury theme with full header, footer, menu bar, and visual HUD.",
    hasHeader: true,
    hasFooter: true,
    hasScroll: true,
    customMenuBar: false
  },
  Light: {
    id: "Light",
    name: "Light Theme",
    description: "Clean light theme with tatami-inspired accents for daytime comfort.",
    hasHeader: true,
    hasFooter: true,
    hasScroll: true,
    customMenuBar: false
  },
  Quilted: {
    id: "Quilted",
    name: "Quilted Tatami Theme",
    description: "Quilted night-time header and frame over tatami, formatted like a children's book.",
    hasHeader: true,
    hasFooter: true,
    hasScroll: true,
    customMenuBar: true
  },
  Garden: {
    id: "Garden",
    name: "Garden Theme",
    description: "Daytime garden sky and brick outer frame around rectangular game view.",
    hasHeader: false,
    hasFooter: true,
    hasScroll: true,
    customMenuBar: true
  },
  Forest: {
    id: "Forest",
    name: "Forest Theme",
    description: "Top floating menu bar and HUD with forest trees frame and zero scrolling.",
    hasHeader: false,
    hasFooter: false,
    hasScroll: false,
    customMenuBar: true
  },
  Storybook: {
    id: "Storybook",
    name: "Storybook Theme",
    description: "Centered 8x11 open book on reading table with cream pages, pink cover, and right sidebar menu.",
    hasHeader: false,
    hasFooter: false,
    hasScroll: false,
    customMenuBar: true
  },
  Immersion_Low: {
    id: "Immersion_Low",
    name: "Immersion (Low)",
    description: "Transparent minimal HUD text overlay inspired by Mario Kart 64 with togglable menu bar.",
    hasHeader: false,
    hasFooter: false,
    hasScroll: true,
    customMenuBar: true,
    immersionSubtheme: "Low"
  },
  Immersion_Ultra: {
    id: "Immersion_Ultra",
    name: "Immersion (Ultra)",
    description: "Zero intrusive HUD graphics. Screen reader support remains fully active. Alt+Shift+F toggles menu bar.",
    hasHeader: false,
    hasFooter: false,
    hasScroll: false,
    customMenuBar: true,
    immersionSubtheme: "Ultra"
  },
  // Lowercase mappings to seamlessly prevent any compilation or runtime errors
  dark: {
    id: "dark",
    name: "Dark Theme",
    description: "Original dark luxury theme with full header, footer, menu bar, and visual HUD.",
    hasHeader: true,
    hasFooter: true,
    hasScroll: true,
    customMenuBar: false
  },
  light: {
    id: "light",
    name: "Light Theme",
    description: "Clean light theme with tatami-inspired accents for daytime comfort.",
    hasHeader: true,
    hasFooter: true,
    hasScroll: true,
    customMenuBar: false
  },
  quilted: {
    id: "quilted",
    name: "Quilted Tatami Theme",
    description: "Quilted night-time header and frame over tatami, formatted like a children's book.",
    hasHeader: true,
    hasFooter: true,
    hasScroll: true,
    customMenuBar: true
  },
  garden: {
    id: "garden",
    name: "Garden Theme",
    description: "Daytime garden sky and brick outer frame around rectangular game view.",
    hasHeader: false,
    hasFooter: true,
    hasScroll: true,
    customMenuBar: true
  },
  forest: {
    id: "forest",
    name: "Forest Theme",
    description: "Top floating menu bar and HUD with forest trees frame and zero scrolling.",
    hasHeader: false,
    hasFooter: false,
    hasScroll: false,
    customMenuBar: true
  },
  storybook: {
    id: "storybook",
    name: "Storybook Theme",
    description: "Centered 8x11 open book on reading table with cream pages, pink cover, and right sidebar menu.",
    hasHeader: false,
    hasFooter: false,
    hasScroll: false,
    customMenuBar: true
  },
  immersion_low: {
    id: "immersion_low",
    name: "Immersion (Low)",
    description: "Transparent minimal HUD text overlay inspired by Mario Kart 64 with togglable menu bar.",
    hasHeader: false,
    hasFooter: false,
    hasScroll: true,
    customMenuBar: true,
    immersionSubtheme: "Low"
  },
  immersion_ultra: {
    id: "immersion_ultra",
    name: "Immersion (Ultra)",
    description: "Zero intrusive HUD graphics. Screen reader support remains fully active. Alt+Shift+F toggles menu bar.",
    hasHeader: false,
    hasFooter: false,
    hasScroll: false,
    customMenuBar: true,
    immersionSubtheme: "Ultra"
  }
};

export const ThemesGeneral = {
  version: "1.0.0",
  status: "ACTIVE",
  defaultTheme: "Dark" as ThemeType
};
