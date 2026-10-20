/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AmaraQinPasselMember } from "../Amara";
import { TianaQinPasselMember } from "../Tiana";

export const QinPasselRegistry = {
  id: "qin_passel",
  family: "Qin",
  members: [
    AmaraQinPasselMember,
    TianaQinPasselMember
  ]
};
