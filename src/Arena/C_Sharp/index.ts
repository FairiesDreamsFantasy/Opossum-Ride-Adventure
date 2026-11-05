/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Arena Transition State Machine
 * C# (.NET/Mono Strong-Type Emulation Bridge)
 */

export type ArenaLifecycleState = "Unloaded" | "LoadingGeometry" | "AcousticWarming" | "Active" | "Unloading";

export interface IArenaTransitionDescriptor {
  currentArenaId: string;
  targetArenaId: string;
  lifecycleState: ArenaLifecycleState;
  reverbWetnessTarget: number;
}

export class ArenaTransitionStateMachine_CSharp {
  private activeDescriptor: IArenaTransitionDescriptor = {
    currentArenaId: "garden",
    targetArenaId: "garden",
    lifecycleState: "Active",
    reverbWetnessTarget: 0.3675
  };

  public beginTransition(targetArenaId: string, wetness: number = 0.3675): boolean {
    if (this.activeDescriptor.lifecycleState !== "Active" && this.activeDescriptor.lifecycleState !== "Unloaded") {
      return false; // Ongoing transition in progress
    }

    this.activeDescriptor.targetArenaId = targetArenaId;
    this.activeDescriptor.lifecycleState = "LoadingGeometry";
    this.activeDescriptor.reverbWetnessTarget = wetness;
    return true;
  }

  public completeGeometryLoad(): void {
    if (this.activeDescriptor.lifecycleState === "LoadingGeometry") {
      this.activeDescriptor.lifecycleState = "AcousticWarming";
    }
  }

  public activateTargetArena(): void {
    this.activeDescriptor.currentArenaId = this.activeDescriptor.targetArenaId;
    this.activeDescriptor.lifecycleState = "Active";
  }

  public getState(): IArenaTransitionDescriptor {
    return { ...this.activeDescriptor };
  }
}

export const ArenaTransitionFSM_CSharpInstance = new ArenaTransitionStateMachine_CSharp();
export default ArenaTransitionFSM_CSharpInstance;
