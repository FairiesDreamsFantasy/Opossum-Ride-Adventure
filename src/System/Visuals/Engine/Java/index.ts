/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Java Object-Oriented Scene Tree & Node Hierarchy Engine
 */

export abstract class SceneNode {
  public children: SceneNode[] = [];
  constructor(public id: string, public name: string) {}

  public addChild(node: SceneNode): void {
    this.children.push(node);
  }

  public abstract render(context: any): void;
}

export class JavaVisualSceneTree {
  public root: SceneNode | null = null;

  public setRoot(node: SceneNode): void {
    this.root = node;
  }
}

export default JavaVisualSceneTree;
