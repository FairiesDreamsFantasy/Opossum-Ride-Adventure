# In-Game AI Local Narration System

## Overview
This system provides high-fidelity, ultra-precise auditory narration for the **Opossum Ride Adventure**. Operating entirely offline to eliminate "Babylonian" cloud latency, the engine ensures that every rider receives consistent, scientifically accurate feedback regarding their environment, their spatial position, and the biometric/biographical profiles of their mounts.

## Architecture & Integrity
The system is modularized to reduce clutter and maintain strict data integrity. Each sub-engine is responsible for a specific domain of the user experience:

- **Scene Narration:** Describes arena environments, atmospheric resonance, and terrain substrates.
- **Position Narration:** Provides real-time spatial orientation, compass directions, and course progress.
- **Mount Narration:** Delivers 100% complete profiles of the crafted Opossum mounts, combining textbook-grade physical specifications with biographical lore.
- **Rider Narration:** Details the identity, heritage, and appearance of the rider.

## Protection Standards
In accordance with `PROTECTIONS_NOTICES.md`, this system strictly forbids:
1. **Information Omission:** Physical dimensions and character lore must always be presented in full.
2. **Pseudoscience:** All spatial and kinematic feedback must be based on the game's internal physics and registry data.
3. **Automated Degradation:** No "placebo" descriptions or empty stubs are permitted.

## Directory Structure
- `Scene/`: Arena and environment logic.
- `Position/`: Spatial and progress tracking.
- `Mount/`: Biometric and biographical mount profiles.
- `Rider/`: Rider character descriptions.
