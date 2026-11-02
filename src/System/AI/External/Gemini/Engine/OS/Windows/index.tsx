/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class WindowsBridge {
  public static readonly architecture = "x64";
  public static callWinAPI(fn: string): number {
    return 0; // SUCCESS
  }
}
