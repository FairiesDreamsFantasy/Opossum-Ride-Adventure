/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GeminiCharactersGeneral } from "../General";
import { GeminiCharactersGeneric } from "../Generic";
import { GeminiCharactersData } from "../Data";
import { GeminiCharactersAnimations } from "../Animations";
import { GeminiRiders } from "../Riders";
import { GeminiMonkeys } from "../Monkeys";
import { GeminiOpossums } from "../Opossums";
import { GeminiMoose } from "../Moose";
import { GeminiOtherAnimals } from "../Other_Animals";

export const CharactersWildcard = {
  General: GeminiCharactersGeneral,
  Generic: GeminiCharactersGeneric,
  Data: GeminiCharactersData,
  Animations: GeminiCharactersAnimations,
  Riders: GeminiRiders,
  Monkeys: GeminiMonkeys,
  Opossums: GeminiOpossums,
  Moose: GeminiMoose,
  OtherAnimals: GeminiOtherAnimals,
  systemName: "Gemini AI Characters Unified Coordination Engine"
};

export * from "../Data";
