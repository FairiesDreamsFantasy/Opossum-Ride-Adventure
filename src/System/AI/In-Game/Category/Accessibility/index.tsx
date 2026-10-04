/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { InGameAccessibilityGeneral } from "./General";
import { InGameLocalNarrationEngine } from "./Narration";
import { InGameRadarScanner } from "./Radar";
import { InGameKeyTapManager } from "./Key_Taps";

export * from "./General";
export * from "./Narration";
export * from "./Radar";
export * from "./Key_Taps";

export const InGameAccessibility = {
  General: InGameAccessibilityGeneral,
  Narration: InGameLocalNarrationEngine,
  Radar: InGameRadarScanner,
  KeyTaps: InGameKeyTapManager
};

export default InGameAccessibility;
