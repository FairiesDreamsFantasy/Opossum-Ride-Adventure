/**
 * Opossum Ride Adventure - RAM Disk Engine Registry Module
 * License: Apache-2.0 / Scientific Memory Architecture
 */

import { RAMDiskRegistryGeneral, RAMDiskRegistryProfile } from "./General";
import { RAMDisk, RAMDiskEngine } from "../../../Engine/RAM_Disk";

export class RAMDiskRegistry {
  public static readonly Engine: RAMDiskEngine = RAMDisk;

  public static getMetadata(): typeof RAMDiskRegistryGeneral {
    return RAMDiskRegistryGeneral;
  }

  public static listAllProfiles(): RAMDiskRegistryProfile[] {
    return RAMDiskRegistryGeneral.profiles;
  }

  public static getProfileById(id: string): RAMDiskRegistryProfile | undefined {
    return RAMDiskRegistryGeneral.profiles.find(p => p.id === id);
  }

  public static getLiveDiskStats() {
    return this.Engine.getStats();
  }

  public static runDiagnosticAudit(): {
    totalProfiles: number;
    technology: string;
    engineInitialized: boolean;
    liveStats: ReturnType<RAMDiskEngine["getStats"]>;
    timestamp: number;
  } {
    return {
      totalProfiles: this.listAllProfiles().length,
      technology: RAMDiskRegistryGeneral.technology,
      engineInitialized: true,
      liveStats: this.getLiveDiskStats(),
      timestamp: Date.now()
    };
  }
}

export { RAMDiskRegistryGeneral, RAMDisk, RAMDiskEngine };
export type { RAMDiskRegistryProfile };
export default RAMDiskRegistry;
