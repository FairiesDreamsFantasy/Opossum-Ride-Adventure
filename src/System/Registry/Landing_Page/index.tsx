/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Landing Page Registry
 * Centralizes metadata, navigation, and content for the Opossum Ride Adventure entry point.
 */
export const LandingPageRegistry = {
  id: "landing_page",
  metadata: {
    title: "Opossum Ride Adventure",
    subtitle: "Ride of a Lifetime",
    description: "Wonder if you can go on an adventure by riding an opossum? You just came to the right place!",
    extendedDescription: "Ride an opossum along these paths, and go on an adventure to go through these worlds what you've never encountered before. Jump over obstacles, gobble up ticks, and even take obstacle courses as you fulljoy an opossum ride.",
    monkeyMooseNotice: "A monkey is riding an unpredictable moose that is malicious and it can charge when ANY of these opossums chatter at these hot spots. Well, this monkey has a troop with other monkeys riding moose. Female monkeys ride bull moose, male monkeys ride cow moose.",
    viewOptionsNotice: "There are opossums to choose, and POV and rider views are available."
  },
  navigation: {
    links: [
      { label: "<Back to Fairies Dreams & Fantasy Arcade", url: "https://arcade.fairiesdreamsfantasy.com" },
      { label: "Go To fairiesdreamsfantasy.com", url: "https://fairiesdreamsfantasy.com", border: true },
      { label: "The Fairies Dreams & Fantasy Arcade Blog", url: "https://arcade.fairiesdreamsfantasy.com/Blog", border: true },
      { label: "Browse", url: "https://arcade.fairiesdreamsfantasy.com/Browse", border: true }
    ],
    search: {
      action: "https://arcade.fairiesdreamsfantasy.com/Search_Results",
      placeholder: "Search fairiesdreamsfantasy.com..."
    }
  },
  footer: {
    usefulLinks: [
      { label: "About", url: "https://arcade.fairiesdreamsfantasy.com/About" },
      { label: "Fairies Dreams & Fantasy Support", url: "https://support.fairiesdreamsfantasy.com/arcade" },
      { label: "Disclosure", url: "https://arcade.fairiesdreamsfantasy.com/Disclosure" },
      { label: "Privacy Policy", url: "https://arcade.fairiesdreamsfantasy.com/Privacy_Policy" }
    ],
    copyright: "Opossum Ride Adventure © GPL V3 • CC BY-SA 4.0",
    craftsmanship: "100% Babylon-Free Pure Craftsmanship"
  },
  archiveRegistry: {
    header: "• OFFICIAL ARCHIVE REGISTRY •",
    title: "Opossum Ride Adventure Source Code Archive",
    description: "Download the complete source code ZIP archive of Opossum Ride Adventure, featuring all system building blocks, custom audio synthesis engines, and multi-page folder structures."
  }
};
