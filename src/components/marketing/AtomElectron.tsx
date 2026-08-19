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
  /** Sweep along the orbit path on entrance; false just fades/scales in at rest. */
  sweep: boolean;
  /** id of the radialGradient (defined by the parent AtomGraphic) to fill with. */
  fillId: string;
}

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

export default function AtomElectron({ angle, delay, duration, endpoint, direction, sweep, fillId }: AtomElectronProps) {
  // Defaults to false so animateMotion renders from the first paint instead
  // of being added a tick after mount; only removed post-mount for the rare
  // reduced-motion visitor.
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => setReducedMotion(query.matches);
    handleChange();
    query.addEventListener('change', handleChange);
    return () => query.removeEventListener('change', handleChange);
  }, []);

  return (
    <g transform={`rotate(${angle} 200 200)`}>
      {sweep && !reducedMotion ? (
        <circle
          className="atom-electron"
          cx={REST_X[endpoint]}
          cy="200"
          r="6"
          fill={`url(#${fillId})`}
          style={{ animationDelay: `${delay}s` }}
        >
          <animateMotion
            path={ORBIT_PATHS[endpoint][direction]}
            begin={`${delay}s`}
            dur={`${duration}s`}
            fill="freeze"
            calcMode="spline"
            keyTimes="0;1"
            keySplines="0.4 0 0.2 1"
          />
        </circle>
      ) : (
        <circle
          className="atom-electron-static"
          cx={REST_X[endpoint]}
          cy="200"
          r="6"
          fill={`url(#${fillId})`}
          style={{ animationDelay: `${delay}s` }}
        />
      )}
    </g>
  );
}
