/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Offline-ready, privacy-first clientside persistent state storage engine using LocalStorage and IndexedDB support.
const DB_NAME = "OpossumRideAdventureDB";
const STORE_NAME = "game_state";
const DB_VERSION = 1;

export interface GameSaveState {
  unlockedLevels: number[]; // e.g., [0, 1]
  totalTicksEaten: number;
  highScores: Record<number, number>; // levelId -> ticks count or score
}

const DEFAULT_SAVE: GameSaveState = {
  unlockedLevels: [0, 1], // levels 0 and 1 are unlocked by default
  totalTicksEaten: 0,
  highScores: { 0: 0, 1: 0 }
};

// --- IndexedDB helpers ---
function openIDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !window.indexedDB) {
      reject(new Error("IndexedDB not supported"));
      return;
    }
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (e: any) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = (e: any) => {
      resolve(e.target.result);
    };
    request.onerror = (e: any) => {
      reject(e.target.error);
    };
  });
}

async function getFromIDB(key: string): Promise<any> {
  const db = await openIDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(key);
    request.onsuccess = () => {
      resolve(request.result);
    };
    request.onerror = () => {
      reject(request.error);
    };
  });
}

async function saveToIDB(key: string, value: any): Promise<void> {
  const db = await openIDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put(value, key);
    request.onsuccess = () => {
      resolve();
    };
    request.onerror = () => {
      reject(request.error);
    };
  });
}

// --- High-level Persistent Storage API ---
export async function loadGameSave(): Promise<GameSaveState> {
  // 1. Try to load from LocalStorage first to have immediate synchronous fallback
  let localData: GameSaveState | null = null;
  try {
    if (typeof window !== "undefined") {
      const serialized = window.localStorage.getItem(DB_NAME);
      if (serialized) {
        localData = JSON.parse(serialized);
      }
    }
  } catch (err) {
    console.warn("localStorage loading failed:", err);
  }

  // 2. Try to load and sync with IndexedDB
  try {
    const idbData = await getFromIDB("save_slot");
    if (idbData) {
      // Merge best values
      const merged: GameSaveState = {
        unlockedLevels: Array.from(new Set([...(localData?.unlockedLevels || []), ...idbData.unlockedLevels])),
        totalTicksEaten: Math.max(localData?.totalTicksEaten || 0, idbData.totalTicksEaten || 0),
        highScores: { ...(localData?.highScores || {}), ...(idbData.highScores || {}) }
      };
      // Keep in sync
      saveGameSaveSync(merged);
      return merged;
    }
  } catch (err) {
    console.warn("IndexedDB loading failed, relying on localStorage:", err);
  }

  return localData || DEFAULT_SAVE;
}

// Synchronous save to LocalStorage, triggers safe background IndexedDB save
export function saveGameSaveSync(state: GameSaveState): void {
  try {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(DB_NAME, JSON.stringify(state));
    }
  } catch (err) {
    console.error("Failed saving to localStorage", err);
  }

  // Background save to IndexedDB
  saveToIDB("save_slot", state).catch((err) => {
    console.warn("Failed background saving to IndexedDB:", err);
  });
}

/**
 * Register a level completed and update save state
 */
export async function completeLevelSave(levelId: number, ticksEaten: number): Promise<GameSaveState> {
  const current = await loadGameSave();
  
  // Unlock next level (up to 20)
  const nextLevelId = levelId + 1;
  const unlocked = [...current.unlockedLevels];
  if (!unlocked.includes(nextLevelId) && nextLevelId <= 20) {
    unlocked.push(nextLevelId);
  }

  // Update high score
  const scores = { ...current.highScores };
  const prevBest = scores[levelId] || 0;
  scores[levelId] = Math.max(prevBest, ticksEaten);

  const updated: GameSaveState = {
    unlockedLevels: unlocked,
    totalTicksEaten: current.totalTicksEaten + ticksEaten,
    highScores: scores
  };

  saveGameSaveSync(updated);
  return updated;
}
