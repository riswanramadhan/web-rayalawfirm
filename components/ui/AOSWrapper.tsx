'use client';

import { useEffect } from 'react';
import type { ReactNode } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface AOSWrapperProps {
  children: ReactNode;
}

const ENABLED_CLASS = 'aos-enabled';
let initialized = false;

/**
 * AOS hanya aktif setelah JavaScript berjalan dan pengguna tidak memilih
 * reduced motion. Selama kelas `aos-enabled` belum terpasang, globals.css
 * menjaga seluruh elemen [data-aos] tetap terlihat (aman untuk no-JS & LCP).
 */
export default function AOSWrapper({ children }: AOSWrapperProps) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const root = document.documentElement;
    // Kelas dipasang di tugas yang sama dengan init agar elemen di viewport
    // langsung mendapat .aos-animate tanpa berkedip.
    root.classList.add(ENABLED_CLASS);

    if (initialized) {
      AOS.refreshHard();
    } else {
      AOS.init({
        duration: 700,
        easing: 'ease-out-cubic',
        once: true,
        offset: 60,
      });
      initialized = true;
    }

    return () => {
      root.classList.remove(ENABLED_CLASS);
    };
  }, []);

  return <>{children}</>;
}
