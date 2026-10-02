/**
 * Opossum Ride Adventure - Open-Source Codec Stream Handler
 * License: Apache-2.0 / Proprietary Artistry
 */

import { KNOWN_MAGIC_SIGNATURES, MagicByteSignature } from "../General";

export interface CodecHeaderResult {
  signature: MagicByteSignature | null;
  byteLength: number;
  isValid: boolean;
  detectedFormat: string;
}

/**
 * Inspects ArrayBuffer header bytes against universal magic signatures.
 */
export const inspectArrayBufferHeader = (buffer: ArrayBuffer): CodecHeaderResult => {
  if (!buffer || buffer.byteLength < 4) {
    return { signature: null, byteLength: buffer ? buffer.byteLength : 0, isValid: false, detectedFormat: "unknown" };
  }

  const bytes = new Uint8Array(buffer, 0, Math.min(16, buffer.byteLength));

  for (const sig of KNOWN_MAGIC_SIGNATURES) {
    let match = true;
    for (let i = 0; i < sig.bytes.length; i++) {
      if (bytes[i] !== sig.bytes[i]) {
        match = false;
        break;
      }
    }
    if (match) {
      return {
        signature: sig,
        byteLength: buffer.byteLength,
        isValid: true,
        detectedFormat: sig.container
      };
    }
  }

  return { signature: null, byteLength: buffer.byteLength, isValid: false, detectedFormat: "custom_stream" };
};

export const OpenSourceCodecStreamHandler = {
  name: "Open-Source Bitstream Stream Solver",
  description: "Inspects raw binary buffers and extracts container format headers with zero latency.",
  inspectHeader: inspectArrayBufferHeader
};
