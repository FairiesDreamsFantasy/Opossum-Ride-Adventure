/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class AndroidBridge {
  public static readonly apiLevel = 34;
  public static launchIntent(action: string): void {
    console.log(`ANDROID_INTENT: ${action}`);
  }
}
