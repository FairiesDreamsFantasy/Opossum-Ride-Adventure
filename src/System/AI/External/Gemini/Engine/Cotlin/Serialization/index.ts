/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Kotlin Serialization Bridge for Gemini AI
 * Focuses on type-safe object-to-binary transformation for arena state persistence.
 */
export const GeminiCotlinSerialization = {
  format: "Kotlinx Serialization (ProtoBuf / JSON)",
  
  /**
   * Serializes a complex arena state to a stabilized byte-array buffer.
   */
  encodeToByteArray: (data: any): Uint8Array => {
    const json = JSON.stringify(data);
    const encoder = new TextEncoder();
    return encoder.encode(json);
  },
  
  /**
   * Decodes a stabilized byte-array back into a structured data class.
   */
  decodeFromByteArray: <T>(bytes: Uint8Array): T => {
    const decoder = new TextDecoder();
    return JSON.parse(decoder.decode(bytes)) as T;
  }
};

export default GeminiCotlinSerialization;
