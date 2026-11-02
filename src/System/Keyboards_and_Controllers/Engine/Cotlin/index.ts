/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Kotlin Input Controller Snapshot State Model
 */

export class KotlinInputStateSnapshot {
  constructor(
    public readonly timestamp: number,
    public readonly buttonsPressed: string[] = [],
    public readonly leftStick: { x: number; y: number } = { x: 0, y: 0 },
    public readonly rightStick: { x: number; y: number } = { x: 0, y: 0 }
  ) {}

  public copy(mutations: Partial<KotlinInputStateSnapshot>): KotlinInputStateSnapshot {
    return new KotlinInputStateSnapshot(
      mutations.timestamp ?? this.timestamp,
      mutations.buttonsPressed ?? this.buttonsPressed,
      mutations.leftStick ?? this.leftStick,
      mutations.rightStick ?? this.rightStick
    );
  }
}

export default KotlinInputStateSnapshot;
