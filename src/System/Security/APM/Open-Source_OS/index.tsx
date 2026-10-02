/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LinuxPlatformProfile } from "./Linux";
import { FreeDOSPlatformProfile } from "./Free-DOS";

export * from "./Linux";
export * from "./Free-DOS";

export const OpenSourceOSRegistry = {
  Linux: LinuxPlatformProfile,
  FreeDOS: FreeDOSPlatformProfile
};
