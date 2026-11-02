/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumsSoundsGeneralRegistry } from "./General";
import { ElegantChatterSoundsRegistry } from "./Elegant_Chatter";
import { JumpSoundsRegistry } from "./Jump";

export * from "./General";
export * from "./Elegant_Chatter";
export * from "./Jump";

export const OpossumSoundsTemplatesRegistry = {
  general: OpossumsSoundsGeneralRegistry,
  elegantChatter: ElegantChatterSoundsRegistry,
  jump: JumpSoundsRegistry
};
