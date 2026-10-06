# Gemini Live Subsystem - Directory Protection Mandate

**Module / Path**: `src/System/AI/External/Gemini/Live`  
**Security Standard**: 1,000,000,000,000% Ultra-Broad Protection Standard

---

## 🛡️ Directory Integrity Rules

1. **Push-To-Talk (PTT) Supremacy**: The "Shift-C" keyboard command is the sacred PTT trigger. It must strictly initiate microphone capture and Live API transmission while held, and cease immediately upon release.
2. **Player Sovereignty & Consent**: Gemini Live is strictly Opt-In. It must default to "OFF" in preferences. Microphone access must only be requested when the feature is enabled and PTT is first triggered.
3. **Session Privacy**: Transcripts and audio streams are transient and bound to the active session. Never record or persist audio buffers to local storage.
4. **Zero Latency Ambition**: Uses the `gemini-3.8-live` model for real-time acoustic feedback. 
5. **UI Clarity**: Provide visual feedback when PTT is active (e.g., a "Recording" or "Gemini Listening" indicator) to ensure the player knows their mic state.
6. **Automatic Cleanup**: Always disconnect WebSocket sessions and release microphone media streams when the component unmounts or the feature is disabled.
7. **Accessibility Harmony**: When Gemini Live is speaking, background game narratives should be ducked or paused to prevent acoustic clutter.
