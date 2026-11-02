/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MonkeyAIRegistry } from "../Monkey";
import { FeralPigAIRegistry } from "../Feral_Pig";

export const AnimalAIRegistry = {
  name: "Animal_AI_Category_Registry",
  species: {
    Monkey: MonkeyAIRegistry,
    FeralPig: FeralPigAIRegistry
  }
};
