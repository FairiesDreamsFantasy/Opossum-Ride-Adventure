/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - C 64-Bit DSP Vocal Chatter Synthesis Engine
 */

#include <stdio.h>
#include <math.h>

/**
 * Calculates 64-bit IEEE 754 precision vocal chatter frequency sweep.
 */
double calculate_vocal_chatter_sweep(double baseFreq, double pitchOffsetRatio, double timeNormalized) {
    double targetBase = baseFreq * (1.000000000000 + pitchOffsetRatio);
    double endFreq = targetBase * 0.346153846154; // 450/1300 ratio
    double ratio = endFreq / targetBase;
    return targetBase * pow(ratio, timeNormalized);
}

/**
 * Calculates biquad bandpass filter Q-factor.
 */
double calculate_formant_q_factor(double centerFreqHz, double bandwidthHz) {
    if (bandwidthHz <= 0.0) return 10.0;
    return centerFreqHz / bandwidthHz;
}
