/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TeaBlendSpecification {
  readonly id: string;
  readonly name: string;
  readonly ingredients: string[];
  readonly steepingTimeSeconds: number;
  readonly optimalTemperatureCelsius: number;
  readonly aromaNotes: string;
  readonly caffeineFree: boolean;
  readonly isEveningComfortBlend: boolean;
  readonly description: string;
}

export interface TeaPartyPastrySpecification {
  readonly id: string;
  readonly name: string;
  readonly category: "SCONE" | "BISCUIT" | "TART" | "CAKE_BITE" | "SPREAD";
  readonly ingredients: string[];
  readonly sweetGlaze: string;
  readonly servingTemperature: "WARM" | "ROOM_TEMP" | "CHILLED";
  readonly allergySafe: boolean;
  readonly description: string;
}

export const TEA_BLEND_CATALOG: TeaBlendSpecification[] = [
  {
    id: "BLEND-CHAMOMILE-COMFORT",
    name: "Mountain Chamomile & Sweet Oatstraw",
    ingredients: ["Dried German Chamomile Flowers", "Milky Oatstraw Tops", "Lemon Verbena Leaf", "Sweet Golden Linden Blossom"],
    steepingTimeSeconds: 300,
    optimalTemperatureCelsius: 92,
    aromaNotes: "Warm floral honey, soothing sun-dried hay, and light citrus blossom",
    caffeineFree: true,
    isEveningComfortBlend: true,
    description: "A calming evening herbal blend loved by families, soothing tired travelers and settling toddlers before bedtime."
  },
  {
    id: "BLEND-BERRY-HIBISCUS",
    name: "Wild Mountain Berry & Ruby Hibiscus",
    ingredients: ["Ruby Hibiscus Petals", "Wild Dried Blackberries", "Elderberries", "Rosehips", "Sweet Orange Peel"],
    steepingTimeSeconds: 240,
    optimalTemperatureCelsius: 95,
    aromaNotes: "Tangy sweet summer berries and fragrant ruby floral blossoms",
    caffeineFree: true,
    isEveningComfortBlend: false,
    description: "A vibrant crimson tea served either hot in fine porcelain or gently chilled in crystal goblets."
  },
  {
    id: "BLEND-ROASTED-ROOIBOS",
    name: "Roasted Cedar Rooibos & Madagascar Vanilla",
    ingredients: ["Organic Red Rooibos Needle Leaf", "Bourbon Vanilla Bean Pods", "Cinnamon Bark", "Honeybush"],
    steepingTimeSeconds: 360,
    optimalTemperatureCelsius: 98,
    aromaNotes: "Rich earthy caramel, roasted cedar wood, and sweet creamy vanilla",
    caffeineFree: true,
    isEveningComfortBlend: true,
    description: "A full-bodied, robust caffeine-free red tea that pairs delightfully with clotted cream and berry scones."
  },
  {
    id: "BLEND-HONEY-CLOVER",
    name: "Manor Meadow Honey & White Clover Blossom",
    ingredients: ["Hand-picked White Clover Blossoms", "Red Clover Petals", "Meadow Mint", "Wildflower Honey Crystals"],
    steepingTimeSeconds: 270,
    optimalTemperatureCelsius: 90,
    aromaNotes: "Sweet nectar, meadow green grasses, and gentle mountain mint",
    caffeineFree: true,
    isEveningComfortBlend: false,
    description: "The signature blend of the Opossum family estate, harvested from the manor's botanical gardens."
  },
  {
    id: "BLEND-LAVENDER-MINT",
    name: "Velvet French Lavender & Peppermint Leaf",
    ingredients: ["Provence Blue Lavender Buds", "Crushed Peppermint Leaves", "Spearmint", "Cornflower Petals"],
    steepingTimeSeconds: 300,
    optimalTemperatureCelsius: 94,
    aromaNotes: "Cool refreshing mint underpinned by floral French lavender",
    caffeineFree: true,
    isEveningComfortBlend: true,
    description: "An invigorating yet profoundly peaceful tea popular during twilight fireplace hours."
  }
];

export const PASTRY_TREAT_CATALOG: TeaPartyPastrySpecification[] = [
  {
    id: "TREAT-BERRY-SCONE",
    name: "Warm Blackberry & Buttermilk Scones",
    category: "SCONE",
    ingredients: ["Organic Wheat Flour", "Creamery Buttermilk", "Fresh Wild Blackberries", "Sweet Butter", "Vanilla"],
    sweetGlaze: "Clotted Devonshire Cream & Strawberry Preserve",
    servingTemperature: "WARM",
    allergySafe: false,
    description: "Fluffy, golden-brown scones served fresh from the manor brick ovens with generous berry preserves."
  },
  {
    id: "TREAT-CLOVER-BISCUIT",
    name: "Honey-Glazed Golden Clover Biscuits",
    category: "BISCUIT",
    ingredients: ["Stone-ground Oat Flour", "Manor Wildflower Honey", "Sweet Butter", "Ground Cinnamon"],
    sweetGlaze: "Pure Clover Blossom Honey Drizzle",
    servingTemperature: "WARM",
    allergySafe: true,
    description: "Delicate leaf-shaped biscuits with a glossy wildflower honey glaze that melts in your mouth."
  },
  {
    id: "TREAT-FRUIT-TART",
    name: "Miniature Glazed Raspberry & Custard Tart",
    category: "TART",
    ingredients: ["Crisp Shortcrust Shell", "Vanilla Bean Custard", "Fresh Raspberries", "Apricot Glaze"],
    sweetGlaze: "Shining Apricot Reduction",
    servingTemperature: "ROOM_TEMP",
    allergySafe: false,
    description: "Bite-sized crystal clear fruit tarts topped with fresh orchard berries."
  },
  {
    id: "TREAT-ACORN-COOKIE",
    name: "Gluten-Free Sweet Acorn & Almond Crisp",
    category: "CAKE_BITE",
    ingredients: ["Sweet Acorn Flour", "Crushed Roasted Almonds", "Maple Syrup", "Coconut Oil"],
    sweetGlaze: "Maple Crystal Dusting",
    servingTemperature: "ROOM_TEMP",
    allergySafe: true,
    description: "An opossum specialty! Light, nutty, wholesome cookies crafted from sweet toasted acorns."
  }
];

export const TeaPartyTreats = {
  systemName: "Grand Tea Room Treats Subsystem",
  TEA_BLEND_CATALOG,
  PASTRY_TREAT_CATALOG
};

export default TeaPartyTreats;
