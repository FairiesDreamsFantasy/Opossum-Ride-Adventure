import { NightSky } from "./Night";
import { DaySky } from "./Day";
import { MiddaySky } from "./Midday";
import { SkyGeneral } from "./General";

/**
 * Sky System Index
 * Coordinates transitions between day, midday, and night cycles.
 */
export const SkySystem = {
  Night: NightSky,
  Day: DaySky,
  Midday: MiddaySky,
  General: SkyGeneral,
  currentTime: "Night", // Default to game's primary aesthetic
  transitionSpeed: 0.05,
  getCelestialIntegrityFactor: (): number => 1.0
};
