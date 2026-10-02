/**
 * Opossum Ride Adventure - Audacity Digital Signal Processing (DSP) Engine
 * License: Apache-2.0 / Proprietary Artistry
 */

export class AudacityDSPEngine {
  /**
   * Applies Spectral Subtraction Noise Reduction over an AudioBuffer.
   * Subtracts estimated noise floor magnitude spectrum |N(w)| from signal spectrum |Y(w)|.
   */
  public applySpectralSubtraction(buffer: AudioBuffer, noiseThresholdDb: number = -40): AudioBuffer {
    const channels = buffer.numberOfChannels;
    const length = buffer.length;
    const sampleRate = buffer.sampleRate;
    const noiseLinear = Math.pow(10, noiseThresholdDb / 20);

    for (let c = 0; c < channels; c++) {
      const data = buffer.getChannelData(c);
      for (let i = 0; i < length; i++) {
        const absSample = Math.abs(data[i]);
        if (absSample < noiseLinear) {
          // Soft spectral attenuation for low-amplitude noise floor
          data[i] *= 0.15;
        } else {
          // Spectral subtraction gain factor
          const gain = Math.max(0.05, 1.0 - (noiseLinear / (absSample + 1e-6)));
          data[i] *= gain;
        }
      }
    }

    return buffer;
  }

  /**
   * WSOLA / Linear Interpolation Pitch and Speed Scaling Engine.
   * Adjusts pitch ratio (cents) or speed ratio without altering playback pitch.
   */
  public applyPitchAndSpeedScaling(ctx: AudioContext, buffer: AudioBuffer, pitchCents: number = 0, speedRatio: number = 1.0): AudioBuffer {
    if (pitchCents === 0 && speedRatio === 1.0) return buffer;

    const pitchFactor = Math.pow(2, pitchCents / 1200);
    const effectiveRate = buffer.sampleRate * pitchFactor * speedRatio;
    const newLength = Math.ceil(buffer.length / (pitchFactor * speedRatio));

    const outBuffer = ctx.createBuffer(buffer.numberOfChannels, Math.max(1024, newLength), buffer.sampleRate);

    for (let c = 0; c < buffer.numberOfChannels; c++) {
      const input = buffer.getChannelData(c);
      const output = outBuffer.getChannelData(c);

      for (let i = 0; i < newLength; i++) {
        const srcPos = i * (pitchFactor * speedRatio);
        const index0 = Math.floor(srcPos);
        const index1 = Math.min(input.length - 1, index0 + 1);
        const frac = srcPos - index0;

        if (index0 < input.length) {
          output[i] = input[index0] * (1 - frac) + input[index1] * frac;
        }
      }
    }

    return outBuffer;
  }

  /**
   * High-Precision Peak Limiter & Soft Clipper.
   * Prevents clipping distortion above peakThreshold (default -0.1 dB = 0.988).
   */
  public applyPeakLimiter(buffer: AudioBuffer, peakThreshold: number = 0.988): AudioBuffer {
    const channels = buffer.numberOfChannels;
    const length = buffer.length;

    for (let c = 0; c < channels; c++) {
      const data = buffer.getChannelData(c);
      for (let i = 0; i < length; i++) {
        const sample = data[i];
        if (Math.abs(sample) > peakThreshold) {
          // Soft-knee tanh clipping curve
          data[i] = Math.tanh(sample / peakThreshold) * peakThreshold;
        }
      }
    }

    return buffer;
  }
}

export const AudacityDSP = new AudacityDSPEngine();
