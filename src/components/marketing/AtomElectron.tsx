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
  /** Always render the static rest position, skipping the orbit animation. */
  forceStatic?: boolean;
  /** id of the radialGradient (defined by the parent AtomGraphic) to fill with. */
  fillId: string;
}

const ORBIT_PATHS = {
  far: {
    cw: 'M 340 200 A 140 50 0 1 1 60 200 A 140 50 0 1 1 340 200',
    ccw: 'M 340 200 A 140 50 0 1 0 60 200 A 140 50 0 1 0 340 200',
  },
  near: {
    cw: 'M 60 200 A 140 50 0 1 1 340 200 A 140 50 0 1 1 60 200',
    ccw: 'M 60 200 A 140 50 0 1 0 340 200 A 140 50 0 1 0 60 200',
  },
};
const REST_X = { far: 340, near: 60 };

export default function AtomElectron({ angle, delay, duration, endpoint, direction, forceStatic, fillId }: AtomElectronProps) {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    if (forceStatic) return;
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => setIsAnimated(!query.matches);
    handleChange();
    query.addEventListener('change', handleChange);
    return () => query.removeEventListener('change', handleChange);
  }, [forceStatic]);

  return (
    <g transform={`rotate(${angle} 200 200)`}>
      {isAnimated && !forceStatic ? (
        <circle
          className="atom-electron"
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
        <circle cx={REST_X[endpoint]} cy="200" r="6" fill={`url(#${fillId})`} />
      )}
    </g>
  );
}
