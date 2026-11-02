/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface BridgeStructureSpecification {
  id: string;
  name: string;
  spanLength: number;         // Total bridge span in meters
  deckHeight: number;         // Deck height off surface in feet (Min: 30)
  lanesCount: number;         // Lanes (Min: 3, Max: 4)
  structureType: "suspension" | "arch" | "truss" | "beam";
  hasAbutments: boolean;
}

export const BRIDGE_METADATA = {
  id: "bridge_standard",
  name: "Structural Arch Bridge",
  minHeight: 30,
  minLanes: 3,
  maxLanes: 4
};
