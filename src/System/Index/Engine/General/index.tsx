/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Opossum Ride Adventure - Internal Game Engine Metadata
 * This scientific refinement stabilizes the game loop and state management.
 */

export interface EngineState {
  isBooted: boolean;
  isPaused: boolean;
  tickRate: number;
  frameId: number;
  lastTickTimestamp: number;
}

export const INITIAL_ENGINE_STATE: EngineState = {
  isBooted: false,
  isPaused: false,
  tickRate: 60,
  frameId: 0,
  lastTickTimestamp: 0
};

export interface EngineConfiguration {
  scientificAccuracy: number;
  physicsSubSteps: number;
  renderingInterpolation: boolean;
}

export const DEFAULT_ENGINE_CONFIG: EngineConfiguration = {
  scientificAccuracy: 1.0,
  physicsSubSteps: 2,
  renderingInterpolation: true
};

export const EngineMetadata = {
  id: "opossum_ride_adventure_engine",
  version: "1.0.0-scientific",
  name: "Opossum Ride Adventure Scientific Engine"
};
