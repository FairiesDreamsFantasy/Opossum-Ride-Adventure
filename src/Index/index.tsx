/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RootGeneralHelper, RootLifecycleConfig } from "./General";

/**
 * Root Index Helper Module
 * Scientific helper and bridge for App.tsx and main.tsx.
 */
export { RootGeneralHelper };
export type { RootLifecycleConfig };

export const RootIndexHelper = {
  id: "root_index_helper",
  version: "0.1.0.5",
  General: RootGeneralHelper
};

export default RootIndexHelper;
