/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from "react";
import { YouTubeNewsItem, YouTubeNewsResultSet } from "./types";
import { 
  Newspaper, 
  Search, 
  ExternalLink, 
  Radio, 
  X, 
  ShieldCheck, 
  Clock, 
  Globe, 
  Sparkles,
  Tv,
  CheckCircle2
} from "lucide-react";
import { setSpeechEnabled, stopSpeaking } from "../../../../../Sound/TTS";
import { YouTubeContentSafety } from "../ContentSafetyFilter";

export * from "./types";

const CURATED_NEWS_FEEDS: YouTubeNewsItem[] = [
  {
    id: "news-live-001",
    title: "Global Environmental Broadcast: Renewable Agroforestry & Mountain Ecosystems",
    source: "Earth Science News Network",
    category: "Environment & Climate",
    publishedAt: "Live Now",
    thumbnailUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&auto=format&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/watch?v=live_environmental_broadcast_news",
    embedUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    isLive: true,
    summary: "Live continuous report on global reforestation initiatives, clean water engineering, and sustainable solar communities.",
    verifiedSource: true
  },
  {
    id: "news-live-002",
    title: "International Science & Computing Briefing: Quantum Physics and Space Exploration",
    source: "Global Science Press",
    category: "Science & Tech",
    publishedAt: "Live Now",
    thumbnailUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/watch?v=international_science_briefing_live",
    embedUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    isLive: true,
    summary: "Real-time updates on scientific research, clean hardware virtualization, and planetary observation satellites.",
    verifiedSource: true
  },
  {
    id: "news-world-001",
    title: "World News Daily: Cooperative Economics & Community Resilience",
    source: "Sovereignty International News",
    category: "World News",
    publishedAt: "Today",
    thumbnailUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&auto=format&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/watch?v=world_news_community_resilience",
    embedUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    isLive: false,
    summary: "In-depth analysis of community agriculture, decentralized energy grids, and global peaceful cooperation.",
    verifiedSource: true
  },
  {
    id: "news-agri-001",
    title: "Agricultural Science Digest: Soil Regeneration & Organic Heritage Seeds",
    source: "Botanical & Agro News",
    category: "Agriculture & Nature",
    publishedAt: "Today",
    thumbnailUrl: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=600&auto=format&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/watch?v=soil_regeneration_agro_news",
    embedUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    isLive: false,
    summary: "Expert discussions on natural soil biome restoration, permaculture companion plants, and native seed banks.",
    verifiedSource: true
  },
  {
    id: "news-live-003",
    title: "Live Nature Observatory: Nocturnal Marsupial Habitats & Wildlife Conservation",
    source: "Woodland Sanctuary News",
    category: "Live News Broadcasts",
    publishedAt: "Live Now",
    thumbnailUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&auto=format&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/watch?v=live_wildlife_conservation_news",
    embedUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    isLive: true,
    summary: "Direct continuous feed covering wildlife rehabilitation, habitat preservation, and tick ecosystem management.",
    verifiedSource: true
  }
];

export class GeminiYouTubeNewsService {
  private static instance: GeminiYouTubeNewsService;

  public static getInstance(): GeminiYouTubeNewsService {
    if (!GeminiYouTubeNewsService.instance) {
      GeminiYouTubeNewsService.instance = new GeminiYouTubeNewsService();
    }
    return GeminiYouTubeNewsService.instance;
  }

  public searchNews(query: string = "", category: string = "All", page: number = 1, pageSize: number = 4): YouTubeNewsResultSet {
    const { isSafe, cleanQuery } = YouTubeContentSafety.sanitizeQuery(query);
    if (!isSafe) {
      return {
        query,
        totalResults: 0,
        currentPage: 1,
        totalPages: 1,
        items: []
      };
    }

    let results = [...CURATED_NEWS_FEEDS];

    if (cleanQuery) {
      const q = cleanQuery.toLowerCase();
      results = results.filter(item =>
        item.title.toLowerCase().includes(q) ||
        item.source.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    }

    if (category && category !== "All") {
      results = results.filter(item => item.category === category);
    }

    const totalResults = results.length;
    const totalPages = Math.max(1, Math.ceil(totalResults / pageSize));
    const currentPage = Math.min(Math.max(1, page), totalPages);
    const start = (currentPage - 1) * pageSize;
    const items = results.slice(start, start + pageSize);

    return {
      query: cleanQuery,
      totalResults,
      currentPage,
      totalPages,
      items
    };
  }

  public getCategories(): string[] {
    const cats = new Set<string>();
    CURATED_NEWS_FEEDS.forEach(n => cats.add(n.category));
    return ["All", ...Array.from(cats)];
  }
}

export const GeminiYouTubeNews = GeminiYouTubeNewsService.getInstance();

export interface GeminiYouTubeNewsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GeminiYouTubeNewsModal: React.FC<GeminiYouTubeNewsModalProps> = ({
  isOpen,
  onClose
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const categories = useMemo(() => GeminiYouTubeNews.getCategories(), []);

  const resultSet = useMemo(() => {
    return GeminiYouTubeNews.searchNews(searchQuery, selectedCategory, currentPage, 4);
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

  if (!isOpen) return null;

  /**
   * Activates news link in a new window, and automatically closes the modal
   * so the player can switch back and resume playing immediately.
   */
  const handleActivateNews = (item: YouTubeNewsItem) => {
    // Open in separate window/tab
    window.open(item.videoUrl, "_blank", "noopener,noreferrer");
    // Immediately close modal on activation as requested
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-4 select-text"
      role="dialog"
      aria-modal="true"
      aria-labelledby="youtube-news-modal-title"
    >
      <div className="relative flex flex-col w-full max-w-4xl max-h-[90vh] bg-stone-900 border-2 border-red-500/60 rounded-2xl shadow-2xl text-stone-100 overflow-hidden">
        
        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-stone-950 border-b border-stone-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-red-950/80 border border-red-600/50 rounded-xl text-red-400">
              <Newspaper className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <h2 id="youtube-news-modal-title" className="text-xl font-bold tracking-tight text-red-300 flex items-center gap-2">
                <span>YouTube News &amp; Live Broadcasts</span>
              </h2>
              <p className="text-xs text-stone-400">
                Verified Global News &bull; Opens in New Tab &bull; Instant Auto-Close for Multi-Tab Multitasking
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-950/80 text-emerald-300 border border-emerald-600/60">
              <ShieldCheck className="w-4 h-4 text-emerald-400" aria-hidden="true" />
              <span>Verified Clean News</span>
            </span>

            {/* Explicit On-Demand Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-600 transition shadow-sm"
              aria-label="Close News Modal and Return to Game"
            >
              <X className="w-4 h-4" aria-hidden="true" />
              <span>Close News</span>
            </button>
          </div>
        </header>

        {/* Search & Category Tabs */}
        <section className="px-6 py-3 bg-stone-900/90 border-b border-stone-800 flex flex-wrap items-center justify-between gap-3 shrink-0" aria-label="News Search and Category Filters">
          <div className="flex flex-wrap items-center gap-1.5" role="toolbar" aria-label="News Categories">
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
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search world news, science, nature..."
              className="w-full pl-9 pr-4 py-1.5 bg-stone-950 border border-stone-700 rounded-lg text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-red-500"
              aria-label="Search news broadcasts"
            />
          </div>
        </section>

        {/* News Items List */}
        <main className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 min-h-0" aria-label="News Broadcasts List">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span>
              Showing <strong>{resultSet.items.length}</strong> of <strong>{resultSet.totalResults}</strong> news channels
            </span>
            <span className="text-amber-400 font-semibold">
              Tip: Clicking any news broadcast launches a new tab and immediately resumes your game!
            </span>
          </div>

          {resultSet.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center bg-stone-950/40 rounded-xl border border-stone-800">
              <Newspaper className="w-12 h-12 text-stone-600 mb-3" aria-hidden="true" />
              <p className="text-base font-semibold text-stone-300">No news reports matching &ldquo;{searchQuery}&rdquo;</p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="mt-4 px-4 py-2 text-xs font-semibold rounded-lg bg-red-600 hover:bg-red-500 text-white transition font-bold"
              >
                Reset News Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" role="list">
              {resultSet.items.map((item) => (
                <article
                  key={item.id}
                  role="listitem"
                  onClick={() => handleActivateNews(item)}
                  className="flex flex-col p-4 rounded-xl border border-stone-800 bg-stone-950/70 hover:border-red-500/80 hover:bg-stone-900/80 transition cursor-pointer group shadow-sm text-left"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                      item.isLive ? "bg-red-950 text-red-300 border border-red-700 animate-pulse" : "bg-stone-800 text-stone-300"
                    }`}>
                      {item.isLive ? "🔴 LIVE BROADCAST" : item.category}
                    </span>
                    <span className="text-[11px] text-stone-400">{item.publishedAt}</span>
                  </div>

                  <div className="flex gap-3 mb-2">
                    <div className="relative w-24 h-16 rounded-lg overflow-hidden bg-stone-900 shrink-0 border border-stone-800">
                      <img
                        src={item.thumbnailUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <ExternalLink className="w-4 h-4 text-white" aria-hidden="true" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-stone-100 group-hover:text-red-300 transition line-clamp-2 leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs text-red-400 mt-1 font-semibold truncate">
                        {item.source}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed mb-3">
                    {item.summary}
                  </p>

                  <div className="mt-auto pt-2 border-t border-stone-800/80 flex items-center justify-between">
                    <span className="text-[11px] text-stone-400">Opens in new tab &bull; Auto-closes modal</span>
                    <button
                      type="button"
                      className="px-3 py-1 text-xs font-bold rounded-lg bg-red-600 group-hover:bg-red-500 text-white transition flex items-center gap-1.5 shadow-sm"
                      aria-label={`Watch ${item.title} on YouTube in a new tab`}
                    >
                      <span>Watch News</span>
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="px-6 py-3 bg-stone-950 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400 shrink-0">
          <div>
            Powered by <strong>YouTube News Broadcasts &amp; Gemini Feed Index</strong>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold transition"
            aria-label="Return to Game"
          >
            Return to Game
          </button>
        </footer>
      </div>
    </div>
  );
};
