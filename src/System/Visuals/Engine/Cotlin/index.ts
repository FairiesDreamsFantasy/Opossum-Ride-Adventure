/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Kotlin Data Class & Null-Safe Pipeline Bridge
 */

export interface KotlinDataModel<T> {
  copy(mutations: Partial<T>): KotlinDataModel<T>;
  toImmutable(): Readonly<T>;
}

export class KotlinSpatialState implements KotlinDataModel<{ x: number; y: number; z: number }> {
  constructor(public readonly x: number = 0, public readonly y: number = 0, public readonly z: number = 0) {}

  public copy(mutations: Partial<{ x: number; y: number; z: number }>): KotlinSpatialState {
    return new KotlinSpatialState(
      mutations.x !== undefined ? mutations.x : this.x,
      mutations.y !== undefined ? mutations.y : this.y,
      mutations.z !== undefined ? mutations.z : this.z
    );
  }

  public toImmutable(): Readonly<{ x: number; y: number; z: number }> {
    return Object.freeze({ x: this.x, y: this.y, z: this.z });
  }
}

export default KotlinSpatialState;
