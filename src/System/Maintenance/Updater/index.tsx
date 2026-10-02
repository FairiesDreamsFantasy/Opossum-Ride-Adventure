/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { UpdaterGeneralConfig, UpdateHandshakeResult } from "./General";
import { UpdaterHandshake } from "./Handshake";
import { UpdaterPing } from "./Ping";
import { UpdaterValidator } from "./Validator";

export * from "./General";
export * from "./Handshake";
export * from "./Ping";
export * from "./Validator";

/**
 * Master Updater Controller
 * 
 * Coordinates background version checks, latency pings, and payload verification.
 */
export class SystemUpdaterController {
  private static instance: SystemUpdaterController;
  private checkTimer: number | null = null;
  private onUpdateAvailableCallback: ((result: UpdateHandshakeResult) => void) | null = null;

  private constructor() {}

  public static getInstance(): SystemUpdaterController {
    if (!SystemUpdaterController.instance) {
      SystemUpdaterController.instance = new SystemUpdaterController();
    }
    return SystemUpdaterController.instance;
  }

  public readonly Handshake = UpdaterHandshake;
  public readonly Ping = UpdaterPing;
  public readonly Validator = UpdaterValidator;

  public async checkForUpdates(): Promise<UpdateHandshakeResult> {
    const handshake = await this.Handshake.performHandshake();
    if (handshake.updateAvailable && handshake.serverVersion) {
      const validation = this.Validator.validateVersionString(handshake.serverVersion);
      if (validation.isValid) {
        if (this.onUpdateAvailableCallback) {
          this.onUpdateAvailableCallback(handshake);
        }
        return handshake;
      }
    }
    return handshake;
  }

  public startBackgroundPolling(onUpdateDetected?: (result: UpdateHandshakeResult) => void): void {
    if (this.onUpdateAvailableCallback === null && onUpdateDetected) {
      this.onUpdateAvailableCallback = onUpdateDetected;
    }

    if (this.checkTimer !== null) return;

    if (typeof window !== "undefined") {
      this.checkTimer = window.setInterval(async () => {
        await this.checkForUpdates();
      }, UpdaterGeneralConfig.checkCadenceMs);
    }
  }

  public stopBackgroundPolling(): void {
    if (this.checkTimer !== null && typeof window !== "undefined") {
      window.clearInterval(this.checkTimer);
      this.checkTimer = null;
    }
  }
}

export const SystemUpdater = SystemUpdaterController.getInstance();
