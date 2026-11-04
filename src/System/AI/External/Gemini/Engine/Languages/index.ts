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
import { GeminiGOEngine } from "../GO";
import { GeminiJavaEngine } from "../Java";
import { GeminiSQLEngine } from "../SQL";
import { GeminiCotlinEngine } from "../Cotlin";

export const GeminiPolyglotEngineLanguages = {
  C: GeminiCEngineBridge,
  CPP: GeminiCPPEngineBridge,
  CSharp: GeminiCSharpEngineBridge,
  Assembly: GeminiAssemblyEngineBridge,
  WebAssembly: GeminiWebAssemblyEngineBridge,
  Python: GeminiPythonEngineBridge,
  GO: GeminiGOEngine,
  Java: GeminiJavaEngine,
  SQL: GeminiSQLEngine,
  Cotlin: GeminiCotlinEngine
};

export {
  GeminiCEngineBridge,
  GeminiCPPEngineBridge,
  GeminiCSharpEngineBridge,
  GeminiAssemblyEngineBridge,
  GeminiWebAssemblyEngineBridge,
  GeminiPythonEngineBridge,
  GeminiGOEngine,
  GeminiJavaEngine,
  GeminiSQLEngine,
  GeminiCotlinEngine
};

export default GeminiPolyglotEngineLanguages;
