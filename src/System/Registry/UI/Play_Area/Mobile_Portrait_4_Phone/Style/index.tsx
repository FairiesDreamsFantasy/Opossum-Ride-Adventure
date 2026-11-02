/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export * from "./General";
export * from "./Retro_Vertical_Screen";
export * from "./Picture_Window";
export * from "./Double_Screen";

export const MobileStylesRegistry = {
  name: "Mobile Portrait Styles Registry",
  version: "1.0.0",
  styles: ["retro-vertical", "picture-window", "double-screen"] as const
};
