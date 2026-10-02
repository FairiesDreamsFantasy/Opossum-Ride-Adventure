/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CPUSpecification {
  arch: string;
  virtualCores: number;
  clockSpeedGHz: number;
  simdSupport: string[];
}

export const CPURegistry: CPUSpecification = {
  arch: "x86_64 / ARM64 Virtualized",
  virtualCores: 8,
  clockSpeedGHz: 3.5,
  simdSupport: ["AVX2", "NEON", "WebAssembly SIMD128"]
};
