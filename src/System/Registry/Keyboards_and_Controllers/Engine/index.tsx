/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { KeyboardsAndControllersEngineRegistryGeneral } from "./General";
import { KeyboardsAndControllersEngine } from "../../../Keyboards_and_Controllers/Engine";

export * from "./General";

export const KeyboardsAndControllersEngineRegistry = {
  General: KeyboardsAndControllersEngineRegistryGeneral,
  Engine: KeyboardsAndControllersEngine,
  isInteractionKey: (code: string) => KeyboardsAndControllersEngine.isInteractionKey(code)
};
