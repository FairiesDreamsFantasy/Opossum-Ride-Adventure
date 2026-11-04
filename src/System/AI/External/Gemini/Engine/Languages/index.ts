/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GeminiCEngineBridge } from "./C";
import { GeminiCPPEngineBridge } from "./CPP";
import { GeminiCSharpEngineBridge } from "./CSharp";
import { GeminiAssemblyEngineBridge } from "./Assembly";
import { GeminiWebAssemblyEngineBridge } from "./WebAssembly";
import { GeminiPythonEngineBridge } from "./Python";

export const GeminiPolyglotEngineLanguages = {
  C: GeminiCEngineBridge,
  CPP: GeminiCPPEngineBridge,
  CSharp: GeminiCSharpEngineBridge,
  Assembly: GeminiAssemblyEngineBridge,
  WebAssembly: GeminiWebAssemblyEngineBridge,
  Python: GeminiPythonEngineBridge
};

export {
  GeminiCEngineBridge,
  GeminiCPPEngineBridge,
  GeminiCSharpEngineBridge,
  GeminiAssemblyEngineBridge,
  GeminiWebAssemblyEngineBridge,
  GeminiPythonEngineBridge
};

export default GeminiPolyglotEngineLanguages;
