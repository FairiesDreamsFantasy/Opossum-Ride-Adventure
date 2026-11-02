/**
 * Opossum Ride Adventure - Physical Drives Subsystem General Registry
 * License: Apache-2.0 / Proprietary Artistry
 */

export type PhysicalDriveCategory =
  | "FDD"           // Floppy Disk Drive (3.5", 5.25", USB Floppy, Greaseweazle, FluxEngine)
  | "ODD"           // Optical Disc Drive (CD-ROM, DVD-ROM, BD-ROM)
  | "Cartridge"     // Read-Write Cartridge / EverDrive / Retrode / Flash Cart
  | "MemoryCard"    // PS1/PS2 Memory Card Adapter, GameCube SD, Memory Stick
  | "GenericUSB";   // Mass Storage USB Flash Drive / SD Reader

export type PhysicalDriveProtocol = "WebUSB" | "WebSerial" | "FileSystemAccess" | "VirtualImage";

export interface PhysicalDriveDevice {
  deviceId: string;
  name: string;
  category: PhysicalDriveCategory;
  protocol: PhysicalDriveProtocol;
  connected: boolean;
  readOnly: boolean;
  mediaInserted: boolean;
  volumeLabel?: string;
  vendorId?: number;
  productId?: number;
  sectorSize: number;
  totalSectors: number;
  driveLetter?: string;
}

export const PhysicalDrivesGeneral = {
  name: "Universal Physical Drive Hardware Subsystem",
  version: "1.0.0-ultra",
  supportedCategories: ["FDD", "ODD", "Cartridge", "MemoryCard", "GenericUSB"],
  supportedProtocols: ["WebUSB", "WebSerial", "FileSystemAccess", "VirtualImage"],
  isFullyOffline: true,
  license: "Apache-2.0 / Hardware Interface Standard"
};
