/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Flooring Specific Sound Surface Definitions & 64-bit Precision Audio Parameters
 * Supports 64-bit primary high-precision floating-point audio parameters
 * with support for 8-bit, 16-bit, and 32-bit depth retro modes for special cases.
 */

export type AudioBitDepth = 8 | 16 | 32 | 64;

export interface FlooringSurfaceSoundProfile {
  id: string;
  name: string;
  bitDepth: AudioBitDepth;
  frequencyHz: number;
  qualityFactor: number;
  gainScalar: number;
  thudFrequencyHz: number;
  resonanceDamping: number;
  surfaceFriction: number;
}

export const PRIMARY_BIT_DEPTH: AudioBitDepth = 64;

export const FLOORING_SURFACE_PROFILES_64BIT: Record<string, FlooringSurfaceSoundProfile> = {
  ceramic: {
    id: "ceramic",
    name: "Ceramic Tile Surface",
    bitDepth: 64,
    frequencyHz: 2400.000000000000,
    qualityFactor: 6.000000000000,
    gainScalar: 1.000000000000,
    thudFrequencyHz: 80.000000000000,
    resonanceDamping: 0.050000000000,
    surfaceFriction: 0.700000000000,
  },
  tile: {
    id: "tile",
    name: "Tile Surface",
    bitDepth: 64,
    frequencyHz: 2400.000000000000,
    qualityFactor: 6.000000000000,
    gainScalar: 1.000000000000,
    thudFrequencyHz: 80.000000000000,
    resonanceDamping: 0.050000000000,
    surfaceFriction: 0.700000000000,
  },
  hardwood: {
    id: "hardwood",
    name: "Hardwood Surface",
    bitDepth: 64,
    frequencyHz: 400.000000000000,
    qualityFactor: 3.000000000000,
    gainScalar: 1.150000000000,
    thudFrequencyHz: 65.000000000000,
    resonanceDamping: 0.120000000000,
    surfaceFriction: 0.750000000000,
  },
  wood: {
    id: "wood",
    name: "Wood Decking Surface",
    bitDepth: 64,
    frequencyHz: 350.000000000000,
    qualityFactor: 2.500000000000,
    gainScalar: 1.100000000000,
    thudFrequencyHz: 60.000000000000,
    resonanceDamping: 0.150000000000,
    surfaceFriction: 0.800000000000,
  },
  carpet: {
    id: "carpet",
    name: "Carpeted Surface",
    bitDepth: 64,
    frequencyHz: 200.000000000000,
    qualityFactor: 1.500000000000,
    gainScalar: 0.800000000000,
    thudFrequencyHz: 40.000000000000,
    resonanceDamping: 0.400000000000,
    surfaceFriction: 0.900000000000,
  },
  rug: {
    id: "rug",
    name: "Area Rug Surface",
    bitDepth: 64,
    frequencyHz: 220.000000000000,
    qualityFactor: 1.800000000000,
    gainScalar: 0.850000000000,
    thudFrequencyHz: 45.000000000000,
    resonanceDamping: 0.350000000000,
    surfaceFriction: 0.850000000000,
  },
  stone: {
    id: "stone",
    name: "Stone Surface",
    bitDepth: 64,
    frequencyHz: 1600.000000000000,
    qualityFactor: 5.000000000000,
    gainScalar: 1.200000000000,
    thudFrequencyHz: 100.000000000000,
    resonanceDamping: 0.080000000000,
    surfaceFriction: 0.820000000000,
  },
  asphalt: {
    id: "asphalt",
    name: "Asphalt Surface",
    bitDepth: 64,
    frequencyHz: 1100.000000000000,
    qualityFactor: 3.500000000000,
    gainScalar: 1.050000000000,
    thudFrequencyHz: 90.000000000000,
    resonanceDamping: 0.200000000000,
    surfaceFriction: 0.880000000000,
  },
  soil: {
    id: "soil",
    name: "Natural Soil Surface",
    bitDepth: 64,
    frequencyHz: 1200.000000000000,
    qualityFactor: 4.000000000000,
    gainScalar: 1.000000000000,
    thudFrequencyHz: 80.000000000000,
    resonanceDamping: 0.250000000000,
    surfaceFriction: 0.800000000000,
  },
  gravel: {
    id: "gravel",
    name: "Gravel Path Surface",
    bitDepth: 64,
    frequencyHz: 1800.000000000000,
    qualityFactor: 4.500000000000,
    gainScalar: 1.100000000000,
    thudFrequencyHz: 85.000000000000,
    resonanceDamping: 0.180000000000,
    surfaceFriction: 0.780000000000,
  },
  granite: {
    id: "granite",
    name: "Granite Peak Surface",
    bitDepth: 64,
    frequencyHz: 1750.000000000000,
    qualityFactor: 5.200000000000,
    gainScalar: 1.250000000000,
    thudFrequencyHz: 110.000000000000,
    resonanceDamping: 0.060000000000,
    surfaceFriction: 0.850000000000,
  },
  marble: {
    id: "marble",
    name: "Polished Marble Surface",
    bitDepth: 64,
    frequencyHz: 1900.000000000000,
    qualityFactor: 5.500000000000,
    gainScalar: 1.300000000000,
    thudFrequencyHz: 115.000000000000,
    resonanceDamping: 0.040000000000,
    surfaceFriction: 0.880000000000,
  },
  slate: {
    id: "slate",
    name: "Slate Tile Surface",
    bitDepth: 64,
    frequencyHz: 1650.000000000000,
    qualityFactor: 4.800000000000,
    gainScalar: 1.180000000000,
    thudFrequencyHz: 105.000000000000,
    resonanceDamping: 0.070000000000,
    surfaceFriction: 0.840000000000,
  },
  grass: {
    id: "grass",
    name: "Lush Grass Surface",
    bitDepth: 64,
    frequencyHz: 400.000000000000,
    qualityFactor: 1.000000000000,
    gainScalar: 0.850000000000,
    thudFrequencyHz: 50.000000000000,
    resonanceDamping: 0.350000000000,
    surfaceFriction: 0.750000000000,
  },
  mulch: {
    id: "mulch",
    name: "Pine Mulch Surface",
    bitDepth: 64,
    frequencyHz: 450.000000000000,
    qualityFactor: 1.200000000000,
    gainScalar: 0.900000000000,
    thudFrequencyHz: 55.000000000000,
    resonanceDamping: 0.300000000000,
    surfaceFriction: 0.720000000000,
  },
  snow: {
    id: "snow",
    name: "Alpine Snow Surface",
    bitDepth: 64,
    frequencyHz: 300.000000000000,
    qualityFactor: 0.600000000000,
    gainScalar: 0.700000000000,
    thudFrequencyHz: 35.000000000000,
    resonanceDamping: 0.500000000000,
    surfaceFriction: 0.600000000000,
  },
  sand: {
    id: "sand",
    name: "Desert Sand Surface",
    bitDepth: 64,
    frequencyHz: 500.000000000000,
    qualityFactor: 1.100000000000,
    gainScalar: 0.800000000000,
    thudFrequencyHz: 45.000000000000,
    resonanceDamping: 0.450000000000,
    surfaceFriction: 0.650000000000,
  },
  ice: {
    id: "ice",
    name: "Glacial Ice Surface",
    bitDepth: 64,
    frequencyHz: 2200.000000000000,
    qualityFactor: 6.000000000000,
    gainScalar: 1.350000000000,
    thudFrequencyHz: 120.000000000000,
    resonanceDamping: 0.020000000000,
    surfaceFriction: 0.300000000000,
  }
};

/**
 * Quantize sound parameters based on target bit depth (8, 16, 32, or 64 bit).
 * Ensures zero heap memory allocation for extreme performance.
 */
export function quantizeAudioParameter(val: number, bitDepth: AudioBitDepth): number {
  if (bitDepth === 64) {
    // 64-bit IEEE 754 double precision floating point (native JavaScript float64)
    return val;
  }
  if (bitDepth === 32) {
    // Single precision float32 representation
    return Math.fround(val);
  }
  if (bitDepth === 16) {
    // 16-bit integer quantization step
    const steps = 65536;
    return Math.round(val * steps) / steps;
  }
  if (bitDepth === 8) {
    // 8-bit retro integer quantization step
    const steps = 256;
    return Math.round(val * steps) / steps;
  }
  return val;
}
