/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FemmyRiderGeneralRegistry } from "./General";
import { FEMMY_REGISTRY_POV } from "./POV";

export const FemmyRiderRegistry = {
  id: "femmy",
  name: "Femmy",
  gender: "Female",
  ethnicity: "Black",
  height: "3 feet and 11 inches",
  heritage: "Babylon-Free, Rastafari",
  hair: "Red hair",
  eyes: "Green",
  outfit: "Beige onesie with black horizontal stripes and rainbow circles",
  shoes: "Flat yellow shoes",
  category: "advocate",
  General: FemmyRiderGeneralRegistry,
  POV: FEMMY_REGISTRY_POV
};

export { FemmyRiderGeneralRegistry, FEMMY_REGISTRY_POV };
export default FemmyRiderRegistry;
