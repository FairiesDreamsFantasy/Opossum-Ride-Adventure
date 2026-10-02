/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ScoreEntry {
  rank: number;
  name: string;
  score: number;
  commendation: string;
  timestamp: number;
}

/**
 * Gemini-enhanced Leaderboard System.
 * Ranks scores and generates AI-driven scientific achievement descriptions.
 */
export class SmartLeaderboard {
  private static scores: ScoreEntry[] = [];

  public static async addScore(name: string, score: number): Promise<ScoreEntry> {
    const { GeminiSystem } = await import("../index");
    let commendation = "Standard Performance Recorded.";

    if (GeminiSystem.isReady()) {
      try {
        const prompt = `A player named "${name}" achieved a score of ${score} in "Opossum Ride Adventure".
        Generate a one-sentence scientific commendation in the style of an ultra-high-fidelity game analyzer.
        Focus on their "Riding Prowess" or "Scientific Accuracy".`;

        const client = GeminiSystem.getClient();
        if (client) {
          const selectedModel = GeminiSystem.getConfig()?.selectedModel || "gemini-flash-latest";
          const result = await client.models.generateContent({
            model: selectedModel,
            contents: prompt
          });
          commendation = result.text.trim();
        }
      } catch (error) {
        console.warn("Gemini Commendation Failed:", error);
      }
    }

    const newEntry: ScoreEntry = {
      rank: 0,
      name,
      score,
      commendation,
      timestamp: Date.now()
    };

    this.scores.push(newEntry);
    this.scores.sort((a, b) => b.score - a.score);
    
    // Update ranks
    this.scores.forEach((s, i) => s.rank = i + 1);
    
    return newEntry;
  }

  public static getTopScores(limit: number = 10): ScoreEntry[] {
    return this.scores.slice(0, limit);
  }
}
