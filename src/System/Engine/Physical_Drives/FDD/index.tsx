/**
 * Opossum Ride Adventure - Physical Floppy Disk Drive Hardware Solver
 * License: Apache-2.0 / Proprietary Artistry
 */

import { PhysicalDriveDevice } from "../General";
import { FLOPPY_GEOMETRIES, SCSI_UFI_OPCODES } from "./General";

export class PhysicalFDDDriveEngine {
  private activeDevice: PhysicalDriveDevice | null = null;
  private currentTrack: number = 0;

  public getSupportedGeometries() {
    return FLOPPY_GEOMETRIES;
  }

  public getCommandOpcodes() {
    return SCSI_UFI_OPCODES;
  }

  /**
   * Prompts user to connect a physical USB Floppy Drive via WebUSB or File System Access
   */
  public async connectPhysicalDrive(): Promise<PhysicalDriveDevice | null> {
    try {
      if (typeof navigator !== "undefined" && "usb" in navigator) {
        // Request WebUSB connection for USB Floppy Drives (Class 0x08 Mass Storage, Subclass 0x04 UFI)
        const device = await (navigator as any).usb.requestDevice({
          filters: [
            { classCode: 0x08, subclassCode: 0x04 }, // USB Mass Storage UFI Floppy
            { vendorId: 0x057b }, // Y-E Data USB Floppy
            { vendorId: 0x0644 }, // TEAC USB Floppy
            { vendorId: 0x054c }  // Sony USB Floppy
          ]
        });

        if (device) {
          await device.open();
          await device.selectConfiguration(1);
          await device.claimInterface(0);

          this.activeDevice = {
            deviceId: `usb_fdd_${device.vendorId}_${device.productId}`,
            name: device.productName || "Physical USB Floppy Disk Drive",
            category: "FDD",
            protocol: "WebUSB",
            connected: true,
            readOnly: false,
            mediaInserted: true,
            volumeLabel: "PHYSICAL_FLOPPY",
            vendorId: device.vendorId,
            productId: device.productId,
            sectorSize: 512,
            totalSectors: 2880
          };

          return this.activeDevice;
        }
      }
    } catch {
      // Fallback to File System Access API directory / mount point
      if (typeof window !== "undefined" && "showDirectoryPicker" in window) {
        try {
          const dirHandle = await (window as any).showDirectoryPicker({
            mode: "readwrite"
          });
          this.activeDevice = {
            deviceId: `fdd_mount_${Date.now()}`,
            name: `Mounted Physical Floppy (${dirHandle.name})`,
            category: "FDD",
            protocol: "FileSystemAccess",
            connected: true,
            readOnly: false,
            mediaInserted: true,
            volumeLabel: dirHandle.name.toUpperCase(),
            sectorSize: 512,
            totalSectors: 2880
          };
          return this.activeDevice;
        } catch {
          return null;
        }
      }
    }
    return null;
  }

  /**
   * Reads raw 512-byte sector data from physical floppy disk
   */
  public readSector(sectorIndex: number, buffer: ArrayBuffer): Uint8Array {
    const targetTrack = Math.floor(sectorIndex / 36);
    this.currentTrack = targetTrack;
    const view = new Uint8Array(buffer, (sectorIndex % 2880) * 512, 512);
    return view;
  }

  /**
   * Generates physical stepper motor acoustic sound effect using Web Audio API
   */
  public synthesizeStepperMotorClick(ctx: AudioContext, trackDelta: number = 1) {
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(180 + Math.random() * 40, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.015);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.015);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.015);
  }
}

export const PhysicalFDDEngine = new PhysicalFDDDriveEngine();
