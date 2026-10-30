/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const OpossumsAttributesDesign = {
  /**
   * 1. Skin_Color
   * Lists opossums with skin colors grouped by root skin color and specific tones.
   */
  Skin_Color: {
    Alabaster: {
      off_white: { hex: "#f9fafb", label: "Alabaster Off-White", opossums: ["melissa", "ashley", "jalissa_chin"] },
      cream: { hex: "#fffdd0", label: "Cream", opossums: ["safford_chin"] }
    },
    White: {
      pure_white: { hex: "#ffffff", label: "Pure White", opossums: ["amara_qin"] }
    },
    Peach_Apricot: {
      apricot: { hex: "#ffedd5", label: "Peach Apricot", opossums: ["dagmar_kone_reynolds", "arden_rosie_kone_reynolds", "drake_kone_reynolds", "rudy_kone_reynolds", "eugene_rose"] },
      peach_yellow: { hex: "#ffe8cc", label: "Peach with a Yellowish Hue", opossums: ["melvin_qin"] }
    },
    Tan_Caramel: {
      tan: { hex: "#d2b48c", label: "Tan / Light Brown", opossums: ["jahmella_rose"] },
      light_caramel: { hex: "#d97706", label: "Light Caramel", opossums: ["tiana_qin"] },
      wheat_tan: { hex: "#f5deb3", label: "Wheat Tan", opossums: ["saffron_rose"] },
      light_brown: { hex: "#8d5524", label: "Light Brown Face Skin", opossums: ["olivia_chin", "sandra"] }
    },
    Honey_Dark_Brown: {
      honey_dark_brown: { hex: "#5c3d2e", label: "Honey Dark-Brown", opossums: ["agape_rose", "wanda", "ruth_kone_reynolds", "kady_rose"] }
    },
    Dark_Toffee: {
      dark_toffee: { hex: "#3f271d", label: "Dark Toffee", opossums: ["roxanne_kone_reynolds"] }
    },
    getByOpossumId(id: string) {
      if (["melissa", "ashley", "jalissa_chin"].includes(id)) return { root: "Alabaster", tone: "off_white" };
      if (["safford_chin"].includes(id)) return { root: "Alabaster", tone: "cream" };
      if (["amara_qin"].includes(id)) return { root: "White", tone: "pure_white" };
      if (["melvin_qin"].includes(id)) return { root: "Peach_Apricot", tone: "peach_yellow" };
      if (["dagmar_kone_reynolds", "arden_rosie_kone_reynolds", "drake_kone_reynolds", "rudy_kone_reynolds", "eugene_rose", "daisy_rose", "arnold_rose"].includes(id)) return { root: "Peach_Apricot", tone: "apricot" };
      if (["jahmella_rose", "callie_rose", "stacey_jasmin"].includes(id)) return { root: "Tan_Caramel", tone: "tan" };
      if (["tiana_qin"].includes(id)) return { root: "Tan_Caramel", tone: "light_caramel" };
      if (["saffron_rose"].includes(id)) return { root: "Tan_Caramel", tone: "wheat_tan" };
      if (["olivia_chin", "sandra"].includes(id)) return { root: "Tan_Caramel", tone: "light_brown" };
      if (["agape_rose", "wanda", "ruth_kone_reynolds", "kady_rose"].includes(id)) return { root: "Honey_Dark_Brown", tone: "honey_dark_brown" };
      if (["roxanne_kone_reynolds"].includes(id)) return { root: "Dark_Toffee", tone: "dark_toffee" };
      return { root: "Alabaster", tone: "off_white" }; // default
    }
  },

  /**
   * 2. With_Patterns
   * Houses lookup for opossums with pattern designs.
   */
  With_Patterns: {
    diamond_pattern: { label: "Diamond Pattern", opossums: ["dagmar_kone_reynolds", "arden_rosie_kone_reynolds", "roxanne_kone_reynolds"] },
    circle_pattern: { label: "Circle Pattern", opossums: ["jahmella_rose", "agape_rose", "rudy_kone_reynolds", "callie_rose"] },
    flower_pattern: { label: "25-color Flower Pattern", opossums: ["ruth_kone_reynolds", "daisy_rose"] },
    stripe_pattern: { label: "7 Silver Stripes Pattern", opossums: ["drake_kone_reynolds"] },
    saddle_pattern: { label: "Yellow Saddle Beagle Pattern", opossums: ["stacey_jasmin"] },
    spotted_pattern: { label: "Matte Dark-Brown Ovals Spotted Dog Pattern", opossums: ["arnold_rose"] },
    none: { label: "Plain / Solid No Pattern", opossums: ["melissa", "ashley", "amara_qin", "saffron_rose", "jalissa_chin", "tiana_qin", "wanda", "olivia_chin", "kady_rose", "sandra", "eugene_rose", "melvin_qin", "safford_chin"] },
    getByOpossumId(id: string) {
      if (["dagmar_kone_reynolds", "arden_rosie_kone_reynolds", "roxanne_kone_reynolds"].includes(id)) return "diamond_pattern";
      if (["jahmella_rose", "agape_rose", "rudy_kone_reynolds", "callie_rose"].includes(id)) return "circle_pattern";
      if (["ruth_kone_reynolds", "daisy_rose"].includes(id)) return "flower_pattern";
      if (["drake_kone_reynolds"].includes(id)) return "stripe_pattern";
      if (["stacey_jasmin"].includes(id)) return "saddle_pattern";
      if (["arnold_rose"].includes(id)) return "spotted_pattern";
      return "none";
    }
  },

  /**
   * 3. Fur_Color
   * Lookup for body fur colors.
   */
  Fur_Color: {
    melissa: "Light Gray",
    ashley: "Yellow",
    amara_qin: "White",
    saffron_rose: "Red-Orange",
    jalissa_chin: "Yellow-Orange",
    dagmar_kone_reynolds: "White with multi-colored diamond pattern",
    arden_rosie_kone_reynolds: "Cream with diamond patterns",
    jahmella_rose: "Orange with white circles",
    agape_rose: "Gold with pink circles bordered in purple",
    roxanne_kone_reynolds: "Yellow with red-orange bordered multi-colored diamonds",
    tiana_qin: "Red",
    wanda: "Light Amber",
    olivia_chin: "Blond",
    ruth_kone_reynolds: "Pink with 25-color flower pattern",
    kady_rose: "Light Gray",
    sandra: "Lavender",
    drake_kone_reynolds: "Red with 7 silver stripes",
    rudy_kone_reynolds: "Yellow with brown circles",
    eugene_rose: "Light-Gray",
    daisy_rose: "Pink with 4-inch yellow daisy flowers surrounded by blue borders",
    callie_rose: "Yellowish-gold with 4.5-inch blue circles with indigo borders",
    stacey_jasmin: "Purple base with yellow saddle beagle pattern",
    arnold_rose: "Matte white base with dark-brown ovals spotted dog pattern",
    melvin_qin: "Light-tan",
    safford_chin: "Light-Blue",
    getByOpossumId(id: string): string {
      return (this as any)[id] || "Light Gray";
    }
  },

  /**
   * 4. Tail_Color
   * For looking up tail colors.
   */
  Tail_Color: {
    melissa: "Pink",
    ashley: "Pink",
    amara_qin: "Pink",
    saffron_rose: "Gold",
    jalissa_chin: "Dark-Pink",
    dagmar_kone_reynolds: "Pink",
    arden_rosie_kone_reynolds: "Deep Pink",
    jahmella_rose: "Deep Pink",
    agape_rose: "Deep Pink",
    roxanne_kone_reynolds: "Pink",
    tiana_qin: "Pink",
    wanda: "Red",
    olivia_chin: "Reddish-Brown",
    ruth_kone_reynolds: "Pink",
    kady_rose: "Red-Orange",
    sandra: "Pink",
    drake_kone_reynolds: "Red",
    rudy_kone_reynolds: "Deep Brown",
    eugene_rose: "Pink",
    daisy_rose: "Pink with Light-Yellow spiral design",
    callie_rose: "Red Gold",
    stacey_jasmin: "Dark-Pink",
    arnold_rose: "Pink",
    melvin_qin: "Brown",
    safford_chin: "Black",
    getByOpossumId(id: string): string {
      return (this as any)[id] || "Pink";
    }
  },

  /**
   * 5. Tail_Color_With_Design
   * Lookup for tail colors with designs.
   */
  Tail_Color_With_Design: {
    saffron_rose: "Gold with pink wrap-around spiral pattern",
    dagmar_kone_reynolds: "Pink with silver wrap-around spiral pattern",
    jahmella_rose: "Deep Pink with gold wrap-around spiral pattern",
    agape_rose: "Deep Pink with 2% gold fur layer",
    roxanne_kone_reynolds: "Pink with 0.0001% yellow fur",
    drake_kone_reynolds: "Red with 5% fur layer",
    rudy_kone_reynolds: "Deep Brown with 7.128% fur layer",
    eugene_rose: "Pink",
    daisy_rose: "Pink with Light-Yellow 1.44cm spiral design",
    callie_rose: "Red Gold",
    stacey_jasmin: "Dark-Pink",
    arnold_rose: "Pink",
    melvin_qin: "Solid Brown",
    safford_chin: "Solid Black",
    getByOpossumId(id: string): string {
      return (this as any)[id] || "Plain Solid";
    }
  },

  /**
   * 6. Nose_Color
   * Look up for nose color.
   */
  Nose_Color: {
    melissa: "Pink",
    ashley: "Pink",
    amara_qin: "Pink",
    saffron_rose: "Red-Orange",
    jalissa_chin: "Dark-Pink",
    dagmar_kone_reynolds: "Pink",
    arden_rosie_kone_reynolds: "Dark-Pink",
    jahmella_rose: "Orange",
    agape_rose: "Deep Pink",
    roxanne_kone_reynolds: "Bright Pink with a meaningful shine",
    tiana_qin: "Pink",
    wanda: "Red",
    olivia_chin: "Reddish-Brown",
    ruth_kone_reynolds: "Light Pink",
    kady_rose: "Red-Orange",
    sandra: "Pink",
    drake_kone_reynolds: "Red",
    rudy_kone_reynolds: "Deep Red",
    eugene_rose: "Pink",
    daisy_rose: "Dark-Pink",
    callie_rose: "Red Gold",
    stacey_jasmin: "Dark-Pink",
    arnold_rose: "Brown",
    melvin_qin: "Brown",
    safford_chin: "Black",
    getByOpossumId(id: string): string {
      return (this as any)[id] || "Pink";
    }
  },

  /**
   * 7. Shoulder_Height
   * Look up for shoulder height.
   */
  Shoulder_Height: {
    melissa: "5 feet and 3 inches",
    ashley: "5 feet and 3 inches",
    amara_qin: "5 feet and 3 inches",
    saffron_rose: "5 feet and 11 inches",
    jalissa_chin: "5 feet and 1 inch",
    dagmar_kone_reynolds: "5 feet and 8.5 inches",
    arden_rosie_kone_reynolds: "5 feet and 1.5 inches",
    jahmella_rose: "6 feet",
    agape_rose: "5 feet and 5 inches",
    roxanne_kone_reynolds: "6 feet",
    tiana_qin: "5 feet and 10 inches",
    wanda: "5 feet and 2.9999 inches",
    olivia_chin: "5 feet and 1 inch",
    ruth_kone_reynolds: "6 feet",
    kady_rose: "5 feet and 11 inches",
    sandra: "5 feet and 3 inches",
    drake_kone_reynolds: "4 feet",
    rudy_kone_reynolds: "3 feet and 7.5 inches",
    eugene_rose: "3 feet and 10.00932 inches",
    daisy_rose: "6 feet, and 1.00123 inches",
    callie_rose: "5 feet, 11.444401003 inches",
    stacey_jasmin: "5 feet, 8.999 inches",
    arnold_rose: "3 feet and 8 inches",
    melvin_qin: "3.5 feet",
    safford_chin: "3 feet, 10.0000088 inches",
    getByOpossumId(id: string): string {
      return (this as any)[id] || "5 feet and 3 inches";
    }
  },

  /**
   * 8. Body_Width
   * Look up for body width in inches.
   */
  Body_Width: {
    melissa: 36.0,
    ashley: 38.0,
    amara_qin: 36.0,
    saffron_rose: 48.0,
    jalissa_chin: 37.5,
    dagmar_kone_reynolds: 40.0,
    arden_rosie_kone_reynolds: 38.0,
    jahmella_rose: 40.0,
    agape_rose: 42.0,
    roxanne_kone_reynolds: 45.0,
    tiana_qin: 38.0,
    wanda: 36.0,
    olivia_chin: 38.0,
    ruth_kone_reynolds: 45.0,
    kady_rose: 48.0,
    sandra: 38.0,
    drake_kone_reynolds: 28.0,
    rudy_kone_reynolds: 27.0,
    eugene_rose: 28.0,
    daisy_rose: 44.0,
    callie_rose: 40.5,
    stacey_jasmin: 38.5,
    arnold_rose: 28.0,
    melvin_qin: 34.0,
    safford_chin: 28.5,
    getByOpossumId(id: string): number {
      return (this as any)[id] || 36.0;
    }
  },

  /**
   * 9. Body_Length_excluding_head_and_tail
   * Lookup for body length excluding head and tail.
   */
  Body_Length_excluding_head_and_tail: {
    melissa: 86.0,
    ashley: 88.0,
    amara_qin: 82.0,
    saffron_rose: 95.0,
    jalissa_chin: 84.0,
    dagmar_kone_reynolds: 85.0,
    arden_rosie_kone_reynolds: 78.0,
    jahmella_rose: 99.5,
    agape_rose: 90.1,
    roxanne_kone_reynolds: 96.0,
    tiana_qin: 88.0,
    wanda: 84.0,
    olivia_chin: 84.0,
    ruth_kone_reynolds: 96.0,
    kady_rose: 95.0,
    sandra: 88.0,
    drake_kone_reynolds: 72.0,
    rudy_kone_reynolds: 64.0,
    eugene_rose: 72.0,
    daisy_rose: 97.50002804,
    callie_rose: 95.88880003001,
    stacey_jasmin: 95.9988,
    arnold_rose: 58.0,
    melvin_qin: 68.0,
    safford_chin: 72.0,
    getByOpossumId(id: string): number {
      return (this as any)[id] || 86.0;
    }
  },

  /**
   * 10. Full_Body_Length
   * Full body length that includes head and tail.
   */
  Full_Body_Length: {
    melissa: 125.8,
    ashley: 128.4,
    amara_qin: 120.6,
    saffron_rose: 139.5,
    jalissa_chin: 123.2,
    dagmar_kone_reynolds: 125.5,
    arden_rosie_kone_reynolds: 115.4,
    jahmella_rose: 144.35,
    agape_rose: 132.13,
    roxanne_kone_reynolds: 140.8,
    tiana_qin: 128.4,
    wanda: 122.7,
    olivia_chin: 123.2,
    ruth_kone_reynolds: 140.8,
    kady_rose: 139.5,
    sandra: 130.9,
    drake_kone_reynolds: 105.0,
    rudy_kone_reynolds: 98.5,
    eugene_rose: 104.0,
    daisy_rose: 144.0,
    callie_rose: 139.88,
    stacey_jasmin: 138.99,
    arnold_rose: 86.0,
    melvin_qin: 98.0,
    safford_chin: 104.0,
    getByOpossumId(id: string): number {
      return (this as any)[id] || 125.8;
    }
  },

  /**
   * 11. Head_Width
   * Head width look up in inches.
   */
  Head_Width: {
    melissa: 36.0,
    ashley: 36.0,
    amara_qin: 36.0,
    saffron_rose: 47.5,
    jalissa_chin: 36.0,
    dagmar_kone_reynolds: 39.0,
    arden_rosie_kone_reynolds: 36.5,
    jahmella_rose: 37.0,
    agape_rose: 40.5,
    roxanne_kone_reynolds: 43.33,
    tiana_qin: 37.0,
    wanda: 35.9999,
    olivia_chin: 37.0,
    ruth_kone_reynolds: 43.33,
    kady_rose: 47.5,
    sandra: 36.0,
    drake_kone_reynolds: 28.0,
    rudy_kone_reynolds: 26.0,
    eugene_rose: 26.5,
    daisy_rose: 38.5000144,
    callie_rose: 38.5,
    stacey_jasmin: 36.0,
    arnold_rose: 26.0,
    melvin_qin: 32.0,
    safford_chin: 27.0,
    getByOpossumId(id: string): number {
      return (this as any)[id] || 36.0;
    }
  },

  /**
   * 12. Head_Height_excluding_ears
   * Head height excluding ears in inches.
   */
  Head_Height_excluding_ears: {
    melissa: 35.0,
    ashley: 36.0,
    amara_qin: 38.0,
    saffron_rose: 46.0,
    jalissa_chin: 38.0,
    dagmar_kone_reynolds: 44.0,
    arden_rosie_kone_reynolds: 40.0,
    jahmella_rose: 45.0,
    agape_rose: 46.0,
    roxanne_kone_reynolds: 44.88,
    tiana_qin: 44.45,
    wanda: 44.9999,
    olivia_chin: 42.0,
    ruth_kone_reynolds: 44.88,
    kady_rose: 46.0,
    sandra: 36.0,
    drake_kone_reynolds: 26.0,
    rudy_kone_reynolds: 24.0,
    eugene_rose: 28.0,
    daisy_rose: 46.5,
    callie_rose: 44.5,
    stacey_jasmin: 43.0,
    arnold_rose: 28.0,
    melvin_qin: 30.0,
    safford_chin: 28.0,
    getByOpossumId(id: string): number {
      return (this as any)[id] || 35.0;
    }
  },

  /**
   * 13. Full_Head_Height
   * Total head height lookup including ears in inches.
   */
  Full_Head_Height: {
    melissa: 43.0,
    ashley: 44.0,
    amara_qin: 46.0,
    saffron_rose: 56.0,
    jalissa_chin: 46.0,
    dagmar_kone_reynolds: 54.0,
    arden_rosie_kone_reynolds: 49.0,
    jahmella_rose: 55.0,
    agape_rose: 56.0,
    roxanne_kone_reynolds: 54.88,
    tiana_qin: 54.45,
    wanda: 55.3499,
    olivia_chin: 51.0,
    ruth_kone_reynolds: 54.88,
    kady_rose: 56.0,
    sandra: 44.0,
    drake_kone_reynolds: 34.0,
    rudy_kone_reynolds: 32.0,
    eugene_rose: 36.0,
    daisy_rose: 58.5,
    callie_rose: 55.8,
    stacey_jasmin: 54.0,
    arnold_rose: 35.0,
    melvin_qin: 38.0,
    safford_chin: 36.0,
    getByOpossumId(id: string): number {
      return (this as any)[id] || 43.0;
    }
  },

  /**
   * 14. Total_Height_excluding_ears
   * Total height of an opossum excluding ears.
   */
  Total_Height_excluding_ears: {
    melissa: 75.0,
    ashley: 75.0,
    amara_qin: 75.0,
    saffron_rose: 86.0,
    jalissa_chin: 73.0,
    dagmar_kone_reynolds: 82.5,
    arden_rosie_kone_reynolds: 74.5,
    jahmella_rose: 87.0,
    agape_rose: 78.0,
    roxanne_kone_reynolds: 87.0,
    tiana_qin: 84.0,
    wanda: 75.9999,
    olivia_chin: 73.5,
    ruth_kone_reynolds: 87.0,
    kady_rose: 86.0,
    sandra: 75.0,
    drake_kone_reynolds: 62.0,
    rudy_kone_reynolds: 58.0,
    eugene_rose: 62.0,
    daisy_rose: 88.0,
    callie_rose: 86.0,
    stacey_jasmin: 83.0,
    arnold_rose: 52.0,
    melvin_qin: 56.0,
    safford_chin: 62.0,
    getByOpossumId(id: string): number {
      return (this as any)[id] || 75.0;
    }
  },

  /**
   * 15. Total_Height
   * Full total height of an opossum that includes ears.
   */
  Total_Height: {
    melissa: 81.0,
    ashley: 81.0,
    amara_qin: 81.0,
    saffron_rose: 94.0,
    jalissa_chin: 79.0,
    dagmar_kone_reynolds: 90.5,
    arden_rosie_kone_reynolds: 81.5,
    jahmella_rose: 95.5,
    agape_rose: 85.5,
    roxanne_kone_reynolds: 95.5,
    tiana_qin: 92.0,
    wanda: 83.9999,
    olivia_chin: 81.0,
    ruth_kone_reynolds: 95.5,
    kady_rose: 94.0,
    sandra: 81.5,
    drake_kone_reynolds: 70.0,
    rudy_kone_reynolds: 66.0,
    eugene_rose: 70.0,
    daisy_rose: 98.0,
    callie_rose: 95.0,
    stacey_jasmin: 92.0,
    arnold_rose: 59.0,
    melvin_qin: 64.0,
    safford_chin: 70.0,
    getByOpossumId(id: string): number {
      return (this as any)[id] || 81.0;
    }
  },

  /**
   * 16. Eye_Color
   * Look up for eye colors.
   */
  Eye_Color: {
    melissa: "Blue",
    ashley: "Light Green",
    amara_qin: "Blue",
    saffron_rose: "Green",
    jalissa_chin: "Dark-Blue",
    dagmar_kone_reynolds: "Light-Green",
    arden_rosie_kone_reynolds: "Light-Blue",
    jahmella_rose: "Light-Green",
    agape_rose: "Light-Green",
    roxanne_kone_reynolds: "Dark-Blue",
    tiana_qin: "Blue",
    wanda: "Indigo",
    olivia_chin: "Dark-Blue",
    ruth_kone_reynolds: "Sky Blue",
    kady_rose: "Dark-Blue",
    sandra: "Dark-Blue",
    drake_kone_reynolds: "Green",
    rudy_kone_reynolds: "Blue",
    eugene_rose: "Green",
    daisy_rose: "Blue",
    callie_rose: "Green",
    stacey_jasmin: "Indigo",
    arnold_rose: "Light-Brown",
    melvin_qin: "Dark-Green",
    safford_chin: "Light-brown",
    getByOpossumId(id: string): string {
      return (this as any)[id] || "Blue";
    }
  },

  /**
   * 17. Snout_Length
   * Look up for snout length scaling factor.
   */
  Snout_Length: {
    wanda: "5% shorter (0.95 factor)",
    sandra: "3% longer (1.03 factor)",
    melissa: "Conventional (1.0 factor)",
    ashley: "Conventional (1.0 factor)",
    amara_qin: "Conventional (1.0 factor)",
    saffron_rose: "Conventional (1.0 factor)",
    jalissa_chin: "Conventional (1.0 factor)",
    dagmar_kone_reynolds: "Conventional (1.0 factor)",
    arden_rosie_kone_reynolds: "Conventional (1.0 factor)",
    jahmella_rose: "Conventional (1.0 factor)",
    agape_rose: "Conventional (1.0 factor)",
    roxanne_kone_reynolds: "Conventional (1.0 factor)",
    tiana_qin: "Conventional (1.0 factor)",
    olivia_chin: "Conventional (1.0 factor)",
    ruth_kone_reynolds: "Conventional (1.0 factor)",
    kady_rose: "Conventional (1.0 factor)",
    drake_kone_reynolds: "Conventional (1.0 factor)",
    rudy_kone_reynolds: "Conventional (1.0 factor)",
    eugene_rose: "Conventional (1.0 factor)",
    daisy_rose: "Conventional (1.0 factor)",
    callie_rose: "Conventional (1.0 factor)",
    stacey_jasmin: "Conventional (1.0 factor)",
    arnold_rose: "Conventional (1.0 factor)",
    melvin_qin: "Conventional (1.0 factor)",
    safford_chin: "Conventional (1.0 factor)",
    getByOpossumId(id: string): string {
      return (this as any)[id] || "Conventional (1.0 factor)";
    }
  },

  /**
   * 18. Furry_Face
   * Percentage of furry face of each opossum.
   */
  Furry_Face: {
    melissa: 0.0,
    ashley: 0.0,
    amara_qin: 0.0,
    saffron_rose: 0.0,
    jalissa_chin: 0.0,
    dagmar_kone_reynolds: 0.0,
    arden_rosie_kone_reynolds: 0.0,
    jahmella_rose: 0.0,
    agape_rose: 0.0,
    roxanne_kone_reynolds: 1.0, // 1% furry face
    tiana_qin: 0.0,
    wanda: 0.0001, // 0.0001% furry face
    olivia_chin: 0.00001, // 0.00001% furry face
    ruth_kone_reynolds: 0.0,
    kady_rose: 0.0,
    sandra: 0.0000000001, // 0.0000000001% furry face
    drake_kone_reynolds: 0.0,
    rudy_kone_reynolds: 30.0,
    eugene_rose: 100.0,
    daisy_rose: 0.0,
    callie_rose: 0.0,
    stacey_jasmin: 0.0,
    arnold_rose: 5.0, // 5% furry face
    melvin_qin: 50.0, // 50% furry face
    safford_chin: 2.0, // 2% furry face
    getByOpossumId(id: string): number {
      return (this as any)[id] !== undefined ? (this as any)[id] : 0.0;
    }
  },

  /**
   * 19. Accessories
   * Look up for accessories.
   */
  Accessories: {
    melissa: "None",
    ashley: "None",
    amara_qin: "None",
    saffron_rose: "None",
    jalissa_chin: "None",
    dagmar_kone_reynolds: "Pink 4-inch earrings, silver chain necklace with a diamond pattern",
    arden_rosie_kone_reynolds: "Gold 4-inch earrings, gold chain necklace with a heart charm",
    jahmella_rose: "Gold 4-inch earrings, gold chain necklace with a gold flower charm",
    agape_rose: "Gold 4-inch earrings, gold chain necklace with a gold flower charm",
    roxanne_kone_reynolds: "Gold 4-inch earrings, gold chain necklace with a gold flower charm",
    tiana_qin: "None",
    wanda: "None",
    olivia_chin: "None",
    ruth_kone_reynolds: "Yellow 4-inch earrings, yellow chain necklace with a gold flower charm",
    kady_rose: "Yellow 4-inch earrings, yellow chain necklace with a gold flower charm",
    sandra: "None",
    drake_kone_reynolds: "None",
    rudy_kone_reynolds: "None",
    eugene_rose: "None",
    daisy_rose: "Gold Tiara with light-yellow gem & sun diamonds, green chain diamond necklace",
    callie_rose: "White gold/brass circular glasses, Blue tiara with 6-inch vertical emerald, violet diamond necklace",
    stacey_jasmin: "White gold tiara with circular yellow moon gem",
    arnold_rose: "None",
    melvin_qin: "None",
    safford_chin: "None",
    getByOpossumId(id: string): string {
      return (this as any)[id] || "None";
    }
  },

  /**
   * 20. Tail_Length
   * Look up for tail length in inches.
   */
  Tail_Length: {
    melissa: 25.8,
    ashley: 26.4,
    amara_qin: 24.6,
    saffron_rose: 28.5,
    jalissa_chin: 25.2,
    dagmar_kone_reynolds: 25.5,
    arden_rosie_kone_reynolds: 23.4,
    jahmella_rose: 29.85,
    agape_rose: 27.03,
    roxanne_kone_reynolds: 28.8,
    tiana_qin: 26.4,
    wanda: 25.2,
    olivia_chin: 25.2,
    ruth_kone_reynolds: 28.8,
    kady_rose: 28.5,
    sandra: 28.512,
    drake_kone_reynolds: 18.5,
    rudy_kone_reynolds: 16.5,
    eugene_rose: 22.0,
    daisy_rose: 37.05, // 30% longer for scale
    callie_rose: 27.0,
    stacey_jasmin: 26.5,
    arnold_rose: 18.0,
    melvin_qin: 20.0,
    safford_chin: 22.0,
    getByOpossumId(id: string): number {
      return (this as any)[id] || 25.8;
    }
  },

  /**
   * 21. Ear_Orientation
   * Used for ear orientation, such as Upright/, Side_oriented/.
   */
  Ear_Orientation: {
    melissa: "Upright",
    ashley: "Forward Leaning",
    amara_qin: "Upright",
    saffron_rose: "Upright",
    jalissa_chin: "Upright",
    dagmar_kone_reynolds: "Upright",
    arden_rosie_kone_reynolds: "Upright",
    jahmella_rose: "Upright",
    agape_rose: "Forward Leaning",
    roxanne_kone_reynolds: "Upright",
    tiana_qin: "Upright",
    wanda: "Upright",
    olivia_chin: "Upright",
    ruth_kone_reynolds: "Upright",
    kady_rose: "Upright",
    sandra: "Upright",
    drake_kone_reynolds: "Forward Leaning",
    rudy_kone_reynolds: "Side Down",
    eugene_rose: "Upright",
    daisy_rose: "Upright",
    callie_rose: "Upright",
    stacey_jasmin: "Upright",
    arnold_rose: "Forward Leaning",
    melvin_qin: "Downward, side oriented like a dog of certain breed",
    safford_chin: "Upright",
    getByOpossumId(id: string): string {
      return (this as any)[id] || "Upright";
    }
  },

  /**
   * 22. Ear_Length
   * Look up for conventional, long, or short.
   */
  Ear_Length: {
    melissa: "Conventional",
    ashley: "Conventional",
    amara_qin: "Conventional",
    saffron_rose: "Long",
    jalissa_chin: "Conventional",
    dagmar_kone_reynolds: "Long",
    arden_rosie_kone_reynolds: "Conventional",
    jahmella_rose: "Conventional",
    agape_rose: "Conventional",
    roxanne_kone_reynolds: "Conventional",
    tiana_qin: "Conventional",
    wanda: "Long",
    olivia_chin: "Conventional",
    ruth_kone_reynolds: "Conventional",
    kady_rose: "Long",
    sandra: "Medium",
    drake_kone_reynolds: "Conventional",
    rudy_kone_reynolds: "Short",
    eugene_rose: "Conventional",
    daisy_rose: "Long",
    callie_rose: "Long",
    stacey_jasmin: "Conventional",
    arnold_rose: "Conventional",
    melvin_qin: "Conventional",
    safford_chin: "Conventional",
    getByOpossumId(id: string): string {
      return (this as any)[id] || "Conventional";
    }
  },

  /**
   * 23. Paw_Color
   * Look up for paw colors.
   */
  Paw_Color: {
    melissa: "Gray",
    ashley: "Yellow",
    amara_qin: "White",
    saffron_rose: "Red-Orange",
    jalissa_chin: "Orange",
    dagmar_kone_reynolds: "White",
    arden_rosie_kone_reynolds: "Cream",
    jahmella_rose: "White",
    agape_rose: "Orange",
    roxanne_kone_reynolds: "Red",
    tiana_qin: "Gold",
    wanda: "Saffron",
    olivia_chin: "Saffron",
    ruth_kone_reynolds: "Orange",
    kady_rose: "Saffron",
    sandra: "Light-Pink",
    drake_kone_reynolds: "Red",
    rudy_kone_reynolds: "Yellow",
    eugene_rose: "White",
    daisy_rose: "Light-Pink",
    callie_rose: "Bronze",
    stacey_jasmin: "Yellow-Orange",
    arnold_rose: "White",
    melvin_qin: "White",
    safford_chin: "Black",
    getByOpossumId(id: string): string {
      return (this as any)[id] || "Gray";
    }
  },

  /**
   * 24. Paw_Pad_Color
   * Look up for paw pad colors.
   */
  Paw_Pad_Color: {
    melissa: "Soft Pink",
    ashley: "Rose Pink",
    amara_qin: "Pink",
    saffron_rose: "Coral",
    jalissa_chin: "Salmon",
    dagmar_kone_reynolds: "Pink",
    arden_rosie_kone_reynolds: "Deep Pink",
    jahmella_rose: "Coral",
    agape_rose: "Pink",
    roxanne_kone_reynolds: "Bright Rose",
    tiana_qin: "Gold-Pink",
    wanda: "Red",
    olivia_chin: "Coral",
    ruth_kone_reynolds: "Saffron-Pink",
    kady_rose: "Red-Coral",
    sandra: "Soft Pink",
    drake_kone_reynolds: "Red",
    rudy_kone_reynolds: "Rose",
    eugene_rose: "Peach",
    daisy_rose: "Peach",
    callie_rose: "Red Gold",
    stacey_jasmin: "Dark-Pink",
    arnold_rose: "Pink",
    melvin_qin: "Peach",
    safford_chin: "Black",
    getByOpossumId(id: string): string {
      return (this as any)[id] || "Pink";
    }
  },

  /**
   * 25. Ear_Color
   * Ear color look up.
   */
  Ear_Color: {
    melissa: "Light Gray",
    ashley: "Yellow",
    amara_qin: "White",
    saffron_rose: "Red-Orange",
    jalissa_chin: "Yellow-Orange",
    dagmar_kone_reynolds: "White",
    arden_rosie_kone_reynolds: "Cream",
    jahmella_rose: "Orange",
    agape_rose: "Gold",
    roxanne_kone_reynolds: "Yellow",
    tiana_qin: "Red",
    wanda: "Light-Amber",
    olivia_chin: "Blond",
    ruth_kone_reynolds: "Pink",
    kady_rose: "Light Gray",
    sandra: "Lavender",
    drake_kone_reynolds: "Dark Brown",
    rudy_kone_reynolds: "Deep Orange",
    eugene_rose: "Dark-Gray",
    daisy_rose: "Pink",
    callie_rose: "Yellowish-Gold",
    stacey_jasmin: "Purple",
    arnold_rose: "Matte White",
    melvin_qin: "Red",
    safford_chin: "Brown",
    getByOpossumId(id: string): string {
      return (this as any)[id] || "Light Gray";
    }
  },

  /**
   * 26. Inner_Ear_Color
   * Look up for inner ear colors.
   */
  Inner_Ear_Color: {
    melissa: "Pink",
    ashley: "Red-Orange",
    amara_qin: "Pink",
    saffron_rose: "Dark-Pink",
    jalissa_chin: "Pinkish-Orange",
    dagmar_kone_reynolds: "Pink",
    arden_rosie_kone_reynolds: "Dark-Pink",
    jahmella_rose: "Orange",
    agape_rose: "Dark-Pink",
    roxanne_kone_reynolds: "Pinkish-brown",
    tiana_qin: "Pink",
    wanda: "Reddish-Brown",
    olivia_chin: "Reddish-Brown",
    ruth_kone_reynolds: "Reddish-Brown",
    kady_rose: "Reddish-Brown",
    sandra: "Pink",
    drake_kone_reynolds: "Deep Orange",
    rudy_kone_reynolds: "Dark Red",
    eugene_rose: "Pink",
    daisy_rose: "Dark-Pink",
    callie_rose: "Red Gold",
    stacey_jasmin: "Dark-Pink",
    arnold_rose: "Pink",
    melvin_qin: "Brown",
    safford_chin: "Brown",
    getByOpossumId(id: string): string {
      return (this as any)[id] || "Pink";
    }
  },

  /**
   * 27. Ear_Color_With_Patterns
   * Ear colors with patterns.
   */
  Ear_Color_With_Patterns: {
    ruth_kone_reynolds: "Pink with 1 cm rainbow diamond pattern",
    dagmar_kone_reynolds: "White with intricate cream diamond patterns",
    saffron_rose: "Red-Orange featuring a neon saffron yellow polka-dot pattern",
    roxanne_kone_reynolds: "Yellow featuring red diamonds spaced out by 0.1 inches",
    kady_rose: "Light Gray with bronze ear circles",
    daisy_rose: "Pink without patterns",
    callie_rose: "Yellowish-Gold",
    stacey_jasmin: "Purple",
    arnold_rose: "Matte White",
    melvin_qin: "Solid Red",
    safford_chin: "Solid Brown",
    getByOpossumId(id: string): string {
      return (this as any)[id] || "Solid Plain";
    }
  },

  /**
   * 28. Head_Fur_Color
   * Color of fur via head.
   */
  Head_Fur_Color: {
    melissa: "Light Gray",
    ashley: "Yellow",
    amara_qin: "White",
    saffron_rose: "Red-Orange",
    jalissa_chin: "Yellow-Orange",
    dagmar_kone_reynolds: "White",
    arden_rosie_kone_reynolds: "Cream",
    jahmella_rose: "Orange",
    agape_rose: "Gold",
    roxanne_kone_reynolds: "Yellow",
    tiana_qin: "Red",
    wanda: "Light Amber",
    olivia_chin: "Blond",
    ruth_kone_reynolds: "Pink",
    kady_rose: "Light Gray",
    sandra: "Lavender",
    drake_kone_reynolds: "Red",
    rudy_kone_reynolds: "Yellow",
    eugene_rose: "Light-Gray",
    daisy_rose: "Pink",
    callie_rose: "Yellowish-Gold",
    stacey_jasmin: "Purple",
    arnold_rose: "Matte White",
    melvin_qin: "Light-tan",
    safford_chin: "Light-Blue",
    getByOpossumId(id: string): string {
      return (this as any)[id] || "Light Gray";
    }
  },

  /**
   * 29. _Furry_Face_Color
   * Color of furry face skin/fur.
   */
  _Furry_Face_Color: {
    roxanne_kone_reynolds: "Yellow/Pinkish-Brown Accent",
    wanda: "Dark-Brown",
    sandra: "Light Brown",
    olivia_chin: "Light-Brown",
    rudy_kone_reynolds: "Deep Brown",
    eugene_rose: "Light-Gray",
    arnold_rose: "Dark-Brown",
    melvin_qin: "Light-tan",
    safford_chin: "Light-Blue",
    getByOpossumId(id: string): string {
      return (this as any)[id] || "Hairless (0% Furry)";
    }
  },

  /**
   * 30. Body_Fur_Thickness
   * Thickness of body fur.
   */
  Body_Fur_Thickness: {
    melissa: "Standard",
    ashley: "Standard",
    amara_qin: "Standard",
    saffron_rose: "Extra Thick",
    jalissa_chin: "Standard",
    dagmar_kone_reynolds: "Thick",
    arden_rosie_kone_reynolds: "Standard",
    jahmella_rose: "Thick",
    agape_rose: "Standard",
    roxanne_kone_reynolds: "Extra Thick",
    tiana_qin: "Standard",
    wanda: "Thick",
    olivia_chin: "Thick",
    ruth_kone_reynolds: "Extra Thick",
    kady_rose: "Extra Thick",
    sandra: "Thick",
    drake_kone_reynolds: "Thick",
    rudy_kone_reynolds: "Thick",
    eugene_rose: "Standard",
    daisy_rose: "Standard",
    callie_rose: "Standard",
    stacey_jasmin: "35% thicker",
    arnold_rose: "Standard",
    melvin_qin: "Standard",
    safford_chin: "Standard",
    getByOpossumId(id: string): string {
      return (this as any)[id] || "Standard";
    }
  },

  /**
   * 31. Furry_Tail_Percentage
   * Percentage of furry tail look up.
   */
  Furry_Tail_Percentage: {
    saffron_rose: 0, // 100% hairless, smooth gold skin with pink spiral pattern (0% furry tail coverage)
    agape_rose: 2, // 2% gold fur layer
    roxanne_kone_reynolds: 0.0001, // 0.0001% yellow fur
    drake_kone_reynolds: 5,
    rudy_kone_reynolds: 7.128,
    eugene_rose: 0,
    daisy_rose: 0,
    callie_rose: 0,
    stacey_jasmin: 0,
    arnold_rose: 0,
    melvin_qin: 0,
    safford_chin: 0,
    getByOpossumId(id: string): number {
      const actualId = id === "arden_rosie" ? "arden_rosie_kone_reynolds" : id;
      return (this as any)[actualId] !== undefined ? (this as any)[actualId] : 0; // standard hairless tails
    }
  },

  /**
   * 32. Paw_Size
   * Lookup for paw size.
   */
  Paw_Size: {
    saffron_rose: "Large",
    jahmella_rose: "Large",
    roxanne_kone_reynolds: "Large",
    ruth_kone_reynolds: "Large",
    kady_rose: "Large",
    drake_kone_reynolds: "Medium",
    rudy_kone_reynolds: "Medium",
    eugene_rose: "Medium",
    daisy_rose: "Large",
    callie_rose: "Large",
    stacey_jasmin: "Large",
    arnold_rose: "Medium",
    melvin_qin: "Medium",
    safford_chin: "Medium",
    getByOpossumId(id: string): string {
      const actualId = id === "arden_rosie" ? "arden_rosie_kone_reynolds" : id;
      return (this as any)[actualId] || "Medium";
    }
  },

  /**
   * 33. Leg_Length
   * Lookup for leg length.
   */
  Leg_Length: {
    saffron_rose: "Long",
    jahmella_rose: "Long",
    roxanne_kone_reynolds: "Long",
    ruth_kone_reynolds: "Long",
    kady_rose: "Long",
    drake_kone_reynolds: "Medium",
    rudy_kone_reynolds: "Short",
    eugene_rose: "Medium",
    daisy_rose: "Long",
    callie_rose: "Long",
    stacey_jasmin: "Long",
    arnold_rose: "Medium",
    melvin_qin: "Medium",
    safford_chin: "Medium",
    getByOpossumId(id: string): string {
      const actualId = id === "arden_rosie" ? "arden_rosie_kone_reynolds" : id;
      return (this as any)[actualId] || "Medium";
    }
  },

  /**
   * 34. Paw_Width
   * Lookup for paw width.
   */
  Paw_Width: {
    saffron_rose: "Wide",
    jahmella_rose: "Wide",
    roxanne_kone_reynolds: "Wide",
    ruth_kone_reynolds: "Wide",
    kady_rose: "Wide",
    eugene_rose: "Standard",
    daisy_rose: "Wide",
    callie_rose: "Wide",
    stacey_jasmin: "Wide",
    arnold_rose: "Standard",
    melvin_qin: "Standard",
    safford_chin: "Standard",
    getByOpossumId(id: string): string {
      const actualId = id === "arden_rosie" ? "arden_rosie_kone_reynolds" : id;
      return (this as any)[actualId] || "Standard";
    }
  },

  /**
   * 35. Leg_Width
   * Lookup for leg width.
   */
  Leg_Width: {
    saffron_rose: "Thick",
    jahmella_rose: "Thick",
    roxanne_kone_reynolds: "Thick",
    ruth_kone_reynolds: "Thick",
    kady_rose: "Thick",
    eugene_rose: "Standard",
    daisy_rose: "Thick",
    callie_rose: "Thick",
    stacey_jasmin: "Thick",
    arnold_rose: "Standard",
    melvin_qin: "Standard",
    safford_chin: "Standard",
    getByOpossumId(id: string): string {
      const actualId = id === "arden_rosie" ? "arden_rosie_kone_reynolds" : id;
      return (this as any)[actualId] || "Standard";
    }
  },

  /**
   * 36. Has_Elegant_Chatter
   * Lookup for elegant chatter.
   */
  Has_Elegant_Chatter: {
    melissa: false,
    ashley: false,
    sandra: false,
    drake_kone_reynolds: false,
    rudy_kone_reynolds: false,
    eugene_rose: false,
    arnold_rose: false,
    melvin_qin: false,
    safford_chin: false,
    daisy_rose: true,
    callie_rose: true,
    stacey_jasmin: true,
    getByOpossumId(id: string): boolean {
      const actualId = id === "arden_rosie" ? "arden_rosie_kone_reynolds" : id;
      if (actualId === "melissa" || actualId === "ashley" || actualId === "sandra" || actualId === "drake_kone_reynolds" || actualId === "rudy_kone_reynolds" || actualId === "eugene_rose" || actualId === "arnold_rose" || actualId === "melvin_qin" || actualId === "safford_chin") return false;
      return true;
    }
  },

  /**
   * 37. Has_Elegant_Trot
   * Lookup for elegant movement/trot.
   */
  Has_Elegant_Trot: {
    melissa: false,
    ashley: false,
    sandra: false,
    drake_kone_reynolds: false,
    rudy_kone_reynolds: false,
    eugene_rose: false,
    arnold_rose: false,
    melvin_qin: false,
    safford_chin: false,
    daisy_rose: true,
    callie_rose: true,
    stacey_jasmin: true,
    getByOpossumId(id: string): boolean {
      const actualId = id === "arden_rosie" ? "arden_rosie_kone_reynolds" : id;
      if (actualId === "melissa" || actualId === "ashley" || actualId === "sandra" || actualId === "drake_kone_reynolds" || actualId === "rudy_kone_reynolds" || actualId === "eugene_rose" || actualId === "arnold_rose" || actualId === "melvin_qin" || actualId === "safford_chin") return false;
      return true;
    }
  },

  /**
   * 38. Tail_Thickness
   * Lookup for tail thickness.
   */
  Tail_Thickness: {
    saffron_rose: "Extra Thick",
    jahmella_rose: "Thick",
    roxanne_kone_reynolds: "Thick",
    ruth_kone_reynolds: "Thick",
    kady_rose: "Thick",
    eugene_rose: "Standard",
    daisy_rose: "Thick",
    callie_rose: "Thick",
    stacey_jasmin: "Thick",
    arnold_rose: "Standard",
    melvin_qin: "Standard",
    safford_chin: "Standard",
    getByOpossumId(id: string): string {
      const actualId = id === "arden_rosie" ? "arden_rosie_kone_reynolds" : id;
      return (this as any)[actualId] || "Standard";
    }
  },

  /**
   * 39. Visual_Mapping
   * Centralized visual configuration for selection screen previews.
   */
  Visual_Mapping: {
    melissa: { bodyColor: "#d3d3d3", outlineColor: "#9ca3af", scale: 1.0, headHeight: 35, earOrientation: "upright" },
    ashley: { bodyColor: "#eab308", outlineColor: "#ca8a04", scale: 1.05, headHeight: 36, earColor: "#dc2626", earOrientation: "forward_leaning" },
    amara_qin: { bodyColor: "#ffffff", outlineColor: "#d1d5db", scale: 1.0, headHeight: 38, earOrientation: "upright" },
    saffron_rose: {
      bodyColor: "#ff5f1f",
      outlineColor: "#c03a00",
      scale: 1.1,
      tailColor: "#ffd700",
      tailLineWidth: 6.3,
      tailHasSpiral: true,
      tailSpiralColor: "#ff69b4",
      isFurryTail: true,
      furryTailPercentage: 35,
      hasNecklace: true,
      necklaceColor: "#ffd700",
      hasHeartCharm: true,
      heartCharmColor: "#ff1493",
      hasEarRings: true,
      earRingsColor: "#ffd700",
      earRingsSide: "both",
      bodyPattern: "diamonds",
      bodyPatternColors: ["#000000", "#ffd700"],
      headHeight: 46,
      noseColor: "#ffd700",
      earColor: "#ffd700",
      earOrientation: "upright",
      earPattern: "polka-dots",
      earPatternColors: ["#facc15"]
    },
    jalissa_chin: { bodyColor: "#9333ea", outlineColor: "#7e22ce", scale: 1.0, headHeight: 38, earOrientation: "upright" },
    arden_rosie: { bodyColor: "#3b82f6", outlineColor: "#2563eb", scale: 1.05, tailColor: "#ffd700", isFurryTail: true, furryTailPercentage: 25, headHeight: 42, noseColor: "#ffd700", earColor: "#ffd700", earOrientation: "upright" },
    jahmella_rose: {
      bodyColor: "#10b981",
      outlineColor: "#059669",
      scale: 1.1,
      tailColor: "#ffd700",
      tailLineWidth: 6.3,
      tailHasSpiral: true,
      tailSpiralColor: "#00ffff",
      isFurryTail: true,
      furryTailPercentage: 30,
      hasNecklace: true,
      necklaceColor: "#ffd700",
      hasHeartCharm: true,
      heartCharmColor: "#00ffff",
      bodyPattern: "flowers",
      bodyPatternColors: ["#ffd700", "#ffffff"],
      headHeight: 46,
      noseColor: "#ffd700",
      earColor: "#ffd700",
      earOrientation: "upright"
    },
    dagmar_kone_reynolds: { bodyColor: "#f97316", outlineColor: "#ea580c", scale: 1.1, tailColor: "#451a03", headHeight: 44, noseColor: "#451a03", earColor: "#7c2d12", earOrientation: "upright_long", earPattern: "diamonds", earPatternColors: ["#fff7ed"] },
    agape_rose: { bodyColor: "#ec4899", outlineColor: "#db2777", scale: 1.05, tailColor: "#ffd700", headHeight: 40, faceColor: "#d2b48c", earOrientation: "upright" },
    roxanne_kone_reynolds: {
      bodyColor: "#facc15",
      outlineColor: "#ca8a04",
      scale: 1.15,
      tailColor: "#db2777",
      isFurryTail: true,
      furryTailPercentage: 0.0001,
      bodyPattern: "diamonds",
      bodyPatternColors: ["#ef4444", "#f97316", "#ffffff"],
      headHeight: 44.88,
      noseColor: "#ff69b4",
      earColor: "#ffb6c1",
      faceColor: "#facc15",
      earOrientation: "upright",
      earPattern: "diamonds",
      earPatternColors: ["#ef4444"]
    },
    tiana_qin: { bodyColor: "#ef4444", outlineColor: "#dc2626", scale: 1.05, headHeight: 44.45, earOrientation: "upright" },
    wanda: { bodyColor: "#f59e0b", outlineColor: "#d97706", scale: 1.0, tailColor: "#ef4444", headHeight: 44.9999, noseColor: "#ef4444", earColor: "#7c2d12", earOrientation: "scaled_default" },
    olivia_chin: { bodyColor: "#fef08a", outlineColor: "#facc15", scale: 1.05, tailColor: "#7c2d12", headHeight: 42, noseColor: "#7c2d12", earColor: "#7c2d12", faceColor: "#fef08a", earOrientation: "upright" },
    ruth_kone_reynolds: {
      bodyColor: "#f472b6",
      outlineColor: "#ec4899",
      scale: 1.15,
      bodyPattern: "flowers",
      bodyPatternColors: ["#ef4444", "#f97316", "#facc15", "#4ade80", "#60a5fa", "#c084fc"],
      headHeight: 44.88,
      earColor: "#7c2d12",
      earOrientation: "upright",
      earPattern: "diamonds",
      earPatternColors: ["#ef4444", "#f97316", "#facc15", "#4ade80", "#60a5fa", "#c084fc"]
    },
    kady_rose: { bodyColor: "#d3d3d3", outlineColor: "#9ca3af", scale: 1.1, tailColor: "#f97316", headHeight: 46, noseColor: "#f97316", earColor: "#7c2d12", earOrientation: "upright" },
    sandra: { bodyColor: "#c084fc", outlineColor: "#a855f7", scale: 1.05, headHeight: 36, earOrientation: "upright" },
    daisy_rose: {
      bodyColor: "#f472b6",
      outlineColor: "#ec4899",
      scale: 1.1,
      tailColor: "#f472b6",
      tailHasSpiral: true,
      tailSpiralColor: "#fef08a",
      hasNecklace: true,
      necklaceColor: "#22c55e",
      bodyPattern: "flowers",
      bodyPatternColors: ["#facc15"],
      headHeight: 46.5,
      noseColor: "#db2777",
      earColor: "#f472b6",
      earOrientation: "upright"
    },
    callie_rose: {
      bodyColor: "#fbbf24",
      outlineColor: "#d97706",
      scale: 1.1,
      tailColor: "#c2410c",
      hasNecklace: true,
      necklaceColor: "#8b5cf6",
      bodyPattern: "polka-dots",
      bodyPatternColors: ["#3b82f6"],
      headHeight: 44.5,
      noseColor: "#c2410c",
      earColor: "#fbbf24",
      earOrientation: "upright"
    },
    stacey_jasmin: {
      bodyColor: "#7c3aed",
      outlineColor: "#5b21b6",
      scale: 1.08,
      tailColor: "#db2777",
      headHeight: 43,
      noseColor: "#db2777",
      earColor: "#7c3aed",
      earOrientation: "upright"
    },
    getByOpossumId(id: string): any {
      const actualId = id === "arden_rosie_kone_reynolds" ? "arden_rosie" : id;
      return (this as any)[actualId] || null;
    }
  }
};

export default OpossumsAttributesDesign;
