/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Rider Mounting Finite State Machine
 * C# (.NET/Mono Strong-Type Emulation Bridge)
 */

export type RiderMountState = "Dismounted" | "Approaching" | "Mounting" | "SeatedInSaddle" | "Dismounting" | "Airborne";

export interface IRiderMountFSM {
  riderId: string;
  currentState: RiderMountState;
  mountProgress: number; // 0.0 to 1.0
  saddleAnchor: { x: number; y: number; z: number };
}

export class RiderMountingFSM_CSharp {
  private stateMachine: Map<string, IRiderMountFSM> = new Map();

  public registerRider(riderId: string): void {
    if (!this.stateMachine.has(riderId)) {
      this.stateMachine.set(riderId, {
        riderId,
        currentState: "SeatedInSaddle",
        mountProgress: 1.0,
        saddleAnchor: { x: 0, y: 0.45, z: 0 }
      });
    }
  }

  public transitionState(riderId: string, newState: RiderMountState): boolean {
    const rider = this.stateMachine.get(riderId);
    if (!rider) return false;

    // Strict transition table validation to prevent corrupted animation states
    const validTransitions: Record<RiderMountState, RiderMountState[]> = {
      Dismounted: ["Approaching", "Airborne"],
      Approaching: ["Mounting", "Dismounted"],
      Mounting: ["SeatedInSaddle", "Dismounted"],
      SeatedInSaddle: ["Dismounting", "Airborne"],
      Dismounting: ["Dismounted", "SeatedInSaddle"],
      Airborne: ["Dismounted", "SeatedInSaddle"]
    };

    if (validTransitions[rider.currentState]?.includes(newState)) {
      rider.currentState = newState;
      return true;
    }
    return false;
  }

  public getState(riderId: string): IRiderMountFSM | null {
    return this.stateMachine.get(riderId) || null;
  }
}

export const RiderFSM_CSharpInstance = new RiderMountingFSM_CSharp();
export default RiderFSM_CSharpInstance;
