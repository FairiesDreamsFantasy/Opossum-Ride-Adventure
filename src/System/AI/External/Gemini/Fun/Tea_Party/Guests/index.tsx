/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MAX_TEA_TABLES } from "../General";

export type GuestAgeCategory = "INFANT" | "TODDLER" | "CHILD" | "TEEN" | "ADULT" | "ELDER";

export interface HumanGuestSpecification {
  readonly id: string;
  readonly name: string;
  readonly ageCategory: GuestAgeCategory;
  readonly familyGroupName: string;
  readonly attireDescription: string;
  readonly seatedAtTableId: string;
  readonly isInfantInStroller: boolean;
  readonly favoriteTreat: string;
  readonly favoriteTea: string;
  readonly currentAction: string;
}

export interface TeaTableSpecification {
  readonly tableId: string;
  readonly tableName: string;
  readonly tableShape: "ROUND_OAK" | "OVAL_MAHOGANY" | "HEARTHSIDE_LONG" | "BAY_WINDOW_BOOTH";
  readonly seatingCapacity: number;
  readonly centerPieceDescription: string;
  readonly coordinates3D: { x: number; y: number; z: number };
  readonly occupiedSeatsCount: number;
}

export const TEA_TABLE_LAYOUT: TeaTableSpecification[] = [
  {
    tableId: "TABLE-01",
    tableName: "Grand Chandelier Center Table",
    tableShape: "ROUND_OAK",
    seatingCapacity: 6,
    centerPieceDescription: "Crystal vase with fresh lavender and white daisies, silver sugar bowl, and clover honey jar.",
    coordinates3D: { x: 0, y: 0, z: 0 },
    occupiedSeatsCount: 5
  },
  {
    tableId: "TABLE-02",
    tableName: "East Bay Window Family Setting",
    tableShape: "BAY_WINDOW_BOOTH",
    seatingCapacity: 5,
    centerPieceDescription: "Hand-painted porcelain teapot planter with miniature violets and warm tea warmer candle.",
    coordinates3D: { x: 12, y: 0, z: 8 },
    occupiedSeatsCount: 4
  },
  {
    tableId: "TABLE-03",
    tableName: "Hearthside Fireside Round Table",
    tableShape: "ROUND_OAK",
    seatingCapacity: 6,
    centerPieceDescription: "Brass tiered treat stand with warm scones and clover honey dispenser.",
    coordinates3D: { x: -14, y: 0, z: 6 },
    occupiedSeatsCount: 6
  },
  {
    tableId: "TABLE-04",
    tableName: "Garden View Veranda Table",
    tableShape: "OVAL_MAHOGANY",
    seatingCapacity: 6,
    centerPieceDescription: "Fresh chamomile blossom bouquet with linen coasters and porcelain teacups.",
    coordinates3D: { x: 14, y: 0, z: -8 },
    occupiedSeatsCount: 4
  },
  {
    tableId: "TABLE-05",
    tableName: "Stroller & Toddler Story Corner",
    tableShape: "ROUND_OAK",
    seatingCapacity: 4,
    centerPieceDescription: "Soft plush clover centerpiece with spill-proof porcelain mugs and wooden picture books.",
    coordinates3D: { x: -12, y: 0, z: -10 },
    occupiedSeatsCount: 4
  },
  {
    tableId: "TABLE-06",
    tableName: "Rosewood Library Corner Table",
    tableShape: "OVAL_MAHOGANY",
    seatingCapacity: 4,
    centerPieceDescription: "Carved wooden stand with classical poetry cards and warm rooibos tea pot.",
    coordinates3D: { x: 0, y: 0, z: 15 },
    occupiedSeatsCount: 3
  }
];

export const SAMPLE_HUMAN_FAMILIES: HumanGuestSpecification[] = [
  // The Harrison Family
  {
    id: "GUEST-01",
    name: "Arthur Harrison",
    ageCategory: "ADULT",
    familyGroupName: "Harrison Family",
    attireDescription: "Classic navy tweed cardigan over a pressed white collared shirt and tailored trousers.",
    seatedAtTableId: "TABLE-01",
    isInfantInStroller: false,
    favoriteTreat: "Warm Berry Scones with Strawberry Preserves",
    favoriteTea: "Roasted Rooibos Vanilla",
    currentAction: "Stirring clover honey into tea and conversing with his daughter."
  },
  {
    id: "GUEST-02",
    name: "Eleanor Harrison",
    ageCategory: "ADULT",
    familyGroupName: "Harrison Family",
    attireDescription: "Modest emerald-green knit dress with a pearl brooch and lace cuffs.",
    seatedAtTableId: "TABLE-01",
    isInfantInStroller: false,
    favoriteTreat: "Miniature Blackberry Tart",
    favoriteTea: "Mountain Chamomile Comfort",
    currentAction: "Passing a warm scone to her son."
  },
  {
    id: "GUEST-03",
    name: "Lily Harrison",
    ageCategory: "CHILD",
    familyGroupName: "Harrison Family",
    attireDescription: "Sunny yellow cotton sundress with white tights and Mary Jane shoes.",
    seatedAtTableId: "TABLE-01",
    isInfantInStroller: false,
    favoriteTreat: "Clover Honey Biscuit",
    favoriteTea: "Berry Hibiscus Nectar (Sweetened)",
    currentAction: "Delightfully tasting the honey glaze."
  },
  {
    id: "GUEST-04",
    name: "Baby Oliver Harrison",
    ageCategory: "INFANT",
    familyGroupName: "Harrison Family",
    attireDescription: "Sky-blue cable-knit romper with soft booties.",
    seatedAtTableId: "TABLE-01",
    isInfantInStroller: true,
    favoriteTreat: "Soft Crushed Acorn Puree Treat",
    favoriteTea: "Warm Lukewarm Chamomile Drop",
    currentAction: "Smiling happily in a cushioned stroller as Hostess Clara reads a storybook."
  },

  // The Chen Family
  {
    id: "GUEST-05",
    name: "Marcus Chen",
    ageCategory: "ADULT",
    familyGroupName: "Chen Family",
    attireDescription: "Warm beige knit sweater with clean brown trousers.",
    seatedAtTableId: "TABLE-02",
    isInfantInStroller: false,
    favoriteTreat: "Almond Blossom Cookie",
    favoriteTea: "Wild Mint Lavender",
    currentAction: "Looking out the bay window at the manor gardens."
  },
  {
    id: "GUEST-06",
    name: "Grace Chen",
    ageCategory: "ADULT",
    familyGroupName: "Chen Family",
    attireDescription: "Floral embroidered linen blouse with a pleated navy skirt.",
    seatedAtTableId: "TABLE-02",
    isInfantInStroller: false,
    favoriteTreat: "Honeyed Apricot Tart",
    favoriteTea: "Honey Clover Infusion",
    currentAction: "Thanking the hostess for the fresh tea pour."
  },
  {
    id: "GUEST-07",
    name: "Chloe Chen",
    ageCategory: "TODDLER",
    familyGroupName: "Chen Family",
    attireDescription: "Pink gingham jumper over a soft white long-sleeve tee.",
    seatedAtTableId: "TABLE-02",
    isInfantInStroller: true,
    favoriteTreat: "Mini Strawberry Shortcake Bite",
    favoriteTea: "Berry Apple Nectar",
    currentAction: "Holding a wooden toy opossum and listening to the porcelain clinks."
  }
];

export const TeaPartyGuests = {
  systemName: "Grand Tea Room Guests Subsystem",
  TEA_TABLE_LAYOUT,
  SAMPLE_HUMAN_FAMILIES
};

export default TeaPartyGuests;
