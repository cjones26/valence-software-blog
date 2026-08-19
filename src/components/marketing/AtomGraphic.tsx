import { useId } from 'react';
import AtomElectron from './AtomElectron';

interface AtomGraphicProps {
  /** 'card' (default): the animated foreground card, as used on desktop.
   *  'background': a large, faint, static watermark for behind mobile hero text. */
  variant?: 'card' | 'background';
}

export default function AtomGraphic({ variant = 'card' }: AtomGraphicProps) {
  const isBackground = variant === 'background';
  // Both variants can be mounted in the DOM at once (one just display:none at
  // the current breakpoint), so gradient/filter ids must be unique per
  // instance - duplicate SVG ids break url(#id) paint-server resolution.
  const uid = useId();
  const lineGradId = `heroLineGrad-${uid}`;
  const nucleusGradId = `heroNucleusGrad-${uid}`;
  const nucleusGlowGradId = `heroNucleusGlowGrad-${uid}`;
  const nucleusBlurId = `heroNucleusBlur-${uid}`;

  return (
    <div
      className={
        isBackground
          ? 'relative w-[640px] h-[640px] max-w-none opacity-[0.35]'
          : 'relative aspect-square w-full max-w-none rounded-2xl dark:bg-vs-bg-deep overflow-hidden'
      }
    >
      <svg
        viewBox="30 30 340 340"
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={lineGradId} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="var(--color-vs-blue)" />
            <stop offset="1" stopColor="var(--color-vs-cyan)" />
          </linearGradient>
          <radialGradient id={nucleusGradId} cx="32%" cy="28%" r="70%">
            <stop offset="0" stopColor="#7eeef2" />
            <stop offset="0.35" stopColor="var(--color-vs-cyan)" />
            <stop offset="1" stopColor="var(--color-vs-blue)" />
          </radialGradient>
          <radialGradient id={nucleusGlowGradId} cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="var(--color-vs-cyan)" stopOpacity="0.55" />
            <stop offset="1" stopColor="var(--color-vs-cyan)" stopOpacity="0" />
          </radialGradient>
          <filter id={nucleusBlurId} x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        <g transform="rotate(90 200 200)">
          <ellipse
            className="atom-orbit"
            cx="200"
            cy="200"
            rx="140"
            ry="50"
            stroke={`url(#${lineGradId})`}
            strokeWidth="1.5"
            fill="none"
            style={{ animationDelay: '0s' }}
          />
        </g>
        <g transform="rotate(150 200 200)">
          <ellipse
            className="atom-orbit"
            cx="200"
            cy="200"
            rx="140"
            ry="50"
            stroke={`url(#${lineGradId})`}
            strokeWidth="1.5"
            fill="none"
            style={{ animationDelay: '0.08s' }}
          />
        </g>
        <g transform="rotate(210 200 200)">
          <ellipse
            className="atom-orbit"
            cx="200"
            cy="200"
            rx="140"
            ry="50"
            stroke={`url(#${lineGradId})`}
            strokeWidth="1.5"
            fill="none"
            style={{ animationDelay: '0.16s' }}
          />
        </g>

        {/* angle=90/far and angle=150/far are the only rest positions that
            land inside the background variant's visible crop (Hero clips
            this graphic to -top-[310px] -right-[310px] of its 640px box,
            leaving only the lower-left slice on screen) - the other four
            rest or sweep entirely off-canvas there, so skip animating them. */}
        <AtomElectron angle={90} endpoint="far" direction="cw" delay={0.3} duration={0.6} fillId={nucleusGradId} />
        <AtomElectron angle={150} endpoint="far" direction="ccw" delay={0.38} duration={0.6} fillId={nucleusGradId} />
        {!isBackground && (
          <>
            <AtomElectron angle={90} endpoint="near" direction="cw" delay={0.3} duration={0.6} fillId={nucleusGradId} />
            <AtomElectron angle={150} endpoint="near" direction="ccw" delay={0.38} duration={0.6} fillId={nucleusGradId} />
            <AtomElectron angle={210} endpoint="far" direction="cw" delay={0.46} duration={0.6} fillId={nucleusGradId} />
            <AtomElectron angle={210} endpoint="near" direction="cw" delay={0.46} duration={0.6} fillId={nucleusGradId} />
          </>
        )}

        <g className="atom-nucleus" style={{ animationDelay: '0.2s' }}>
          <circle
            cx="200"
            cy="200"
            r="26"
            fill={`url(#${nucleusGlowGradId})`}
            filter={`url(#${nucleusBlurId})`}
          />
          <circle cx="200" cy="200" r="14" fill={`url(#${nucleusGradId})`} />
          <ellipse cx="195" cy="194" rx="4" ry="2.6" fill="#ffffff" opacity="0.65" />
        </g>
      </svg>
    </div>
  );
}
