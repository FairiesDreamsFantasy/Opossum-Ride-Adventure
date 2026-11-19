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
  unlockedWorlds?: number[];
  unlockedWorldLevels?: Record<number, number[]>;
  worldHighScores?: Record<string, number>;
}

const DEFAULT_SAVE: GameSaveState = {
  unlockedLevels: [0, 1], // levels 0 and 1 are unlocked by default
  totalTicksEaten: 0,
  highScores: { 0: 0, 1: 0 },
  unlockedWorlds: [1],
  unlockedWorldLevels: { 1: [0, 1] },
  worldHighScores: { "1:0": 0, "1:1": 0 }
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
        highScores: { ...(localData?.highScores || {}), ...(idbData.highScores || {}) },
        unlockedWorlds: Array.from(new Set([...(localData?.unlockedWorlds || [1]), ...(idbData.unlockedWorlds || [1])])),
        unlockedWorldLevels: { ...(localData?.unlockedWorldLevels || {}), ...(idbData.unlockedWorldLevels || {}) },
        worldHighScores: { ...(localData?.worldHighScores || {}), ...(idbData.worldHighScores || {}) }
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
 * Register a level completed and update save state across worlds cleanly
 */
export async function completeLevelSave(
  levelId: number,
  ticksEaten: number,
  worldId: number = 1
): Promise<GameSaveState> {
  const current = await loadGameSave();

  const nextWorldId = worldId === 1 && levelId >= 40 ? 2 : worldId;
  const nextLevelId = worldId === 1 && levelId >= 40 ? 0 : levelId + 1;

  const unlocked = [...current.unlockedLevels];
  if (worldId === 1 && !unlocked.includes(nextLevelId) && nextWorldId === 1) {
    unlocked.push(nextLevelId);
  }

  const unlockedWorlds = Array.from(new Set([...(current.unlockedWorlds || [1]), worldId, nextWorldId]));
  const unlockedWorldLevels = { ...(current.unlockedWorldLevels || { 1: [...unlocked] }) };
  const worldList = unlockedWorldLevels[nextWorldId] ? [...unlockedWorldLevels[nextWorldId]] : [];
  if (!worldList.includes(nextLevelId)) {
    worldList.push(nextLevelId);
  }
  unlockedWorldLevels[nextWorldId] = worldList;

  // Update high score
  const scores = { ...current.highScores };
  if (worldId === 1) {
    const prevBest = scores[levelId] || 0;
    scores[levelId] = Math.max(prevBest, ticksEaten);
  }

  const worldHighScores = { ...(current.worldHighScores || {}) };
  const scoreKey = `${worldId}:${levelId}`;
  worldHighScores[scoreKey] = Math.max(worldHighScores[scoreKey] || 0, ticksEaten);

  const updated: GameSaveState = {
    unlockedLevels: unlocked,
    totalTicksEaten: current.totalTicksEaten + ticksEaten,
    highScores: scores,
    unlockedWorlds,
    unlockedWorldLevels,
    worldHighScores
  };

  saveGameSaveSync(updated);
  return updated;
}
