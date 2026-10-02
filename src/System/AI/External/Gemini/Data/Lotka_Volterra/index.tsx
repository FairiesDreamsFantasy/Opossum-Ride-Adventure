/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Biological Predator-Prey (Moose-Monkey) Lotka-Volterra differential equation simulator.
 * dx/dt = alpha * x - beta * x * y
 * dy/dt = delta * x * y - gamma * y
 */
export const DataLotkaVolterra = {
  /**
   * Computes the population delta for the next tick frame.
   */
  simulateNextStep(
    preyPopulation: number,
    predatorPopulation: number,
    alpha: number = 0.1,  // prey growth rate
    beta: number = 0.02,  // predation rate
    delta: number = 0.01, // predator reproduction efficiency
    gamma: number = 0.1   // predator mortality rate
  ): { prey: number; predator: number } {
    const preyDelta = alpha * preyPopulation - beta * preyPopulation * predatorPopulation;
    const predatorDelta = delta * preyPopulation * predatorPopulation - gamma * predatorPopulation;

    return {
      prey: Math.max(0, preyPopulation + preyDelta),
      predator: Math.max(0, predatorPopulation + predatorDelta)
    };
  }
};
