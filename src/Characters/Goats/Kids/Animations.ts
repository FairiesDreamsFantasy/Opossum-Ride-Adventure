/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoatCameoAudioParams, GoatCameoGait, GoatCameoPalette } from "../types";

export const GOAT_KID_GAIT_FREQUENCIES: GoatCameoGait = {
  walk: 1.15,
  trot: 1.75,
  canter: 2.4,
  gallop: 3.1,
  viriable: 1.9,
  interval: 170
};

export const GOAT_KID_AUDIO_PARAMS: Record<string, GoatCameoAudioParams> = {
  kid_pip: { baseFreq: 455, duration: 0.36, fmRate: 17, fmDepth: 0.05, oscType: "sawtooth", filterFreq: 920, filterType: "bandpass", filterQ: 3.5, pitchSweepRatio: 1.06 },
  kid_clover: { baseFreq: 430, duration: 0.38, fmRate: 16, fmDepth: 0.05, oscType: "triangle", secondOscType: "sawtooth", secondOscFreqRatio: 2.0, pitchSweepRatio: 0.96 },
  kid_pebble: { baseFreq: 405, duration: 0.40, fmRate: 15, fmDepth: 0.05, oscType: "sawtooth", filterFreq: 860, filterType: "bandpass", filterQ: 3.5, pitchSweepRatio: 0.94 },
  kid_bramble: { baseFreq: 415, duration: 0.38, fmRate: 16, fmDepth: 0.05, oscType: "triangle", pitchSweepRatio: 1.04 },
  kid_sprout: { baseFreq: 470, duration: 0.34, fmRate: 18, fmDepth: 0.06, oscType: "sawtooth", filterFreq: 950, filterType: "bandpass", filterQ: 3.5, pitchSweepRatio: 1.08 },
  kid_sunny: { baseFreq: 445, duration: 0.37, fmRate: 16, fmDepth: 0.04, oscType: "sine", secondOscType: "triangle", secondOscFreqRatio: 2.0, pitchSweepRatio: 1.02 }
};

export const GOAT_KID_PALETTES: Record<string, GoatCameoPalette> = {
  kid_pip: {
    coatPrimary: "#FFFBEB",
    coatSecondary: "#FDE68A",
    bellyColor: "#FFFFFF",
    earOuter: "#FEF3C7",
    earInner: "#FCE7F3",
    hornColorHex: "#FDE68A",
    hornStyle: "kid_nub",
    eyeColorHex: "#FBBF24",
    hoofColor: "#475569",
    muzzleColor: "#FDE2E4",
    pattern: "solid"
  },
  kid_clover: {
    coatPrimary: "#FFFBEB",
    coatSecondary: "#92400E",
    coatMarkings: "#374151",
    bellyColor: "#FEF3C7",
    earOuter: "#78350F",
    earInner: "#FBCFE8",
    hornColorHex: "#E7E5E4",
    hornStyle: "kid_nub",
    eyeColorHex: "#78350F",
    hoofColor: "#334155",
    muzzleColor: "#FDE68A",
    pattern: "tricolor"
  },
  kid_pebble: {
    coatPrimary: "#CBD5E1",
    coatSecondary: "#64748B",
    coatMarkings: "#475569",
    bellyColor: "#E2E8F0",
    earOuter: "#64748B",
    earInner: "#E2E8F0",
    hornColorHex: "#94A3B8",
    hornStyle: "kid_nub",
    eyeColorHex: "#7DD3FC",
    hoofColor: "#1E293B",
    muzzleColor: "#94A3B8",
    pattern: "bicolor_alpine"
  },
  kid_bramble: {
    coatPrimary: "#B45309",
    coatSecondary: "#78350F",
    coatMarkings: "#FEF3C7",
    bellyColor: "#D97706",
    earOuter: "#78350F",
    earInner: "#FDE68A",
    hornColorHex: "#D6D3D1",
    hornStyle: "kid_nub",
    eyeColorHex: "#22C55E",
    hoofColor: "#451A03",
    muzzleColor: "#D97706",
    pattern: "dappled"
  },
  kid_sprout: {
    coatPrimary: "#FFEDD5",
    coatSecondary: "#C2410C",
    coatMarkings: "#9A3412",
    bellyColor: "#FED7AA",
    earOuter: "#EA580C",
    earInner: "#FDE68A",
    hornColorHex: null,
    hornStyle: "none",
    eyeColorHex: "#A16207",
    hoofColor: "#451A03",
    muzzleColor: "#FED7AA",
    pattern: "spotted"
  },
  kid_sunny: {
    coatPrimary: "#FEF08A",
    coatSecondary: "#EAB308",
    bellyColor: "#FEF9C3",
    earOuter: "#FACC15",
    earInner: "#FBCFE8",
    hornColorHex: "#FDE047",
    hornStyle: "kid_nub",
    eyeColorHex: "#3B82F6",
    hoofColor: "#78350F",
    muzzleColor: "#FEF08A",
    pattern: "solid"
  }
};
