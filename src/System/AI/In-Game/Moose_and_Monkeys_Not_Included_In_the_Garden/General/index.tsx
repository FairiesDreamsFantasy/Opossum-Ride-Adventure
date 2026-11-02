/**
 * Scientific rules for arena opponent filtering.
 * Monkeys riding moose are strictly excluded from Garden arenas and reserved for
 * Forest, Mountains, and Cave arenas to conserve resources and preserve garden peacefulness.
 */

import { PlaceResolver } from "../../../../Engine/Resolver";

export const MOOSE_ALLOWED_PLACES = ["forest", "mountains", "cave"] as const;

export type AllowedMoosePlace = typeof MOOSE_ALLOWED_PLACES[number];

/**
 * Validates if the given place ID is allowed to spawn or contain monkeys riding moose.
 * Delegates to PlaceResolver.isEnemyAllowed to ensure opponents spawn in orchards, groves, farms, mines, and AI levels while keeping peaceful gardens calm.
 */
export function isMooseAndMonkeysAllowedInPlace(placeId: string): boolean {
  return PlaceResolver.isEnemyAllowed(placeId);
}

/**
 * Checks if a specific level within an allowed arena is configured for an active hotspot event.
 * Level 1 of the Forest arena is specifically set as a primary active hotspot.
 */
export function isMooseHotspotLevel(placeId: string, levelId: number): boolean {
  if (!placeId) return false;
  const normalized = placeId.toLowerCase().trim();
  
  if (!isMooseAndMonkeysAllowedInPlace(normalized)) return false;
  
  // The hotspot previously at Garden level 4/5 is now located at Forest Level 1, as well as general Mountains/Cave levels
  if (normalized === "forest" && levelId === 1) {
    return true;
  }
  
  if (normalized === "mountains" || normalized === "cave") {
    return true;
  }
  
  return false;
}
