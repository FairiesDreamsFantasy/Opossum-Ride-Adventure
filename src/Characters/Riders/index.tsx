/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FAIRY_RIDER } from "./Fairy-Rider";
import { MARY } from "./Mary";
import { EDWARD } from "./Edward";
import { GEORGE_BLAKE, GEORGE } from "./George_Blake";
import { ANGELA_BLAKE, ANGELA } from "./Angela_Blake";
import { SEAN_WHITE, SEAN } from "./Sean_White";
import { SHANNON_WHITE, SHANNON } from "./Shannon_White";

/**
 * Registry of all available Rider characters.
 */
export const RIDER_CHARACTERS = [
  FAIRY_RIDER,
  MARY,
  EDWARD,
  GEORGE_BLAKE,
  ANGELA_BLAKE,
  SEAN_WHITE,
  SHANNON_WHITE
];

export {
  FAIRY_RIDER,
  MARY,
  EDWARD,
  GEORGE_BLAKE,
  ANGELA_BLAKE,
  SEAN_WHITE,
  SHANNON_WHITE,
  // Aliases for seamless legacy reference
  GEORGE,
  ANGELA,
  SEAN,
  SHANNON
};
