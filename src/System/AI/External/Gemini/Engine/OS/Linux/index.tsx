/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class LinuxBridge {
  public static readonly kernel = "Linux 6.x-AI-Enhanced";
  public static executeCommand(cmd: string): string {
    return `LINUX_SHELL: ${cmd}`;
  }
}
