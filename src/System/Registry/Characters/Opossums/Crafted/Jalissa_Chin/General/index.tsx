/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class JalissaChinRegistryGeneral {
  public static readonly entry = {
    id: "jalissa_chin",
    name: "Jalissa Chin",
    lastName: "Chin",
    width: 37.5,
    length: 84,
    headWidth: 36,
    headHeight: 38,
    shoulderHeight: "5 feet and 1 inch",
    color: "Yellow-Orange",
    eyeColor: "Dark-Blue",
    noseColor: "Dark-Pink",
    tailColor: "Dark-Pink",
    innerEarColor: "Pinkish-Orange",
    gender: "Female",
    headOrientation: "perched on top of her neck"
  };
  public static getDetails() {
    return {
      id: "jalissa_chin",
      name: "Jalissa Chin",
      lastName: "Chin",
      gender: "Female",
      color: "Yellow-Orange"
    };
  }
}

export default JalissaChinRegistryGeneral;
