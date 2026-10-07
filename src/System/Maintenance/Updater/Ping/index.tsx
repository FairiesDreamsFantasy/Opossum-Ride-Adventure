/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PingGeneralConfig, UpdaterPingStatus } from "./General";

export * from "./General";

/**
 * Updater Ping Controller
 * 
 * Performs non-blocking round-trip latency checks to confirm host server connectivity.
 */
export class UpdaterPingController {
  private static instance: UpdaterPingController;
  private status: UpdaterPingStatus = {
    lastPingTime: 0,
    isOnline: true,
    roundTripTimeMs: 0,
    consecutiveFailures: 0
  };

  private constructor() {}

  public static getInstance(): UpdaterPingController {
    if (!UpdaterPingController.instance) {
      UpdaterPingController.instance = new UpdaterPingController();
    }
    return UpdaterPingController.instance;
  }

  public async pingHost(): Promise<UpdaterPingStatus> {
    const start = performance.now();
    try {
      if (typeof window === "undefined" || !window.fetch) {
        return this.status;
      }

      // Check online status via lightweight HEAD/GET request or navigator.onLine
      if (typeof navigator !== "undefined" && !navigator.onLine) {
        this.status.isOnline = false;
        this.status.consecutiveFailures++;
        return this.status;
      }

      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), PingGeneralConfig.timeoutMs);

      await fetch("/index.html", {
        method: "HEAD",
        cache: "no-store",
        signal: controller.signal
      });
      clearTimeout(timer);

      const rtt = Math.round(performance.now() - start);
      this.status.isOnline = true;
      this.status.lastPingTime = Date.now();
      this.status.roundTripTimeMs = rtt;
      this.status.consecutiveFailures = 0;
    } catch {
      this.status.consecutiveFailures++;
      if (this.status.consecutiveFailures > 2) {
        this.status.isOnline = false;
      }
    }
    return { ...this.status };
  }

  public getStatus(): Readonly<UpdaterPingStatus> {
    return { ...this.status };
  }
}

export const UpdaterPing = UpdaterPingController.getInstance();
