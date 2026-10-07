/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MobileLayoutStyleType } from "../../../../Registry/UI/Play_Area/Mobile_Portrait_4_Phone";

export * from "../../../../Registry/UI/Play_Area/Mobile_Portrait_4_Phone";

export const LAYOUT_CYCLE_ORDER: MobileLayoutStyleType[] = [
  "retro-vertical",
  "picture-window",
  "double-screen"
];

/**
 * Returns the next layout in cyclic order
 */
export function getNextMobileLayout(current: MobileLayoutStyleType): MobileLayoutStyleType {
  const currentIndex = LAYOUT_CYCLE_ORDER.indexOf(current);
  const nextIndex = (currentIndex + 1) % LAYOUT_CYCLE_ORDER.length;
  return LAYOUT_CYCLE_ORDER[nextIndex];
}
