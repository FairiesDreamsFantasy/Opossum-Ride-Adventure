/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class MelissaOpossumRegistryGeneral {
  public static readonly entry = {
    id: "melissa",
    name: "Melissa",
    lastName: "Opossum",
    width: 36,
    length: 86,
    headWidth: 36,
    headHeight: 35,
    shoulderHeight: "5 feet and 3 inches",
    color: "Light Gray",
    eyeColor: "Blue",
    noseColor: "Pink",
    tailColor: "Pink",
    innerEarColor: "Pink",
    gender: "Female",
    headOrientation: "perched on top of her neck"
  };
  public static getDetails() {
    return {
      id: "melissa",
      name: "Melissa",
      lastName: "Opossum",
      gender: "Female",
      color: "Light Gray"
    };
  }
}

export default MelissaOpossumRegistryGeneral;
