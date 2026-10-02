/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Physical states of a moving entity.
 */
export interface KinematicState {
  position: number;
  velocity: number;
  acceleration: number;
  massKg: number;
}

/**
 * Scientific Physics Simulation Engine.
 */
export const GeminiEnginePhysics = {
  /**
   * Applies aerodynamic air drag forces based on the fluid drag equation:
   * F_drag = 0.5 * C_d * rho * v^2 * A
   * where:
   * C_d = Drag coefficient (approx 0.4 for an opossum shape)
   * rho = Air density (approx 1.2 kg/m^3)
   * A = Frontal area (approx 0.05 m^2)
   */
  calculateAirDrag(velocityMS: number, airDensityKgM3: number, frontalAreaM2: number = 0.05): number {
    const dragCoefficient = 0.4; // Opossum aerodynamic factor
    const sign = Math.sign(velocityMS);
    const speedSquared = velocityMS * velocityMS;
    
    // Drag force: F = 0.5 * Cd * rho * v^2 * A
    const dragForceNewtons = 0.5 * dragCoefficient * airDensityKgM3 * speedSquared * frontalAreaM2;
    return sign * dragForceNewtons;
  },

  /**
   * Updates mechanical kinematic state with forces, friction, and integration.
   */
  updateKinematics(
    state: KinematicState,
    appliedForceNewtons: number,
    airDensityKgM3: number,
    frictionCoefficient: number,
    deltaSeconds: number
  ): KinematicState {
    // Air resistance force
    const dragForce = this.calculateAirDrag(state.velocity, airDensityKgM3);
    
    // Friction force: opposing movement
    const frictionForce = state.velocity !== 0 
      ? -Math.sign(state.velocity) * frictionCoefficient * state.massKg * 9.80665 
      : 0;

    // Total Force
    const netForce = appliedForceNewtons - dragForce + frictionForce;
    
    // Acceleration: a = F / m
    const acceleration = netForce / state.massKg;

    // Integration (Euler Method)
    const velocity = state.velocity + acceleration * deltaSeconds;
    const position = state.position + velocity * deltaSeconds;

    return {
      position,
      velocity,
      acceleration,
      massKg: state.massKg
    };
  },

  /**
   * Computes the height of a leap parabola based on gravity and progress.
   * height = initialVelocity * sin(theta) * t - 0.5 * g * t^2
   */
  calculateJumpHeight(progress: number, maxProgress: number = Math.PI, scaleHeight: number = 3.0): number {
    // Maps progress [0, pi] to sine wave peak
    const angle = (progress / maxProgress) * Math.PI;
    return Math.sin(angle) * scaleHeight;
  },

  /**
   * Computes elastic restitution response after collision.
   * v_final = -e * v_initial
   */
  resolveElasticCollision(incomingVelocity: number, coefficientOfRestitution: number = 0.35): number {
    return -coefficientOfRestitution * incomingVelocity;
  }
};
