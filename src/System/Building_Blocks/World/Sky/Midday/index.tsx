import { MiddaySkyGeneral } from "./General";

/**
 * Midday Sky Module
 * Defines peak solar position, crisp contrast, and midday atmosphere.
 */
export const MiddaySky = {
  id: "Midday",
  name: "Midday Sky",
  ambientColor: "#f0f9ff",
  fogColor: "#e0f2fe",
  cloudDensity: 0.2,
  sunVisible: true,
  sunPosition: { x: 0.5, y: 1.0 },
  lightIntensity: 1.2,
  horizonColor: "#bae6fd",
  General: MiddaySkyGeneral
};
