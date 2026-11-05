/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Fauna Behavioral State Machine
 * C# (.NET/Mono Strong-Type Emulation Bridge)
 */

export type FaunaBehaviorState = "Idle" | "Grazing" | "Alert" | "Fleeing" | "Trotting";

export interface IFaunaStateDescriptor {
  entityId: string;
  currentState: FaunaBehaviorState;
  reactionSpeedMs: number;
}

export class FaunaBehaviorFSM_CSharp {
  private static states: Map<string, IFaunaStateDescriptor> = new Map();

  public static initializeEntity(entityId: string): void {
    if (!this.states.has(entityId)) {
      this.states.set(entityId, {
        entityId,
        currentState: "Grazing",
        reactionSpeedMs: 250
      });
    }
  }

  public static triggerAlert(entityId: string, alertDistanceMeters: number): FaunaBehaviorState {
    const entity = this.states.get(entityId);
    if (!entity) return "Idle";

    if (alertDistanceMeters < 8.0) {
      entity.currentState = "Fleeing";
    } else if (alertDistanceMeters < 20.0) {
      entity.currentState = "Alert";
    } else {
      entity.currentState = "Grazing";
    }
    return entity.currentState;
  }

  public static getState(entityId: string): FaunaBehaviorState {
    return this.states.get(entityId)?.currentState || "Idle";
  }
}

export default FaunaBehaviorFSM_CSharp;
