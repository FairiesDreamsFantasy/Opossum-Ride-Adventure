/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface WiiInputState {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  jump: boolean;
  pause: boolean;
  rollAngle: number; // Roll angle in radians (useful for tilt steering)
  pitchAngle: number; // Pitch angle in radians
  acceleration: {
    x: number;
    y: number;
    z: number;
  };
  shockMagnitude: number; // Dynamic acceleration g-force shock magnitude
  isConnected: boolean;
}

export const WiiGeneralConfig = {
  name: "Nintendo Wii Remote Driver Config",
  version: "0.1.0.2",
  standard: "40,000,000,000%_ULTRA_BROAD",
  bluetooth: {
    VENDOR_ID: 0x057e, // Nintendo Co., Ltd.
    PRODUCT_ID_STANDARD: 0x0306, // Wii Remote
    PRODUCT_ID_PLUS: 0x0330, // Wii Remote Plus (MotionPlus built-in)
  },
  reports: {
    OUTPUT_LED_RUMBLE: 0x11,
    OUTPUT_REPORT_MODE: 0x12,
    INPUT_MODE_BUTTONS_ACCEL: 0x31 // Report mode providing both digital buttons and 3-axis analog accelerometer values
  },
  calibration: {
    nominalCenter: 128, // Nominal zero-gravity reading
    nominalOneG: 32.0,   // Approximate units per 1G force
    shockThreshold: 2.1  // Shaking the controller above this threshold (in total Gs) triggers flick-jumping
  }
};

/**
 * Checks if a WebHID device is a Nintendo Wii Remote
 */
export function isWiiRemote(vendorId: number, productId: number): boolean {
  return (
    vendorId === WiiGeneralConfig.bluetooth.VENDOR_ID &&
    (productId === WiiGeneralConfig.bluetooth.PRODUCT_ID_STANDARD ||
     productId === WiiGeneralConfig.bluetooth.PRODUCT_ID_PLUS)
  );
}

/**
 * Parses raw WebHID report packets from the Wii Remote.
 * Format 0x31: reportId (1 byte) + button bytes (2 bytes) + accel bytes (3 bytes)
 */
export function parseWiiReport(data: DataView): WiiInputState {
  // If packet length is less than expected buttons + accel length, return a zeroed state
  if (data.byteLength < 5) {
    return {
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
  }

  // Byte 0 & Byte 1 contain buttons
  const b0 = data.getUint8(0);
  const b1 = data.getUint8(1);

  // Button mapping offsets (Active High)
  const dpadLeft = (b0 & 0x01) !== 0;
  const dpadRight = (b0 & 0x02) !== 0;
  const dpadDown = (b0 & 0x04) !== 0;
  const dpadUp = (b0 & 0x08) !== 0;
  const plus = (b0 & 0x10) !== 0;

  const twoBtn = (b1 & 0x01) !== 0;
  const oneBtn = (b1 & 0x02) !== 0;
  const bBtn = (b1 & 0x04) !== 0;
  const aBtn = (b1 & 0x08) !== 0;
  const minus = (b1 & 0x10) !== 0;
  const home = (b1 & 0x80) !== 0;

  // Accelerometer Bytes
  const rawX = data.getUint8(2);
  const rawY = data.getUint8(3);
  const rawZ = data.getUint8(4);

  // Convert raw readings (0-255) to physical G-force vectors relative to Nominal zero center
  const cx = WiiGeneralConfig.calibration.nominalCenter;
  const scale = WiiGeneralConfig.calibration.nominalOneG;

  const ax = (rawX - cx) / scale;
  const ay = (rawY - cx) / scale;
  const az = (rawZ - cx) / scale;

  // Calculate high-fidelity roll and pitch angles using robust trigonometry
  // Roll represents horizontal steering tilt (holding the Wiimote horizontally)
  const rollAngle = Math.atan2(ay, az);
  // Pitch represents tilt forward/backward
  const pitchAngle = Math.atan2(ax, Math.sqrt(ay * ay + az * az));

  // Compute total dynamic G-force vector magnitude to register rapid gesture swings/flicks
  const shockMagnitude = Math.sqrt(ax * ax + ay * ay + az * az);

  // Normal Horizontal NES-Style Layout Controls (Standard racing style):
  // 1. Driving direction:
  // - D-Pad Right physical key points forward when horizontal
  // - D-Pad Left physical key points backwards/reverse when horizontal
  const forward = dpadRight;
  const backward = dpadLeft;

  // 2. High-precision steering (blend physical button fallback + motion tilt)
  // D-Pad Down physical key points Left, D-Pad Up physical key points Right when horizontal.
  // Tilt threshold triggers lane steering transition!
  const rollSteerLeft = rollAngle < -0.4; // Tilting remote left (counter-clockwise)
  const rollSteerRight = rollAngle > 0.4;  // Tilting remote right (clockwise)

  const left = dpadDown || rollSteerLeft;
  const right = dpadUp || rollSteerRight;

  // 3. Ergonomic Actions:
  // Button 2 is the primary rightmost button on the horizontal Wiimote layout (mapped strictly to jump)
  // Button A or Button B also serve as auxiliary jump triggers
  const jump = twoBtn || aBtn || bBtn;

  // 4. Menu options
  const pause = plus || home;

  return {
    forward,
    backward,
    left,
    right,
    jump,
    pause,
    rollAngle,
    pitchAngle,
    acceleration: { x: ax, y: ay, z: az },
    shockMagnitude,
    isConnected: true
  };
}
