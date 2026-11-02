/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { UbuntuProfileEngine } from "./Ubuntu";
import { XubuntuProfileEngine } from "./Xubuntu";
import { LubuntuProfileEngine } from "./Lubuntu";
import { KubuntuProfileEngine } from "./Kubuntu";

export * from "./Ubuntu";
export * from "./Xubuntu";
export * from "./Lubuntu";
export * from "./Kubuntu";

/**
 * Debian Core Operating System Subsystem.
 * Unifies Debian base configuration and derivatives (Ubuntu, Xubuntu, Lubuntu, Kubuntu).
 */
export class DebianOperatingSystemEngine {
  public readonly baseDistro = "Debian GNU/Linux 12 (Bookworm)";
  public readonly packageManager = "APT / dpkg";

  public readonly Ubuntu = new UbuntuProfileEngine();
  public readonly Xubuntu = new XubuntuProfileEngine();
  public readonly Lubuntu = new LubuntuProfileEngine();
  public readonly Kubuntu = new KubuntuProfileEngine();

  public getSystemDetails(): { base: string; pkgMgr: string; supportedFlavors: string[] } {
    return {
      base: this.baseDistro,
      pkgMgr: this.packageManager,
      supportedFlavors: ["Ubuntu", "Xubuntu", "Lubuntu", "Kubuntu"]
    };
  }
}

export const Debian = new DebianOperatingSystemEngine();
export default Debian;
