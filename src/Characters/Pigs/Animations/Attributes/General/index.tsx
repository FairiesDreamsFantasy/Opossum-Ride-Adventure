/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PigAttributeState {
  isSmashed: boolean;
  smashTimestamp?: number;
  smashDurationMs: number;
  floatingScore?: number;
  scoreDisplayDurationMs: number;
  opacity: number;
}
