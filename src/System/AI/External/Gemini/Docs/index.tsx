/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface GoogleDocEntry {
  id: string;
  title: string;
  bodyMarkdown: string;
  createdTimestamp: number;
}

export class GeminiDocsService {
  private static instance: GeminiDocsService;
  private documents: GoogleDocEntry[] = [];

  public static getInstance(): GeminiDocsService {
    if (!GeminiDocsService.instance) {
      GeminiDocsService.instance = new GeminiDocsService();
    }
    return GeminiDocsService.instance;
  }

  public createDocument(title: string, bodyMarkdown: string): GoogleDocEntry {
    const doc: GoogleDocEntry = {
      id: `doc_${Date.now()}`,
      title,
      bodyMarkdown,
      createdTimestamp: Date.now()
    };
    this.documents.unshift(doc);
    return doc;
  }

  public getDocuments(): GoogleDocEntry[] {
    return [...this.documents];
  }
}

export const GeminiDocs = GeminiDocsService.getInstance();
