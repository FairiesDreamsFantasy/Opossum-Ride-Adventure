/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArdenRosieKoneReynoldsRegistryGeneral } from "./General";
import { ArdenRosieRegistryDescription } from "./Description";
import { ArdenRosieRegistryDimensions } from "./Description/Dimensions";

export const ArdenRosieKoneReynoldsRegistry = {
  id: "arden_rosie",
  name: "Arden-Rosie",
  lastName: "Kone-Reynolds",
  General: ArdenRosieKoneReynoldsRegistryGeneral,
  Description: ArdenRosieRegistryDescription,
  Dimensions: ArdenRosieRegistryDimensions
};

export default ArdenRosieKoneReynoldsRegistry;
