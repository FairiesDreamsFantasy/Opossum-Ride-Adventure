/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OSRecord, OS_REGISTRY_METADATA, OS_RECORDS_LIST } from "./General";
import OperatingSystemsEngine, {
  FreeDOS,
  Linux,
  OperatingSystemsEngineSubsystem
} from "../../../Engine/OS";

export * from "./General";

export class OSRegistry {
  public static readonly Engine: OperatingSystemsEngineSubsystem = OperatingSystemsEngine;
  public static readonly FreeDOS = FreeDOS;
  public static readonly Linux = Linux;

  public static getMetadata() {
    return OS_REGISTRY_METADATA;
  }

  public static getOS(id: string): OSRecord | undefined {
    return OS_RECORDS_LIST.find(record => record.id.toLowerCase() === id.toLowerCase());
  }

  public static listAllOS(): OSRecord[] {
    return OS_RECORDS_LIST;
  }

  public static listByFamily(family: OSRecord["family"]): OSRecord[] {
    return OS_RECORDS_LIST.filter(record => record.family === family);
  }

  public static listByArchitecture(arch: OSRecord["architecture"]): OSRecord[] {
    return OS_RECORDS_LIST.filter(record => record.architecture === arch);
  }

  public static runDiagnosticAudit(): {
    totalOperatingSystems: number;
    openSourceCount: number;
    families: string[];
    engineActive: boolean;
    timestamp: number;
  } {
    const list = this.listAllOS();
    const families = Array.from(new Set(list.map(o => o.family)));
    return {
      totalOperatingSystems: list.length,
      openSourceCount: list.filter(o => o.isOpenSource).length,
      families,
      engineActive: true,
      timestamp: Date.now()
    };
  }
}

export { OperatingSystemsEngine, FreeDOS, Linux };
export default OSRegistry;
