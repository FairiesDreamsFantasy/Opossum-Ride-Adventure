/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class AmaraQinRegistryGeneral {
  public static readonly entry = {
    id: "amara_qin",
    name: "Amara Qin",
    lastName: "Qin",
    width: 36,
    length: 82,
    headWidth: 36,
    headHeight: 38,
    shoulderHeight: "5 feet and 3 inches",
    color: "White",
    eyeColor: "Blue",
    noseColor: "Pink",
    tailColor: "Pink",
    innerEarColor: "Pink",
    gender: "Female",
    headOrientation: "perched on top of her neck"
  };
  public static getDetails() {
    return {
      id: "amara_qin",
      name: "Amara Qin",
      lastName: "Qin",
      gender: "Female",
      color: "White"
    };
  }
}

export default AmaraQinRegistryGeneral;
