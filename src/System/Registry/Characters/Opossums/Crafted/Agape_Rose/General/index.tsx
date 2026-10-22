/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class AgapeRoseRegistryGeneral {
  public static readonly entry = {
    id: "agape_rose",
    name: "Agape Rose",
    lastName: "Rose",
    width: 42,
    length: 90.1,
    headWidth: 40.5,
    headHeight: 46,
    shoulderHeight: "5 feet and 5 inches",
    color: "Gold with pink circles bordered in purple",
    eyeColor: "Light-Green",
    noseColor: "Dark-Pink",
    tailColor: "Dark-Pink with 2% gold fur layer",
    innerEarColor: "Dark-Pink",
    gender: "Female",
    headOrientation: "forward leaning posture"
  };
  public static getDetails() {
    return {
      id: "agape_rose",
      name: "Agape Rose",
      lastName: "Rose",
      gender: "Female",
      color: "Gold with pink circles bordered in purple"
    };
  }
}

export default AgapeRoseRegistryGeneral;
