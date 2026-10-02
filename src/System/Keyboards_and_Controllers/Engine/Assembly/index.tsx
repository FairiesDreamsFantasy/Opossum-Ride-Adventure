/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { InputAssemblyGeneral } from "./General";
import { CInputNativeBufferBridge } from "./C";
import { CPPInputDeadzoneProcessor } from "./CPP";
import { CSharpInputActionManager } from "./CSharp";
import { WASMInputMemoryBridge } from "./Web_Assembly";

export * from "./General";
export * from "./C";
export * from "./CPP";
export * from "./CSharp";
export * from "./Web_Assembly";

export const KeyboardsAssembly = {
  General: InputAssemblyGeneral,
  C: CInputNativeBufferBridge,
  CPP: CPPInputDeadzoneProcessor,
  CSharp: CSharpInputActionManager,
  Web_Assembly: WASMInputMemoryBridge,
};

export default KeyboardsAssembly;
