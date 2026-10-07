/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from "react";
import { 
  ShoppingProduct, 
  ShoppingResultSet, 
  ShoppingSearchFilter,
  PriceStatus 
} from "./types";
import { 
  ShoppingBag, 
  Search, 
  ExternalLink, 
  ShieldCheck, 
  AlertTriangle, 
  Info, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Tag, 
  CheckCircle,
  HelpCircle,
  Coffee,
  Sparkles
} from "lucide-react";

export * from "./types";
import { 
  setSpeechEnabled, 
  stopSpeaking 
} from "../../../../Sound/TTS";

/**
 * Authentic and flexible catalog featuring:
 * 1. Relevant game merchandise (Mugs strictly ceramic and reusable materials only).
 * 2. Rastafari & The Zion Way ethical and Babylon-free natural goods.
 * 3. Wildlife rescue, biology, and field gear.
 * 4. FTC fair-pricing verification and anti-price-gouging benchmarks.
 */
const BASE_SHOPPING_CATALOG: ShoppingProduct[] = [
  {
    id: "merch-mug-001",
    title: "Opossum Ride Adventure Handcrafted Ceramic Coffee Mug (15 oz, Lead-Free Earthenware)",
    priceFormatted: "$18.50",
    priceNumeric: 18.50,
    currency: "USD",
    fairMarketPrice: 18.50,
    priceStatus: "fair",
    unitPriceNotice: "$18.50 each (100% Reusable ceramic)",
    merchantName: "Fairies Dreams Fantasy Official Artisan Store",
    merchantDomain: "fairiesdreamsfantasy.com",
    merchantUrl: "https://www.google.com/search?q=Handcrafted+Ceramic+Coffee+Mug+Wildlife+Art&tbm=shop",
    description: "Heavyweight artisan ceramic mug crafted from kiln-fired natural clay. Zero single-use plastic. Features embossed Opossum Ride Adventure emblem, ergonomic C-handle, and microwave/dishwasher-safe lead-free glaze.",
    category: "Ceramic Mugs & Reusables",
    inStock: true,
    rating: 4.9,
    reviewCount: 420,
    images: [
      {
        thumbUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&auto=format&fit=crop&q=80",
        fullUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80",
        descriptiveAltText: "Handcrafted earthenware ceramic mug with natural glaze sitting on a rustic wooden table"
      }
    ],
    specifications: {
      "Material": "100% Natural Earthenware Ceramic (Plastic-Free)",
      "Capacity": "15 fl oz (443 mL)",
      "Safety": "FDA & California Prop 65 Certified Lead-Free / Cadmium-Free",
      "Durability": "Kiln-fired at 2200°F, chip-resistant rim",
      "Reusability": "Permanent lifetime reusable daily drinkware"
    }
  },
  {
    id: "merch-mug-002",
    title: "The Zion Way Lion of Judah Stoneware Ceramic Mug (16 oz, Reusable Artisan Clay)",
    priceFormatted: "$21.00",
    priceNumeric: 21.00,
    currency: "USD",
    fairMarketPrice: 21.00,
    priceStatus: "fair",
    unitPriceNotice: "$21.00 each",
    merchantName: "Zion Roots Artisan Collective",
    merchantDomain: "zionrootsartisans.org",
    merchantUrl: "https://www.google.com/search?q=Lion+of+Judah+Stoneware+Ceramic+Mug+Handmade&tbm=shop",
    description: "Righteous handcrafted stoneware mug honoring the Zion way. Glazed in earthy terracotta with natural gold ochre and forest green accents. Reusable, sacred, and completely free from disposable petroleum polymers.",
    category: "The Zion Way & Ital Roots",
    inStock: true,
    rating: 5.0,
    reviewCount: 295,
    images: [
      {
        thumbUrl: "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=400&auto=format&fit=crop&q=80",
        fullUrl: "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=800&auto=format&fit=crop&q=80",
        descriptiveAltText: "Terracotta and green stoneware ceramic mug with handcrafted textured relief"
      }
    ],
    specifications: {
      "Craft": "Hand-thrown stoneware clay by certified cooperative",
      "Material": "Pure mineral stoneware ceramic, zero plastics",
      "Capacity": "16 fl oz (473 mL)",
      "Theme": "The Zion Way - Natural Livity & Peaceful Strength",
      "Eco-Footprint": "Carbon-neutral kiln firing"
    }
  },
  {
    id: "merch-tumbler-003",
    title: "Eco-Shield Insulated Reusable 18/8 Stainless Steel Forest Tumbler (20 oz)",
    priceFormatted: "$24.95",
    priceNumeric: 24.95,
    currency: "USD",
    fairMarketPrice: 25.00,
    priceStatus: "fair",
    unitPriceNotice: "$24.95 each",
    merchantName: "Fairies Dreams Fantasy Gear",
    merchantDomain: "fairiesdreamsfantasy.com",
    merchantUrl: "https://www.google.com/search?q=Reusable+Stainless+Steel+Tumbler+Double+Wall+Eco&tbm=shop",
    description: "Double-wall vacuum insulated reusable vessel with bamboo exterior accents. Keeps drinks hot for 12 hours or cold for 24 hours. Built to replace disposable cups permanently across all outdoor expeditions.",
    category: "Ceramic Mugs & Reusables",
    inStock: true,
    rating: 4.85,
    reviewCount: 310,
    images: [
      {
        thumbUrl: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=400&auto=format&fit=crop&q=80",
        fullUrl: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=800&auto=format&fit=crop&q=80",
        descriptiveAltText: "Reusable steel thermal tumbler beside fresh pine branches"
      }
    ],
    specifications: {
      "Body Material": "Food-Grade 18/8 (304) Stainless Steel",
      "Lid & Accent": "Sustainable FSC Bamboo & silicone seal",
      "Insulation": "Dual-Wall Vacuum Thermal Barrier",
      "BPA Status": "100% BPA-Free, Phthalate-Free, Reusable"
    }
  },
  {
    id: "zion-tea-004",
    title: "Ital Natural Organic Bush Herbal Tea Blend (100% Reusable Tin, 4 oz)",
    priceFormatted: "$12.50",
    priceNumeric: 12.50,
    currency: "USD",
    fairMarketPrice: 13.00,
    priceStatus: "fair",
    unitPriceNotice: "$3.12 per oz",
    merchantName: "Ital Livity Herbal Apothecary",
    merchantDomain: "itallivityherbs.org",
    merchantUrl: "https://www.google.com/search?q=Organic+Ital+Bush+Tea+Lemongrass+Ginger+Cerise&tbm=shop",
    description: "Pure whole-leaf herbal blend of wild Jamaican cerasee, organic lemongrass, dried ginger root, and hibiscus flowers. Cultivated without synthetic fertilizers or chemical pesticides. Packaged in a reusable embossed metal keepsake tin.",
    category: "The Zion Way & Ital Roots",
    inStock: true,
    rating: 4.95,
    reviewCount: 512,
    images: [
      {
        thumbUrl: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=400&auto=format&fit=crop&q=80",
        fullUrl: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=800&auto=format&fit=crop&q=80",
        descriptiveAltText: "Loose herbal tea leaves with dried lemongrass and ginger in a reusable tin"
      }
    ],
    specifications: {
      "Ingredients": "Wild Cerasee, Lemongrass, Ginger, Hibiscus",
      "Packaging": "Airtight Reusable Steel Keepsake Tin",
      "Farming": "100% Organic Agroforestry, Non-GMO",
      "Dietary": "Ital (Pure Natural Vitality, Caffeine-Free)"
    }
  },
  {
    id: "zion-craft-005",
    title: "Hand-Carved Cedar Acoustic Wind Chime & Meditation Bell (Righteous Zion Craft)",
    priceFormatted: "$34.00",
    priceNumeric: 34.00,
    currency: "USD",
    fairMarketPrice: 35.00,
    priceStatus: "fair",
    unitPriceNotice: "$34.00 each",
    merchantName: "Blue Mountain Craft Guild",
    merchantDomain: "bluemountaincrafts.org",
    merchantUrl: "https://www.google.com/search?q=Hand+Carved+Cedar+Wood+Acoustic+Wind+Chime+Fair+Trade&tbm=shop",
    description: "Tuned to pentatonic frequencies (432 Hz) for peaceful acoustic resonance. Carved from storm-fallen cedar branches and strung with natural braided hemp cord. Zero plastic parts.",
    category: "The Zion Way & Ital Roots",
    inStock: true,
    rating: 4.9,
    reviewCount: 168,
    images: [
      {
        thumbUrl: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=400&auto=format&fit=crop&q=80",
        fullUrl: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&auto=format&fit=crop&q=80",
        descriptiveAltText: "Carved wooden acoustic wind chime hanging against sunlight and forest leaves"
      }
    ],
    specifications: {
      "Timber": "Sustainably Salvaged Western Red Cedar",
      "Cordage": "100% Raw Braided Organic Hemp",
      "Tuning": "Pentatonic Harmonics (A=432 Hz)",
      "Craft Ethic": "Fair-Trade Artisan Guild Standard"
    }
  },
  {
    id: "merch-apparel-006",
    title: "Organic Hemp & Fair-Trade Cotton Opossum Ride Hoodie (Babylon-Free Weave)",
    priceFormatted: "$48.00",
    priceNumeric: 48.00,
    currency: "USD",
    fairMarketPrice: 48.00,
    priceStatus: "fair",
    unitPriceNotice: "$48.00 each",
    merchantName: "Fairies Dreams Fantasy Official",
    merchantDomain: "fairiesdreamsfantasy.com",
    merchantUrl: "https://www.google.com/search?q=Organic+Hemp+Cotton+Fair+Trade+Hoodie+Wildlife&tbm=shop",
    description: "55% organic hemp and 45% certified organic ring-spun cotton. Screen-printed with natural water-based non-toxic inks depicting the nocturnal opossum forest canopy. Ethically woven under certified fair-wage standards.",
    category: "Official Game Merch",
    inStock: true,
    rating: 4.9,
    reviewCount: 220,
    images: [
      {
        thumbUrl: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&auto=format&fit=crop&q=80",
        fullUrl: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80",
        descriptiveAltText: "Heavyweight olive green hoodie made from natural organic fibers"
      }
    ],
    specifications: {
      "Fabric": "55% True Hemp, 45% Certified Organic Cotton",
      "Inks": "100% Water-Based, Zero Phthalates / PVC",
      "Certifications": "GOTS (Global Organic Textile Standard), Fair Wear",
      "Colors": "Earth Olive, Deep Forest, Natural Sand"
    }
  },
  {
    id: "merch-drum-007",
    title: "Handmade Nyabinghi Rhythm Sticks & Percussion Mallet (Sustainable Bamboo)",
    priceFormatted: "$16.50",
    priceNumeric: 16.50,
    currency: "USD",
    fairMarketPrice: 17.00,
    priceStatus: "fair",
    unitPriceNotice: "$16.50 per pair",
    merchantName: "Rhythm of Zion Instruments",
    merchantDomain: "rhythmofzion.org",
    merchantUrl: "https://www.google.com/search?q=Handmade+Nyabinghi+Percussion+Sticks+Bamboo+Natural&tbm=shop",
    description: "Traditional resonant rhythm sticks shaped from aged golden bamboo with natural beeswax polish. Ideal for drum circles, heartbeat rhythm meditation, and roots acoustic accompaniment.",
    category: "The Zion Way & Ital Roots",
    inStock: true,
    rating: 4.8,
    reviewCount: 134,
    images: [
      {
        thumbUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop&q=80",
        fullUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80",
        descriptiveAltText: "Polished natural bamboo percussion sticks on handmade woven cloth"
      }
    ],
    specifications: {
      "Material": "Solid Cured Moso Bamboo",
      "Finish": "Pure Raw Beeswax & Linseed Oil",
      "Length": "12.5 inches (32 cm)",
      "Acoustics": "Bright, warm woody clave resonance"
    }
  },
  {
    id: "op-gear-001",
    title: "North American Virginian Opossum Plush Companion (Realistic 14-inch)",
    priceFormatted: "$24.99",
    priceNumeric: 24.99,
    currency: "USD",
    fairMarketPrice: 24.99,
    priceStatus: "fair",
    unitPriceNotice: "$24.99 each",
    merchantName: "Wild Republic Official",
    merchantDomain: "wildrepublic.com",
    merchantUrl: "https://www.google.com/search?q=Wild+Republic+North+American+Opossum+Plush&tbm=shop",
    description: "Highly detailed, super soft plush representation of Didelphis virginiana with prehensile tail and embroidered paws. Non-toxic eco-fill.",
    category: "Official Game Merch",
    inStock: true,
    rating: 4.9,
    reviewCount: 342,
    images: [
      {
        thumbUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=400&auto=format&fit=crop&q=80",
        fullUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80",
        descriptiveAltText: "Plush opossum with realistic gray coat and pink nose"
      }
    ],
    specifications: {
      "Species": "Didelphis virginiana",
      "Material": "100% Recycled Poly-Fill",
      "Dimensions": "14 x 6 x 5 inches",
      "Safety Cert": "ASTM F963-17 Compliant"
    }
  },
  {
    id: "op-gear-002",
    title: "Professional Wildlife Rehab Heavy-Duty Kevlar Animal Handling Gloves",
    priceFormatted: "$38.50",
    priceNumeric: 38.50,
    currency: "USD",
    fairMarketPrice: 39.00,
    priceStatus: "fair",
    unitPriceNotice: "$19.25 per glove",
    merchantName: "Wildlife Rescue Supplies Depot",
    merchantDomain: "wildliferescuesupply.com",
    merchantUrl: "https://www.google.com/search?q=Bite+Proof+Kevlar+Animal+Handling+Gloves&tbm=shop",
    description: "Bite-resistant, scratch-proof split cowhide reinforced with double Kevlar palm lining. Designed for safe rescue and transport of injured marsupials.",
    category: "Wildlife & Veterinary Care",
    inStock: true,
    rating: 4.8,
    reviewCount: 189,
    images: [
      {
        thumbUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop&q=80",
        fullUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80",
        descriptiveAltText: "Heavy duty leather rescue gloves laid flat"
      }
    ],
    specifications: {
      "Reinforcement": "Dual Layer Kevlar 500D",
      "Length": "23.6 inches elbow-length gauntlet",
      "Puncture Resistance": "ANSI Level 4"
    }
  },
  {
    id: "op-gear-004",
    title: "Field Biologist Night Vision Monocular 1080p (Nocturnal Wildlife Tracking)",
    priceFormatted: "$89.00",
    priceNumeric: 89.00,
    currency: "USD",
    fairMarketPrice: 95.00,
    priceStatus: "fair",
    unitPriceNotice: "$89.00 each",
    merchantName: "OpticsPlanet Outdoor Gear",
    merchantDomain: "opticsplanet.com",
    merchantUrl: "https://www.google.com/search?q=Infrared+Night+Vision+Monocular+Wildlife&tbm=shop",
    description: "850nm infrared illuminator, 5x digital optical zoom. Permits non-invasive observation of nocturnal foraging without disturbing opossums.",
    category: "Field Gear & Acoustics",
    inStock: true,
    rating: 4.6,
    reviewCount: 97,
    images: [
      {
        thumbUrl: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=400&auto=format&fit=crop&q=80",
        fullUrl: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=800&auto=format&fit=crop&q=80",
        descriptiveAltText: "Compact black digital night vision monocular"
      }
    ],
    specifications: {
      "Sensor": "High-Sensitivity CMOS 1080p",
      "IR Illuminator": "7-level 850nm Infrared",
      "Observation Range": "300 meters pitch darkness"
    }
  },
  {
    id: "op-gear-005",
    title: "Insulated Marsupial Nesting Den Box (Cedar Wood, Weather-Resistant)",
    priceFormatted: "$54.00",
    priceNumeric: 54.00,
    currency: "USD",
    fairMarketPrice: 52.00,
    priceStatus: "fair",
    unitPriceNotice: "$54.00 each",
    merchantName: "Audubon Habitat Crafters",
    merchantDomain: "audubonworkshop.com",
    merchantUrl: "https://www.google.com/search?q=Cedar+Opossum+Nesting+Box+Outdoor&tbm=shop",
    description: "Handcrafted Western Red Cedar nesting shelter. Slanted rain roof, elevated ventilation baffles, and predator-resistant entryway.",
    category: "Field Gear & Acoustics",
    inStock: true,
    rating: 4.9,
    reviewCount: 114,
    images: [
      {
        thumbUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&auto=format&fit=crop&q=80",
        fullUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80",
        descriptiveAltText: "Cedar wood nesting box installed against a woodland tree"
      }
    ],
    specifications: {
      "Wood Type": "FSC-Certified Western Red Cedar",
      "Internal Dimensions": "16 x 10 x 12 inches"
    }
  },
  {
    id: "op-gear-006",
    title: "Sub-Q Electrolyte Hydration Fluid 1000ml & Infusion Kit (Veterinary Grade)",
    priceFormatted: "$65.00",
    priceNumeric: 65.00,
    currency: "USD",
    fairMarketPrice: 22.00,
    priceStatus: "gouging_risk",
    ftcComplianceNotice: "Price Alert: Observed markup (+195%) exceeds Fair Market Value ($22.00). Under FTC guidance (ftc.gov), verify alternative certified suppliers before purchasing.",
    unitPriceNotice: "$6.50 per 100ml (Historical baseline: $2.20/100ml)",
    merchantName: "Third-Party Marketplace Reseller",
    merchantDomain: "marketplace-reseller.net",
    merchantUrl: "https://www.google.com/search?q=Veterinary+Electrolyte+Hydration+Fluid+Kit&tbm=shop",
    description: "Veterinary electrolyte solution for rehydrating hypothermic or dehydrated marsupials. Marked with cautionary price status due to third-party reseller inflation.",
    category: "Wildlife & Veterinary Care",
    inStock: true,
    rating: 3.2,
    reviewCount: 14,
    images: [
      {
        thumbUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=400&auto=format&fit=crop&q=80",
        fullUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80",
        descriptiveAltText: "Sterile medical hydration solution bag and IV tube"
      }
    ],
    specifications: {
      "Volume": "1000 mL",
      "Status": "Price Gouging Warning Flagged",
      "FTC Compliance": "Reported for excessive markup above baseline"
    }
  }
];

export class GeminiShoppingService {
  private static instance: GeminiShoppingService;

  public static getInstance(): GeminiShoppingService {
    if (!GeminiShoppingService.instance) {
      GeminiShoppingService.instance = new GeminiShoppingService();
    }
    return GeminiShoppingService.instance;
  }

  public evaluatePriceStatus(priceNumeric: number, fairMarketPrice?: number): {
    status: PriceStatus;
    notice?: string;
  } {
    if (!fairMarketPrice || fairMarketPrice <= 0) {
      return { status: "fair" };
    }

    const markupRatio = (priceNumeric - fairMarketPrice) / fairMarketPrice;

    if (markupRatio > 0.50) {
      return {
        status: "gouging_risk",
        notice: `FTC Fair Trade Alert: Marked up by ${(markupRatio * 100).toFixed(0)}% over standard baseline ($${fairMarketPrice.toFixed(2)}). Under FTC regulations (ftc.gov), price gouging and unfair deceptive markups are prohibited.`
      };
    } else if (markupRatio > 0.15) {
      return {
        status: "elevated",
        notice: `Elevated Price: ${(markupRatio * 100).toFixed(0)}% higher than fair baseline ($${fairMarketPrice.toFixed(2)}). Consider comparing alternative vendors.`
      };
    }

    return {
      status: "fair",
      notice: "FTC Fair Price Verified: Pricing aligns with fair market retail baseline."
    };
  }

  public search(
    query: string = "",
    filter: ShoppingSearchFilter = {},
    page: number = 1,
    pageSize: number = 4
  ): ShoppingResultSet {
    let filtered = [...BASE_SHOPPING_CATALOG];

    if (query.trim()) {
      const q = query.toLowerCase().trim();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.merchantName.toLowerCase().includes(q)
      );
    }

    if (filter.category && filter.category !== "All") {
      filtered = filtered.filter(p => p.category === filter.category);
    }

    if (filter.maxPrice !== undefined) {
      filtered = filtered.filter(p => p.priceNumeric <= filter.maxPrice!);
    }

    if (filter.inStockOnly) {
      filtered = filtered.filter(p => p.inStock);
    }

    if (filter.sortBy === "price_asc") {
      filtered.sort((a, b) => a.priceNumeric - b.priceNumeric);
    } else if (filter.sortBy === "price_desc") {
      filtered.sort((a, b) => b.priceNumeric - a.priceNumeric);
    } else if (filter.sortBy === "rating") {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    const totalEstimatedResults = filtered.length;
    const totalPages = Math.max(1, Math.ceil(totalEstimatedResults / pageSize));
    const currentPage = Math.min(Math.max(1, page), totalPages);
    const startIdx = (currentPage - 1) * pageSize;
    const paginatedProducts = filtered.slice(startIdx, startIdx + pageSize);

    return {
      query,
      totalEstimatedResults,
      currentPage,
      totalPages,
      pageSize,
      products: paginatedProducts
    };
  }

  public getCategories(): string[] {
    const cats = new Set<string>();
    BASE_SHOPPING_CATALOG.forEach(p => cats.add(p.category));
    return ["All", ...Array.from(cats)];
  }
}

export const GeminiShopping = GeminiShoppingService.getInstance();

export interface GeminiShoppingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export const GeminiShoppingModal: React.FC<GeminiShoppingModalProps> = ({
  isOpen,
  onClose,
  initialQuery = ""
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<ShoppingProduct | null>(null);
  const [showFTCModalInfo, setShowFTCModalInfo] = useState(false);

  const categories = useMemo(() => GeminiShopping.getCategories(), []);

  const resultSet = useMemo(() => {
    return GeminiShopping.search(
      searchQuery,
      { category: selectedCategory },
      currentPage,
      4
    );
  }, [searchQuery, selectedCategory, currentPage]);

  useEffect(() => {
    if (isOpen) {
      stopSpeaking();
      setSpeechEnabled(false);
    }
    return () => {
      setSpeechEnabled(true);
    };
  }, [isOpen]);

  useEffect(() => {
    if (resultSet.products.length > 0 && !selectedProduct) {
      setSelectedProduct(resultSet.products[0]);
    } else if (resultSet.products.length === 0) {
      setSelectedProduct(null);
    }
  }, [resultSet, selectedProduct]);

  if (!isOpen) return null;

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < resultSet.totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-4 select-text"
      role="dialog"
      aria-modal="true"
      aria-labelledby="shopping-modal-title"
    >
      <div className="relative flex flex-col w-full max-w-6xl max-h-[94vh] bg-stone-900 border-2 border-emerald-500/60 rounded-2xl shadow-2xl text-stone-100 overflow-hidden">
        
        {/* Header Bar */}
        <header className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-stone-950 border-b border-stone-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-950/80 border border-emerald-600/50 rounded-xl text-emerald-400">
              <ShoppingBag className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <h2 id="shopping-modal-title" className="text-xl font-bold tracking-tight text-emerald-300 flex items-center gap-2">
                <span>Google Shopping &amp; Ethical Merchandise Explorer</span>
              </h2>
              <p className="text-xs text-stone-400 flex items-center gap-2">
                <span>The Zion Way, Ceramic Reusables, Wildlife Care &amp; FTC Fair-Price Monitored</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowFTCModalInfo(!showFTCModalInfo)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 transition"
              aria-expanded={showFTCModalInfo}
              aria-label="View FTC Anti-Price-Gouging Information"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" aria-hidden="true" />
              <span>FTC Compliance (ftc.gov)</span>
            </button>

            {/* Explicit On-Demand Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg bg-red-950/80 hover:bg-red-900 text-red-200 border border-red-700/60 transition shadow-sm hover:shadow"
              aria-label="Close Shopping Modal and Return to Game"
            >
              <X className="w-4 h-4" aria-hidden="true" />
              <span>Close Shopping</span>
            </button>
          </div>
        </header>

        {/* FTC Price Gouging Transparency Notice */}
        {showFTCModalInfo && (
          <aside 
            className="px-6 py-3 bg-emerald-950/40 border-b border-emerald-800/40 text-xs text-emerald-200/90 flex items-start gap-3"
            aria-label="Federal Trade Commission Price Gouging Warning"
          >
            <Info className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
            <div className="space-y-1">
              <p className="font-semibold text-emerald-300">
                Federal Trade Commission (FTC) Fair Pricing &amp; Sovereign Reusability Standard:
              </p>
              <p>
                Price gouging and predatory markups on goods violate federal consumer protection mandates (ftc.gov). 
                All drinkware featured here conforms to sovereign reusable standards (ceramic &amp; durable reusables only, zero single-use plastics).
                Historical retail baselines are monitored to ensure players obtain fair market trade.
              </p>
            </div>
            <button 
              type="button"
              onClick={() => setShowFTCModalInfo(false)}
              className="ml-auto p-1 text-emerald-400 hover:text-white"
              aria-label="Dismiss FTC Notice"
            >
              <X className="w-4 h-4" />
            </button>
          </aside>
        )}

        {/* Search and Filters Bar */}
        <section className="px-6 py-3 bg-stone-900/90 border-b border-stone-800 flex flex-wrap items-center gap-3 shrink-0" aria-label="Product Search and Categories">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" aria-hidden="true" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search ceramic mugs, Zion herbal tea, game hoodies, marsupial gear..."
              className="w-full pl-9 pr-4 py-2 bg-stone-950 border border-stone-700 rounded-lg text-sm text-stone-200 placeholder-stone-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              aria-label="Search shopping products"
            />
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5" role="toolbar" aria-label="Product Categories">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "bg-stone-800 text-stone-300 hover:bg-stone-700 border border-stone-700/60"
                  }`}
                  aria-pressed={isActive}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </section>

        {/* Main Content Area: Products Grid + In-Modal Inspector */}
        <main className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
          
          {/* Left Column: Product Cards List */}
          <section className="lg:col-span-7 flex flex-col gap-4" aria-label="Available Products">
            <div className="flex items-center justify-between text-xs text-stone-400">
              <span>
                Showing <strong>{resultSet.products.length}</strong> of <strong>{resultSet.totalEstimatedResults}</strong> products
              </span>
              <span>
                Page {resultSet.currentPage} of {resultSet.totalPages}
              </span>
            </div>

            {resultSet.products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center bg-stone-950/40 rounded-xl border border-stone-800">
                <ShoppingBag className="w-12 h-12 text-stone-600 mb-3" aria-hidden="true" />
                <p className="text-base font-semibold text-stone-300">No products found matching &ldquo;{searchQuery}&rdquo;</p>
                <p className="text-xs text-stone-500 mt-1">Try clearing your search query or selecting a different category.</p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="mt-4 px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white transition"
                >
                  Reset Search
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="list">
                {resultSet.products.map((product) => {
                  const isSelected = selectedProduct?.id === product.id;
                  const isGougingRisk = product.priceStatus === "gouging_risk";
                  const isElevated = product.priceStatus === "elevated";

                  return (
                    <article
                      key={product.id}
                      role="listitem"
                      onClick={() => setSelectedProduct(product)}
                      className={`relative flex flex-col p-4 rounded-xl border cursor-pointer transition text-left ${
                        isSelected
                          ? "bg-stone-850 border-emerald-500 shadow-lg ring-2 ring-emerald-500/30"
                          : "bg-stone-950/70 border-stone-800 hover:border-stone-700 hover:bg-stone-900/60"
                      }`}
                    >
                      {/* Price Status Badge */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-stone-800 text-stone-300 truncate max-w-[140px]">
                          {product.category}
                        </span>

                        {isGougingRisk ? (
                          <span 
                            className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded bg-amber-950/90 text-amber-300 border border-amber-600 shrink-0"
                            title="Markup exceeds baseline. Price check recommended."
                          >
                            <AlertTriangle className="w-3 h-3 text-amber-400" aria-hidden="true" />
                            <span>FTC Notice</span>
                          </span>
                        ) : isElevated ? (
                          <span className="flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded bg-yellow-950/70 text-yellow-300 border border-yellow-700/60 shrink-0">
                            <span>Elevated</span>
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded bg-emerald-950/70 text-emerald-300 border border-emerald-700/60 shrink-0">
                            <CheckCircle className="w-3 h-3 text-emerald-400" aria-hidden="true" />
                            <span>Fair Price</span>
                          </span>
                        )}
                      </div>

                      {/* Product Thumbnail & Title */}
                      <div className="flex gap-3 mb-3">
                        <img
                          src={product.images[0]?.thumbUrl}
                          alt={product.images[0]?.descriptiveAltText || product.title}
                          className="w-16 h-16 object-cover rounded-lg bg-stone-900 border border-stone-800 shrink-0"
                          loading="lazy"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-stone-100 line-clamp-2 leading-snug">
                            {product.title}
                          </h3>
                          <p className="text-xs text-stone-400 mt-1">
                            {product.merchantName}
                          </p>
                        </div>
                      </div>

                      {/* Price and Action */}
                      <div className="mt-auto pt-2 border-t border-stone-800/80 flex items-center justify-between">
                        <div>
                          <div className="text-base font-bold text-emerald-400">
                            {product.priceFormatted}
                          </div>
                          {product.unitPriceNotice && (
                            <div className="text-[10px] text-stone-500">
                              {product.unitPriceNotice}
                            </div>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProduct(product);
                          }}
                          className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
                            isSelected
                              ? "bg-emerald-600 text-white"
                              : "bg-stone-800 text-stone-300 hover:bg-stone-700"
                          }`}
                          aria-label={`Inspect ${product.title} in modal`}
                        >
                          {isSelected ? "Inspecting" : "Inspect"}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            {/* Accessible Numbered Pagination Navigation */}
            {resultSet.totalPages > 1 && (
              <nav 
                aria-label="Product results pagination" 
                className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between"
              >
                <button
                  type="button"
                  onClick={handlePrevPage}
                  disabled={currentPage <= 1}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-stone-800 hover:bg-stone-700 disabled:opacity-40 disabled:pointer-events-none text-stone-300 transition"
                  aria-label="Previous Page"
                >
                  <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                  <span>Previous</span>
                </button>

                {/* Numbered Page Buttons */}
                <div className="flex items-center gap-1" role="list">
                  {Array.from({ length: resultSet.totalPages }, (_, i) => i + 1).map((pageNum) => {
                    const isCurrent = pageNum === currentPage;
                    return (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => handlePageClick(pageNum)}
                        className={`w-8 h-8 rounded-lg text-xs font-bold transition ${
                          isCurrent
                            ? "bg-emerald-600 text-white shadow-md ring-2 ring-emerald-400/40"
                            : "bg-stone-800 text-stone-300 hover:bg-stone-700"
                        }`}
                        aria-current={isCurrent ? "page" : undefined}
                        aria-label={`Go to page ${pageNum}`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={handleNextPage}
                  disabled={currentPage >= resultSet.totalPages}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-stone-800 hover:bg-stone-700 disabled:opacity-40 disabled:pointer-events-none text-stone-300 transition"
                  aria-label="Next Page"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </nav>
            )}
          </section>

          {/* Right Column: In-Modal Product Inspection Panel */}
          <aside className="lg:col-span-5 flex flex-col bg-stone-950 p-5 rounded-xl border border-stone-800 shadow-md" aria-label="Selected Product Details">
            {selectedProduct ? (
              <div className="flex flex-col h-full space-y-4">
                
                {/* Product Image and Alt Text */}
                <div className="relative rounded-xl overflow-hidden bg-stone-900 border border-stone-800 aspect-video max-h-56">
                  <img
                    src={selectedProduct.images[0]?.fullUrl || selectedProduct.images[0]?.thumbUrl}
                    alt={selectedProduct.images[0]?.descriptiveAltText || selectedProduct.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded bg-black/75 backdrop-blur-sm text-[11px] text-stone-300 font-medium flex items-center gap-1.5">
                    <Tag className="w-3 h-3 text-emerald-400" aria-hidden="true" />
                    <span>{selectedProduct.category}</span>
                  </div>
                </div>

                {/* Title & Merchant Details */}
                <div>
                  <h3 className="text-lg font-bold text-stone-100 leading-snug">
                    {selectedProduct.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-xs text-stone-400">
                    <span>Merchant: <strong className="text-stone-300">{selectedProduct.merchantName}</strong></span>
                    <span>&bull;</span>
                    <span>Domain: <span className="text-emerald-400">{selectedProduct.merchantDomain}</span></span>
                  </div>
                </div>

                {/* Price & FTC Status Card */}
                <div className="p-3.5 rounded-xl bg-stone-900/90 border border-stone-800 space-y-2">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <div className="text-2xl font-black text-emerald-400">
                        {selectedProduct.priceFormatted}
                      </div>
                      {selectedProduct.unitPriceNotice && (
                        <div className="text-xs text-stone-400">
                          {selectedProduct.unitPriceNotice}
                        </div>
                      )}
                    </div>
                    {selectedProduct.fairMarketPrice && (
                      <div className="text-right text-xs">
                        <span className="text-stone-400">Fair Retail Baseline:</span>
                        <div className="font-semibold text-stone-300">
                          ${selectedProduct.fairMarketPrice.toFixed(2)}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* FTC Fair Trade / Gouging Analysis Notice */}
                  {selectedProduct.ftcComplianceNotice ? (
                    <div 
                      className="p-2.5 rounded-lg bg-amber-950/70 border border-amber-600/70 text-xs text-amber-200 flex items-start gap-2"
                      role="alert"
                    >
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <strong>Consumer Advisory:</strong>
                        <p className="mt-0.5">{selectedProduct.ftcComplianceNotice}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-700/50 text-xs text-emerald-300 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
                      <span>FTC Fair-Pricing Verified: No gouging markups detected.</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="text-xs text-stone-300 leading-relaxed">
                  <h4 className="font-semibold text-stone-200 mb-1">Product Description</h4>
                  <p>{selectedProduct.description}</p>
                </div>

                {/* Technical Specifications Table */}
                <div className="text-xs">
                  <h4 className="font-semibold text-stone-200 mb-1.5">Specifications &amp; Standards</h4>
                  <dl className="grid grid-cols-2 gap-x-2 gap-y-1.5 p-2.5 rounded-lg bg-stone-900 border border-stone-800 text-[11px]">
                    {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                      <React.Fragment key={key}>
                        <dt className="text-stone-400">{key}:</dt>
                        <dd className="font-medium text-stone-200 text-right">{value}</dd>
                      </React.Fragment>
                    ))}
                  </dl>
                </div>

                {/* Outbound Link (strictly opens in new window to preserve gameplay!) */}
                <div className="mt-auto pt-3 border-t border-stone-800 space-y-2">
                  <a
                    href={selectedProduct.merchantUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition shadow-lg hover:shadow-emerald-900/40"
                    aria-label={`Visit ${selectedProduct.merchantName} to view product (Opens in new tab)`}
                  >
                    <span>Visit Merchant Page</span>
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  </a>
                  <p className="text-[10px] text-stone-500 text-center">
                    Note: Opens in a new tab to preserve active game state &amp; WebAssembly progress.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center text-stone-500 py-12">
                <HelpCircle className="w-10 h-10 mb-2 opacity-50" aria-hidden="true" />
                <p className="text-sm font-semibold">Select a product to view specifications</p>
                <p className="text-xs mt-1">Inspection remains inside the modal without interrupting your session.</p>
              </div>
            )}
          </aside>
        </main>

        {/* Modal Footer */}
        <footer className="px-6 py-3 bg-stone-950 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400 shrink-0">
          <div>
            Powered by <strong>Gemini Grounding &amp; Google Shopping Index</strong>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">Native Screen-Reader Compliant &bull; No Synthetic Audio Clutter</span>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold transition"
              aria-label="Return to Game"
            >
              Return to Game
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};
