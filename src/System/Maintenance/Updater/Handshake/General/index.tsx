/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface HandshakePayload {
  version: string;
  buildTimestamp: number;
  minSupportedClientVersion?: string;
  signature?: string;
}

export const HandshakeGeneralConfig = {
  name: "Updater Handshake General",
  module: "System/Maintenance/Updater/Handshake",
  version: "0.2.8.0",
  standard: "40,000,000,000%_ULTRA_BROAD",
  endpoint: "/version.json"
};
