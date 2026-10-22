/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RuthKoneReynolds } from "../../../../../../../Characters/Opossums/Ruth_Kone-Reynolds";

export class RuthKoneReynoldsRegistryGeneral {
  public static readonly entry = RuthKoneReynolds;
  public static getDetails() {
    return RuthKoneReynolds.General.getProfile();
  }
}

export default RuthKoneReynoldsRegistryGeneral;
