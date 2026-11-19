/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Level_0General } from "./General";

export * from "./General";
export * from "./Courtyard";
export * from "./North_Garden";
export * from "./South_Tea_Area";
export * from "./Temple_Foyer";

export const Level_0 = {
  id: 0,
  world: 2,
  name: "Temple Courtyard & Entrance Foyer",
  placeId: "temple_courtyard",
  General: Level_0General
};

export default Level_0;
