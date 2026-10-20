/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class DrakeKoneReynoldsRegistryGeneral {
  public static readonly entry = {
    id: "drake_kone_reynolds",
    name: "Drake Kone-Reynolds",
    lastName: "Kone-Reynolds",
    width: 32,
    length: 75,
    headWidth: 30,
    headHeight: 35,
    shoulderHeight: "4 feet and 2 inches",
    color: "Red (7 Silver Stripes)",
    eyeColor: "Green",
    noseColor: "Red",
    tailColor: "Red",
    innerEarColor: "Reddish-Brown",
    gender: "Male",
    headOrientation: "perched forward"
  };

  public static getDetails() {
    return {
      id: "drake_kone_reynolds",
      name: "Drake Kone-Reynolds",
      lastName: "Kone-Reynolds",
      gender: "Male",
      color: "Red (7 Silver Stripes)"
    };
  }
}

export default DrakeKoneReynoldsRegistryGeneral;
