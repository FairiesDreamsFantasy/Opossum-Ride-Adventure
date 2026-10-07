/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { KeyboardLayoutType } from "../../../../../types";

export interface KeyboardCommandCategory {
  category: string;
  commands: {
    key: string;
    description: string;
    notes?: string;
  }[];
}

export const KEYBOARD_MODAL_METADATA = {
  title: "Keyboard Shortcuts & Controls",
  subtitle: "Cedella & Arden Denis Layout Specifications (v0.1.0.7.1)",
  version: "0.1.0.7.1"
};

export const CEDELLA_COMMANDS_DATA: KeyboardCommandCategory[] = [
  {
    category: "Movement & Steering",
    commands: [
      { key: "Up Arrow", description: "Move Forward / Accelerate" },
      { key: "Down Arrow", description: "Move Reverse / Brake" },
      { key: "Left Arrow", description: "Strafe Left / Turn Left" },
      { key: "Right Arrow", description: "Strafe Right / Turn Right" },
      { key: "Space", description: "Jump / Hop Obstacle" },
      { key: "] / [", description: "Increase / Decrease Cruise Speed", notes: "'0' to Stop Cruise" }
    ]
  },
  {
    category: "Opossum Vocalization & Scan",
    commands: [
      { key: "S", description: "Opossum Elegant Chatter", notes: "Triggers local synthesis vocalization" },
      { key: "O", description: "Scan Opponents & Wildlife", notes: "Scans for Moose, Monkeys, and Feral Pigs" },
      { key: "R", description: "Announce Ridden Opossum", notes: "Narrates active opossum physical traits" },
      { key: "Shift + 1 (!)", description: "Toggle Chatter Notifications", notes: "On/Off spoken chatter alerts" }
    ]
  },
  {
    category: "Perspective & Display",
    commands: [
      { key: "T", description: "Toggle POV / Rider Perspective" },
      { key: "3", description: "Announce HUD Information", notes: "Distance, speed, score, collected items" },
      { key: "4", description: "Toggle Measurement Unit", notes: "Imperial (feet) vs Metric (meters)" },
      { key: "Shift + 2 (@)", description: "Toggle Live Status Feed Log" }
    ]
  },
  {
    category: "Global Accessibility & Pause",
    commands: [
      { key: "Control (Ctrl)", description: "Instant Speech Silence", notes: "Cancels all active screen-reader narration" },
      { key: "Shift-Z-Z", description: "Toggle Text-to-Speech", notes: "Rapid double Shift+Z toggle" },
      { key: "Shift + 7 (&)", description: "Pause / Resume Game" }
    ]
  }
];

export const ARDEN_DENIS_COMMANDS_DATA: KeyboardCommandCategory[] = [
  {
    category: "WASD Movement & Steering",
    commands: [
      { key: "W", description: "Move Forward / Accelerate" },
      { key: "S", description: "Move Reverse / Brake" },
      { key: "A", description: "Strafe Left / Turn Left" },
      { key: "D", description: "Strafe Right / Turn Right" },
      { key: "Space", description: "Jump / Hop Obstacle" },
      { key: "I / K", description: "Increase / Decrease Cruise Speed" }
    ]
  },
  {
    category: "Opossum Vocalization & Scan",
    commands: [
      { key: "L", description: "Opossum Elegant Chatter", notes: "Calibrated key for chatter (prevents collision with 'S' reverse!)" },
      { key: "O", description: "Scan Opponents & Wildlife", notes: "Scans for Moose, Monkeys, and Feral Pigs" },
      { key: "R", description: "Announce Ridden Opossum", notes: "Narrates active opossum physical traits" },
      { key: "Shift + 1 (!)", description: "Toggle Chatter Notifications", notes: "On/Off spoken chatter alerts" }
    ]
  },
  {
    category: "Perspective & Display",
    commands: [
      { key: "T", description: "Toggle POV / Rider Perspective" },
      { key: "3", description: "Announce HUD Information", notes: "Distance, speed, score, collected items" },
      { key: "4", description: "Toggle Measurement Unit", notes: "Imperial (feet) vs Metric (meters)" },
      { key: "Shift + 2 (@)", description: "Toggle Live Status Feed Log" }
    ]
  },
  {
    category: "Global Accessibility & Pause",
    commands: [
      { key: "Control (Ctrl)", description: "Instant Speech Silence", notes: "Cancels all active screen-reader narration" },
      { key: "Shift-Z-Z", description: "Toggle Text-to-Speech", notes: "Rapid double Shift+Z toggle" },
      { key: "Shift + 7 (&)", description: "Pause / Resume Game" }
    ]
  }
];
