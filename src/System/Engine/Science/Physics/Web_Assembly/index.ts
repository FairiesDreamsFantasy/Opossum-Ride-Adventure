/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// @ts-ignore
import { generateScientificWasmBinary } from "../../../../../../scripts/generate_wasm.js";

export class PhysicsWasmBridge {
  private static instance: WebAssembly.Instance | null = null;

  public static async init(): Promise<void> {
    if (this.instance) return;
    const binary = generateScientificWasmBinary();
    const result = await WebAssembly.instantiate(binary);
    this.instance = result.instance;
  }

  public static getExports(): any {
    return this.instance?.exports || {};
  }
}
