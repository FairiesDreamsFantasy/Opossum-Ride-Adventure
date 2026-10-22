/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ObjectsGeneralRegistry } from "./General";
import { WindChimes } from "./Wind_Chimes";

export * from "./General";
export { WindChimes };

export const ObjectsRegistry = {
  id: "objects",
  name: "System Objects",
  items: ObjectsGeneralRegistry,
  timestamp: new Date().toISOString()
};
