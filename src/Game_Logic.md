# Opossum Ride Adventure - Game Logic Registry (Version 0.0.8.9)

This document serves as the official centralized logic backup for **Opossum Ride Adventure**. It codifies the architectural, mathematical, and artistic rules of the game to ensure cross-platform portability and long-term preservation of crafted logic.

---

## 🏗️ 1. Core Architecture & Environment
- **Runtime Environment**: React 18+ with Vite (TypeScript).
- **Audio Core**: Offline Web Audio API Synthesizer (Zero external dependencies).
- **Persistence**: 100% Client-Side State with logic backups provided as Markdown.
- **Port Ingress**: Static Port 3000 mapping.

---

## 🎙️ 2. Crafted Opossum Vocalization Engine (64-bit DSP)
All crafted opossums use a high-fidelity, dual-harmonic frequency-sweep synthesis engine.

### ⚙️ Centralized Chatter Configuration (IEEE 754 64-bit precision)
| Opossum ID | Base Start Freq (Hz) | Base End Freq (Hz) | Pitch Offset Ratio |
| :--- | :--- | :--- | :--- |
| Melissa | 1300.00 | 450.00 | 0.000000000000 |
| Ashley | 1150.00 | 380.00 | 0.000000000000 |
| Amara Qin | 1400.00 | 500.00 | 0.000000000000 |
| Saffron Rose | 1300.00 | 450.00 | -0.020000000000 |
| Jalissa Chin | 1287.00 | 445.50 | 0.000000000000 |
| Arden-Rosie | 1069.50 | 353.40 | 0.000000000000 |
| Jahmella Rose | 1109.75 | 366.70 | 0.000000000000 |
| Dagmar Kone-Reynolds | 1138.50 | 376.20 | 0.000000000000 |
| Agape Rose | 1300.00 | 450.00 | -0.059200000000 |
| Roxanne Kone-Reynolds | 1300.00 | 450.00 | -0.068608000000 |
| Tiana Qin | 1400.00 | 500.00 | -0.030000000000 |

### 🔊 Synthesis Parameters
- **Chirp Count**: 6.
- **Spacing**: 0.080000000000s.
- **Duration**: 0.040000000000s.
- **Base Volume**: 0.200000000000.
- **Filter**: Bandpass Formant Shaping (Q: 1.200000000000).
- **Harmonic**: Golden Ratio Multiplier (1.618033988749) for non-retro mode.

---

## 🏗️ 3. Game State & Progression
- **Level Rotation**: The `placeId` rotates every single level (Level 1: garden, Level 2: zen_stone_garden, etc.) to ensure unique environmental and musical variety per level.
- **Game State Machine**: The game operates through distinct lifecycle phases:
- **Landing**: Initial entry screen.
- **Selection**: Opossum grid selection view.
- **Interstitial**: Advertisement / Preparation screen (Minimalist).
- **Playing**: Main interactive 3D/2.5D track logic.
- **Paused**: Suspension of physics and audio.
- **Game Over**: Summary and retry state.

---

## 📐 4. Physics & Coordinate Systems
- **World Tracking**: Z-axis based distance mapping in meters.
- **Lanes**: 3-lane structure (-1: Left, 0: Center, 1: Right).
- **Character Dimensions**: 
  - Width: Defined in inches per opossum.
  - Length: Defined in inches (e.g., 74 inches for 6'2").
  - Head Dimensions: Specific height/width for hitbox calculation.

---

## 🖼️ 5. UI & Accessibility Standards
- **Global Control**: **Control (Ctrl)** key cancels all active speech synthesis.
- **Screen Reader**:
  - No announcements on Opossum selection.
  - No announcements for Ads/Skip progress.
- **Interstitial Ad**: Clean layout containing Header, Advertisement container, and Skip Button (h-44px min).

---

## 🛡️ 6. Implementation Mandates
- **Science Only**: Mathematics, physics, and computer science foundations for all logic. Zero pseudoscience.
- **Integrity**: No unsolicited file deletions or stubbing of crafted modules.
- **Originality**: Character designs and sound architectures are intentional works of art.
