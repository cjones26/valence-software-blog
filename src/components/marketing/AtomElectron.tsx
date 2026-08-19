'use client';

import { useEffect, useState } from 'react';

interface AtomElectronProps {
  angle: number;
  delay: number;
  duration: number;
  /** Which end of the orbit's major axis this electron rests on. */
  endpoint: 'far' | 'near';
  /** Rotational direction; same-orbit far/near pairs must share a direction
   *  to stay antipodal the whole lap and never collide. */
  direction: 'cw' | 'ccw';
  /** id of the radialGradient (defined by the parent AtomGraphic) to fill with. */
  fillId: string;
}

// Relative to the circle's own cx/cy (its rest position) - animateMotion
// translates an element in ADDITION to its own position, not in place of it,
// so these paths loop back to (0, 0) rather than to the rest coordinate
// itself. This also means a circle with no animateMotion at all (or one that
// never gets to run, e.g. a backgrounded tab during the entrance animation)
// still renders at the correct rest position instead of the SVG default
// origin (0, 0), which is off-canvas for this viewBox.
const ORBIT_PATHS = {
  far: {
    cw: 'M 0 0 A 140 50 0 1 1 -280 0 A 140 50 0 1 1 0 0',
    ccw: 'M 0 0 A 140 50 0 1 0 -280 0 A 140 50 0 1 0 0 0',
  },
  near: {
    cw: 'M 0 0 A 140 50 0 1 1 280 0 A 140 50 0 1 1 0 0',
    ccw: 'M 0 0 A 140 50 0 1 0 280 0 A 140 50 0 1 0 0 0',
  },
};
const REST_X = { far: 340, near: 60 };

export default function AtomElectron({ angle, delay, duration, endpoint, direction, fillId }: AtomElectronProps) {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => setIsAnimated(!query.matches);
    handleChange();
    query.addEventListener('change', handleChange);
    return () => query.removeEventListener('change', handleChange);
  }, []);

  return (
    <g transform={`rotate(${angle} 200 200)`}>
      <circle
        className="atom-electron"
        cx={REST_X[endpoint]}
        cy="200"
        r="6"
        fill={`url(#${fillId})`}
        style={{ animationDelay: `${delay}s` }}
      >
        {isAnimated && (
          <animateMotion
            path={ORBIT_PATHS[endpoint][direction]}
            begin={`${delay}s`}
            dur={`${duration}s`}
            fill="freeze"
            calcMode="spline"
            keyTimes="0;1"
            keySplines="0.4 0 0.2 1"
          />
        )}
      </circle>
    </g>
  );
}
