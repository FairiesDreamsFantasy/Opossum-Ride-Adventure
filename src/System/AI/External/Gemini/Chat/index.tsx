/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface GoogleChatMessage {
  id: string;
  sender: "Player" | "Gemini Assistant" | "System";
  text: string;
  timestamp: number;
}

export class GeminiChatService {
  private static instance: GeminiChatService;
  private messages: GoogleChatMessage[] = [];

  public static getInstance(): GeminiChatService {
    if (!GeminiChatService.instance) {
      GeminiChatService.instance = new GeminiChatService();
    }
    return GeminiChatService.instance;
  }

  public postMessage(sender: GoogleChatMessage["sender"], text: string): GoogleChatMessage {
    const msg: GoogleChatMessage = {
      id: `chat_${Date.now()}`,
      sender,
      text,
      timestamp: Date.now()
    };
    this.messages.push(msg);
    return msg;
  }

  public getMessages(): GoogleChatMessage[] {
    return [...this.messages];
  }
}

export const GeminiChat = GeminiChatService.getInstance();
