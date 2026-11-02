/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Position Information Registry
 * Manages metadata for coordinate and status announcements.
 */
export const PositionInformationRegistry = {
  id: "position_info_registry",
  version: "1.0.0",
  features: {
    coordinates: true,
    status_check: true,
    rider_info: true
  },
  announcement_templates: {
    foyer: "You are at position {x}, {y} of the floor foyer, facing {direction}.",
    course: "You are at {distance} of {place} via a course path, facing {direction}."
  }
};
