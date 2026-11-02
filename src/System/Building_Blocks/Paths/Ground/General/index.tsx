/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PathSegmentSpecification } from "../../General";

export interface GroundPathSpecification extends PathSegmentSpecification {
  type: "ground";
  shoulderWidth: number; // side gravel buffers
  hasCurb: boolean;      // curb edges for street sections
}

export const GROUND_PATH_METADATA = {
  id: "ground_standard",
  name: "Ground-Level Track Base"
};
