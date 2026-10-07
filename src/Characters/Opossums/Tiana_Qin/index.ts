/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  drawTiana3D, 
  drawTiana2D, 
  getTianaPixelationSettings, 
  drawTianaPolygons 
} from "./Animations";
import { playTianaElegantChatter } from "./Sounds/Elegant_Chatter";

export const TianaQinOpossum = {
  draw3D: drawTiana3D,
  draw2D: drawTiana2D,
  getPixelationSettings: getTianaPixelationSettings,
  drawPolygons: drawTianaPolygons,
  playChatter: playTianaElegantChatter,
  metadata: {
    themeColor: "#ef4444",
    textColor: "text-red-300",
    particleColor: "rgba(239, 68, 68, 0.6)",
  }
};
