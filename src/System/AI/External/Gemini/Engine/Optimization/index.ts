/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GeminiCacheOptimizer } from "./CPU_GPU_Cache";
import { GeminiMemoryPool } from "./Memory_Pool";

export const GeminiEngineOptimization = {
  Cache: GeminiCacheOptimizer,
  MemoryPool: GeminiMemoryPool
};

export { GeminiCacheOptimizer, GeminiMemoryPool };
export default GeminiEngineOptimization;
