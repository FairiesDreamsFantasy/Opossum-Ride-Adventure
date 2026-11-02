/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { drawMonkey3D } from "./MonkeyDraw";
import { MONKEY_ANATOMICAL_PARTS } from "../Description";

export interface MonkeyAnimationKeyframe {
  partId: string;
  rotationOffset: number;
  swayOffset: number;
  armAngleOffset: number;
}

export const MONKEY_ANIMATED_PARTS = {
  head: {
    part: MONKEY_ANATOMICAL_PARTS.head,
    animate: (timer: number, sway: number) => ({
      rotation: Math.sin(timer * 2) * 0.05,
      sway: sway * 0.4
    })
  },
  torso: {
    part: MONKEY_ANATOMICAL_PARTS.torso,
    animate: (timer: number, sway: number) => ({
      rotation: Math.cos(timer * 1.5) * 0.03,
      sway
    })
  },
  arms: {
    part: MONKEY_ANATOMICAL_PARTS.arms,
    animate: (armSway: number) => ({
      leftArmAngle: (Math.PI / 4) + (armSway * Math.PI / 180),
      rightArmAngle: (Math.PI / 4) - (armSway * Math.PI / 180)
    })
  },
  tail: {
    part: MONKEY_ANATOMICAL_PARTS.tail,
    animate: (timer: number) => ({
      curlFactor: Math.sin(timer * 3) * 0.15
    })
  }
};

export { drawMonkey3D };
