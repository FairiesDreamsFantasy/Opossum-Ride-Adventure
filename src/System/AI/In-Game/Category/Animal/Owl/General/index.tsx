/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Owl AI Behavioral Subsystem
 * Logic for nocturnal flight patterns and perched hooting.
 */
export function resolveOwlBehavior(random: number): { action: string; duration: number } {
  if (random < 0.7) {
    return { action: "perched", duration: 3000 + random * 5000 };
  } else if (random < 0.9) {
    return { action: "hooting", duration: 1500 };
  } else {
    return { action: "flying", duration: 2000 + random * 3000 };
  }
}
