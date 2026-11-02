/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { GeminiRegistryCharactersGeneral } from "./General";
import { GeminiRegistryCharactersOpossums } from "./Opossums";
import { GeminiRegistryMoose } from "./Moose";
import { GeminiRegistryMonkeys } from "./Monkeys";
import { GeminiRegistryRiders } from "./Riders";
import { RegistryCharactersWildcard } from "./_Wildcard_";

export const GeminiRegistryCharacters = { 
  General: GeminiRegistryCharactersGeneral,
  Opossums: GeminiRegistryCharactersOpossums,
  Moose: GeminiRegistryMoose,
  Monkeys: GeminiRegistryMonkeys,
  Riders: GeminiRegistryRiders,
  Wildcard: RegistryCharactersWildcard 
};
