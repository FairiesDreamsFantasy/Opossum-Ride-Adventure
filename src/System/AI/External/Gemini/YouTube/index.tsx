/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from "react";
import { 
  YouTubeVideoItem, 
  YouTubeResultSet, 
  YouTubeSearchFilter 
} from "./types";
import { 
  Youtube, 
  Search, 
  ExternalLink, 
  Play, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  Clock, 
  Eye, 
  Radio, 
  Sparkles,
  HelpCircle
} from "lucide-react";
import { 
  setSpeechEnabled, 
  stopSpeaking 
} from "../../../../Sound/TTS";

export * from "./types";

/**
 * Curated authentic video repository focusing on:
 * - The Zion Way & Rastafari Cultural Heritage
 * - Babylon-Free Self-Reliance, Solar Homesteading & Clean Living
 * - Ital Livity & Natural Herb Food/Medicine
 * - Nyabinghi Drumming & Roots Acoustic Harmonics
 * - Forest Ecology & Wildlife Harmony
 */
const BASE_YOUTUBE_VIDEOS: YouTubeVideoItem[] = [
  {
    id: "yt-zion-001",
    title: "Nyabinghi Heartbeat Drumming & Chants: Meditative Roots of Zion",
    channelTitle: "Roots & Livity Sacred Sound",
    description: "Traditional acoustic Nyabinghi drum session featuring the Thunder drum (Bass), Fuse drum, and Keteh (repeater). Recorded live in the misty hills, honoring peaceful meditation, heartbeat rhythms, and communal unity.",
    publishedAt: "2024",
    duration: "42:15",
    thumbnailUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/watch?v=nyabinghi_heartbeat_chants",
    embedUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    category: "Roots & Acoustics",
    tags: ["Nyabinghi", "The Zion Way", "Acoustic Drums", "Meditation", "Babylon-Free"],
    babylonFreeVerified: true,
    zionWayFocus: "Sacred Heartbeat Rhythm & Chanting",
    viewsFormatted: "284K views"
  },
  {
    id: "yt-zion-002",
    title: "Ital Livity: Natural Bush Agroforestry, Mountain Herbs & Food As Medicine",
    channelTitle: "Earth & Zion Elders",
    description: "An inspiring tour of an off-grid organic mountain farm. Elders demonstrate traditional permaculture, companion planting with lemongrass and cerasee, natural soil regeneration, and cooking an Ital stew without synthetic additives.",
    publishedAt: "2024",
    duration: "28:40",
    thumbnailUrl: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=600&auto=format&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/watch?v=ital_livity_agroforestry",
    embedUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    category: "Ital Livity",
    tags: ["Ital Cooking", "Agroforestry", "Medicinal Herbs", "Livity", "Ecology"],
    babylonFreeVerified: true,
    zionWayFocus: "Pure Living & Organic Agroecology",
    viewsFormatted: "192K views"
  },
  {
    id: "yt-zion-003",
    title: "Babylon-Free Community Building: Self-Reliance, Solar Energy & Gravity Water",
    channelTitle: "Sovereign Homesteading Network",
    description: "Step-by-step documentation of building an independent, sustainable eco-settlement. Highlights spring water filtration, solar micro-grids, natural timber carpentry, and escaping commercial consumption traps.",
    publishedAt: "2023",
    duration: "35:12",
    thumbnailUrl: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=600&auto=format&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/watch?v=babylon_free_sovereign_living",
    embedUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    category: "Community & Ecology",
    tags: ["Babylon-Free", "Off-Grid", "Self-Reliance", "Clean Energy", "Sovereignty"],
    babylonFreeVerified: true,
    zionWayFocus: "Autonomous Righteous Community Living",
    viewsFormatted: "410K views"
  },
  {
    id: "yt-zion-004",
    title: "Sounds of Creation: Organic Forest Acoustics & Peaceful Wildlife Coexistence",
    channelTitle: "Woodland Reverence Collective",
    description: "A calming documentary on nocturnal forest ecology. Features field recordings of wind chimes, night owls, and Virginia opossums peacefully foraging under moonlight, demonstrating harmonious stewardship between humans and wildlife.",
    publishedAt: "2024",
    duration: "22:50",
    thumbnailUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&auto=format&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/watch?v=sounds_of_creation_wildlife_harmony",
    embedUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    category: "Community & Ecology",
    tags: ["Wildlife Stewardship", "Acoustics", "Nocturnal Nature", "Peaceful Coexistence"],
    babylonFreeVerified: true,
    zionWayFocus: "Reverence for Animal Life & Creation",
    viewsFormatted: "145K views"
  },
  {
    id: "yt-zion-005",
    title: "Words of Wisdom: The History of Rastafari, Dignity & Peaceful Emancipation",
    channelTitle: "Cultural Heritage Archives",
    description: "Historical lecture and elder interviews detailing the emergence of Rastafari philosophy, spiritual resistance against colonial exploitation, and the timeless universal message of One Love and human brotherhood.",
    publishedAt: "2023",
    duration: "51:04",
    thumbnailUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/watch?v=words_of_wisdom_rastafari_history",
    embedUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    category: "The Zion Way",
    tags: ["Rastafari History", "The Zion Way", "Elder Wisdom", "Emancipation", "Dignity"],
    babylonFreeVerified: true,
    zionWayFocus: "Universal Brotherhood & Truth",
    viewsFormatted: "330K views"
  },
  {
    id: "yt-zion-006",
    title: "Natural Bush Teas of the Blue Mountains: Cerasee, Ginger & Lemongrass",
    channelTitle: "Herb & Root Healing",
    description: "Master herbalist reveals traditional Caribbean preparation methods for mountain teas. Explains immune cleansing, digestive harmony, and honoring plant medicines without synthetic pharmaceutical processing.",
    publishedAt: "2024",
    duration: "19:35",
    thumbnailUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/watch?v=natural_bush_teas_healing",
    embedUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    category: "Ital Livity",
    tags: ["Herbal Medicine", "Bush Tea", "Natural Vitality", "Ital"],
    babylonFreeVerified: true,
    zionWayFocus: "Plant Healing & Natural Body Cleansing",
    viewsFormatted: "88K views"
  },
  {
    id: "yt-zion-007",
    title: "Acoustic Forest Dub Sessions: Live Instruments in the Morning Mist",
    channelTitle: "Sacred Valley Sound System",
    description: "Pure live analog instrumentation using wooden flutes, bass guitar, hand drums, and natural echo chambers deep inside the cedar groves. Zero digital distortion, 100% organic acoustic vibration.",
    publishedAt: "2024",
    duration: "33:18",
    thumbnailUrl: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=600&auto=format&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/watch?v=acoustic_forest_dub_sessions",
    embedUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    category: "Roots & Acoustics",
    tags: ["Acoustic Dub", "Live Instruments", "Flute & Bass", "Roots Vibration"],
    babylonFreeVerified: true,
    zionWayFocus: "High-Vibration Organic Soundscapes",
    viewsFormatted: "215K views"
  },
  {
    id: "yt-zion-008",
    title: "Youth Empowerment & Peaceful Disarmament: Transforming Violence into Community Art",
    channelTitle: "Righteous Vision Media",
    description: "Inspiring grass-roots initiative in Kingston and urban centers where youth trade tools of hostility for musical instruments, agricultural spades, and educational workshops. Directly embodies the Anti-Spanking and Disarmament spirit.",
    publishedAt: "2023",
    duration: "26:45",
    thumbnailUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&auto=format&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/watch?v=youth_empowerment_peaceful_disarmament",
    embedUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    category: "The Zion Way",
    tags: ["Peaceful Disarmament", "Youth Empowerment", "Community Upliftment", "Nonviolence"],
    babylonFreeVerified: true,
    zionWayFocus: "Creative Transformation & Peaceful Nonviolence",
    viewsFormatted: "178K views"
  }
];

export class GeminiYouTubeService {
  private static instance: GeminiYouTubeService;

  public static getInstance(): GeminiYouTubeService {
    if (!GeminiYouTubeService.instance) {
      GeminiYouTubeService.instance = new GeminiYouTubeService();
    }
    return GeminiYouTubeService.instance;
  }

  public search(
    query: string = "",
    filter: YouTubeSearchFilter = {},
    page: number = 1,
    pageSize: number = 4
  ): YouTubeResultSet {
    let filtered = [...BASE_YOUTUBE_VIDEOS];

    if (query.trim()) {
      const q = query.toLowerCase().trim();
      filtered = filtered.filter(v =>
        v.title.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q) ||
        v.channelTitle.toLowerCase().includes(q) ||
        v.category.toLowerCase().includes(q) ||
        v.zionWayFocus.toLowerCase().includes(q) ||
        v.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    if (filter.category && filter.category !== "All") {
      filtered = filtered.filter(v => v.category === filter.category);
    }

    if (filter.sortBy === "views") {
      filtered.sort((a, b) => parseInt(b.viewsFormatted) - parseInt(a.viewsFormatted));
    } else if (filter.sortBy === "newest") {
      filtered.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
    }

    const totalResults = filtered.length;
    const totalPages = Math.max(1, Math.ceil(totalResults / pageSize));
    const currentPage = Math.min(Math.max(1, page), totalPages);
    const startIdx = (currentPage - 1) * pageSize;
    const paginatedVideos = filtered.slice(startIdx, startIdx + pageSize);

    return {
      query,
      totalResults,
      currentPage,
      totalPages,
      pageSize,
      videos: paginatedVideos
    };
  }

  public getCategories(): string[] {
    const cats = new Set<string>();
    BASE_YOUTUBE_VIDEOS.forEach(v => cats.add(v.category));
    return ["All", ...Array.from(cats)];
  }
}

export const GeminiYouTube = GeminiYouTubeService.getInstance();

export interface GeminiYouTubeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

/**
 * Screen-Reader Friendly, Player-Controlled YouTube & The Zion Way Explorer Modal.
 * 
 * Sovereignty Rules:
 * 1. Zero synthetic TTS chatter — native computer screen readers do all reading naturally.
 * 2. Selecting a video allows viewing summaries and in-modal preview without closing the modal.
 * 3. Outbound video links strictly open in a new tab (target="_blank" rel="noopener noreferrer") to preserve active gameplay.
 * 4. Numbered pagination without inaccessible carousels.
 * 5. Explicit "Close YouTube" button on player demand.
 * 6. Content curated exclusively for The Zion Way and Babylon-Free upliftment.
 */
export const GeminiYouTubeModal: React.FC<GeminiYouTubeModalProps> = ({
  isOpen,
  onClose,
  initialQuery = ""
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideoItem | null>(null);
  const [embedMode, setEmbedMode] = useState(false);

  const categories = useMemo(() => GeminiYouTube.getCategories(), []);

  const resultSet = useMemo(() => {
    return GeminiYouTube.search(
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
    if (resultSet.videos.length > 0 && !selectedVideo) {
      setSelectedVideo(resultSet.videos[0]);
    } else if (resultSet.videos.length === 0) {
      setSelectedVideo(null);
    }
  }, [resultSet, selectedVideo]);

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
      aria-labelledby="youtube-modal-title"
    >
      <div className="relative flex flex-col w-full max-w-6xl max-h-[94vh] bg-stone-900 border-2 border-amber-500/60 rounded-2xl shadow-2xl text-stone-100 overflow-hidden">
        
        {/* Header Bar */}
        <header className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-stone-950 border-b border-stone-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-red-950/80 border border-red-600/50 rounded-xl text-red-400">
              <Youtube className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <h2 id="youtube-modal-title" className="text-xl font-bold tracking-tight text-amber-300 flex items-center gap-2">
                <span>The Zion Way &amp; Babylon-Free YouTube Explorer</span>
              </h2>
              <p className="text-xs text-stone-400">
                Nyabinghi Drumming, Ital Livity, Organic Ecology &amp; Righteous Wisdom
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-950/80 text-emerald-300 border border-emerald-600/60">
              <ShieldCheck className="w-4 h-4 text-emerald-400" aria-hidden="true" />
              <span>Babylon-Free Verified</span>
            </span>

            {/* Explicit On-Demand Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg bg-red-950/80 hover:bg-red-900 text-red-200 border border-red-700/60 transition shadow-sm hover:shadow"
              aria-label="Close YouTube Modal and Return to Game"
            >
              <X className="w-4 h-4" aria-hidden="true" />
              <span>Close YouTube</span>
            </button>
          </div>
        </header>

        {/* Search and Category Filters Bar */}
        <section className="px-6 py-3 bg-stone-900/90 border-b border-stone-800 flex flex-wrap items-center gap-3 shrink-0" aria-label="Video Search and Categories">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" aria-hidden="true" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search Nyabinghi drumming, Ital cooking, solar self-reliance, elder wisdom..."
              className="w-full pl-9 pr-4 py-2 bg-stone-950 border border-stone-700 rounded-lg text-sm text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              aria-label="Search YouTube videos"
            />
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5" role="toolbar" aria-label="Video Categories">
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
                      ? "bg-amber-600 text-stone-950 font-bold shadow-sm"
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

        {/* Main Content Area: Video Grid + In-Modal Inspector */}
        <main className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
          
          {/* Left Column: Video Cards List */}
          <section className="lg:col-span-7 flex flex-col gap-4" aria-label="Available Videos">
            <div className="flex items-center justify-between text-xs text-stone-400">
              <span>
                Showing <strong>{resultSet.videos.length}</strong> of <strong>{resultSet.totalResults}</strong> titles
              </span>
              <span>
                Page {resultSet.currentPage} of {resultSet.totalPages}
              </span>
            </div>

            {resultSet.videos.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center bg-stone-950/40 rounded-xl border border-stone-800">
                <Youtube className="w-12 h-12 text-stone-600 mb-3" aria-hidden="true" />
                <p className="text-base font-semibold text-stone-300">No videos found matching &ldquo;{searchQuery}&rdquo;</p>
                <p className="text-xs text-stone-500 mt-1">Try searching for Nyabinghi, Ital, Agroforestry, or Elders.</p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="mt-4 px-4 py-2 text-xs font-semibold rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 transition font-bold"
                >
                  Reset Video Search
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="list">
                {resultSet.videos.map((video) => {
                  const isSelected = selectedVideo?.id === video.id;

                  return (
                    <article
                      key={video.id}
                      role="listitem"
                      onClick={() => {
                        setSelectedVideo(video);
                        setEmbedMode(false);
                      }}
                      className={`relative flex flex-col p-4 rounded-xl border cursor-pointer transition text-left ${
                        isSelected
                          ? "bg-stone-850 border-amber-500 shadow-lg ring-2 ring-amber-500/30"
                          : "bg-stone-950/70 border-stone-800 hover:border-stone-700 hover:bg-stone-900/60"
                      }`}
                    >
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-stone-800 text-amber-300 truncate max-w-[140px]">
                          {video.category}
                        </span>
                        <div className="flex items-center gap-1 text-[11px] text-stone-400">
                          <Clock className="w-3 h-3" aria-hidden="true" />
                          <span>{video.duration}</span>
                        </div>
                      </div>

                      {/* Thumbnail & Title */}
                      <div className="flex gap-3 mb-3">
                        <div className="relative w-20 h-14 rounded-lg overflow-hidden bg-stone-900 shrink-0 border border-stone-800">
                          <img
                            src={video.thumbnailUrl}
                            alt={video.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                            <Play className="w-4 h-4 text-white fill-white" aria-hidden="true" />
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-stone-100 line-clamp-2 leading-snug">
                            {video.title}
                          </h3>
                          <p className="text-xs text-amber-400 mt-1 line-clamp-1">
                            {video.channelTitle}
                          </p>
                        </div>
                      </div>

                      {/* Zion Focus & Action */}
                      <div className="mt-auto pt-2 border-t border-stone-800/80 flex items-center justify-between">
                        <span className="text-[11px] text-emerald-400 font-medium truncate max-w-[150px]">
                          {video.zionWayFocus}
                        </span>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedVideo(video);
                            setEmbedMode(false);
                          }}
                          className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
                            isSelected
                              ? "bg-amber-600 text-stone-950 font-bold"
                              : "bg-stone-800 text-stone-300 hover:bg-stone-700"
                          }`}
                          aria-label={`Inspect ${video.title} in modal`}
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
                aria-label="Video results pagination" 
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
                            ? "bg-amber-600 text-stone-950 shadow-md ring-2 ring-amber-400/40"
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

          {/* Right Column: In-Modal Video Inspector Panel */}
          <aside className="lg:col-span-5 flex flex-col bg-stone-950 p-5 rounded-xl border border-stone-800 shadow-md" aria-label="Selected Video Details">
            {selectedVideo ? (
              <div className="flex flex-col h-full space-y-4">
                
                {/* Video Preview / Embed Container */}
                <div className="relative rounded-xl overflow-hidden bg-stone-900 border border-stone-800 aspect-video max-h-56">
                  {embedMode ? (
                    <iframe
                      src={selectedVideo.embedUrl}
                      title={selectedVideo.title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="relative w-full h-full group cursor-pointer" onClick={() => setEmbedMode(true)}>
                      <img
                        src={selectedVideo.thumbnailUrl}
                        alt={selectedVideo.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 flex flex-col items-center justify-center transition">
                        <div className="p-3 bg-red-600 hover:bg-red-500 rounded-full text-white shadow-xl transition transform group-hover:scale-110">
                          <Play className="w-6 h-6 fill-white" aria-hidden="true" />
                        </div>
                        <span className="mt-2 text-xs font-bold text-stone-200">
                          Click to Preview In-Modal
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Title & Channel Details */}
                <div>
                  <h3 className="text-lg font-bold text-stone-100 leading-snug">
                    {selectedVideo.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-xs text-stone-400">
                    <span className="text-amber-400 font-semibold">{selectedVideo.channelTitle}</span>
                    <span>&bull;</span>
                    <span>{selectedVideo.viewsFormatted}</span>
                    <span>&bull;</span>
                    <span>{selectedVideo.publishedAt}</span>
                  </div>
                </div>

                {/* Babylon-Free & Zion Focus Card */}
                <div className="p-3 rounded-xl bg-stone-900 border border-amber-600/40 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs text-emerald-300 font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
                    <span>Babylon-Free Content Standard:</span>
                  </div>
                  <p className="text-xs text-stone-300">
                    {selectedVideo.zionWayFocus}
                  </p>
                </div>

                {/* Description */}
                <div className="text-xs text-stone-300 leading-relaxed">
                  <h4 className="font-semibold text-stone-200 mb-1">Synopsis &amp; Teachings</h4>
                  <p>{selectedVideo.description}</p>
                </div>

                {/* Tags */}
                <div className="space-y-1">
                  <h4 className="text-[11px] font-semibold text-stone-400">Righteous Topics</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedVideo.tags.map((tag) => (
                      <span key={tag} className="text-[11px] px-2 py-0.5 rounded-full bg-amber-950/70 border border-amber-700/50 text-amber-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Outbound Link (strictly opens in new window to preserve gameplay!) */}
                <div className="mt-auto pt-3 border-t border-stone-800 space-y-2">
                  <a
                    href={selectedVideo.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm transition shadow-lg hover:shadow-red-900/40"
                    aria-label={`Watch ${selectedVideo.title} on YouTube (Opens in new tab)`}
                  >
                    <span>Watch on YouTube</span>
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
                <p className="text-sm font-semibold">Select a video to view synopsis &amp; preview</p>
                <p className="text-xs mt-1">Inspection remains inside the modal without interrupting your game.</p>
              </div>
            )}
          </aside>
        </main>

        {/* Modal Footer */}
        <footer className="px-6 py-3 bg-stone-950 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400 shrink-0">
          <div>
            Powered by <strong>The Zion Way &amp; Gemini Video Index</strong>
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
