'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const ACTIVE_CLASS = 'has-custom-cursor';

export default function CursorDots() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const scale = useMotionValue(1);
  const [visible, setVisible] = useState(false);

  const dotX = useSpring(mouseX, { stiffness: 700, damping: 25 });
  const dotY = useSpring(mouseY, { stiffness: 700, damping: 25 });
  const ringX = useSpring(mouseX, { stiffness: 200, damping: 35 });
  const ringY = useSpring(mouseY, { stiffness: 200, damping: 35 });
  const dotScale = useSpring(scale, { stiffness: 400, damping: 30 });
  const ringScale = useSpring(scale, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add(ACTIVE_CLASS);

    const isInteractive = (el: EventTarget | null) =>
      el instanceof Element && Boolean(el.closest('a, button, summary, label, [data-cursor-hover]'));

    const handleMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
      setVisible(true);
    };

    const handleOver = (event: PointerEvent) => {
      if (isInteractive(event.target)) scale.set(1.5);
    };

    const handleOut = (event: PointerEvent) => {
      if (isInteractive(event.target) && !isInteractive(event.relatedTarget)) scale.set(1);
    };

    const handleLeave = () => setVisible(false);

    window.addEventListener('pointermove', handleMove, { passive: true });
    window.addEventListener('pointerover', handleOver, { passive: true });
    window.addEventListener('pointerout', handleOut, { passive: true });
    document.addEventListener('mouseleave', handleLeave);

    return () => {
      root.classList.remove(ACTIVE_CLASS);
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerover', handleOver);
      window.removeEventListener('pointerout', handleOut);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, [mouseX, mouseY, scale]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-200 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          scale: dotScale,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="fixed left-0 top-0 h-3 w-3 rounded-full bg-primary"
      />
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          scale: ringScale,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="fixed left-0 top-0 h-8 w-8 rounded-full border-2 border-primary/60"
      />
    </div>
  );
}
