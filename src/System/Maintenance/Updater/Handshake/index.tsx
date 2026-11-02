/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HandshakeGeneralConfig, HandshakePayload } from "./General";
import { GeneralMaintenanceConfig } from "../../General";
import { UpdateHandshakeResult } from "../General";

export * from "./General";

/**
 * Updater Handshake Controller
 * 
 * Performs lightweight, zero-overhead version verification against the host server.
 */
export class UpdaterHandshakeController {
  private static instance: UpdaterHandshakeController;

  private constructor() {}

  public static getInstance(): UpdaterHandshakeController {
    if (!UpdaterHandshakeController.instance) {
      UpdaterHandshakeController.instance = new UpdaterHandshakeController();
    }
    return UpdaterHandshakeController.instance;
  }

  public async performHandshake(): Promise<UpdateHandshakeResult> {
    const currentVersion = GeneralMaintenanceConfig.version;

    try {
      if (typeof window === "undefined" || !window.fetch) {
        return {
          updateAvailable: false,
          currentVersion,
          serverVersion: currentVersion
        };
      }

      const response = await fetch(HandshakeGeneralConfig.endpoint, {
        method: "GET",
        headers: { "Cache-Control": "no-cache", Pragma: "no-cache" },
        cache: "no-store"
      });

      if (!response.ok) {
        return {
          updateAvailable: false,
          currentVersion,
          serverVersion: currentVersion
        };
      }

      const data = (await response.json()) as HandshakePayload;
      const isNewer = data.version && data.version !== currentVersion;

      return {
        updateAvailable: !!isNewer,
        currentVersion,
        serverVersion: data.version || currentVersion,
        buildTimestamp: data.buildTimestamp
      };
    } catch {
      return {
        updateAvailable: false,
        currentVersion,
        serverVersion: currentVersion
      };
    }
  }
}

export const UpdaterHandshake = UpdaterHandshakeController.getInstance();
