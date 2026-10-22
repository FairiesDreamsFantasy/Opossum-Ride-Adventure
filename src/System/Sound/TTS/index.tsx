/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { playTickSound } from "../SFX/Category/Movement/Play_Tick";
import { playJumpSound } from "../SFX/Category/Movement/Play_Jump";
import { playCrashSound } from "../SFX/Category/Movement/Collision/General";
import { playChatterSound } from "../SFX/Category/Opossum/Elegant/Play_Chatter";
import { WiiControllerManager } from "../../Keyboards_and_Controllers/Controller/Wii";

/**
 * Scientific Text-To-Speech (TTS) and Procedural Audio Subsystem.
 * Standardizes beautiful, resource-conserving, offline-friendly sound announcements.
 */

let speechEnabled = true;

/**
 * Shared AudioContext singleton across the application to prevent audio port / context leaks that crash screen-readers.
 */
let globalAudioContext: AudioContext | null = null;

export function getSharedAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!globalAudioContext) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      globalAudioContext = new AudioContextClass();
    }
  }
  if (globalAudioContext && globalAudioContext.state === "suspended") {
    globalAudioContext.resume().catch(() => {});
  }
  return globalAudioContext;
}

/**
 * Trigger text-to-speech announcement safely using Web Speech API
 */
const recentUtterances: Record<string, number> = {};
let lastSpokenTime = 0;

// Track the last time a hardware cancel interrupt was triggered to prevent VRAM/CPU spikes
let lastCancelTime = 0;

// Track dynamic animal/opponent narrative speech events with an 8 to 10-second cooldown
let lastAnimalNarrativeTime = 0;
const ANIMAL_NARRATIVE_COOLDOWN_MS = 9000; // 9.0 seconds cooldown (within the 8-10 second window)

/**
 * Checks if animal/opponent narrative TTS is currently allowed by the 8-10 second cooldown timer.
 */
export function canSpeakAnimalNarrative(): boolean {
  return Date.now() - lastAnimalNarrativeTime >= ANIMAL_NARRATIVE_COOLDOWN_MS;
}

/**
 * Marks that an animal/opponent narrative announcement has been spoken to reset the 8-10 second timer.
 */
export function recordAnimalNarrativeSpoken(): void {
  lastAnimalNarrativeTime = Date.now();
}

/**
 * Speaks an animal or opponent narrative safely with an 8 to 10-second cooldown gate.
 * Returns true if spoken, false if blocked by cooldown.
 */
export function speakAnimalNarrative(words: string, interrupt = false): boolean {
  if (!canSpeakAnimalNarrative()) {
    return false;
  }
  recordAnimalNarrativeSpoken();
  speakWords(words, interrupt);
  return true;
}

export function speakWords(words: string, interrupt = true) {
  if (!speechEnabled) return;
  if (typeof window === "undefined" || !window.speechSynthesis) {
    console.warn("Speech synthesis not supported in this client environment.", words);
    return;
  }

  const now = Date.now();

  // Safeguard: Periodically prune the recent utterances cache to prevent memory leaks
  if (Object.keys(recentUtterances).length > 200) {
    for (const key of Object.keys(recentUtterances)) {
      if (now - recentUtterances[key] > 10000) {
        delete recentUtterances[key];
      }
    }
  }

  // Safeguard 1: Ignore identical messages repeated within 3.0 seconds
  // (prevents collision feedback loops from crashing browser's audio threads)
  const lastTimeForText = recentUtterances[words] || 0;
  if (now - lastTimeForText < 3000) {
    return; 
  }

  // Safeguard 2: Enforce a master global voice spacing limit of 300ms 
  // (prevents speech overlaps, rapid cancels, or heavy sound thrashing which crash local screen readers)
  if (now - lastSpokenTime < 300) {
    return;
  }

  try {
    recentUtterances[words] = now;
    lastSpokenTime = now;

    // Safeguard 3: Only trigger heavy hardware cancel if actually speaking/pending
    // and throttle cancellations to at most once per 250ms to prevent CPU/driver locks.
    let didCancel = false;
    if (interrupt && (window.speechSynthesis.speaking || (window.speechSynthesis as any).pending)) {
      if (now - lastCancelTime > 250) {
        window.speechSynthesis.cancel();
        lastCancelTime = now;
        didCancel = true;
      } else {
        // Drop the speech request if we are thrashing too fast, protecting system hardware completely
        return;
      }
    }
    
    // Safeguard 4: The "speech-synthesis-cancel-gap" pattern (50ms gap).
    // Avoids immediate subsequent speak call which causes NVDA/JAWS/Chrome speech engines to freeze or crash.
    setTimeout(async () => {
      try {
        if (!speechEnabled) return;

        // Try Gemini Cloud TTS if enabled and configured
        const { GeminiSystem } = await import("../../AI/External/Gemini");
        const cloudAudio = await GeminiSystem.generateSpeech(words);

        if (cloudAudio) {
          const audio = new Audio(`data:audio/wav;base64,${cloudAudio}`);
          audio.play().catch(e => {
            console.error("Gemini Cloud TTS Playback failed, falling back to local:", e);
            // Fallback manually if playback fails
            const utterance = new SpeechSynthesisUtterance(words);
            utterance.rate = 1.1;
            utterance.pitch = 0.95;
            window.speechSynthesis.speak(utterance);
          });
          return;
        }

        // Fallback to standard Web Speech API
        const utterance = new SpeechSynthesisUtterance(words);
        // Use standard rate so speech is clear and distinct
        utterance.rate = 1.1;
        utterance.pitch = 0.95; // A nice natural pitch
        window.speechSynthesis.speak(utterance);
      } catch (innerErr) {
        console.error("Speech synthesis speak exception:", innerErr);
      }
    }, didCancel ? 50 : 0);

  } catch (err) {
    console.error("Speech synthesis failed gracefully:", err);
  }
}

interface ActiveTtsVoice {
  nodes: (OscillatorNode | GainNode)[];
  endTime: number;
}
let activeTtsVoices: ActiveTtsVoice[] = [];

function pruneTtsVoices(currentTime: number) {
  activeTtsVoices = activeTtsVoices.filter(v => {
    if (currentTime >= v.endTime) {
      v.nodes.forEach(node => {
        try { node.disconnect(); } catch (e) {}
      });
      return false;
    }
    return true;
  });
}

function enforceTtsVoiceLimit(currentTime: number) {
  pruneTtsVoices(currentTime);
  if (activeTtsVoices.length >= 32) {
    const oldest = activeTtsVoices.shift();
    if (oldest) {
      oldest.nodes.forEach(node => {
        try {
          if ('stop' in node) {
            node.stop();
          }
        } catch (e) {}
        try { node.disconnect(); } catch (e) {}
      });
    }
  }
}

let genericCrashSoundState = false;

export function setGenericCrashSoundEnabled(enabled: boolean) {
  genericCrashSoundState = enabled;
}

export function isGenericCrashSoundEnabled(): boolean {
  return genericCrashSoundState;
}

/**
 * Play procedural synthesized chime sound using Web Audio API (completely native, web-native fallback)
 */
export function playProceduralSound(type: "tick" | "chatter" | "jump" | "crash", isRetro = false) {
  const ctx = getSharedAudioContext();
  if (!ctx || ctx.state === "suspended") return;

  try {
    const now = ctx.currentTime;
    enforceTtsVoiceLimit(now);

    let result;
    if (type === "chatter") {
      result = playChatterSound(ctx, ctx.destination, isRetro);
    } else if (type === "tick") {
      result = playTickSound(ctx, ctx.destination);
    } else if (type === "jump") {
      result = playJumpSound(ctx, ctx.destination);
    } else if (type === "crash") {
      WiiControllerManager.triggerRumble(400);
      if (!genericCrashSoundState) return;
      result = playCrashSound(ctx, ctx.destination);
    }

    if (result) {
      activeTtsVoices.push({
        nodes: result.nodes,
        endTime: result.endTime
      });
    }
  } catch (err) {
    console.warn("Web Audio API not allowed yet, click required.", err);
  }
}

export function setSpeechEnabled(enabled: boolean) {
  speechEnabled = enabled;
}

export function isSpeechEnabled() {
  return speechEnabled;
}

export function stopSpeaking() {
  if (typeof window !== "undefined" && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}

if (typeof window !== "undefined") {
  window.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Control") {
      stopSpeaking();
    }
  });
}
