/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SoundAssemblyGeneral } from "./General";
import { CSoundNativeBufferBridge } from "./C";
import { CPPSoundBiquadFilter } from "./CPP";
import { CSharpSoundEmitterManager } from "./CSharp";
import { WASMSoundMemoryBridge } from "./Web_Assembly";

export * from "./General";
export * from "./C";
export * from "./CPP";
export * from "./CSharp";
export * from "./Web_Assembly";

export const SoundAssembly = {
  General: SoundAssemblyGeneral,
  C: CSoundNativeBufferBridge,
  CPP: CPPSoundBiquadFilter,
  CSharp: CSharpSoundEmitterManager,
  Web_Assembly: WASMSoundMemoryBridge,
};

export default SoundAssembly;
