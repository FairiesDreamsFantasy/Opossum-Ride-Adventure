/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GeminiBehaviorTreesGeneral } from "../General";
import { GeminiBehaviorTreesData } from "../Data";

export const BehaviorTreesWildcard = {
  General: GeminiBehaviorTreesGeneral,
  Data: GeminiBehaviorTreesData,
  systemName: "Gemini AI Behavior Trees Supermodule"
};

export * from "../Data";
