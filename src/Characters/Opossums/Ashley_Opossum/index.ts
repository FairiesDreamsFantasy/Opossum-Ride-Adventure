/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  drawAshley3D, 
  drawAshley2D, 
  getAshleyPixelationSettings, 
  drawAshleyPolygons 
} from "./Animations";
import { playAshleyElegantChatter } from "./Sounds/Elegant_Chatter";

export const AshleyOpossum = {
  draw3D: drawAshley3D,
  draw2D: drawAshley2D,
  getPixelationSettings: getAshleyPixelationSettings,
  drawPolygons: drawAshleyPolygons,
  playChatter: playAshleyElegantChatter,
  metadata: {
    themeColor: "#eab308",
    textColor: "text-yellow-200",
    particleColor: "rgba(234, 179, 8, 0.4)",
  }
};
