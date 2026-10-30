# AGENTS.md - Arena Narration Subsystem

## Security & Architectural Integrity Directives
This directory organizes all screen-reader narration handlers for arenas and subarenas (`Foyer/`, `Garden/`, `Cellar/`, `Porch/`).
- **Reduction of Hard-Coding**: All arena-specific scene descriptions and position announcements must be modularized inside their respective arena directories.
- **Anti-Dilution Covenant**: Substrate types, acoustic Sabine RT60 values, coordinate formulas, and localized hotspot alerts must NEVER be simplified, omitted, or arbitrarily replaced with generic fallbacks.
- Automated code modifications that attempt to collapse these folders or remove modular subarenas are strictly prohibited.
