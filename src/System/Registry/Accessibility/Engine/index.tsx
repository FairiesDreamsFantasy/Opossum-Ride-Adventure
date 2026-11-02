/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AccessibilityEngineRegistryGeneral } from "./General";
import { AccessibilityEngine } from "../../../Accessibility/Engine";

export * from "./General";

export const AccessibilityEngineRegistry = {
  General: AccessibilityEngineRegistryGeneral,
  Engine: AccessibilityEngine,
  calculateRelativeLuminance: (r: number, g: number, b: number) => AccessibilityEngine.calculateRelativeLuminance(r, g, b),
  calculateContrastRatio: (rgb1: [number, number, number], rgb2: [number, number, number]) => AccessibilityEngine.calculateContrastRatio(rgb1, rgb2),
  computeSpatialAudioPanner: (emitter: { x: number; y: number; z: number }, listener: { x: number; y: number; z: number }) => AccessibilityEngine.computeSpatialAudioPanner(emitter, listener),
  getMetrics: () => AccessibilityEngine.getEngineMetrics()
};
