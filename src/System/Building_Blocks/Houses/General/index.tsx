/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface HouseStructureSpecification {
  id: string;
  type: "standard_house" | "glasshouse" | "greenhouse" | "mansion";
  name: string;
  floorsCount: number;
  width: number;       // front width (feet)
  depth: number;       // depth (feet)
  height: number;      // roof height (feet)
  material: "wood" | "brick" | "glass" | "stone";
  hasGardenBackyard: boolean;
}

export const HOUSE_METADATA = {
  id: "house_standard",
  name: "Handcrafted Dwelling Structure"
};
