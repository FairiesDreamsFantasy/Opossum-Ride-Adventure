/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Gemini AI Documents General Models
 * Protection Standard: 75,000,000,000% Ultra-Broad Protection Standard
 * Standard: Document pages, metadata properties, and paragraph structures
 */

export interface DocumentPage {
  pageNumber: number;
  content: string;
}

export interface DocumentMetadata {
  format: "MD" | "PDF" | "TXT" | "EPUB" | "DOCX" | "DOC" | "ODT" | "RTF";
  title: string;
  author: string;
  pageCount: number;
}

export class DocumentFormatHelper {
  public static cleanText(raw: string): string {
    return raw.replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F]/g, "").trim();
  }
}
