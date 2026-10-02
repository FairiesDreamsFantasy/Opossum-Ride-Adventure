/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Ultra-scientific In-Game AI Engine General Core.
 * Employs rigorous mathematics, potential field theory, state space filtering, and Markovian prediction model.
 */

export interface Vector2D {
  x: number;
  y: number;
}

export interface StateEstimate {
  position: number;
  velocity: number;
  covariance: number;
}

export class InGameAIEngineGeneralCore {
  /**
   * 1. 1D Kalman Filter State Estimator
   * Estimates the true, noise-filtered position of dynamic obstacles or running targets
   * in 1D space (e.g., along the z-axis/distance line).
   */
  public static filterState(
    measurement: number,
    previousEstimate: StateEstimate,
    processNoise: number = 0.05,
    measurementNoise: number = 0.2
  ): StateEstimate {
    // Prediction step
    const predictedPos = previousEstimate.position + previousEstimate.velocity;
    const predictedCov = previousEstimate.covariance + processNoise;

    // Innovation step (Kalman gain calculation)
    const kalmanGain = predictedCov / (predictedCov + measurementNoise);

    // Update step
    const updatedPos = predictedPos + kalmanGain * (measurement - predictedPos);
    const updatedCov = (1 - kalmanGain) * predictedCov;
    const updatedVelocity = updatedPos - previousEstimate.position;

    return {
      position: updatedPos,
      velocity: updatedVelocity,
      covariance: updatedCov
    };
  }

  /**
   * 2. Artificial Potential Field Trajectory Planner
   * Calculates the optimal force vectors acting on the rider.
   * - Obstacles exert a repulsive force (positive potential).
   * - Treats/Ticks exert an attractive force (negative potential).
   * - Center of lanes acts as minor attractive wells to maintain stable driving.
   */
  public static calculatePotentialForce(
    riderX: number,
    riderZ: number,
    entities: Array<{ x: number; z: number; isRepulsive: boolean; intensity: number }>
  ): Vector2D {
    let forceX = 0;
    let forceZ = 0;

    // Repulsion and Attraction Field constants
    const kRepulsive = 100.0;
    const kAttractive = 50.0;
    const influenceRadius = 50.0; // range of influence in meters/feet

    for (const ent of entities) {
      const dx = riderX - ent.x;
      const dz = riderZ - ent.z;
      const distance = Math.sqrt(dx * dx + dz * dz) || 0.001;

      if (ent.isRepulsive) {
        if (distance < influenceRadius) {
          // Repulsion force increases as distance decreases
          const factor = (1.0 / distance - 1.0 / influenceRadius) * ent.intensity;
          forceX += kRepulsive * factor * (dx / distance);
          forceZ += kRepulsive * factor * (dz / distance);
        }
      } else {
        // Attraction force pulls toward the item
        const factor = ent.intensity / (distance * distance + 1.0);
        forceX -= kAttractive * factor * (dx / distance);
        forceZ -= kAttractive * factor * (dz / distance);
      }
    }

    // Lane keeping attractive force (mild spring-like force toward the closest standard lane -1, 0, or 1)
    const targetLaneX = Math.round(riderX); // -1, 0, or 1
    const laneDx = riderX - targetLaneX;
    forceX -= 15.0 * laneDx; // spring force coefficient 15.0

    return { x: forceX, y: forceZ };
  }

  /**
   * 3. Discrete-Time Markov Chain State Transition Solver
   * Solves the steady-state probabilities of the AI decision-making cycle.
   * State space: [0: Cruising, 1: Evasion, 2: Collecting]
   */
  public static solveSteadyStateTransitions(
    transitionMatrix: number[][]
  ): number[] {
    const size = transitionMatrix.length;
    if (size !== 3) return [1, 0, 0]; // Default safe state fallback

    // Perform small iterations to find state convergence (Power Iteration method)
    let state = [0.33, 0.33, 0.34];
    const iterations = 50;

    for (let iter = 0; iter < iterations; iter++) {
      const nextState = [0, 0, 0];
      for (let j = 0; j < size; j++) {
        for (let i = 0; i < size; i++) {
          nextState[j] += state[i] * transitionMatrix[i][j];
        }
      }
      
      // Normalize to prevent floating point drifts
      const sum = nextState.reduce((a, b) => a + b, 0) || 1;
      state = nextState.map((val) => val / sum);
    }

    return state;
  }
}
