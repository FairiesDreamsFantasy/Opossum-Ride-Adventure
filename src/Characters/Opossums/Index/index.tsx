/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OPOSSUM_CHARACTERS } from "../index";

export const OpossumsIndex = {
  id: "opossums_index",
  list: OPOSSUM_CHARACTERS,
  count: OPOSSUM_CHARACTERS.length,
  getById: (id: string) => OPOSSUM_CHARACTERS.find((o) => o.id === id),
  getByName: (name: string) => OPOSSUM_CHARACTERS.find((o) => o.name.toLowerCase() === name.toLowerCase()),
  standard: "75,000,000,000%_ULTRA_BROAD",
  timestamp: new Date().toISOString()
};
