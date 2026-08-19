import AtomElectron from './AtomElectron';

export default function AtomGraphic() {
  return (
    <div className="relative hidden lg:block aspect-square rounded-2xl bg-vs-bg-deep overflow-hidden">
      <svg
        viewBox="0 0 400 400"
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="heroLineGrad" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="var(--color-vs-blue)" />
            <stop offset="1" stopColor="var(--color-vs-cyan)" />
          </linearGradient>
          <radialGradient id="heroNucleusGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0" stopColor="var(--color-vs-cyan)" />
            <stop offset="1" stopColor="var(--color-vs-blue)" />
          </radialGradient>
        </defs>

        <ellipse
          className="atom-orbit"
          cx="200"
          cy="200"
          rx="140"
          ry="50"
          stroke="url(#heroLineGrad)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
          transform="rotate(90 200 200)"
          style={{ animationDelay: '0s' }}
        />
        <ellipse
          className="atom-orbit"
          cx="200"
          cy="200"
          rx="140"
          ry="50"
          stroke="url(#heroLineGrad)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
          transform="rotate(150 200 200)"
          style={{ animationDelay: '0.08s' }}
        />
        <ellipse
          className="atom-orbit"
          cx="200"
          cy="200"
          rx="140"
          ry="50"
          stroke="url(#heroLineGrad)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
          transform="rotate(210 200 200)"
          style={{ animationDelay: '0.16s' }}
        />

        <AtomElectron angle={90} endpoint="far" direction="cw" delay={0.3} duration={0.6} />
        <AtomElectron angle={90} endpoint="near" direction="cw" delay={0.3} duration={0.6} />
        <AtomElectron angle={150} endpoint="far" direction="ccw" delay={0.3} duration={0.6} />
        <AtomElectron angle={150} endpoint="near" direction="ccw" delay={0.3} duration={0.6} />
        <AtomElectron angle={210} endpoint="far" direction="cw" delay={0.3} duration={0.6} />
        <AtomElectron angle={210} endpoint="near" direction="cw" delay={0.3} duration={0.6} />

        <circle
          className="atom-nucleus"
          cx="200"
          cy="200"
          r="14"
          fill="url(#heroNucleusGrad)"
          style={{ animationDelay: '0.2s' }}
        />
      </svg>
    </div>
  );
}
