/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LensTier1Data } from "./Data";
import { LensTier1GeneralEngine, LensTier1General } from "./General";

export const LensTier1 = {
  tier: 1,
  Engine: LensTier1GeneralEngine,
  General: LensTier1General,
  Data: LensTier1Data
};

export * from "./Data";
export * from "./General";
export default LensTier1;
