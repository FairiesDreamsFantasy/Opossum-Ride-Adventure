/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * General Configuration - Flowers, Stars, Diamonds & Rainbow Stone Door With Carvings
 */

export const FLOWERS_STARS_DIAMONDS_RAINBOW_STONE_DOORS_CONFIG = {
  id: "flowers_stars_diamonds_and_rainbow_stone_door_with_carvings",
  name: "Flowers, Stars, Diamonds & Rainbow Carved Stone Sliding Doors",
  type: "Pocket Double Sliding Stone Doors",
  material: "Carved Temple Stone with Painted Rainbows, Flowers, Diamonds, and 5-Point Stars",
  doorSizeFeet: { width: 20, height: 20 },
  leafSizeFeet: { width: 10, height: 20 },
  placement: {
    wall: "east",
    xFeet: 4000,
    yRangeFeet: [1490, 1510],
    centerYFeet: 1500
  },
  carvings: {
    motifs: ["flowers", "rainbows_painted", "diamonds", "five_point_stars"],
    rainbowColors: ["#ef4444", "#f97316", "#facc15", "#22c55e", "#38bdf8", "#818cf8", "#c084fc"]
  },
  pocketDoorDisappearance: true,
  screenReaderAnnouncement: false
};

export default FLOWERS_STARS_DIAMONDS_RAINBOW_STONE_DOORS_CONFIG;
