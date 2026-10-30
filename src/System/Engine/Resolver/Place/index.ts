/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PlaceResolverGeneral } from "./General";
import { PlaceResolverData } from "./Data";

export const PlaceResolver = {
  resolvePlace: PlaceResolverGeneral.resolvePlace,
  getBGMProfile: PlaceResolverGeneral.getPlaceBGMProfile,
  isEnemyAllowed: PlaceResolverGeneral.isEnemyAllowedInPlace,
  Data: PlaceResolverData,
  General: PlaceResolverGeneral
};

export * from "./General";
export * from "./Data";
export default PlaceResolver;
