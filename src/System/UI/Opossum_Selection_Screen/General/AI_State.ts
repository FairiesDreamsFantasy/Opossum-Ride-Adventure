/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState, useEffect } from "react";
import { OPOSSUM_UI_CONSTANTS } from "./index";
import { GeminiSystem, GeminiSafety } from "../../../AI/External/Gemini";

export type OpossumSex = "Jill" | "Jack";
export type OpossumTab = "PUBLIC_DOMAIN" | "CRAFTED_INSPIRED" | "NATURE_INSPIRED";

export interface AIOpossum {
  id: string;
  name: string;
  sex: OpossumSex;
  isPaid: boolean;
  size: number;
  color: string;
  furType: "Furry" | "Smooth";
  faceType: "Furry" | "Non-Furry";
  accessories: string[];
  skinTone: "Light" | "Dark";
  earColor: string;
  tailColor: string;
  noseColor: string;
  eyeColor: string;
  innerEarColor: string;
  pattern?: string;
  rides: number;
  description: string;
  vocalSource: "Local Synthesizer" | "Cloud Network Synthesis";
  
  // Custom presets for Free/Paid Jacks
  neckRibbonColor?: string;
  sizeCategory?: "Small" | "Medium" | "Large" | "Extra-Large";
  earSize?: "Small" | "Medium" | "Large";
  furryFacePercent?: number; // 1% to 100%
  eyebrows?: string;
  snoutLength?: "Standard" | "Long" | "Short";
  hasJewellery?: boolean;
  animationStyle?: "Standard Opossum" | "Dynamic Scurry";
}

const STORAGE_KEY = "OPOSSUM_AI_GENERATED_CATALOG";

// Curated scientific initial prototypes (replaces crude 40 static clones)
const INITIAL_SCIENTIFIC_PROTOTYPES: AIOpossum[] = [
  {
    id: "proto-jill-luna",
    name: "Dusk Luna",
    sex: "Jill",
    isPaid: false,
    size: 1.0,
    sizeCategory: "Medium",
    color: "Soft Silver",
    furType: "Furry",
    faceType: "Furry",
    accessories: ["Pearl Necklace"],
    skinTone: "Light",
    earColor: "Pink",
    tailColor: "Pink",
    noseColor: "Pink",
    eyeColor: "Deep Blue",
    innerEarColor: "Pink",
    rides: 12,
    description: "A premier synthesized Jill utilizing high-fidelity cloud network synthesis with elegant marsupial chatter.",
    vocalSource: "Cloud Network Synthesis",
    neckRibbonColor: "None",
    earSize: "Medium",
    furryFacePercent: 82,
    eyebrows: "None",
    snoutLength: "Standard",
    hasJewellery: true,
    animationStyle: "Standard Opossum"
  },
  {
    id: "proto-jack-buster",
    name: "Silver Buster",
    sex: "Jack",
    isPaid: false,
    size: 1.1,
    sizeCategory: "Large",
    color: "Natural Gray",
    furType: "Furry",
    faceType: "Furry",
    accessories: [],
    skinTone: "Dark",
    earColor: "Black",
    tailColor: "Pink",
    noseColor: "Pink",
    eyeColor: "Amber",
    innerEarColor: "Pink",
    rides: 25,
    description: "A free-tier Jack companion featuring an iconic multi-colored neck ribbon and cloud-synthesized masculine vocalizations.",
    vocalSource: "Cloud Network Synthesis",
    neckRibbonColor: "Multi-colored",
    earSize: "Medium",
    furryFacePercent: 85,
    eyebrows: "Bushy",
    snoutLength: "Standard",
    hasJewellery: false,
    animationStyle: "Standard Opossum"
  },
  {
    id: "proto-jill-hazel",
    name: "Meadow Hazel",
    sex: "Jill",
    isPaid: false,
    size: 0.95,
    sizeCategory: "Medium",
    color: "Pearl White",
    furType: "Furry",
    faceType: "Furry",
    accessories: [],
    skinTone: "Light",
    earColor: "Pink",
    tailColor: "Pink",
    noseColor: "Light Pink",
    eyeColor: "Natural Green",
    innerEarColor: "Pink",
    rides: 8,
    description: "A swift and agile Jill utilizing local offline synthesis for responsive acoustic feedback across tranquil meadows.",
    vocalSource: "Local Synthesizer",
    neckRibbonColor: "None",
    earSize: "Medium",
    furryFacePercent: 78,
    eyebrows: "None",
    snoutLength: "Standard",
    hasJewellery: false,
    animationStyle: "Standard Opossum"
  },
  {
    id: "proto-jack-jasper",
    name: "Dusk Jasper",
    sex: "Jack",
    isPaid: false,
    size: 1.05,
    sizeCategory: "Medium",
    color: "Slate Charcoal",
    furType: "Furry",
    faceType: "Furry",
    accessories: [],
    skinTone: "Dark",
    earColor: "Dark Gray",
    tailColor: "Pink",
    noseColor: "Pink",
    eyeColor: "Hazel",
    innerEarColor: "Pink",
    rides: 14,
    description: "A robust Jack with balanced stride dynamics, high-frequency tail grip, and regulated multi-colored ribbon.",
    vocalSource: "Cloud Network Synthesis",
    neckRibbonColor: "Multi-colored",
    earSize: "Medium",
    furryFacePercent: 80,
    eyebrows: "Standard",
    snoutLength: "Standard",
    hasJewellery: false,
    animationStyle: "Standard Opossum"
  }
];

/**
 * Global AI State for Opossum Generation
 */
export const useOpossumAIState = () => {
  const [activeAITab, setActiveAITab] = useState<OpossumTab>("PUBLIC_DOMAIN");
  const [smartNarrative, setSmartNarrative] = useState("");
  const [quota, setQuota] = useState(100);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOpossums, setGeneratedOpossums] = useState<AIOpossum[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn("Could not parse saved AI opossum catalog:", e);
    }
    return INITIAL_SCIENTIFIC_PROTOTYPES;
  });
  const [hasAnyKey, setHasAnyKey] = useState(false);
  const [hasPaidKey, setHasPaidKey] = useState(false);
  const [showNetworkFeed, setShowNetworkFeed] = useState(true);

  // Sync to local storage whenever generated opossums change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(generatedOpossums));
    } catch (e) {
      console.warn("Failed to persist AI opossum catalog:", e);
    }
  }, [generatedOpossums]);

  useEffect(() => {
    const updateKeyState = () => {
      const ready = GeminiSystem.isReady();
      const config = GeminiSystem.getConfig();
      setHasAnyKey(ready);
      setHasPaidKey(ready && config?.tier === "Paid");
      
      const status = GeminiSystem.getQuotaStatus();
      setQuota(Math.floor(status.percent));
    };

    updateKeyState();
    return GeminiSystem.subscribe(updateKeyState);
  }, []);

  const generateOpossum = async (prompt: string): Promise<{
    type: "question" | "generate" | "error";
    text: string;
    opossum?: AIOpossum;
  }> => {
    if (!hasAnyKey || quota <= 0) {
      return {
        type: "error",
        text: "Please provide a valid Gemini API Key via 'Insert AI' to run dynamic fullstack opossum generation."
      };
    }
    
    // --- Pre-processing: Comments, Tags & Segments ---
    let processedPrompt = prompt;
    
    // Extract special segments
    const generalChatMatch = prompt.match(/<!--General Chat Start-->([\s\S]*?)<!--General Chat End-->/i);
    const descriptionMatch = prompt.match(/<!--Opossum Description Start-->([\s\S]*?)<!--Opossum Description End-->/i);
    
    if (generalChatMatch || descriptionMatch) {
      processedPrompt = (generalChatMatch?.[1] || "") + "\n" + (descriptionMatch?.[1] || "");
    }

    // Strip remaining <!-- ... --> comments
    processedPrompt = processedPrompt.replace(/<!--[\s\S]*?-->/g, "");

    // Strip line comments // and # (but ignore hashtags in paragraphs)
    processedPrompt = processedPrompt.split('\n').map(line => {
      const lineWithoutHashtags = line.replace(/#\w+/g, 'TOKEN');
      const commentIdx = lineWithoutHashtags.search(/\/\/|#/);
      if (commentIdx !== -1) {
        const charAtIdx = lineWithoutHashtags.charAt(commentIdx);
        return line.substring(0, line.indexOf(charAtIdx, line.search(new RegExp(`[^#\\w]${charAtIdx === '#' ? '\\#' : '\\/\\/'}`)) + 1));
      }
      return line;
    }).join('\n');

    const lowerPrompt = processedPrompt.toLowerCase();
    
    // Terminology Validation (Kid vs Child/Idren)
    const hasHashtagKid = /#\w*kid\w*/i.test(prompt);
    const isExemptBrand = lowerPrompt.includes("pbs kids") || lowerPrompt.includes("national geographic kids") || lowerPrompt.includes("tom & jerry kids");
    const isKidTermUsed = lowerPrompt.includes("kid") && !isExemptBrand && !hasHashtagKid;
    
    if (isKidTermUsed) {
      return {
        type: "question",
        text: "Kids are baby goats! A definition of a kid is a baby goat. To prevent confusion, please use 'child-friendly' or 'idren-friendly' instead. Refer to https://en.wikipedia.org/wiki/Goat to overstand what a kid is.\n\nWould you like to generate an opossum to ride for your adventure?"
      };
    }

    // Zero-Tolerance Anti-Spanking & Child Safety Mandate
    const safetyCheck = GeminiSafety.validatePrompt(prompt, "OPOSSUM_SELECTION_USER_PROMPT");
    if (safetyCheck.violationDetected) {
      return {
        type: "question",
        text: safetyCheck.blockedMessage || "Request blocked under the Zero-Tolerance Anti-Spanking & Child Safety Mandate."
      };
    }

    // Fetish/Erotica Block (Babylonian Norm Prevention)
    const isFetish = lowerPrompt.includes("fetish") || lowerPrompt.includes("sexual") || lowerPrompt.includes("erotica") || lowerPrompt.includes("pornography");
    if (isFetish) {
      return {
        type: "question",
        text: "Sorry, we can't generate this opossum for fetishism because, this is a 'Babylonian norm' what I opposed. For your safety; this opossum will not be used for fetishism, sexualized, used for sexualization, pornography, erotica, and other sex/erotica/fetishism-related uses."
      };
    }

    setIsGenerating(true);

    try {
      const ai = GeminiSystem.getClient();
      const currentConfig = GeminiSystem.getConfig();
      const selectedModel = currentConfig?.selectedModel || "gemini-flash-latest";
      const hasDwarfism = lowerPrompt.includes("dwarfism") || lowerPrompt.includes("short") || (lowerPrompt.match(/\d+ feet/) && parseInt(lowerPrompt.match(/(\d+) feet/)?.[1] || "5") < 4);

      const basePrompt = `You are the advanced Gemini AI Game Subsystem for "Opossum Ride Adventure" (v0.1.0.7.5).
The player has provided their own Gemini API key and typed the following prompt:
"${prompt}"

Current System Info:
- User Upgrade Tier: ${hasPaidKey ? "PAID/PREMIUM (Unlimited customization, no restrictions)" : "FREE/STANDARD TIER (Limited Jack customization, Jills are fully free)"}
- Special Accommodation: ${hasDwarfism ? "Dwarfism/Height scaling requested (Scale down to accommodate smaller riders)" : "Standard scaling"}

SAFETY & CULTURAL RULES:
- BABYLON-FREE MANDATE: Always prioritize wholesome, artistic, and respectful content. Oppose "Babylonian norms" like vanity, materialism, and fetishism.
- FETISHISM BLOCK: Strictly refuse any request for fetishism, erotica, or sexualized content.
- RELIGION TIERING:
  * Christianity is a PAID feature. If a free user requests it, classify as "question" and explain that an upgrade is required.
  * Rastafari is FREE and OPEN for everyone. If requested, respond with: "A Rastafarian opossum... or Rastafari opossum? No problem! This is a crafted work of art what you are making. This is going to be good... and you may continue on."

CLASSIFICATION RULES:
- If asking questions about jacks, jills, or opossum topics in general, classify as "question".
- If trying to generate or customize an opossum, classify as "generate".

GENERATION RULES (IF "generate"):
- Gender: Determine if "Jill" or "Jack".
- Jills: Fully free to generate with no restrictions.
- Jacks on FREE TIER (${!hasPaidKey ? "ACTIVE" : "INACTIVE"}):
  * Name: Chosen from: Buster, Finn, Arlo, Milo, Otis, Jasper, Rocky, Silver Buster, Dusk Milo, etc.
  * Ribbon: Free jacks MUST wear a multi-colored ribbon around their neck ("Multi-colored").
  * Size: "Small", "Medium", "Large", "Extra-Large".
  * Furry Face Level: 1% to 100% (default 80%).
  * Ear Size: "Small", "Medium", "Large".
  * Eyebrows: "Standard", "Bushy", "None".
  * Audio: Cloud-based high-quality sound synthesis (vocalSource: "Cloud Network Synthesis").

HEIGHT ACCOMMODATION:
- If dwarfism or short height detected, respond with: "Dwarfism? No problem!! I'll generate a smaller sized jack opossum just for your size. Thanks for reminding me about dwarfism-related height."
- Set "size" smaller (0.6 to 0.75).

You MUST respond strictly with a valid JSON object matching this schema:
{
  "type": "question" | "generate",
  "explanation": "A friendly, scientific, and detailed response back to the player.",
  "opossum": {
    "name": "The parsed/generated name",
    "sex": "Jill" | "Jack",
    "size": float (between 0.6 and 1.4),
    "sizeCategory": "Small" | "Medium" | "Large" | "Extra-Large",
    "color": "The body color description",
    "furType": "Furry" | "Smooth",
    "faceType": "Furry" | "Non-Furry",
    "furryFacePercent": number (1 to 100),
    "earSize": "Small" | "Medium" | "Large",
    "eyebrows": "Standard" | "Bushy" | "None",
    "snoutLength": "Standard" | "Long" | "Short",
    "earColor": "color",
    "innerEarColor": "color",
    "tailColor": "color",
    "noseColor": "color",
    "eyeColor": "color",
    "skinTone": "Light" | "Dark",
    "accessories": string[],
    "hasJewellery": boolean,
    "neckRibbonColor": "Multi-colored" | "None",
    "vocalSource": "Cloud Network Synthesis" | "Local Synthesizer",
    "animationStyle": "Standard Opossum" | "Dynamic Scurry"
  }
}
Do not include markdown outside of the JSON block.`;

      const customInstructions = currentConfig?.systemInstructions || "";
      let fullInstruction = GeminiSafety.wrapSystemInstructions(basePrompt);
      if (customInstructions.trim().length > 0) {
        fullInstruction = `CUSTOM PLAYER INSTRUCTIONS:\n${customInstructions}\n\n${fullInstruction}`;
      }

      let textResponse = "";

      // Prioritize fullstack Express proxy route for player-provided keys
      try {
        const response = await fetch("/api/gemini/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            apiKey: currentConfig?.apiKey,
            model: selectedModel,
            contents: [{ parts: [{ text: fullInstruction }] }]
          })
        });

        if (!response.ok) {
          const errText = await response.text();
          throw new Error(errText);
        }

        const responseData = await response.json();
        textResponse = responseData?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      } catch (proxyErr) {
        console.warn("[Fullstack Proxy Fallback]: Calling client instance directly...", proxyErr);
        if (!ai) throw new Error("Fullstack proxy failed and local Gemini client not initialized.");
        const result = await ai.models.generateContent({
          model: selectedModel,
          contents: [{ text: fullInstruction }]
        });
        textResponse = result.text || "";
      }

      // Safety Output Validation
      const outputSafety = GeminiSafety.validateOutput(textResponse, "OPOSSUM_GENERATION_OUTPUT");
      if (outputSafety.violationDetected) {
        setIsGenerating(false);
        const driftHandled = GeminiSafety.handleModelDrift({
          modelId: selectedModel,
          userPrompt: prompt,
          rawOutput: textResponse,
          sourceModule: "OPOSSUM_GENERATION_OUTPUT",
          violationRules: outputSafety.reasons
        });
        const fallbackCharacter: AIOpossum = {
          ...driftHandled.safeFallbackOpossum,
          id: `gen-drift-${Date.now()}`,
          isPaid: hasPaidKey,
          rides: 0
        };
        setGeneratedOpossums(prev => [fallbackCharacter, ...prev]);
        return {
          type: "generate",
          opossum: fallbackCharacter,
          text: "Notice: Output adjusted to comply with safety mandates. A serene companion has been synthesized."
        };
      }

      let jsonMatch = textResponse.match(/```(?:json)?\s*([\s\S]*?)```/);
      let parsedData: any = null;
      try {
        const jsonText = jsonMatch ? jsonMatch[1].trim() : textResponse.trim();
        parsedData = JSON.parse(jsonText);
      } catch (e) {
        parsedData = {
          type: "question",
          explanation: textResponse
        };
      }

      if (parsedData.type === "generate" && parsedData.opossum) {
        const rawOp = parsedData.opossum;
        const finalSex = rawOp.sex === "Jack" ? "Jack" : "Jill";
        let finalName = rawOp.name || "Synthesized Opossum";
        let finalRibbon = rawOp.neckRibbonColor || "None";
        let finalJewellery = Boolean(rawOp.hasJewellery);
        let finalEarSize = rawOp.earSize || "Medium";
        let finalFurryFace = rawOp.furryFacePercent || 80;
        let finalAnim = rawOp.animationStyle || "Standard Opossum";

        if (finalSex === "Jack" && !hasPaidKey) {
          finalRibbon = "Multi-colored";
          finalJewellery = false;
        }

        const newOp: AIOpossum = {
          id: `gen-${Date.now()}`,
          name: finalName,
          sex: finalSex,
          isPaid: hasPaidKey,
          size: rawOp.size || 1.0,
          sizeCategory: rawOp.sizeCategory || "Medium",
          color: rawOp.color || "Natural Gray",
          furType: rawOp.furType || "Furry",
          faceType: rawOp.faceType || "Furry",
          furryFacePercent: finalFurryFace,
          earSize: finalEarSize,
          eyebrows: rawOp.eyebrows || "None",
          snoutLength: rawOp.snoutLength || "Standard",
          earColor: rawOp.earColor || (finalSex === "Jack" ? "Dark Gray" : "Pink"),
          tailColor: rawOp.tailColor || "Pink",
          noseColor: rawOp.noseColor || "Pink",
          eyeColor: rawOp.eyeColor || "Deep Blue",
          innerEarColor: rawOp.innerEarColor || "Pink",
          skinTone: rawOp.skinTone || "Light",
          accessories: finalJewellery ? ["Diamond Earring"] : [],
          hasJewellery: finalJewellery,
          neckRibbonColor: finalRibbon,
          rides: 0,
          description: parsedData.explanation || "A dynamically synthesized entity.",
          vocalSource: rawOp.vocalSource || "Cloud Network Synthesis",
          animationStyle: finalAnim
        };

        setGeneratedOpossums(prev => [newOp, ...prev.filter(p => p.id !== newOp.id)]);
        setIsGenerating(false);

        return {
          type: "generate",
          text: parsedData.explanation,
          opossum: newOp
        };
      } else {
        setIsGenerating(false);
        return {
          type: "question",
          text: parsedData.explanation || textResponse
        };
      }
    } catch (err: any) {
      console.error("Gemini Opossum Generation Error:", err);
      setIsGenerating(false);
      return {
        type: "error",
        text: `Synthesis Exception: ${err.message || "Failed to communicate with fullstack Gemini backend."}`
      };
    }
  };

  const reset = () => {
    setGeneratedOpossums(INITIAL_SCIENTIFIC_PROTOTYPES);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  };

  const removeOpossum = (id: string) => {
    setGeneratedOpossums(prev => prev.filter(o => o.id !== id));
  };

  return {
    activeAITab,
    setActiveAITab,
    smartNarrative,
    setSmartNarrative,
    quota,
    isGenerating,
    generatedOpossums,
    hasAnyKey,
    hasPaidKey,
    showNetworkFeed,
    setShowNetworkFeed,
    generateOpossum,
    removeOpossum,
    reset
  };
};
