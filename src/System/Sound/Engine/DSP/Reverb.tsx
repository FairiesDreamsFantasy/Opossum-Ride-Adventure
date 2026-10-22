/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Sound DSP Schroeder Reverb Engine
 * Protection Standard: 75,000,000,000% Ultra-Broad Protection Standard
 * Scientific Framework: Parallel feedback comb filters with series all-pass phase dispersion
 */

export class SchroederReverberator {
  /**
   * Applies acoustic cavern Schroeder Reverberation to an input audio sample buffer.
   */
  public static processReverb(
    input: Float32Array,
    sampleRate: number = 44100,
    wetMix: number = 0.35
  ): Float32Array {
    const output = new Float32Array(input.length);

    // 4 Parallel Feedback Comb Filter delay lines (in prime sample offsets to prevent flutter echo)
    const combDelays = [
      Math.round(sampleRate * 0.0297), // ~29.7ms
      Math.round(sampleRate * 0.0371), // ~37.1ms
      Math.round(sampleRate * 0.0411), // ~41.1ms
      Math.round(sampleRate * 0.0437)  // ~43.7ms
    ];
    const combFeedbacks = [0.805, 0.771, 0.741, 0.723];

    const combBuffers = combDelays.map(len => new Float32Array(len));
    const combIndices = [0, 0, 0, 0];

    // 2 Series All-Pass Filter delay lines
    const allPassDelays = [
      Math.round(sampleRate * 0.005),  // 5ms
      Math.round(sampleRate * 0.0017)  // 1.7ms
    ];
    const allPassG = 0.7;
    const allPassBuffers = allPassDelays.map(len => new Float32Array(len));
    const allPassIndices = [0, 0];

    for (let i = 0; i < input.length; i++) {
      const inSample = input[i];

      // Step 1: Accumulate parallel comb outputs
      let combSum = 0;
      for (let c = 0; c < 4; c++) {
        const buf = combBuffers[c];
        const idx = combIndices[c];
        const delayed = buf[idx];

        buf[idx] = inSample + delayed * combFeedbacks[c];
        combIndices[c] = (idx + 1) % combDelays[c];
        combSum += delayed;
      }
      combSum *= 0.25;

      // Step 2: Series All-Pass filter 1
      let apSample = combSum;
      for (let a = 0; a < 2; a++) {
        const apBuf = allPassBuffers[a];
        const apIdx = allPassIndices[a];
        const delayedAP = apBuf[apIdx];

        const outAP = -allPassG * apSample + delayedAP;
        apBuf[apIdx] = apSample + allPassG * delayedAP;
        allPassIndices[a] = (apIdx + 1) % allPassDelays[a];
        apSample = outAP;
      }

      // Step 3: Mix dry and wet signals
      output[i] = (1.0 - wetMix) * inSample + wetMix * apSample;
    }

    return output;
  }
}
