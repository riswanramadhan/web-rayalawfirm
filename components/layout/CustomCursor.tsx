'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const scale = useMotionValue(1);

  const dotX = useSpring(mouseX, { stiffness: 700, damping: 25 });
  const dotY = useSpring(mouseY, { stiffness: 700, damping: 25 });

  const ringX = useSpring(mouseX, { stiffness: 200, damping: 35 });
  const ringY = useSpring(mouseY, { stiffness: 200, damping: 35 });

  const dotScale = useSpring(scale, { stiffness: 400, damping: 30 });
  const ringScale = useSpring(scale, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const updateMouse = (event: PointerEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };

    window.addEventListener('pointermove', updateMouse);
    return () => window.removeEventListener('pointermove', updateMouse);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const isInteractive = (el: HTMLElement | null) =>
      Boolean(el?.closest('a, button, [data-cursor-hover]'));

    const handleOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      if (isInteractive(target)) {
        scale.set(1.5);
      }
    };

    const handleOut = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      const related = event.relatedTarget as HTMLElement | null;

      if (isInteractive(target) && !isInteractive(related)) {
        scale.set(1);
      }
    };

    window.addEventListener('pointerover', handleOver);
    window.addEventListener('pointerout', handleOut);

    return () => {
      window.removeEventListener('pointerover', handleOver);
      window.removeEventListener('pointerout', handleOut);
    };
  }, [scale]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden lg:block">
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          scale: dotScale,
        }}
        className="fixed h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
      />
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          scale: ringScale,
        }}
        className="fixed h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary/60"
      />
    </div>
  );
}
