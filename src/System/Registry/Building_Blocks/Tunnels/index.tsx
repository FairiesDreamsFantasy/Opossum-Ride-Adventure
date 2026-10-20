/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Tunnel } from "../../../Building_Blocks/Tunnels";
import { TUNNEL_METADATA } from "../../../Building_Blocks/Tunnels/General";

export const TunnelsRegistry = {
  id: "tunnels_registry",
  name: "Tunnels Building Block Registry",
  module: "System/Building_Blocks/Tunnels",
  component: Tunnel,
  metadata: TUNNEL_METADATA,
  version: "1.0.0-scientific",
  standard: "75,000,000,000%_ULTRA_BROAD",
  timestamp: new Date().toISOString()
};
