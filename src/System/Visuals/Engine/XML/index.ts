/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * XML Scene Graph & Layout Descriptor Parser Engine
 */

export interface XMLVisualNode {
  tag: string;
  attributes: Record<string, string>;
  children: XMLVisualNode[];
  content?: string;
}

export class XMLVisualLayoutParser {
  public static createNode(tag: string, attributes: Record<string, string> = {}): XMLVisualNode {
    return { tag, attributes, children: [] };
  }

  public static toXMLString(node: XMLVisualNode, indent: number = 0): string {
    const spaces = " ".repeat(indent);
    const attrs = Object.entries(node.attributes)
      .map(([k, v]) => `${k}="${v}"`)
      .join(" ");
    const attrStr = attrs ? ` ${attrs}` : "";
    if (node.children.length === 0 && !node.content) {
      return `${spaces}<${node.tag}${attrStr}/>`;
    }
    const childStr = node.children.map((c) => this.toXMLString(c, indent + 2)).join("\n");
    return `${spaces}<${node.tag}${attrStr}>\n${childStr}\n${spaces}</${node.tag}>`;
  }
}

export default XMLVisualLayoutParser;
