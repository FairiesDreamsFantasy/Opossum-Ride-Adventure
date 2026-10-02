/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FeralPigManager } from "../Feral/General";
import { GenericPigSynthesizerMaster } from "../Sounds/Synthesizer";

export class PigsMasterModule {
  public static Manager = FeralPigManager;
  public static Synthesizer = GenericPigSynthesizerMaster;
}
