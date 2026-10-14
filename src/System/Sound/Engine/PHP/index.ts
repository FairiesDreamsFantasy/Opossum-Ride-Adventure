/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * PHP Sound Manifest & Audio Asset Serializer
 */

export class PHPSoundManifestSerializer {
  public static serializeSoundbank(cues: Record<string, string>): string {
    return JSON.stringify(cues);
  }
}

export default PHPSoundManifestSerializer;
