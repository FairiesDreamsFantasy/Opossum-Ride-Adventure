/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface DRMFreeRecord {
  id: string;
  name: string;
  description: string;
  capabilities: string[];
  protocolVersion: string;
  isUnrestricted: boolean;
}

export const DRMFREE_REGISTRY_METADATA = {
  registryVersion: "1.0.0",
  lastUpdated: Date.now(),
  schemaType: "ENGINE_DRMFREE_DEFINITION"
};
