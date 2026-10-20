import { NightSkyGeneral } from "./General";

/**
 * Night Sky Module
 * Defines celestial parameters, stars, moon phase, and atmospheric lighting for night cycles.
 */
export const NightSky = {
  id: "Night",
  name: "Night Sky",
  ambientColor: "#0f172a",
  fogColor: "#1e1b4b",
  starDensity: 0.85,
  moonVisible: true,
  moonPhase: "Full",
  lightIntensity: 0.3,
  horizonColor: "#020617",
  General: NightSkyGeneral
};
