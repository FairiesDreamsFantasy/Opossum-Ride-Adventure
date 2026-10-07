/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { APMRegistryGeneral } from "./General";
import { APM } from "../../../Security/APM";

export * from "./General";

export const APMRegistry = {
  General: APMRegistryGeneral,
  Controller: APM,
  getActiveProfile: () => APM.getActiveProfile(),
  getAllProfiles: () => APM.getAllProfiles()
};
