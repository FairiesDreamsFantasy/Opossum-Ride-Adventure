/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface GooglePhotoItem {
  id: string;
  title: string;
  dataUrl: string;
  width: number;
  height: number;
  capturedTimestamp: number;
}

export class GeminiPhotosService {
  private static instance: GeminiPhotosService;
  private album: GooglePhotoItem[] = [];

  public static getInstance(): GeminiPhotosService {
    if (!GeminiPhotosService.instance) {
      GeminiPhotosService.instance = new GeminiPhotosService();
    }
    return GeminiPhotosService.instance;
  }

  public storeSnapshot(title: string, dataUrl: string, width = 1920, height = 1080): GooglePhotoItem {
    const item: GooglePhotoItem = {
      id: `photo_${Date.now()}`,
      title,
      dataUrl,
      width,
      height,
      capturedTimestamp: Date.now()
    };
    this.album.unshift(item);
    return item;
  }

  public getAlbum(): GooglePhotoItem[] {
    return [...this.album];
  }
}

export const GeminiPhotos = GeminiPhotosService.getInstance();
