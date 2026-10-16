/**
 * PanaceaAestheticShift.tsx
 * Module 4: 第四幕审美极性反转（The Panacea Aesthetic Shift）
 * 
 * Open Gaming Forensic Lab (OGFL) - Broadcast Video UI Architecture
 * 
 * Executes a dramatic polarity shift when the documentary transitions from
 * the grim, predatory dissection of Acts 1-3 to the ethical "Panacea" of Act 4
 * (celebrating pure, uncompromised premium indie games like Balatro, Monument Valley, Silksong).
 * 
 * Inverts cold graphite black and laser cyan into unbleached archival paper,
 * warm terracotta, alpine pine green, and humanist serif typography.
 */

import React from 'react';
import { interpolate, interpolateColors, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { PanaceaAestheticShiftProps } from './types';

export const PanaceaAestheticShift: React.FC<PanaceaAestheticShiftProps> = ({
  currentPhase = 'panacea-warm',
  transitionProgress = 1.0,
  indieTitle = 'BALATRO',
  indieStudio = 'LOCALTHUNK (PUBLISHED BY PLAYSTACK)',
  monetizationModel = 'Flat Purchase ($9.99)',
  ethicAuditScore = '100/100 FORENSIC CLEAN',
  children,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Smooth ease curve for transition progress
  const shiftSpring = spring({
    frame,
    fps,
    config: {
      damping: 32,
      mass: 1.2,
      stiffness: 110,
    },
  });

  const effectiveProgress = currentPhase === 'panacea-warm' ? shiftSpring : 0;

  // Dynamic Color Interpolation between Cyber Autopsy & Humanist Panacea
  const bgColor = interpolateColors(
    effectiveProgress,
    [0, 1],
    ['#08090C', '#F7F4EB'] // Cold graphite -> Unbleached Japanese archival paper
  );

  const textColor = interpolateColors(
    effectiveProgress,
    [0, 1],
    ['#F4F6F8', '#1A1815'] // Surgical cold white -> Deep printer ink
  );

  const accentColor = interpolateColors(
    effectiveProgress,
    [0, 1],
    ['#00F0FF', '#2E5A44'] // Laser cyan -> Deep Alpine Pine Green
  );

  const secondaryAccentColor = interpolateColors(
    effectiveProgress,
    [0, 1],
    ['#FF2A55', '#B85D38'] // Acid crimson -> Kyoto Terracotta
  );

  const cardBgColor = interpolateColors(
    effectiveProgress,
    [0, 1],
    ['rgba(15, 18, 25, 0.95)', '#FFFFFF']
  );

  const borderColor = interpolateColors(
    effectiveProgress,
    [0, 1],
    ['rgba(0, 240, 255, 0.25)', 'rgba(46, 90, 68, 0.22)']
  );

  // Subtle breathing scale
  const breath = Math.sin(frame * 0.04) * 0.005 + 1.0;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: bgColor,
        color: textColor,
        overflow: 'hidden',
        boxSizing: 'border-box',
        padding: '48px 64px',
        transition: 'background-color 0.8s ease, color 0.8s ease',
        fontFamily: effectiveProgress > 0.5
          ? "'Editorial New', 'Fraunces', 'Newsreader', 'Hiragino Mincho ProN', serif"
          : "'SF Mono', 'JetBrains Mono', 'Geist Mono', monospace",
      }}
    >
      {/* Subtle Risograph / Bookbinding Paper Grain Texture Overlay */}
      {effectiveProgress > 0.2 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              radial-gradient(#2E5A44 0.6px, transparent 0.6px),
              radial-gradient(#B85D38 0.6px, #F7F4EB 0.6px)
            `,
            backgroundSize: '24px 24px',
            backgroundPosition: '0 0, 12px 12px',
            opacity: 0.04 * effectiveProgress,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Header Badge: Dramatic Polarity Phase Marker */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: `1.5px solid ${borderColor}`,
          paddingBottom: 20,
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              padding: '4px 12px',
              backgroundColor: accentColor,
              color: effectiveProgress > 0.5 ? '#F7F4EB' : '#08090C',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.12em',
              borderRadius: effectiveProgress > 0.5 ? 20 : 3,
              fontFamily: "'SF Mono', monospace",
            }}
          >
            {effectiveProgress > 0.5 ? 'ACT 4: THE PANACEA // 解毒良药' : 'ACTS 1-3: THE AUTOPSY'}
          </div>
          <span
            style={{
              fontSize: 16,
              fontWeight: 600,
              letterSpacing: effectiveProgress > 0.5 ? '0.02em' : '0.1em',
            }}
          >
            {effectiveProgress > 0.5 ? 'The Anti-Dopamine Sanctuary' : 'Forensic Decomposition Engine'}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span
            style={{
              padding: '4px 10px',
              backgroundColor: 'rgba(46, 90, 68, 0.12)',
              border: `1px solid ${accentColor}`,
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 700,
              color: accentColor,
              fontFamily: "'SF Mono', monospace",
            }}
          >
            ✓ {ethicAuditScore}
          </span>
        </div>
      </div>

      {/* Main Panacea Spotlight Showcase */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 600,
          marginTop: 36,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transform: `scale(${breath})`,
          transition: 'all 0.5s ease',
        }}
      >
        {/* Left Card: The Pure Artisan Indie Profile */}
        <div
          style={{
            width: '56%',
            backgroundColor: cardBgColor,
            borderRadius: effectiveProgress > 0.5 ? 28 : 10,
            border: `1.5px solid ${borderColor}`,
            padding: '40px 48px',
            boxShadow: effectiveProgress > 0.5
              ? '0 30px 60px rgba(50, 40, 20, 0.08), 0 2px 10px rgba(50, 40, 20, 0.04)'
              : '0 20px 50px rgba(0, 0, 0, 0.8)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: 480,
            boxSizing: 'border-box',
          }}
        >
          <div>
            <div
              style={{
                fontSize: 13,
                letterSpacing: '0.16em',
                color: secondaryAccentColor,
                fontWeight: 700,
                textTransform: 'uppercase',
                fontFamily: "'SF Mono', monospace",
              }}
            >
              CRAFT OVER EXPLOITATION
            </div>
            <div
              style={{
                fontSize: 48,
                fontWeight: 800,
                marginTop: 12,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}
            >
              {indieTitle}
            </div>
            <div
              style={{
                fontSize: 15,
                color: effectiveProgress > 0.5 ? '#6E675F' : '#7E8B9B',
                marginTop: 8,
                fontStyle: 'italic',
              }}
            >
              Created by {indieStudio}
            </div>

            {/* Core Humanist Values Checklist */}
            <div
              style={{
                marginTop: 30,
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
                fontSize: 16,
                lineHeight: 1.5,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ color: accentColor, fontWeight: 800, fontSize: 18 }}>✓</span>
                <span><strong>Zero In-App Purchases</strong>: No hidden slot machines, no crystal obfuscation.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ color: accentColor, fontWeight: 800, fontSize: 18 }}>✓</span>
                <span><strong>No Real-time Artificial Friction</strong>: No stamina timers, zero FOMO calendar traps.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ color: accentColor, fontWeight: 800, fontSize: 18 }}>✓</span>
                <span><strong>Pure Aesthetic & Mathematical Elegance</strong>: Respects player intellect and precious time.</span>
              </div>
            </div>
          </div>

          {/* Pricing & Human Contract Stamp */}
          <div
            style={{
              borderTop: `1px solid ${borderColor}`,
              paddingTop: 18,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <div style={{ fontSize: 11, color: '#7E8B9B', fontFamily: "'SF Mono', monospace" }}>
                PRICING CONTRACT
              </div>
              <div style={{ fontSize: 20, fontWeight: 700, color: accentColor }}>
                {monetizationModel}
              </div>
            </div>
            <div
              style={{
                backgroundColor: 'rgba(46, 90, 68, 0.08)',
                padding: '8px 16px',
                borderRadius: 20,
                fontSize: 12,
                color: accentColor,
                fontWeight: 600,
                fontFamily: "'SF Mono', monospace",
              }}
            >
              LIFETIME COMPLETE OWNERSHIP
            </div>
          </div>
        </div>

        {/* Right Card: The Aesthetic Zen Comparison Matrix */}
        <div
          style={{
            width: '40%',
            backgroundColor: cardBgColor,
            borderRadius: effectiveProgress > 0.5 ? 28 : 10,
            border: `1.5px solid ${borderColor}`,
            padding: '36px 36px',
            boxShadow: effectiveProgress > 0.5
              ? '0 30px 60px rgba(50, 40, 20, 0.08)'
              : '0 20px 50px rgba(0, 0, 0, 0.8)',
            height: 480,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div
              style={{
                fontSize: 12,
                color: secondaryAccentColor,
                fontWeight: 700,
                letterSpacing: '0.14em',
                fontFamily: "'SF Mono', monospace",
              }}
            >
              PARADIGM DICHOTOMY
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, marginTop: 8 }}>
              Casino Architecture vs. Human Craft
            </div>

            <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 18 }}>
              {/* Row 1 */}
              <div style={{ borderBottom: `1px dashed ${borderColor}`, paddingBottom: 12 }}>
                <div style={{ fontSize: 11, color: '#888', fontFamily: "'SF Mono', monospace" }}>
                  PSYCHOLOGICAL VECTOR
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                  <span style={{ color: '#FF2A55', textDecoration: 'line-through' }}>
                    Intermittent Operant Conditioning
                  </span>
                  <span style={{ color: accentColor, fontWeight: 700 }}>Intrinsic Mastery</span>
                </div>
              </div>

              {/* Row 2 */}
              <div style={{ borderBottom: `1px dashed ${borderColor}`, paddingBottom: 12 }}>
                <div style={{ fontSize: 11, color: '#888', fontFamily: "'SF Mono', monospace" }}>
                  DATA EXTRACTION
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                  <span style={{ color: '#FF2A55', textDecoration: 'line-through' }}>
                    Telemetry Whale Profiling
                  </span>
                  <span style={{ color: accentColor, fontWeight: 700 }}>Zero Tracking (Offline)</span>
                </div>
              </div>

              {/* Row 3 */}
              <div style={{ borderBottom: `1px dashed ${borderColor}`, paddingBottom: 12 }}>
                <div style={{ fontSize: 11, color: '#888', fontFamily: "'SF Mono', monospace" }}>
                  THE END-STATE FEELING
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                  <span style={{ color: '#FF2A55', textDecoration: 'line-through' }}>
                    Emptiness & Sunk-Cost Regret
                  </span>
                  <span style={{ color: accentColor, fontWeight: 700 }}>Genuine Joy & Closure</span>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              padding: '14px 18px',
              backgroundColor: 'rgba(184, 93, 56, 0.08)',
              borderRadius: 16,
              fontSize: 12,
              lineHeight: 1.5,
              color: secondaryAccentColor,
              fontStyle: 'italic',
            }}
          >
            "Great games are not machines designed to bleed your wallet; they are mirrors held up to human curiosity."
          </div>
        </div>
      </div>
    </div>
  );
};
