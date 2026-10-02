/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Sound Assembly General Low-Level Buffer Management
 */

export class SoundAssemblyGeneral {
  public static allocateAudioBuffer(sampleRate: number, durationSeconds: number): Float32Array {
    return new Float32Array(Math.floor(sampleRate * durationSeconds));
  }

  public static clearBuffer(buffer: Float32Array): void {
    buffer.fill(0);
  }
}

export default SoundAssemblyGeneral;
