import {
  MOOSE_ALLOWED_PLACES,
  isMooseAndMonkeysAllowedInPlace,
  isMooseHotspotLevel
} from "./General";

export {
  MOOSE_ALLOWED_PLACES,
  isMooseAndMonkeysAllowedInPlace,
  isMooseHotspotLevel
};

/**
 * High-level AI decision engine for Moose & Monkey opponent allocation.
 */
export const MooseAndMonkeysArenaPolicy = {
  isAllowed: isMooseAndMonkeysAllowedInPlace,
  isHotspot: isMooseHotspotLevel,
  allowedPlaces: MOOSE_ALLOWED_PLACES
};
