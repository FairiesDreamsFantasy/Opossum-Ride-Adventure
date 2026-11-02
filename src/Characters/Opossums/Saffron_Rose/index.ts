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
import { SAFFRON_ROSE_UNITS } from "./Units";

export const SaffronRoseOpossum = {
  draw3D: drawSaffron3D,
  draw2D: drawSaffron2D,
  getPixelationSettings: getSaffronPixelationSettings,
  drawPolygons: drawSaffronPolygons,
  playChatter: playSaffronElegantChatter,
  Units: SAFFRON_ROSE_UNITS,
  metadata: {
    themeColor: "#ff5f1f",
    textColor: "text-orange-200",
    particleColor: "rgba(255, 95, 31, 0.5)",
  }
};

export { SAFFRON_ROSE_UNITS };

