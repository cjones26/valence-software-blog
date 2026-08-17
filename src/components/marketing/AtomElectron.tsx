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
}

// SVG's native animateMotion is used instead of the CSS offset-path
// equivalent: offset-path renders correctly in Chromium for this nested
// rotated-<g> case but drifts noticeably off the ellipse in Firefox
// (verified empirically), while animateMotion has been consistently
// correct across browsers for two decades.
//
// Each orbit's own major axis has two tips, at local (340,200) and
// (60,200) - these are the "corner" points where the flower-shaped
// composite of three tilted orbits is most visually prominent. The sweep
// flag (the second "1"/"0" in each arc command) controls which way around
// the ellipse the electron travels.
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

export default function AtomElectron({ angle, delay, duration, endpoint, direction }: AtomElectronProps) {
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
      {isAnimated ? (
        <circle
          className="atom-electron"
          r="6"
          fill="url(#heroNucleusGrad)"
          style={{ animationDelay: `${delay}s` }}
        >
          <animateMotion
            path={ORBIT_PATHS[endpoint][direction]}
            begin={`${delay}s`}
            dur={`${duration}s`}
            fill="freeze"
            calcMode="linear"
          />
        </circle>
      ) : (
        <circle cx={REST_X[endpoint]} cy="200" r="6" fill="url(#heroNucleusGrad)" />
      )}
    </g>
  );
}
