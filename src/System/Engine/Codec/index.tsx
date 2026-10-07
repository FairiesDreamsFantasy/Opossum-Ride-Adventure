/**
 * Opossum Ride Adventure - System Engine Codec Ultra-Module Master Dispatcher
 * License: Apache-2.0 / Proprietary Artistry
 */

import { SystemCodecEngineGeneral, KNOWN_MAGIC_SIGNATURES } from "./General";
import { OpenSourceCodecStreamHandler, inspectArrayBufferHeader } from "./Open_Source";

export class UniversalCodecUltraModule {
  private static instance: UniversalCodecUltraModule;

  public static getInstance(): UniversalCodecUltraModule {
    if (!UniversalCodecUltraModule.instance) {
      UniversalCodecUltraModule.instance = new UniversalCodecUltraModule();
    }
    return UniversalCodecUltraModule.instance;
  }

  public getRegistry() {
    return SystemCodecEngineGeneral;
  }

  public getSupportedMagicSignatures() {
    return KNOWN_MAGIC_SIGNATURES;
  }

  public parseBuffer(buffer: ArrayBuffer) {
    return inspectArrayBufferHeader(buffer);
  }
}

export const SystemEngineCodec = UniversalCodecUltraModule.getInstance();
