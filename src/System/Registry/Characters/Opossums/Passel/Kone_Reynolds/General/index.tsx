/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DagmarKoneReynoldsPasselMember } from "../Dagmar";
import { ArdenRosieKoneReynoldsPasselMember } from "../Arden_Rosie";
import { RoxanneKoneReynoldsPasselMember } from "../Roxanne";

export const KoneReynoldsPasselRegistry = {
  id: "kone_reynolds_passel",
  family: "Kone-Reynolds",
  members: [
    DagmarKoneReynoldsPasselMember,
    ArdenRosieKoneReynoldsPasselMember,
    RoxanneKoneReynoldsPasselMember
  ]
};
