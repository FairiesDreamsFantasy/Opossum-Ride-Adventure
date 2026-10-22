/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export * from "../Crafted";
export * from "../Conventional";
import { CraftedOpossumsSoundRegistry } from "../Crafted";
import { ConventionalOpossumsSoundRegistry } from "../Conventional";

export const OpossumsSoundRegistryGeneral = {
  name: "Opossums Sound Category Registry",
  description: "Sound registry for opossum movement across terrain surfaces and parabolic jump acoustics.",
  surfaces: ConventionalOpossumsSoundRegistry,
  crafted: CraftedOpossumsSoundRegistry
};

