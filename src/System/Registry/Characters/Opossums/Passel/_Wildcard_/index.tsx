/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PasselData } from "../Data";
import { RosePasselRegistry } from "../Rose";
import { QinPasselRegistry } from "../Qin";
import { ChinPasselRegistry } from "../Chin";
import { KoneReynoldsPasselRegistry } from "../Kone_Reynolds";
import { OpossumPasselRegistry } from "../Opossum";

/**
 * Wildcard Registry for Passel Opossums
 */
export const OpossumsPasselRegistry = {
  id: "opossums-passel",
  description: "Grouped passels of opossums sharing specific lineages or families.",
  passels: {
    Opossum: OpossumPasselRegistry,
    Rose: RosePasselRegistry,
    Qin: QinPasselRegistry,
    Chin: ChinPasselRegistry,
    Kone_Reynolds: KoneReynoldsPasselRegistry
  }
};

export const PasselWildcard = {
  ...PasselData,
  OpossumsPasselRegistry
};

export * from "../Data";
export * from "../General";
export * from "../Chin";
export * from "../Kone_Reynolds";
export * from "../Opossum";
export * from "../Qin";
export * from "../Rose";
