/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SkyState {
  timeOfDay: number; // 0-24
  cycle: "Dawn" | "Day" | "Dusk" | "Night";
  ambientIntensity: number;
  skyColor: string;
  fogColor: string;
}

/**
 * Real-time Day/Night Cycle and Atmospheric Controller.
 * Synchronizes game visuals with realistic temporal patterns.
 */
export class SmartSky {
  private static cachedState: SkyState | null = null;
  private static lastCheckedTime = 0;

  public static getCurrentState(): SkyState {
    const nowMs = Date.now();
    // Cache the state for 2000ms to eliminate CPU and GC spikes
    if (this.cachedState && (nowMs - this.lastCheckedTime < 2000)) {
      return this.cachedState;
    }

    const now = new Date(nowMs);
    const hour = now.getHours();
    const minutes = now.getMinutes();
    const timeOfDay = hour + (minutes / 60);

    let cycle: SkyState["cycle"] = "Day";
    let ambient = 1.0;
    let sky = "#87CEEB";
    let fog = "#FFFFFF";

    if (timeOfDay >= 5 && timeOfDay < 8) {
      cycle = "Dawn";
      ambient = 0.6 + (timeOfDay - 5) * 0.13;
      sky = "#FFDAB9";
      fog = "#FFCCAA";
    } else if (timeOfDay >= 8 && timeOfDay < 18) {
      cycle = "Day";
      ambient = 1.0;
      sky = "#87CEEB";
      fog = "#EEEEEE";
    } else if (timeOfDay >= 18 && timeOfDay < 21) {
      cycle = "Dusk";
      ambient = 1.0 - (timeOfDay - 18) * 0.16;
      sky = "#FF4500";
      fog = "#AA3300";
    } else {
      cycle = "Night";
      ambient = 0.2;
      sky = "#000033";
      fog = "#000011";
    }

    this.cachedState = {
      timeOfDay: hour,
      cycle,
      ambientIntensity: ambient,
      skyColor: sky,
      fogColor: fog
    };
    this.lastCheckedTime = nowMs;

    return this.cachedState;
  }

  public static async getDynamicAtmosphere(context: string): Promise<string> {
    const { GeminiSystem } = await import("../../External/Gemini");
    if (!GeminiSystem.isReady()) return "Standard Atmosphere";

    try {
      const state = this.getCurrentState();
      const prompt = `Describe the visual atmosphere of "Opossum Ride Adventure" at ${state.timeOfDay}:00 (${state.cycle}) in a ${context} environment. Keep it short and evocative.`;
      
      const client = GeminiSystem.getClient();
      if (client) {
        const selectedModel = GeminiSystem.getConfig()?.selectedModel || "gemini-flash-latest";
        const result = await client.models.generateContent({
          model: selectedModel,
          contents: prompt
        });
        return result.text.trim();
      }
    } catch (e) {}
    return "Standard Atmosphere";
  }
}
