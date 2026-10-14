/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RIDER_CHARACTERS } from "../index";

export const RidersIndex = {
  id: "riders_index",
  list: RIDER_CHARACTERS,
  count: RIDER_CHARACTERS.length,
  getById: (id: string) => RIDER_CHARACTERS.find((r) => r.id === id),
  standard: "75,000,000,000%_ULTRA_BROAD",
  timestamp: new Date().toISOString()
};
