/**
 * Opossum Ride Adventure - Physical Cartridge & Flash Cart Command Specifications
 * License: Apache-2.0 / Proprietary Artistry
 */

export interface CartridgeDeviceHardwareSpec {
  hardwareName: string;
  manufacturer: string;
  supportedConsoles: string[];
  protocolType: "FTDI_Serial" | "USB_CDC" | "Retrode_USB" | "Vendor_USB";
  supportsSaveDump: boolean;
  supportsRomDump: boolean;
  vendorId?: number;
  productId?: number;
}

export const PHYSICAL_CARTRIDGE_HARDWARE: Record<string, CartridgeDeviceHardwareSpec> = {
  EVERDRIVE_N64: {
    hardwareName: "Krikzz EverDrive 64 (v2.5 / v3 / X7)",
    manufacturer: "Krikzz",
    supportedConsoles: ["Nintendo 64"],
    protocolType: "FTDI_Serial",
    supportsSaveDump: true,
    supportsRomDump: true,
    vendorId: 0x0403, // FTDI USB
    productId: 0x6001
  },
  MEGA_EVERDRIVE: {
    hardwareName: "Mega EverDrive (X3 / X5 / X7 / PRO)",
    manufacturer: "Krikzz",
    supportedConsoles: ["Sega Genesis / Mega Drive", "Sega Master System"],
    protocolType: "FTDI_Serial",
    supportsSaveDump: true,
    supportsRomDump: true,
    vendorId: 0x0403,
    productId: 0x6001
  },
  FXPAK_PRO: {
    hardwareName: "FXPak Pro / SD2SNES",
    manufacturer: "Krikzz / ikari_01",
    supportedConsoles: ["Super Nintendo (SNES)"],
    protocolType: "USB_CDC",
    supportsSaveDump: true,
    supportsRomDump: true
  },
  RETRODE_2: {
    hardwareName: "Retrode 2 Dual Cartridge Reader/Dumper",
    manufacturer: "Retrode / MuA2",
    supportedConsoles: ["SNES", "Sega Genesis", "Game Boy", "N64"],
    protocolType: "Retrode_USB",
    supportsSaveDump: true,
    supportsRomDump: true,
    vendorId: 0x0403,
    productId: 0x6001
  },
  EPILOGUE_GB_OPERATOR: {
    hardwareName: "Epilogue GB Operator",
    manufacturer: "Epilogue",
    supportedConsoles: ["Game Boy", "Game Boy Color", "Game Boy Advance"],
    protocolType: "USB_CDC",
    supportsSaveDump: true,
    supportsRomDump: true
  }
};
