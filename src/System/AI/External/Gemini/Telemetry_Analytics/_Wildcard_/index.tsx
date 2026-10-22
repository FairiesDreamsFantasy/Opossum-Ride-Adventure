/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GeminiTelemetryAnalyticsGeneral } from "../General";
import { GeminiTelemetryAnalyticsData } from "../Data";

export const TelemetryAnalyticsWildcard = {
  General: GeminiTelemetryAnalyticsGeneral,
  Data: GeminiTelemetryAnalyticsData,
  systemName: "Gemini AI Telemetry Analytics Supermodule"
};

export * from "../Data";
