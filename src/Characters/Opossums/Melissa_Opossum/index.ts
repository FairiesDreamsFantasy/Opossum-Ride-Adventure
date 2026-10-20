/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  drawMelissa3D, 
  drawMelissa2D, 
  getMelissaPixelationSettings, 
  drawMelissaPolygons 
} from "./Animations";
import { playMelissaElegantChatter } from "./Sounds/Elegant_Chatter";

export const MelissaOpossum = {
  draw3D: drawMelissa3D,
  draw2D: drawMelissa2D,
  getPixelationSettings: getMelissaPixelationSettings,
  drawPolygons: drawMelissaPolygons,
  playChatter: playMelissaElegantChatter,
  metadata: {
    themeColor: "#9ca3af",
    textColor: "text-slate-200",
    particleColor: "rgba(156, 163, 175, 0.4)",
  }
};
