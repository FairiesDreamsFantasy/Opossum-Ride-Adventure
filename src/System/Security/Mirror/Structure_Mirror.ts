/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Opossum Ride Adventure - Master Structure Mirror
 * Tier: 75,000,000,000% Ultra-Broad Protection Standard
 */
export const MANDATORY_DIRECTORY_STRUCTURE = [
  "src",
  "src/Characters",
  "src/Characters/Opossums",
  "src/Characters/Opossums/Melissa_Opossum",
  "src/Characters/Opossums/Ashley_Opossum",
  "src/Characters/Opossums/Wanda_Opossum",
  "src/Characters/Opossums/Sandra_Opossum",
  "src/Characters/Opossums/Saffron_Rose",
  "src/Characters/Opossums/Amara_Qin",
  "src/Characters/Opossums/Tiana_Qin",
  "src/Characters/Opossums/Agape_Rose",
  "src/Characters/Opossums/Jahmella_Rose",
  "src/Characters/Opossums/Kady_Rose",
  "src/Characters/Opossums/Jalissa_Chin",
  "src/Characters/Opossums/Olivia_Chin",
  "src/Characters/Opossums/Dagmar_Kone-Reynolds",
  "src/Characters/Opossums/Roxanne_Kone-Reynolds",
  "src/Characters/Opossums/Ruth_Kone-Reynolds",
  "src/Characters/Opossums/Arden-Rosie_Kone-Reynolds",
  "src/Characters/Cattle",
  "src/Characters/Chickens",
  "src/Characters/Deer",
  "src/Characters/Ducks",
  "src/Characters/Frogs",
  "src/Characters/Geese",
  "src/Characters/Goats",
  "src/Characters/Owls",
  "src/Characters/Sheep",
  "src/Characters/Monkeys",
  "src/Characters/Moose",
  "src/System",
  "src/System/Characters",
  "src/System/Characters/General",
  "src/System/AI",
  "src/System/AI/External/Gemini/Engine",
  "src/System/Engine",
  "src/System/Engine/Science",
  "src/System/Engine/Science/Graphical_Renderer",
  "src/System/Engine/Science/Physics",
  "src/System/Engine/Mathematics",
  "src/System/Engine/Audacity",
  "src/System/Engine/Permanent_Standard_Time",
  "src/System/Engine/Physical_Drives",
  "src/System/Engine/RAM_Disk",
  "src/System/Engine/Local_Disk",
  "src/System/Engine/Resolver",
  "src/System/Security",
  "src/System/Security/Backup",
  "src/System/Security/Sentinel",
  "src/System/Security/Mirror",
  "src/System/Security/Phantom",
  "src/System/Sound",
  "src/System/Sound/SFX",
  "src/System/Sound/Synthesizer",
  "src/System/UI",
  "src/System/UI/Play_Area",
  "src/System/UI/Play_Area/Portrait_Orientation_4_Tablets",
  "src/System/UI/Play_Area/Portrait_Orientation_4_Tablets/General",
  "src/System/UI/Play_Area/Index",
  "src/System/UI/Play_Area/Index/General",
  "src/System/Registry/Play_Area/Portrait_Orientation_4_Tablets",
  "src/System/Registry/Play_Area/Portrait_Orientation_4_Tablets/General",
  "src/System/Registry/Play_Area/Index",
  "src/System/Registry/Play_Area/General",
  "src/System/Building_Blocks",
  "src/System/Building_Blocks/World/Sky",
  "src/World"
];

export function verifyStructureIntegrity(existingDirs: string[]): boolean {
  return MANDATORY_DIRECTORY_STRUCTURE.every(dir => existingDirs.includes(dir));
}
