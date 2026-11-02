/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TunnelStructureSpecification {
  id: string;
  type: "standard_tunnel" | "subway_tunnel" | "underpass"; // Subway tunnels & structural underpasses
  name: string;
  heightClearance: number;     // Vertical height clearance in feet
  hasExhaustFans: boolean;
  reinforcedArch: boolean;
}

export const TUNNEL_METADATA = {
  id: "tunnel_standard",
  name: "Reinforced Sub-Earth Tunnel"
};
