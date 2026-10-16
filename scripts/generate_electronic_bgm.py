#!/usr/bin/env python3
"""
Open Gaming Forensic Lab (OGFL) - Dynamic Electronic BGM Generator
==================================================================
Procedural Cyberpunk & Dark Synthwave Electronic Soundtrack Synthesis
Tailored for 24-38 English gamer demographic profile:
- 118 BPM driving tempo
- Sub-bass 808/909 kick with pitch decay and click transient
- Layered snappy snare with shaped noise burst
- Dynamic 16th-note closed & open hi-hat groove
- Rolling distorted sawtooth bassline in D Minor (D1, F1, G1, A1, C2)
- 16th-note cyberpunk arpeggiated synths with stereo ping-pong delay
- Lush sweeping atmospheric pad chords
- Sub-bass impacts and noise riser sweeps
- Sidechain ducking envelope on kick hits
"""

import numpy as np
import wave
import math
from pathlib import Path

def create_electronic_soundtrack(output_path: str, total_duration: float = 358.0, sr: int = 48000):
    bpm = 118.0
    beat_dur = 60.0 / bpm
    bar_dur = beat_dur * 4.0
    step_dur = beat_dur / 4.0

    num_samples = int(sr * total_duration)
    total_bars = int(math.ceil(total_duration / bar_dur))

    # 1. Drum Samples
    kick_len = int(sr * 0.35)
    t_k = np.linspace(0, 0.35, kick_len, endpoint=False)
    f_k = 48.0 + (160.0 - 48.0) * np.exp(-t_k * 32.0)
    phase_k = 2.0 * np.pi * np.cumsum(f_k) / sr
    amp_k = np.exp(-t_k * 9.0)
    click = np.sin(2.0 * np.pi * 1800.0 * t_k[:int(sr*0.01)]) * np.exp(-t_k[:int(sr*0.01)] * 300.0)
    kick = np.sin(phase_k) * amp_k
    kick[:len(click)] += click * 0.45
    kick = np.tanh(kick * 1.6) * 0.95

    snare_len = int(sr * 0.28)
    t_s = np.linspace(0, 0.28, snare_len, endpoint=False)
    f_s = 150.0 + 120.0 * np.exp(-t_s * 45.0)
    body_s = np.sin(2.0 * np.pi * np.cumsum(f_s) / sr) * np.exp(-t_s * 20.0)
    noise_s = (np.random.rand(snare_len).astype(np.float32) * 2.0 - 1.0) * np.exp(-t_s * 14.0)
    snare = np.tanh((body_s * 0.5 + noise_s * 0.7) * 1.5) * 0.75

    hat_c_len = int(sr * 0.05)
    t_hc = np.linspace(0, 0.05, hat_c_len, endpoint=False)
    noise_hc = (np.random.rand(hat_c_len).astype(np.float32) * 2.0 - 1.0)
    noise_hc = np.diff(np.concatenate(([0], noise_hc)))
    hat_closed = noise_hc * np.exp(-t_hc * 75.0) * 0.35

    hat_o_len = int(sr * 0.22)
    t_ho = np.linspace(0, 0.22, hat_o_len, endpoint=False)
    noise_ho = (np.random.rand(hat_o_len).astype(np.float32) * 2.0 - 1.0)
    noise_ho = np.diff(np.concatenate(([0], noise_ho)))
    hat_open = noise_ho * np.exp(-t_ho * 16.0) * 0.30

    # 2. Scale & Patterns (D Minor Cyberpunk)
    D1, F1, G1, A1, C2 = 36.71, 43.65, 49.00, 55.00, 65.41
    D3, F3, G3, A3, Bb3, C4, D4, E4, F4, G4, A4 = (
        146.83, 174.61, 196.00, 220.00, 233.08, 261.63, 293.66, 329.63, 349.23, 392.00, 440.00
    )

    arp_patterns = {
        "Dm": [D3, A3, D4, F4, A4, F4, D4, A3, D3, F3, A3, D4, F4, D4, A3, F3],
        "Bb": [Bb3, D4, F4, Bb3, D4, F4, Bb3, D4, F4, Bb3, D4, F4, D4, Bb3, F3, D3],
        "Gm": [G3, D4, G4, Bb3, D4, G4, D4, Bb3, G3, D4, G4, Bb3, D4, G4, D4, Bb3],
        "A":  [A3, E4, A4, C4, E4, A4, E4, C4, A3, E4, A4, C4, E4, A4, E4, C4]
    }

    bass_track = np.zeros(num_samples, dtype=np.float32)
    arp_track_l = np.zeros(num_samples, dtype=np.float32)
    arp_track_r = np.zeros(num_samples, dtype=np.float32)
    drums_track = np.zeros(num_samples, dtype=np.float32)
    pad_track_l = np.zeros(num_samples, dtype=np.float32)
    pad_track_r = np.zeros(num_samples, dtype=np.float32)

    chord_prog = ["Dm", "Dm", "Bb", "A", "Dm", "Dm", "Gm", "A"]

    for bar_idx in range(total_bars):
        bar_start_sec = bar_idx * bar_dur
        bar_start_sample = int(bar_start_sec * sr)
        if bar_start_sample >= num_samples:
            break

        chord_name = chord_prog[bar_idx % len(chord_prog)]
        root_freq = D1 if "Dm" in chord_name else (Bb3/4 if "Bb" in chord_name else (G1 if "Gm" in chord_name else A1))

        # Drums
        has_kick = (bar_idx >= 8 and bar_idx < 138) or (bar_idx >= 142)
        has_snare = (bar_idx >= 8 and bar_idx < 136) or (bar_idx >= 142)
        has_hats = bar_idx >= 4

        for step in range(16):
            step_sample = bar_start_sample + int(step * step_dur * sr)
            if step_sample >= num_samples:
                break

            if has_kick and (step in [0, 4, 8, 12] or (step == 14 and bar_idx % 2 == 1)):
                end_s = min(num_samples, step_sample + kick_len)
                drums_track[step_sample:end_s] += kick[:end_s - step_sample]

            if has_snare and step in [4, 12]:
                end_s = min(num_samples, step_sample + snare_len)
                drums_track[step_sample:end_s] += snare[:end_s - step_sample]

            if has_hats:
                if step in [2, 6, 10, 14]:
                    end_s = min(num_samples, step_sample + hat_o_len)
                    drums_track[step_sample:end_s] += hat_open[:end_s - step_sample] * 0.75
                else:
                    vel = 0.85 if step % 2 == 0 else 0.55
                    end_s = min(num_samples, step_sample + hat_c_len)
                    drums_track[step_sample:end_s] += hat_closed[:end_s - step_sample] * vel

        # Bassline
        if bar_idx >= 8:
            note_dur = step_dur * 0.85
            note_len = int(sr * note_dur)
            t_b = np.linspace(0, note_dur, note_len, endpoint=False)

            for step in range(16):
                step_sample = bar_start_sample + int(step * step_dur * sr)
                if step_sample >= num_samples:
                    break

                step_pitch = root_freq
                if step in [3, 11]:
                    step_pitch = root_freq * 1.3348
                elif step in [7, 15]:
                    step_pitch = root_freq * 1.4983
                elif step in [14]:
                    step_pitch = root_freq * 1.1892

                saw_b = np.zeros(note_len, dtype=np.float32)
                for h in range(1, 9):
                    saw_b += (1.0 / h) * np.sin(2.0 * np.pi * (step_pitch * h) * t_b)

                env_b = np.exp(-t_b * 12.0)
                bass_note = np.tanh(saw_b * env_b * 1.8) * 0.45

                end_s = min(num_samples, step_sample + note_len)
                bass_track[step_sample:end_s] += bass_note[:end_s - step_sample]

        # Arpeggio
        if bar_idx >= 8:
            pattern = arp_patterns.get(chord_name, arp_patterns["Dm"])
            for step in range(16):
                step_sample = bar_start_sample + int(step * step_dur * sr)
                if step_sample >= num_samples:
                    break

                freq = pattern[step % len(pattern)]
                a_dur = step_dur * 0.70
                a_len = int(sr * a_dur)
                t_a = np.linspace(0, a_dur, a_len, endpoint=False)

                synth_a = np.sin(2.0 * np.pi * freq * t_a) + 0.5 * np.sign(np.sin(2.0 * np.pi * freq * t_a))
                env_a = np.exp(-t_a * 22.0)
                note_a = synth_a * env_a * 0.18

                end_s = min(num_samples, step_sample + a_len)
                arp_track_l[step_sample:end_s] += note_a[:end_s - step_sample]

                delay_samples = int(step_dur * 0.75 * sr)
                r_start = step_sample + delay_samples
                if r_start < num_samples:
                    end_sr = min(num_samples, r_start + a_len)
                    arp_track_r[r_start:end_sr] += note_a[:end_sr - r_start] * 0.65

        # Pads
        pad_len = int(sr * bar_dur)
        t_p = np.linspace(0, bar_dur, pad_len, endpoint=False)
        pad_chord = [D3, F3, A3] if "Dm" in chord_name else ([Bb3/2, D3, F3] if "Bb" in chord_name else [G3/2, Bb3/2, D3])
        pad_wave = np.zeros(pad_len, dtype=np.float32)
        for pf in pad_chord:
            pad_wave += np.sin(2.0 * np.pi * pf * t_p) + 0.3 * np.sin(2.0 * np.pi * pf * 2.005 * t_p)
        env_p = np.sin(np.pi * np.linspace(0, 1, pad_len)) ** 0.8
        pad_out = pad_wave * env_p * 0.14
        end_sp = min(num_samples, bar_start_sample + pad_len)
        pad_track_l[bar_start_sample:end_sp] += pad_out[:end_sp - bar_start_sample]
        pad_track_r[bar_start_sample:end_sp] += pad_out[:end_sp - bar_start_sample] * 0.95

    # Sidechain Compression
    kick_envelope = np.abs(drums_track)
    decay_rate = np.exp(-1.0 / (sr * 0.08))
    for i in range(1, num_samples):
        if kick_envelope[i] < kick_envelope[i-1] * decay_rate:
            kick_envelope[i] = kick_envelope[i-1] * decay_rate
    ducking = 1.0 - np.clip(kick_envelope * 0.55, 0.0, 0.55)

    left = drums_track * 0.85 + (bass_track * ducking) * 0.90 + arp_track_l * 0.70 + (pad_track_l * ducking) * 0.80
    right = drums_track * 0.85 + (bass_track * ducking) * 0.90 + arp_track_r * 0.70 + (pad_track_r * ducking) * 0.80

    left = np.tanh(left * 1.3)
    right = np.tanh(right * 1.3)

    peak = max(np.max(np.abs(left)), np.max(np.abs(right)), 1e-6)
    left = (left / peak) * 0.89
    right = (right / peak) * 0.89

    left_16 = (left * 32767).astype(np.int16)
    right_16 = (right * 32767).astype(np.int16)
    stereo = np.empty((num_samples * 2,), dtype=np.int16)
    stereo[0::2] = left_16
    stereo[1::2] = right_16

    with wave.open(output_path, "wb") as wf:
        wf.setnchannels(2)
        wf.setsampwidth(2)
        wf.setframerate(sr)
        wf.writeframes(stereo.tobytes())

if __name__ == "__main__":
    out_file = "/tmp/ogfl_dynamic_electronic_bgm.wav"
    create_electronic_soundtrack(out_file, total_duration=360.0)
    print("Electronic BGM rendered to", out_file)
