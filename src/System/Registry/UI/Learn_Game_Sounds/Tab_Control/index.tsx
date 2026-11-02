/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export * from "./General";
import { LEARN_GAME_SOUNDS_TABS } from "./General";

export const LearnGameSoundsTabControlRegistry = {
  name: "Learn Game Sounds Tab Control",
  tabs: LEARN_GAME_SOUNDS_TABS,
  defaultTab: "opossums" as const,
  timestamp: new Date().toISOString()
};
