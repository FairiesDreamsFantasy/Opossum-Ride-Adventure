/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export * from "./General";

import { CompactOpossumAIPhysics, CompactOpossumAIState, SmashDetectionResult } from "./General";

export const CompactOpossumAI = {
  Physics: CompactOpossumAIPhysics,
  createInitialState: CompactOpossumAIPhysics.createInitialState.bind(CompactOpossumAIPhysics),
  triggerJump: CompactOpossumAIPhysics.triggerJump.bind(CompactOpossumAIPhysics),
  evaluateSmashCollision: CompactOpossumAIPhysics.evaluateSmashCollision.bind(CompactOpossumAIPhysics),
  updatePhysics: CompactOpossumAIPhysics.updatePhysics.bind(CompactOpossumAIPhysics)
};
