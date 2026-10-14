/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  drawJahmellaRose3D, 
  drawJahmellaRose2D, 
  getJahmellaPixelationSettings, 
  drawJahmellaPolygons 
} from "./Animations";
import { playJahmellaElegantChatter } from "./Sounds/Elegant_Chatter";

export const JahmellaRoseOpossum = {
  draw3D: drawJahmellaRose3D,
  draw2D: drawJahmellaRose2D,
  getPixelationSettings: getJahmellaPixelationSettings,
  drawPolygons: drawJahmellaPolygons,
  playChatter: playJahmellaElegantChatter,
  metadata: {
    themeColor: "#f97316",
    textColor: "text-orange-600",
    particleColor: "rgba(249, 115, 22, 0.4)",
  }
};
