/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CharacterControllerState {
  activeCharacterId: string;
  isMoving: boolean;
  velocity: { x: number; y: number; z: number };
  headingAngle: number;
  riderAttached: boolean;
  chatterActive: boolean;
}

/**
 * General character subsystem coordinator and state utilities
 */
export const GeneralCharacterSubsystem = {
  version: "1.0.0",
  subsystemId: "system_characters_general",
  defaultState: (): CharacterControllerState => ({
    activeCharacterId: "melissa_opossum",
    isMoving: false,
    velocity: { x: 0, y: 0, z: 0 },
    headingAngle: 0,
    riderAttached: true,
    chatterActive: false,
  }),
  calculateRiderOffset: (shoulderHeightInches: number): number => {
    // Converts shoulder height in inches to standard vertical coordinate offset (meters)
    return (shoulderHeightInches * 0.0254) * 0.85;
  }
};
