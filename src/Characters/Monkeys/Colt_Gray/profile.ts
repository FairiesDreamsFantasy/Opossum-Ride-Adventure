/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MonkeyCharacter {
  name: string;
  troop?: string;
  race: string;
  furColor: string;
  attire: string;
  religion: string;
  height: string;
  weight: string;
  criminalHistory: string[];
  status: string;
  description: string;
}

export const COLT_MONKEY: MonkeyCharacter = {
  name: "Colt Gray",
  troop: "Gray",
  race: "White",
  furColor: "Brown",
  attire: "Brown shirt, khaki pants, and typical prison shoes with no laces",
  religion: "Christianity/Catholic",
  height: "4 feet 8 inches",
  weight: "140 lbs",
  status: "On The Run",
  criminalHistory: [
    "Bank robbery",
    "Bullying at school",
    "Assault with a weapon (assaulting a family member with a leather belt) over snacks or materials",
    "Illegal babysitting without proper licensing and permits",
    "Cruelty to animals (accused of spanking a family dog with a broom handle)",
    "Christian Terrorism",
    "Use of weapons of mass destruction",
    "Murder",
    "Arson",
    "Battery of children",
    "Conspiracy to assault",
    "Making threats",
    "Gang-related crimes",
    "Truck bombing"
  ],
  description: "Colt is a known troublemaker who was recently arrested for causing a school shooting that caused the entire school to shut down. He was charged as an adult, and he was end up in jail. Well, he was in/out of jail during his earlier times for bullying someone at school, causing his parents to be held responsible for cruelty to children. Unfortunately, he became a fugitive when he escaped from prison, after he was convicted as an adult for serious gun crimes."
};
