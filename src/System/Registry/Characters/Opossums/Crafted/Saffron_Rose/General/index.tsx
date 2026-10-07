/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class SaffronRoseRegistryGeneral {
  public static readonly entry = {
    id: "saffron_rose",
    name: "Saffron Rose",
    lastName: "Rose",
    width: 48,
    length: 95,
    headWidth: 47.5,
    headHeight: 46,
    shoulderHeight: "5 feet and 11 inches",
    color: "Red-Orange",
    eyeColor: "Green",
    noseColor: "Red-Orange",
    tailColor: "Gold with pink wrap-around spiral pattern",
    innerEarColor: "Dark-Pink",
    gender: "Female",
    headOrientation: "perched on top of her neck"
  };
  public static getDetails() {
    return {
      id: "saffron_rose",
      name: "Saffron Rose",
      lastName: "Rose",
      gender: "Female",
      color: "Red-Orange"
    };
  }
}

export default SaffronRoseRegistryGeneral;
