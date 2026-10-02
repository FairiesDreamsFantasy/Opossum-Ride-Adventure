/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Procedural Sliding Glass Door SFX Module - Silver Tea Room Doors
 */

import { playSlidingDoorOpen } from "./Open";
import { playSlidingDoorClose } from "./Close";

export {
  playSlidingDoorOpen,
  playSlidingDoorClose
};

export const SilverTeaRoomSlidingDoorSound = {
  playOpen: playSlidingDoorOpen,
  playClose: playSlidingDoorClose
};

export default SilverTeaRoomSlidingDoorSound;
