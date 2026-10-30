/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArdenRosieKoneReynoldsRegistryGeneral } from "./General";
import { ArdenRosieRegistryDescription } from "./Description";
import { ArdenRosieRegistryDimensions } from "./Description/Dimensions";
import { ARDEN_ROSIE_UNITS } from "../../../../../../Characters/Opossums/Arden-Rosie_Kone-Reynolds/Units";

export const ArdenRosieKoneReynoldsRegistry = {
  id: "arden_rosie",
  name: "Arden-Rosie",
  lastName: "Kone-Reynolds",
  General: ArdenRosieKoneReynoldsRegistryGeneral,
  Description: ArdenRosieRegistryDescription,
  Dimensions: ArdenRosieRegistryDimensions,
  Units: ARDEN_ROSIE_UNITS
};

export default ArdenRosieKoneReynoldsRegistry;

