/**
 * Opossum Ride Adventure - Science Registry Module
 * License: Apache-2.0 / Scientific Registry Standard
 */

import { ScienceRegistryGeneral, ScienceRegistryMetadata } from "./General";

export class ScienceRegistry {
  public static getMetadata(): typeof ScienceRegistryGeneral {
    return ScienceRegistryGeneral;
  }

  public static getModuleById(id: string): ScienceRegistryMetadata | undefined {
    return ScienceRegistryGeneral.modules.find(m => m.id === id);
  }

  public static listModulesByDomain(domain: ScienceRegistryMetadata["domain"]): ScienceRegistryMetadata[] {
    return ScienceRegistryGeneral.modules.filter(m => m.domain === domain);
  }
}

export { ScienceRegistryGeneral };
export type { ScienceRegistryMetadata };
