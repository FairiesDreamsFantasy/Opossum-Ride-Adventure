/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - System Physics & Math Engine JS Module Asset
 */

export const ENGINE_ASSET_METADATA = {
  wasmBridge: "PhysicsWasmBridge",
  rk4Integration: true,
  precision: "64-Bit Float"
};

export function getEngineAssetSummary() {
  return "64-bit RK4 trajectory suspension math and WebAssembly C compute engine.";
}
