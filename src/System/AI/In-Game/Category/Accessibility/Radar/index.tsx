/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Opponent, AnimalItem } from "../../../../../../types";

export interface RadarScanTarget {
  type: "opponent" | "feral_pig";
  z: number;
  data: Opponent | AnimalItem;
  distance: number;
}

export class InGameRadarScanner {
  /**
   * Scans immediate surroundings along the course for the nearest opponent or animal entity.
   */
  public static scanImmediateSurroundings(
    playerZ: number,
    opponents: Opponent[],
    animals: AnimalItem[],
    formatDistance: (dist: number) => string
  ): { target: RadarScanTarget | null; reportText: string } {
    let nearestTarget: RadarScanTarget | null = null;
    let minDistance = Infinity;

    for (const opp of opponents) {
      const distance = opp.z - playerZ;
      if (distance > 0 && distance < minDistance) {
        minDistance = distance;
        nearestTarget = { type: "opponent", z: opp.z, data: opp, distance };
      }
    }

    for (const animal of animals) {
      if (animal.species === "feral_pig") {
        const distance = animal.z - playerZ;
        if (distance > 0 && distance < minDistance) {
          minDistance = distance;
          nearestTarget = { type: "feral_pig", z: animal.z, data: animal, distance };
        }
      }
    }

    if (!nearestTarget) {
      return {
        target: null,
        reportText: "No opponents detected in immediate vicinity."
      };
    }

    if (nearestTarget.type === "feral_pig") {
      const pig = nearestTarget.data as AnimalItem;
      const genderLabel = pig.gender || "Boar";
      const coat = pig.coatColor || "Dark Brown";
      const laneStr = pig.lane === -1 ? "left lane" : pig.lane === 1 ? "right lane" : "center lane";
      return {
        target: nearestTarget,
        reportText: `Scan reports: Nearest opponent is a ${genderLabel} Feral Pig with ${coat} coat in the ${laneStr}, ${formatDistance(minDistance)} ahead.`
      };
    }

    const castOpp = nearestTarget.data as Opponent;
    const direction = castOpp.lane === -1 ? "left lane" : castOpp.lane === 1 ? "right lane" : "center lane";
    const isWild = castOpp.isWildMoose || !castOpp.mooseName || castOpp.mooseName.trim() === "";
    const hasRider = !!(castOpp.monkeyName && castOpp.monkeyName.trim() !== "");

    if (isWild || !hasRider) {
      return {
        target: nearestTarget,
        reportText: `Scan reports: Nearest opponent is a wild ${castOpp.mooseType} Moose in the ${direction}, ${formatDistance(minDistance)} ahead.`
      };
    }

    const riderGender = (castOpp.monkeyGender || (castOpp.mooseType === "Bull" ? "Female" : "Male")).toLowerCase();
    return {
      target: nearestTarget,
      reportText: `Scan reports: Nearest opponent is ${riderGender} monkey ${castOpp.monkeyName} riding ${castOpp.mooseType} Moose ${castOpp.mooseName} in the ${direction}, ${formatDistance(minDistance)} ahead.`
    };
  }
}

export const InGameRadar = InGameRadarScanner;
export default InGameRadar;
