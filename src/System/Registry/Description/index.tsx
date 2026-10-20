/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PositionInformationRegistry } from "./Position_Information";
import { OPOSSUM_DESCRIPTIONS_REGISTRY } from "./Opossums";
import { ARENA_DESCRIPTIONS_REGISTRY } from "./Arenas";

/**
 * Description Registry
 * Centralized registry mapping all character and arena environmental descriptions.
 */
export const DescriptionRegistry = {
  id: "description_registry",
  PositionInformation: PositionInformationRegistry,
  Opossums: OPOSSUM_DESCRIPTIONS_REGISTRY,
  Arenas: ARENA_DESCRIPTIONS_REGISTRY,
  metadata: {
    audio_description_enabled: true,
    environmental_feedback: "high"
  }
};

export { OPOSSUM_DESCRIPTIONS_REGISTRY, ARENA_DESCRIPTIONS_REGISTRY };
export default DescriptionRegistry;
