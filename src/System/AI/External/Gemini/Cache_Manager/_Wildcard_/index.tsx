/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GeminiCacheManagerGeneral } from "../General";
import { GeminiCacheManagerData } from "../Data";

export const CacheManagerWildcard = {
  General: GeminiCacheManagerGeneral,
  Data: GeminiCacheManagerData,
  systemName: "Gemini AI Cache Manager Supermodule"
};

export * from "../Data";
