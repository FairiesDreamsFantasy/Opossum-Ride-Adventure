/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { getSkeletalMovementAI, KeyframeHeuristic } from "./General";
import { VisualKeyframePredictorAI } from "./KeyframePredictorAI";
import { VisualFrameBudgetGovernorAI } from "./FrameBudgetGovernorAI";
import { ProceduralGaitBlenderAI } from "./ProceduralGaitBlenderAI";
import { VisualPaletteMoodClassifierAI } from "./PaletteMoodClassifierAI";

export * from "./General";
export * from "./KeyframePredictorAI";
export * from "./FrameBudgetGovernorAI";
export * from "./ProceduralGaitBlenderAI";
export * from "./PaletteMoodClassifierAI";

/**
 * AI In-Game Visuals & Animations Subsystem
 * Aggregates keyframe prediction, adaptive frame budget governance, procedural gait blending,
 * and arena palette mood classification.
 */
export const VisualAnimationsAI = {
  getSkeletalMovementAI,
  KeyframePredictor: VisualKeyframePredictorAI,
  FrameBudgetGovernor: VisualFrameBudgetGovernorAI,
  GaitBlender: ProceduralGaitBlenderAI,
  PaletteMoodClassifier: VisualPaletteMoodClassifierAI
};

export type { KeyframeHeuristic };
export default VisualAnimationsAI;
