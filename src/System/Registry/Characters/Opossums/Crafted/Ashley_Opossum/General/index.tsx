/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class AshleyOpossumRegistryGeneral {
  public static readonly entry = {
    id: "ashley",
    name: "Ashley",
    lastName: "Opossum",
    width: 38,
    length: 88,
    headWidth: 36,
    headHeight: 36,
    shoulderHeight: "5 feet and 3 inches",
    color: "Yellow",
    eyeColor: "Light Green",
    noseColor: "Pink",
    tailColor: "Pink",
    innerEarColor: "Red-Orange",
    gender: "Female",
    headOrientation: "forward leaning posture"
  };
  public static getDetails() {
    return {
      id: "ashley",
      name: "Ashley",
      lastName: "Opossum",
      gender: "Female",
      color: "Yellow"
    };
  }
}

export default AshleyOpossumRegistryGeneral;
