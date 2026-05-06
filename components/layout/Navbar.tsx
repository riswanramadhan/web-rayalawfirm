'use client';

import { useEffect, useMemo, useState } from 'react';
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey>(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      // 1. Hitung scrollbar untuk mencegah layout shift di desktop
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      // 2. Kunci scroll di html dan body
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      
      // 3. Tambahkan padding pengganti scrollbar
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      
      // 4. Cegah efek bounce/rubber-band di mobile (tanpa mematikan scroll di dalam drawer)
      document.body.style.overscrollBehavior = 'none';
      
      document.body.classList.add('menu-open');

      return () => {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
        document.body.style.overscrollBehavior = '';
        document.body.classList.remove('menu-open');
      };
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.body.style.overscrollBehavior = '';
      document.body.classList.remove('menu-open');
      // Re-kalkulasi apakah posisi user saat menutup menu sedang ada di atas atau bawah
      setIsScrolled(window.scrollY > 50);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) setIsDrawerVisible(true);
    // false-nya di-handle oleh onAnimationComplete di motion.div drawer
  }, [isOpen]);

  const isActive = useMemo(() => {
    return (href: string) => {
      if (!pathname) return false;
      if (href === '/') return pathname === '/';
      return pathname.startsWith(href);
    };
  }, [pathname]);

  const textColor = isScrolled && !isDrawerVisible ? 'text-dark/80' : 'text-white/80';
  const hoverText = 'hover:text-primary';
  const activeText = 'text-primary';

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled && !isDrawerVisible
          ? 'backdrop-blur-xl bg-white/90 border-b border-primary/10 shadow-sm'
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
                                isActive(item.href) ? activeText : 'text-dark/80'
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
          <Link
            href="/konsultasi"
            className="rounded-xl bg-gradient-to-r from-primary to-accent px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30"
          >
            Konsultasi Gratis
          </Link>
        </div>

        <button
          type="button"
          className={`flex h-10 w-10 items-center justify-center rounded-lg border transition-colors lg:hidden ${
            isScrolled && !isDrawerVisible
              ? 'border-primary/30 text-primary bg-primary/5'
              : 'border-white/30 text-white bg-white/10'
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

      <AnimatePresence onExitComplete={() => setIsDrawerVisible(false)}>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-navy/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 z-50 h-full w-[85%] max-w-sm bg-navy px-6 pb-10 pt-6 shadow-2xl shadow-navy/40"
            >
              <div className="flex flex-col h-full">
                {/* Header with logo and close button */}
                <div className="flex items-center justify-between mb-8">
                  <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center">
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

                {/* Menu items */}
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
                            <AnimatePresence>
                              {activeDropdown === 'layanan' && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <div className="grid gap-3 pt-2 pl-3 border-l border-white/20">
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

                {/* CTA Button */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <Link
                    href="/konsultasi"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center rounded-xl bg-gradient-to-r from-primary to-accent px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 hover:shadow-xl transition-shadow"
                  >
                    Konsultasi Gratis
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
