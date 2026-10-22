/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ShoppingProductImage {
  thumbUrl: string;
  fullUrl: string;
  descriptiveAltText: string;
}

export type PriceStatus = "fair" | "elevated" | "gouging_risk";

export interface ShoppingProduct {
  id: string;
  title: string;
  priceFormatted: string;
  priceNumeric: number;
  currency: string;
  fairMarketPrice?: number;
  priceStatus?: PriceStatus;
  ftcComplianceNotice?: string;
  unitPriceNotice?: string;
  merchantName: string;
  merchantDomain: string;
  merchantUrl: string;
  description: string;
  category: string;
  inStock: boolean;
  rating?: number;
  reviewCount?: number;
  images: ShoppingProductImage[];
  specifications: Record<string, string>;
}

export interface ShoppingResultSet {
  query: string;
  totalEstimatedResults: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  products: ShoppingProduct[];
}

export interface ShoppingClientConfig {
  apiKey?: string;
  resultsPerPage?: number;
}

export interface ShoppingSearchFilter {
  category?: string;
  maxPrice?: number;
  minPrice?: number;
  sortBy?: "relevance" | "price_asc" | "price_desc" | "rating";
  inStockOnly?: boolean;
}
