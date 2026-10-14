/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { KadyRose } from "../../../../../../Characters/Opossums/Kady_Rose";

export class KadyRoseRegistryGeneral {
  public static readonly entry = KadyRose;
  public static getDetails() {
    return KadyRose.General.getProfile();
  }
}

export default KadyRoseRegistryGeneral;
