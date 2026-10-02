/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MONKEY_ANATOMICAL_PARTS, MonkeyDescription } from "../../Description";

export const MonkeyGeneralDescription = {
  ...MonkeyDescription,
  generalAttributes: {
    averageHeightMeters: 1.15,
    averageWeightKg: 28.5,
    primaryLocomotion: "Brachiation & Moose Quadruped Mount",
    anatomicalParts: MONKEY_ANATOMICAL_PARTS
  }
};
