/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GeminiElevatorsGeneral } from "../General";
import { GeminiElevatorsData } from "../Data";
import { GeminiElevatorsAnimations } from "../Animations";

export const ElevatorsWildcard = {
  General: GeminiElevatorsGeneral,
  Data: GeminiElevatorsData,
  Animations: GeminiElevatorsAnimations,
  systemName: "Gemini Elevators Subsystem"
};

export * from "../Data";
