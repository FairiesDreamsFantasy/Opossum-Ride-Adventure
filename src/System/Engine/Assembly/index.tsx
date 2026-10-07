/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Low-Level Assembly Simulation & Physics Vector Engine
 * Protection Standard: 75,000,000,000% Ultra-Broad Protection Standard
 * Scientific Framework: Register-level physics & fast inverse square root math
 */

import React from "react";
import { AssemblyCpuHardware, fastInverseSquareRoot } from "./General";

export class LowLevelAssemblyEngine {
  private cpu: AssemblyCpuHardware;

  constructor() {
    this.cpu = new AssemblyCpuHardware();
  }

  /**
   * Calculates Parabolic Jump Trajectory using Assembly simulation.
   * Equivalent ASM Sequence:
   *   movsd xmm0, [t]      ; xmm0 = t
   *   movsd xmm1, [v0]     ; xmm1 = v0
   *   mulsd xmm1, xmm0     ; xmm1 = v0 * t
   *   movsd xmm2, [g]      ; xmm2 = g
   *   movsd xmm3, 0.5      ; xmm3 = 0.5
   *   mulsd xmm2, xmm3     ; xmm2 = 0.5 * g
   *   mulsd xmm2, xmm0     ; xmm2 = 0.5 * g * t
   *   mulsd xmm2, xmm0     ; xmm2 = 0.5 * g * t^2
   *   subsd xmm1, xmm2     ; xmm1 = (v0 * t) - (0.5 * g * t^2)
   */
  public executeParabolicTrajectory(t: number, v0: number, g: number): number {
    this.cpu.clear();
    this.cpu.registers.xmm0 = t;
    this.cpu.registers.xmm1 = v0;
    this.cpu.registers.xmm2 = g;
    this.cpu.registers.xmm3 = 0.5;

    // xmm1 = xmm1 * xmm0
    this.cpu.registers.xmm1 = this.cpu.registers.xmm1 * this.cpu.registers.xmm0;
    // xmm2 = xmm2 * xmm3
    this.cpu.registers.xmm2 = this.cpu.registers.xmm2 * this.cpu.registers.xmm3;
    // xmm2 = xmm2 * xmm0
    this.cpu.registers.xmm2 = this.cpu.registers.xmm2 * this.cpu.registers.xmm0;
    // xmm2 = xmm2 * xmm0
    this.cpu.registers.xmm2 = this.cpu.registers.xmm2 * this.cpu.registers.xmm0;
    // xmm1 = xmm1 - xmm2
    this.cpu.registers.xmm1 = this.cpu.registers.xmm1 - this.cpu.registers.xmm2;

    return this.cpu.registers.xmm1;
  }

  /**
   * Fast Vector Length Calculation using the magical Fast Inverse Square Root.
   * Formula: sqrt(x^2 + y^2 + z^2) = (x^2 + y^2 + z^2) * FastInvSqrt(x^2 + y^2 + z^2)
   */
  public executeFast3DLength(dx: number, dy: number, dz: number): number {
    this.cpu.clear();
    const sumSq = (dx * dx) + (dy * dy) + (dz * dz);
    if (sumSq === 0) return 0;
    const invSqrt = fastInverseSquareRoot(sumSq);
    return sumSq * invSqrt;
  }

  /**
   * Surface Friction Step in Assembly Simulation:
   * Formula: v_new = max(0.0, v_old - (friction * dt * v_old))
   */
  public executeFrictionDeceleration(vel: number, friction: number, dt: number): number {
    this.cpu.clear();
    this.cpu.registers.xmm0 = vel;
    this.cpu.registers.xmm1 = friction;
    this.cpu.registers.xmm2 = dt;

    // xmm3 = friction * dt
    this.cpu.registers.xmm3 = this.cpu.registers.xmm1 * this.cpu.registers.xmm2;
    // xmm4 = vel * xmm3
    this.cpu.registers.xmm4 = this.cpu.registers.xmm0 * this.cpu.registers.xmm3;
    // xmm0 = vel - xmm4
    this.cpu.registers.xmm0 = this.cpu.registers.xmm0 - this.cpu.registers.xmm4;

    if (this.cpu.registers.xmm0 < 0) {
      this.cpu.registers.xmm0 = 0;
    }
    return this.cpu.registers.xmm0;
  }

  /**
   * Kinetic Energy Simulation in Assembly.
   * Formula: 0.5 * mass * velocity^2
   */
  public executeKineticEnergy(mass: number, velocity: number): number {
    this.cpu.clear();
    this.cpu.registers.xmm0 = mass;
    this.cpu.registers.xmm1 = velocity;
    this.cpu.registers.xmm2 = 0.5;

    // xmm3 = velocity * velocity
    this.cpu.registers.xmm3 = this.cpu.registers.xmm1 * this.cpu.registers.xmm1;
    // xmm4 = mass * 0.5
    this.cpu.registers.xmm4 = this.cpu.registers.xmm0 * this.cpu.registers.xmm2;
    // xmm5 = xmm4 * xmm3
    this.cpu.registers.xmm5 = this.cpu.registers.xmm4 * this.cpu.registers.xmm3;

    return this.cpu.registers.xmm5;
  }

  public getCpuDiagnostics(): string {
    return `RAX: ${this.cpu.registers.rax.toString(16).toUpperCase()} | RSP: ${this.cpu.registers.rsp.toString(16).toUpperCase()} | XMM0: ${this.cpu.registers.xmm0.toFixed(4)}`;
  }
}

export const LowLevelAssemblyEngineComponent: React.FC = () => {
  return null;
};
