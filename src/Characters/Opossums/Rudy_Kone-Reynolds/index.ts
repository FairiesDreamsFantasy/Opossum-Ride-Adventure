/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RudyProfile } from './profile';
import { RUDY_KONE_REYNOLDS_DESCRIPTION, parts } from './Description';
import { RUDY_KONE_REYNOLDS_DIMENSIONS } from './Description/Dimensions';
import { RudyKoneReynoldsGeneral } from './General';

export * from './profile';
export * from './General';
export * from './Description';
export * from './Animations';

export const RudyKoneReynolds = {
  ...RudyProfile,
  description: RUDY_KONE_REYNOLDS_DESCRIPTION,
  dimensions: RUDY_KONE_REYNOLDS_DIMENSIONS,
  general: RudyKoneReynoldsGeneral,
  parts
};

export default RudyKoneReynolds;
