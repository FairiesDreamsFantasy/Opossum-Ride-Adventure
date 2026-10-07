/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  drawDagmar3D, 
  drawDagmar2D, 
  getDagmarPixelationSettings, 
  drawDagmarPolygons 
} from "./Animations";
import { playDagmarElegantChatter } from "./Sounds/Elegant_Chatter";

export const DagmarKoneReynoldsOpossum = {
  draw3D: drawDagmar3D,
  draw2D: drawDagmar2D,
  getPixelationSettings: getDagmarPixelationSettings,
  drawPolygons: drawDagmarPolygons,
  playChatter: playDagmarElegantChatter,
  metadata: {
    themeColor: "#ffffff",
    textColor: "text-zinc-600",
    particleColor: "rgba(255, 255, 255, 0.4)",
  }
};
