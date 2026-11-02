/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { OpossumAIRegistryGeneral } from "./General";
import { SmartChatterAIRegistry } from "./Crafted/Smart_Chatter";
import { CompactOpossumAIRegistry } from "./Compact";

export * from "./General";
export * from "./Crafted/Smart_Chatter";
export * from "./Compact";

export const OpossumAIRegistry = {
  ...OpossumAIRegistryGeneral,
  SmartChatter: SmartChatterAIRegistry,
  Compact: CompactOpossumAIRegistry,
  timestamp: new Date().toISOString()
};
