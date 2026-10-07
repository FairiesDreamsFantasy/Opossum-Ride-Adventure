/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Opossum Ride Adventure - Master Logic Mirror
 * Tier: 75,000,000,000% Ultra-Broad Protection Standard
 */
export const CHARACTER_MIRROR = {
  MELISSA: {
    id: "melissa_opossum",
    name: "Melissa",
    height: "5'3\"",
    width: "36\"",
    length: "7'2\"",
    fur: "Light Gray",
    skin: "Alabaster Off-White",
    furryFace: 0,
    eyes: "Blue",
    nose: "Pink"
  },
  ASHLEY: {
    id: "ashley_opossum",
    name: "Ashley",
    height: "5'3\"",
    width: "38\"",
    length: "7'4\"",
    fur: "Brilliant Yellow",
    skin: "Alabaster Off-White",
    furryFace: 0,
    eyes: "Light Green",
    nose: "Pink"
  },
  WANDA: {
    id: "wanda_opossum",
    name: "Wanda Opossum",
    height: "5'2.9999\"",
    width: "36\"",
    length: "7'0\"",
    fur: "Light Amber",
    skin: "Dark-Brown",
    furryFace: 0.0001,
    eyes: "Indigo",
    nose: "Red"
  },
  SANDRA: {
    id: "sandra_opossum",
    name: "Sandra Opossum",
    height: "5'3\"",
    width: "38\"",
    length: "7'4\"",
    fur: "Lavender",
    skin: "Light Brown Face Skin",
    furryFace: 1.0,
    eyes: "Dark-Blue",
    nose: "Pink"
  },
  SAFFRON_ROSE: {
    id: "saffron_rose",
    name: "Saffron Rose",
    height: "5'11\"",
    width: "48\"",
    length: "7'11\"",
    fur: "Vibrant Red-Orange",
    skin: "Wheat Tan",
    furryFace: 0,
    eyes: "Emerald-Green",
    nose: "Red-Orange"
  },
  AMARA_QIN: {
    id: "amara_qin",
    name: "Amara Qin",
    height: "5'3\"",
    width: "36\"",
    length: "6'10\"",
    fur: "Pristine White",
    skin: "Pure White",
    furryFace: 0,
    eyes: "Clear Blue",
    nose: "Pink"
  },
  TIANA_QIN: {
    id: "tiana_qin",
    name: "Tiana Qin",
    height: "5'10\"",
    width: "38\"",
    length: "7'4\"",
    fur: "Striking Crimson Red",
    skin: "Light Caramel",
    furryFace: 0,
    eyes: "Bright Blue",
    nose: "Pink"
  },
  AGAPE_ROSE: {
    id: "agape_rose",
    name: "Agape Rose",
    height: "5'5\"",
    width: "42\"",
    length: "7'6.1\"",
    fur: "Rich Gold with pink circles",
    skin: "Honey Dark-Brown",
    furryFace: 0,
    eyes: "Light-Green",
    nose: "Dark-Pink"
  },
  JAHMELLA_ROSE: {
    id: "jahmella_rose",
    name: "Jahmella Rose",
    height: "6'0\"",
    width: "40\"",
    length: "8'3.5\"",
    fur: "Rich Orange with white circles",
    skin: "Tan / Light Brown",
    furryFace: 0,
    eyes: "Light-green",
    nose: "Red-Orange"
  },
  KADY_ROSE: {
    id: "kady_rose",
    name: "Kady Rose",
    height: "5'11\"",
    width: "48\"",
    length: "7'11\"",
    fur: "Light Gray with bronze ear circles",
    skin: "Honey Dark-Brown",
    furryFace: 0,
    eyes: "Light-green",
    nose: "Red-Orange"
  },
  JALISSA_CHIN: {
    id: "jalissa_chin",
    name: "Jalissa Chin",
    height: "5'1\"",
    width: "37.5\"",
    length: "7'0\"",
    fur: "Warm Yellow-Orange",
    skin: "Alabaster Off-White",
    furryFace: 0,
    eyes: "Dark-blue",
    nose: "Dark-pink"
  },
  OLIVIA_CHIN: {
    id: "olivia_chin",
    name: "Olivia Chin",
    height: "5'1\"",
    width: "38\"",
    length: "7'0\"",
    fur: "Distinctive Blond",
    skin: "Light Brown Face Skin",
    furryFace: 1.0,
    eyes: "Deep indigo",
    nose: "Reddish-brown"
  },
  DAGMAR_KONE_REYNOLDS: {
    id: "dagmar_kone_reynolds",
    name: "Dagmar Kone-Reynolds",
    height: "5'8.5\"",
    width: "40\"",
    length: "7'1\"",
    fur: "Pure White with multi-colored diamond patterns",
    skin: "Peach Apricot",
    furryFace: 0,
    eyes: "Light-green",
    nose: "Pink"
  },
  ROXANNE_KONE_REYNOLDS: {
    id: "roxanne_kone_reynolds",
    name: "Roxanne Kone-Reynolds",
    height: "6'0\"",
    width: "45\"",
    length: "8'0\"",
    fur: "Vivid Yellow with multi-colored diamonds",
    skin: "Dark Toffee",
    furryFace: 1.0,
    eyes: "Dark-blue",
    nose: "Bright-pink"
  },
  RUTH_KONE_REYNOLDS: {
    id: "ruth_kone_reynolds",
    name: "Ruth Kone-Reynolds",
    height: "6'0\"",
    width: "45\"",
    length: "8'0\"",
    fur: "Pink with 25-color flower motifs",
    skin: "Honey Dark-Brown",
    furryFace: 0,
    eyes: "Serene sky-blue",
    nose: "Light pink"
  },
  ARDEN_ROSIE_KONE_REYNOLDS: {
    id: "arden_rosie_kone_reynolds",
    name: "Arden-Rosie Kone-Reynolds",
    height: "5'1.5\"",
    width: "38\"",
    length: "6'6\"",
    fur: "Subtle Cream coat with geometric diamonds",
    skin: "Peach Apricot",
    furryFace: 0,
    eyes: "Light-blue",
    nose: "Dark-pink"
  }
};

export const PHYSICS_MIRROR = {
  GRAVITY: 9.80665,
  FRICTION: 0.05,
  AIR_RESISTANCE: 0.02,
  SURFACE_TYPES: ["Interior", "Exterior", "Grass", "Wood", "Metal", "Stone"],
  AUDIO_PITCH_OFFSETS: {
    AGAPE_ROSE: -0.04,
    ROXANNE_KONE_REYNOLDS: -0.01,
    TIANA_QIN: -0.03
  }
};

export const WORLD_MIRROR = {
  SKY_CYCLES: ["Day", "Midday", "Night"],
  TIME_SCALES: {
    DAY_LENGTH: 86400,
    TICK_RATE: 60
  }
};

