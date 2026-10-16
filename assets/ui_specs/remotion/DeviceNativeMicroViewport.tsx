/**
 * DeviceNativeMicroViewport.tsx
 * Module 1: 真机多维动态透视（Device-Native Micro-Viewport）
 * 
 * Open Gaming Forensic Lab (OGFL) - Broadcast Video UI Architecture
 * 
 * Replaces generic smartphone frame PNGs with parametric CSS/SVG sub-millimeter
 * titanium chassis, 60fps OLED display sub-pixel edge diffusion, interactive
 * spring-physics touch halo ripples, and dynamic leader-line HUD target trackers.
 */

import React, { useMemo } from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { DeviceNativeMicroViewportProps, HUDTargetItem, TouchCoordinate } from './types';

export const DeviceNativeMicroViewport: React.FC<DeviceNativeMicroViewportProps> = ({
  deviceConfig = {
    deviceModel: 'Titanium-16-Pro',
    aspectRatio: '19.5:9',
    screenWidth: 430,
    screenHeight: 932,
    bezelThicknessPx: 12,
    subpixelDiffusionGlow: true,
    frameRate: 60,
  },
  videoSourceUrl,
  screenPosterUrl,
  activeTouchPoints = [
    { x: 0.52, y: 0.78, timestampSec: 1.2, pressure: 0.95, gestureType: 'tap' },
  ],
  trackedElements = [
    {
      id: 'gacha-pull-btn',
      label: 'DYNAMIC CALL-TO-ACTION (GACHA PULL)',
      screenBoundingBox: { x: 38, y: 74, width: 28, height: 8 },
      alarmLevel: 'critical',
      telemetry: {
        realTimePsychologicalPrice: '$99.99 = 4.8h Avg US Median Wage',
        hiddenMarkovOdds: 'P(SSR)=0.006 (Hidden Soft Pity @ Pull 74)',
        fomoDecayIndex: 94,
        fomoCountdownSecRemaining: 342,
        manipulationMechanism: 'Near-Miss Hedonic Treadmill (EA/Activision Patent)',
      },
      leaderLineTargetSide: 'right',
    },
  ],
  showCoordinateGrid = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Spring physics for viewport entrance
  const entranceSpring = spring({
    frame,
    fps,
    config: {
      damping: 24,
      mass: 0.8,
      stiffness: 180,
    },
  });

  // Calculate subtle hardware breath & micro-perspective drift
  const subtleTiltX = Math.sin(frame * 0.015) * 1.5;
  const subtleTiltY = Math.cos(frame * 0.012) * 2.0;

  // Pulse animation for critical HUD alarms
  const pulseIntensity = (Math.sin(frame * 0.18) + 1) / 2;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: '#08090C',
        overflow: 'hidden',
        fontFamily: "'SF Mono', 'JetBrains Mono', 'Geist Mono', monospace",
        color: '#F4F6F8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Background Laboratory Calibrated Reticle Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(0, 240, 255, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 240, 255, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
        }}
      />

      {/* Laboratory Ambient Corner Stamp & Telemetry Header */}
      <div
        style={{
          position: 'absolute',
          top: 32,
          left: 48,
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          zIndex: 20,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: '#00F0FF',
              boxShadow: '0 0 10px #00F0FF',
            }}
          />
          <span style={{ fontSize: 13, letterSpacing: '0.18em', color: '#00F0FF', fontWeight: 600 }}>
            OGFL // FORENSIC LIVE BENCH V4.8
          </span>
          <span
            style={{
              padding: '2px 8px',
              fontSize: 10,
              backgroundColor: 'rgba(0, 240, 255, 0.12)',
              border: '1px solid rgba(0, 240, 255, 0.3)',
              borderRadius: 3,
              color: '#00F0FF',
            }}
          >
            60.000 FPS LOSSLESS SAMPLING
          </span>
        </div>
        <div style={{ fontSize: 11, color: '#7E8B9B', letterSpacing: '0.08em' }}>
          DEVICE: APPLE A18 PRO HARDWARE TETHER (SEC-ISOLATED SANDBOX)
        </div>
      </div>

      {/* Main 16:9 Dissection Bench Stage */}
      <div
        style={{
          position: 'relative',
          width: 1400,
          height: 820,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transform: `scale(${entranceSpring})`,
          opacity: entranceSpring,
        }}
      >
        {/* Left / Center-Left: The Parametric Titanium Micro-Viewport Chassis */}
        <div
          style={{
            position: 'relative',
            width: 440,
            height: 780,
            borderRadius: 48,
            padding: deviceConfig.bezelThicknessPx,
            // Multi-layered Titanium CNC Milling Chamfer & Specular Gradient
            background: 'linear-gradient(145deg, #3A3E47 0%, #171A21 40%, #0F1116 100%)',
            boxShadow: `
              0 30px 80px rgba(0, 0, 0, 0.9),
              0 0 0 1.5px rgba(255, 255, 255, 0.15) inset,
              0 0 35px rgba(0, 240, 255, ${deviceConfig.subpixelDiffusionGlow ? '0.12' : '0'})
            `,
            transform: `perspective(1200px) rotateX(${subtleTiltX}deg) rotateY(${subtleTiltY}deg)`,
            transition: 'transform 0.1s ease-out',
            flexShrink: 0,
          }}
        >
          {/* Edge Antenna Bands & Micro-Bezel */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              borderRadius: 38,
              backgroundColor: '#000000',
              overflow: 'hidden',
              boxShadow: '0 0 0 2px rgba(0,0,0,0.9) inset',
            }}
          >
            {/* Dynamic Island / TrueDepth Aperture */}
            <div
              style={{
                position: 'absolute',
                top: 10,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 96,
                height: 26,
                borderRadius: 20,
                backgroundColor: '#000',
                zIndex: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingRight: 10,
                boxShadow: '0 0 4px rgba(0,0,0,0.8)',
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  backgroundColor: '#080C14',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              />
            </div>

            {/* Screen Content: Capture Media or High-Def Simulation Canvas */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: '#0B0D12',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {videoSourceUrl ? (
                <video
                  src={videoSourceUrl}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  muted
                  playsInline
                />
              ) : screenPosterUrl ? (
                <img
                  src={screenPosterUrl}
                  alt="Recorded Gameplay"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                /* Simulated High-Fidelity Gacha Interface with Dark Patterns */
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    background: 'radial-gradient(circle at 50% 30%, #2A1538 0%, #0D0E16 85%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '60px 24px 30px',
                    boxSizing: 'border-box',
                  }}
                >
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 10, color: '#FFD700', letterSpacing: '0.15em' }}>
                      ★ MYTHIC CONSTELLATION BANNER ★
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: '#FFF', marginTop: 4 }}>
                      DIVINE ARCHON SUMMON
                    </div>
                    <div style={{ fontSize: 11, color: '#FF5E7E', marginTop: 6, fontWeight: 600 }}>
                      ⚡ LIMITED OFFER ENDS IN: 05h 42m 19s
                    </div>
                  </div>

                  {/* Loot Box Hologram Preview */}
                  <div
                    style={{
                      width: 180,
                      height: 180,
                      margin: '0 auto',
                      borderRadius: 16,
                      border: '1px solid rgba(255, 215, 0, 0.3)',
                      background: 'radial-gradient(circle, rgba(255,215,0,0.15) 0%, transparent 70%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 0 25px rgba(255, 105, 180, 0.2)',
                    }}
                  >
                    <div style={{ fontSize: 48 }}>💎</div>
                  </div>

                  {/* The Predatory Call To Action Button (Tracked by HUD) */}
                  <div
                    style={{
                      width: '100%',
                      height: 52,
                      borderRadius: 12,
                      background: 'linear-gradient(90deg, #FF0055 0%, #FFAA00 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      boxShadow: '0 4px 20px rgba(255, 0, 85, 0.5)',
                      cursor: 'pointer',
                    }}
                  >
                    <span style={{ fontSize: 14, fontWeight: 800, color: '#FFFFFF', letterSpacing: '0.05em' }}>
                      PULL 10X (6,480 CRYSTALS)
                    </span>
                    <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.85)', letterSpacing: '0.02em' }}>
                      BEST VALUE: 900% EXTRA BONUS!
                    </span>
                  </div>
                </div>
              )}

              {/* Sub-pixel Coordinate Laser Overlay */}
              {showCoordinateGrid && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    backgroundImage: `
                      radial-gradient(rgba(0, 240, 255, 0.15) 1px, transparent 1px)
                    `,
                    backgroundSize: '24px 24px',
                  }}
                />
              )}

              {/* Real-time Capacitive Touch Pointer & Micro-Haptic Ripple */}
              {activeTouchPoints.map((tp, idx) => {
                const rippleScale = interpolate(
                  (frame % 30),
                  [0, 29],
                  [0.6, 2.8],
                  { extrapolateRight: 'clamp' }
                );
                const rippleOpacity = interpolate(
                  (frame % 30),
                  [0, 29],
                  [0.9, 0.0],
                  { extrapolateRight: 'clamp' }
                );

                return (
                  <div
                    key={`touch-${idx}`}
                    style={{
                      position: 'absolute',
                      left: `${tp.x * 100}%`,
                      top: `${tp.y * 100}%`,
                      transform: 'translate(-50%, -50%)',
                      pointerEvents: 'none',
                      zIndex: 35,
                    }}
                  >
                    {/* Concentric Haptic Ring */}
                    <div
                      style={{
                        position: 'absolute',
                        width: 44,
                        height: 44,
                        borderRadius: '50%',
                        border: '1.5px solid #00F0FF',
                        transform: `translate(-50%, -50%) scale(${rippleScale})`,
                        opacity: rippleOpacity,
                      }}
                    />
                    {/* Center Capacitive Contact Core */}
                    <div
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: '50%',
                        backgroundColor: 'rgba(0, 240, 255, 0.65)',
                        border: '2px solid #FFFFFF',
                        boxShadow: '0 0 14px #00F0FF',
                      }}
                    />
                    {/* Micro-coordinate Telemetry Tag */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 20,
                        left: 20,
                        backgroundColor: 'rgba(8, 9, 12, 0.92)',
                        border: '1px solid #00F0FF',
                        borderRadius: 3,
                        padding: '2px 5px',
                        fontSize: 9,
                        color: '#00F0FF',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      P(t): {(tp.pressure ?? 1.0).toFixed(2)} | (X: {Math.round(tp.x * 430)}, Y: {Math.round(tp.y * 932)})
                    </div>
                  </div>
                );
              })}

              {/* Dynamic Target HUD Box inside Screen Frame */}
              {trackedElements.map((el) => (
                <div
                  key={`box-${el.id}`}
                  style={{
                    position: 'absolute',
                    left: `${el.screenBoundingBox.x}%`,
                    top: `${el.screenBoundingBox.y}%`,
                    width: `${el.screenBoundingBox.width}%`,
                    height: `${el.screenBoundingBox.height}%`,
                    border: `1.5px solid ${el.alarmLevel === 'critical' ? '#FF2A55' : '#00F0FF'}`,
                    backgroundColor: el.alarmLevel === 'critical' ? 'rgba(255, 42, 85, 0.12)' : 'rgba(0, 240, 255, 0.08)',
                    boxShadow: `0 0 15px ${el.alarmLevel === 'critical' ? 'rgba(255,42,85,0.4)' : 'rgba(0,240,255,0.2)'}`,
                    zIndex: 30,
                    pointerEvents: 'none',
                  }}
                >
                  {/* Corner Reticle Ticks */}
                  <div style={{ position: 'absolute', top: -3, left: -3, width: 6, height: 6, borderLeft: '2px solid #FFF', borderTop: '2px solid #FFF' }} />
                  <div style={{ position: 'absolute', top: -3, right: -3, width: 6, height: 6, borderRight: '2px solid #FFF', borderTop: '2px solid #FFF' }} />
                  <div style={{ position: 'absolute', bottom: -3, left: -3, width: 6, height: 6, borderLeft: '2px solid #FFF', borderBottom: '2px solid #FFF' }} />
                  <div style={{ position: 'absolute', bottom: -3, right: -3, width: 6, height: 6, borderRight: '2px solid #FFF', borderBottom: '2px solid #FFF' }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: High-Precision Surgical Telemetry Cards & Leader Lines */}
        <div
          style={{
            position: 'relative',
            width: 820,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          {trackedElements.map((el) => (
            <div
              key={`telemetry-${el.id}`}
              style={{
                position: 'relative',
                backgroundColor: 'rgba(15, 18, 25, 0.85)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderLeft: `4px solid ${el.alarmLevel === 'critical' ? '#FF2A55' : '#00F0FF'}`,
                borderRadius: 12,
                padding: '24px 28px',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
              }}
            >
              {/* Leader Line linking to the device button */}
              <svg
                style={{
                  position: 'absolute',
                  left: -120,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 120,
                  height: 60,
                  overflow: 'visible',
                  pointerEvents: 'none',
                }}
              >
                <path
                  d="M 0 30 L 70 30 L 120 30"
                  fill="none"
                  stroke={el.alarmLevel === 'critical' ? '#FF2A55' : '#00F0FF'}
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                />
                <circle cx="0" cy="30" r="4" fill={el.alarmLevel === 'critical' ? '#FF2A55' : '#00F0FF'} />
              </svg>

              {/* Telemetry Card Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span
                    style={{
                      padding: '3px 8px',
                      borderRadius: 4,
                      fontSize: 10,
                      fontWeight: 700,
                      backgroundColor: el.alarmLevel === 'critical' ? 'rgba(255, 42, 85, 0.2)' : 'rgba(0, 240, 255, 0.2)',
                      color: el.alarmLevel === 'critical' ? '#FF2A55' : '#00F0FF',
                      border: `1px solid ${el.alarmLevel === 'critical' ? '#FF2A55' : '#00F0FF'}`,
                    }}
                  >
                    {el.alarmLevel.toUpperCase()} ALERT
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#F4F6F8', letterSpacing: '0.06em' }}>
                    {el.label}
                  </span>
                </div>
                <div style={{ fontSize: 11, color: '#7E8B9B' }}>
                  TARGET REF: #{el.id}
                </div>
              </div>

              {/* Data Grid: 3 Forensic Quant Metrics */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 16,
                  marginTop: 20,
                }}
              >
                {/* Metric 1: Real-time Psychological Pricing */}
                <div
                  style={{
                    backgroundColor: 'rgba(8, 10, 15, 0.65)',
                    borderRadius: 8,
                    padding: 14,
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  <div style={{ fontSize: 10, color: '#7E8B9B', letterSpacing: '0.08em' }}>
                    REAL-TIME PSYCHOLOGICAL PRICING
                  </div>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: '#FF2A55',
                      marginTop: 6,
                    }}
                  >
                    {el.telemetry.realTimePsychologicalPrice}
                  </div>
                  <div style={{ fontSize: 10, color: '#9AA7B6', marginTop: 4 }}>
                    De-anchoring currency obfuscation ratio: 64.8x
                  </div>
                </div>

                {/* Metric 2: PRNG Probability Decay */}
                <div
                  style={{
                    backgroundColor: 'rgba(8, 10, 15, 0.65)',
                    borderRadius: 8,
                    padding: 14,
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  <div style={{ fontSize: 10, color: '#7E8B9B', letterSpacing: '0.08em' }}>
                    PATENTED PRNG DECAY ODE
                  </div>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: '#00F0FF',
                      marginTop: 6,
                    }}
                  >
                    {el.telemetry.hiddenMarkovOdds}
                  </div>
                  <div style={{ fontSize: 10, color: '#9AA7B6', marginTop: 4 }}>
                    Dynamic curve dampens win-rate during high churn
                  </div>
                </div>
              </div>

              {/* Metric 3: FOMO Hazard Meter & Dark Mechanism */}
              <div
                style={{
                  marginTop: 16,
                  padding: 14,
                  backgroundColor: 'rgba(8, 10, 15, 0.65)',
                  borderRadius: 8,
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 10, color: '#7E8B9B', letterSpacing: '0.08em' }}>
                    FOMO DOPAMINE HAZARD INDEX
                  </span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#FF2A55' }}>
                    {el.telemetry.fomoDecayIndex} / 100 [CRITICAL EXPLOITATION]
                  </span>
                </div>
                {/* Gauge bar */}
                <div
                  style={{
                    width: '100%',
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    marginTop: 8,
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${el.telemetry.fomoDecayIndex}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #FF9900 0%, #FF2A55 100%)',
                      boxShadow: '0 0 10px #FF2A55',
                    }}
                  />
                </div>
                <div style={{ fontSize: 11, color: '#D2D9E2', marginTop: 10 }}>
                  <strong style={{ color: '#FF2A55' }}>CLASSIFICATION:</strong> {el.telemetry.manipulationMechanism}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
