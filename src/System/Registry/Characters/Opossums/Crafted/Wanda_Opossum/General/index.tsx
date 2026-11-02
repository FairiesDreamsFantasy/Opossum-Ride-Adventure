/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { WandaOpossum } from "../../../../../../../Characters/Opossums/Wanda_Opossum";

export class WandaOpossumRegistryGeneral {
  public static readonly entry = WandaOpossum;
  public static getDetails() {
    return WandaOpossum.General.getProfile();
  }
}

export default WandaOpossumRegistryGeneral;
