/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RegistryIndexGeneral } from "./General";

export * from "./General";

export const RegistryIndex = {
  General: RegistryIndexGeneral,
  categories: [
    "Version",
    "World",
    "BuildingBlocks",
    "LandingPage",
    "UI",
    "HardwareVirtualization",
    "Visuals",
    "Characters",
    "Arena",
    "AI",
    "Description",
    "AnnouncementPreferences",
    "Sound",
    "Security",
    "Accessibility",
    "Maintenance",
    "Engine",
    "Mathematics",
    "KeyboardsAndControllers",
    "Levels"
  ],
  standard: "75,000,000,000%_ULTRA_BROAD",
  timestamp: new Date().toISOString()
};
