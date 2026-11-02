/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const BALTHAZAR_CAPABILITIES = {
  movement: [
    "walk",
    "trot",
    "canter",
    "gallop",
    "sprint",
    "charge_villainous"
  ],
  combat: [
    "explosive_bomb_toss",
    "red_gold_antler_ram",
    "heavy_hoof_stomp"
  ],
  criminalHistory: [
    "blowing_up_community_gardens",
    "bombing_arcades_and_public_libraries",
    "bombing_schools_shopping_malls_and_hospitals",
    "bank_robbery",
    "shoplifting_at_roxannes_workplace",
    "computer_game_movie_book_piracy",
    "illegal_weapons_smuggling",
    "prison_dynamite_escape"
  ]
};

export const BalthazarMovements = {
  calculatePhysics: (isSprinting: boolean, timer: number) => {
    let speed = isSprinting ? 2.5 : 1.2;
    const stride = Math.sin(timer * 6.0) * speed * 3.0;
    return { stride, speed };
  }
};
