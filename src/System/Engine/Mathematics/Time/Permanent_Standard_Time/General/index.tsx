/**
 * Opossum Ride Adventure - Permanent Standard Time Subsystem General Registry & Specifications
 * License: Apache-2.0 / Astronomical Timekeeping Standard
 */

export interface TimezoneStandardSpec {
  timezoneName: string;
  standardOffsetHours: number; // e.g. -8 for Pacific Standard Time (PST)
  isPermanentStandardTime: boolean;
  dstFallbackHourAdjustment: number; // -1 hour when system is in DST (e.g. 21:00 DST -> 20:00 Standard)
  extendedNightMultiplier: number; // Factor for longer serene nights (1.25x)
}

export interface SolarElevationState {
  solarElevationDegrees: number; // Angle above or below horizon
  isNight: boolean;
  isTwilight: boolean;
  twilightPhase: "Civil" | "Nautical" | "Astronomical" | "Day" | "Night";
  skyAmbientIntensity: number; // 0.0 (pitch black) to 1.0 (midday sun)
  starlitSkyVisibility: number; // 0.0 to 1.0 (full 24 yellow stars)
}

export interface StandardTimeDetails {
  utcTimestamp: number;
  dstTimestamp: number;
  standardTimestamp: number;
  formattedStandardTime: string; // e.g. "20:00:00 PST"
  isDSTAdjusted: boolean;
  timeOffsetDescription: string;
}

export const PermanentStandardTimeGeneral = {
  name: "Permanent Standard Time (PST) & Solar Elevation Engine",
  version: "1.0.0-scientific",
  defaultStandardOffsetHours: -8, // Pacific Standard Time (PST)
  permanentStandardTimeEnabled: true,
  dstFallbackDeltaHours: -1, // Subtract 1 hour from DST to fall back to Standard Time (21:00 DST -> 20:00 Standard)
  starlitNightDurationHours: 14.5, // Natural longer nights with shorter daylight periods
  shorterDayDurationHours: 9.5,   // Shorter daylight arc
  yellowStarsCount: 24,
  license: "Apache-2.0 / Astronomical Time Standard"
};
