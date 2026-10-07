/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface GoogleSheetWorkbook {
  id: string;
  title: string;
  headers: string[];
  rows: (string | number)[][];
  lastUpdated: number;
}

export class GeminiSheetsService {
  private static instance: GeminiSheetsService;
  private workbooks: GoogleSheetWorkbook[] = [];

  public static getInstance(): GeminiSheetsService {
    if (!GeminiSheetsService.instance) {
      GeminiSheetsService.instance = new GeminiSheetsService();
    }
    return GeminiSheetsService.instance;
  }

  public recordTelemetryRow(
    workbookTitle: string, 
    headers: string[], 
    row: (string | number)[]
  ): GoogleSheetWorkbook {
    let wb = this.workbooks.find(w => w.title === workbookTitle);
    if (!wb) {
      wb = {
        id: `sheet_${Date.now()}`,
        title: workbookTitle,
        headers,
        rows: [],
        lastUpdated: Date.now()
      };
      this.workbooks.push(wb);
    }

    wb.rows.push(row);
    wb.lastUpdated = Date.now();
    return wb;
  }

  public getWorkbooks(): GoogleSheetWorkbook[] {
    return [...this.workbooks];
  }
}

export const GeminiSheets = GeminiSheetsService.getInstance();
