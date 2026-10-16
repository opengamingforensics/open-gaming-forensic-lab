/**
 * FinancialDopamineFlowCanvas.tsx
 * Module 3: 资金与多巴胺流向画布（Financial & Dopamine Flow Canvas）
 * 
 * Open Gaming Forensic Lab (OGFL) - Broadcast Video UI Architecture
 * 
 * Stripe / Bloomberg Terminal-grade capital routing topology.
 * Penetrates the illusion of in-game crystals to expose the exact pipeline:
 * Player Wallet -> Apple 30% Toll -> UA Ad Loop (AppLovin/TikTok) -> Cyprus Shell Co.
 */

import React, { useMemo } from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { FinancialDopamineFlowCanvasProps, FlowNode } from './types';

export const FinancialDopamineFlowCanvas: React.FC<FinancialDopamineFlowCanvasProps> = ({
  grossPackPriceUsd = 99.99,
  grossPackVirtualCurrencyLabel = '6,480 PRISTINE ASTRAL GEMS',
  breakdown = [
    {
      id: 'node-player',
      title: 'PLAYER CREDIT / WALLET',
      subtitle: 'Immediate disposable income extraction',
      amountUsd: 99.99,
      percentageOfGross: 100,
      jurisdictionOrEntity: 'US / EU Retail Consumer',
      category: 'player-outflow',
    },
    {
      id: 'node-apple',
      title: 'PLATFORM 30% TOLL',
      subtitle: 'Non-negotiable app store monopoly cut',
      amountUsd: 29.99,
      percentageOfGross: 30,
      jurisdictionOrEntity: 'Apple Inc. (Cupertino, CA)',
      category: 'platform-tax',
    },
    {
      id: 'node-ua',
      title: 'UA REINVESTMENT LOOP',
      subtitle: 'Programmatic algorithmic bidding (CPI arbitrage)',
      amountUsd: 52.00,
      percentageOfGross: 52,
      jurisdictionOrEntity: 'AppLovin / Unity / TikTok Ads',
      category: 'ua-ad-network',
    },
    {
      id: 'node-offshore',
      title: 'OFFSHORE NET PROFIT',
      subtitle: 'Zero R&D tax shelter entity',
      amountUsd: 18.00,
      percentageOfGross: 18,
      jurisdictionOrEntity: 'Cyprus (Limassol) / BVI Holding Co.',
      category: 'offshore-profit',
    },
  ],
  dopamineExploitationIndex = 88.4,
  secFilingTickerRef = 'EA (10-K Live Services: $5.44B Net Bookings)',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const canvasEntrance = spring({
    frame,
    fps,
    config: { damping: 28, mass: 0.9, stiffness: 160 },
  });

  // Animated tick ticker
  const activeCycleTick = frame * 1.5;
  const dopamineOscillation = Math.sin(frame * 0.08) * 3.5;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: '#07090E',
        overflow: 'hidden',
        fontFamily: "'SF Mono', 'JetBrains Mono', 'Geist Mono', monospace",
        color: '#F4F6F8',
        boxSizing: 'border-box',
        padding: '36px 54px',
      }}
    >
      {/* Bloomberg-Style Dense Top Header Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
          paddingBottom: 14,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              padding: '3px 8px',
              backgroundColor: '#FF2A55',
              color: '#FFF',
              fontSize: 10,
              fontWeight: 800,
              borderRadius: 2,
              letterSpacing: '0.1em',
            }}
          >
            TERMINAL AUDIT
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', color: '#FFF' }}>
            CAPITAL & NEUROCHEMICAL EXTRACTION PIPELINE
          </span>
          <span style={{ fontSize: 11, color: '#7E8B9B' }}>
            REF 10-K / SEC DOCKET: {secFilingTickerRef}
          </span>
        </div>

        {/* Live Tick Metric */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 11 }}>
          <div style={{ color: '#00F0FF' }}>
            LIVE CYCLE TICK: #{Math.round(activeCycleTick)}
          </div>
          <div style={{ color: '#FF2A55', fontWeight: 700 }}>
            DOPAMINE VOLATILITY: {(dopamineExploitationIndex + dopamineOscillation).toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Main Waterfall Topology Stage */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 520,
          marginTop: 28,
          transform: `scale(${canvasEntrance})`,
          opacity: canvasEntrance,
        }}
      >
        {/* Animated Particle Tracks SVG */}
        <svg
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
        >
          {/* Connecting Waterfall Channels */}
          <path
            d="M 280 180 C 400 180, 420 110, 560 110"
            fill="none"
            stroke="rgba(255, 42, 85, 0.35)"
            strokeWidth="3"
            strokeDasharray="6 4"
          />
          <path
            d="M 280 180 C 400 180, 420 250, 560 250"
            fill="none"
            stroke="rgba(0, 240, 255, 0.45)"
            strokeWidth="4"
          />
          <path
            d="M 880 250 C 980 250, 1000 380, 1100 380"
            fill="none"
            stroke="rgba(0, 240, 255, 0.35)"
            strokeWidth="3"
            strokeDasharray="6 4"
          />
        </svg>

        {/* Node 1: The Player Wallet (Source of Truth) */}
        <div
          style={{
            position: 'absolute',
            left: 20,
            top: 100,
            width: 290,
            backgroundColor: 'rgba(15, 18, 25, 0.95)',
            border: '1.5px solid rgba(255, 255, 255, 0.2)',
            borderLeft: '5px solid #FFFFFF',
            borderRadius: 8,
            padding: 18,
            boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
          }}
        >
          <div style={{ fontSize: 9, color: '#7E8B9B', letterSpacing: '0.1em' }}>
            [01. CAPITAL GENESIS]
          </div>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#FFF', marginTop: 4 }}>
            PLAYER CREDIT / FIAT
          </div>
          <div style={{ fontSize: 26, fontWeight: 800, color: '#FF2A55', marginTop: 10 }}>
            -${grossPackPriceUsd.toFixed(2)} USD
          </div>
          <div
            style={{
              fontSize: 10,
              color: '#00F0FF',
              marginTop: 6,
              backgroundColor: 'rgba(0, 240, 255, 0.1)',
              padding: '3px 6px',
              borderRadius: 3,
              display: 'inline-block',
            }}
          >
            VIRTUAL TOKEN CONVERSION: {grossPackVirtualCurrencyLabel}
          </div>
          <div style={{ fontSize: 10, color: '#7E8B9B', marginTop: 10, lineHeight: 1.4 }}>
            De-anchored via multi-tier virtual currencies to suppress consumer spending awareness.
          </div>
        </div>

        {/* Node 2: Apple / Google Platform Tax */}
        <div
          style={{
            position: 'absolute',
            left: 560,
            top: 40,
            width: 320,
            backgroundColor: 'rgba(15, 18, 25, 0.95)',
            border: '1.5px solid rgba(255, 255, 255, 0.12)',
            borderLeft: '5px solid #FF9900',
            borderRadius: 8,
            padding: 18,
            boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 9, color: '#FF9900', letterSpacing: '0.1em', fontWeight: 700 }}>
              [02. PLATFORM MONOPOLY TOLL]
            </span>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#FF9900' }}>30.0% CUT</span>
          </div>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#FFF', marginTop: 4 }}>
            APPLE / GOOGLE STORE TAX
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#FF9900', marginTop: 8 }}>
            -$29.99 USD
          </div>
          <div style={{ fontSize: 10, color: '#9AA7B6', marginTop: 6 }}>
            Cupertino App Store ecosystem enforcement. Zero payment competition permitted on iOS.
          </div>
        </div>

        {/* Node 3: The UA Reinvestment Machine (The Predatory Engine) */}
        <div
          style={{
            position: 'absolute',
            left: 560,
            top: 200,
            width: 360,
            backgroundColor: 'rgba(20, 10, 15, 0.95)',
            border: '1.5px solid #FF2A55',
            borderLeft: '5px solid #FF2A55',
            borderRadius: 8,
            padding: 18,
            boxShadow: '0 0 35px rgba(255, 42, 85, 0.25)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 9, color: '#FF2A55', letterSpacing: '0.1em', fontWeight: 700 }}>
              [03. THE ALGORITHMIC RE-BUY BLACKHOLE]
            </span>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#FF2A55' }}>52.0% REINVESTED</span>
          </div>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#FFF', marginTop: 4 }}>
            USER ACQUISITION (UA) AD BIDDING
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#FF2A55', marginTop: 8 }}>
            -$52.00 USD
          </div>
          <div style={{ fontSize: 10, color: '#E0E6ED', marginTop: 6, lineHeight: 1.4 }}>
            Instant injection into <strong>AppLovin, IronSource & TikTok Ads</strong> to purchase new "Whale" installs at $60-$120 CPI.
          </div>
          <div
            style={{
              fontSize: 9,
              color: '#FF2A55',
              marginTop: 10,
              fontWeight: 700,
              backgroundColor: 'rgba(255,42,85,0.15)',
              padding: '4px 6px',
              borderRadius: 3,
            }}
          >
            ★ REALITY: The game does not invest in game design; it operates as an ad-arbitrage fund.
          </div>
        </div>

        {/* Node 4: Offshore Arbitrage Holding Shell */}
        <div
          style={{
            position: 'absolute',
            left: 1080,
            top: 310,
            width: 330,
            backgroundColor: 'rgba(12, 18, 26, 0.95)',
            border: '1.5px solid #00F0FF',
            borderLeft: '5px solid #00F0FF',
            borderRadius: 8,
            padding: 18,
            boxShadow: '0 0 35px rgba(0, 240, 255, 0.2)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 9, color: '#00F0FF', letterSpacing: '0.1em', fontWeight: 700 }}>
              [04. ULTIMATE REVENUE EXTRACTION]
            </span>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#00F0FF' }}>18.0% NET</span>
          </div>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#FFF', marginTop: 4 }}>
            CYPRUS / BVI HOLDING ENTITY
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#00F0FF', marginTop: 8 }}>
            +$18.00 USD NET MARGIN
          </div>
          <div style={{ fontSize: 10, color: '#9AA7B6', marginTop: 6, lineHeight: 1.4 }}>
            Registered in Limassol or Road Town. Zero local creative development; pure tax-arbitraged dividends.
          </div>
        </div>
      </div>

      {/* Bottom Forensic Summary Ticker Bar */}
      <div
        style={{
          marginTop: 12,
          padding: '12px 18px',
          backgroundColor: 'rgba(15, 20, 28, 0.9)',
          borderRadius: 6,
          border: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 11,
          color: '#9AA7B6',
        }}
      >
        <div>
          <span style={{ color: '#FF2A55', fontWeight: 700 }}>FORENSIC REVELATION:</span> For every $100 spent on mobile microtransactions, less than <strong>$3</strong> goes to actual gameplay engineering.
        </div>
        <div style={{ color: '#00F0FF', fontWeight: 600 }}>
          OSINT SOURCE: SEC FORM 10-K & AD-TECH FINANCIAL DISCLOSURES
        </div>
      </div>
    </div>
  );
};
