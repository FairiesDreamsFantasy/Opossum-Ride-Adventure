/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export * from "./persistence";
export * from "./Drawing_Utils";
export * from "./General";
export const GeneralUtilities = {
  clamp: (v: number, min: number, max: number) => Math.min(Math.max(v, min), max)
};

