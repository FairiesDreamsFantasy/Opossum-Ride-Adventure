/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GeminiDataWildcard } from "./_Wildcard_";

/**
 * Gemini Scientific Data Coordination Subsystem.
 */
class GeminiDataSubsystem {
  public readonly Heuristics = GeminiDataWildcard.Heuristics;
  public readonly LotkaVolterra = GeminiDataWildcard.LotkaVolterra;
  public readonly AtmosphereProfiles = GeminiDataWildcard.AtmosphereProfiles;
}

export const GeminiData = new GeminiDataSubsystem();
export * from "./_Wildcard_";
export default GeminiData;
