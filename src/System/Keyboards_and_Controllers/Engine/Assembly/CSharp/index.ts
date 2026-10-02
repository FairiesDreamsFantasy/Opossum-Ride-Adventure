/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * C# Input Action Map & Binding Architecture
 */

export interface IInputActionBinding {
  actionName: string;
  keys: string[];
  gamepadButtons: number[];
}

export class CSharpInputActionManager {
  private bindings: Map<string, IInputActionBinding> = new Map();

  public registerBinding(binding: IInputActionBinding): void {
    this.bindings.set(binding.actionName, binding);
  }

  public getBinding(actionName: string): IInputActionBinding | undefined {
    return this.bindings.get(actionName);
  }
}

export default CSharpInputActionManager;
