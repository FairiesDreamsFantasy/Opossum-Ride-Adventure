/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export * from "./General";
export * from "./Smart_Chatter";
export * from "./Compact";

import { OpossumAIGeneralConfig } from "./General";
import * as SmartChatterModule from "./Smart_Chatter";
import { CompactOpossumAI } from "./Compact";

export const OpossumAI = {
  General: OpossumAIGeneralConfig,
  SmartChatter: SmartChatterModule,
  Compact: CompactOpossumAI
};
