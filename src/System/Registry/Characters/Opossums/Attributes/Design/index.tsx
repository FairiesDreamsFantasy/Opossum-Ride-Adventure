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
      off_white: { hex: "#f9fafb", label: "Alabaster Off-White", opossums: ["melissa", "ashley", "jalissa_chin"] }
    },
    White: {
      pure_white: { hex: "#ffffff", label: "Pure White", opossums: ["amara_qin"] }
    },
    Peach_Apricot: {
      apricot: { hex: "#ffedd5", label: "Peach Apricot", opossums: ["dagmar_kone_reynolds", "arden_rosie_kone_reynolds"] }
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
      if (["amara_qin"].includes(id)) return { root: "White", tone: "pure_white" };
      if (["dagmar_kone_reynolds", "arden_rosie_kone_reynolds"].includes(id)) return { root: "Peach_Apricot", tone: "apricot" };
      if (["jahmella_rose"].includes(id)) return { root: "Tan_Caramel", tone: "tan" };
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
    circle_pattern: { label: "Circle Pattern", opossums: ["jahmella_rose", "agape_rose"] },
    flower_pattern: { label: "25-color Flower Pattern", opossums: ["ruth_kone_reynolds"] },
    none: { label: "Plain / Solid No Pattern", opossums: ["melissa", "ashley", "amara_qin", "saffron_rose", "jalissa_chin", "tiana_qin", "wanda", "olivia_chin", "kady_rose", "sandra"] },
    getByOpossumId(id: string) {
      if (["dagmar_kone_reynolds", "arden_rosie_kone_reynolds", "roxanne_kone_reynolds"].includes(id)) return "diamond_pattern";
      if (["jahmella_rose", "agape_rose"].includes(id)) return "circle_pattern";
      if (["ruth_kone_reynolds"].includes(id)) return "flower_pattern";
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
    getByOpossumId(id: string): boolean {
      const actualId = id === "arden_rosie" ? "arden_rosie_kone_reynolds" : id;
      if (actualId === "melissa" || actualId === "ashley" || actualId === "sandra") return false;
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
    getByOpossumId(id: string): boolean {
      const actualId = id === "arden_rosie" ? "arden_rosie_kone_reynolds" : id;
      if (actualId === "melissa" || actualId === "ashley" || actualId === "sandra") return false;
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
    getByOpossumId(id: string): string {
      const actualId = id === "arden_rosie" ? "arden_rosie_kone_reynolds" : id;
      return (this as any)[actualId] || "Standard";
    }
  }
};

export default OpossumsAttributesDesign;
