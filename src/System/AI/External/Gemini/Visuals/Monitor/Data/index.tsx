/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface VirtualMonitorState {
  width: number;
  height: number;
  refreshRate: number;
  activeFrameCount: number;
  fps: number;
  isMonitorActive: boolean;
}

export const DEFAULT_MONITOR_STATE: VirtualMonitorState = {
  width: 1920,
  height: 1080,
  refreshRate: 60,
  activeFrameCount: 0,
  fps: 60,
  isMonitorActive: true
};

export const MonitorData = {
  defaultState: DEFAULT_MONITOR_STATE
};
