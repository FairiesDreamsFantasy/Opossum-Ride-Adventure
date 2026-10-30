/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Master 64-Bit C Compute Engine
 * Combines AI, Physics, and DSP Audio modules.
 */

#include "AI/index.c"
#include "Physics/index.c"
#include "Audio/index.c"

/**
 * Primary WASM Export: Computes complete 64-bit frame step for an opossum mount.
 */
double compute_opossum_frame_step_64(
    double currentY, double velocityY, double springK,
    double massKg, double delta, double baseFreq, double pitchRatio
) {
    double newY = integrate_rk4_suspension_step(currentY, velocityY, springK, massKg, delta);
    double currentFreq = calculate_vocal_chatter_sweep(baseFreq, pitchRatio, 0.5);
    return newY + (currentFreq * 0.0001);
}
