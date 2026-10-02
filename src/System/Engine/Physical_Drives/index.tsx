/**
 * Opossum Ride Adventure - Master Physical Drives Subsystem Manager
 * License: Apache-2.0 / Proprietary Artistry
 */

import { PhysicalDrivesGeneral, PhysicalDriveDevice, PhysicalDriveCategory } from "./General";
import { PhysicalFDDEngine } from "./FDD";
import { PhysicalODDEngine } from "./ODD";
import { PhysicalCartridgeEngine } from "./Cartridge";

export class PhysicalDriveArrayManager {
  private static instance: PhysicalDriveArrayManager;
  private driveList: PhysicalDriveDevice[] = [];

  public static getInstance(): PhysicalDriveArrayManager {
    if (!PhysicalDriveArrayManager.instance) {
      PhysicalDriveArrayManager.instance = new PhysicalDriveArrayManager();
    }
    return PhysicalDriveArrayManager.instance;
  }

  public getGeneralSpecification() {
    return PhysicalDrivesGeneral;
  }

  public getFDDEngine() {
    return PhysicalFDDEngine;
  }

  public getODDEngine() {
    return PhysicalODDEngine;
  }

  public getCartridgeEngine() {
    return PhysicalCartridgeEngine;
  }

  /**
   * Returns live array of all connected physical drives
   */
  public getConnectedDrives(): PhysicalDriveDevice[] {
    return this.driveList.filter(d => d.connected);
  }

  /**
   * Prompts user to connect a physical drive of specified category
   */
  public async requestPhysicalDriveConnection(category: PhysicalDriveCategory): Promise<PhysicalDriveDevice | null> {
    let newDrive: PhysicalDriveDevice | null = null;

    switch (category) {
      case "FDD":
        newDrive = await PhysicalFDDEngine.connectPhysicalDrive();
        break;
      case "ODD":
        newDrive = await PhysicalODDEngine.connectPhysicalDrive();
        break;
      case "Cartridge":
        newDrive = await PhysicalCartridgeEngine.connectPhysicalCartridge();
        break;
      default:
        newDrive = await PhysicalFDDEngine.connectPhysicalDrive();
        break;
    }

    if (newDrive) {
      const existingIdx = this.driveList.findIndex(d => d.deviceId === newDrive!.deviceId);
      if (existingIdx >= 0) {
        this.driveList[existingIdx] = newDrive;
      } else {
        this.driveList.push(newDrive);
      }
    }

    return newDrive;
  }

  /**
   * Disconnects specified physical drive device ID
   */
  public disconnectDrive(deviceId: string): boolean {
    const drive = this.driveList.find(d => d.deviceId === deviceId);
    if (!drive) return false;
    drive.connected = false;
    return true;
  }
}

export const PhysicalDriveManager = PhysicalDriveArrayManager.getInstance();
