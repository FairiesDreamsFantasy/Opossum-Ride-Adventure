/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  EngineState, 
  INITIAL_ENGINE_STATE, 
  EngineConfiguration, 
  DEFAULT_ENGINE_CONFIG,
  EngineMetadata
} from "./General";

/**
 * Opossum Ride Adventure - Central Game Engine
 * Managed via scientific refinement to ensure stability and precise computer science principles.
 */
class OpossumRideAdventureEngine {
  private state: EngineState = { ...INITIAL_ENGINE_STATE };
  private config: EngineConfiguration = { ...DEFAULT_ENGINE_CONFIG };
  private listeners: Set<(state: EngineState) => void> = new Set();

  constructor() {
    console.log(`[ENGINE] Scientific Refinement Initiated: ${EngineMetadata.name} (v${EngineMetadata.version})`);
  }

  /**
   * Boots the engine and starts the scientific game loop.
   */
  public boot() {
    if (this.state.isBooted) return;
    
    this.state.isBooted = true;
    this.state.lastTickTimestamp = performance.now();
    this.requestFrame();
    
    console.log("[ENGINE] Boot sequence completed successfully.");
    this.notifyListeners();
  }

  private requestFrame() {
    if (!this.state.isBooted || this.state.isPaused) return;
    this.state.frameId = requestAnimationFrame((timestamp) => this.tick(timestamp));
  }

  /**
   * Scientific Tick Processor
   */
  private tick(timestamp: number) {
    const deltaTime = timestamp - this.state.lastTickTimestamp;
    this.state.lastTickTimestamp = timestamp;

    // Logic updates go here...
    
    this.notifyListeners();
    this.requestFrame();
  }

  public setPaused(paused: boolean) {
    this.state.isPaused = paused;
    if (!paused) {
      this.state.lastTickTimestamp = performance.now();
      this.requestFrame();
    }
    this.notifyListeners();
  }

  public getState(): EngineState {
    return { ...this.state };
  }

  public subscribe(listener: (state: EngineState) => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.state));
  }
}

export const GameEngine = new OpossumRideAdventureEngine();
export * from "./General";
