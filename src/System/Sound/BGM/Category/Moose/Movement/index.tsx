/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { playTrampleLoop } from "./Trample";
import { playWalkLoop } from "./Walk";
import { playChargeLoop } from "./Charge";
import { playTrotLoop } from "./Trot";
import { playCanterLoop } from "./Canter";
import { playGallopLoop } from "./Gallop";
import { playSprintLoop } from "./Sprint";
import { playHeadStrike } from "./Head_Strikes";
import { playStomp } from "./Stomp";

export { playTrampleLoop } from "./Trample";
export { playWalkLoop } from "./Walk";
export { playChargeLoop } from "./Charge";
export { playTrotLoop } from "./Trot";
export { playCanterLoop } from "./Canter";
export { playGallopLoop } from "./Gallop";
export { playSprintLoop } from "./Sprint";
export { playHeadStrike } from "./Head_Strikes";
export { playStomp } from "./Stomp";

export const playMooseMovementSound = (
  gait: "trample" | "walk" | "charge" | "trot" | "canter" | "gallop" | "sprint" | "head_strike" | "stomp",
  context: AudioContext,
  destination: AudioNode,
  startTime: number
) => {
  switch (gait) {
    case "trample":
      return playTrampleLoop(context, destination, startTime);
    case "walk":
      return playWalkLoop(context, destination, startTime);
    case "charge":
      return playChargeLoop(context, destination, startTime);
    case "trot":
      return playTrotLoop(context, destination, startTime);
    case "canter":
      return playCanterLoop(context, destination, startTime);
    case "gallop":
      return playGallopLoop(context, destination, startTime);
    case "sprint":
      return playSprintLoop(context, destination, startTime);
    case "head_strike":
      return playHeadStrike(context, destination, startTime);
    case "stomp":
      return playStomp(context, destination, startTime);
    default:
      return playWalkLoop(context, destination, startTime);
  }
};
