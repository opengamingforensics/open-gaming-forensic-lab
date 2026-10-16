/**
 * Mobile Dissection OS (移动视网膜解构视窗 / 赛博法医实验台)
 * Core TypeScript Definitions & Animation Physics Interfaces
 * Open Gaming Forensic Lab (OGFL) - Broadcast Video UI Architecture
 */

export type AspectRatio = '16:9' | '9:16' | '1:1';

export type AestheticPhase = 'forensic-dark' | 'panacea-warm';

export interface TouchCoordinate {
  x: number; // 0.0 to 1.0 (relative to device screen)
  y: number; // 0.0 to 1.0
  timestampSec: number;
  pressure?: number; // 0.0 to 1.0
  gestureType: 'tap' | 'swipe' | 'hold' | 'drag';
}

export interface HUDTargetItem {
  id: string;
  label: string;
  screenBoundingBox: {
    x: number; // Percentage 0 - 100 relative to screen
    y: number;
    width: number;
    height: number;
  };
  alarmLevel: 'nominal' | 'warning' | 'critical';
  telemetry: {
    realTimePsychologicalPrice: string; // e.g., "$99.99 = 4.8h Avg US Wage"
    hiddenMarkovOdds: string;           // e.g., "P(drop)=0.006 (Soft Pity @ 74)"
    fomoDecayIndex: number;            // 0 - 100
    fomoCountdownSecRemaining?: number;
    manipulationMechanism: string;      // e.g., "Near-Miss Hedonic Treadmill"
  };
  leaderLineTargetSide: 'right' | 'left' | 'top' | 'bottom';
}

export interface DeviceViewportConfig {
  deviceModel: 'Titanium-16-Pro' | 'Titanium-Max' | 'Titanium-Pad';
  aspectRatio: string;
  screenWidth: number;
  screenHeight: number;
  bezelThicknessPx: number;
  subpixelDiffusionGlow: boolean;
  frameRate: 60;
}

export interface DeviceNativeMicroViewportProps {
  deviceConfig?: DeviceViewportConfig;
  videoSourceUrl?: string; // Captured 60fps raw footage
  screenPosterUrl?: string;
  activeTouchPoints?: TouchCoordinate[];
  trackedElements?: HUDTargetItem[];
  showCoordinateGrid?: boolean;
  frameIndex?: number;
}

// -------------------------------------------------------------
// Patent CAD Blueprint Assembly Types
// -------------------------------------------------------------

export interface CADNode {
  id: string;
  label: string;
  category: 'input' | 'algorithm' | 'manipulation' | 'output';
  x: number; // CAD grid units
  y: number;
  width: number;
  height: number;
  highlighted: boolean;
  subtext?: string;
  sourcePatentClaim?: string; // e.g., "Claim 4: Dynamic Difficulty Adjuster"
}

export interface CADConnection {
  fromNodeId: string;
  toNodeId: string;
  label?: string;
  bidirectional?: boolean;
  isPredatoryVector?: boolean;
}

export interface PatentClaimHighlight {
  patentNumber: string; // e.g. "US20160001182A1"
  assignee: string;     // e.g. "Electronic Arts Inc."
  filingDate: string;
  claimId: string;
  claimExcerpt: string;
  forensicAuditVerdict: string;
}

export interface PatentCADBlueprintAssemblyProps {
  patentId: string;
  title: string;
  assignee: string;
  filingDate: string;
  nodes: CADNode[];
  connections: CADConnection[];
  activeClaim?: PatentClaimHighlight;
  explodedViewZOffset?: number; // 3D depth exploded layers
  laserScanProgress?: number;   // 0.0 to 1.0
}

// -------------------------------------------------------------
// Financial & Dopamine Flow Canvas Types
// -------------------------------------------------------------

export interface FlowNode {
  id: string;
  title: string;
  subtitle: string;
  amountUsd: number;
  percentageOfGross: number;
  jurisdictionOrEntity: string;
  category: 'player-outflow' | 'platform-tax' | 'ua-ad-network' | 'offshore-profit';
}

export interface CapitalParticle {
  id: string;
  fromNodeId: string;
  toNodeId: string;
  currentProgress: number; // 0.0 to 1.0
  valueUsd: number;
  colorHex: string;
}

export interface FinancialDopamineFlowCanvasProps {
  grossPackPriceUsd: number; // e.g., 99.99
  grossPackVirtualCurrencyLabel: string; // e.g., "6480 Pristine Crystals"
  breakdown: FlowNode[];
  dopamineExploitationIndex: number; // 0 - 100
  secFilingTickerRef?: string; // e.g. "EA (10-K Live Services: $5.44B)"
  activeCycleTick?: number;
}

// -------------------------------------------------------------
// The Panacea Aesthetic Shift Types
// -------------------------------------------------------------

export interface PanaceaAestheticShiftProps {
  currentPhase: AestheticPhase;
  transitionProgress: number; // 0.0 (Forensic Dark) -> 1.0 (Panacea Organic Warm)
  indieTitle: string;
  indieStudio: string;
  monetizationModel: 'Flat Purchase ($9.99)' | 'Open Source' | 'Pay-Once Complete';
  ethicAuditScore: string; // e.g. "100/100 Forensic Clean"
  children?: React.ReactNode;
}
