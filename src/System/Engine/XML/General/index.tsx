/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - XML Hierarchical DOM Tree & XPath Elements
 * Protection Standard: 75,000,000,000% Ultra-Broad Protection Standard
 * Standard: XML tree nodes, XPath queries, and XSD Schema validations
 */

export interface XmlNode {
  tag: string;
  attributes: Record<string, string>;
  children: XmlNode[];
  text: string;
  parent: XmlNode | null;
}

export interface XsdSchemaAttribute {
  name: string;
  type: "string" | "decimal" | "boolean";
  required: boolean;
}

export interface XsdSchemaRule {
  tag: string;
  attributes: XsdSchemaAttribute[];
  requiredChildren: string[];
}

export class XmlTreeUtils {
  /**
   * Evaluates a simple XPath-style search query (e.g. "/World/Building/Stairs[@surface='concrete']")
   */
  public static evaluateXPath(root: XmlNode, path: string): XmlNode[] {
    const parts = path.split("/").filter(p => p !== "");
    let currentNodes: XmlNode[] = [root];

    for (const part of parts) {
      let tag = part;
      let attrName: string | null = null;
      let attrVal: string | null = null;

      // Check if tag contains attributes filter: tag[@attr='val']
      if (part.includes("[") && part.endsWith("]")) {
        const bracketIdx = part.indexOf("[");
        tag = part.substring(0, bracketIdx);
        const attrExpr = part.substring(bracketIdx + 2, part.length - 2); // slice [@attr='val']
        const eqIdx = attrExpr.indexOf("=");
        if (eqIdx !== -1) {
          attrName = attrExpr.substring(0, eqIdx).replace("@", "").trim();
          attrVal = attrExpr.substring(eqIdx + 1).replace(/['"]/g, "").trim();
        }
      }

      const nextNodes: XmlNode[] = [];
      for (const node of currentNodes) {
        for (const child of node.children) {
          if (child.tag === tag) {
            if (attrName && attrVal) {
              if (child.attributes[attrName] === attrVal) {
                nextNodes.push(child);
              }
            } else {
              nextNodes.push(child);
            }
          }
        }
      }
      currentNodes = nextNodes;
    }

    return currentNodes;
  }
}
