/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface FlyoverStructureSpecification {
  id: string;
  name: string;
  heightLevels: number[];       // Y-heights for each crossing structure tier
  railwayCapable: boolean;     // Can accommodate elevated tram/train rails
  overheadClearance: number;   // Height clearing buffer
}

export const FLYOVER_DEFAULT_SPEC: FlyoverStructureSpecification = {
  id: "flyover_std",
  name: "Standard Elevated Crossing Flyover",
  heightLevels: [35, 70],
  railwayCapable: true,
  overheadClearance: 18
};
