import { RHYTHM_PROFILES } from "../../../System/Sound";

export const MonkeyGeneral = {
  version: "1.0.1",
  type: "Scientific Monkey General Component",
  updateMovement: (opp: any, delta: number) => {
    // Initialize local offsets if they don't exist
    if (opp.monkeyLocalY === undefined) opp.monkeyLocalY = 0;
    if (opp.monkeyTimer === undefined) opp.monkeyTimer = 0;
    
    opp.monkeyTimer += delta;

    // 1. Behavior: Jumping
    if (opp.monkeyBehavior === "jumping") {
      // Parabolic jump arc: y = -4h * (t/T) * (1 - t/T)
      const jumpDuration = RHYTHM_PROFILES.monkey.jump;
      const jumpTime = opp.monkeyTimer % jumpDuration;
      const jumpHeight = 30 + (Math.sin(opp.monkeyTimer * 2) * 5); // Add organic height variance
      opp.monkeyLocalY = -jumpHeight * 4 * (jumpTime / jumpDuration) * (1 - (jumpTime / jumpDuration));
      
      // Add a slight tilt/sway during jump
      opp.monkeyRotation = Math.sin(jumpTime * (Math.PI / jumpDuration)) * 0.2;
    } 
    // 2. Behavior: Climbing
    else if (opp.monkeyBehavior === "climbing") {
      // Oscillate Y to simulate climbing rhythm
      const climbFreq = RHYTHM_PROFILES.monkey.climb * 12.5;
      opp.monkeyLocalY = Math.sin(opp.monkeyTimer * climbFreq) * 10 - 20;
      
  // Add shoulder swaying while climbing
  opp.monkeySway = Math.cos(opp.monkeyTimer * (climbFreq * 0.5)) * 5;
  opp.monkeyArmSway = Math.sin(opp.monkeyTimer * climbFreq) * 15;
}
// 3. Behavior: Tossed (High arc)
else if (opp.monkeyBehavior === "tossed") {
  opp.monkeyFlightTime = (opp.monkeyFlightTime || 0) + delta;
  const flightDuration = 2.0;
  const t = opp.monkeyFlightTime;
  if (t < flightDuration) {
    const peakHeight = 150;
    opp.monkeyLocalY = -peakHeight * 4 * (t / flightDuration) * (1 - (t / flightDuration));
    // Spin while flying
    opp.monkeyRotation = (opp.monkeyRotation || 0) + delta * 15;
    opp.monkeyArmSway = 45; // Arms out while falling
  } else {
    opp.monkeyBehavior = "scattered";
    opp.monkeyLocalY = 0;
    opp.monkeyRotation = 0;
    opp.monkeyArmSway = 0;
  }
}
// 4. Behavior: Riding Normally (Add organic idle sway)
else {
  // Subtle rhythmic swaying to simulate breathing or balance adjustment
  const idleSwayFreq = 1.8;
  opp.monkeyLocalY = Math.sin(opp.monkeyTimer * idleSwayFreq) * 2;
  opp.monkeySway = Math.cos(opp.monkeyTimer * (idleSwayFreq * 0.7)) * 3;
  opp.monkeyArmSway = Math.sin(opp.monkeyTimer * (idleSwayFreq * 0.5)) * 10;
}
  }
};
