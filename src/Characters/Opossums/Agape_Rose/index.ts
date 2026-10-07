/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  drawAgape3D, 
  drawAgape2D, 
  getAgapePixelationSettings, 
  drawAgapePolygons 
} from "./Animations";
import { playAgapeElegantChatter } from "./Sounds/Elegant_Chatter";

export const AgapeRoseOpossum = {
  draw3D: drawAgape3D,
  draw2D: drawAgape2D,
  getPixelationSettings: getAgapePixelationSettings,
  drawPolygons: drawAgapePolygons,
  playChatter: playAgapeElegantChatter,
  metadata: {
    themeColor: "#ffd700",
    textColor: "text-amber-300",
    particleColor: "rgba(255, 215, 0, 0.6)",
  }
};
