/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AntiBotRegistryGeneral } from "./General";
import { AntiBot } from "../../../Security/Anti-Bot";

export * from "./General";

export const AntiBotRegistry = {
  General: AntiBotRegistryGeneral,
  Controller: AntiBot,
  getStatus: () => ({
    active: true,
    metrics: AntiBot.getMetrics(),
    isHuman: AntiBot.isHumanPlayer()
  })
};
