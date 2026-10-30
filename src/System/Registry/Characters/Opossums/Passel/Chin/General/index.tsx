/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { JalissaChinPasselMember } from "../Jalissa";
import { SaffordChinPasselMember } from "../Safford";

export const ChinPasselRegistry = {
  id: "chin_passel",
  family: "Chin",
  members: [
    JalissaChinPasselMember,
    SaffordChinPasselMember
  ]
};

