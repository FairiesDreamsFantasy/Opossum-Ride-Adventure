/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MonkeyTroopInfo {
  id: string;
  name: string;
  classification: "Babylonian/Christian Troop Designation";
  description: string;
  assignedMembers: string[];
}

export const MONKEY_TROOPS: Record<string, MonkeyTroopInfo> = {
  Chandler: {
    id: "chandler",
    name: "Chandler Troop",
    classification: "Babylonian/Christian Troop Designation",
    description: "The Chandler Troop operates as an organized cohort within the monkey forces.",
    assignedMembers: []
  },
  Andrews: {
    id: "andrews",
    name: "Andrews Troop",
    classification: "Babylonian/Christian Troop Designation",
    description: "The Andrews Troop is home to Jared Andrews.",
    assignedMembers: ["Jared Andrews"]
  },
  Chapman: {
    id: "chapman",
    name: "Chapman Troop",
    classification: "Babylonian/Christian Troop Designation",
    description: "The Chapman Troop operates as an organized cohort within the monkey forces.",
    assignedMembers: []
  },
  Curtis: {
    id: "curtis",
    name: "Curtis Troop",
    classification: "Babylonian/Christian Troop Designation",
    description: "The Curtis Troop is home to the Evangelical faction command under Kendra Curtis.",
    assignedMembers: ["Kendra Curtis"]
  },
  Edgar: {
    id: "edgar",
    name: "Edgar Troop",
    classification: "Babylonian/Christian Troop Designation",
    description: "The Edgar Troop operates as an organized cohort within the monkey forces.",
    assignedMembers: []
  },
  Finch: {
    id: "finch",
    name: "Finch Troop",
    classification: "Babylonian/Christian Troop Designation",
    description: "The Finch Troop operates as an organized cohort within the monkey forces.",
    assignedMembers: []
  },
  Gerard: {
    id: "gerard",
    name: "Gerard Troop",
    classification: "Babylonian/Christian Troop Designation",
    description: "The Gerard Troop operates as an organized cohort within the monkey forces.",
    assignedMembers: []
  },
  Gilbert: {
    id: "gilbert",
    name: "Gilbert Troop",
    classification: "Babylonian/Christian Troop Designation",
    description: "The Gilbert Troop operates as an organized cohort within the monkey forces.",
    assignedMembers: []
  },
  Goring: {
    id: "goring",
    name: "Goring Troop",
    classification: "Babylonian/Christian Troop Designation",
    description: "The Goring Troop operates as an organized cohort within the monkey forces.",
    assignedMembers: []
  },
  Gray: {
    id: "gray",
    name: "Gray Troop",
    classification: "Babylonian/Christian Troop Designation",
    description: "The Gray Troop is home to Colt Gray.",
    assignedMembers: ["Colt Gray"]
  },
  Middleton: {
    id: "middleton",
    name: "Middleton Troop",
    classification: "Babylonian/Christian Troop Designation",
    description: "The Middleton Troop operates as an organized cohort within the monkey forces.",
    assignedMembers: []
  },
  Williams: {
    id: "williams",
    name: "Williams Troop",
    classification: "Babylonian/Christian Troop Designation",
    description: "The Williams Troop operates as an organized cohort within the monkey forces.",
    assignedMembers: []
  }
};
