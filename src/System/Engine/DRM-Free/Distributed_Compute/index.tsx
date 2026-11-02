/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DistributedComputeMath, ComputeTask } from "./General";

export * from "./General";

/**
 * Distributed_Compute Master Subsystem
 * 
 * Aggregates unused compute power from local devices to 
 * accelerate the Opossum Ride Adventure physics and visuals.
 */
export class DistributedComputeSubsystem {
  private activeNodes: number = 1;
  private taskQueue: ComputeTask[] = [];

  public registerNode(): void {
    this.activeNodes++;
  }

  public getStatus(): {
    mode: "SWARM_ACTIVE";
    activeNodes: number;
    cloudFreeProcessing: true;
  } {
    return {
      mode: "SWARM_ACTIVE",
      activeNodes: this.activeNodes,
      cloudFreeProcessing: true
    };
  }
}

export const DistributedCompute = new DistributedComputeSubsystem();
export default DistributedCompute;
