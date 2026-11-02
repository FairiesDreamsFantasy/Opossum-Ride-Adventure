/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GenericFrogSynthesizer } from "../Frog";
import { GenericOwlSynthesizer } from "../Owl";
import { GenericOpossumSynthesizer } from "../Opossum";

export class GenericAnimalSFXEngine {
  public static frog = GenericFrogSynthesizer;
  public static owl = GenericOwlSynthesizer;
  public static opossum = GenericOpossumSynthesizer;
}

export const globalGenericAnimalSFXEngine = new GenericAnimalSFXEngine();
