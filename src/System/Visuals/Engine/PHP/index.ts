/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * PHP Associative Scene Descriptor & Serialization Bridge
 */

export class PHPAssociativeSceneSerializer {
  public static serializeArray(dict: Record<string, any>): string {
    return JSON.stringify(dict);
  }

  public static deserializeArray(raw: string): Record<string, any> {
    try {
      return JSON.parse(raw);
    } catch {
      return {};
    }
  }
}

export default PHPAssociativeSceneSerializer;
