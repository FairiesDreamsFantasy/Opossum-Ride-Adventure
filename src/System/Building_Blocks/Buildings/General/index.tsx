/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface BuildingStructureSpecification {
  id: string;
  type: 
    | "hotel" 
    | "shopping_mall" 
    | "governmental" 
    | "apartment" 
    | "condo" 
    | "school" 
    | "department_store" 
    | "hardware_store" 
    | "restaurant" 
    | "arcade" 
    | "library" 
    | "group_home"
    | "bank"
    | "palace"
    | "general_commercial";
  name: string;
  levels: number;
  hasWheelchairRamp: boolean;
  occupancyRating: number;
}

export const BUILDING_METADATA = {
  id: "building_standard",
  name: "Civic Structure Block"
};
