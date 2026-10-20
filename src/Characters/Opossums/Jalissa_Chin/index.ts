/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  drawJalissa3D, 
  drawJalissa2D, 
  getJalissaPixelationSettings, 
  drawJalissaPolygons 
} from "./Animations";
import { playJalissaElegantChatter } from "./Sounds/Elegant_Chatter";

export const JalissaChinOpossum = {
  draw3D: drawJalissa3D,
  draw2D: drawJalissa2D,
  getPixelationSettings: getJalissaPixelationSettings,
  drawPolygons: drawJalissaPolygons,
  playChatter: playJalissaElegantChatter,
  metadata: {
    themeColor: "#ff9933",
    textColor: "text-orange-100",
    particleColor: "rgba(255, 153, 51, 0.5)",
  }
};
