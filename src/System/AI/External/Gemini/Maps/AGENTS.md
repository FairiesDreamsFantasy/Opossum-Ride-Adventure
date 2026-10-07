# System/AI/External/Gemini/Maps/ — Maps, Earth & Street View Subsystem

## Sovereign Rules & Architectural Directives

1. **Native HTML5 Canvas Rendering**:
   - The game canvas executes 100% of all visual rendering.
   - Prohibit iframes, mini-maps, or third-party web overlays that introduce visual clutter.

2. **Continuous Real-World Topography (`Earth/`)**:
   - Elevation profiles translate into continuous mathematical splines for track incline, downhill velocity, and natural jump ramps.
   - Grade percentages ($\Delta z / \Delta x$) directly determine physical friction and player inertia.

3. **Street View Panoramic Vectors (`Street_View/`)**:
   - 360° heading paths, lateral bounds, and canopy density guide level obstacles.
   - Ambush Feral Pigs spawn in high-density canopy blind spots; charging Moose spawn in open clearance paths.

4. **Zero-Input Automation**:
   - Level generation is 100% automated based on level progressions and biogeographical habitat coordinates.
   - No manual user prompts required during active gameplay.

5. **Single API Key Model**:
   - Uses the unified player-provided key configured in the "Insert AI" modal.
