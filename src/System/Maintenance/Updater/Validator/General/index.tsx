/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface UpdaterValidationReport {
  isValid: boolean;
  semverMatch: boolean;
  structureIntact: boolean;
  reason?: string;
}

export const ValidatorGeneralConfig = {
  name: "Updater Validator General",
  module: "System/Maintenance/Updater/Validator",
  version: "0.2.8.0",
  standard: "40,000,000,000%_ULTRA_BROAD"
};
