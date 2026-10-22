/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const PaginationRegistryGeneral = {
  moduleId: "opossum_selection_pagination_general",
  pageSize: 16,
  gridGeometry: {
    columns: 8,
    rows: 2,
    maxPerScreen: 16,
    desktopMaxNumericButtons: 6
  },
  responsiveModes: {
    mobile: {
      columns: 2,
      style: "PREV_PAGE_NUM_NEXT_SPLIT"
    },
    desktop: {
      columns: 8,
      style: "PREV_NUMERIC_BUTTONS_NEXT"
    }
  },
  standard: "100,000,000,000% Ultra-Broad Protection Standard"
};
