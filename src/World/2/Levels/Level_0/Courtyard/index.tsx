/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const WORLD2_COURTYARD_SPEC = {
  zoneId: "courtyard" as const,
  name: "Temple Courtyard",
  isOutdoor: true,
  surfaceType: "stone" as const,
  dimensionsFeet: { width: 4000, depth: 3000, wallHeight: 25 },
  bounds: { xMin: 0, xMax: 4000, yMin: 0, yMax: 3000 },
  spawn: { x: 0, y: 1500, direction: "East" as const },
  walls: {
    material: "Large carved stone blocks",
    heightFeet: 25,
    west: {
      x: 0,
      hasLockedDoor: true,
      lockedDoorYRange: [1490, 1510] as const,
      overlooks: "Long road and distant World 1 crop field horizon"
    },
    east: {
      x: 4000,
      isTempleFacade: true,
      windowOpeningsY: [
        [520, 960],
        [2040, 2480]
      ] as const,
      doorBuildingBlock: "Flowers_Stars_Diamonds_and_Rainbow_Stone_Door_With_Carvings",
      doorYRange: [1490, 1510] as const,
      doorDimensionsFeet: { width: 20, height: 20 }
    },
    northGate: { y: 3000, xRange: [2990, 3010] as const, widthFeet: 20 },
    southGate: { y: 0, xRange: [2990, 3010] as const, widthFeet: 20 }
  },
  features: {
    hasFeralPigs: false,
    hasMonkeysRidingMoose: false,
    hasUnmountedMoose: false,
    hasEdibleTreats: false
  }
};

export default WORLD2_COURTYARD_SPEC;
