/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ExternalAIModal, ExternalAIModalProps } from "../../../../AI/External";
import { InsertAIGeminiGeneral } from "./General";

export interface InsertAIGeminiModalProps extends ExternalAIModalProps {}

export const InsertAIGeminiModal: React.FC<InsertAIGeminiModalProps> = (props) => {
  return <ExternalAIModal {...props} />;
};

export { InsertAIGeminiGeneral };
