/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BootPhase, BootProgress, INITIAL_BOOT_PROGRESS, BOOT_CONSTANTS } from "./General";
import { ValidationMatrix } from "./Validation_Matrix";
import { SubsystemOrchestrator } from "./Subsystem_Orchestrator";
import { SequenceResolver } from "./Sequence_Resolver";
import { GameEngine } from "../Engine";

/**
 * Opossum Ride Adventure - Central Boot Manager
 * Coordinates the ultra-scientific boot sequence with mathematical precision.
 */
class GameBootManager {
  private progress: BootProgress = { ...INITIAL_BOOT_PROGRESS };
  private listeners: Set<(progress: BootProgress) => void> = new Set();

  /**
   * Initiates the ultra-scientific boot sequence.
   */
  public async initiate(): Promise<boolean> {
    // Reset to stasis on each initiate to support repeated game starts
    this.progress = { ...INITIAL_BOOT_PROGRESS };

    console.log("[BOOT] Initiating Ultra-Scientific Game Boot sequence...");
    
    try {
      // 1. Validation Phase
      this.updateProgress(BootPhase.VALIDATION, 0.1, "Validation Matrix Audit");
      const audit = await ValidationMatrix.conductSystemAudit();
      if (!audit.isCompliant) throw new Error("System non-compliant with scientific standards.");

      // 2. Orchestration Phase
      this.updateProgress(BootPhase.ORCHESTRATION, 0.4, "Subsystem Orchestration");
      await SubsystemOrchestrator.executeSequencedLoad();

      // 3. Resolving Phase
      this.updateProgress(BootPhase.RESOLVING, 0.8, "Sequence Handoff Resolution");
      const handoff = SequenceResolver.resolveFinalHandoff();

      // 4. Active Phase
      this.updateProgress(BootPhase.ACTIVE, 1.0, "Engine Stabilized");
      GameEngine.boot();

      console.log(`[BOOT] Game stabilized in ${performance.now() - handoff.engineBootTimestamp}ms.`);
      return true;
    } catch (e) {
      console.error("[BOOT] Scientific Initialization Failure:", e);
      this.updateProgress(BootPhase.FAILURE, 0.0, "Critical Failure");
      return false;
    }
  }

  private updateProgress(phase: BootPhase, percent: number, module: string) {
    this.progress = {
      phase,
      completionPercentage: percent,
      activeModule: module,
      timestamp: Date.now()
    };
    this.notifyListeners();
  }

  public getProgress(): BootProgress {
    return { ...this.progress };
  }

  public subscribe(listener: (progress: BootProgress) => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners() {
    this.listeners.forEach(l => l(this.progress));
  }
}

export const GameBoot = new GameBootManager();
export * from "./General";
export * from "./Validation_Matrix";
export * from "./Subsystem_Orchestrator";
export * from "./Sequence_Resolver";
