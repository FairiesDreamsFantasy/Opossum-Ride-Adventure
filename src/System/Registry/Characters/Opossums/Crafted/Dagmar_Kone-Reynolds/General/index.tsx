/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class DagmarKoneReynoldsRegistryGeneral {
  public static readonly entry = {
    id: "dagmar_kone_reynolds",
    name: "Dagmar Kone-Reynolds",
    lastName: "Kone-Reynolds",
    width: 40,
    length: 85,
    headWidth: 39,
    headHeight: 44,
    shoulderHeight: "5 feet and 8.5 inches",
    color: "White with multi-colored diamond pattern",
    eyeColor: "Light-Green",
    noseColor: "Pink",
    tailColor: "Pink",
    innerEarColor: "Pink",
    gender: "Female",
    headOrientation: "perched on top of her neck"
  };
  public static getDetails() {
    return {
      id: "dagmar_kone_reynolds",
      name: "Dagmar Kone-Reynolds",
      lastName: "Kone-Reynolds",
      gender: "Female",
      color: "White with multi-colored diamond pattern"
    };
  }
}

export default DagmarKoneReynoldsRegistryGeneral;
