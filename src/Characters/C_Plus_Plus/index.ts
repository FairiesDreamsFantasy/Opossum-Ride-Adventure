/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Master Fauna Flocking & Herd Dynamics Engine
 * Native C++ High-Efficiency Craig Reynolds Boids Simulation Bridge
 */

export interface IBoidVector {
  x: number;
  y: number;
  z: number;
}

export interface IFaunaKinematicEntity {
  id: string;
  species: "Cattle" | "Chickens" | "Deer" | "Ducks" | "Frogs" | "Geese" | "Goats" | "Owls" | "Pigs" | "Sheep";
  position: IBoidVector;
  velocity: IBoidVector;
  massKg: number;
}

export const FaunaBoidsKernelCPP = {
  standard: "Craig Reynolds Autonomous Agent Flocking Model (SIMD Optimised)",

  /**
   * Computes Separation vector: steer to avoid crowding local flockmates.
   */
  computeSeparation: (
    entity: IFaunaKinematicEntity,
    neighbors: IFaunaKinematicEntity[],
    desiredDistance: number = 3.5
  ): IBoidVector => {
    let steerX = 0;
    let steerY = 0;
    let steerZ = 0;
    let count = 0;

    for (let i = 0; i < neighbors.length; i++) {
      const other = neighbors[i];
      if (other.id === entity.id) continue;

      const dx = entity.position.x - other.position.x;
      const dy = entity.position.y - other.position.y;
      const dz = entity.position.z - other.position.z;
      const dist = Math.hypot(dx, dy, dz);

      if (dist > 0 && dist < desiredDistance) {
        // Normalized difference vector inversely proportional to distance
        steerX += dx / dist;
        steerY += dy / dist;
        steerZ += dz / dist;
        count++;
      }
    }

    if (count > 0) {
      steerX /= count;
      steerY /= count;
      steerZ /= count;
    }

    return {
      x: Number(steerX.toFixed(4)),
      y: Number(steerY.toFixed(4)),
      z: Number(steerZ.toFixed(4))
    };
  },

  /**
   * Computes Alignment vector: steer towards the average heading of local flockmates.
   */
  computeAlignment: (
    entity: IFaunaKinematicEntity,
    neighbors: IFaunaKinematicEntity[]
  ): IBoidVector => {
    let avgVx = 0;
    let avgVy = 0;
    let avgVz = 0;
    let count = 0;

    for (let i = 0; i < neighbors.length; i++) {
      const other = neighbors[i];
      if (other.id === entity.id) continue;
      avgVx += other.velocity.x;
      avgVy += other.velocity.y;
      avgVz += other.velocity.z;
      count++;
    }

    if (count > 0) {
      avgVx /= count;
      avgVy /= count;
      avgVz /= count;
    }

    return {
      x: Number(avgVx.toFixed(4)),
      y: Number(avgVy.toFixed(4)),
      z: Number(avgVz.toFixed(4))
    };
  },

  /**
   * Computes Cohesion vector: steer to move toward the average center of mass of local flockmates.
   */
  computeCohesion: (
    entity: IFaunaKinematicEntity,
    neighbors: IFaunaKinematicEntity[]
  ): IBoidVector => {
    let centerX = 0;
    let centerY = 0;
    let centerZ = 0;
    let count = 0;

    for (let i = 0; i < neighbors.length; i++) {
      const other = neighbors[i];
      if (other.id === entity.id) continue;
      centerX += other.position.x;
      centerY += other.position.y;
      centerZ += other.position.z;
      count++;
    }

    if (count > 0) {
      centerX /= count;
      centerY /= count;
      centerZ /= count;
      return {
        x: Number((centerX - entity.position.x).toFixed(4)),
        y: Number((centerY - entity.position.y).toFixed(4)),
        z: Number((centerZ - entity.position.z).toFixed(4))
      };
    }

    return { x: 0, y: 0, z: 0 };
  }
};

export default FaunaBoidsKernelCPP;
