/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class RudyKoneReynoldsRegistryGeneral {
  public static readonly entry = {
    id: "rudy_kone_reynolds",
    name: "Rudy Kone-Reynolds",
    lastName: "Kone-Reynolds",
    shoulderHeight: "3 feet, 7.5 inches",
    headOrientation: "Standard",
    color: "Yellow (base); brown (6 inch circles with black 1-CM thick borders, spaced 1.88 inches)",
    eyeColor: "Blue",
    outerEarColor: "Orange",
    innerEarColor: "Brownish-Red",
    noseColor: "Brownish-Red",
    tailColor: "Dark-brown (7.128% furry)",
    tailLength: "Short",
    earOrientation: "Downward (similar to a dog, oriented to sides)",
    gender: "Male",
    ethnicity: "Black",
    religion: "Rastafari",
    babylonFree: true,
    compact: true,
    pawColor: "Brown",
    skinColor: "Dark-brown",
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
      religion: "Rastafari",
      babylonFree: true,
      color: "Yellow base with brown circles"
    };
  }
}

export default RudyKoneReynoldsRegistryGeneral;
