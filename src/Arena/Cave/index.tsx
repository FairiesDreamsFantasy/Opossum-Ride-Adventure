/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RastaCave } from "./Rasta-Cave";
import { RainbowTileCave } from "./Rainbow_Tile_Cave";

export const CaveArena = {
  "id": "cave",
  "name": "The Echoing Mossy Grotto",
  "displayName": "The Echoing Mossy Grotto",
  "description": "A dark, deep cavern with damp stone walls and rich, atmospheric acoustic caves.",
  "surfaceType": "wet limestone cavern floor",
  "footstepSound": "hollow stone clatter",
  "colorBase": "#1e293b",
  "ambientNoise": "ambient deep cave wind",
  "lightingLevel": 0.5,
  "skyColor": "#090d16",
  "horizonColor": "#0f172a",
  "frameColor": "#334155",
  "groundColor": "#0f172a",
  SubArenas: {
    RastaCave,
    RainbowTileCave
  }
};

export { RastaCave, RainbowTileCave };
export default CaveArena;
