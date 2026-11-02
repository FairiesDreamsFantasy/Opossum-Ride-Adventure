/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SandraOpossum } from "../../../../../../Characters/Opossums/Sandra_Opossum";

export class SandraOpossumRegistryGeneral {
  public static readonly entry = SandraOpossum;
  public static getDetails() {
    return SandraOpossum.General.getProfile();
  }
}

export default SandraOpossumRegistryGeneral;
