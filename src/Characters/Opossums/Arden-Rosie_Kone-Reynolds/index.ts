/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  drawArdenRosie3D, 
  drawArdenRosie2D, 
  getArdenRosiePixelationSettings, 
  drawArdenRosiePolygons 
} from "./Animations";
import { playArdenRosieElegantChatter } from "./Sounds/Elegant_Chatter";
import { ARDEN_ROSIE_UNITS } from "./Units";

export const ArdenRosieOpossum = {
  draw3D: drawArdenRosie3D,
  draw2D: drawArdenRosie2D,
  getPixelationSettings: getArdenRosiePixelationSettings,
  drawPolygons: drawArdenRosiePolygons,
  playChatter: playArdenRosieElegantChatter,
  Units: ARDEN_ROSIE_UNITS,
  metadata: {
    themeColor: "#fff7ed",
    textColor: "text-orange-100",
    particleColor: "rgba(255, 247, 237, 0.4)",
  }
};

export { ARDEN_ROSIE_UNITS };

