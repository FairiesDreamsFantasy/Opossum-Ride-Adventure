/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const GENERIC_COMPACT_OPOSSUM_SPEC = {
  species: "Virginia Opossum (Didelphis virginiana)",
  classification: "Compact Bareback Steed",
  defaultSex: "Jill" as "Jill" | "Jack",
  defaultGender: "Female" as "Female" | "Male",
  sex: "Jill" as "Jill" | "Jack",
  gender: "Female" as "Female" | "Male",
  shoulderHeightFeet: 3,
  shoulderHeightInches: 36,
  bodyWidthInches: 29,
  bodyLengthInches: 62,
  headPosture: "Perched Forward" as const, // Head distinctly perched forward
  headAngleDegrees: 18, // 18 degree forward inclination
  locomotionModel: "Autonomous Compact Cadence",
  hasElegantChatter: false, // Decoupled from crafted chatter
  barebackMountingPads: true,
  standard: "100,000,000,000% Ultra-Broad Protection Standard"
};
