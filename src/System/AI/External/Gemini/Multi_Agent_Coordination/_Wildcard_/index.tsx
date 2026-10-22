/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GeminiMultiAgentCoordinationGeneral } from "../General";
import { GeminiMultiAgentCoordinationData } from "../Data";

export const MultiAgentCoordinationWildcard = {
  General: GeminiMultiAgentCoordinationGeneral,
  Data: GeminiMultiAgentCoordinationData,
  systemName: "Gemini AI Multi Agent Coordination Supermodule"
};

export * from "../Data";
