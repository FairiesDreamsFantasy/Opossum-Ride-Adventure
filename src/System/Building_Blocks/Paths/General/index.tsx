/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PathSegmentSpecification {
  id: string;
  type: "ground" | "elevated" | "flyover" | "railway" | "road" | "tunnel" | "bridge" | "subway_tunnel" | "underpass";
  dimensions: {
    length: number;    // Z-axis span
    width: number;     // X-axis width (e.g. accommodating lanes)
    height: number;    // Y-axis height off base level (0ft for ground, 30+ft for elevated)
    thickness: number; // Vertical deck depth
  };
  lanes: {
    count: number;     // Number of standard track lanes (min 3, max 4 for bridges/elevated)
    laneWidth: number; // width per lane
  };
  surfaceType: "grass" | "gravel" | "wood" | "stone" | "metal_tracks" | "dirt" | "asphalt" | "shale" | "clay" | "sand" | "snow" | "ice";
}
