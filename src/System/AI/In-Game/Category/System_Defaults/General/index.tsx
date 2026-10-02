/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { KeyboardLayoutType, GameViewMode } from "../../../../../../types";

export interface SystemDefaultsConfig {
  keyboardLayout: KeyboardLayoutType;
  viewMode: GameViewMode;
  chatterNotificationsEnabled: boolean; // Default position: false (OFF)
  announceReverb: boolean;
  announceDoors: boolean;
  announceSteering: boolean;
  announceMooseSmash: boolean;
  musicEnabled: boolean;
  defaultSpeedMph: number;
  minRefractoryPeriodSeconds: number;
}

export const SYSTEM_DEFAULTS_CONFIG: SystemDefaultsConfig = {
  keyboardLayout: KeyboardLayoutType.CEDELLA,
  viewMode: GameViewMode.RIDER,
  chatterNotificationsEnabled: false, // Default is strictly OFF
  announceReverb: false,
  announceDoors: false,
  announceSteering: false,
  announceMooseSmash: true,
  musicEnabled: false,
  defaultSpeedMph: 0,
  minRefractoryPeriodSeconds: 12.0
};

export const SystemDefaultsGeneral = {
  getDefaults: (): SystemDefaultsConfig => ({ ...SYSTEM_DEFAULTS_CONFIG }),
  isChatterNotificationDefaultOn: (): boolean => false
};
