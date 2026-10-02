/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface RegistryPlayAreaAIConfig {
  registryPath: string;
  category: "UI";
  subCategory: "Play_Area";
  activeStatus: "ACTIVE";
}

export const RegistryPlayAreaAIConfigDefault: RegistryPlayAreaAIConfig = {
  registryPath: "System/Registry/AI/In-Game/Category/UI/Play_Area",
  category: "UI",
  subCategory: "Play_Area",
  activeStatus: "ACTIVE"
};
