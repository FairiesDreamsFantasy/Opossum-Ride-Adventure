/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PathSegmentSpecification } from "../../General";

export interface ElevatedPathSpecification extends PathSegmentSpecification {
  type: "elevated";
  supportPillarSpacing: number; // Z-axis distance between concrete/stone pillars
  handrailHeight: number;        // Height of decorative safety rails
  minHeight: 30;                 // Mandatory minimum height in feet
  minLanes: 3;                   // Minimum lane width capacity
  maxLanes: 4;                   // Maximum lane width capacity
}

export const ELEVATED_PATH_METADATA = {
  id: "elevated_standard",
  name: "Elevated Stone Way",
  minHeight: 30,
  minLanes: 3,
  maxLanes: 4
};
