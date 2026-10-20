/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export * from "./General";
import { CONVENTIONAL_SURFACE_TROTS, CONVENTIONAL_JACK_VOCALS } from "./General";

export const ConventionalOpossumsSoundRegistry = {
  name: "Conventional Opossums Sound Registry",
  description: "Sound activation mappings for conventional opossum surface trots, grunts, and parabolic jumps.",
  surfaces: CONVENTIONAL_SURFACE_TROTS,
  vocals: CONVENTIONAL_JACK_VOCALS
};
