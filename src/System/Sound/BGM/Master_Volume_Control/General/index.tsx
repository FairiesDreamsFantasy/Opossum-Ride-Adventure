/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Ultra-Scientific Master_Volume_Control Logic for BGM
 */
export class BGM_Master_Volume_Control_Logic {
  public static readonly type = "Master_Volume_Control";
  public static readonly module = "BGM";
  
  /**
   * Initializes the scientific Master_Volume_Control node with ultra-scientific parameters
   * @param ctx The active AudioContext
   */
  public static createNode(ctx: AudioContext): AudioNode {
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(1.0, ctx.currentTime);
    return gain;
  }
}

export default BGM_Master_Volume_Control_Logic;
