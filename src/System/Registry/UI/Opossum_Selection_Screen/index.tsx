/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export * from "./Mobile_Portrait_4_Phone";
export * from "./Main";

export const OpossumSelectionScreenRegistry = {
  id: "opossum-selection-screen-registry",
  labels: {
    headerTitle: "Pick An Opossum To Ride",
    backButton: "< Go Back",
    leadParagraph: "Each opossum is unique, so... choose wisely.",
    sidePanelTitle: "Opossum Description",
    rideNowButton: "Ride Now",
    genderLabel: "Gender",
    widthLabel: "Width",
    lengthLabel: "Length",
    heightLabel: "Head Height",
    colorsLabel: "Colors",
    meetLabel: "Meet"
  },
  canvas: {
    width: 540,
    height: 318,
    colors: {
      background: "#030712",
      grid: "#14532d",
      focusBorder: "#22c55e",
      textPrimary: "#22c55e",
      textSecondary: "#a3e635"
    },
    gridStep: 30,
    borderInset: 10
  }
};
