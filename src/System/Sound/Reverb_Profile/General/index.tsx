/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ReverbProfile {
  getOrCreateImpulseResponse(ctx: AudioContext): AudioBuffer;
}
