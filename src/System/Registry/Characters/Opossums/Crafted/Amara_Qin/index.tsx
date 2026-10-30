/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AmaraQinRegistryGeneral } from "./General";
import { AmaraQinRegistryDescription } from "./Description";
import { AmaraQinRegistryDimensions } from "./Description/Dimensions";

export const AmaraQinRegistry = {
  id: "amara_qin",
  name: "Amara",
  lastName: "Qin",
  General: AmaraQinRegistryGeneral,
  Description: AmaraQinRegistryDescription,
  Dimensions: AmaraQinRegistryDimensions
};

export default AmaraQinRegistry;
