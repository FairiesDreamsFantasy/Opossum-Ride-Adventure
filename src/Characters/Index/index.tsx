/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CharactersIndexGeneral } from "./General";
import { OpossumsIndex } from "../Opossums/Index";
import { RidersIndex } from "../Riders/Index";

export * from "./General";

export const CharactersIndex = {
  General: CharactersIndexGeneral,
  Opossums: OpossumsIndex,
  Riders: RidersIndex,
  standard: "75,000,000,000%_ULTRA_BROAD",
  timestamp: new Date().toISOString()
};
