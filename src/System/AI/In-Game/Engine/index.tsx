/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { InGameAIEngineGeneralCore, StateEstimate, Vector2D } from "./General";

export * from "./General";

export interface AIEngineDecision {
  recommendedLane: number; // -1, 0, or 1
  steerForceX: number;
  expectedState: "Cruising" | "Evasion" | "Collecting";
}

/**
 * Master In-Game AI Engine.
 * Combines trajectory potential force vectors and Markov decision models to optimize performance.
 */
export class AIInGameEngineManager {
  private transitionMatrix: number[][] = [
    [0.60, 0.15, 0.25], // Cruising -> [Cruising, Evasion, Collecting]
    [0.30, 0.60, 0.10], // Evasion  -> [Cruising, Evasion, Collecting]
    [0.40, 0.10, 0.50]  // Collecting -> [Cruising, Evasion, Collecting]
  ];

  /**
   * Evaluates the surrounding environment and outputs a deterministic lane change decision.
   * Uses Potential Field calculations and Markovian steady state transitions.
   */
  public evaluateScene(
    riderX: number,
    riderZ: number,
    obstacles: Array<{ x: number; z: number; width: number }>,
    treats: Array<{ x: number; z: number; isTick: boolean }>
  ): AIEngineDecision {
    const entities: Array<{ x: number; z: number; isRepulsive: boolean; intensity: number }> = [];

    // Map obstacles into repulsive force fields
    for (const obs of obstacles) {
      entities.push({
        x: obs.x,
        z: obs.z,
        isRepulsive: true,
        intensity: obs.width * 2.0
      });
    }

    // Map delicious treats into attractive fields, but avoid dangerous ticks
    for (const tr of treats) {
      entities.push({
        x: tr.x,
        z: tr.z,
        isRepulsive: tr.isTick, // if it's a tick, it repels!
        intensity: tr.isTick ? 3.0 : 4.0
      });
    }

    // Solve spatial potential fields
    const netForce = InGameAIEngineGeneralCore.calculatePotentialForce(riderX, riderZ, entities);

    // Solve state expectation based on steady-state probabilities
    const stateProbabilities = InGameAIEngineGeneralCore.solveSteadyStateTransitions(this.transitionMatrix);
    const maxProbIdx = stateProbabilities.indexOf(Math.max(...stateProbabilities));
    
    let expectedState: "Cruising" | "Evasion" | "Collecting" = "Cruising";
    if (maxProbIdx === 1) expectedState = "Evasion";
    if (maxProbIdx === 2) expectedState = "Collecting";

    // Convert potential force vector into standard lane recommendation (-1, 0, or 1)
    let recommendedLane = 0;
    const forceThreshold = 5.0;
    if (netForce.x > forceThreshold) {
      recommendedLane = 1;
    } else if (netForce.x < -forceThreshold) {
      recommendedLane = -1;
    } else {
      // Stay in current lane rounded position
      recommendedLane = Math.min(1, Math.max(-1, Math.round(riderX)));
    }

    return {
      recommendedLane,
      steerForceX: netForce.x,
      expectedState
    };
  }

  /**
   * Tracks a dynamic entity with a 1D Kalman filter to isolate true coordinates.
   */
  public updateEntityTracking(
    measuredZ: number,
    previousEstimate: StateEstimate
  ): StateEstimate {
    return InGameAIEngineGeneralCore.filterState(measuredZ, previousEstimate);
  }
}

export const AIInGameEngine = new AIInGameEngineManager();
