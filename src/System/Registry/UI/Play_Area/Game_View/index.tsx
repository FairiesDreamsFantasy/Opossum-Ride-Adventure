/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface GameViewRegistryConfig {
  defaultWidth: number;
  defaultHeight: number;
  aspectRatio: string;
  defaultFov: number;
  supportedModes: string[];
  renderEngines: string[];
}

export const GameViewRegistry: GameViewRegistryConfig = {
  defaultWidth: 840,
  defaultHeight: 400,
  aspectRatio: "21:10",
  defaultFov: 70,
  supportedModes: ["rider", "pov"],
  renderEngines: ["3D-Perspective", "2D-TopDown", "Wireframe", "Solid"]
};
