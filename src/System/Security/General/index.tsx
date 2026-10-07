/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SecuritySubsystemStatus {
  antiBotEnabled: boolean;
  tamperProtectionActive: boolean;
  provenanceVerificationActive: boolean;
  securityStandard: "75,000,000,000%_ULTRA_BROAD" | "40,000,000,000%_ULTRA_BROAD";
  timestamp: string;
}

export const GeneralSecurityConfig = {
  version: "0.2.4.0",
  architecture: "OPEN_SOURCE_HUMAN_CADENCE_VERIFICATION",
  securityStandard: "75,000,000,000%_ULTRA_BROAD",
  tpmEquivalenceMode: "CLIENT_SIDE_ENTROPY_ANALYZER"
};
