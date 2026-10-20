/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface OrchestrationTask {
  id: string;
  priority: number;
  dependencyId?: string;
  status: "pending" | "executing" | "complete" | "error";
}

export const SYSTEM_ORCHESTRATION_LOAD_ORDER: OrchestrationTask[] = [
  { id: "HARDWARE", priority: 1, status: "pending" },
  { id: "SOUND_SYNTH", priority: 2, dependencyId: "HARDWARE", status: "pending" },
  { id: "VISUAL_ENGINE", priority: 3, status: "pending" },
  { id: "AI_CONTEXT", priority: 4, dependencyId: "SOUND_SYNTH", status: "pending" }
];
