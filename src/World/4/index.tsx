/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { World4General } from "./General";
import { World4LevelPlaceIds } from "./Levels";

export * from "./General";
export * from "./Levels";
export * from "./Index";

export const World4PlaceIds = [...World4LevelPlaceIds];

export default World4General;
