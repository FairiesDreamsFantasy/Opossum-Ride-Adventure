/**
 * Opossum Ride Adventure - Audacity Multi-Track Timeline Engine
 * License: Apache-2.0 / Proprietary Artistry
 */

import { AudacityTrack, AudacityTrackClip } from "../General";

export class AudacityTrackManager {
  private tracks: Map<string, AudacityTrack> = new Map();

  public createTrack(name: string): AudacityTrack {
    const trackId = `track_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const newTrack: AudacityTrack = {
      trackId,
      name,
      muted: false,
      solo: false,
      gain: 1.0,
      pan: 0.0,
      clips: []
    };
    this.tracks.set(trackId, newTrack);
    return newTrack;
  }

  public getTrack(trackId: string): AudacityTrack | undefined {
    return this.tracks.get(trackId);
  }

  public getAllTracks(): AudacityTrack[] {
    return Array.from(this.tracks.values());
  }

  public addClipToTrack(trackId: string, clip: AudacityTrackClip): boolean {
    const track = this.tracks.get(trackId);
    if (!track) return false;
    track.clips.push(clip);
    return true;
  }

  /**
   * Mixes down all active tracks into a single stereo target buffer.
   */
  public mixdown(ctx: AudioContext): AudioBuffer {
    const activeTracks = Array.from(this.tracks.values()).filter(t => !t.muted);
    const hasSolo = activeTracks.some(t => t.solo);
    const finalTracks = hasSolo ? activeTracks.filter(t => t.solo) : activeTracks;

    let maxDuration = 1.0;
    for (const track of finalTracks) {
      for (const clip of track.clips) {
        const end = clip.startTime + clip.duration;
        if (end > maxDuration) maxDuration = end;
      }
    }

    const sampleRate = ctx.sampleRate;
    const totalFrames = Math.ceil(maxDuration * sampleRate);
    const outputBuffer = ctx.createBuffer(2, Math.max(1024, totalFrames), sampleRate);
    const leftOut = outputBuffer.getChannelData(0);
    const rightOut = outputBuffer.getChannelData(1);

    for (const track of finalTracks) {
      const trackGain = track.gain;
      const trackPan = track.pan; // -1 to +1
      const leftPanGain = Math.cos((trackPan + 1) * Math.PI / 4);
      const rightPanGain = Math.sin((trackPan + 1) * Math.PI / 4);

      for (const clip of track.clips) {
        if (!clip.buffer) continue;

        const clipLeft = clip.buffer.getChannelData(0);
        const clipRight = clip.buffer.numberOfChannels > 1 ? clip.buffer.getChannelData(1) : clipLeft;

        const startFrame = Math.floor(clip.startTime * sampleRate);
        const clipFrames = Math.min(clipLeft.length, Math.floor(clip.duration * sampleRate));

        for (let i = 0; i < clipFrames; i++) {
          const outIndex = startFrame + i;
          if (outIndex >= totalFrames) break;

          const sampleL = clipLeft[i] * clip.gain * trackGain * leftPanGain;
          const sampleR = clipRight[i] * clip.gain * trackGain * rightPanGain;

          leftOut[outIndex] += sampleL;
          rightOut[outIndex] += sampleR;
        }
      }
    }

    return outputBuffer;
  }
}

export const AudacityTimeline = new AudacityTrackManager();
