/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const GrandTeaRoomDimensions = {
  widthFeet: 2000,
  lengthFeet: 2000,
  ceilingHeightFeet: 30,
  doorway: {
    wall: "East",
    startFromSouthFeet: 990,
    endFromSouthFeet: 1010,
    totalWidthFeet: 20,
    doorPanelWidthFeet: 10,
    doorPanelHeightFeet: 15,
    totalFrameHeightFeet: 20,
    frameThicknessInches: 6,
    frameColor: "Red",
    decorations: {
      goldCircles: { diameterInches: 3.5 },
      silverDiamonds: true,
      emeraldStars5Point: true
    }
  },
  tapestryDecoration: {
    wall: "East",
    startFromSouthFeet: 100,
    endFromSouthFeet: 400
  },
  pictureWindows: {
    sizeFeet: { width: 10, height: 10 },
    heightFromFloorFeet: 10,
    walls: ["North", "West"]
  }
};
