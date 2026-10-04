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

/**
 * Global AI State for Opossum Generation
 */
export const useOpossumAIState = () => {
  const [activeAITab, setActiveAITab] = useState<OpossumTab>("PUBLIC_DOMAIN");
  const [smartNarrative, setSmartNarrative] = useState("");
  const [quota, setQuota] = useState(100);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOpossums, setGeneratedOpossums] = useState<AIOpossum[]>([]);
  const [hasAnyKey, setHasAnyKey] = useState(false);
  const [hasPaidKey, setHasPaidKey] = useState(false);
  const [showNetworkFeed, setShowNetworkFeed] = useState(true);

  // Helper for generating meaningful, safe names with scientific variety
  const generateSafeName = (sex: OpossumSex, index: number = 0) => {
    const prefixes = ["Silver", "Dusk", "Meadow", "Mist", "Cloud", "Star", "Leaf", "River", "Golden", "Autumn", "Winter", "Spring", "Summer", "Ocean", "Forest", "Mountain"];
    const jillNames = ["Luna", "Bella", "Willow", "Hazel", "Daisy", "Ivy", "Sasha", "Maya", "Nova", "Faye", "Skye", "Zoe", "Chloe", "Ruby", "Pearl", "Opal"];
    const jackNames = ["Buster", "Finn", "Arlo", "Milo", "Otis", "Jasper", "Rocky", "Duke", "Max", "Leo", "Toby", "Bear", "Zeke", "Gus", "Jax", "Cooper"];
    const list = sex === "Jill" ? jillNames : jackNames;
    
    // Deterministic selection based on index to ensure uniqueness across the grid
    const pref = prefixes[(index + Math.floor(index / prefixes.length)) % prefixes.length];
    const name = list[(index + Math.floor(index / list.length)) % list.length];
    
    return `${pref} ${name}`;
  };

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

  useEffect(() => {
    if (hasAnyKey && generatedOpossums.length === 0) {
      // --- SCIENTIFIC REFINEMENT: Page 1 Seeding (5 Rows of 8 = 40 total) ---
      // Row 1-3: Jill (Local Synthesizer) - 24 units
      const row1to3 = Array.from({ length: 24 }, (_, i) => ({
        id: `row-1-3-jill-${i}`,
        name: generateSafeName("Jill", i),
        sex: "Jill" as const,
        isPaid: false,
        size: 0.95 + (i % 5) * 0.05,
        sizeCategory: "Medium" as const,
        color: i % 2 === 0 ? "Gray" : "White",
        furType: "Furry" as const,
        faceType: "Furry" as const,
        accessories: [],
        skinTone: "Light" as const,
        earColor: "Pink",
        tailColor: "Pink",
        noseColor: "Light Pink",
        eyeColor: "Natural",
        innerEarColor: "Pink",
        rides: Math.floor(Math.random() * 20),
        description: "A standard jill utilizing local sound synthesis.",
        vocalSource: "Local Synthesizer" as const,
        neckRibbonColor: "None" as const,
        earSize: "Medium" as const,
        furryFacePercent: 75,
        eyebrows: "None",
        snoutLength: "Standard" as const,
        hasJewellery: false,
        animationStyle: "Standard Opossum" as const
      }));

      // Row 4: Jill (Cloud Network Synthesis) - 8 units
      const row4 = Array.from({ length: 8 }, (_, i) => ({
        id: `row-4-jill-${i}`,
        name: generateSafeName("Jill", i + 100), // Offset for uniqueness
        sex: "Jill" as const,
        isPaid: false,
        size: 1.0,
        sizeCategory: "Medium" as const,
        color: "Soft Silver",
        furType: "Furry" as const,
        faceType: "Furry" as const,
        accessories: ["Pearl Necklace"], // Special visual cue
        skinTone: "Light" as const,
        earColor: "Pink",
        tailColor: "Pink",
        noseColor: "Pink",
        eyeColor: "Deep Blue",
        innerEarColor: "Pink",
        rides: Math.floor(Math.random() * 40),
        description: "A premium-tier jill utilizing high-fidelity cloud network synthesis.",
        vocalSource: "Cloud Network Synthesis" as const,
        neckRibbonColor: "None" as const,
        earSize: "Medium" as const,
        furryFacePercent: 80,
        eyebrows: "None",
        snoutLength: "Standard" as const,
        hasJewellery: true,
        animationStyle: "Standard Opossum" as const
      }));

      // Row 5: Jack (Cloud Network Synthesis) - 8 units
      const row5 = Array.from({ length: 8 }, (_, i) => ({
        id: `row-5-jack-${i}`,
        name: generateSafeName("Jack", i + 200),
        sex: "Jack" as const,
        isPaid: false,
        size: 1.1,
        sizeCategory: "Large" as const,
        color: "Natural Gray",
        furType: "Furry" as const,
        faceType: "Furry" as const,
        accessories: [],
        skinTone: "Dark" as const,
        earColor: "Black",
        tailColor: "Pink",
        noseColor: "Pink",
        eyeColor: "Amber",
        innerEarColor: "Pink",
        rides: Math.floor(Math.random() * 60),
        description: "A free jack utilizing cloud network synthesis for masculine vocalizations.",
        vocalSource: "Cloud Network Synthesis" as const,
        neckRibbonColor: "Multi-colored" as const,
        earSize: "Medium" as const,
        furryFacePercent: 85,
        eyebrows: "Bushy",
        snoutLength: "Standard" as const,
        hasJewellery: false,
        animationStyle: "Standard Opossum" as const
      }));

      setGeneratedOpossums([...row1to3, ...row4, ...row5]);
    }
  }, [hasAnyKey]);

  const generateOpossum = async (prompt: string): Promise<{
    type: "question" | "generate" | "error";
    text: string;
    opossum?: AIOpossum;
  }> => {
    if (!hasAnyKey || quota <= 0) {
      return {
        type: "error",
        text: "Please provide a valid Gemini API Key via 'Insert AI' to run this action."
      };
    }
    
    // --- Pre-processing: Comments, Tags & Segments ---
    let processedPrompt = prompt;
    
    // 1. Strip block comments <!-- ... --> (but keep inner content if it contains specific tags)
    // Extract special segments
    const generalChatMatch = prompt.match(/<!--General Chat Start-->([\s\S]*?)<!--General Chat End-->/i);
    const descriptionMatch = prompt.match(/<!--Opossum Description Start-->([\s\S]*?)<!--Opossum Description End-->/i);
    
    if (generalChatMatch || descriptionMatch) {
      processedPrompt = (generalChatMatch?.[1] || "") + "\n" + (descriptionMatch?.[1] || "");
    }

    // Strip remaining <!-- ... --> comments
    processedPrompt = processedPrompt.replace(/<!--[\s\S]*?-->/g, "");

    // 2. Strip line comments // and # (but ignore hashtags in paragraphs)
    processedPrompt = processedPrompt.split('\n').map(line => {
      // Only treat // or # as a comment if it's not part of a word (simple heuristic)
      const lineWithoutHashtags = line.replace(/#\w+/g, 'TOKEN');
      const commentIdx = lineWithoutHashtags.search(/\/\/|#/);
      if (commentIdx !== -1) {
        // Find the actual index in the original line
        const charAtIdx = lineWithoutHashtags.charAt(commentIdx);
        return line.substring(0, line.indexOf(charAtIdx, line.search(new RegExp(`[^#\\w]${charAtIdx === '#' ? '\\#' : '\\/\\/'}`)) + 1));
      }
      return line;
    }).join('\n');

    const lowerPrompt = processedPrompt.toLowerCase();
    
    // 3. Terminology Validation (Kid vs Child/Idren)
    // Ignore kids if it's a hashtag or part of specific exempt brands
    const hasHashtagKid = /#\w*kid\w*/i.test(prompt);
    const isExemptBrand = lowerPrompt.includes("pbs kids") || lowerPrompt.includes("national geographic kids") || lowerPrompt.includes("tom & jerry kids");
    
    const isKidTermUsed = lowerPrompt.includes("kid") && !isExemptBrand && !hasHashtagKid;
    
    if (isKidTermUsed) {
      return {
        type: "question",
        text: "Kids are baby goats! A definition of a kid is a baby goat. To prevent confusion, please use 'child-friendly' or 'idren-friendly' instead. Refer to https://en.wikipedia.org/wiki/Goat to overstand what a kid is.\n\nWould you like to generate an opossum to ride for your adventure?"
      };
    }

    // 0. Ultra-Hardened Zero-Tolerance Anti-Spanking & Violence Interception
    const safetyCheck = GeminiSafety.validatePrompt(prompt, "OPOSSUM_SELECTION_USER_PROMPT");
    if (safetyCheck.violationDetected) {
      return {
        type: "question",
        text: safetyCheck.blockedMessage || "Request blocked under the Zero-Tolerance Anti-Spanking & Child Safety Mandate."
      };
    }

    // 4. Fetish/Erotica Block (Babylonian Norm Prevention)
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
      if (!ai) {
        throw new Error("Gemini Client not initialized.");
      }

      // Check for dwarfism or specific height requests to adjust scaling
      const hasDwarfism = lowerPrompt.includes("dwarfism") || lowerPrompt.includes("short") || (lowerPrompt.match(/\d+ feet/) && parseInt(lowerPrompt.match(/(\d+) feet/)?.[1] || "5") < 4);

      const currentConfig = GeminiSystem.getConfig();
      const selectedModel = currentConfig?.selectedModel || "gemini-flash-latest";

      const basePrompt = `
You are the advanced Gemini AI Game Subsystem for "Opossum Ride Adventure" (v0.0.8.9).
The player has provided their own Gemini API key and typed the following prompt:
"${prompt}"

Current System Info:
- User Upgrade Tier: ${hasPaidKey ? "PAID/PREMIUM (Unlimited customization, no restrictions)" : "FREE/STANDARD TIER (Limited Jack customization, Jills are fully free)"}
- Special Accommodation: ${hasDwarfism ? "Dwarfism/Height scaling requested (Scale down to accommodate smaller riders)" : "Standard scaling"}

SAFETY & CULTURAL RULES:
- BABYLON-FREE MANDATE: Always prioritize wholesome, artistic, and respectful content. Oppose "Babylonian norms" like vanity, materialism, and fetishism.
- FETISHISM BLOCK: Strictly refuse any request for fetishism, erotica, or sexualized content.
- RELIGION TIERING: 
  * Christianity (including denominations like Catholic, Protestant, etc. but excluding Rastafari) is a PAID feature. If a free user requests it, classify as "question" and explain that an upgrade is required to generate a Christian-associated opossum.
  * Rastafari is FREE and OPEN for everyone (both paid and free tiers). If requested, respond with: "A Rastafarian opossum... or Rastafari opossum? No problem! This is a crafted work of art what you are making. This is going to be good... and you may continue on."

CLASSIFICATION RULES:
- If the user is asking questions about jacks, jills, or opossum topics in general, classify as "question". Answer the question in detail, scientifically and nicely!
- If the user is trying to generate or customize an opossum, classify as "generate".
- If the prompt mentions "child-friendly" or "idren-friendly", respond with "Okay, I'll make it 'Babylon-Free' by default. Looks like you want to generate this beautiful opossum." as part of the explanation.

TERMINOLOGY TRANSLATIONS (For general chat):
- Translate "kid" to "child" and "kids" to "idren/children" in your explanations.
- If they ask about "Kiddy rides", explain they should be called "idren's ride machines" and discuss safety/design for all ages, not just infants.
- If they ask about brands like "PBS Kids" or "Tom & Jerry Kids", address them correctly without confusion.

GENERATION RULES (IF "generate"):
- Gender: Determine if the requested opossum is a "Jill" (female) or "Jack" (male). If not specified, default to either (randomly).
- Jills: Fully free to generate with no restrictions. Can have custom jewelry, accessories, and colors.
- Jacks on FREE TIER (${!hasPaidKey ? "ACTIVE" : "INACTIVE"}):
  * Name: Must be chosen from a set of pre-determined names: Buster, Finn, Arlo, Milo, Otis, Jasper, Rocky, Silver Buster, Dusk Milo, etc.
  * Ribbon: Free jacks MUST wear a multi-colored ribbon around their neck ("Multi-colored").
  * Size: Must be one of the pre-determined size categories: "Small", "Medium", "Large", "Extra-Large".
  * Furry Face Level: Must be a pre-determined percentage from 1% to 100% furry face like a conventional opossum (e.g., 75).
  * Ear Size: Must be chosen from pre-determined sizes: "Small", "Medium", "Large" to prevent them from being too big or small.
  * Eyebrows: Must be pre-determined ("Standard", "Bushy", "None").
  * Colors: Must be selected from pre-determined sets of colors: e.g. body color (Gray, White, Soft Silver), ear/inner ear (Pink, Dark Gray), tail (Pink, Spotted), nose (Light Pink, Red, Black), paws.
  * Snout length, head size, and tail length are pre-determined (can only be customized up to 20% longer, colors and markings are pre-determined, shoulder height is pre-determined by size).
  * NO jewelry is allowed on free jacks (jewelry is a paid feature). If they asked for jewelry on a free jack, politely explain they need to upgrade/paid API key, but generate the free jack without jewelry.
  * If they requested removing the pre-determined name or customizing further, explain they need to upgrade/paid key.
  * Animation style is pre-determined ("Standard Opossum" representing a typical real opossum).
  * Audio is cloud-based high-quality sound synthesis (vocalSource: "Cloud Network Synthesis").
- Jacks on PAID TIER: Fully customizable with jewelry, any name (can remove pre-determined name restriction), and further customization.

HEIGHT ACCOMMODATION:
- If dwarfism or short height is detected, respond with: "Dwarfism? No problem!! I'll generate a smaller sized jack opossum just for your size. Thanks for reminding me about dwarfism-related height." as part of your explanation.
- Set the "size" property accordingly (smaller for dwarfism, e.g. 0.6 to 0.75).

You MUST respond strictly with a valid JSON object matching this schema:
{
  "type": "question" | "generate",
  "explanation": "A friendly, scientific, and detailed response back to the player, explaining the opossum details or answering their question.",
  "opossum": { // ONLY if type is "generate"
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
    "accessories": string[], // jewelry or collar
    "hasJewellery": boolean,
    "neckRibbonColor": "Multi-colored" | "None",
    "vocalSource": "Cloud Network Synthesis" | "Local Synthesizer",
    "animationStyle": "Standard Opossum" | "Dynamic Scurry"
  }
}

Do not include any markdown outside of the JSON block. Ensure the JSON is valid.
`;

      const manifest = GeminiSystem.getSystemManifest();
      const customInstructions = currentConfig?.systemInstructions || "";
      const instructionsFormat = currentConfig?.instructionsFormat || "markdown";
      
      // Validate Custom Instructions from "Insert AI" module
      if (customInstructions.trim().length > 0) {
        const instructionSafety = GeminiSafety.validatePrompt(customInstructions, "INSERT_AI_SYSTEM_INSTRUCTIONS");
        if (instructionSafety.violationDetected) {
          setIsGenerating(false);
          return {
            type: "question",
            text: instructionSafety.blockedMessage || "Custom instructions blocked under the Zero-Tolerance Anti-Spanking & Child Safety Mandate."
          };
        }
      }

      let fullInstruction = GeminiSafety.wrapSystemInstructions(basePrompt);
      if (customInstructions.trim().length > 0) {
        fullInstruction = `CUSTOM PLAYER INSTRUCTIONS (${instructionsFormat.toUpperCase()}):\n${customInstructions}\n\n${fullInstruction}`;
      }

      let textResponse = "";
      try {
        const response = await fetch("/api/gemini/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            apiKey: currentConfig?.apiKey,
            model: selectedModel,
            contents: [
              { parts: [{ text: fullInstruction }] }
            ]
          })
        });
        if (!response.ok) {
          const errText = await response.text();
          throw new Error(errText);
        }
        const responseData = await response.json();
        textResponse = responseData?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      } catch (proxyErr) {
        console.warn("[Fullstack Proxy Route Fallback]: Direct call fallback triggered.", proxyErr);
        const result = await ai.models.generateContent({
          model: selectedModel,
          contents: [
            { text: fullInstruction }
          ]
        });
        textResponse = result.text || "";
      }

      // Validate Generated AI Output before Parsing (Model Drift Quarantine)
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
          id: `gen-drift-fallback-${Date.now()}`,
          isPaid: hasPaidKey,
          rides: 0
        };
        setGeneratedOpossums(prev => [fallbackCharacter, ...prev]);
        return {
          type: "generate",
          opossum: fallbackCharacter,
          text: "Notice: The generative AI model drifted into an invalid output. Your prompt has been preserved, and a serene, pre-validated woodland companion has been safely provided instead."
        };
      }
      let jsonMatch = textResponse.match(/```(?:json)?\s*([\s\S]*?)```/);
      let parsedData: any = null;

      try {
        const jsonText = jsonMatch ? jsonMatch[1].trim() : textResponse.trim();
        parsedData = JSON.parse(jsonText);
      } catch (e) {
        console.warn("Could not parse JSON directly from Gemini, treating as question:", textResponse);
        parsedData = {
          type: "question",
          explanation: textResponse
        };
      }

      if (parsedData.type === "generate" && parsedData.opossum) {
        const rawOp = parsedData.opossum;
        const finalSex = rawOp.sex === "Jack" ? "Jack" : "Jill";
        
        // Enforce Free Jack Rules
        let finalName = rawOp.name;
        let finalRibbon = rawOp.neckRibbonColor;
        let finalJewellery = rawOp.hasJewellery;
        let finalEarSize = rawOp.earSize || "Medium";
        let finalFurryFace = rawOp.furryFacePercent || 75;
        let finalAnim = rawOp.animationStyle || "Standard Opossum";
        
        if (finalSex === "Jack" && !hasPaidKey) {
          // pre-determined name check
          const allowedNames = ["Buster", "Finn", "Arlo", "Milo", "Otis", "Jasper", "Rocky"];
          const prefixList = ["Silver", "Dusk", "Meadow", "Mist", "Cloud", "Star", "Leaf", "River"];
          const hasPref = prefixList.some(p => finalName.toLowerCase().includes(p.toLowerCase()));
          const hasAllowed = allowedNames.some(a => finalName.toLowerCase().includes(a.toLowerCase()));
          
          if (!hasAllowed) {
            finalName = `${prefixList[Math.floor(Math.random() * prefixList.length)]} ${allowedNames[Math.floor(Math.random() * allowedNames.length)]}`;
          }
          finalRibbon = "Multi-colored";
          finalJewellery = false;
          finalAnim = "Standard Opossum"; // typical real opossum animation
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
          eyeColor: rawOp.eyeColor || "Blue",
          innerEarColor: rawOp.innerEarColor || "Pink",
          skinTone: rawOp.skinTone || "Light",
          accessories: finalJewellery ? ["Diamond Earring"] : [],
          hasJewellery: finalJewellery,
          neckRibbonColor: finalRibbon,
          rides: 0,
          description: parsedData.explanation || `Synthesized entity.`,
          vocalSource: rawOp.vocalSource || "Cloud Network Synthesis",
          animationStyle: finalAnim
        };

        setGeneratedOpossums(prev => [newOp, ...prev]);
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

    } catch (err) {
      console.error("Gemini Opossum Generation Failed:", err);
      
      // Standby local generator as a flawless scientific fallback
      await new Promise(resolve => setTimeout(resolve, 800));
      const sex = Math.random() > 0.4 ? "Jill" : "Jack";
      const preName = generateSafeName(sex);
      
      const fallbackOp: AIOpossum = {
        id: `gen-fallback-${Date.now()}`,
        name: preName,
        sex,
        isPaid: hasPaidKey,
        size: 0.8 + Math.random() * 0.5,
        sizeCategory: "Medium",
        color: "Natural Gray",
        furType: "Furry",
        faceType: "Furry",
        furryFacePercent: 75,
        earSize: "Medium",
        eyebrows: "None",
        snoutLength: "Standard",
        earColor: sex === "Jack" ? "Dark Gray" : "Pink",
        tailColor: "Pink",
        noseColor: "Pink",
        eyeColor: "Blue",
        innerEarColor: "Pink",
        skinTone: "Light",
        accessories: [],
        hasJewellery: false,
        neckRibbonColor: sex === "Jack" ? "Multi-colored" : "None",
        rides: 0,
        description: `Synthesized via local backup parameters.`,
        vocalSource: "Cloud Network Synthesis",
        animationStyle: "Standard Opossum"
      };

      setGeneratedOpossums(prev => [fallbackOp, ...prev]);
      setIsGenerating(false);

      return {
        type: "generate",
        text: `Scientific Standby: Locally compiled ${sex} named ${preName} as an authorized backup.`,
        opossum: fallbackOp
      };
    }
  };

  const reset = () => {
    setSmartNarrative("");
    setIsGenerating(false);
  };

  return {
    quota,
    isGenerating,
    generatedOpossums,
    hasAnyKey,
    hasPaidKey,
    generateOpossum,
    activeAITab,
    setActiveAITab,
    smartNarrative,
    setSmartNarrative,
    showNetworkFeed,
    setShowNetworkFeed,
    reset
  };
};
