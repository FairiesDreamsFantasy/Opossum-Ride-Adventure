/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * CPU L1/L2/L3 Cache Line Alignment & GPU VRAM Transfer Optimizer
 */
export const GeminiCacheOptimizer = {
  cacheLineSizeBytes: 64,
  vramBlockSizeBytes: 1024 * 1024, // 1 MB pages
  
  /**
   * Aligns memory offset to prevent L1/L2 cache line thrashing
   */
  alignCacheLine: (byteOffset: number): number => {
    return (byteOffset + 63) & ~63;
  }
};

export default GeminiCacheOptimizer;
