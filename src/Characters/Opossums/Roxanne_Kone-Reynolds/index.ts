/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  drawRoxanne3D, 
  drawRoxanne2D, 
  getRoxannePixelationSettings, 
  drawRoxannePolygons 
} from "./Animations";
import { playRoxanneElegantChatter } from "./Sounds/Elegant_Chatter";

export const RoxanneKoneReynoldsOpossum = {
  draw3D: drawRoxanne3D,
  draw2D: drawRoxanne2D,
  getPixelationSettings: getRoxannePixelationSettings,
  drawPolygons: drawRoxannePolygons,
  playChatter: playRoxanneElegantChatter,
  metadata: {
    themeColor: "#facc15",
    textColor: "text-yellow-300",
    particleColor: "rgba(250, 204, 21, 0.6)",
  }
};
