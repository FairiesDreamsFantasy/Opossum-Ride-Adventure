/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { World3General } from "./General";
import { generateWorld3Level } from "./Levels";

export * from "./General";
export * from "./Levels";
export * from "./Index";


export const World3PlaceIds = [
  "simulated_gold_mine",
  "simulated_silver_mine",
  "simulated_emerald_mine",
  "simulated_diamond_mine",
  "simulated_salt_mine",
  "gold_mine",
  "silver_mine",
  "emerald_mine",
  "diamond_mine",
  "salt_mine"
];

export default World3General;
