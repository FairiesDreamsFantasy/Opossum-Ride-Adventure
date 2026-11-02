/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  drawAmara3D, 
  drawAmara2D, 
  getAmaraPixelationSettings, 
  drawAmaraPolygons 
} from "./Animations";
import { playAmaraElegantChatter } from "./Sounds/Elegant_Chatter";
import { AMARA_QIN_UNITS } from "./Units";

export const AmaraQinOpossum = {
  draw3D: drawAmara3D,
  draw2D: drawAmara2D,
  getPixelationSettings: getAmaraPixelationSettings,
  drawPolygons: drawAmaraPolygons,
  playChatter: playAmaraElegantChatter,
  units: AMARA_QIN_UNITS,
  metadata: {
    themeColor: "#ffffff",
    textColor: "text-slate-100",
    particleColor: "rgba(255, 255, 255, 0.6)",
  }
};

export { AMARA_QIN_UNITS };

