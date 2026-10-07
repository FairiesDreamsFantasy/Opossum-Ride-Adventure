/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PlayBookItem {
  id: string;
  title: string;
  subtitle?: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  pageCount: number;
  categories: string[];
  isbn: string;
  coverUrl: string;
  previewLink: string;
  playStoreLink: string;
  rating?: number;
  ratingsCount?: number;
  language: string;
  isEbook: boolean;
  priceFormatted?: string;
  sampleExcerpt?: string;
  keyThemes: string[];
}

export interface PlayBooksResultSet {
  query: string;
  totalItems: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  books: PlayBookItem[];
}

export interface PlayBooksSearchFilter {
  category?: string;
  author?: string;
  sortBy?: "relevance" | "rating" | "newest" | "pages";
}
