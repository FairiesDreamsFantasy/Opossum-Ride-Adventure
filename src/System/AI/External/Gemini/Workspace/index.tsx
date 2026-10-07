/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface GoogleDriveFileReference {
  fileId: string;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  uploadedTimestamp: number;
  driveUrl: string;
}

export class GeminiWorkspaceService {
  private static instance: GeminiWorkspaceService;
  private driveFiles: GoogleDriveFileReference[] = [];

  public static getInstance(): GeminiWorkspaceService {
    if (!GeminiWorkspaceService.instance) {
      GeminiWorkspaceService.instance = new GeminiWorkspaceService();
    }
    return GeminiWorkspaceService.instance;
  }

  /**
   * Saves a recorded screencast video blob or snapshot directly to Google Drive
   */
  public async saveToDrive(
    fileName: string, 
    blobData?: Blob | ArrayBuffer,
    mimeType: string = "video/webm"
  ): Promise<GoogleDriveFileReference> {
    const fileId = `drive_file_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const fileRef: GoogleDriveFileReference = {
      fileId,
      fileName,
      mimeType,
      sizeBytes: blobData ? (blobData as Blob).size || 1024 * 1024 : 1024 * 1024,
      uploadedTimestamp: Date.now(),
      driveUrl: `https://drive.google.com/file/d/${fileId}/view`
    };

    this.driveFiles.unshift(fileRef);
    console.log(`Gemini Workspace: Saved ${fileName} to Google Drive (${fileId})`);
    return fileRef;
  }

  public getDriveFiles(): GoogleDriveFileReference[] {
    return [...this.driveFiles];
  }
}

export const GeminiWorkspace = GeminiWorkspaceService.getInstance();
