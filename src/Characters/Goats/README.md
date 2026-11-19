# Caprine Cameo Roster (`src/Characters/Goats/`)

## Overview

This directory preserves Opossum Ride Adventure's native goat synthesizers (`General/` and `Generic/`) alongside **16 Core Caprine Cameos** and **Juvenile Goat Kids** (`Kids/`) adapted carefully from **Goat Ride Adventure** (`FairiesDreamsFantasy/Goat_Ride_Adventure`, `main` branch).

All 16 core goats and juvenile kids appear exclusively as **friendly, non-blocking social herd NPC cameos** on **The Goat Farm** (`placeId: "goat_farm"`, **World 1, Level 14**).

## Cameo & Behavioral Calibration

- **Strictly Off-Path**: Herds populate the left and right hillside pastures (`|totalX| >= 8.2 m`) outside the 3-lane gravel track, scaling wooden climbing ramps and grassy knolls without ever obstructing player lanes.
- **Social Herd & Pack Dynamics**: Adults and juvenile kids organize into social clusters, exchanging soft call-and-response bleats, trotting gently between herd mates, and dipping their heads to graze.
- **Soft Ambient-Safe Audio**: Procedural multi-harmonic FM vocal-cord bleats and dual-hoof clops are scaled gently (`~0.04–0.07` peak gain with distance attenuation) so they enrich pasture atmosphere without overpowering ambient wind or BGM.
- **100% Authentic Specifications**: Every core goat preserves its exact coat, horn color (including `Shadow` hornless and `Willow` budding horns), eye color, biometric dimensions (`length`, `height`, `chest`, `width`, `size`), `AUDIO_PARAMS`, and `GAIT_FREQUENCIES`.

## The 16 Core Caprine Cameos

| # | Name | Gender | Coat | Horns | Eyes | Length × Height | Size | Folder |
|:-:|:-----|:-------|:-----|:------|:-----|:----------------|:-----|:-------|
| 1 | **Snowy** | Female | White | Cream | Amber | 8.5 ft × 5.5 ft | Small | `Snowy/` |
| 2 | **Thunder** | Male | Grey | Black (Curved Ram) | Brown | 9.2 ft × 6.5 ft | Large | `Thunder/` |
| 3 | **Shadow** | Female | Charcoal | None | Black | 8.2 ft × 5.2 ft | Small | `Shadow/` |
| 4 | **Bella** | Female | Cream | Gold-tinted | Blue | 8.8 ft × 5.8 ft | Large | `Bella/` |
| 5 | **Goliath** | Male | Brown | Ivory | Green | 12 ft × 8.5 ft | Largest | `Goliath/` |
| 6 | **Freckles** | Female | Spotted | Tan | Hazel | 8.2 ft × 5.4 ft | Small | `Freckles/` |
| 7 | **Obsidian** | Male | Jet Black | Obsidian | Dark Red | 9.2 ft × 6.1 ft | Large | `Obsidian/` |
| 8 | **Ginger** | Female | Orange | White | Amber | 8.4 ft × 5.5 ft | Small | `Ginger/` |
| 9 | **Quicksilver** | Male | Silver | Silver | Blue | 8.9 ft × 5.9 ft | Large | `Quicksilver/` |
| 10 | **Patches** | Female | Tri-color | Cream | Brown | 8.3 ft × 5.4 ft | Small | `Patches/` |
| 11 | **Dusty** | Male | Tan | Grey | Hazel | 9.1 ft × 6.0 ft | Large | `Dusty/` |
| 12 | **Luna** | Female | Deep Purple | Pearly | Violet | 8.6 ft × 5.6 ft | Small | `Luna/` |
| 13 | **Aurum** | Male | Golden | Gold | Golden | 9.3 ft × 6.2 ft | Large | `Aurum/` |
| 14 | **Alpine** | Female | White/Grey | Curved Black | Ice Blue | 8.8 ft × 5.7 ft | Large | `Alpine/` |
| 15 | **Willow** | Female | Dappled Brown | Budding | Green | 8.1 ft × 5.3 ft | Small | `Willow/` |
| 16 | **Ruby** | Female | Reddish-Brown | Dark Brown | Amber | 8.8 ft × 5.8 ft | Large | `Ruby/` |

## Juvenile Goat Kids (`Kids/`)

A kid is a juvenile goat. Six caprine kids (`Pip`, `Clover`, `Pebble`, `Bramble`, `Sprout`, and `Sunny`) stay close to adult herd mates on The Goat Farm, hopping onto low pasture knolls, grazing beside does, and greeting passersby with high, soft kid bleats (`GenericKidSynthesizer` + kid harmonic profile).

## Attribution & Licensing

- **Original Caprine Characters**: Adapted as friendly NPC cameos from **Goat Ride Adventure** — Copyright (C) 2026 Fairies Dreams & Fantasy Arcade.
- **Engine Integration**: Licensed for Opossum Ride Adventure under Apache-2.0 / GPL-3.0 compatibility terms.
