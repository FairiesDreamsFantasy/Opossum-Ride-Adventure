/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumsRegistry } from "./Opossums";
import { OpossumsAttributesRegistry } from "./Opossums/Attributes";
import { OpossumsRegistryIndex } from "./Opossums/Index";
import { RidersRegistryIndex } from "./Riders/Index";
import { PigsCharacterRegistry } from "./Pigs";

export const CharactersRegistryIndex = {
  Opossums: OpossumsRegistryIndex,
  Riders: RidersRegistryIndex,
  Pigs: PigsCharacterRegistry,
  version: "1.0.0-scientific",
  standard: "100,000,000,000%_ULTRA_BROAD",
  timestamp: new Date().toISOString()
};

/**
 * Centralized Registry: Characters
 */

export const CharactersRegistry = {
  id: "characters",
  name: "Characters",
  category: "System Characters",
  Opossums: OpossumsRegistry,
  OpossumsAttributes: OpossumsAttributesRegistry,
  Pigs: PigsCharacterRegistry,
  Index: CharactersRegistryIndex,
  timestamp: new Date().toISOString()
};


