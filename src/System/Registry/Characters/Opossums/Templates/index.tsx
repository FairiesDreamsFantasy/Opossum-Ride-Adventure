/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumGeneralTemplate } from "./General";
import { OpossumMovementRegistry } from "./Movement";

export * from "./General";
export * from "./Movement";

export const OpossumTemplatesRegistry = {
  general: OpossumGeneralTemplate,
  movement: OpossumMovementRegistry
};
