/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * XML Input Layout Descriptor & Keymap Parser
 */

export interface XMLInputKeymapNode {
  action: string;
  key: string;
  code: string;
}

export class XMLInputLayoutParser {
  public static createKeymapNode(action: string, key: string, code: string): XMLInputKeymapNode {
    return { action, key, code };
  }
}

export default XMLInputLayoutParser;
