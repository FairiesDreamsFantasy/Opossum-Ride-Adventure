import { GeminiSystem } from "./index";

/**
 * Scientific Gemini Connectivity Test Script
 * Verifies the ability to reach the Gemini API and parse responses 
 * without modifying game state.
 */
export async function runScientificDiagnostic(apiKey: string) {
  console.log("--- STARTING SCIENTIFIC DIAGNOSTIC ---");
  
  const config = {
    apiKey: apiKey,
    strength: "Light" as const,
    cloudTTS: false,
    smartVisuals: false,
    smartMP3: false
  };

  console.log("Testing initialization...");
  const initSuccess = await GeminiSystem.initialize(config);
  
  if (!initSuccess) {
    console.error("DIAGNOSTIC FAILURE: Initialization failed. Check API key.");
    return false;
  }

  console.log("Testing opponent control logic...");
  try {
    const reaction = await (GeminiSystem as any).resolveScientificReaction({
      mooseName: "Rebecca",
      monkeyName: "Colt",
      environment: "Forest",
      isOpossumEvent: true
    });
    console.log("DIAGNOSTIC SUCCESS: Reaction received:", reaction);
    return true;
  } catch (error) {
    console.error("DIAGNOSTIC FAILURE: API call failed during reaction resolution.", error);
    return false;
  }
}
