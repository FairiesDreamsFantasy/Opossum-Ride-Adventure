/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Network_Cast General: Open Streaming Protocols
 */

export interface CastPacket {
  header: "OPSCAST";
  seq: number;
  payload: Uint8Array;
  checksum: number;
}

export class NetworkCastProtocols {
  /**
   * Generates an Adler-32 checksum for packet integrity.
   */
  public static calculateChecksum(data: Uint8Array): number {
    let a = 1, b = 0;
    for (const byte of data) {
      a = (a + byte) % 65521;
      b = (b + a) % 65521;
    }
    return (b << 16) | a;
  }

  /**
   * Models Multicast Discovery for local peer-to-peer casting.
   */
  public static getMulticastAddress(): string {
    return "239.1.2.3"; // Opossum standard multicast group
  }
}

export default NetworkCastProtocols;
