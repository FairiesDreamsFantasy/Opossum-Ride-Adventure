/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ObjectSoundProfile {
  id: string;
  name: string;
  baseFrequency: number;
  decaySec: number;
  gainScalar: number;
}

export const OBJECT_SOUND_PROFILES: Record<string, ObjectSoundProfile> = {
  wind_chimes: {
    id: "wind_chimes",
    name: "Resonant Crystal Wind Chimes",
    baseFrequency: 1800.0,
    decaySec: 1.6,
    gainScalar: 0.28,
  },
  fountain: {
    id: "fountain",
    name: "Bubbling Stone Fountain",
    baseFrequency: 1000.0,
    decaySec: 0.5,
    gainScalar: 0.32,
  },
  windmill: {
    id: "windmill",
    name: "Rhythmic Wooden Windmill Hum",
    baseFrequency: 55.0,
    decaySec: 2.5,
    gainScalar: 0.45,
  }
};
