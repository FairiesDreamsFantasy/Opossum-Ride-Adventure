/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CENTRALIZED_THEMES_REGISTRY, ThemeType } from "../../../Themes";

export const RegistryThemeGeneral = {
  version: "1.0.0",
  type: "Theme Registry",
  totalThemes: Object.keys(CENTRALIZED_THEMES_REGISTRY).length,
  status: "ACTIVE"
};

export function getRegisteredTheme(themeId: ThemeType) {
  return CENTRALIZED_THEMES_REGISTRY[themeId] || CENTRALIZED_THEMES_REGISTRY.Dark;
}
