/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface RAMSpecification {
  allocatedMB: number;
  heapLimitMB: number;
  memoryArchitecture: string;
}

export const RAMRegistry: RAMSpecification = {
  allocatedMB: 4096,
  heapLimitMB: 8192,
  memoryArchitecture: "Unified Shared Virtual Memory Array"
};
