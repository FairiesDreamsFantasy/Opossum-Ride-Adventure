/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useSyncExternalStore } from "react";

export interface MobileDeviceState {
  isMobileTouch: boolean;
  isPortrait: boolean;
  isMobilePortraitPhone: boolean;
  isTabletPortrait: boolean;
  isMobileLandscapePhone: boolean;
  screenWidth: number;
  screenHeight: number;
}

/**
 * Deterministic detection for mobile phones and tablets held in vertical portrait orientation.
 * Employs W3C Pointer/Hover Media Queries, Touchscreen API, and User-Agent standard tokens without fragile pixel-only thresholds.
 */
export function checkIsMobilePortraitPhone(): MobileDeviceState {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return {
      isMobileTouch: false,
      isPortrait: false,
      isMobilePortraitPhone: false,
      isTabletPortrait: false,
      isMobileLandscapePhone: false,
      screenWidth: 1024,
      screenHeight: 768
    };
  }

  // Visual Viewport & Client Dimensions
  const screenWidth =
    (window.visualViewport ? window.visualViewport.width : 0) ||
    window.innerWidth ||
    (document.documentElement ? document.documentElement.clientWidth : 0) ||
    (document.body ? document.body.clientWidth : 0) ||
    0;

  const screenHeight =
    (window.visualViewport ? window.visualViewport.height : 0) ||
    window.innerHeight ||
    (document.documentElement ? document.documentElement.clientHeight : 0) ||
    (document.body ? document.body.clientHeight : 0) ||
    0;

  // 1. Orientation calculation (matchMedia + aspect ratio)
  const portraitMediaQuery = window.matchMedia ? window.matchMedia("(orientation: portrait)").matches : false;
  const isPortrait = portraitMediaQuery || screenHeight >= screenWidth;

  // 2. W3C Pointer & Touch capability check
  const pointerCoarse = window.matchMedia ? window.matchMedia("(pointer: coarse)").matches : false;
  const hoverNone = window.matchMedia ? window.matchMedia("(hover: none)").matches : false;
  const hasTouchHardware =
    ("maxTouchPoints" in navigator && navigator.maxTouchPoints > 0) ||
    ("msMaxTouchPoints" in navigator && (navigator as unknown as { msMaxTouchPoints: number }).msMaxTouchPoints > 0) ||
    ("ontouchstart" in window);

  // 3. User Agent mobile inspection for genuine phone/tablet devices
  const userAgent = navigator.userAgent || navigator.vendor || (window as unknown as { opera?: string }).opera || "";
  const isTabletUA = /iPad|PlayBook|Silk|Tablet|SM-T|GT-P/i.test(userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isMobileUA = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(userAgent) && !isTabletUA;

  // Device qualifies as a touch device if it has touch hardware or reports coarse/none or mobile/tablet UA
  const isMobileTouch = (pointerCoarse || hoverNone || hasTouchHardware || isMobileUA || isTabletUA);

  // Phone Portrait: screenWidth <= 640 or (isMobileUA && !isTabletUA && screenWidth < 768)
  const isMobilePortraitPhone = isPortrait && !isTabletUA && ((isMobileUA && screenWidth < 768) || (isMobileTouch && screenWidth <= 640));

  // Tablet Portrait: Dedicated for tablets held vertically (641px <= screenWidth <= 1366px, or tablet UA / iPad)
  const isTabletPortrait = isPortrait && !isMobilePortraitPhone && (isTabletUA || (isMobileTouch && screenWidth >= 641 && screenWidth <= 1366));

  // Mobile Landscape Phone: Dedicated for mobile phones held horizontally (screenHeight <= 500, or isMobileUA + landscape)
  const isMobileLandscapePhone = !isPortrait && !isTabletUA && (isMobileUA || (isMobileTouch && screenHeight <= 500 && screenWidth <= 1024));

  return {
    isMobileTouch,
    isPortrait,
    isMobilePortraitPhone,
    isTabletPortrait,
    isMobileLandscapePhone,
    screenWidth,
    screenHeight
  };
}

let listeners: Array<() => void> = [];
let currentState: MobileDeviceState = typeof window !== "undefined" ? checkIsMobilePortraitPhone() : {
  isMobileTouch: false,
  isPortrait: false,
  isMobilePortraitPhone: false,
  isTabletPortrait: false,
  isMobileLandscapePhone: false,
  screenWidth: 1024,
  screenHeight: 768
};

function notify() {
  currentState = checkIsMobilePortraitPhone();
  for (const listener of listeners) {
    listener();
  }
}

if (typeof window !== "undefined") {
  window.addEventListener("resize", notify, { passive: true });
  window.addEventListener("orientationchange", notify, { passive: true });
  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", notify, { passive: true });
  }
  if (window.matchMedia) {
    try {
      const mqlPortrait = window.matchMedia("(orientation: portrait)");
      if (mqlPortrait.addEventListener) {
        mqlPortrait.addEventListener("change", notify);
      }
    } catch {
      // Ignored for older browser compatibility
    }
  }
}

function subscribe(callback: () => void) {
  listeners.push(callback);
  return () => {
    listeners = listeners.filter((l) => l !== callback);
  };
}

function getSnapshot() {
  return currentState;
}

function getServerSnapshot() {
  return currentState;
}

/**
 * Ultra-robust React hook using useSyncExternalStore to eliminate hydration lags and race conditions
 */
export function useMobilePortraitPhone(): MobileDeviceState {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
