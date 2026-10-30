/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RiderCharacter } from "../../../../../../../types";

export class RiderNarrationEngine {
  /**
   * Generates a description for the chosen Rider (the human/fairy person riding the opossum).
   * Always uses "You as" prefix before rider name.
   */
  public static compileRiderPersonProfile(rider: RiderCharacter): string {
    const name = rider.name || "Rider";
    const height = rider.height ? ` Height: ${rider.height}.` : "";
    const ethnicity = rider.ethnicity ? ` Ethnicity: ${rider.ethnicity}.` : "";
    const heritage = rider.heritage ? ` Heritage: ${rider.heritage}.` : "";
    const hair = rider.hair ? ` Hair: ${rider.hair}.` : "";
    const outfit = rider.outfit ? ` Outfit: ${rider.outfit}.` : "";
    const shoes = rider.shoes ? ` Footwear: ${rider.shoes}.` : "";

    return `You as ${name}.${height}${ethnicity}${heritage}${hair}${outfit}${shoes}`;
  }
}
