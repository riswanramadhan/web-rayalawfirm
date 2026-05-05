'use client';

import { useEffect } from 'react';
import type { ReactNode } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface AOSWrapperProps {
  children: ReactNode;
}

export default function AOSWrapper({ children }: AOSWrapperProps) {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80,
    });
  }, []);

  return <>{children}</>;
}
