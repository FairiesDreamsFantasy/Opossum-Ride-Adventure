/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class RudyKoneReynoldsGeneral {
  public static readonly entry = {
    id: "rudy_kone_reynolds",
    name: "Rudy Kone-Reynolds",
    lastName: "Kone-Reynolds",
    type: "Opossum",
    gender: "Male",
    ethnicity: "Black",
    shoulderHeight: "3 feet, 7.5 inches",
    headOrientation: "Standard",
    eyeColor: "Blue",
    noseColor: "Brownish-Red",
    outerEarColor: "Orange",
    innerEarColor: "Brownish-Red",
    earOrientation: "Downward (similar to a dog, oriented to sides)",
    color: "Yellow base, brown 6-inch circles with 1cm black border, spaced 1.88 inches",
    skinColor: "Dark-brown",
    pawColor: "Brown",
    tailColor: "Dark-brown",
    tailLength: "Short",
    furryFacePercentage: 30,
    tailFurryPercentage: 7.128,
    compact: true,
    religion: "Rastafari",
    babylonFree: true,
    roxannesBrother: true,
    interests: ["Football", "Space science", "Making music"],
    isRideable: true
  };

  public static getDetails() {
    return {
      id: "rudy_kone_reynolds",
      name: "Rudy Kone-Reynolds",
      lastName: "Kone-Reynolds",
      gender: "Male",
      ethnicity: "Black",
      color: "Yellow base with bordered brown circles",
      religion: "Rastafari",
      babylonFree: true
    };
  }
}

export default RudyKoneReynoldsGeneral;
