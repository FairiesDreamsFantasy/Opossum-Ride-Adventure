/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * XML Sound Mix Graph & Routing Tree Parser
 */

export interface XMLSoundMixBusNode {
  busName: string;
  gain: number;
  mute: boolean;
  children: XMLSoundMixBusNode[];
}

export class XMLSoundMixGraphParser {
  public static createMixBus(busName: string, gain: number = 1.0, mute: boolean = false): XMLSoundMixBusNode {
    return { busName, gain, mute, children: [] };
  }
}

export default XMLSoundMixGraphParser;
