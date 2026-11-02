/**
 * Opossum Ride Adventure - Master Permanent Standard Time (PST) Engine
 * License: Apache-2.0 / Astronomical Timekeeping Standard
 */

import {
  PermanentStandardTimeGeneral,
  SolarElevationState,
  StandardTimeDetails,
  TimezoneStandardSpec
} from "./General";

export class PermanentStandardTimeEngine {
  private static instance: PermanentStandardTimeEngine;
  private timezoneSpec: TimezoneStandardSpec;

  private constructor() {
    this.timezoneSpec = {
      timezoneName: "Pacific Standard Time (PST)",
      standardOffsetHours: PermanentStandardTimeGeneral.defaultStandardOffsetHours,
      isPermanentStandardTime: PermanentStandardTimeGeneral.permanentStandardTimeEnabled,
      dstFallbackHourAdjustment: PermanentStandardTimeGeneral.dstFallbackDeltaHours,
      extendedNightMultiplier: 1.25
    };
  }

  public static getInstance(): PermanentStandardTimeEngine {
    if (!PermanentStandardTimeEngine.instance) {
      PermanentStandardTimeEngine.instance = new PermanentStandardTimeEngine();
    }
    return PermanentStandardTimeEngine.instance;
  }

  public getGeneralSpecification() {
    return PermanentStandardTimeGeneral;
  }

  /**
   * Scientifically determines if a given Date is currently in Daylight Saving Time (DST)
   * by comparing the local timezone offset against the standard winter offset (January).
   */
  public isDaylightSavingTime(date: Date = new Date()): boolean {
    const jan = new Date(date.getFullYear(), 0, 1).getTimezoneOffset();
    const jul = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
    const standardOffset = Math.max(jan, jul);
    return date.getTimezoneOffset() < standardOffset;
  }

  /**
   * Converts any local or DST Date instance into Permanent Standard Time (PST).
   * If the input time is in DST (e.g. 21:00 Daylight Saving Time), it falls back 1 hour to 20:00 Standard Time.
   */
  public getStandardDate(date: Date = new Date()): Date {
    const standardDate = new Date(date.getTime());
    if (this.isDaylightSavingTime(date)) {
      // Fall back 1 hour from DST to Standard Time (21:00 DST -> 20:00 Standard)
      standardDate.setHours(standardDate.getHours() + PermanentStandardTimeGeneral.dstFallbackDeltaHours);
    }
    return standardDate;
  }

  /**
   * Returns complete structured information regarding Standard Time conversions
   */
  public getStandardTimeDetails(date: Date = new Date()): StandardTimeDetails {
    const isDST = this.isDaylightSavingTime(date);
    const standardDate = this.getStandardDate(date);

    const hours = String(standardDate.getHours()).padStart(2, "0");
    const minutes = String(standardDate.getMinutes()).padStart(2, "0");
    const seconds = String(standardDate.getSeconds()).padStart(2, "0");

    const formattedStandardTime = `${hours}:${minutes}:${seconds} PST (Standard Time)`;

    return {
      utcTimestamp: date.getTime(),
      dstTimestamp: date.getTime(),
      standardTimestamp: standardDate.getTime(),
      formattedStandardTime,
      isDSTAdjusted: isDST,
      timeOffsetDescription: isDST
        ? "Daylight Saving Time active in environment; adjusted 1 hour backward (21:00 DST -> 20:00 PST)."
        : "Standard Time active; zero offset adjustment needed."
    };
  }

  /**
   * Calculates astronomical solar elevation and sky lighting state based on Permanent Standard Time
   */
  public calculateSolarElevation(date: Date = new Date()): SolarElevationState {
    const stdDate = this.getStandardDate(date);
    const hours = stdDate.getHours() + stdDate.getMinutes() / 60 + stdDate.getSeconds() / 3600;

    const solarHourAngle = ((hours - 12) / 12) * Math.PI;
    const solarElevationDegrees = Math.sin(solarHourAngle - Math.PI / 2) * 60;

    let isNight = false;
    let isTwilight = false;
    let twilightPhase: SolarElevationState["twilightPhase"] = "Day";
    let skyAmbientIntensity = 1.0;
    let starlitSkyVisibility = 0.0;

    if (solarElevationDegrees > 0) {
      twilightPhase = "Day";
      isNight = false;
      isTwilight = false;
      skyAmbientIntensity = Math.min(1.0, 0.3 + (solarElevationDegrees / 60) * 0.7);
      starlitSkyVisibility = 0.0;
    } else if (solarElevationDegrees > -6) {
      twilightPhase = "Civil";
      isNight = false;
      isTwilight = true;
      skyAmbientIntensity = 0.25;
      starlitSkyVisibility = 0.2;
    } else if (solarElevationDegrees > -12) {
      twilightPhase = "Nautical";
      isNight = true;
      isTwilight = true;
      skyAmbientIntensity = 0.12;
      starlitSkyVisibility = 0.65;
    } else if (solarElevationDegrees > -18) {
      twilightPhase = "Astronomical";
      isNight = true;
      isTwilight = true;
      skyAmbientIntensity = 0.05;
      starlitSkyVisibility = 0.9;
    } else {
      twilightPhase = "Night";
      isNight = true;
      isTwilight = false;
      skyAmbientIntensity = 0.02;
      starlitSkyVisibility = 1.0;
    }

    return {
      solarElevationDegrees: Number(solarElevationDegrees.toFixed(2)),
      isNight,
      isTwilight,
      twilightPhase,
      skyAmbientIntensity: Number(skyAmbientIntensity.toFixed(3)),
      starlitSkyVisibility: Number(starlitSkyVisibility.toFixed(2))
    };
  }
}

export const PermanentStandardTime = PermanentStandardTimeEngine.getInstance();
