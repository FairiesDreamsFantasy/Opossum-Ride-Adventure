/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class DrakeKoneReynoldsRegistryGeneral {
  public static readonly entry = {
    id: "drake_kone_reynolds",
    name: "Drake Kone-Reynolds",
    passel: "Kone-Reynolds",
    size: "compact",
  };
  public static getDetails() {
    return this.entry;
  }
}

export default DrakeKoneReynoldsRegistryGeneral;
