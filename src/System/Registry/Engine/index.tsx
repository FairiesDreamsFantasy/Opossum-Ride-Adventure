/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OSRegistry } from "./OS";
import { DRMFreeRegistry } from "./DRM-Free";
import { MathematicsRegistry } from "./Mathematics";
import { ScienceRegistry } from "./Science";
import { LanguagesRegistry } from "./Languages";
import { RAMDiskRegistry } from "./RAM_Disk";

export * from "./OS";
export * from "./DRM-Free";
export * from "./Mathematics";
export * from "./Science";
export * from "./Languages";
export * from "./RAM_Disk";

/**
 * Engine Registry Aggregator
 */
export class EngineRegistry {
  public static readonly OS = OSRegistry;
  public static readonly DRMFree = DRMFreeRegistry;
  public static readonly Mathematics = MathematicsRegistry;
  public static readonly Science = ScienceRegistry;
  public static readonly Languages = LanguagesRegistry;
  public static readonly RAMDisk = RAMDiskRegistry;

  public static getFullAudit(): {
    osCount: number;
    drmFreeCount: number;
    mathModuleCount: number;
    scienceModuleCount: number;
    languagesCount: number;
    ramDiskProfilesCount: number;
    timestamp: number;
  } {
    return {
      osCount: this.OS.listAllOS().length,
      drmFreeCount: this.DRMFree.listAllModules().length,
      mathModuleCount: this.Mathematics.getMetadata().modules.length,
      scienceModuleCount: this.Science.getMetadata().modules.length,
      languagesCount: this.Languages.listAllLanguages().length,
      ramDiskProfilesCount: this.RAMDisk.listAllProfiles().length,
      timestamp: Date.now()
    };
  }
}

export default EngineRegistry;
