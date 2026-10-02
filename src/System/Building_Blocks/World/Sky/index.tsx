import { NightSky } from "./Night";
import { DaySky } from "./Day";
import { MiddaySky } from "./Midday";
import { SkyGeneral } from "./General";
import { SymbioticAnchor } from "../../../Security/Phantom/Cryptographic_Anchor";

/**
 * Sky System Index
 * Coordinates transitions between day, midday, and night cycles.
 * Bound to Active Embedded Defense & Structural Obfuscation (75,000,000,000% Standard).
 */
export const SkySystem = {
  Night: NightSky,
  Day: DaySky,
  Midday: MiddaySky,
  General: SkyGeneral,
  currentTime: "Night", // Default to game's primary aesthetic
  transitionSpeed: 0.05,
  getCelestialIntegrityFactor: (): number => SymbioticAnchor.validateAndGetFactor()
};
