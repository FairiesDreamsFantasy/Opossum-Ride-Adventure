/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Anti-Tobacco Ultra-High Potency Lexical Matrix & Clean-Air Models
 * Enforces the 1,000,000,000,000,000,000,000,000 x 1,000,000,000,000,000,000,000,000,000,000,000,000% Ultra-Broad Standard.
 */

export interface TobaccoPattern {
  id: string;
  category: "COMBUSTIBLE_TOBACCO" | "ELECTRONIC_VAPING" | "SMOKELESS_ORAL" | "PROMOTION_BRANDING";
  pattern: RegExp;
  description: string;
}

export const TOBACCO_PATTERNS: TobaccoPattern[] = [
  // 1. Combustible Tobacco
  {
    id: "TOBACCO_COMBUST_01",
    category: "COMBUSTIBLE_TOBACCO",
    pattern: /\b(?:tobacco|cigarette|cigar|cigarillo|kretek|bidi|pipe\s*tobacco|hookah|shisha|ashtray|tobacco\s*smoke|smoking\s*cigarette)\b/i,
    description: "Combustible tobacco products, cigarettes, cigars, and pipes."
  },
  // 2. Electronic Vaping & E-Cigarettes
  {
    id: "TOBACCO_VAPE_01",
    category: "ELECTRONIC_VAPING",
    pattern: /\b(?:vape|vaping|e-?cig(?:arette)?|juul|nicotine\s*salt|vape\s*juice|e-?liquid|puff\s*bar|disposable\s*vape|mod\s*tank)\b/i,
    description: "Electronic nicotine delivery systems, vapes, and e-liquids."
  },
  // 3. Smokeless & Oral Nicotine
  {
    id: "TOBACCO_SMOKELESS_01",
    category: "SMOKELESS_ORAL",
    pattern: /\b(?:chewing\s*tobacco|snus|snuff|nicotine\s*pouch|zonnic|zyn|dip\s*tobacco|tobacco\s*spit)\b/i,
    description: "Smokeless tobacco, snus, snuff, and oral nicotine pouches."
  },
  // 4. Tobacco Promotion & Branding Slang
  {
    id: "TOBACCO_BRANDING_01",
    category: "PROMOTION_BRANDING",
    pattern: /\b(?:marlboro|camel\s*cigarettes|newport|lucky\s*strike|pall\s*mall|vuse|iqos|tobacco\s*industry|smoke\s*break|pack\s*of\s*smokes)\b/i,
    description: "Tobacco corporate brands, marketing slang, and smoking promotions."
  },
  // 5. Multilingual Tobacco Terms
  {
    id: "TOBACCO_MULTILINGUAL_01",
    category: "COMBUSTIBLE_TOBACCO",
    pattern: /\b(?:tabaco|cigarrillo|fumar|tabac|cigarette|fumer|tabak|zigarette|rauchen|табак|сигарета|курение|烟草|香烟|吸烟|タバコ|煙草|喫煙|담배|흡연)\b/i,
    description: "Multilingual tobacco, smoking, and cigarette terminology."
  }
];

export interface CleanAirAtmosphericProfile {
  particulateMatter25UgM3: 0; // Strictly 0 ug/m3
  carbonMonoxidePpm: 0; // Strictly 0 ppm
  cleanAirOxygenPercent: 20.95; // Earth pure sea level oxygen
  negativeIonConcentrationPerCm3: 2500; // Fresh mountain / forest waterfall air
  airDensityKgM3: 1.225; // Standard pristine atmosphere
  reclaimedTobaccoRelicsTransformed: string[];
}

export const PRISTINE_CLEAN_AIR_PROFILE: CleanAirAtmosphericProfile = {
  particulateMatter25UgM3: 0,
  carbonMonoxidePpm: 0,
  cleanAirOxygenPercent: 20.95,
  negativeIonConcentrationPerCm3: 2500,
  airDensityKgM3: 1.225,
  reclaimedTobaccoRelicsTransformed: [
    "Cigarette filters shredded and carbonized into HEPA particulate air scrubbers",
    "Discarded vape lithium cells recycled into solar emergency trail lighting",
    "E-cigarette atomizers converted into clean botanical fresh-water mist humidifiers",
    "Tobacco plant biomass cold-composted with mycorrhizal fungi into non-combustible soil nutrients"
  ]
};
