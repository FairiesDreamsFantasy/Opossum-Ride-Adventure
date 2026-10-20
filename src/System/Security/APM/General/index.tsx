/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface APMProfile {
  platformId: string;
  category: "OPEN_SOURCE_OS" | "LEGACY_OS" | "GAME_CONSOLE" | "ANY_MACHINE" | "ANY_HARDWARE" | "ANY_PROCESSOR";
  supported: boolean;
  capabilities: {
    webAudio: boolean;
    canvas2D: boolean;
    highPrecisionTimer: boolean;
    cryptoSubtle: boolean;
    gamepadAPI: boolean;
    touchEvents: boolean;
  };
  architectureTarget: string;
  mathematicalMetrics?: {
    cpuLogicalCores: number;
    devicePixelRatio: number;
    audioSampleRateHz: number;
    virtualRegisterSlots: number;
    precisionTimerMode: "PERFORMANCE_NOW_NANOSECOND_DELTA";
    cryptographicStandard: "SHA-256";
  };
}

export interface APMVirtualRegisterState {
  programCounter: number;
  accumulator: number;
  stackPointer: number;
  registers: Float64Array;
  statusFlags: {
    zero: boolean;
    carry: boolean;
    overflow: boolean;
    negative: boolean;
    parity: boolean;
  };
  entropySeed: number;
}

export const APMGeneralConfig = {
  name: "Anything Platform Module (APM)",
  version: "0.2.6.0",
  standard: "40,000,000,000%_ULTRA_BROAD",
  mode: "UNIVERSAL_OPEN_SOURCE_PLATFORM_ADAPTER",
  description: "Virtual open-source mathematical alternative to closed-source hardware TPM chips, ensuring universal cross-platform execution."
};
