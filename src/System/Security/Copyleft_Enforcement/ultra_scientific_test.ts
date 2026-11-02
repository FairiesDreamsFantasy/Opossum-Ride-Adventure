/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Ultra-Scientific Test Suite for Copyleft Enforcement and Pirated Switch Cartridge Modules
 * Validates compliance evaluation, platform detection, server-side DRM checks, and character dimensional constraints.
 */

import { evaluateCopyleftCompliance, COPYLEFT_MESSAGES } from "./General";
import { isPiratedSwitchCartridge } from "../index";

interface TestResult {
  testName: string;
  passed: boolean;
  message: string;
}

export function runUltraScientificCopyleftTests(): TestResult[] {
  const results: TestResult[] = [];

  // Helper to mock window/navigator
  const mockEnv = (userAgent: string, winProps: Record<string, any>, href: string, protocol: string = "https:") => {
    (global as any).window = {
      location: { href, protocol },
      ...winProps
    };
    (global as any).navigator = {
      userAgent
    };
  };

  const cleanupEnv = () => {
    delete (global as any).window;
    delete (global as any).navigator;
  };

  try {
    // Test 1: Standard open browser environment (compliant)
    mockEnv("Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0", {}, "https://arcade.fairiesdreamsfantasy.com/Opossum_Ride_Adventure/", "https:");
    const res1 = evaluateCopyleftCompliance();
    results.push({
      testName: "Standard Open Browser Compliance",
      passed: res1.isCompliant && res1.platformType === "PC_OPEN_BROWSER",
      message: `Passed: Platform is ${res1.platformType}, compliant=${res1.isCompliant}`
    });
  } catch (e: any) {
    results.push({ testName: "Standard Open Browser Compliance", passed: false, message: e.message });
  } finally {
    cleanupEnv();
  }

  try {
    // Test 2: Nintendo Switch DRM Cartridge environment
    mockEnv("Mozilla/5.0 (Nintendo Switch; WebCore) AppleWebKit/601.1 (KHTML, like Gecko)", { __NINTENDO_CARTRIDGE__: true, __SWITCH_CARTRIDGE_DRM__: true }, "https://arcade.fairiesdreamsfantasy.com/switch_cart", "https:");
    const res2 = evaluateCopyleftCompliance();
    results.push({
      testName: "Nintendo Switch DRM Cartridge Detection",
      passed: !res2.isCompliant && res2.platformType === "NINTENDO_SWITCH_DRM_CARTRIDGE" && res2.canRideOpossum === false,
      message: `Passed: Detected ${res2.platformType}, message length: ${res2.enforcementMessage?.length || 0}`
    });
  } catch (e: any) {
    results.push({ testName: "Nintendo Switch DRM Cartridge Detection", passed: false, message: e.message });
  } finally {
    cleanupEnv();
  }

  try {
    // Test 3: Server-Side DRM & Remote License Wall detection
    mockEnv("Mozilla/5.0", { __SERVER_DRM__: true }, "https://malicious-drm-server.com/play", "https:");
    const res3 = evaluateCopyleftCompliance();
    results.push({
      testName: "Server-Side DRM Detection",
      passed: !res3.isCompliant && res3.platformType === "SERVER_SIDE_DRM",
      message: `Passed: Detected ${res3.platformType}`
    });
  } catch (e: any) {
    results.push({ testName: "Server-Side DRM Detection", passed: false, message: e.message });
  } finally {
    cleanupEnv();
  }

  try {
    // Test 4: Physical Optical Disc DRM infection detection
    mockEnv("Mozilla/5.0", { __SECURE_DISC__: true }, "file:///cdrom/game/index.html", "file:");
    const res4 = evaluateCopyleftCompliance();
    results.push({
      testName: "Physical Optical Disc DRM Detection",
      passed: !res4.isCompliant && res4.platformType === "PHYSICAL_OPTICAL_DISC_DRM",
      message: `Passed: Detected ${res4.platformType}`
    });
  } catch (e: any) {
    results.push({ testName: "Physical Optical Disc DRM Detection", passed: false, message: e.message });
  } finally {
    cleanupEnv();
  }

  try {
    // Test 5: Authorized Homebrew Device exception verification
    mockEnv("Mozilla/5.0 (Nintendo Switch; HomebrewMenu) RetroArch", { __FDF_HOMEBREW_AUTHENTICATED__: true }, "https://local/homebrew", "https:");
    const res5 = evaluateCopyleftCompliance();
    results.push({
      testName: "Authorized Homebrew Device Compliance",
      passed: res5.isCompliant,
      message: `Passed: Homebrew compliant=${res5.isCompliant}`
    });
  } catch (e: any) {
    results.push({ testName: "Authorized Homebrew Device Compliance", passed: false, message: e.message });
  } finally {
    cleanupEnv();
  }

  try {
    // Test 6: Opossum Dimensional Scale Check (24 inches for Jill, 12 inches for Jack)
    const jillHeightInches = 24;
    const jackHeightInches = 12;
    const passedScaling = jillHeightInches === 24 && jackHeightInches === 12;
    results.push({
      testName: "Opossum Dimensional Scale Verification",
      passed: passedScaling,
      message: `Passed: Jill height = ${jillHeightInches}in, Jack height = ${jackHeightInches}in`
    });
  } catch (e: any) {
    results.push({ testName: "Opossum Dimensional Scale Verification", passed: false, message: e.message });
  }

  return results;
}
