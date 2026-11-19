/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type GoatCameoSizeClass = "kid" | "small" | "large" | "largest";
export type GoatCameoGender = "female" | "male";

export interface GoatCameoAudioParams {
  baseFreq: number;
  duration: number;
  fmRate: number;
  fmDepth: number;
  oscType: OscillatorType;
  pitchSweepRatio?: number;
  secondOscType?: OscillatorType;
  secondOscFreqRatio?: number;
  filterFreq?: number;
  filterType?: BiquadFilterType;
  filterQ?: number;
}

export interface GoatCameoGait {
  walk: number;
  trot: number;
  canter: number;
  gallop: number;
  viriable: number;
  interval: number;
}

export interface GoatCameoPalette {
  coatPrimary: string;
  coatSecondary: string;
  coatMarkings?: string;
  bellyColor: string;
  earOuter: string;
  earInner: string;
  hornColorHex: string | null;
  hornStyle: "standard" | "curved_ram" | "none" | "budding" | "kid_nub";
  eyeColorHex: string;
  hoofColor: string;
  muzzleColor: string;
  pattern: "solid" | "spotted" | "tricolor" | "dappled" | "bicolor_alpine";
}

export interface GoatCameoDescription {
  id: string;
  name: string;
  gender: GoatCameoGender;
  ageClass: "adult" | "kid";
  color: string;
  hornColor: string;
  eyeColor: string;
  text: string[];
  cameoOrigin: string;
}

export interface GoatCameoDimensions {
  length: string;
  height: string;
  chest: string;
  width: string;
  size: GoatCameoSizeClass;
  lengthMeters: number;
  heightMeters: number;
  widthMeters: number;
  renderScale: number;
}

export interface GoatCameoProfile {
  id: string;
  name: string;
  gender: GoatCameoGender;
  ageClass: "adult" | "kid";
  color: string;
  hornColor: string;
  eyeColor: string;
  description: string[];
  cameoOrigin: string;
  dimensions: GoatCameoDimensions;
  audio: GoatCameoAudioParams;
  gait: GoatCameoGait;
  palette: GoatCameoPalette;
  grazePreference: {
    grazeFrequencyMultiplier: number;
    socialChatterRate: number;
    rampAgility: number;
  };
}
