/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Grand Tea Room Core Configuration & Time-of-Day Dynamics
 * Enforces the 1,000,000,000,000,000,000,000,000 x 1,000,000,000,000,000,000,000,000,000,000,000,000% Ultra-Broad Standard.
 */

export const MAX_OPOSSUM_HOSTESSES = 64;
export const MAX_TEA_TABLES = 16;
export const MAX_GUEST_CAPACITY = 80;

export type TimeOfDayPeriod = 
  | "EARLY_MORNING_HERBAL"
  | "MIDDAY_SOLAR_INFUSION"
  | "CLASSIC_AFTERNOON_TEA"
  | "GRAND_EVENING_HIGH_TEA"
  | "TWILIGHT_HEARTH_NIGHTCAP";

export interface TeaRoomTimeProfile {
  readonly period: TimeOfDayPeriod;
  readonly periodName: string;
  readonly startHourLocal: number; // 24h format
  readonly endHourLocal: number;
  readonly isPrimeTeaTime: boolean;
  readonly ambientCandleLux: number; // Optical illumination in lux
  readonly colorTemperatureKelvin: number; // Warm hearth light (2400K-3200K)
  readonly recommendedBlends: string[];
  readonly atmosphereDescription: string;
}

export const TEA_ROOM_TIME_SCHEDULE: TeaRoomTimeProfile[] = [
  {
    period: "EARLY_MORNING_HERBAL",
    periodName: "Early Morning Herbal Awakening",
    startHourLocal: 6,
    endHourLocal: 11,
    isPrimeTeaTime: false,
    ambientCandleLux: 350,
    colorTemperatureKelvin: 4000,
    recommendedBlends: ["Wild Mint Lavender", "Orchard Apple Blossom", "Mountain Chamomile"],
    atmosphereDescription: "Gentle morning sunbeams stream through the manor stained-glass windows as the fireplace begins to warm the room."
  },
  {
    period: "MIDDAY_SOLAR_INFUSION",
    periodName: "Midday Botanical Infusion",
    startHourLocal: 11,
    endHourLocal: 14,
    isPrimeTeaTime: false,
    ambientCandleLux: 450,
    colorTemperatureKelvin: 5000,
    recommendedBlends: ["Berry Hibiscus", "Honey Clover Nectar", "Citrus Rosehip"],
    atmosphereDescription: "Bright, airy daylight fills the grand tea parlor, refreshing guests exploring the manor grounds."
  },
  {
    period: "CLASSIC_AFTERNOON_TEA",
    periodName: "Classic Victorian Afternoon Tea",
    startHourLocal: 14,
    endHourLocal: 17,
    isPrimeTeaTime: true,
    ambientCandleLux: 320,
    colorTemperatureKelvin: 3200,
    recommendedBlends: ["Roasted Rooibos Vanilla", "Honey Clover Nectar", "Wild Berry Blend"],
    atmosphereDescription: "The traditional afternoon tea gathering. Families and children gather around tables adorned with fresh flowers and tier stands."
  },
  {
    period: "GRAND_EVENING_HIGH_TEA",
    periodName: "Grand Evening High Tea (Prime International Tradition)",
    startHourLocal: 17,
    endHourLocal: 20,
    isPrimeTeaTime: true,
    ambientCandleLux: 240,
    colorTemperatureKelvin: 2700,
    recommendedBlends: ["Mountain Chamomile Comfort", "Velvet Lavender Mint", "Roasted Rooibos Caramel"],
    atmosphereDescription: "The centerpiece evening tea tradition worldwide. Crystal chandeliers glow softly, fine porcelain sparkles, and families share warm conversations."
  },
  {
    period: "TWILIGHT_HEARTH_NIGHTCAP",
    periodName: "Twilight Hearth & Starlight Nightcap",
    startHourLocal: 20,
    endHourLocal: 24,
    isPrimeTeaTime: true,
    ambientCandleLux: 160,
    colorTemperatureKelvin: 2400,
    recommendedBlends: ["Deep Sleep Chamomile & Oatstraw", "Tranquil Lavender Hearth"],
    atmosphereDescription: "Warm firelight crackles in the hearth as hostesses read gentle bedtime stories to infants in soft twilight."
  }
];

/**
 * Calculates current Tea Room Time-of-Day Dynamics based on player local or specified hour.
 */
export function getCurrentTeaRoomTimeProfile(currentHour?: number): TeaRoomTimeProfile {
  const hour = currentHour !== undefined 
    ? currentHour 
    : new Date().getHours();

  for (const schedule of TEA_ROOM_TIME_SCHEDULE) {
    if (hour >= schedule.startHourLocal && hour < schedule.endHourLocal) {
      return schedule;
    }
  }

  // Late night default (0:00 - 6:00)
  return {
    period: "TWILIGHT_HEARTH_NIGHTCAP",
    periodName: "Late Night Tranquil Hearth",
    startHourLocal: 0,
    endHourLocal: 6,
    isPrimeTeaTime: false,
    ambientCandleLux: 120,
    colorTemperatureKelvin: 2200,
    recommendedBlends: ["Tranquil Lavender Hearth", "Chamomile Starlight"],
    atmosphereDescription: "Quiet night hours in the manor with amber hearth glow and peaceful lullabies."
  };
}

export interface TeaPartySubsystemConfig {
  readonly standard: string;
  readonly enabled: boolean;
  readonly maxHostesses: number;
  readonly maxTables: number;
  readonly maxGuests: number;
  readonly liquidAcousticEngineActive: boolean;
  readonly dynamicTimeOfDayActive: boolean;
  readonly cleanAirAirQualityPM25: number;
  readonly modestyPolicy: "FAMILY_FRIENDLY_ELEGANT_ATTIRE";
}

export const DEFAULT_TEA_PARTY_CONFIG: TeaPartySubsystemConfig = {
  standard: "1,000,000,000,000,000,000,000,000 x 1,000,000,000,000,000,000,000,000,000,000,000,000%_ULTRA_BROAD",
  enabled: true,
  maxHostesses: MAX_OPOSSUM_HOSTESSES,
  maxTables: MAX_TEA_TABLES,
  maxGuests: MAX_GUEST_CAPACITY,
  liquidAcousticEngineActive: true,
  dynamicTimeOfDayActive: true,
  cleanAirAirQualityPM25: 0.0,
  modestyPolicy: "FAMILY_FRIENDLY_ELEGANT_ATTIRE"
};

export const TeaPartyGeneral = {
  systemName: "Grand Tea Room General Subsystem",
  version: "0.1.4.0",
  DEFAULT_TEA_PARTY_CONFIG,
  TEA_ROOM_TIME_SCHEDULE,
  getCurrentTeaRoomTimeProfile
};

export default TeaPartyGeneral;
