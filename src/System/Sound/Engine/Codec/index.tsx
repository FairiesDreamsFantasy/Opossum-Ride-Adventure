/**
 * Opossum Ride Adventure - Sound Engine Codec Master Dispatcher
 * License: Apache-2.0 / Proprietary Artistry
 */

import { SoundEngineCodecGeneral, OPEN_SOURCE_AUDIO_CODECS } from "./General";
import { FLACDecoder } from "./FLAC";
import { WAVDecoder } from "./WAV";
import { OpusDecoder } from "./Opus";
import { VorbisDecoder } from "./Vorbis";
import { MP3Decoder } from "./MP3";
import { AIFFDecoder } from "./AIFF";
import { M4ADecoder } from "./M4A";
import { AACDecoder } from "./AAC";

export class SoundEngineCodecDispatcher {
  public getRegistry() {
    return SoundEngineCodecGeneral;
  }

  public getCodecs() {
    return OPEN_SOURCE_AUDIO_CODECS;
  }

  public getDecoder(codecId: "flac" | "wav" | "opus" | "vorbis" | "mp3" | "aiff" | "m4a" | "aac") {
    switch (codecId) {
      case "flac":
        return FLACDecoder;
      case "wav":
        return WAVDecoder;
      case "opus":
        return OpusDecoder;
      case "vorbis":
        return VorbisDecoder;
      case "mp3":
        return MP3Decoder;
      case "aiff":
        return AIFFDecoder;
      case "m4a":
        return M4ADecoder;
      case "aac":
        return AACDecoder;
      default:
        return WAVDecoder;
    }
  }

  public async decodeAudio(ctx: AudioContext, buffer: ArrayBuffer, codecHint?: "flac" | "wav" | "opus" | "vorbis" | "mp3" | "aiff" | "m4a" | "aac"): Promise<AudioBuffer> {
    if (codecHint) {
      const decoder = this.getDecoder(codecHint);
      return await decoder.decodeAudioBuffer(ctx, buffer);
    }

    if (FLACDecoder.validateHeader(buffer)) {
      return await FLACDecoder.decodeAudioBuffer(ctx, buffer);
    }
    if (WAVDecoder.validateHeader(buffer)) {
      return await WAVDecoder.decodeAudioBuffer(ctx, buffer);
    }
    if (MP3Decoder.validateHeader(buffer)) {
      return await MP3Decoder.decodeAudioBuffer(ctx, buffer);
    }
    if (AIFFDecoder.validateHeader(buffer)) {
      return await AIFFDecoder.decodeAudioBuffer(ctx, buffer);
    }
    if (M4ADecoder.validateHeader(buffer)) {
      return await M4ADecoder.decodeAudioBuffer(ctx, buffer);
    }
    if (AACDecoder.validateHeader(buffer)) {
      return await AACDecoder.decodeAudioBuffer(ctx, buffer);
    }
    if (OpusDecoder.validateHeader(buffer)) {
      return await OpusDecoder.decodeAudioBuffer(ctx, buffer);
    }
    if (VorbisDecoder.validateHeader(buffer)) {
      return await VorbisDecoder.decodeAudioBuffer(ctx, buffer);
    }

    // Fallback to Web Audio native decoder
    return await ctx.decodeAudioData(buffer.slice(0));
  }
}

export const SoundEngineCodec = new SoundEngineCodecDispatcher();
