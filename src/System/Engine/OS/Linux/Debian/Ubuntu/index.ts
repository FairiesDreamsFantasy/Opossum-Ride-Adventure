/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Ubuntu Operating System Profile & Desktop Environment Bridge
 */

export class UbuntuProfileEngine {
  public readonly distroName = "Ubuntu";
  public readonly release = "24.04.1 LTS (Noble Numbat)";
  public readonly desktopEnvironment = "GNOME 46";
  public readonly defaultDisplay = "Wayland";

  public getReleaseInfo(): Record<string, string> {
    return {
      DISTRIB_ID: this.distroName,
      DISTRIB_RELEASE: "24.04",
      DISTRIB_CODENAME: "noble",
      DISTRIB_DESCRIPTION: this.release
    };
  }
}

export default UbuntuProfileEngine;
