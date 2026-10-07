/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Ultra-Scientific Panner Logic for Sound
 */
export class Sound_Panner_Logic {
  public static readonly type = "Panner";
  public static readonly module = "Sound";
  
  /**
   * Initializes the scientific Panner node with ultra-scientific parameters
   * @param ctx The active AudioContext
   */
  public static createNode(ctx: AudioContext): AudioNode {
    const panner = ctx.createPanner();
    panner.panningModel = "equalpower";
    panner.distanceModel = "inverse";
    panner.refDistance = 1;
    panner.maxDistance = 10000;
    panner.rolloffFactor = 1;
    panner.coneInnerAngle = 360;
    panner.coneOuterAngle = 0;
    panner.coneOuterGain = 0;
    return panner;
  }
}

export default Sound_Panner_Logic;
