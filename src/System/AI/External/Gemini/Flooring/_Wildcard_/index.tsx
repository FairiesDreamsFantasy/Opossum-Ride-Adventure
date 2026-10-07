/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GeminiFlooringGeneral } from "../General";
import { GeminiFlooringData } from "../Data";
import { GeminiFlooringAnimations } from "../Animations";

export const FlooringWildcard = {
  General: GeminiFlooringGeneral,
  Data: GeminiFlooringData,
  Animations: GeminiFlooringAnimations,
  systemName: "Gemini Flooring Subsystem"
};

export * from "../Data";
