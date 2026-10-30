/**
 * Opossum Ride Adventure - Physical ODD SCSI MMC Command Specification
 * License: Apache-2.0 / Proprietary Artistry
 */

export const SCSI_MMC_OPCODES = {
  TEST_UNIT_READY: 0x00,
  REQUEST_SENSE: 0x03,
  INQUIRY: 0x12,
  START_STOP_UNIT: 0x1B, // Eject / Load disc tray
  READ_CAPACITY: 0x25,
  READ_10: 0x28,
  READ_TOC_PMA_ATIP: 0x43, // Read Table of Contents (Red Book CD tracks)
  READ_DISC_INFORMATION: 0x51,
  READ_TRACK_INFORMATION: 0x52,
  READ_CD: 0xBE // Read raw Red Book CD 2352-byte audio frames
};

export interface CDAudioTrackInfo {
  trackNumber: number;
  startSector: number;
  lengthSectors: number;
  isAudio: boolean;
  isCopyProhibited: boolean;
}

export const ODD_SECTOR_SIZES = {
  DATA_ISO_9660: 2048,
  AUDIO_RED_BOOK: 2352,
  RAW_MODE_1: 2352,
  RAW_MODE_2: 2336
};
