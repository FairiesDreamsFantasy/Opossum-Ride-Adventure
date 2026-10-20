/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface GardenFeatureSpecification {
  id: string;
  type: "pond" | "cultivated_plants" | "ornamental_shrub" | "flower_bed";
  name: string;
  cultivatedBy: string; // Melissa, Ashley, or Fairy-Riders
  requiresWatering: boolean;
  waterDepthFeet: number | null; // depth if pond
  fertilizerIndex: number;
}

export const GARDEN_METADATA = {
  id: "garden_standard",
  name: "Cultivated Garden Feature"
};
