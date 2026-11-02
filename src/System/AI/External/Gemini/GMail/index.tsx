/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface GmailMessageDraft {
  id: string;
  to: string;
  subject: string;
  bodyText: string;
  sentTimestamp?: number;
  status: "queued" | "sent";
}

export class GeminiGmailService {
  private static instance: GeminiGmailService;
  private outbox: GmailMessageDraft[] = [];

  public static getInstance(): GeminiGmailService {
    if (!GeminiGmailService.instance) {
      GeminiGmailService.instance = new GeminiGmailService();
    }
    return GeminiGmailService.instance;
  }

  public sendSessionSummary(recipient: string, sessionStats: Record<string, any>): GmailMessageDraft {
    const msg: GmailMessageDraft = {
      id: `mail_${Date.now()}`,
      to: recipient,
      subject: "Opossum Ride Adventure — Expedition Telemetry Log",
      bodyText: `Expedition Completed:\n${JSON.stringify(sessionStats, null, 2)}`,
      sentTimestamp: Date.now(),
      status: "sent"
    };
    this.outbox.unshift(msg);
    return msg;
  }

  public getOutbox(): GmailMessageDraft[] {
    return [...this.outbox];
  }
}

export const GeminiGMail = GeminiGmailService.getInstance();
