# Scene Narration Sub-Engine

## Overview
This module is responsible for synthesizing auditory descriptions of the environment. It handles the transition between arenas, foyers, and special locations within the sanctuary.

## Functions
- `SceneNarrationEngine.compileDescription()`: Resolves current `placeId` and `levelName` to generate a description of the terrain substrate, atmospheric resonance, and level-specific lore.

## Scientific Rigor
Descriptions are grounded in the `PlaceResolver` and internal level metadata, ensuring that riders always have an accurate mental model of the physical environment.
