# Position Narration Sub-Engine

## Overview
This module provides real-time spatial awareness. It translates 3D coordinate data and progress metrics into natural language announcements.

## Functions
- `PositionNarrationEngine.compileAnnouncement()`: Combines distance metrics, level context, and compass orientation (Frenet-Serret derived headings) into a single coherent instruction for the rider.

## Mathematical Precision
Announcements are calculated based on the precise Z-depth along the path spline and the normalized segment direction.
