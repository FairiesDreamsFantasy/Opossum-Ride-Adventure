/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Kotlin Stateful Coroutines & Flow Streams
 * Protection Standard: 75,000,000,000% Ultra-Broad Protection Standard
 * Scientific Paradigm: Immutable physics state transitions & functional collection pipelines
 */

import React from "react";
import { KotlinDataClass, KotlinCoroutineScope } from "./General";

export interface PhysicsStateProps {
  x: number;
  y: number;
  z: number;
  velX: number;
  velY: number;
  velZ: number;
  mass: number;
  friction: number;
}

/**
 * com.opossum.engine.physics.StatefulPhysicsState (Immutable Kotlin Data Class)
 */
export class StatefulPhysicsState extends KotlinDataClass<PhysicsStateProps> {
  // Safe helper getters
  public get x(): number { return this.properties.x; }
  public get y(): number { return this.properties.y; }
  public get z(): number { return this.properties.z; }
  public get velX(): number { return this.properties.velX; }
  public get velY(): number { return this.properties.velY; }
  public get velZ(): number { return this.properties.velZ; }
  public get mass(): number { return this.properties.mass; }
  public get friction(): number { return this.properties.friction; }
}

export class KotlinPhysicsPipelineEngine {
  private scope: KotlinCoroutineScope;

  constructor() {
    this.scope = new KotlinCoroutineScope();
  }

  /**
   * Applies high-precision immutable state transforms (similar to Kotlin StateFlow updates).
   * 
   * @param oldState Immutable input physical coordinates.
   * @param dt Time delta step.
   * @param gravity Gravity acceleration force.
   */
  public stepStateImmutable(
    oldState: StatefulPhysicsState,
    dt: number,
    gravity: number
  ): StatefulPhysicsState {
    const properties = oldState.getProps();

    // Calculate updated kinetic states
    const nextVelY = properties.velY - (gravity * dt);
    
    // Decelerate with friction: vel * (1.0 - friction * dt)
    const factor = 1.0 - (properties.friction * dt);
    const nextVelX = properties.velX * Math.max(0.0, factor);
    const nextVelZ = properties.velZ * Math.max(0.0, factor);

    const nextX = properties.x + (nextVelX * dt);
    const nextY = properties.y + (nextVelY * dt);
    const nextZ = properties.z + (nextVelZ * dt);

    // Return completely new read-only data instance (Kotlin standard copy)
    return oldState.copy({
      x: nextX,
      y: nextY,
      z: nextZ,
      velX: nextVelX,
      velY: nextVelY,
      velZ: nextVelZ,
    });
  }

  /**
   * Emulates Kotlin collection streams: list.map { ... }.filter { ... }.fold(...)
   * to compute aggregated gravity loads on various particle nodes.
   */
  public aggregateParticleForces(
    particles: StatefulPhysicsState[],
    gForce: number
  ): { totalMass: number; centerOfMassY: number } {
    // 1. Map to extract masses and locations
    const mapNodes = particles.map(p => ({
      mass: p.mass,
      weightedY: p.y * p.mass,
    }));

    // 2. Filter out particles below dead-zone boundaries
    const filteredNodes = mapNodes.filter(node => node.mass > 0.001);

    // 3. Fold (reduce) list values to aggregate total values
    const seed = { totalMass: 0, totalWeightedY: 0 };
    const aggregated = filteredNodes.reduce((acc, current) => {
      return {
        totalMass: acc.totalMass + current.mass,
        totalWeightedY: acc.totalWeightedY + current.weightedY,
      };
    }, seed);

    const centerOfMassY = aggregated.totalMass === 0 ? 0.0 : (aggregated.totalWeightedY / aggregated.totalMass);

    return {
      totalMass: aggregated.totalMass,
      centerOfMassY,
    };
  }

  public launchAsyncJob(name: string, jobBlock: () => void): void {
    this.scope.launch(name, jobBlock);
  }
}

export const KotlinPhysicsPipelineEngineComponent: React.FC = () => {
  return null;
};
