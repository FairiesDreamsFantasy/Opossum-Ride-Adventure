/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Animations3D } from "./3-D";
import { Animations2D } from "./2-D";
import { AnimationsPolygons } from "./Polygons";
import { AnimationsPixelations } from "./Pixelations";
import { AnimationsGeometry } from "./Geometry";
import { AnimationsColorPalette } from "./Color_Palette";
import { AnimationsText } from "./Text";

export { Animations3D } from "./3-D";
export { Animations2D } from "./2-D";
export { AnimationsPolygons } from "./Polygons";
export { AnimationsPixelations } from "./Pixelations";
export { AnimationsGeometry } from "./Geometry";
export { AnimationsColorPalette } from "./Color_Palette";
export { AnimationsText } from "./Text";

export const GeminiAnimations = {
  ThreeD: Animations3D,
  TwoD: Animations2D,
  Polygons: AnimationsPolygons,
  Pixelations: AnimationsPixelations,
  Geometry: AnimationsGeometry,
  ColorPalette: AnimationsColorPalette,
  Text: AnimationsText
};
export default GeminiAnimations;
