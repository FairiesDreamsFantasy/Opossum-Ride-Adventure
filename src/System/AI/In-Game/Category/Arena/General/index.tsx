/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ArenaAIConfig {
  placeId: string;
  isHotspotEligible: boolean;
  surfaceType: string;
  maxOpponentsDensity: number;
}

export function getArenaAIConfig(placeId: string): ArenaAIConfig {
  const normalized = placeId.toLowerCase().trim();
  if (normalized.includes("forest") || normalized.includes("cave") || normalized.includes("mountains") || normalized.includes("plain")) {
    return {
      placeId: normalized,
      isHotspotEligible: true,
      surfaceType: normalized.includes("cave") ? "stone" : (normalized.includes("mountains") ? "gravel" : "dirt"),
      maxOpponentsDensity: 1.5
    };
  }
  return {
    placeId: normalized,
    isHotspotEligible: false,
    surfaceType: "grass",
    maxOpponentsDensity: 0.8
  };
}

export const ArenaGeneral = {
  getArenaAIConfig,
  isHotspotEligible: (placeId: string): boolean => getArenaAIConfig(placeId).isHotspotEligible
};
