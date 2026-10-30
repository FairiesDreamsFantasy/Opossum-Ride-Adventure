/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export * from "./General";

export const PrimaryRiderSelectionRegistry = {
  id: "primary-rider-selection-registry",
  tabName: "Primary",
  supportedRiders: ["fairy_rider", "mary", "edward", "george", "angela"],
  grid: {
    cols: 8,
    rows: 6,
    totalSlots: 48,
    quiltStyle: "checked"
  }
};
