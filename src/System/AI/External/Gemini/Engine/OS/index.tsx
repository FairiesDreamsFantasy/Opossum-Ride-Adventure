/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LinuxBridge } from "./Linux";
import { FreeDOSBridge } from "./FreeDOS";
import { AndroidBridge } from "./Android";
import { WindowsBridge } from "./Windows";
import { MacintoshBridge } from "./Macintosh";
import { iOSBridge } from "./iOS";
import { OmegaBridge } from "./Omega";

export const OS_Registry = {
  Linux: LinuxBridge,
  FreeDOS: FreeDOSBridge,
  Android: AndroidBridge,
  Windows: WindowsBridge,
  Macintosh: MacintoshBridge,
  iOS: iOSBridge,
  Omega: OmegaBridge
};

export default OS_Registry;
