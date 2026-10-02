/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

export interface PaginationGeneralProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxNumericButtons?: number;
}

/**
 * Calculates page numbers to display with a maximum limit (default 6 buttons)
 * to maintain clean desktop grid proportions.
 */
export const calculateVisiblePages = (
  currentPage: number,
  totalPages: number,
  maxButtons: number = 6
): number[] => {
  if (totalPages <= maxButtons) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const half = Math.floor(maxButtons / 2);
  let start = Math.max(1, currentPage - half);
  let end = start + maxButtons - 1;

  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, end - maxButtons + 1);
  }

  const pages: number[] = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
};

export const OpossumSelectionPaginationGeneral: React.FC<PaginationGeneralProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxNumericButtons = 6,
}) => {
  if (totalPages <= 1) return null;

  const visiblePages = calculateVisiblePages(currentPage, totalPages, maxNumericButtons);

  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 pt-3 border-t border-zinc-800 text-xs select-none">
      {/* Mobile-Friendly Control Bar */}
      <div className="flex sm:hidden items-center justify-between w-full px-2 py-1.5 bg-zinc-950 border border-zinc-800 rounded-lg">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          aria-label="Previous Page"
          className="min-h-[44px] min-w-[70px] px-3 py-2 font-bold uppercase tracking-wider rounded bg-zinc-900 border border-zinc-700 text-zinc-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-zinc-800 active:scale-95 transition-all"
        >
          ‹ Prev
        </button>

        <span className="font-mono text-xs font-semibold text-amber-300 px-3">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          aria-label="Next Page"
          className="min-h-[44px] min-w-[70px] px-3 py-2 font-bold uppercase tracking-wider rounded bg-zinc-900 border border-zinc-700 text-zinc-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-zinc-800 active:scale-95 transition-all"
        >
          Next ›
        </button>
      </div>

      {/* Desktop / Tablet View with max 6 numbered buttons */}
      <div className="hidden sm:flex items-center justify-between w-full">
        {/* Left: Previous Button */}
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          aria-label="Previous Page"
          className="min-h-[44px] px-4 py-2 font-semibold uppercase tracking-wider rounded border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          ‹ Previous
        </button>

        {/* Center: Numeric Page Buttons (Max 6) */}
        <div className="flex items-center gap-1.5" role="navigation" aria-label="Pagination">
          {visiblePages.map((pageNum) => {
            const isActive = pageNum === currentPage;
            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                aria-current={isActive ? "page" : undefined}
                aria-label={`Go to page ${pageNum}`}
                className={`min-w-[44px] min-h-[44px] px-3.5 py-1.5 rounded text-xs font-mono font-bold transition-all border ${
                  isActive
                    ? "bg-amber-500/20 border-amber-500 text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.35)]"
                    : "bg-zinc-950 border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        {/* Right: Next Button */}
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          aria-label="Next Page"
          className="min-h-[44px] px-4 py-2 font-semibold uppercase tracking-wider rounded border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          Next ›
        </button>
      </div>
    </div>
  );
};
