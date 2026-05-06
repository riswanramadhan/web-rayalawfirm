'use client';

import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

interface DropdownLink {
  label: string;
  href: string;
}

interface NavLink {
  label: string;
  href: string;
  dropdown?: DropdownLink[];
}

const layananLinks: DropdownLink[] = [
  { label: 'Hukum Pidana', href: '/layanan/hukum-pidana' },
  { label: 'Hukum Perdata', href: '/layanan/hukum-perdata' },
  { label: 'Hukum Bisnis', href: '/layanan/hukum-bisnis' },
  { label: 'Hukum Keluarga', href: '/layanan/hukum-keluarga' },
  { label: 'Hukum Properti', href: '/layanan/hukum-properti' },
  { label: 'Ketenagakerjaan', href: '/layanan/hukum-ketenagakerjaan' },
];

const navLinks: NavLink[] = [
  { label: 'Beranda', href: '/' },
  { label: 'Tentang', href: '/tentang' },
  { label: 'Layanan', href: '/layanan', dropdown: layananLinks },
  { label: 'Tim', href: '/tim' },
  { label: 'Artikel', href: '/artikel' },
  { label: 'Konsultasi', href: '/konsultasi' },
];

type DropdownKey = 'layanan' | null;

export default function Navbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const lockBodyScroll = () => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.body.style.overscrollBehavior = 'none';
    document.body.classList.add('menu-open');
  };

  const unlockBodyScroll = () => {
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    document.body.style.overscrollBehavior = '';
    document.body.classList.remove('menu-open');
    setIsScrolled(window.scrollY > 50);
  };

  useEffect(() => {
    if (isOpen) {
      lockBodyScroll();
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      unlockBodyScroll();
    };
  }, []);

  const isActive = useMemo(() => {
    return (href: string) => {
      if (!pathname) return false;
      if (href === '/') return pathname === '/';
      return pathname.startsWith(href);
    };
  }, [pathname]);

  const textColor = isScrolled ? 'text-dark/80' : 'text-white/80';
  const hoverText = 'hover:text-primary';
  const activeText = 'text-primary';
  const headerSolid = isScrolled; // jangan ikut isOpen

  const mobileDrawer =
    mounted &&
    createPortal(
      <AnimatePresence initial={false} onExitComplete={unlockBodyScroll}>
        {isOpen && (
          <>
            <motion.div
              key="drawer-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-navy/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            <motion.aside
              key="drawer-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
              className="fixed right-0 top-0 z-[70] h-dvh w-[85%] max-w-sm bg-navy px-6 pb-10 pt-6 shadow-2xl shadow-navy/40"
            >
              <div className="flex h-full flex-col">
                <div className="mb-8 flex items-center justify-between">
                  <Link
                    href="/"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center"
                  >
                    <Image
                      src="/images/logo-rayalawfirm.png"
                      alt="Raya Law Firm"
                      width={140}
                      height={42}
                      className="h-9 w-auto object-contain brightness-0 invert"
                      priority
                    />
                  </Link>

                  <button
                    type="button"
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white transition-colors hover:bg-white/20"
                    aria-label="Close menu"
                    onClick={() => setIsOpen(false)}
                  >
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto">
                  <div className="flex flex-col gap-6">
                    {navLinks.map((link) => {
                      if (link.dropdown) {
                        return (
                          <div key={link.label} className="flex flex-col gap-3">
                            <button
                              type="button"
                              onClick={() =>
                                setActiveDropdown((prev) =>
                                  prev === 'layanan' ? null : 'layanan'
                                )
                              }
                              className="flex items-center justify-between text-left text-base font-semibold text-white"
                            >
                              {link.label}
                              <svg
                                className={`h-4 w-4 transition-transform ${
                                  activeDropdown === 'layanan' ? 'rotate-180' : ''
                                }`}
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.19l3.71-3.96a.75.75 0 111.08 1.04l-4.24 4.52a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>

                            <AnimatePresence initial={false}>
                              {activeDropdown === 'layanan' && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <div className="grid gap-3 border-l border-white/20 pl-3 pt-2">
                                    {layananLinks.map((item) => (
                                      <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`text-sm font-semibold transition-colors ${
                                          isActive(item.href)
                                            ? 'text-accent'
                                            : 'text-white/70'
                                        } hover:text-accent`}
                                      >
                                        {item.label}
                                      </Link>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      }

                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className={`text-base font-semibold transition-colors ${
                            isActive(link.href) ? 'text-accent' : 'text-white/80'
                          } hover:text-accent`}
                        >
                          {link.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-8 border-t border-white/10 pt-6">
                  <Link
                    href="/konsultasi"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center rounded-xl bg-gradient-to-r from-primary to-accent px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-shadow hover:shadow-xl active:scale-95"
                  >
                    Konsultasi Gratis
                  </Link>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>,
      document.body
    );

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          headerSolid
            ? 'border-b border-primary/10 bg-white/90 shadow-sm backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-12">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo-rayalawfirm.png"
              alt="Raya Law Firm"
              width={160}
              height={48}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => {
              if (link.dropdown) {
                const isLayananActive = pathname?.startsWith('/layanan');
                return (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown('layanan')}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      type="button"
                      className={`flex items-center gap-2 text-sm font-semibold transition-colors ${
                        isLayananActive ? activeText : textColor
                      } ${hoverText}`}
                      aria-expanded={activeDropdown === 'layanan'}
                    >
                      {link.label}
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 11.19l3.71-3.96a.75.75 0 111.08 1.04l-4.24 4.52a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>

                    <AnimatePresence>
                      {activeDropdown === 'layanan' && (
                        <motion.div
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 12 }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                          className="absolute left-0 top-full mt-4 w-[360px] rounded-2xl border border-primary/10 bg-white/95 p-5 shadow-xl shadow-primary/10 backdrop-blur"
                        >
                          <div className="grid grid-cols-2 gap-4">
                            {layananLinks.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                className={`text-sm font-semibold transition-colors ${
                                  isActive(item.href)
                                    ? activeText
                                    : 'text-dark/80'
                                } hover:text-primary`}
                              >
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors ${
                    isActive(link.href) ? activeText : textColor
                  } ${hoverText}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <motion.div
              initial="initial"
              animate="animate"
              variants={{
                initial: { scale: 1, rotate: 0 },
                animate: {
                  scale: [1, 1, 1, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1],
                  rotate: [0, 0, -5, 5, -5, 5, -5, 5, -3, 3, -3, 3, -1, 1, 0],
                  transition: {
                    duration: 1.4,
                    ease: 'easeInOut',
                    times: [0, 0.1, 0.17, 0.24, 0.31, 0.38, 0.45, 0.52, 0.59, 0.66, 0.73, 0.8, 0.87, 0.94, 1],
                    delay: 0.5,
                  },
                },
              }}
              style={{ originX: 0.5, originY: 0.5 }}
            >
              <Link
                href="/konsultasi"
                className="block rounded-xl bg-gradient-to-r from-primary to-accent px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30 active:scale-95"
              >
                Konsultasi Gratis
              </Link>
            </motion.div>
          </div>

          <button
            type="button"
            className={`flex h-10 w-10 items-center justify-center rounded-lg border transition-colors lg:hidden ${
              headerSolid
                ? 'border-primary/30 bg-primary/5 text-primary'
                : 'border-white/30 bg-white/10 text-white'
            }`}
            aria-label="Toggle menu"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="16" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          </button>
        </div>
      </header>

      {mobileDrawer}
    </>
  );
}