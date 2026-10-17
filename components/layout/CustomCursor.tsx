'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// framer-motion hanya diunduh di desktop dengan mouse (bukan di HP).
const CursorDots = dynamic(() => import('./CustomCursorDots'), { ssr: false });

const CURSOR_QUERY = '(min-width: 1024px) and (hover: hover) and (pointer: fine)';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

/**
 * Kursor kustom hanya untuk perangkat dengan pointer presisi (mouse/trackpad)
 * dan tanpa preferensi reduced motion. Di layar sentuh komponen ini tidak
 * memasang listener maupun merender apa pun.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const cursorQuery = window.matchMedia(CURSOR_QUERY);
    const motionQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    const evaluate = () => setEnabled(cursorQuery.matches && !motionQuery.matches);

    evaluate();
    cursorQuery.addEventListener('change', evaluate);
    motionQuery.addEventListener('change', evaluate);

    return () => {
      cursorQuery.removeEventListener('change', evaluate);
      motionQuery.removeEventListener('change', evaluate);
    };
  }, []);

  if (!enabled) return null;

  return <CursorDots />;
}
