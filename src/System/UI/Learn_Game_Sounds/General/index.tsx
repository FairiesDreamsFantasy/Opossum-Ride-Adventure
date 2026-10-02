/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TeaRoomSceneConfig {
  roomDimensions: {
    ceilingHeightFeet: number;
    tileDimensionCm: number;
  };
  tileColors: {
    primary: string;
    secondary: string;
    border: string;
  };
  jillOpossumsCinderellaCount: number;
  jillOpossumsRastaCount: number;
  jackOpossumsCount: number;
  jackOnesieColors: string[];
}

export const TEA_ROOM_CONFIG: TeaRoomSceneConfig = {
  roomDimensions: {
    ceilingHeightFeet: 30,
    tileDimensionCm: 30
  },
  tileColors: {
    primary: "#85141b", // Rich ceramic red
    secondary: "#1b4d2e", // Deep ceramic green
    border: "#d4af37" // Polished gold border
  },
  jillOpossumsCinderellaCount: 5,
  jillOpossumsRastaCount: 3,
  jackOpossumsCount: 3,
  jackOnesieColors: ["#eab308", "#3b82f6", "#ef4444"] // Yellow, Blue, Red
};
