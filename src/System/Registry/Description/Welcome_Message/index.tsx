/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Welcome Message Registry Data Contracts
 * Eliminates hardcoded welcome speech strings and centralizes accessibility instructions.
 */
export const WELCOME_MESSAGE_REGISTRY = {
  id: "welcome_message_registry",
  gameTitle: "Opossum Ride Adventure!",
  studioCredits: "A computer game from Fairies Dreams & Fantasy.",
  speechStopInstruction: "Press the 'Ctrl' key to stop speech at anytime.",
  
  foyerDefaultAesthetics: {
    dimensions: 2000,
    ceilingHeight: 30,
    descriptionClause: "with orange and purple ceramic tile flooring and"
  },

  controls: {
    forward: "Use the 'Up' key to go forward.",
    turnLeft: "Use the 'Left' key to turn left;",
    turnRight: "'Right' key to turn right.",
    reverse: "Use the 'Down' key to decelerate/reverse.",
    jump: "The space bar is for jumping.",
    keyboardLayoutPreamble: "Depending on which keyboard layout what you are using...",
    ardenDenisLayout: "'A-S-D-W' keys are used as arrow keys for the 'Arden Denis' keyboard layout.",
    cedellaLayout: "The 'Cedella' keyboard layout as a default always use arrow keys for movement.",
    chatter: "To hear an opossum's chatter; press the 'S' key for Cedella, or 'L' for Arden Denis keyboard layouts.",
    opossumInfo: "The 'R' key is used for getting information about an opossum what you are riding.",
    riderPovToggle: "The 'T' key is used for toggling between rider and POV modes (if you still have vision, or if any of your friends are watching you play a game.",
    hudInfo: "To get HUD information; press the '3' key.",
    measurementToggle: "To change measurement system; press the '4' key.",
    menuTools: "These useful tools above your game view are used for other functions.",
    pauseResume: "If you like to take a break from playing this game, and come back later, press Shift-7 via your main keys to pause/resume the game."
  },

  closingBlessing: "Fulljoy your fun, and happy riding!"
};

export type WelcomeMessageRegistryType = typeof WELCOME_MESSAGE_REGISTRY;
export default WELCOME_MESSAGE_REGISTRY;
