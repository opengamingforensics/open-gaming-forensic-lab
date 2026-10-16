/**
 * index.ts
 * Mobile Dissection OS (移动视网膜解构视窗 / 赛博法医实验台)
 * Open Gaming Forensic Lab (OGFL) - Unified Master Export & Composition Timeline
 */

import React from 'react';
import { Composition, Sequence } from 'remotion';
import { DeviceNativeMicroViewport } from './DeviceNativeMicroViewport';
import { PatentCADBlueprintAssembly } from './PatentCADBlueprintAssembly';
import { FinancialDopamineFlowCanvas } from './FinancialDopamineFlowCanvas';
import { PanaceaAestheticShift } from './PanaceaAestheticShift';

export * from './types';
export * from './DeviceNativeMicroViewport';
export * from './PatentCADBlueprintAssembly';
export * from './FinancialDopamineFlowCanvas';
export * from './PanaceaAestheticShift';

/**
 * OGFLMasterEpisodeSequence
 * 
 * Demonstrates a complete 4-Act narrative sequence across a standard episode:
 * - 00:00 - 02:00 (Frames 0 - 7200): Act 1 & 2 Micro-Viewport & Dark Pattern Tracking
 * - 02:00 - 04:30 (Frames 7200 - 16200): Act 2 Patent CAD Exploded Assembly
 * - 04:30 - 07:00 (Frames 16200 - 25200): Act 3 Capital & Dopamine Flow Waterfall
 * - 07:00 - 09:30 (Frames 25200 - 34200): Act 4 The Panacea Aesthetic Polarity Shift
 */
export const OGFLMasterEpisodeSequence: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: '#08090C' }}>
      {/* Act 1: True Hardware Micro-Viewport with Telemetry HUD */}
      <Sequence from={0} durationInFrames={360}>
        <DeviceNativeMicroViewport />
      </Sequence>

      {/* Act 2: Patent CAD Blueprint Assembly */}
      <Sequence from={360} durationInFrames={360}>
        <PatentCADBlueprintAssembly
          patentId="US20160001182A1"
          title="DYNAMIC DIFFICULTY ADJUSTMENT SYSTEM"
          assignee="ELECTRONIC ARTS INC."
          filingDate="2016-01-07"
          nodes={[
            {
              id: 'node-telemetry',
              label: '01. REAL-TIME PLAYER TELEMETRY',
              category: 'input',
              x: 100,
              y: 180,
              width: 280,
              height: 90,
              highlighted: false,
              subtext: 'Session duration, loss streak, historical spend rate',
            },
            {
              id: 'node-churn-predictor',
              label: '02. CHURN PREDICTION ENGINE',
              category: 'algorithm',
              x: 480,
              y: 180,
              width: 320,
              height: 90,
              highlighted: true,
              subtext: 'Markov probability: P(Churn | Defeat >= 3)',
            },
            {
              id: 'node-monetization-trigger',
              label: '03. TARGETED TRANSACTION TRIGGER',
              category: 'manipulation',
              x: 920,
              y: 180,
              width: 340,
              height: 90,
              highlighted: true,
              subtext: 'Dynamic IAP discount injected upon high churn risk',
            },
          ]}
          connections={[
            { fromNodeId: 'node-telemetry', toNodeId: 'node-churn-predictor', label: 'Telemetry Stream (60Hz)' },
            { fromNodeId: 'node-churn-predictor', toNodeId: 'node-monetization-trigger', label: 'P(Churn) > 0.85', isPredatoryVector: true },
          ]}
        />
      </Sequence>

      {/* Act 3: Bloomberg/Stripe Financial Flow Topology */}
      <Sequence from={720} durationInFrames={360}>
        <FinancialDopamineFlowCanvas
          grossPackPriceUsd={99.99}
          grossPackVirtualCurrencyLabel="6,480 CRYSTALS"
          breakdown={[
            {
              id: 'node-player',
              title: 'PLAYER CREDIT CARD',
              subtitle: 'Gross consumer fiat outflow',
              amountUsd: 99.99,
              percentageOfGross: 100,
              jurisdictionOrEntity: 'US/EU Retail Consumer',
              category: 'player-outflow',
            },
            {
              id: 'node-apple',
              title: 'APPLE 30% PLATFORM TOLL',
              subtitle: 'Walled garden app distribution tax',
              amountUsd: 29.99,
              percentageOfGross: 30,
              jurisdictionOrEntity: 'Cupertino, CA',
              category: 'platform-tax',
            },
            {
              id: 'node-ua',
              title: 'UA AD-ARBITRAGE MACHINE',
              subtitle: 'Programmatic bidding on AppLovin/TikTok',
              amountUsd: 52.00,
              percentageOfGross: 52,
              jurisdictionOrEntity: 'Ad-Tech DSP/SSP',
              category: 'ua-ad-network',
            },
            {
              id: 'node-offshore',
              title: 'OFFSHORE NET EXTRACTION',
              subtitle: 'Limassol shell company dividend payout',
              amountUsd: 18.00,
              percentageOfGross: 18,
              jurisdictionOrEntity: 'Cyprus / Cayman Shell',
              category: 'offshore-profit',
            },
          ]}
          dopamineExploitationIndex={88.4}
        />
      </Sequence>

      {/* Act 4: The Panacea Aesthetic Shift */}
      <Sequence from={1080} durationInFrames={400}>
        <PanaceaAestheticShift
          currentPhase="panacea-warm"
          transitionProgress={1.0}
          indieTitle="BALATRO"
          indieStudio="LocalThunk (Published by Playstack)"
          monetizationModel="Flat Purchase ($9.99)"
          ethicAuditScore="100/100 FORENSIC CLEAN"
        />
      </Sequence>
    </div>
  );
};

/**
 * Registering the Remotion Composition for 4K 60fps Broadcast Rendering
 */
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="OGFL-Master-Dissection-OS"
        component={OGFLMasterEpisodeSequence}
        durationInFrames={1480}
        fps={60}
        width={1920}
        height={1080}
      />
    </>
  );
};
