/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TabControlItem {
  id: "feral_pigs" | "monkeys" | "moose" | "obstacles" | "opossums";
  label: string;
}

export const SOUND_TABS_CONFIG: TabControlItem[] = [
  { id: "feral_pigs", label: "Feral Pigs" },
  { id: "monkeys", label: "Monkeys" },
  { id: "moose", label: "Moose" },
  { id: "obstacles", label: "Obstacles" },
  { id: "opossums", label: "Opossums" }
];

