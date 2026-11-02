/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type MobileLayoutStyleType = "retro-vertical" | "picture-window" | "double-screen";

export interface MobileLayoutStyleMetadata {
  id: MobileLayoutStyleType;
  name: string;
  shortName: string;
  description: string;
  iconName: string;
  supportsTouchController: boolean;
  supportsDualView: boolean;
  defaultFov: number;
}

export const MOBILE_LAYOUT_STYLES: Record<MobileLayoutStyleType, MobileLayoutStyleMetadata> = {
  "retro-vertical": {
    id: "retro-vertical",
    name: "Retro Vertical Screen",
    shortName: "Vertical",
    description: "Full-bleed edge-to-edge vertical arcade screen with native touch-gesture steering and jump controls.",
    iconName: "Smartphone",
    supportsTouchController: true,
    supportsDualView: false,
    defaultFov: 75
  },
  "picture-window": {
    id: "picture-window",
    name: "Picture Window Panorama",
    shortName: "Panorama",
    description: "Fused dual game views creating a contiguous vertical viewport: upper sky vault + lower horizon track.",
    iconName: "Columns",
    supportsTouchController: true,
    supportsDualView: true,
    defaultFov: 65
  },
  "double-screen": {
    id: "double-screen",
    name: "Double Screen Handheld",
    shortName: "Dual-Screen",
    description: "Stacked dual-screen console with upper live run & lower tactile touch deck celebrating Black-owned craftsmanship and Rastafari tricolors.",
    iconName: "Layers",
    supportsTouchController: true,
    supportsDualView: true,
    defaultFov: 60
  }
};
