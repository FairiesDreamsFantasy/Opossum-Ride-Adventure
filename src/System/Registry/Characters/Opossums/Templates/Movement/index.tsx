/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TrotMovementTemplate } from "./Trot";
import { JumpMovementTemplate } from "./Jump";
import { TurnMovementTemplate } from "./Turn";
import { StrafeMovementTemplate } from "./Strafe";

export * from "./Trot";
export * from "./Jump";
export * from "./Turn";
export * from "./Strafe";

export const OpossumMovementRegistry = {
  trot: TrotMovementTemplate,
  jump: JumpMovementTemplate,
  turn: TurnMovementTemplate,
  strafe: StrafeMovementTemplate
};
