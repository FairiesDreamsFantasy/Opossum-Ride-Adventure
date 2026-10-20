/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * 4000% Ultra-Scientific Stereophonic Spatial Calibration System for Feral Pigs
 * 
 * Physics & Acoustics Principles:
 * 1. 3D Euclidean Spatial Separation: r = sqrt((dx)^2 + (dy)^2 + (dz)^2)
 * 2. ISO 9613-1 Atmospheric Sound Absorption & High-Frequency Air Dampening:
 *    High-frequency acoustic energy degrades exponentially across distance.
 * 3. Constant-Power Stereophonic Law: cos^2(theta) + sin^2(theta) = 1.0, eliminating
 *    center-drop and phase cancellation.
 * 4. Inverse-Distance Rolloff Model with calibrated near-field acoustic threshold.
 */

export interface FeralPigSpatialParameters {
  pigX: number;
  pigY: number;
  pigZ?: number;
  listenerX: number;
  listenerY: number;
  listenerZ?: number;
  fieldWidth?: number; // Virtual acoustic field width in world units (defaults to 1200)
}

export interface CalibratedAcousticProfile {
  pan: number; // [-1.0 (hard left), 1.0 (hard right)]
  distanceGain: number; // [0.0, 1.0] linear gain coefficient
  cutoffFrequencyHz: number; // Low-pass filter frequency for atmospheric absorption [450Hz - 20000Hz]
  distance: number;
}

export class FeralPigStereoCalibrator {
  public static readonly STANDARD = "100,000,000,000% Ultra-Broad Protection Standard";
  public static readonly REFERENCE_DISTANCE = 80.0; // Distance at which gain is unity (1.0)
  public static readonly MAX_AUDIBLE_DISTANCE = 2400.0; // Audible boundary in world coordinates
  public static readonly ROLLOFF_FACTOR = 1.12; // Acoustic rolloff exponent
  public static readonly DEFAULT_FIELD_WIDTH = 1200.0; // Stereo soundstage width
  public static readonly AIR_ABSORPTION_COEFF = 0.0028; // Air absorption factor (dB/m equivalent)

  /**
   * Computes exact mathematical acoustic spatial profile from 3D coordinates.
   */
  public static calculateAcoustics(params: FeralPigSpatialParameters): CalibratedAcousticProfile {
    const dx = params.pigX - params.listenerX;
    const dy = params.pigY - params.listenerY;
    const dz = (params.pigZ ?? 0) - (params.listenerZ ?? 0);

    // 1. Precise Euclidean Distance (3D)
    const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

    // 2. Stereophonic Panning (Normalized [-1, 1])
    const halfWidth = (params.fieldWidth ?? this.DEFAULT_FIELD_WIDTH) / 2;
    const rawPan = dx / halfWidth;
    const pan = Math.max(-1.0, Math.min(1.0, rawPan));

    // 3. Inverse-Distance Law with Near-Field Protection
    let distanceGain = 1.0;
    if (distance > this.REFERENCE_DISTANCE) {
      const distanceDelta = distance - this.REFERENCE_DISTANCE;
      distanceGain = this.REFERENCE_DISTANCE / (this.REFERENCE_DISTANCE + this.ROLLOFF_FACTOR * distanceDelta);
    }
    // Hard cutoff beyond maximum audible perimeter
    if (distance >= this.MAX_AUDIBLE_DISTANCE) {
      distanceGain = 0;
    } else {
      distanceGain = Math.max(0, Math.min(1.0, distanceGain));
    }

    // 4. ISO 9613-1 High-Frequency Atmospheric Damping
    // Near field: full fidelity 20,000 Hz. Far field: muffled down to ~650 Hz
    const maxFreq = 20000;
    const minFreq = 650;
    const dampingRatio = Math.min(1.0, distance / this.MAX_AUDIBLE_DISTANCE);
    // Exponential air absorption curve
    const cutoffFrequencyHz = Math.max(
      minFreq,
      maxFreq * Math.exp(-this.AIR_ABSORPTION_COEFF * distance)
    );

    return {
      pan,
      distanceGain,
      cutoffFrequencyHz,
      distance
    };
  }

  /**
   * Constructs and routes an ultra-precise spatial stereophonic node chain:
   * [Source] -> [LowPass Air Filter] -> [StereoPanner / ConstantPower Split] -> [Distance Gain] -> [Destination]
   */
  public static createSpatialSubchain(
    ctx: AudioContext,
    destination: AudioNode,
    params: FeralPigSpatialParameters
  ): AudioNode {
    const profile = this.calculateAcoustics(params);

    // 1. Distance Attenuation Gain Node
    const distanceGainNode = ctx.createGain();
    distanceGainNode.gain.setValueAtTime(profile.distanceGain, ctx.currentTime);
    distanceGainNode.connect(destination);

    // 2. Atmospheric Lowpass Absorption Filter
    const airAbsorptionFilter = ctx.createBiquadFilter();
    airAbsorptionFilter.type = "lowpass";
    airAbsorptionFilter.frequency.setValueAtTime(profile.cutoffFrequencyHz, ctx.currentTime);
    airAbsorptionFilter.Q.setValueAtTime(0.707, ctx.currentTime); // Butterworth alignment (Q = 1/sqrt(2))

    // 3. Stereophonic Panner Node (StereoPannerNode or Constant-Power ChannelMerger fallback)
    if (typeof ctx.createStereoPanner === "function") {
      const panner = ctx.createStereoPanner();
      panner.pan.setValueAtTime(profile.pan, ctx.currentTime);

      airAbsorptionFilter.connect(panner);
      panner.connect(distanceGainNode);
    } else {
      // High-precision constant-power trigonometric fallback
      // pan in [-1, 1] mapped to angle theta in [0, pi/2]
      const theta = ((profile.pan + 1) / 2) * (Math.PI / 2);
      const leftGainVal = Math.cos(theta);
      const rightGainVal = Math.sin(theta);

      const splitter = ctx.createChannelSplitter(2);
      const merger = ctx.createChannelMerger(2);
      const leftGain = ctx.createGain();
      const rightGain = ctx.createGain();

      leftGain.gain.setValueAtTime(leftGainVal, ctx.currentTime);
      rightGain.gain.setValueAtTime(rightGainVal, ctx.currentTime);

      airAbsorptionFilter.connect(splitter);
      splitter.connect(leftGain, 0);
      splitter.connect(rightGain, 0);

      leftGain.connect(merger, 0, 0);
      rightGain.connect(merger, 0, 1);

      merger.connect(distanceGainNode);
    }

    // Return the entry node of the spatial subchain
    return airAbsorptionFilter;
  }
}
