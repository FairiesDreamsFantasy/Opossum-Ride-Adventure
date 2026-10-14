/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const MonkeyBehaviorsRegistry = {
  states: [
    "idle_perched",
    "curious_approach",
    "chattering_tease",
    "acrobatic_swing",
    "evasive_leap",
    "tree_climb"
  ],
  defaultConfig: {
    curiosityRadius: 320,
    threatRadius: 140,
    teaseDurationMs: 2400,
    acrobaticsCadenceSec: 1.8,
    agilityScale: 1.65
  },
  modelType: "Deterministic_Markov_State_Machine"
};
