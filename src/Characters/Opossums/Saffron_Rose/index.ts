/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  drawSaffron3D, 
  drawSaffron2D, 
  getSaffronPixelationSettings, 
  drawSaffronPolygons 
} from "./Animations";
import { playSaffronElegantChatter } from "./Sounds/Elegant_Chatter";

export const SaffronRoseOpossum = {
  draw3D: drawSaffron3D,
  draw2D: drawSaffron2D,
  getPixelationSettings: getSaffronPixelationSettings,
  drawPolygons: drawSaffronPolygons,
  playChatter: playSaffronElegantChatter,
  metadata: {
    themeColor: "#ff5f1f",
    textColor: "text-orange-200",
    particleColor: "rgba(255, 95, 31, 0.5)",
  }
};
