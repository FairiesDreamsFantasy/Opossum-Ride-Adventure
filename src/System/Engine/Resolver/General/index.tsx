/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PlaceResolver } from "../Place";

export class EngineResolverGeneralCore {
  public static readonly systemName = "Engine Resolver General Core";

  public static readonly Place = PlaceResolver;
}

export const EngineResolverGeneral = {
  systemName: EngineResolverGeneralCore.systemName,
  Place: PlaceResolver,
};
