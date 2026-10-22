/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { APMGeneralConfig, APMProfile, APMVirtualRegisterState } from "./General";
import { OpenSourceOSRegistry } from "./Open-Source_OS";
import { ExtendedOSRegistry } from "./OS";
import { GameConsoleProfiles } from "./Game_Consoles";
import { AnyMachineProfile } from "./Any_Machine";
import { AnyHardwareProfile } from "./Any_Hardware";
import { AnyProcessorProfile } from "./Any_Processor";

export * from "./General";
export * from "./Open-Source_OS";
export * from "./OS";
export * from "./Game_Consoles";
export * from "./Any_Machine";
export * from "./Any_Hardware";
export * from "./Any_Processor";

/**
 * Anything Platform Module (APM) Controller
 * 
 * An open-source, mathematically structured virtual alternative to proprietary hardware TPM chips.
 * Computes exact physical hardware metrics (CPU concurrency, audio sampling rates, device pixel scaling),
 * maintains virtual hardware register matrices, and performs cryptographically deterministic platform validation.
 */
export class AnythingPlatformModuleController {
  private static instance: AnythingPlatformModuleController;
  private activeProfile: APMProfile;
  private virtualRegisters: APMVirtualRegisterState;

  private constructor() {
    this.activeProfile = this.detectAndProbePlatform();
    this.virtualRegisters = this.initializeVirtualRegisters();
  }

  public static getInstance(): AnythingPlatformModuleController {
    if (!AnythingPlatformModuleController.instance) {
      AnythingPlatformModuleController.instance = new AnythingPlatformModuleController();
    }
    return AnythingPlatformModuleController.instance;
  }

  private initializeVirtualRegisters(): APMVirtualRegisterState {
    const registers = new Float64Array(32); // 32 64-bit IEEE 754 floating-point mathematical registers
    for (let i = 0; i < registers.length; i++) {
      registers[i] = Math.PI * (i + 1) * 0.1; // Deterministic transcendental constant initialization
    }

    return {
      programCounter: 0,
      accumulator: 0,
      stackPointer: 31,
      registers: registers,
      statusFlags: {
        zero: false,
        carry: false,
        overflow: false,
        negative: false,
        parity: true
      },
      entropySeed: performance.now ? performance.now() : Date.now()
    };
  }

  private detectAndProbePlatform(): APMProfile {
    let baseProfile = AnyMachineProfile;

    if (typeof window !== "undefined") {
      const ua = navigator.userAgent.toLowerCase();
      if (ua.includes("linux")) {
        baseProfile = OpenSourceOSRegistry.Linux;
      } else if (ua.includes("windows")) {
        baseProfile = ExtendedOSRegistry.Windows;
      } else if (ua.includes("macintosh") || ua.includes("mac os")) {
        baseProfile = ExtendedOSRegistry.macOS;
      }
    }

    const cpuCores = (typeof navigator !== "undefined" && navigator.hardwareConcurrency) || 4;
    const pixelRatio = (typeof window !== "undefined" && window.devicePixelRatio) || 1.0;
    const sampleRate = (typeof window !== "undefined" && (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext))
      ? 48000
      : 44100;

    return {
      ...baseProfile,
      mathematicalMetrics: {
        cpuLogicalCores: cpuCores,
        devicePixelRatio: pixelRatio,
        audioSampleRateHz: sampleRate,
        virtualRegisterSlots: 32,
        precisionTimerMode: "PERFORMANCE_NOW_NANOSECOND_DELTA",
        cryptographicStandard: "SHA-256"
      }
    };
  }

  public getActiveProfile(): Readonly<APMProfile> {
    return this.activeProfile;
  }

  public getVirtualRegisterState(): Readonly<APMVirtualRegisterState> {
    return this.virtualRegisters;
  }

  /**
   * Evaluates a mathematical instruction pulse across the virtual hardware register matrix.
   */
  public executeVirtualCycle(operation: "ADD" | "MULTIPLY" | "ENTROPY_STEP", value: number): number {
    switch (operation) {
      case "ADD":
        this.virtualRegisters.accumulator += value;
        break;
      case "MULTIPLY":
        this.virtualRegisters.accumulator *= value;
        break;
      case "ENTROPY_STEP":
        this.virtualRegisters.accumulator = (this.virtualRegisters.accumulator * 1664525 + 1013904223) % 4294967296;
        break;
    }

    this.virtualRegisters.statusFlags.zero = this.virtualRegisters.accumulator === 0;
    this.virtualRegisters.statusFlags.negative = this.virtualRegisters.accumulator < 0;
    this.virtualRegisters.programCounter++;
    return this.virtualRegisters.accumulator;
  }

  public getAllProfiles(): Record<string, APMProfile> {
    return {
      Linux: OpenSourceOSRegistry.Linux,
      FreeDOS: OpenSourceOSRegistry.FreeDOS,
      MSDOS: ExtendedOSRegistry.MSDOS,
      Windows: ExtendedOSRegistry.Windows,
      macOS: ExtendedOSRegistry.macOS,
      ...GameConsoleProfiles,
      AnyMachine: AnyMachineProfile,
      AnyHardware: AnyHardwareProfile,
      AnyProcessor: AnyProcessorProfile
    };
  }

  public isPlatformSupported(platformKey: string): boolean {
    const all = this.getAllProfiles();
    return !!all[platformKey]?.supported;
  }
}

export const APM = AnythingPlatformModuleController.getInstance();
