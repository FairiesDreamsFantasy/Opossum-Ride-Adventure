/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export * from "./General";

import { CompactOpossumAIPhysics, CompactOpossumAIState, StompDetectionResult } from "./General";

export const CompactOpossumAI = {
  Physics: CompactOpossumAIPhysics,
  createInitialState: CompactOpossumAIPhysics.createInitialState.bind(CompactOpossumAIPhysics),
  triggerJump: CompactOpossumAIPhysics.triggerJump.bind(CompactOpossumAIPhysics),
  evaluateStompCollision: CompactOpossumAIPhysics.evaluateStompCollision.bind(CompactOpossumAIPhysics),
  updatePhysics: CompactOpossumAIPhysics.updatePhysics.bind(CompactOpossumAIPhysics)
};
