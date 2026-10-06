/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SlidePage {
  slideNumber: number;
  title: string;
  bulletPoints: string[];
  notes?: string;
}

export interface GooglePresentationDeck {
  id: string;
  title: string;
  slides: SlidePage[];
  createdTimestamp: number;
}

export class GeminiSlidesService {
  private static instance: GeminiSlidesService;
  private presentations: GooglePresentationDeck[] = [];

  public static getInstance(): GeminiSlidesService {
    if (!GeminiSlidesService.instance) {
      GeminiSlidesService.instance = new GeminiSlidesService();
    }
    return GeminiSlidesService.instance;
  }

  public createDeck(title: string, slides: SlidePage[]): GooglePresentationDeck {
    const deck: GooglePresentationDeck = {
      id: `deck_${Date.now()}`,
      title,
      slides,
      createdTimestamp: Date.now()
    };
    this.presentations.unshift(deck);
    return deck;
  }

  public getDecks(): GooglePresentationDeck[] {
    return [...this.presentations];
  }
}

export const GeminiSlides = GeminiSlidesService.getInstance();
