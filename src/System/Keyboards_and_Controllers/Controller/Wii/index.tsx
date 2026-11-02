/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { isWiiRemote, parseWiiReport, WiiInputState, WiiGeneralConfig } from "./General";

export * from "./General";

// Inline type definitions for WebHID API to ensure strict compliance and smooth compilation
export interface HIDDevice {
  opened: boolean;
  vendorId: number;
  productId: number;
  open(): Promise<void>;
  close(): Promise<void>;
  sendReport(reportId: number, data: BufferSource): Promise<void>;
  addEventListener(type: string, listener: (event: any) => void): void;
  removeEventListener(type: string, listener: (event: any) => void): void;
}

/**
 * Driverless WebHID Nintendo Wii Remote Controller Manager
 * Sets up direct binary channel packets listening over Bluetooth and processes accelerometer tilt/flicks.
 */
export class WiiControllerManagerController {
  private static instance: WiiControllerManagerController;
  private activeDevice: HIDDevice | null = null;
  private currentState: WiiInputState | null = null;
  private onStateChangeCallbacks: ((state: WiiInputState) => void)[] = [];

  private constructor() {
    // Attempt automatic re-attachment of previously granted Wii Remote permissions
    if (typeof window !== "undefined" && typeof navigator !== "undefined" && "hid" in (navigator as any)) {
      (navigator as any).hid.getDevices().then((devices: any[]) => {
        const found = devices.find((d) => isWiiRemote(d.vendorId, d.productId));
        if (found) {
          this.initializeDevice(found as HIDDevice);
        }
      }).catch((err: any) => {
        console.warn("Wii Remote auto-reconnect bypassed:", err);
      });
    }
  }

  public static getInstance(): WiiControllerManagerController {
    if (!WiiControllerManagerController.instance) {
      WiiControllerManagerController.instance = new WiiControllerManagerController();
    }
    return WiiControllerManagerController.instance;
  }

  /**
   * Triggers the WebHID user-gesture security permission prompt to discover and pair a Wii Remote.
   */
  public async connectWiiRemote(): Promise<boolean> {
    if (typeof navigator === "undefined" || !("hid" in (navigator as any))) {
      throw new Error("WebHID API is not supported by your browser. Please use Chrome, Edge, or Opera.");
    }

    try {
      const devices = await (navigator as any).hid.requestDevice({
        filters: [
          { vendorId: WiiGeneralConfig.bluetooth.VENDOR_ID, productId: WiiGeneralConfig.bluetooth.PRODUCT_ID_STANDARD },
          { vendorId: WiiGeneralConfig.bluetooth.PRODUCT_ID_STANDARD, productId: WiiGeneralConfig.bluetooth.PRODUCT_ID_PLUS }
        ]
      });

      if (devices.length > 0) {
        await this.initializeDevice(devices[0] as HIDDevice);
        return true;
      }
      return false;
    } catch (err: any) {
      console.error("Wii Remote connection error:", err);
      throw err;
    }
  }

  /**
   * Initializes data reporting streams on the paired HID device.
   */
  private async initializeDevice(device: HIDDevice) {
    this.activeDevice = device;

    if (!device.opened) {
      await device.open();
    }

    // Set reporting mode to Buttons + Accelerometer (Input Report 0x31)
    // Send output report 0x12 to configure reporting type
    await device.sendReport(WiiGeneralConfig.reports.OUTPUT_REPORT_MODE, new Uint8Array([0x00, WiiGeneralConfig.reports.INPUT_MODE_BUTTONS_ACCEL]));

    // Turn on LED 1 to indicate Player 1 status, and trigger a brief welcome rumble
    await this.setPlayerLED(1, true);

    // Register raw packet listener
    device.addEventListener("inputreport", this.handleInputReport);

    // Set initial state
    this.currentState = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      jump: false,
      pause: false,
      rollAngle: 0,
      pitchAngle: 0,
      acceleration: { x: 0, y: 0, z: 0 },
      shockMagnitude: 0,
      isConnected: true
    };

    console.log("Wii Remote driver successfully initialized over raw WebHID!");
  }

  /**
   * Parses the binary event stream reports
   */
  private handleInputReport = (event: any) => {
    const { reportId, data } = event;
    // We configured mode 0x31 (Buttons + Accel)
    if (reportId === WiiGeneralConfig.reports.INPUT_MODE_BUTTONS_ACCEL) {
      const parsed = parseWiiReport(data);
      this.currentState = parsed;

      // Dispatch to active callbacks
      for (const cb of this.onStateChangeCallbacks) {
        cb(parsed);
      }
    }
  };

  /**
   * Sets Player LEDs (1-4) on the remote
   */
  public async setPlayerLED(ledIndex: number, rumble: boolean = false) {
    if (!this.activeDevice || !this.activeDevice.opened) return;

    // Byte mask representing LEDs:
    // Bit 4: LED 1, Bit 5: LED 2, Bit 6: LED 3, Bit 7: LED 4
    // Bit 0: Rumble active
    let val = 0x00;
    if (ledIndex === 1) val = 0x10;
    else if (ledIndex === 2) val = 0x20;
    else if (ledIndex === 3) val = 0x40;
    else if (ledIndex === 4) val = 0x80;

    if (rumble) {
      val |= 0x01; // Enable Rumble bit
    }

    try {
      await this.activeDevice.sendReport(WiiGeneralConfig.reports.OUTPUT_LED_RUMBLE, new Uint8Array([val]));
    } catch (err) {
      console.warn("Failed to set Wii Remote LED/Rumble report:", err);
    }
  }

  /**
   * Helper to trigger a highly tactile and direct physical rumble burst!
   */
  public async triggerRumble(durationMs: number = 150) {
    if (!this.activeDevice || !this.activeDevice.opened) return;

    try {
      // LED 1 active + rumble ON
      await this.setPlayerLED(1, true);

      setTimeout(() => {
        // LED 1 active + rumble OFF
        this.setPlayerLED(1, false);
      }, durationMs);
    } catch (e) {
      console.warn("Rumble sequence interrupted:", e);
    }
  }

  public getWiiInput(): WiiInputState | null {
    if (!this.activeDevice || !this.activeDevice.opened) return null;
    return this.currentState;
  }

  public disconnect() {
    if (this.activeDevice) {
      this.activeDevice.removeEventListener("inputreport", this.handleInputReport);
      try {
        // Turn off all LEDs and rumble before closing
        this.activeDevice.sendReport(WiiGeneralConfig.reports.OUTPUT_LED_RUMBLE, new Uint8Array([0x00]));
        this.activeDevice.close();
      } catch (e) {}
      this.activeDevice = null;
      this.currentState = null;
      console.log("Wii Remote driver disconnected.");
    }
  }

  public isSupported(): boolean {
    return typeof window !== "undefined" && typeof navigator !== "undefined" && "hid" in (navigator as any);
  }

  public registerCallback(cb: (state: WiiInputState) => void) {
    this.onStateChangeCallbacks.push(cb);
  }

  public unregisterCallback(cb: (state: WiiInputState) => void) {
    this.onStateChangeCallbacks = this.onStateChangeCallbacks.filter((c) => c !== cb);
  }
}

export const WiiControllerManager = WiiControllerManagerController.getInstance();
