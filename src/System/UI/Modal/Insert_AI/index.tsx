/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ExternalAIModal, ExternalAIModalProps } from "../../../AI/External";
import { InsertAIGeneral } from "./General";
import { InsertAIGeminiModal } from "./Gemini";

export interface InsertAIModalProps extends ExternalAIModalProps {}

export const InsertAIModal: React.FC<InsertAIModalProps> = (props) => {
  return <ExternalAIModal {...props} />;
};

export { InsertAIGeneral, InsertAIGeminiModal };
