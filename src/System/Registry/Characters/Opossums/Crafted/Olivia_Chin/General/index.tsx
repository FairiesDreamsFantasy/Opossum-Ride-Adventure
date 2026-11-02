/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OliviaChin } from "../../../../../../../Characters/Opossums/Olivia_Chin";

export class OliviaChinRegistryGeneral {
  public static readonly entry = OliviaChin;
  public static getDetails() {
    return OliviaChin.General.getProfile();
  }
}

export default OliviaChinRegistryGeneral;
