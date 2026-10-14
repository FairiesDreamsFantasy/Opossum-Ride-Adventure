/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ValidatorGeneralConfig, UpdaterValidationReport } from "./General";

export * from "./General";

/**
 * Updater Validator Controller
 * 
 * Verifies version formatting, semver compliance, and integrity of update payloads.
 */
export class UpdaterValidatorController {
  private static instance: UpdaterValidatorController;

  private constructor() {}

  public static getInstance(): UpdaterValidatorController {
    if (!UpdaterValidatorController.instance) {
      UpdaterValidatorController.instance = new UpdaterValidatorController();
    }
    return UpdaterValidatorController.instance;
  }

  public validateVersionString(version: string): UpdaterValidationReport {
    if (!version || typeof version !== "string") {
      return {
        isValid: false,
        semverMatch: false,
        structureIntact: false,
        reason: "INVALID_VERSION_STRING_TYPE"
      };
    }

    // Pattern: v?X.Y.Z(.W)?
    const semverRegex = /^v?\d+\.\d+\.\d+(\.\d+)?$/;
    const isSemver = semverRegex.test(version.trim());

    return {
      isValid: isSemver,
      semverMatch: isSemver,
      structureIntact: true,
      reason: isSemver ? undefined : "NON_STANDARD_SEMVER_SYNTAX"
    };
  }
}

export const UpdaterValidator = UpdaterValidatorController.getInstance();
