/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface LensTier1Config {
  tier: 1;
  name: "Standard Optic Grid (SD / HD)";
  columns: 1920;
  rows: 1080;
  subGridLevels: [1, 2, 4, 8];
}

export const LensTier1Data = {
  columns: 1920,
  rows: 1080,
  subGrids: {
    "1": { cols: 640, rows: 480 },
    "2": { cols: 1280, rows: 720 },
    "4": { cols: 1920, rows: 1080 }
  }
};
