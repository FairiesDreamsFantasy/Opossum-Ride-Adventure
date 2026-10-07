/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class JahmellaRoseRegistryGeneral {
  public static readonly entry = {
    id: "jahmella_rose",
    name: "Jahmella Rose",
    lastName: "Rose",
    width: 40,
    length: 99.5,
    headWidth: 37,
    headHeight: 45,
    shoulderHeight: "6 feet",
    color: "Orange with white circles",
    eyeColor: "Light-Green",
    noseColor: "Red-Orange",
    tailColor: "Dark-Pink",
    innerEarColor: "Red-Orange",
    gender: "Female",
    headOrientation: "perched on top of her neck"
  };
  public static getDetails() {
    return {
      id: "jahmella_rose",
      name: "Jahmella Rose",
      lastName: "Rose",
      gender: "Female",
      color: "Orange with white circles"
    };
  }
}

export default JahmellaRoseRegistryGeneral;
