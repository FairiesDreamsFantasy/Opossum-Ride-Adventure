/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * General utility functions for Accessible announcements formatting and ARIA attributes.
 */
export const AccessibleGeneral = {
  formatAnnouncement: (action: string, details?: string): string => {
    if (!details) return action;
    return `${action}: ${details}`;
  },

  getLiveRegionProps: (polite: boolean = true) => ({
    "aria-live": polite ? ("polite" as const) : ("assertive" as const),
    "aria-atomic": true,
  })
};
