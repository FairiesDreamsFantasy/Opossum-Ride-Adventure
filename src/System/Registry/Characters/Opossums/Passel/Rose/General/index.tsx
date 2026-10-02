/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SaffronRosePasselMember } from "../Saffron";
import { JahmellaRosePasselMember } from "../Jahmella";
import { AgapeRosePasselMember } from "../Agape";

export const RosePasselRegistry = {
  id: "rose_passel",
  family: "Rose",
  members: [
    SaffronRosePasselMember,
    JahmellaRosePasselMember,
    AgapeRosePasselMember
  ]
};
