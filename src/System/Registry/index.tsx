/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { VisualsRegistry } from "./Visuals";
import { CharactersRegistry } from "./Characters";
import { ArenaRegistry } from "./Arena";
import { WorldRegistry } from "./World";
import { AIRegistry } from "./AI";
import { DescriptionRegistry } from "./Description";
import { AnnouncementPreferencesRegistry } from "./Announcement_Preferences";
import { SoundRegistry } from "./Sound";

import { VersionRegistry } from "./Version";
import { WorldSystem } from "../Building_Blocks/World";
import { LandingPageRegistry } from "./Landing_Page";
import { UIRegistry } from "./UI";
import { HardwareVirtualizationRegistry } from "./Hardware_Virtualization";
import { BuildingBlocksRegistry } from "./Building_Blocks";
export const SecurityRegistry = {
  active: true,
  status: "STABLE",
  getStatus: () => ({ active: true, status: "STABLE", timestamp: new Date().toISOString() })
};
import { AccessibilityRegistry } from "./Accessibility";
import { MaintenanceRegistry } from "./Maintenance";
import { EngineRegistry } from "./Engine";
import { MathematicsRegistry } from "./Engine/Mathematics";
import { KeyboardsAndControllersRegistry } from "./Keyboards_and_Controllers";
import { RegistryIndex } from "./Index";
import { LevelsRegistry } from "./Levels";

/**
 * Master System Registry
 * Centralized access point for all game system metadata and configurations.
 */
export const SystemRegistry = {
  Version: VersionRegistry.current,
  VersionData: VersionRegistry,
  World: WorldSystem,
  BuildingBlocks: BuildingBlocksRegistry,
  LandingPage: LandingPageRegistry,
  UI: UIRegistry,
  HardwareVirtualization: HardwareVirtualizationRegistry,
  Visuals: VisualsRegistry,
  Characters: CharactersRegistry,
  Arena: ArenaRegistry,
  WorldRegistry: WorldRegistry,
  Levels: WorldRegistry.World1,
  WorldN: WorldRegistry.WorldN,
  AI: AIRegistry,
  Description: DescriptionRegistry,
  AnnouncementPreferences: AnnouncementPreferencesRegistry,
  Sound: SoundRegistry,
  Security: SecurityRegistry,
  Accessibility: AccessibilityRegistry,
  Maintenance: MaintenanceRegistry,
  Engine: EngineRegistry,
  Mathematics: MathematicsRegistry,
  KeyboardsAndControllers: KeyboardsAndControllersRegistry,
  LevelsRegistry: LevelsRegistry,
  RegistryIndex: RegistryIndex,
  timestamp: new Date().toISOString()
};

export { MathematicsRegistry };

