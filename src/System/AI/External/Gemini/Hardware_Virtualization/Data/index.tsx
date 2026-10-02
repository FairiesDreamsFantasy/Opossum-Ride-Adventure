/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface HardwareVirtualizationDataProfile {
  id: string;
  deviceName: string;
  profileType: "HighPerformanceDesktop" | "MobileEmbedded" | "WorkstationVGPU" | "AudioDSPStation";
  vGpuMemoryMB: number;
  vCpuCores: number;
  dspLatencyToleranceMs: number;
  isVirtualizationActive: boolean;
}

export const GeminiHardwareVirtualizationDataProfiles: HardwareVirtualizationDataProfile[] = [
  {
    id: "profile_001_ultra_desktop",
    deviceName: "Gemini Virtual Workstation Alpha",
    profileType: "HighPerformanceDesktop",
    vGpuMemoryMB: 16384,
    vCpuCores: 16,
    dspLatencyToleranceMs: 2.0,
    isVirtualizationActive: true,
  },
  {
    id: "profile_002_mobile_embedded",
    deviceName: "Gemini Virtual Mobile Edge",
    profileType: "MobileEmbedded",
    vGpuMemoryMB: 4096,
    vCpuCores: 8,
    dspLatencyToleranceMs: 10.0,
    isVirtualizationActive: true,
  },
  {
    id: "profile_003_audio_dsp",
    deviceName: "Gemini Virtual Synthesizer DSP Station",
    profileType: "AudioDSPStation",
    vGpuMemoryMB: 2048,
    vCpuCores: 4,
    dspLatencyToleranceMs: 0.5,
    isVirtualizationActive: true,
  },
];

export const GeminiHardwareVirtualizationData = {
  systemName: "Gemini Hardware Virtualization Data Subsystem",
  profiles: GeminiHardwareVirtualizationDataProfiles,
  defaultProfile: GeminiHardwareVirtualizationDataProfiles[0],
};
