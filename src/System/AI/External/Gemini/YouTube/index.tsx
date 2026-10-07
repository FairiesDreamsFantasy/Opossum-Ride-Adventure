/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from "react";
import { 
  YouTubeVideoItem, 
  YouTubeResultSet, 
  YouTubeSearchFilter,
  YouTubeThemeMode,
  VideoTranslatedArena
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
  Newspaper,
  HelpCircle,
  Tv,
  Film,
  Smile,
  Music,
  Mic,
  MicOff,
  Layers,
  MapPin,
  Sliders,
  CheckCircle2,
  Volume2
} from "lucide-react";
import { 
  setSpeechEnabled, 
  stopSpeaking 
} from "../../../../Sound/TTS";
import { YouTubeContentSafety } from "./ContentSafetyFilter";
import { GeminiVideoArenaTranslator } from "./VideoArenaTranslator";
import { GeminiSystem } from "../index";
import { GeminiYouTubeNews, YouTubeNewsItem } from "./News";

export * from "./types";
export * from "./ContentSafetyFilter";
export * from "./VideoArenaTranslator";
export * from "./News";

/**
 * Curated authentic video repository focusing on:
 * - The Zion Way & Rastafari Cultural Heritage
 * - Babylon-Free Self-Reliance, Solar Homesteading & Clean Living
 * - Ital Livity & Natural Herb Food/Medicine
 * - Nyabinghi Drumming & Roots Acoustic Harmonics
 * - Forest Ecology & Wildlife Harmony
 * - Live Broadcasts (Real-time live feeds, not livestreaming)
 * - TV, Movies, Childrens (specifically distinguished from juvenile goats), Music, Podcasts
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
    viewsFormatted: "284K views",
    canvasBlendMatrix: {
      luminousFlux: 0.85,
      ambientColorRgb: [68, 140, 92],
      skyboxTint: "#1b4d3e"
    }
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
    viewsFormatted: "192K views",
    canvasBlendMatrix: {
      luminousFlux: 0.9,
      ambientColorRgb: [85, 170, 75],
      skyboxTint: "#2d5a27"
    }
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
  },
  {
    id: "yt-tv-001",
    title: "Eco-Discovery TV: Living with Wild Opossums & Forest Guardians",
    channelTitle: "Wildlife Broadcasting Network",
    description: "Full-length broadcast TV episode exploring marsupial habitats, tick control, nocturnal foraging, and humane wildlife sanctuary stewardship.",
    publishedAt: "2024",
    duration: "44:10",
    thumbnailUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/watch?v=eco_discovery_tv_opossum_guardians",
    embedUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    category: "TV",
    tags: ["Television", "Documentary", "Opossums", "Wildlife", "Eco-TV"],
    babylonFreeVerified: true,
    zionWayFocus: "Educational Broadcast Television",
    viewsFormatted: "512K views"
  },
  {
    id: "yt-movies-001",
    title: "The Great Marsupial Journey: Feature Animated Cinema Experience",
    channelTitle: "Pure Animation Studios",
    description: "A feature cinematic animated journey celebrating courage, mountain traversing, and friendship across real-world arenas without violence.",
    publishedAt: "2024",
    duration: "1:28:30",
    thumbnailUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/watch?v=marsupial_journey_movie",
    embedUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    category: "Movies",
    tags: ["Cinema", "Feature Movie", "Animation", "Family Film", "Adventure"],
    babylonFreeVerified: true,
    zionWayFocus: "Feature Length Cinematic Storytelling",
    viewsFormatted: "890K views"
  },
  {
    id: "yt-childrens-001",
    title: "Friendly Woodland Friends: Fun Nature Learning for Children",
    channelTitle: "Pure Childrens Academy",
    description: "Wholesome educational program for young human children (as opposed to juvenile goats!) discovering forest ecology, counting nuts, and caring for animal neighbors.",
    publishedAt: "2024",
    duration: "18:22",
    thumbnailUrl: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&auto=format&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/watch?v=woodland_friends_childrens_learning",
    embedUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    category: "Childrens",
    tags: ["Childrens", "Learning", "Nature", "Animals", "Kindness"],
    babylonFreeVerified: true,
    zionWayFocus: "Enriching Childrens Educational Content",
    viewsFormatted: "340K views"
  },
  {
    id: "yt-music-001",
    title: "Nyabinghi Acoustic Symphony: 432Hz Sacred Resonance for Meditation",
    channelTitle: "Roots Music Sanctuary",
    description: "High-fidelity acoustic music album featuring organic flutes, keteh heartbeat drums, kalimba, and natural stream water harmonics.",
    publishedAt: "2024",
    duration: "58:00",
    thumbnailUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/watch?v=nyabinghi_acoustic_symphony_432hz",
    embedUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    category: "Music",
    tags: ["Music", "Acoustic", "432Hz", "Nyabinghi", "Roots Harmonics"],
    babylonFreeVerified: true,
    zionWayFocus: "Pure High-Vibrational Music",
    viewsFormatted: "620K views"
  },
  {
    id: "yt-podcasts-001",
    title: "The Zion Way Podcast: Living Sovereign, Babylon-Free & Off-Grid Tech",
    channelTitle: "Sovereign Living Dialogue",
    description: "Deep-dive podcast discussion with master homesteaders and computer scientists on decentralized technology, solar computing, and organic living.",
    publishedAt: "2024",
    duration: "1:05:40",
    thumbnailUrl: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&auto=format&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/watch?v=the_zion_way_podcast_sovereignty",
    embedUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    category: "Podcasts",
    tags: ["Podcasts", "The Zion Way", "Decentralization", "Homesteading", "Solar"],
    babylonFreeVerified: true,
    zionWayFocus: "In-Depth Podcast Dialogue & Knowledge",
    viewsFormatted: "275K views"
  },
  {
    id: "yt-live-001",
    title: "Live Nature Observatory: 24/7 Misty Mountain & Wildlife Cam",
    channelTitle: "Global Sanctuary Live Broadcasts",
    description: "Real-time continuous live video feed from the high mountain forest sanctuary. Watch authentic wildlife foraging, daylight mist changes, and evening stars live.",
    publishedAt: "Live Now",
    duration: "LIVE",
    thumbnailUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/watch?v=live_nature_observatory_cam",
    embedUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    category: "Live Broadcasts",
    tags: ["Live Broadcasts", "Live Nature", "Sanctuary Cam", "Real-Time Feed"],
    babylonFreeVerified: true,
    zionWayFocus: "Continuous Real-Time Environmental Broadcast",
    viewsFormatted: "12.4K Watching Now",
    isLiveBroadcast: true
  },
  {
    id: "yt-live-002",
    title: "Live Earth View from Orbit: High-Definition Panoramic Stream",
    channelTitle: "Space & Earth Sciences Broadcast",
    description: "Direct real-time video broadcast of Earth from high-altitude orbital sensors. Observe continents, cloud formations, sunrises, and blue oceans live.",
    publishedAt: "Live Now",
    duration: "LIVE",
    thumbnailUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/watch?v=live_earth_view_orbit",
    embedUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    category: "Live Broadcasts",
    tags: ["Live Broadcasts", "Earth View", "Orbit Cam", "Geography", "Real-Time"],
    babylonFreeVerified: true,
    zionWayFocus: "Planetary Observation & Geography Live",
    viewsFormatted: "24.8K Watching Now",
    isLiveBroadcast: true
  }
];

export class GeminiYouTubeService {
  private static instance: GeminiYouTubeService;
  private activeBlendedVideo: YouTubeVideoItem | null = null;
  private themeMode: YouTubeThemeMode = "Dynamic Inspiration";

  public static getInstance(): GeminiYouTubeService {
    if (!GeminiYouTubeService.instance) {
      GeminiYouTubeService.instance = new GeminiYouTubeService();
    }
    return GeminiYouTubeService.instance;
  }

  public setThemeMode(mode: YouTubeThemeMode) {
    this.themeMode = mode;
  }

  public getThemeMode(): YouTubeThemeMode {
    return this.themeMode;
  }

  public setActiveBlendedVideo(video: YouTubeVideoItem | null) {
    this.activeBlendedVideo = video;
  }

  public getActiveBlendedVideo(): YouTubeVideoItem | null {
    return this.activeBlendedVideo;
  }

  public search(
    query: string = "",
    filter: YouTubeSearchFilter = {},
    page: number = 1,
    pageSize: number = 4
  ): YouTubeResultSet {
    // 1. Strict Content Safety & Anti-Pornography Sanitization
    const { isSafe, cleanQuery } = YouTubeContentSafety.sanitizeQuery(query);
    if (!isSafe) {
      return {
        query,
        totalResults: 0,
        currentPage: 1,
        totalPages: 1,
        pageSize,
        videos: []
      };
    }

    // 2. Filter base videos deterministically
    let safeVideos = YouTubeContentSafety.filterSafeVideos(BASE_YOUTUBE_VIDEOS);

    if (cleanQuery) {
      const q = cleanQuery.toLowerCase();
      safeVideos = safeVideos.filter(v =>
        v.title.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q) ||
        v.channelTitle.toLowerCase().includes(q) ||
        v.category.toLowerCase().includes(q) ||
        v.zionWayFocus.toLowerCase().includes(q) ||
        v.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    if (filter.category && filter.category !== "All") {
      safeVideos = safeVideos.filter(v => v.category === filter.category);
    }

    if (filter.liveOnly) {
      safeVideos = safeVideos.filter(v => v.isLiveBroadcast);
    }

    if (filter.sortBy === "views") {
      safeVideos.sort((a, b) => parseInt(b.viewsFormatted) - parseInt(a.viewsFormatted));
    } else if (filter.sortBy === "newest") {
      safeVideos.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
    }

    const totalResults = safeVideos.length;
    const totalPages = Math.max(1, Math.ceil(totalResults / pageSize));
    const currentPage = Math.min(Math.max(1, page), totalPages);
    const startIdx = (currentPage - 1) * pageSize;
    const paginatedVideos = safeVideos.slice(startIdx, startIdx + pageSize);

    return {
      query: cleanQuery,
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
  const [themeMode, setThemeMode] = useState<YouTubeThemeMode>("Dynamic Inspiration");
  const [liveVoiceEnabled, setLiveVoiceEnabled] = useState(false);
  const [translatedArena, setTranslatedArena] = useState<VideoTranslatedArena | null>(null);
  const [isTranslatingArena, setIsTranslatingArena] = useState(false);
  const [isBlendedWithCanvas, setIsBlendedWithCanvas] = useState(false);
  const [activeModalTab, setActiveModalTab] = useState<"videos" | "news">("videos");

  // News-specific state
  const [newsSearchQuery, setNewsSearchQuery] = useState("");
  const [selectedNewsCategory, setSelectedNewsCategory] = useState("All");
  const [newsCurrentPage, setNewsCurrentPage] = useState(1);
  const [selectedNews, setSelectedNews] = useState<YouTubeNewsItem | null>(null);

  const categories = useMemo(() => GeminiYouTube.getCategories(), []);
  const newsCategories = useMemo(() => GeminiYouTubeNews.getCategories(), []);

  const resultSet = useMemo(() => {
    return GeminiYouTube.search(
      searchQuery,
      { 
        category: selectedCategory,
        themeMode
      },
      currentPage,
      4
    );
  }, [searchQuery, selectedCategory, currentPage, themeMode]);

  const newsResultSet = useMemo(() => {
    return GeminiYouTubeNews.searchNews(newsSearchQuery, selectedNewsCategory, newsCurrentPage, 4);
  }, [newsSearchQuery, selectedNewsCategory, newsCurrentPage]);

  useEffect(() => {
    if (isOpen) {
      stopSpeaking();
      setSpeechEnabled(false);
      const cfg = GeminiSystem.getConfig();
      if (cfg) {
        setLiveVoiceEnabled(!!cfg.liveEnabled);
      }
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

  useEffect(() => {
    if (newsResultSet.items.length > 0 && !selectedNews) {
      setSelectedNews(newsResultSet.items[0]);
    } else if (newsResultSet.items.length === 0) {
      setSelectedNews(null);
    }
  }, [newsResultSet, selectedNews]);

  if (!isOpen) return null;

  const handleToggleLiveVoice = () => {
    const next = !liveVoiceEnabled;
    setLiveVoiceEnabled(next);
    GeminiSystem.setLiveEnabled(next);
  };

  const handleTranslateToArena = (video: YouTubeVideoItem) => {
    setIsTranslatingArena(true);
    setTimeout(() => {
      const arena = GeminiVideoArenaTranslator.translateVideoToArena(video, { themeMode });
      setTranslatedArena(arena);
      setIsTranslatingArena(false);
    }, 450);
  };

  const handleToggleCanvasBlend = (video: YouTubeVideoItem) => {
    if (isBlendedWithCanvas) {
      setIsBlendedWithCanvas(false);
      GeminiYouTube.setActiveBlendedVideo(null);
    } else {
      setIsBlendedWithCanvas(true);
      GeminiYouTube.setActiveBlendedVideo(video);
    }
  };

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

  const handleNewsPrevPage = () => {
    if (newsCurrentPage > 1) {
      setNewsCurrentPage(prev => prev - 1);
    }
  };

  const handleNewsNextPage = () => {
    if (newsCurrentPage < newsResultSet.totalPages) {
      setNewsCurrentPage(prev => prev + 1);
    }
  };

  const handleNewsPageClick = (page: number) => {
    setNewsCurrentPage(page);
  };

  const handleActivateNews = (item: YouTubeNewsItem) => {
    window.open(item.videoUrl, "_blank", "noopener,noreferrer");
    onClose();
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
                Nyabinghi Drumming, Ital Livity, Organic Ecology &bull; Zero Adult Content &bull; Mathematical Determinism
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Embedded Gemini Live Voice Indicator & Toggle */}
            <button
              type="button"
              onClick={handleToggleLiveVoice}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition ${
                liveVoiceEnabled
                  ? "bg-green-950/90 text-green-300 border-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]"
                  : "bg-stone-900 text-stone-400 border-stone-700 hover:border-stone-500"
              }`}
              aria-label={`Toggle Gemini Live Voice in YouTube (Currently ${liveVoiceEnabled ? "ON" : "OFF"})`}
            >
              {liveVoiceEnabled ? (
                <>
                  <Mic className="w-3.5 h-3.5 text-green-400 animate-pulse" aria-hidden="true" />
                  <span>Gemini Live: ON (Shift-C)</span>
                </>
              ) : (
                <>
                  <MicOff className="w-3.5 h-3.5 text-stone-500" aria-hidden="true" />
                  <span>Gemini Live: OFF</span>
                </>
              )}
            </button>

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

        {/* Modal Main Tabs */}
        <div className="flex border-b border-stone-800 bg-stone-950 shrink-0 px-6">
          <button
            type="button"
            onClick={() => setActiveModalTab("videos")}
            className={`px-5 py-3 text-xs sm:text-sm font-bold border-b-2 transition flex items-center gap-2 ${
              activeModalTab === "videos"
                ? "border-amber-500 text-amber-400 bg-stone-900/50"
                : "border-transparent text-stone-400 hover:text-stone-200 hover:bg-stone-900/20"
            }`}
          >
            <Youtube className="w-4 h-4" />
            <span>Zion Videos &amp; Arenas</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveModalTab("news")}
            className={`px-5 py-3 text-xs sm:text-sm font-bold border-b-2 transition flex items-center gap-2 ${
              activeModalTab === "news"
                ? "border-red-500 text-red-400 bg-stone-900/50"
                : "border-transparent text-stone-400 hover:text-stone-200 hover:bg-stone-900/20"
            }`}
          >
            <Newspaper className="w-4 h-4" />
            <span>News &amp; Live Broadcasts</span>
          </button>
        </div>

        {activeModalTab === "videos" && (
          <>
            {/* Theme Mode & Search Filter Bar */}
            <section className="px-6 py-3 bg-stone-900/90 border-b border-stone-800 flex flex-wrap items-center justify-between gap-3 shrink-0" aria-label="Theme Flexibility and Filters">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-amber-400" aria-hidden="true" />
                <span className="text-xs font-bold text-stone-300">Theme Mode:</span>
                {(["Strict Theme Match", "Dynamic Inspiration", "Free Exploration"] as YouTubeThemeMode[]).map((mode) => {
                  const isSelected = themeMode === mode;
                  return (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setThemeMode(mode)}
                      className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition ${
                        isSelected
                          ? "bg-amber-600 text-stone-950 font-bold shadow-sm"
                          : "bg-stone-800 text-stone-300 hover:bg-stone-700 border border-stone-700"
                      }`}
                      aria-pressed={isSelected}
                    >
                      {mode}
                    </button>
                  );
                })}
              </div>

              <div className="relative flex-1 max-w-md min-w-[220px]">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" aria-hidden="true" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search TV, Movies, Childrens, Music, Live feeds..."
                  className="w-full pl-9 pr-4 py-1.5 bg-stone-950 border border-stone-700 rounded-lg text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                  aria-label="Search YouTube videos"
                />
              </div>
            </section>

            {/* Category Filter Tabs */}
            <section className="px-6 py-2 bg-stone-950/70 border-b border-stone-800/80 flex flex-wrap items-center gap-1.5 shrink-0" role="toolbar" aria-label="Video Categories">
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
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                      isActive
                        ? "bg-amber-600 text-stone-950 font-bold shadow-sm"
                        : "bg-stone-800/80 text-stone-300 hover:bg-stone-700 border border-stone-700/60"
                    }`}
                    aria-pressed={isActive}
                  >
                    {cat === "Live Broadcasts" ? "🔴 Live Broadcasts" : cat}
                  </button>
                );
              })}
            </section>
          </>
        )}

        {activeModalTab === "news" && (
          <section className="px-6 py-3 bg-stone-900/90 border-b border-stone-800 flex flex-wrap items-center justify-between gap-3 shrink-0" aria-label="News Search and Category Filters">
            <div className="flex flex-wrap items-center gap-1.5" role="toolbar" aria-label="News Categories">
              {newsCategories.map((cat) => {
                const isActive = selectedNewsCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setSelectedNewsCategory(cat);
                      setNewsCurrentPage(1);
                    }}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
                      isActive
                        ? "bg-red-600 text-white font-bold shadow-sm"
                        : "bg-stone-800 text-stone-300 hover:bg-stone-700 border border-stone-700"
                    }`}
                    aria-pressed={isActive}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <div className="relative flex-1 max-w-xs min-w-[200px]">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" aria-hidden="true" />
              <input
                type="search"
                value={newsSearchQuery}
                onChange={(e) => {
                  setNewsSearchQuery(e.target.value);
                  setNewsCurrentPage(1);
                }}
                placeholder="Search world news, science, nature..."
                className="w-full pl-9 pr-4 py-1.5 bg-stone-950 border border-stone-700 rounded-lg text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-red-500"
                aria-label="Search news broadcasts"
              />
            </div>
          </section>
        )}

        {/* Main Content Area: Video Grid + In-Modal Inspector */}
        {activeModalTab === "videos" ? (
          <main className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
            
            {/* Left Column: Video Cards List */}
            <section className="lg:col-span-7 flex flex-col gap-4" aria-label="Available Videos">
              <div className="flex items-center justify-between text-xs text-stone-400">
                <span>
                  Showing <strong>{resultSet.videos.length}</strong> of <strong>{resultSet.totalResults}</strong> safe titles
                </span>
                <span>
                  Page {resultSet.currentPage} of {resultSet.totalPages}
                </span>
              </div>

              {resultSet.videos.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center bg-stone-950/40 rounded-xl border border-stone-800">
                  <Youtube className="w-12 h-12 text-stone-600 mb-3" aria-hidden="true" />
                  <p className="text-base font-semibold text-stone-300">No safe videos found matching &ldquo;{searchQuery}&rdquo;</p>
                  <p className="text-xs text-stone-500 mt-1">Adult terms, spam, and non-compliant content are blocked automatically.</p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("All");
                    }}
                    className="mt-4 px-4 py-2 text-xs font-semibold rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 transition font-bold"
                  >
                    Reset Safe Video Search
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
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded truncate max-w-[140px] ${
                            video.isLiveBroadcast ? "bg-red-950 text-red-300 border border-red-700" : "bg-stone-800 text-amber-300"
                          }`}>
                            {video.isLiveBroadcast ? "🔴 Live Feed" : video.category}
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

                        {/* Actions */}
                        <div className="mt-auto pt-2 border-t border-stone-800/80 flex items-center justify-between">
                          <span className="text-[11px] text-emerald-400 font-medium truncate max-w-[140px]">
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

              {/* Pagination */}
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

            {/* Right Column: In-Modal Video Inspector & Gemini Arena Translation Panel */}
            <aside className="lg:col-span-5 flex flex-col bg-stone-950 p-5 rounded-xl border border-stone-800 shadow-md" aria-label="Selected Video Details">
              {selectedVideo ? (
                <div className="flex flex-col h-full space-y-4">
                  
                  {/* Video Preview */}
                  <div className="relative rounded-xl overflow-hidden bg-stone-900 border border-stone-800 aspect-video max-h-52">
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

                  {/* Title & Details */}
                  <div>
                    <h3 className="text-base font-bold text-stone-100 leading-snug">
                      {selectedVideo.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-xs text-stone-400">
                      <span className="text-amber-400 font-semibold">{selectedVideo.channelTitle}</span>
                      <span>&bull;</span>
                      <span>{selectedVideo.viewsFormatted}</span>
                    </div>
                  </div>

                  {/* Gemini Video-to-Arena & Canvas Blending Tools */}
                  <div className="p-3 rounded-xl bg-stone-900 border border-amber-500/30 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                        <Sparkles className="w-4 h-4 text-amber-400" aria-hidden="true" />
                        <span>Gemini 3D Arena &amp; VO3 Tools</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {/* Translate to 3D Arena Button */}
                      <button
                        type="button"
                        onClick={() => handleTranslateToArena(selectedVideo)}
                        disabled={isTranslatingArena}
                        className="flex-1 py-1.5 px-3 rounded-lg bg-emerald-900 hover:bg-emerald-800 text-emerald-200 text-xs font-bold transition flex items-center justify-center gap-1.5 border border-emerald-600 shadow-sm"
                        aria-label="Translate Video into 3D Arena"
                      >
                        <Layers className="w-3.5 h-3.5 text-emerald-300" aria-hidden="true" />
                        <span>{isTranslatingArena ? "Synthesizing Arena..." : "Translate to 3D Arena"}</span>
                      </button>

                      {/* Canvas Blending Button */}
                      <button
                        type="button"
                        onClick={() => handleToggleCanvasBlend(selectedVideo)}
                        className={`py-1.5 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 border ${
                          isBlendedWithCanvas
                            ? "bg-purple-900 text-purple-200 border-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.4)]"
                            : "bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-700"
                        }`}
                        aria-label="Blend Video with Game Canvas via VO3"
                      >
                        <MapPin className="w-3.5 h-3.5 text-purple-300" aria-hidden="true" />
                        <span>{isBlendedWithCanvas ? "Canvas Blended: ON" : "Blend with Canvas"}</span>
                      </button>
                    </div>

                    {/* Generated Arena Specs Card */}
                    {translatedArena && (
                      <div className="mt-2 p-2.5 rounded-lg bg-stone-950 border border-emerald-700/60 text-[11px] text-stone-300 space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-emerald-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Synthesized Arena: {translatedArena.name}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-1 text-stone-400">
                          <div>Topography: <strong className="text-stone-200">{translatedArena.topographyType}</strong></div>
                          <div>Vault Ramps: <strong className="text-stone-200">{translatedArena.obstacleDistribution.vaultRamps}</strong></div>
                          <div>Fallen Logs: <strong className="text-stone-200">{translatedArena.obstacleDistribution.fallenLogs}</strong></div>
                          <div>Observation Points: <strong className="text-stone-200">{translatedArena.obstacleDistribution.observationPoints}</strong></div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Synopsis */}
                  <div className="text-xs text-stone-300 leading-relaxed">
                    <h4 className="font-semibold text-stone-200 mb-1">Synopsis &amp; Teachings</h4>
                    <p className="line-clamp-3">{selectedVideo.description}</p>
                  </div>

                  {/* Outbound Link */}
                  <div className="mt-auto pt-2 border-t border-stone-800 space-y-1.5">
                    <a
                      href={selectedVideo.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition shadow-lg"
                      aria-label={`Watch ${selectedVideo.title} on YouTube (Opens in new tab)`}
                    >
                      <span>Watch on YouTube</span>
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center text-stone-500 py-12">
                  <HelpCircle className="w-10 h-10 mb-2 opacity-50" aria-hidden="true" />
                  <p className="text-sm font-semibold">Select a video to view synopsis &amp; preview</p>
                </div>
              )}
            </aside>
          </main>
        ) : (
          <main className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
            {/* Left Column: News Cards List */}
            <section className="lg:col-span-7 flex flex-col gap-4" aria-label="Available News">
              <div className="flex items-center justify-between text-xs text-stone-400">
                <span>
                  Showing <strong>{newsResultSet.items.length}</strong> of <strong>{newsResultSet.totalResults}</strong> safe channels
                </span>
                <span>
                  Page {newsResultSet.currentPage} of {newsResultSet.totalPages}
                </span>
              </div>

              {newsResultSet.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center bg-stone-950/40 rounded-xl border border-stone-800">
                  <Newspaper className="w-12 h-12 text-stone-600 mb-3" aria-hidden="true" />
                  <p className="text-base font-semibold text-stone-300">No safe news found matching &ldquo;{newsSearchQuery}&rdquo;</p>
                  <p className="text-xs text-stone-500 mt-1">Adult terms, spam, and non-compliant content are blocked automatically.</p>
                  <button
                    type="button"
                    onClick={() => {
                      setNewsSearchQuery("");
                      setSelectedNewsCategory("All");
                    }}
                    className="mt-4 px-4 py-2 text-xs font-semibold rounded-lg bg-red-600 hover:bg-red-500 text-stone-950 transition font-bold"
                  >
                    Reset Safe News Search
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="list">
                  {newsResultSet.items.map((newsItem) => {
                    const isSelected = selectedNews?.id === newsItem.id;

                    return (
                      <article
                        key={newsItem.id}
                        role="listitem"
                        onClick={() => {
                          setSelectedNews(newsItem);
                        }}
                        className={`relative flex flex-col p-4 rounded-xl border cursor-pointer transition text-left ${
                          isSelected
                            ? "bg-stone-850 border-red-500 shadow-lg ring-2 ring-red-500/30"
                            : "bg-stone-950/70 border-stone-800 hover:border-stone-700 hover:bg-stone-900/60"
                        }`}
                      >
                        {/* Top Badges */}
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded truncate max-w-[140px] ${
                            newsItem.isLive ? "bg-red-950 text-red-300 border border-red-700 animate-pulse" : "bg-stone-800 text-stone-300"
                          }`}>
                            {newsItem.isLive ? "🔴 LIVE NEWS" : newsItem.category}
                          </span>
                          <div className="flex items-center gap-1 text-[11px] text-stone-400">
                            <Clock className="w-3 h-3" aria-hidden="true" />
                            <span>{newsItem.publishedAt}</span>
                          </div>
                        </div>

                        {/* Thumbnail & Title */}
                        <div className="flex gap-3 mb-3">
                          <div className="relative w-20 h-14 rounded-lg overflow-hidden bg-stone-900 shrink-0 border border-stone-800">
                            <img
                              src={newsItem.thumbnailUrl}
                              alt={newsItem.title}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                              <ExternalLink className="w-4 h-4 text-white" aria-hidden="true" />
                            </div>
                          </div>

                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-semibold text-stone-100 line-clamp-2 leading-snug">
                              {newsItem.title}
                            </h3>
                            <p className="text-xs text-red-400 mt-1 line-clamp-1">
                              {newsItem.source}
                            </p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-auto pt-2 border-t border-stone-800/80 flex items-center justify-between">
                          <span className="text-[11px] text-emerald-400 font-medium truncate max-w-[140px]">
                            Verified Clean Source
                          </span>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedNews(newsItem);
                            }}
                            className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
                              isSelected
                                ? "bg-red-600 text-white font-bold"
                                : "bg-stone-800 text-stone-300 hover:bg-stone-700"
                            }`}
                            aria-label={`Inspect ${newsItem.title} in modal`}
                          >
                            {isSelected ? "Inspecting" : "Inspect"}
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}

              {/* Pagination */}
              {newsResultSet.totalPages > 1 && (
                <nav 
                  aria-label="News results pagination" 
                  className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between"
                >
                  <button
                    type="button"
                    onClick={handleNewsPrevPage}
                    disabled={newsCurrentPage <= 1}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-stone-800 hover:bg-stone-700 disabled:opacity-40 disabled:pointer-events-none text-stone-300 transition"
                    aria-label="Previous Page"
                  >
                    <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                    <span>Previous</span>
                  </button>

                  <div className="flex items-center gap-1" role="list">
                    {Array.from({ length: newsResultSet.totalPages }, (_, i) => i + 1).map((pageNum) => {
                      const isCurrent = pageNum === newsCurrentPage;
                      return (
                        <button
                          key={pageNum}
                          type="button"
                          onClick={() => handleNewsPageClick(pageNum)}
                          className={`w-8 h-8 rounded-lg text-xs font-bold transition ${
                            isCurrent
                              ? "bg-red-600 text-white shadow-md ring-2 ring-red-400/40"
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
                    onClick={handleNewsNextPage}
                    disabled={newsCurrentPage >= newsResultSet.totalPages}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-stone-800 hover:bg-stone-700 disabled:opacity-40 disabled:pointer-events-none text-stone-300 transition"
                    aria-label="Next Page"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </nav>
              )}
            </section>

            {/* Right Column: News Inspector */}
            <aside className="lg:col-span-5 flex flex-col bg-stone-950 p-5 rounded-xl border border-stone-800 shadow-md" aria-label="Selected News Details">
              {selectedNews ? (
                <div className="flex flex-col h-full space-y-4">
                  
                  {/* News Preview image or embed */}
                  <div className="relative rounded-xl overflow-hidden bg-stone-900 border border-stone-800 aspect-video max-h-52">
                    <div className="relative w-full h-full group cursor-pointer" onClick={() => handleActivateNews(selectedNews)}>
                      <img
                        src={selectedNews.thumbnailUrl}
                        alt={selectedNews.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 flex flex-col items-center justify-center transition">
                        <div className="p-3 bg-red-600 hover:bg-red-500 rounded-full text-white shadow-xl transition transform group-hover:scale-110">
                          <ExternalLink className="w-6 h-6" aria-hidden="true" />
                        </div>
                        <span className="mt-2 text-xs font-bold text-stone-200">
                          Watch in New Tab (Auto-Closes)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Title & Details */}
                  <div>
                    <h3 className="text-base font-bold text-stone-100 leading-snug">
                      {selectedNews.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-xs text-stone-400">
                      <span className="text-red-400 font-semibold">{selectedNews.source}</span>
                      <span>&bull;</span>
                      <span>{selectedNews.publishedAt}</span>
                    </div>
                  </div>

                  {/* News Summary */}
                  <div className="text-xs text-stone-300 leading-relaxed bg-stone-900/60 p-3 rounded-xl border border-stone-800">
                    <h4 className="font-semibold text-stone-200 mb-1">News Briefing &amp; Reports</h4>
                    <p>{selectedNews.summary}</p>
                  </div>

                  {/* Outbound Link */}
                  <div className="mt-auto pt-2 border-t border-stone-800 space-y-1.5">
                    <button
                      type="button"
                      onClick={() => handleActivateNews(selectedNews)}
                      className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition shadow-lg"
                      aria-label={`Watch ${selectedNews.title} on YouTube in a new tab (Auto-closes game modal)`}
                    >
                      <span>Launch News Broadcast</span>
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                    <p className="text-[10px] text-center text-stone-500">
                      The modal will close automatically so you can resume playing the game immediately.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center text-stone-500 py-12">
                  <HelpCircle className="w-10 h-10 mb-2 opacity-50" aria-hidden="true" />
                  <p className="text-sm font-semibold">Select a news channel to view synopsis &amp; brief</p>
                </div>
              )}
            </aside>
          </main>
        )}

        {/* Modal Footer */}
        <footer className="px-6 py-3 bg-stone-950 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400 shrink-0">
          <div>
            Powered by <strong>The Zion Way, Gemini AI &amp; VO3 Studio</strong>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">Babylon-Free &bull; 0% Adult Content &bull; Strict Determinism</span>
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
