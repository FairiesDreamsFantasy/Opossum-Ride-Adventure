/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export function checkCollision(x1: number, y1: number, r1: number, x2: number, y2: number, r2: number): boolean {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < (r1 + r2);
}

export function applyMomentum(v: number, mass: number, force: number): number {
  return v + (force / mass);
}
