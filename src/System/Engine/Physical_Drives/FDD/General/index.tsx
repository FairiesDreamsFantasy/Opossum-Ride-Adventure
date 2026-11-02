/**
 * Opossum Ride Adventure - Physical FDD Specification & Command Constants
 * License: Apache-2.0 / Proprietary Artistry
 */

export interface FloppyGeometrySpec {
  formatName: string;
  tracksPerSide: number;
  sides: number;
  sectorsPerTrack: number;
  bytesPerSector: number;
  totalSectors: number;
  totalCapacityBytes: number;
}

export const FLOPPY_GEOMETRIES: Record<string, FloppyGeometrySpec> = {
  "3.5_HD_1440KB": {
    formatName: "3.5\" High Density (1.44 MB)",
    tracksPerSide: 80,
    sides: 2,
    sectorsPerTrack: 18,
    bytesPerSector: 512,
    totalSectors: 2880,
    totalCapacityBytes: 1474560
  },
  "3.5_DD_720KB": {
    formatName: "3.5\" Double Density (720 KB)",
    tracksPerSide: 80,
    sides: 2,
    sectorsPerTrack: 9,
    bytesPerSector: 512,
    totalSectors: 1440,
    totalCapacityBytes: 737280
  },
  "5.25_HD_1200KB": {
    formatName: "5.25\" High Density (1.2 MB)",
    tracksPerSide: 80,
    sides: 2,
    sectorsPerTrack: 15,
    bytesPerSector: 512,
    totalSectors: 2400,
    totalCapacityBytes: 1228800
  },
  "5.25_DD_360KB": {
    formatName: "5.25\" Double Density (360 KB)",
    tracksPerSide: 40,
    sides: 2,
    sectorsPerTrack: 9,
    bytesPerSector: 512,
    totalSectors: 720,
    totalCapacityBytes: 368640
  }
};

/**
 * SCSI UFI Command Opcodes for USB Floppy Drives
 */
export const SCSI_UFI_OPCODES = {
  TEST_UNIT_READY: 0x00,
  REQUEST_SENSE: 0x03,
  INQUIRY: 0x12,
  READ_FORMAT_CAPACITIES: 0x23,
  READ_CAPACITY: 0x25,
  READ_10: 0x28,
  WRITE_10: 0x2A,
  SEEK_10: 0x2B,
  MODE_SENSE_10: 0x5A
};
