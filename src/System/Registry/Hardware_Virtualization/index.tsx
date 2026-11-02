/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CPURegistry } from "./CPU";
import { GPURegistry } from "./GPU";
import { RAMRegistry } from "./RAM";
import { SoundCardRegistry } from "./Sound_Card";
import { VideoCardRegistry } from "./Video_Card";

export const HardwareVirtualizationRegistry = {
  CPU: CPURegistry,
  GPU: GPURegistry,
  RAM: RAMRegistry,
  SoundCard: SoundCardRegistry,
  VideoCard: VideoCardRegistry,
  status: "ACTIVE_VIRTUALIZED"
};

export * from "./CPU";
export * from "./GPU";
export * from "./RAM";
export * from "./Sound_Card";
export * from "./Video_Card";
