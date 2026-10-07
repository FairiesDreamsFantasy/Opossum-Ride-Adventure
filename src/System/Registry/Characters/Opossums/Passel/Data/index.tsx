/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MelissaOpossumRegistry } from "../../Crafted/Melissa_Opossum";
import { AshleyOpossumRegistry } from "../../Crafted/Ashley_Opossum";

export const PasselData = {
  id: "passel-data",
  description: "Core data registry for all Opossum Passels.",
  general: {
    Opossum: [MelissaOpossumRegistry, AshleyOpossumRegistry]
  }
};
