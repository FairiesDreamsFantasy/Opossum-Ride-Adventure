/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface JosephMovementState {
  isWalking: boolean;
  isTrotting: boolean;
  isCantering: boolean;
  isGalloping: boolean;
  isSprinting: boolean;
  isJumping: boolean;
  isDivingDown: boolean;
  isSwimming: boolean;
  isBreathingFire: boolean;
  isSlippedOnTile: boolean;
  isFlattened: boolean;
}

export const JOSEPH_CAPABILITIES = {
  movement: [
    "walk",
    "trot",
    "canter",
    "gallop",
    "sprint",
    "jump",
    "dive_down_high_surfaces",
    "swim_large_water_bodies"
  ],
  combat: [
    "kick_any_direction",
    "head_strikes",
    "antler_strikes",
    "breathe_fire"
  ],
  resilience: [
    "floods",
    "powerful_rain_storms",
    "subzero_temperatures"
  ],
  weaknesses: [
    "hot_deserts",
    "rock_stone_collisions",
    "wall_collisions",
    "railway_trains",
    "wolf_dog_coyote_bear_attacks",
    "smashed_flat_by_jumping_opossum_when_unmounted",
    "slipping_on_tile_floors_due_to_sharp_hooves",
    "getting_stuck_in_mines_and_hazardous_terrain"
  ]
};

export const JosephMovements = {
  calculatePhysics: (state: JosephMovementState, timer: number, surfaceType?: string) => {
    // Check slippery tile floor condition
    if (surfaceType === "tile" || surfaceType === "smooth_tile") {
      state.isSlippedOnTile = true;
    } else {
      state.isSlippedOnTile = false;
    }

    let speedMultiplier = 1.0;
    if (state.isSprinting) speedMultiplier = 2.2;
    else if (state.isGalloping) speedMultiplier = 1.8;
    else if (state.isCantering) speedMultiplier = 1.4;
    else if (state.isTrotting) speedMultiplier = 1.1;
    else if (state.isWalking) speedMultiplier = 0.8;
    else if (state.isSwimming) speedMultiplier = 0.6;

    const strideBob = Math.sin(timer * 5.2) * (speedMultiplier * 2.5);
    return {
      strideBob,
      speedMultiplier,
      isSlipped: state.isSlippedOnTile
    };
  }
};
