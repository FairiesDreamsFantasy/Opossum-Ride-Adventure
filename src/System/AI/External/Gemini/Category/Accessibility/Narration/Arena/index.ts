/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GeminiFoyerGenerativeNarration } from "./Foyer";
import { GeminiGardenGenerativeNarration } from "./Garden";
import { GeminiCellarGenerativeNarration } from "./Cellar";
import { GeminiPorchGenerativeNarration } from "./Porch";
import { GeminiManorsvilleGenerativeNarration } from "./Manorsville";

export const GeminiArenaGenerativeNarrationRegistry = {
  Foyer: GeminiFoyerGenerativeNarration,
  Garden: GeminiGardenGenerativeNarration,
  Cellar: GeminiCellarGenerativeNarration,
  Porch: GeminiPorchGenerativeNarration,
  Manorsville: GeminiManorsvilleGenerativeNarration
};

export {
  GeminiFoyerGenerativeNarration,
  GeminiGardenGenerativeNarration,
  GeminiCellarGenerativeNarration,
  GeminiPorchGenerativeNarration,
  GeminiManorsvilleGenerativeNarration
};

export default GeminiArenaGenerativeNarrationRegistry;
