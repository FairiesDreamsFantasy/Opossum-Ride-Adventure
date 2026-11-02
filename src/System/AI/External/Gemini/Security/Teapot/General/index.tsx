/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface GeminiTeapotConfigModel {
  rfcCode: 418;
  teapotStandard: "RFC_2324_AND_UTAH_TEAPOT_MATHEMATICAL_MODEL";
  friendlyDecoyActive: boolean;
  harmlessDecoyMessage: string;
}

export const GeminiTeapotGeneralConfig: GeminiTeapotConfigModel = {
  rfcCode: 418,
  teapotStandard: "RFC_2324_AND_UTAH_TEAPOT_MATHEMATICAL_MODEL",
  friendlyDecoyActive: true,
  harmlessDecoyMessage: "418 I'm a teapot: Brewing a warm, fresh cup of herbal tea for our human opossum riders."
};
