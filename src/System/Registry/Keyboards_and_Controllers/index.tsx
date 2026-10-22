/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { KeyboardsAndControllersRegistryGeneral } from "./General";
import { KeyboardsAndControllersEngine } from "../../Keyboards_and_Controllers/Engine";
import { Keyboards_and_ControllersRegistry as SystemKeyboardsRegistry } from "../../Keyboards_and_Controllers";

export * from "./General";
export * from "./Engine";

export const KeyboardsAndControllersRegistry = {
  General: KeyboardsAndControllersRegistryGeneral,
  SystemRegistry: SystemKeyboardsRegistry,
  Engine: KeyboardsAndControllersEngine
};
