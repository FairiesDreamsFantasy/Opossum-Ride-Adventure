/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * LBDCD (Low-Bandwidth Digital Content Delivery) Core Specification & Protocol Engine
 * 
 * An open-source, unrestricted alternative to HDCP (High-bandwidth Digital Content Protection).
 * Designed for 100% open media streaming, screen capturing, legacy hardware passthrough,
 * zero black-screen capture card blocks, and multi-port connectivity.
 */

export interface LBDCDProtocolHeader {
  magic: "LBDCD";
  version: "1.0.0";
  contentProtected: false; // Always false: DRM-Free open streaming
  allowCaptureCards: true;
  allowDirectFramebufferAccess: true;
  bandwidthMode: "ADAPTIVE_LOW_BANDWIDTH" | "LOSSLESS_UNCOMPRESSED" | "ANALOG_PASSTHROUGH";
  timestamp: number;
}

export interface PortDescriptor {
  portType: string;
  category: "ANALOG" | "DIGITAL" | "SERIAL_LEGACY" | "NETWORK";
  bandwidthMbps: number;
  isCaptureFriendly: boolean;
  pinoutCount: number;
  protocolStandard: string;
}

export class LBDCDGeneralEngine {
  public static readonly PROTOCOL_VERSION = "1.0.0";
  public static readonly ENCRYPTION_ENABLED = false;

  public static createProtocolHeader(bandwidthMode: LBDCDProtocolHeader["bandwidthMode"] = "ADAPTIVE_LOW_BANDWIDTH"): LBDCDProtocolHeader {
    return {
      magic: "LBDCD",
      version: this.PROTOCOL_VERSION,
      contentProtected: false,
      allowCaptureCards: true,
      allowDirectFramebufferAccess: true,
      bandwidthMode,
      timestamp: Date.now()
    };
  }

  /**
   * Calculates dynamic bandwidth requirement in Kilobytes per second for low-bandwidth digital stream.
   * Renders high-fidelity state data while keeping bandwidth footprint minimal.
   */
  public static calculateBandwidthKBps(width: number, height: number, fps: number, colorDepthBits: number = 8): number {
    const rawBitsPerSecond = width * height * fps * colorDepthBits;
    // LBDCD delta-compression ratio of 0.12 (88% reduction for low bandwidth)
    const compressedBitsPerSecond = rawBitsPerSecond * 0.12;
    return Math.round(compressedBitsPerSecond / 8 / 1024);
  }
}

export default LBDCDGeneralEngine;
