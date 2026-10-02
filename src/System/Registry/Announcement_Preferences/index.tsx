/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Announcement Preferences Registry
 * Manages user preferences for speech synthesis announcements.
 */
export const AnnouncementPreferencesRegistry = {
  id: "announcement_preferences",
  defaults: {
    announceDoors: false,
    chatterNotifications: true,
    announceReverb: false,
    extendedInfo: false,
    announceSteering: false
  },
  metadata: {
    description: "Toggle specific voice announcements to prioritize game audio."
  }
};
