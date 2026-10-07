/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * C# Component Entity & Property Struct Simulator
 */

export interface IVisualComponent {
  id: string;
  isEnabled: boolean;
  update(deltaTime: number): void;
}

export class CSharpVisualEntityManager {
  private components: Map<string, IVisualComponent> = new Map();

  public registerComponent(comp: IVisualComponent): void {
    this.components.set(comp.id, comp);
  }

  public updateAll(deltaTime: number): void {
    this.components.forEach((c) => {
      if (c.isEnabled) c.update(deltaTime);
    });
  }
}

export default CSharpVisualEntityManager;
