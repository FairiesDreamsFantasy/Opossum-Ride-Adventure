import { RHYTHM_PROFILES } from "../../../../System/Sound";
import { speakAnimalNarrative, canSpeakAnimalNarrative } from "../../../../System/Sound/TTS";

export const MooseGeneral = {
  version: "1.0.0",
  type: "Scientific Moose General Component",
  updateMovement: (opp: any, delta: number, stateRef: any, currentLevel: any, selectedOpossumId: string) => {
    // Initialize local offsets
    if (opp.mooseLocalY === undefined) opp.mooseLocalY = 0;
    if (opp.mooseTimer === undefined) opp.mooseTimer = 0;
    opp.mooseTimer += delta;

    // Local "Breathing" / Idle oscillation
    if (opp.speed === 0) {
      opp.mooseLocalY = Math.sin(opp.mooseTimer * RHYTHM_PROFILES.moose.idle) * 2; // subtle bob
    } else {
      opp.mooseLocalY = Math.sin(opp.mooseTimer * RHYTHM_PROFILES.moose.strideFreq) * (opp.speed * 0.1); // stride bob
    }

    if (opp.isAngelica) {
      if (opp.isCleaning) {
        opp.speed = 0;
        opp.lane = 1;
      } else if (opp.isRiddenByMonkey) {
        const isCityCircus = currentLevel.placeId === "city" && selectedOpossumId !== "amara_qin";
        if (isCityCircus) {
          const targetZ = stateRef.current.playerZ + 60;
          if (opp.z < targetZ) opp.z += 10 * delta;
          else if (opp.z > targetZ + 10) opp.z -= 10 * delta;
          opp.speed = Math.abs(stateRef.current.speed);
        } else {
          opp.z += (opp.speed * 0.2) * delta;
        }
      } else {
        opp.z += (opp.speed * 0.2) * delta;
      }
    } else if (opp.isCharging) {
      opp.z -= opp.speed * delta;
    } else {
      opp.z += (opp.speed * 0.2) * delta;
    }
  },
  updateCollisions: (opp: any, localObstacles: any[], oppDistance: number, soundSystemRef: any, speakWords: any) => {
    localObstacles.forEach((obs) => {
      const obsDist = Math.abs(opp.z - obs.z);
      if (obsDist < 3.0 && opp.lane === obs.lane && obs.z > -100) {
        const isWild = opp.isWildMoose || !opp.mooseName || opp.mooseName.trim() === "";
        const subject = isWild ? `A wild ${opp.mooseType} Moose` : `The ${opp.mooseType} Moose ${opp.mooseName}`;

        if (obs.type === "garden_plant") {
          obs.z = -9999;
          soundSystemRef.current.playGardenPlantCollision();
          if (oppDistance < 80) {
            speakAnimalNarrative(`${subject} stomped a garden plant.`);
          }
        } else {
          const obsLabel = (obs.type || "obstacle").replace(/_/g, " ");
          const actionRoll = Math.random();
          
          if (actionRoll < 0.25) {
            const oldLane = opp.lane;
            const possibleLanes = [-1, 0, 1].filter(l => l !== oldLane);
            opp.lane = possibleLanes[Math.floor(Math.random() * possibleLanes.length)];
            if (oppDistance < 80) {
              speakAnimalNarrative(`${subject} swerved lanes avoiding a ${obsLabel}.`);
            }
          } else if (actionRoll < 0.50 && (obs.type === "rock" || obs.type === "triangular_stone_fence")) {
            if (oppDistance < 80) {
              speakAnimalNarrative(`${subject} leaped over ${obsLabel}.`);
            }
            opp.z += (opp.isCharging ? -4.0 : 4.0);
          } else if (actionRoll < 0.75) {
            opp.speed = 0;
            opp.isCharging = false;
            
            if (obs.type === "fence") {
              soundSystemRef.current.playFenceCollision();
            } else if (obs.type === "rock") {
              soundSystemRef.current.playRockCollision();
            } else if (obs.type === "triangular_stone_fence") {
              soundSystemRef.current.playTriangularStoneFenceCollision();
            } else {
              soundSystemRef.current.playImpactCrash();
            }

            const hasMonkey = !!(opp.monkeyName && opp.monkeyName.trim() !== "");
            if (hasMonkey) {
              const monkeyHangsOn = Math.random() > 0.5;
              const monkeyStr = `${opp.monkeyName}`;
              
              if (monkeyHangsOn) {
                if (oppDistance < 80) {
                  speakAnimalNarrative(`${subject} hit ${obsLabel}; monkey ${monkeyStr} hung on.`);
                }
              } else {
                opp.monkeyBehavior = "tossed";
                if (oppDistance < 80) {
                  speakAnimalNarrative(`${subject} hit ${obsLabel}; monkey tossed off.`);
                }
              }
            } else {
              if (oppDistance < 80) {
                speakAnimalNarrative(`${subject} hit ${obsLabel} and halted.`);
              }
            }
            
            if (obs.type === "fence") {
              obs.z = -9999;
            } else {
              opp.lane = opp.lane === 1 ? 0 : 1;
            }
          } else {
            if (obs.type === "fence") {
              obs.z = -9999;
              soundSystemRef.current.playFenceCollision();
              if (oppDistance < 80) {
                speakAnimalNarrative(`${subject} charged through wooden fence.`);
              }
            } else if (obs.type === "triangular_stone_fence") {
              opp.isCharging = false;
              opp.speed = 0;
              soundSystemRef.current.playTriangularStoneFenceCollision();
              if (oppDistance < 80) {
                speakAnimalNarrative(`${subject} struck triangular stone fence and stopped.`);
              }
            } else {
              opp.isCharging = false;
              opp.speed = 0;
              soundSystemRef.current.playRockCollision();
              if (oppDistance < 80) {
                speakAnimalNarrative(`${subject} charged rock and stopped.`);
              }
            }
          }
        }
      }
    });
  }
};
