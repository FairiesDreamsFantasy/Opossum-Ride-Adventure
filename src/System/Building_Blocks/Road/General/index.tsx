/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface RoadwaySpecification {
  id: string;
  name: string;
  lanesCount: number;
  markingColor: "yellow" | "white" | "none";
  curbStyle: "beveled" | "vertical" | "none";
  hasStreetLights: boolean;
}

export const ROAD_DEFAULT_SPEC: RoadwaySpecification = {
  id: "road_standard",
  name: "Standard Asphalt Roadway",
  lanesCount: 3,
  markingColor: "yellow",
  curbStyle: "beveled",
  hasStreetLights: true
};
