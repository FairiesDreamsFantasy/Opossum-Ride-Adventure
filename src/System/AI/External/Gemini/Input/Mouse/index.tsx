/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Point2D } from "../../Engine/Mathematics";

/**
 * Advanced Mouse coordinate capturing.
 */
export const InputMouse = {
  /**
   * Translates client mouse click location into localized canvas bounds coordinate.
   */
  getRelativeCanvasCoords(clientX: number, clientY: number, canvasBounds: DOMRect): Point2D {
    return {
      x: clientX - canvasBounds.left,
      y: clientY - canvasBounds.top
    };
  }
};
