/**
 * PatentCADBlueprintAssembly.tsx
 * Module 2: 专利蓝图动态 CAD 解构（Patent CAD Blueprint Assembly）
 * 
 * Open Gaming Forensic Lab (OGFL) - Broadcast Video UI Architecture
 * 
 * Replaces blurry, static USPTO PDF screenshots with an industrial-grade
 * animated CAD vector schematic. Features exploded 3D depth, animated laser
 * path drafting, dynamic algorithmic state-machines, and forensic laser sweeps
 * over predatory legal patent claims.
 */

import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CADConnection, CADNode, PatentCADBlueprintAssemblyProps, PatentClaimHighlight } from './types';

export const PatentCADBlueprintAssembly: React.FC<PatentCADBlueprintAssemblyProps> = ({
  patentId = 'US20160001182A1',
  title = 'DYNAMIC DIFFICULTY ADJUSTMENT SYSTEM',
  assignee = 'ELECTRONIC ARTS INC. (REDWOOD CITY, CA)',
  filingDate = '2016-01-07',
  nodes = [
    {
      id: 'node-telemetry',
      label: '01. REAL-TIME PLAYER TELEMETRY',
      category: 'input',
      x: 120,
      y: 180,
      width: 280,
      height: 90,
      highlighted: false,
      subtext: 'Session duration, loss streak, historical spend rate',
      sourcePatentClaim: 'Claim 1: Monitoring client gameplay vectors',
    },
    {
      id: 'node-churn-predictor',
      label: '02. CHURN PREDICTION ENGINE',
      category: 'algorithm',
      x: 520,
      y: 180,
      width: 320,
      height: 90,
      highlighted: true,
      subtext: 'Markov probability calculation: P(Quit | Loss Streak >= 3)',
      sourcePatentClaim: 'Claim 4: Predictive churn probability threshold',
    },
    {
      id: 'node-difficulty-damper',
      label: '03. ARTIFICIAL DIFFICULTY DAMPER',
      category: 'manipulation',
      x: 960,
      y: 120,
      width: 340,
      height: 90,
      highlighted: true,
      subtext: 'Micro-tweak hitbox / enemy AI aggression (-32%)',
      sourcePatentClaim: 'Claim 7: Dynamic alteration of difficulty coefficients',
    },
    {
      id: 'node-monetization-trigger',
      label: '04. TARGETED MONETIZATION INTERVENTION',
      category: 'manipulation',
      x: 960,
      y: 260,
      width: 340,
      height: 90,
      highlighted: true,
      subtext: 'Pop-up $4.99 "Comeback Pack" immediately upon near-miss',
      sourcePatentClaim: 'Claim 12: Timed transactional stimulus based on frustration index',
    },
  ],
  connections = [
    { fromNodeId: 'node-telemetry', toNodeId: 'node-churn-predictor', label: 'Vector Feed (60Hz)' },
    { fromNodeId: 'node-churn-predictor', toNodeId: 'node-difficulty-damper', label: 'If Churn Risk > 0.85', isPredatoryVector: true },
    { fromNodeId: 'node-churn-predictor', toNodeId: 'node-monetization-trigger', label: 'If Wallet Elasticity > 0.40', isPredatoryVector: true },
  ],
  activeClaim = {
    patentNumber: 'US 2016/0001182 A1',
    assignee: 'Electronic Arts Inc.',
    filingDate: 'Filing: Jan 7, 2016 | Grant: Oct 23, 2018',
    claimId: 'CLAIM 14 [METHOD FOR DYNAMIC RETENTION CONTROL]',
    claimExcerpt:
      'A computer-implemented method comprising: determining an engagement profile representing expected gameplay duration; and dynamically modifying difficulty parameters of a video game without informing the user, so as to maximize predicted lifetime spending value.',
    forensicAuditVerdict: 'VERIFIED CODE INTERVENTION: Hidden handicap adjustment intentionally deceived user regarding natural skill progression.',
  },
  explodedViewZOffset = 40,
  laserScanProgress,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring animation
  const blueprintEntrance = spring({
    frame,
    fps,
    config: { damping: 26, mass: 1.0, stiffness: 140 },
  });

  // Calculate animated laser stroke progress if not explicitly passed
  const strokeProgress = laserScanProgress ?? interpolate(frame, [15, 75], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Laser scanner line position across screen
  const laserSweepX = interpolate(frame % 120, [0, 119], [-100, 1920]);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: '#080A0F',
        overflow: 'hidden',
        fontFamily: "'SF Mono', 'JetBrains Mono', 'Geist Mono', monospace",
        color: '#F4F6F8',
        boxSizing: 'border-box',
        padding: '40px 60px',
      }}
    >
      {/* Precision CAD Isometric Grid Background */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.18,
          pointerEvents: 'none',
        }}
      >
        <defs>
          <pattern id="cadGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00F0FF" strokeWidth="0.5" />
            <circle cx="40" cy="40" r="1.5" fill="#00F0FF" opacity="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cadGrid)" />
      </svg>

      {/* Top Patent Engineering Titlebar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          borderBottom: '1px solid rgba(0, 240, 255, 0.25)',
          paddingBottom: 16,
          zIndex: 10,
          position: 'relative',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: '#080A0F',
                backgroundColor: '#00F0FF',
                padding: '3px 8px',
                borderRadius: 2,
              }}
            >
              USPTO FORENSIC DISSECTION
            </span>
            <span style={{ fontSize: 13, color: '#00F0FF', letterSpacing: '0.12em' }}>
              DOCKET ID: {patentId}
            </span>
            <span style={{ fontSize: 12, color: '#7E8B9B' }}>
              ASSIGNEE: {assignee}
            </span>
          </div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 800,
              letterSpacing: '0.04em',
              color: '#FFFFFF',
              marginTop: 8,
              textTransform: 'uppercase',
            }}
          >
            {title}
          </div>
        </div>

        <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ fontSize: 11, color: '#7E8B9B' }}>OFFICIAL USPTO REGISTRY OSINT AUDIT</div>
          <div style={{ fontSize: 12, color: '#FF2A55', fontWeight: 600 }}>
            STATUS: ACTIVE ENFORCED UTILITY PATENT
          </div>
          <div style={{ fontSize: 10, color: '#4E5A6A' }}>ORIGINAL FILING: {filingDate}</div>
        </div>
      </div>

      {/* Main CAD Interactive Schematic Canvas */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 480,
          marginTop: 24,
          transform: `scale(${blueprintEntrance}) perspective(1000px) rotateX(${explodedViewZOffset > 0 ? 3 : 0}deg)`,
          transformOrigin: 'center center',
        }}
      >
        {/* Animated Connecting Vector Pipes */}
        <svg
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            overflow: 'visible',
            pointerEvents: 'none',
          }}
        >
          <defs>
            <marker
              id="cyanArrow"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#00F0FF" />
            </marker>
            <marker
              id="crimsonArrow"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#FF2A55" />
            </marker>
          </defs>

          {connections.map((conn, idx) => {
            const from = nodes.find((n) => n.id === conn.fromNodeId);
            const to = nodes.find((n) => n.id === conn.toNodeId);
            if (!from || !to) return null;

            const startX = from.x + from.width;
            const startY = from.y + from.height / 2;
            const endX = to.x;
            const endY = to.y + to.height / 2;
            const midX = startX + (endX - startX) / 2;

            const pathData = `M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`;
            const strokeColor = conn.isPredatoryVector ? '#FF2A55' : '#00F0FF';

            return (
              <g key={`conn-${idx}`}>
                {/* Glow underlay */}
                <path
                  d={pathData}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth="4"
                  opacity={0.25 * strokeProgress}
                />
                {/* Precision dynamic stroke */}
                <path
                  d={pathData}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth="2"
                  strokeDasharray="1000"
                  strokeDashoffset={1000 * (1 - strokeProgress)}
                  markerEnd={conn.isPredatoryVector ? 'url(#crimsonArrow)' : 'url(#cyanArrow)'}
                />
                {/* Micro-label on vector */}
                {conn.label && (
                  <text
                    x={midX}
                    y={(startY + endY) / 2 - 10}
                    fill={strokeColor}
                    fontSize="10"
                    textAnchor="middle"
                    letterSpacing="0.08em"
                    fontWeight="600"
                    style={{
                      opacity: strokeProgress,
                      textShadow: '0 2px 8px rgba(0,0,0,0.9)',
                    }}
                  >
                    {conn.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* CAD Component Nodes */}
        {nodes.map((node) => {
          const isAlarm = node.category === 'manipulation';
          const borderColor = isAlarm ? '#FF2A55' : node.highlighted ? '#00F0FF' : 'rgba(255, 255, 255, 0.2)';
          const bgColor = isAlarm
            ? 'rgba(255, 42, 85, 0.08)'
            : node.highlighted
            ? 'rgba(0, 240, 255, 0.08)'
            : 'rgba(15, 20, 28, 0.85)';

          return (
            <div
              key={node.id}
              style={{
                position: 'absolute',
                left: node.x,
                top: node.y,
                width: node.width,
                height: node.height,
                backgroundColor: bgColor,
                border: `1.5px solid ${borderColor}`,
                borderRadius: 6,
                padding: '12px 16px',
                boxSizing: 'border-box',
                backdropFilter: 'blur(12px)',
                boxShadow: isAlarm
                  ? '0 0 25px rgba(255, 42, 85, 0.25)'
                  : node.highlighted
                  ? '0 0 25px rgba(0, 240, 255, 0.2)'
                  : '0 10px 30px rgba(0, 0, 0, 0.5)',
                transition: 'all 0.2s ease',
              }}
            >
              {/* Category Micro-Pill */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    color: isAlarm ? '#FF2A55' : '#00F0FF',
                  }}
                >
                  [{node.category.toUpperCase()}]
                </span>
                {node.sourcePatentClaim && (
                  <span style={{ fontSize: 9, color: '#7E8B9B' }}>
                    {node.sourcePatentClaim.split(':')[0]}
                  </span>
                )}
              </div>

              {/* Node Title */}
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: '#FFFFFF',
                  marginTop: 4,
                  letterSpacing: '0.04em',
                }}
              >
                {node.label}
              </div>

              {/* Forensic Subtext */}
              {node.subtext && (
                <div style={{ fontSize: 10, color: '#9AA7B6', marginTop: 6, lineHeight: 1.4 }}>
                  {node.subtext}
                </div>
              )}
            </div>
          );
        })}

        {/* Dynamic Sweeping Forensic Laser Line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: laserSweepX,
            width: 2,
            background: 'linear-gradient(180deg, transparent 0%, #00F0FF 40%, #FF2A55 60%, transparent 100%)',
            boxShadow: '0 0 16px #00F0FF',
            pointerEvents: 'none',
            opacity: 0.65,
          }}
        />
      </div>

      {/* Bottom Legal Claim Surgical Laser Highlight Box */}
      <div
        style={{
          marginTop: 10,
          backgroundColor: 'rgba(12, 16, 24, 0.95)',
          border: '1px solid rgba(255, 42, 85, 0.4)',
          borderLeft: '5px solid #FF2A55',
          borderRadius: 8,
          padding: '20px 24px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.8)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span
              style={{
                backgroundColor: 'rgba(255, 42, 85, 0.2)',
                border: '1px solid #FF2A55',
                color: '#FF2A55',
                fontSize: 10,
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: 3,
              }}
            >
              CRITICAL PATENT EVIDENCE
            </span>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#FFF' }}>
              {activeClaim.claimId}
            </span>
          </div>
          <span style={{ fontSize: 11, color: '#7E8B9B' }}>{activeClaim.filingDate}</span>
        </div>

        {/* Claim Text Excerpt */}
        <div
          style={{
            fontSize: 13,
            lineHeight: 1.6,
            color: '#E0E6ED',
            marginTop: 12,
            fontStyle: 'italic',
            borderLeft: '2px solid rgba(255,255,255,0.15)',
            paddingLeft: 14,
          }}
        >
          "{activeClaim.claimExcerpt}"
        </div>

        {/* Forensic Auditor Verdict */}
        <div
          style={{
            marginTop: 12,
            fontSize: 11,
            color: '#FF2A55',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#FF2A55' }} />
          <span>{activeClaim.forensicAuditVerdict}</span>
        </div>
      </div>
    </div>
  );
};
