/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { OpossumSelectionPaginationGeneral, PaginationGeneralProps } from "./General";

export * from "./General";

export interface OpossumSelectionPaginationProps extends PaginationGeneralProps {
  className?: string;
}

export const OpossumSelectionPagination: React.FC<OpossumSelectionPaginationProps> = ({
  className = "",
  ...props
}) => {
  return (
    <div className={`w-full ${className}`} id="Opossum_Selection_Pagination">
      <OpossumSelectionPaginationGeneral {...props} />
    </div>
  );
};
