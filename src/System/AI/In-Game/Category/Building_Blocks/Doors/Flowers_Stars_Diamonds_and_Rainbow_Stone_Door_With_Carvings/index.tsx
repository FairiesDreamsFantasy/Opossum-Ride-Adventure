/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Building Block AI: Flowers, Stars, Diamonds & Rainbow Carved Stone Sliding Doors
 */

export interface StoneDoorAIState {
  isOpen: boolean;
  openProgress: number;
  shouldPlayOpenSFX: boolean;
  shouldPlayCloseSFX: boolean;
  announceDoorState: boolean; // False by default for Temple Courtyard stone sliding doors
}

export class FlowersStarsDiamondsRainbowStoneDoorAI {
  public static readonly TRIGGER_DISTANCE_X = 70; // 70 ft east/west activation corridor around X = 4000
  public static readonly DOOR_X = 4000;
  public static readonly DOOR_Y_MIN = 1490;
  public static readonly DOOR_Y_MAX = 1510;
  public static readonly TRIGGER_Y_MARGIN = 25;

  public static evaluateProximity(
    playerX: number,
    playerY: number,
    currentlyOpen: boolean,
    currentProgress: number,
    delta: number
  ): StoneDoorAIState {
    const nearX = Math.abs(playerX - this.DOOR_X) <= this.TRIGGER_DISTANCE_X;
    const nearY =
      playerY >= this.DOOR_Y_MIN - this.TRIGGER_Y_MARGIN &&
      playerY <= this.DOOR_Y_MAX + this.TRIGGER_Y_MARGIN;

    const shouldBeOpen = nearX && nearY;
    const target = shouldBeOpen ? 1.0 : 0.0;
    const nextProgress = currentProgress + (target - currentProgress) * Math.min(1.0, delta * 4.5);

    return {
      isOpen: shouldBeOpen,
      openProgress: Math.max(0, Math.min(1, nextProgress)),
      shouldPlayOpenSFX: shouldBeOpen && !currentlyOpen,
      shouldPlayCloseSFX: !shouldBeOpen && currentlyOpen,
      announceDoorState: false
    };
  }
}

export default FlowersStarsDiamondsRainbowStoneDoorAI;
