/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { WildcardLensData } from "./Data";
import { WildcardLensGeneralEngine, WildcardLensGeneral } from "./General";

export const WildcardLens = {
  systemName: "Wildcard Camera Lens Optics System",
  Engine: WildcardLensGeneralEngine,
  General: WildcardLensGeneral,
  Data: WildcardLensData
};

export * from "./Data";
export * from "./General";
export default WildcardLens;
