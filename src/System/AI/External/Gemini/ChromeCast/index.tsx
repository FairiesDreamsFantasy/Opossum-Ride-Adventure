/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ChromeCastDevice {
  id: string;
  name: string;
  status: "connected" | "disconnected" | "casting";
}

export class GeminiChromeCastService {
  private static instance: GeminiChromeCastService;
  private connectedDevice: ChromeCastDevice | null = null;

  public static getInstance(): GeminiChromeCastService {
    if (!GeminiChromeCastService.instance) {
      GeminiChromeCastService.instance = new GeminiChromeCastService();
    }
    return GeminiChromeCastService.instance;
  }

  public startCasting(deviceName = "Living Room Display"): ChromeCastDevice {
    this.connectedDevice = {
      id: `cast_${Date.now()}`,
      name: deviceName,
      status: "casting"
    };
    console.log(`Gemini ChromeCast: Broadcasting canvas stream to ${deviceName}`);
    return this.connectedDevice;
  }

  public stopCasting(): void {
    if (this.connectedDevice) {
      this.connectedDevice.status = "disconnected";
      this.connectedDevice = null;
      console.log("Gemini ChromeCast: Stream disconnected");
    }
  }

  public getCastStatus(): ChromeCastDevice | null {
    return this.connectedDevice;
  }
}

export const GeminiChromeCast = GeminiChromeCastService.getInstance();
