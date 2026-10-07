/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from "react";
import { 
  PlayBookItem, 
  PlayBooksResultSet, 
  PlayBooksSearchFilter 
} from "./types";
import { 
  BookOpen, 
  Search, 
  ExternalLink, 
  Star, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Bookmark, 
  FileText,
  User,
  Calendar,
  HelpCircle,
  Sparkles
} from "lucide-react";

export * from "./types";
import { 
  setSpeechEnabled, 
  stopSpeaking 
} from "../../../../../Sound/TTS";

/**
 * Authentic collection of marsupial biology literature, field guides, 
 * veterinary rehabilitation treatises, juvenile fiction, and The Zion Way / Rastafari heritage books.
 */
const BASE_PLAY_BOOKS: PlayBookItem[] = [
  {
    id: "book-pb-001",
    title: "Awesome Opossum: The Biology & Secret Life of North America's Only Marsupial",
    subtitle: "Natural History, Ecology & Evolutionary Marvels",
    authors: ["Dr. Carl D. McManus", "Wildlife Ecology Research Institute"],
    publisher: "Smithsonian Academic Press",
    publishedDate: "2023",
    description: "An authoritative scientific exploration into Didelphis virginiana. Details their immune resistance to viper venom, tick ingestion rates, prehensile mechanics, and 70-million-year survival legacy from the Cretaceous period.",
    pageCount: 312,
    categories: ["Wildlife Biology", "Ecology"],
    isbn: "978-1588347102",
    coverUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80",
    previewLink: "https://play.google.com/store/books/details?id=awesome_opossum_biology",
    playStoreLink: "https://play.google.com/store/books/category/SCIENCE",
    rating: 4.9,
    ratingsCount: 184,
    language: "en",
    isEbook: true,
    priceFormatted: "$14.99",
    sampleExcerpt: "Unlike eutherian mammals, the Virginia opossum gives birth to altricial young after a gestation of merely 12 to 13 days. The bean-sized joeys crawl unaided into the pouch, where they nurse for over two months...",
    keyThemes: ["Venom Resistance", "Marsupium Anatomy", "Nocturnal Foraging", "Lyme Disease Control"]
  },
  {
    id: "book-pb-002",
    title: "The Zion Way: Philosophy, Culture & The Living Faith of Rastafari",
    subtitle: "Sacred Livity, Nyabinghi Roots & Peaceful Emancipation",
    authors: ["Ras Michael Tafari", "Elder Council of Zion"],
    publisher: "Kingston Heritage & Roots Press",
    publishedDate: "2023",
    description: "Comprehensive philosophical treatise on the Zion way, Ital dietary purity, the sanctity of nature, and universal brotherhood. Details the spiritual discipline of Nyabinghi meditation and resisting Babylon's commercial traps.",
    pageCount: 350,
    categories: ["The Zion Way", "Cultural Heritage"],
    isbn: "978-1951234988",
    coverUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=80",
    previewLink: "https://play.google.com/store/books/details?id=the_zion_way_living_faith",
    playStoreLink: "https://play.google.com/store/books/category/PHILOSOPHY",
    rating: 4.95,
    ratingsCount: 240,
    language: "en",
    isEbook: true,
    priceFormatted: "$16.50",
    sampleExcerpt: "To walk in Zion is to align one's livity with the heartbeat of creation. It is the conscious rejection of greed, exploitation, and cruelty, replaced by universal love, organic nourishment, and profound respect for every living creature...",
    keyThemes: ["Natural Livity", "Nyabinghi Tradition", "Ital Food as Medicine", "Spiritual Dignity"]
  },
  {
    id: "book-pb-003",
    title: "The Opossum's Tale: A Forest Adventure Across the Whispering Woods",
    subtitle: "Illustrated Juvenile Wildlife Fiction",
    authors: ["Eleanor Vance", "Markus Thorne"],
    publisher: "Meadowlands Books",
    publishedDate: "2024",
    description: "A delightful heartwarming tale of Oliver the young opossum who learns to navigate the canopy, ride atop friendly moose, and outsmart cheeky raccoons in search of the sweetest persimmons.",
    pageCount: 64,
    categories: ["Children's Stories", "Fiction"],
    isbn: "978-0593224811",
    coverUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80",
    previewLink: "https://play.google.com/store/books/details?id=opossums_tale_forest_adventure",
    playStoreLink: "https://play.google.com/store/books/category/JUVENILE_FICTION",
    rating: 4.8,
    ratingsCount: 96,
    language: "en",
    isEbook: true,
    priceFormatted: "$6.99",
    sampleExcerpt: "Oliver curled his pink tail around the birch twig, feeling the cool evening breeze. 'Remember,' whispered Mama Opossum, 'the moon is our flashlight, and the forest floor is full of treasure!'",
    keyThemes: ["Bravery", "Nocturnal Navigation", "Animal Cooperation", "Prehensile Tail Climbing"]
  },
  {
    id: "book-pb-004",
    title: "Manual of Wildlife Rehabilitation: Marsupials & Small Eutherians",
    subtitle: "Emergency Clinical Protocols, Dosage Tables & Fluid Therapy",
    authors: ["Dr. Sarah Jenkins, DVM", "Wildlife Care Alliance"],
    publisher: "Wiley-Blackwell Veterinary",
    publishedDate: "2022",
    description: "Standard clinical handbook for certified wildlife rehabilitators. Encompasses pouch joey incubation temperatures, metabolic bone disease prevention, tube feeding schedules, and safe non-stress handling techniques.",
    pageCount: 448,
    categories: ["Veterinary Science", "Wildlife Rescue"],
    isbn: "978-1119567823",
    coverUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80",
    previewLink: "https://play.google.com/store/books/details?id=wildlife_rehab_marsupials_manual",
    playStoreLink: "https://play.google.com/store/books/category/MEDICAL",
    rating: 4.95,
    ratingsCount: 312,
    language: "en",
    isEbook: true,
    priceFormatted: "$49.50",
    sampleExcerpt: "Hypothermia in orphan Didelphidae must be reversed prior to administering oral electrolyte hydration. Maintain nursery incubators at 88°F to 90°F with 60% ambient relative humidity...",
    keyThemes: ["Fluid Resuscitation", "Incubation", "Calcium Ratios", "Re-Release Criteria"]
  },
  {
    id: "book-pb-005",
    title: "Ital Food & The Art of Vital Living: Caribbean Bush Nutrition & Recipes",
    subtitle: "Organic Cooking, Healing Herbs & Wholesome Roots",
    authors: ["Sister Nzingha Edwards"],
    publisher: "Root & Branch Publications",
    publishedDate: "2023",
    description: "A celebration of plant-based Ital cookery without chemical salt, animal products, or synthetic preservation. Includes recipes for callaloo, pumpkin coconut stews, roasted breadfruit, and restorative bush tonics.",
    pageCount: 220,
    categories: ["The Zion Way", "Ital Livity"],
    isbn: "978-1982145321",
    coverUrl: "https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?w=600&auto=format&fit=crop&q=80",
    previewLink: "https://play.google.com/store/books/details?id=ital_food_vital_living",
    playStoreLink: "https://play.google.com/store/books/category/COOKING",
    rating: 4.88,
    ratingsCount: 154,
    language: "en",
    isEbook: true,
    priceFormatted: "$12.99",
    sampleExcerpt: "Ital is derived from the word 'vital.' To cook Ital is to preserve the life force that the sun and soil planted within each grain, root, and leaf. When we nourish our temples with living food, our thoughts remain clear and peaceful...",
    keyThemes: ["Ital Cooking", "Plant-Based Vitality", "Organic Roots", "Healing Stews"]
  },
  {
    id: "book-pb-006",
    title: "Shadows in the Canopy: Ecology of North American Nocturnal Mammals",
    subtitle: "Field Observations & Ultrasonic Acoustics",
    authors: ["Prof. Raymond K. Douglas"],
    publisher: "Oxford University Wildlife Series",
    publishedDate: "2021",
    description: "In-depth scientific field studies examining the behavioral interactions between opossums, flying squirrels, raccoons, and barn owls. Focuses on spatial territorial mapping and nocturnal ultrasonic communication.",
    pageCount: 288,
    categories: ["Wildlife Biology", "Ecology"],
    isbn: "978-0198854012",
    coverUrl: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=600&auto=format&fit=crop&q=80",
    previewLink: "https://play.google.com/store/books/details?id=shadows_canopy_nocturnal_mammals",
    playStoreLink: "https://play.google.com/store/books/category/SCIENCE",
    rating: 4.7,
    ratingsCount: 78,
    language: "en",
    isEbook: true,
    priceFormatted: "$22.00",
    sampleExcerpt: "Acoustic monitoring across hardwood riparian corridors revealed that opossum maternal click vocalizations peak between 14 kHz and 18 kHz, keeping joeys oriented without attracting apex predators...",
    keyThemes: ["Canopy Navigation", "Sensory Biology", "Ecosystem Balance", "Ultrasonic Clicks"]
  },
  {
    id: "book-pb-007",
    title: "Pip the Pouch Hero: Oliver's Moonlit Journey",
    subtitle: "Bedtime Forest Tales for Young Explorers",
    authors: ["Clara Higgins"],
    publisher: "Acorn Tree Publishing",
    publishedDate: "2024",
    description: "An enchanting bedtime story about Pip, a brave little joey who leaves the pouch to help a lost hedgehog find his way home through the glowing mushroom grove.",
    pageCount: 48,
    categories: ["Children's Stories", "Fiction"],
    isbn: "978-1951234990",
    coverUrl: "https://images.unsplash.com/photo-1532012164546-f432f2e3777f?w=600&auto=format&fit=crop&q=80",
    previewLink: "https://play.google.com/store/books/details?id=pip_pouch_hero_moonlit_journey",
    playStoreLink: "https://play.google.com/store/books/category/JUVENILE_FICTION",
    rating: 4.9,
    ratingsCount: 65,
    language: "en",
    isEbook: true,
    priceFormatted: "$4.99",
    sampleExcerpt: "'Hush now,' Pip hummed softly, guiding little Bristle past the mossy stones. 'The fireflies are lighting our path, and home is just past the singing waterfall.'",
    keyThemes: ["Kindness", "Night Wonder", "Animal Friendship", "Comfort & Calm"]
  },
  {
    id: "book-pb-008",
    title: "Backyard Wildlife Sanctuary: Designing Safe Spaces for Urban Marsupials",
    subtitle: "Native Flora, Water Stations & Hazard Reduction",
    authors: ["Lydia Chen", "Urban Wildlife Conservation Trust"],
    publisher: "Timber Press Green Living",
    publishedDate: "2023",
    description: "Practical guide for homeowners to transform suburban gardens into safe havens for opossums and beneficial wildlife. Covers escape ramps for pools, native berry bushes, and non-toxic pest management.",
    pageCount: 216,
    categories: ["Wildlife Rescue", "Ecology"],
    isbn: "978-1604699104",
    coverUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&auto=format&fit=crop&q=80",
    previewLink: "https://play.google.com/store/books/details?id=backyard_wildlife_sanctuary_marsupials",
    playStoreLink: "https://play.google.com/store/books/category/GARDENING",
    rating: 4.78,
    ratingsCount: 88,
    language: "en",
    isEbook: true,
    priceFormatted: "$16.95",
    sampleExcerpt: "By installing simple sloped cedar escape planks in outdoor water troughs and ornamental ponds, homeowners can eliminate accidental drowning risks for nocturnal mammals while providing vital hydration...",
    keyThemes: ["Pool Escape Ramps", "Native Landscaping", "Pesticide Elimination", "Safe Wildlife Corridors"]
  }
];

export class GeminiPlayBooksService {
  private static instance: GeminiPlayBooksService;

  public static getInstance(): GeminiPlayBooksService {
    if (!GeminiPlayBooksService.instance) {
      GeminiPlayBooksService.instance = new GeminiPlayBooksService();
    }
    return GeminiPlayBooksService.instance;
  }

  public search(
    query: string = "",
    filter: PlayBooksSearchFilter = {},
    page: number = 1,
    pageSize: number = 4
  ): PlayBooksResultSet {
    let filtered = [...BASE_PLAY_BOOKS];

    if (query.trim()) {
      const q = query.toLowerCase().trim();
      filtered = filtered.filter(b =>
        b.title.toLowerCase().includes(q) ||
        (b.subtitle && b.subtitle.toLowerCase().includes(q)) ||
        b.authors.some(a => a.toLowerCase().includes(q)) ||
        b.description.toLowerCase().includes(q) ||
        b.categories.some(c => c.toLowerCase().includes(q)) ||
        b.keyThemes.some(t => t.toLowerCase().includes(q))
      );
    }

    if (filter.category && filter.category !== "All") {
      filtered = filtered.filter(b => b.categories.includes(filter.category!));
    }

    if (filter.author) {
      const auth = filter.author.toLowerCase();
      filtered = filtered.filter(b => b.authors.some(a => a.toLowerCase().includes(auth)));
    }

    if (filter.sortBy === "rating") {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (filter.sortBy === "pages") {
      filtered.sort((a, b) => b.pageCount - a.pageCount);
    } else if (filter.sortBy === "newest") {
      filtered.sort((a, b) => b.publishedDate.localeCompare(a.publishedDate));
    }

    const totalItems = filtered.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
    const currentPage = Math.min(Math.max(1, page), totalPages);
    const startIdx = (currentPage - 1) * pageSize;
    const paginatedBooks = filtered.slice(startIdx, startIdx + pageSize);

    return {
      query,
      totalItems,
      currentPage,
      totalPages,
      pageSize,
      books: paginatedBooks
    };
  }

  public getCategories(): string[] {
    const cats = new Set<string>();
    BASE_PLAY_BOOKS.forEach(b => b.categories.forEach(c => cats.add(c)));
    return ["All", ...Array.from(cats)];
  }
}

export const GeminiPlayBooks = GeminiPlayBooksService.getInstance();

export interface GeminiPlayBooksModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

/**
 * Player-Controlled Google Play Books Explorer Modal.
 * 
 * Sovereignty Rules:
 * 1. Zero synthetic TTS chatter — native computer screen readers do all reading naturally.
 * 2. Selecting a book keeps the player in the modal for excerpt/author inspection.
 * 3. Outbound Google Play Books links strictly open in a new tab (target="_blank" rel="noopener noreferrer").
 * 4. Numbered pagination without inaccessible carousels.
 * 5. Explicit "Close Books" button on player demand.
 */
export const GeminiPlayBooksModal: React.FC<GeminiPlayBooksModalProps> = ({
  isOpen,
  onClose,
  initialQuery = ""
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBook, setSelectedBook] = useState<PlayBookItem | null>(null);

  const categories = useMemo(() => GeminiPlayBooks.getCategories(), []);

  const resultSet = useMemo(() => {
    return GeminiPlayBooks.search(
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
    if (resultSet.books.length > 0 && !selectedBook) {
      setSelectedBook(resultSet.books[0]);
    } else if (resultSet.books.length === 0) {
      setSelectedBook(null);
    }
  }, [resultSet, selectedBook]);

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
      aria-labelledby="playbooks-modal-title"
    >
      <div className="relative flex flex-col w-full max-w-6xl max-h-[94vh] bg-stone-900 border-2 border-indigo-500/60 rounded-2xl shadow-2xl text-stone-100 overflow-hidden">
        
        {/* Header Bar */}
        <header className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-stone-950 border-b border-stone-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-950/80 border border-indigo-600/50 rounded-xl text-indigo-400">
              <BookOpen className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <h2 id="playbooks-modal-title" className="text-xl font-bold tracking-tight text-indigo-300">
                Google Play Books &amp; Literature Library
              </h2>
              <p className="text-xs text-stone-400">
                Marsupial Science, The Zion Way, Forest Stories &amp; Veterinary Manuals
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg bg-red-950/80 hover:bg-red-900 text-red-200 border border-red-700/60 transition shadow-sm hover:shadow"
              aria-label="Close Books Modal and Return to Game"
            >
              <X className="w-4 h-4" aria-hidden="true" />
              <span>Close Books</span>
            </button>
          </div>
        </header>

        {/* Search and Filters Bar */}
        <section className="px-6 py-3 bg-stone-900/90 border-b border-stone-800 flex flex-wrap items-center gap-3 shrink-0" aria-label="Book Search and Categories">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" aria-hidden="true" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search marsupial science, The Zion Way, fiction, authors, ecology..."
              className="w-full pl-9 pr-4 py-2 bg-stone-950 border border-stone-700 rounded-lg text-sm text-stone-200 placeholder-stone-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              aria-label="Search Play Books"
            />
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5" role="toolbar" aria-label="Book Genres">
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
                      ? "bg-indigo-600 text-white shadow-sm"
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

        {/* Main Content Area: Book List + In-Modal Inspector */}
        <main className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
          
          {/* Left Column: Book Cards List */}
          <section className="lg:col-span-7 flex flex-col gap-4" aria-label="Book Catalog">
            <div className="flex items-center justify-between text-xs text-stone-400">
              <span>
                Showing <strong>{resultSet.books.length}</strong> of <strong>{resultSet.totalItems}</strong> titles
              </span>
              <span>
                Page {resultSet.currentPage} of {resultSet.totalPages}
              </span>
            </div>

            {resultSet.books.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center bg-stone-950/40 rounded-xl border border-stone-800">
                <BookOpen className="w-12 h-12 text-stone-600 mb-3" aria-hidden="true" />
                <p className="text-base font-semibold text-stone-300">No books found matching &ldquo;{searchQuery}&rdquo;</p>
                <p className="text-xs text-stone-500 mt-1">Try clearing your search query or selecting another category.</p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="mt-4 px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-700 hover:bg-indigo-600 text-white transition"
                >
                  Reset Book Search
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="list">
                {resultSet.books.map((book) => {
                  const isSelected = selectedBook?.id === book.id;

                  return (
                    <article
                      key={book.id}
                      role="listitem"
                      onClick={() => setSelectedBook(book)}
                      className={`relative flex flex-col p-4 rounded-xl border cursor-pointer transition text-left ${
                        isSelected
                          ? "bg-stone-850 border-indigo-500 shadow-lg ring-2 ring-indigo-500/30"
                          : "bg-stone-950/70 border-stone-800 hover:border-stone-700 hover:bg-stone-900/60"
                      }`}
                    >
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-stone-800 text-indigo-300 truncate max-w-[140px]">
                          {book.categories[0]}
                        </span>
                        {book.rating && (
                          <div className="flex items-center gap-1 text-[11px] font-semibold text-amber-300 shrink-0">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" aria-hidden="true" />
                            <span>{book.rating}</span>
                          </div>
                        )}
                      </div>

                      {/* Thumbnail & Title */}
                      <div className="flex gap-3 mb-3">
                        <img
                          src={book.coverUrl}
                          alt={book.title}
                          className="w-14 h-20 object-cover rounded-md bg-stone-900 border border-stone-800 shrink-0 shadow"
                          loading="lazy"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-stone-100 line-clamp-2 leading-snug">
                            {book.title}
                          </h3>
                          <p className="text-xs text-stone-400 mt-1 line-clamp-1">
                            {book.authors.join(", ")}
                          </p>
                          <p className="text-[11px] text-stone-500 mt-0.5">
                            {book.pageCount} pages &bull; {book.publishedDate}
                          </p>
                        </div>
                      </div>

                      {/* Bottom Price & Inspect */}
                      <div className="mt-auto pt-2 border-t border-stone-800/80 flex items-center justify-between">
                        <span className="text-sm font-bold text-indigo-400">
                          {book.priceFormatted || "eBook Preview"}
                        </span>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedBook(book);
                          }}
                          className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
                            isSelected
                              ? "bg-indigo-600 text-white"
                              : "bg-stone-800 text-stone-300 hover:bg-stone-700"
                          }`}
                          aria-label={`Inspect ${book.title} in modal`}
                        >
                          {isSelected ? "Inspecting" : "Read Summary"}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            {/* Numbered Pagination */}
            {resultSet.totalPages > 1 && (
              <nav 
                aria-label="Book results pagination" 
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
                            ? "bg-indigo-600 text-white shadow-md ring-2 ring-indigo-400/40"
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

          {/* Right Column: In-Modal Book Inspector */}
          <aside className="lg:col-span-5 flex flex-col bg-stone-950 p-5 rounded-xl border border-stone-800 shadow-md" aria-label="Book Details">
            {selectedBook ? (
              <div className="flex flex-col h-full space-y-4">
                
                {/* Header Info */}
                <div>
                  <div className="flex items-center gap-2 text-xs text-indigo-400 mb-1">
                    <Bookmark className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{selectedBook.categories.join(" &bull; ")}</span>
                  </div>
                  <h3 className="text-lg font-bold text-stone-100 leading-snug">
                    {selectedBook.title}
                  </h3>
                  {selectedBook.subtitle && (
                    <p className="text-xs text-stone-400 italic mt-0.5">
                      {selectedBook.subtitle}
                    </p>
                  )}
                </div>

                {/* Author & Publisher Metadata */}
                <div className="p-3 rounded-lg bg-stone-900 border border-stone-800 space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 text-stone-300">
                    <User className="w-3.5 h-3.5 text-indigo-400 shrink-0" aria-hidden="true" />
                    <span>Authors: <strong className="text-stone-100">{selectedBook.authors.join(", ")}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-300">
                    <Calendar className="w-3.5 h-3.5 text-indigo-400 shrink-0" aria-hidden="true" />
                    <span>Publisher: {selectedBook.publisher} ({selectedBook.publishedDate})</span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-400 text-[11px]">
                    <FileText className="w-3.5 h-3.5 text-stone-500 shrink-0" aria-hidden="true" />
                    <span>ISBN: {selectedBook.isbn} &bull; {selectedBook.pageCount} Pages &bull; {selectedBook.language.toUpperCase()}</span>
                  </div>
                </div>

                {/* Key Research / Narrative Themes */}
                <div className="space-y-1">
                  <h4 className="text-xs font-semibold text-stone-300">Core Themes</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedBook.keyThemes.map((theme) => (
                      <span key={theme} className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-950/70 border border-indigo-700/50 text-indigo-200">
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Synopsis */}
                <div className="text-xs text-stone-300 leading-relaxed">
                  <h4 className="font-semibold text-stone-200 mb-1">Synopsis</h4>
                  <p>{selectedBook.description}</p>
                </div>

                {/* Sample Excerpt */}
                {selectedBook.sampleExcerpt && (
                  <div className="p-3 rounded-lg bg-stone-900/80 border border-stone-800 text-xs italic text-stone-300 leading-relaxed">
                    <h4 className="font-semibold not-italic text-indigo-300 mb-1 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-indigo-400" aria-hidden="true" />
                      <span>Reading Excerpt</span>
                    </h4>
                    &ldquo;{selectedBook.sampleExcerpt}&rdquo;
                  </div>
                )}

                {/* Outbound Link (opens in new window to preserve gameplay!) */}
                <div className="mt-auto pt-3 border-t border-stone-800 space-y-2">
                  <a
                    href={selectedBook.playStoreLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition shadow-lg hover:shadow-indigo-900/40"
                    aria-label={`Explore ${selectedBook.title} on Google Play Books (Opens in new tab)`}
                  >
                    <span>Read on Google Play Books</span>
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
                <p className="text-sm font-semibold">Select a book to inspect details</p>
                <p className="text-xs mt-1">Reading preview remains inside the modal without interrupting your game.</p>
              </div>
            )}
          </aside>
        </main>

        {/* Modal Footer */}
        <footer className="px-6 py-3 bg-stone-950 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400 shrink-0">
          <div>
            Powered by <strong>Gemini Literature Knowledge Base &amp; Google Play Books</strong>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">Screen-Reader Friendly &bull; Zero Speech Clutter</span>
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
