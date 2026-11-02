/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Distributed_Compute General: Swarm Intelligence Algorithms
 */

export interface ComputeTask {
  id: string;
  payload: any;
  priority: number;
}

export class DistributedComputeMath {
  /**
   * Calculates the optimal task-fragmentation size for a given 
   * network bandwidth and node count.
   */
  public static calculateChunkSize(bandwidthMbps: number, nodeCount: number): number {
    return Math.floor((bandwidthMbps * 1024) / (nodeCount * 8));
  }

  /**
   * Models a Work-Stealing balance between master and worker nodes.
   */
  public static balanceLoad(taskCount: number, capacity: number[]): number[] {
    const totalCapacity = capacity.reduce((a, b) => a + b, 0);
    return capacity.map(c => Math.floor(taskCount * (c / totalCapacity)));
  }
}

export default DistributedComputeMath;
