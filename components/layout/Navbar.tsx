'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FocusEvent as ReactFocusEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/components/i18n/LanguageProvider';
import { localeNames, localeShortLabels, locales, type Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';

interface NavItem {
  label: string;
  href: string;
}

interface NavLink extends NavItem {
  dropdown?: NavItem[];
}

const DRAWER_ID = 'mobile-navigation';
const SERVICES_MENU_ID = 'desktop-services-menu';
const DRAWER_ANIMATION_MS = 300;
const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const ChevronDownIcon = ({ className = 'h-4 w-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M5.23 7.21a.75.75 0 011.06.02L10 11.19l3.71-3.96a.75.75 0 111.08 1.04l-4.24 4.52a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
      clipRule="evenodd"
    />
  </svg>
);

export default function Navbar() {
  const pathname = usePathname();
  const { locale, setLocale } = useLanguage();
  const t = getDictionary(locale);
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerRendered, setIsDrawerRendered] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const closeTimeoutRef = useRef<number | null>(null);
  const hoverTimeoutRef = useRef<number | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const servicesWrapperRef = useRef<HTMLDivElement>(null);
  const servicesToggleRef = useRef<HTMLButtonElement>(null);

  const serviceLinks = useMemo<NavItem[]>(() => {
    const links = t.nav.serviceLinks;

    return [
      { label: links.criminal, href: '/layanan/hukum-pidana' },
      { label: links.civil, href: '/layanan/hukum-perdata' },
      { label: links.business, href: '/layanan/hukum-bisnis' },
      { label: links.family, href: '/layanan/hukum-keluarga' },
      { label: links.property, href: '/layanan/hukum-properti' },
      { label: links.employment, href: '/layanan/hukum-ketenagakerjaan' },
      { label: links.administrative, href: '/layanan/hukum-ptun' },
    ];
  }, [t]);

  const navLinks = useMemo<NavLink[]>(
    () => [
      { label: t.common.home, href: '/' },
      { label: t.common.services, href: '/layanan', dropdown: serviceLinks },
      { label: t.common.about, href: '/tentang' },
      { label: t.common.team, href: '/tim' },
      { label: t.common.articles, href: '/artikel' },
      { label: t.common.contact, href: '/kontak' },
    ],
    [serviceLinks, t]
  );

  const drawerExtraLinks = useMemo<NavItem[]>(
    () => [
      { label: t.common.testimonials, href: '/testimoni' },
      { label: t.common.consultation, href: '/konsultasi' },
    ],
    [t]
  );

  const isActive = useCallback(
    (href: string) => {
      if (!pathname) return false;
      if (href === '/') return pathname === '/';
      return pathname === href || pathname.startsWith(`${href}/`);
    },
    [pathname]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setIsScrolled(window.scrollY > 50);
    };
    const handleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Kunci scroll body selama drawer tampil.
  useEffect(() => {
    if (!isDrawerRendered) return;

    const { documentElement, body } = document;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

    documentElement.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    body.style.paddingRight = scrollbarWidth > 0 ? `${scrollbarWidth}px` : '';
    body.style.overscrollBehavior = 'none';
    body.classList.add('menu-open');

    return () => {
      documentElement.style.overflow = '';
      body.style.overflow = '';
      body.style.paddingRight = '';
      body.style.overscrollBehavior = '';
      body.classList.remove('menu-open');
    };
  }, [isDrawerRendered]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current !== null) window.clearTimeout(closeTimeoutRef.current);
      if (hoverTimeoutRef.current !== null) window.clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  // Tutup semua menu saat berpindah halaman.
  useEffect(() => {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsDrawerOpen(false);
    setIsDrawerRendered(false);
    setIsMobileServicesOpen(false);
    setIsServicesOpen(false);
  }, [pathname]);

  const openDrawer = () => {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    setIsServicesOpen(false);
    setIsMobileServicesOpen(isActive('/layanan'));
    setIsDrawerRendered(true);
    // Mulai dari posisi tertutup agar transisi masuk berjalan.
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setIsDrawerOpen(true));
    });
  };

  const closeDrawer = useCallback((options: { immediate?: boolean; restoreFocus?: boolean } = {}) => {
    const { immediate = false, restoreFocus = true } = options;

    setIsDrawerOpen(false);

    if (closeTimeoutRef.current !== null) window.clearTimeout(closeTimeoutRef.current);

    const finish = () => {
      setIsDrawerRendered(false);
      closeTimeoutRef.current = null;
      if (restoreFocus) menuButtonRef.current?.focus();
    };

    if (immediate) {
      finish();
      return;
    }

    closeTimeoutRef.current = window.setTimeout(finish, DRAWER_ANIMATION_MS);
  }, []);

  // Fokus awal, Escape, dan focus trap di dalam drawer.
  useEffect(() => {
    if (!isDrawerRendered) return;

    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 50);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeDrawer();
        return;
      }

      if (event.key !== 'Tab' || !drawerRef.current) return;

      const focusable = Array.from(
        drawerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      ).filter((el) => el.offsetParent !== null);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !drawerRef.current.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isDrawerRendered, closeDrawer]);

  // Dropdown layanan desktop: Escape menutup dan mengembalikan fokus.
  useEffect(() => {
    if (!isServicesOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setIsServicesOpen(false);
      servicesToggleRef.current?.focus();
    };

    const onPointerDown = (event: PointerEvent) => {
      if (!servicesWrapperRef.current?.contains(event.target as Node)) setIsServicesOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [isServicesOpen]);

  // Hover hanya untuk mouse; di layar sentuh dropdown dibuka lewat tombol chevron.
  const openServicesOnHover = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return;
    if (hoverTimeoutRef.current !== null) window.clearTimeout(hoverTimeoutRef.current);
    setIsServicesOpen(true);
  };

  const closeServicesOnLeave = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return;
    if (hoverTimeoutRef.current !== null) window.clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = window.setTimeout(() => setIsServicesOpen(false), 120);
  };

  const handleServicesBlur = (event: ReactFocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setIsServicesOpen(false);
    }
  };

  const handleServicesKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setIsServicesOpen(true);
      window.requestAnimationFrame(() => {
        document
          .getElementById(SERVICES_MENU_ID)
          ?.querySelector<HTMLAnchorElement>('a[href]')
          ?.focus();
      });
    }
  };

  const handleSkipLink = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    const main = document.querySelector('main');
    if (!main) return;
    event.preventDefault();
    if (!main.hasAttribute('tabindex')) main.setAttribute('tabindex', '-1');
    main.focus({ preventScroll: true });
    main.scrollIntoView({ block: 'start' });
  };

  const headerSolid = isScrolled;
  const textColor = headerSolid ? 'text-dark/80' : 'text-white/85';
  const navbarLogoClass = `w-auto object-contain transition-[filter] duration-300 ${
    headerSolid ? '' : 'brightness-0 invert'
  }`;

  const renderLanguageToggle = (variant: 'header' | 'drawer') => {
    const isDrawer = variant === 'drawer';

    return (
      <div
        className={`flex items-center rounded-full border p-1 ${
          isDrawer
            ? 'h-12 border-white/15 bg-white/10'
            : headerSolid
              ? 'h-10 border-primary/20 bg-primary/5'
              : 'h-10 border-white/25 bg-white/10'
        }`}
        role="group"
        aria-label={t.common.languageLabel}
      >
        {locales.map((item: Locale) => {
          const isActiveLocale = locale === item;

          return (
            <button
              key={item}
              type="button"
              lang={item}
              aria-pressed={isActiveLocale}
              aria-label={`${localeShortLabels[item]} — ${localeNames[item]}`}
              onClick={() => {
                if (!isActiveLocale) setLocale(item);
              }}
              className={`relative flex min-w-[44px] items-center justify-center rounded-full px-2 text-xs font-bold transition-colors after:absolute after:inset-x-0 after:-inset-y-1.5 after:content-[''] ${
                isDrawer ? 'h-10 text-sm' : 'h-8'
              } ${
                isActiveLocale
                  ? isDrawer
                    ? 'bg-white text-navy'
                    : 'bg-primary text-white'
                  : isDrawer
                    ? 'text-white/70 hover:text-white'
                    : headerSolid
                      ? 'text-dark/60 hover:text-primary'
                      : 'text-white/75 hover:text-white'
              }`}
            >
              {localeShortLabels[item]}
            </button>
          );
        })}
      </div>
    );
  };

  const drawerLinkClass = (active: boolean) =>
    `flex min-h-[48px] items-center rounded-xl px-3 text-base font-semibold transition-colors ${
      active ? 'bg-white/10 text-accent' : 'text-white/85 hover:bg-white/5 hover:text-accent'
    }`;

  const mobileDrawer =
    mounted && isDrawerRendered
      ? createPortal(
          <div className="fixed inset-0 z-[70] lg:hidden">
            <div
              aria-hidden="true"
              className={`absolute inset-0 bg-navy/60 backdrop-blur-sm transition-opacity duration-300 motion-reduce:transition-none ${
                isDrawerOpen ? 'opacity-100' : 'opacity-0'
              }`}
              onClick={() => closeDrawer()}
            />

            <div
              id={DRAWER_ID}
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label={t.common.mobileNavigation}
              className={`absolute inset-y-0 right-0 flex w-[88%] max-w-sm flex-col bg-navy shadow-2xl shadow-navy/40 transition-transform duration-300 ease-out will-change-transform motion-reduce:transition-none ${
                isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
              }`}
            >
              <div className="pt-safe flex h-full flex-col">
                <div className="flex items-center justify-between gap-3 px-5 pb-4 pt-5">
                  <Link
                    href="/"
                    aria-label={t.common.logoHomeLabel}
                    onClick={() => closeDrawer({ immediate: true, restoreFocus: false })}
                    className="flex min-h-[44px] items-center"
                  >
                    <Image
                      src="/images/logo-rayalawfirm-with-title.png"
                      alt={t.common.logoAlt}
                      width={173}
                      height={80}
                      className="h-9 w-auto object-contain brightness-0 invert"
                    />
                  </Link>

                  <button
                    ref={closeButtonRef}
                    type="button"
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white transition-colors hover:bg-white/20"
                    aria-label={t.common.closeMenu}
                    onClick={() => closeDrawer()}
                  >
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>

                <nav
                  aria-label={t.common.mainNavigation}
                  className="flex-1 overflow-y-auto overscroll-contain px-3 pb-4"
                >
                  <ul className="flex flex-col gap-1">
                    {navLinks.map((link) => {
                      if (link.dropdown) {
                        const servicesActive = isActive(link.href);

                        return (
                          <li key={link.href}>
                            <div className="flex items-center gap-1">
                              <Link
                                href={link.href}
                                aria-current={pathname === link.href ? 'page' : undefined}
                                onClick={() => closeDrawer({ immediate: true, restoreFocus: false })}
                                className={`flex-1 ${drawerLinkClass(servicesActive)}`}
                              >
                                {link.label}
                              </Link>
                              <button
                                type="button"
                                aria-expanded={isMobileServicesOpen}
                                aria-controls="mobile-services-links"
                                aria-label={t.common.servicesMenu}
                                onClick={() => setIsMobileServicesOpen((prev) => !prev)}
                                className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl text-white/80 transition-colors hover:bg-white/5 hover:text-accent"
                              >
                                <ChevronDownIcon
                                  className={`h-5 w-5 transition-transform duration-200 ${
                                    isMobileServicesOpen ? 'rotate-180' : ''
                                  }`}
                                />
                              </button>
                            </div>

                            <ul
                              id="mobile-services-links"
                              hidden={!isMobileServicesOpen}
                              className="mb-2 ml-3 mt-1 border-l border-white/15 pl-2"
                            >
                              {link.dropdown.map((item) => (
                                <li key={item.href}>
                                  <Link
                                    href={item.href}
                                    aria-current={isActive(item.href) ? 'page' : undefined}
                                    onClick={() => closeDrawer({ immediate: true, restoreFocus: false })}
                                    className={`flex min-h-[44px] items-center rounded-lg px-3 text-sm font-semibold transition-colors ${
                                      isActive(item.href)
                                        ? 'text-accent'
                                        : 'text-white/70 hover:text-accent'
                                    }`}
                                  >
                                    {item.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </li>
                        );
                      }

                      const active = isActive(link.href);
                      return (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            aria-current={active ? 'page' : undefined}
                            onClick={() => closeDrawer({ immediate: true, restoreFocus: false })}
                            className={drawerLinkClass(active)}
                          >
                            {link.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>

                  <ul className="mt-3 flex flex-col gap-1 border-t border-white/10 pt-3">
                    {drawerExtraLinks.map((link) => {
                      const active = isActive(link.href);
                      return (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            aria-current={active ? 'page' : undefined}
                            onClick={() => closeDrawer({ immediate: true, restoreFocus: false })}
                            className={`flex min-h-[44px] items-center rounded-xl px-3 text-sm font-medium transition-colors ${
                              active ? 'text-accent' : 'text-white/65 hover:text-accent'
                            }`}
                          >
                            {link.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                <div className="pb-safe border-t border-white/10 px-5">
                  <div className="space-y-4 py-5">
                    <Link
                      href="/konsultasi"
                      onClick={() => closeDrawer({ immediate: true, restoreFocus: false })}
                      className="flex min-h-[52px] items-center justify-center rounded-xl bg-gradient-to-r from-[#6fa6c9] to-accent px-5 text-base font-semibold text-navy shadow-lg shadow-primary/30 transition-shadow hover:shadow-xl active:scale-[0.98]"
                    >
                      {t.common.freeConsultation}
                    </Link>
                    <div className="flex justify-center">{renderLanguageToggle('drawer')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <a
        href="#main"
        onClick={handleSkipLink}
        className="sr-only z-[80] rounded-xl bg-white px-4 py-3 text-sm font-semibold text-navy shadow-lg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {t.common.skipToContent}
      </a>

      <header
        className={`pt-safe px-safe fixed top-0 z-50 w-full transition-[background-color,box-shadow,border-color] duration-300 ${
          headerSolid
            ? 'border-b border-primary/10 bg-white/90 shadow-sm backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-12">
          <Link
            href="/"
            aria-label={t.common.logoHomeLabel}
            aria-current={pathname === '/' ? 'page' : undefined}
            className="flex min-h-[44px] flex-shrink-0 items-center"
          >
            <Image
              src="/images/logo-rayalawfirm-with-title.png"
              alt={t.common.logoAlt}
              width={173}
              height={80}
              className={`h-10 lg:hidden ${navbarLogoClass}`}
            />
            <Image
              src="/images/logo-rayalawfirm.png"
              alt={t.common.logoAlt}
              width={48}
              height={48}
              className={`hidden h-11 lg:block ${navbarLogoClass}`}
            />
          </Link>

          <nav aria-label={t.common.mainNavigation} className="hidden lg:block">
            <ul className="flex items-center gap-5 xl:gap-7">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                const linkClass = `relative inline-flex min-h-[44px] items-center text-sm font-semibold transition-colors hover:text-primary after:absolute after:inset-x-0 after:bottom-2 after:h-0.5 after:origin-left after:rounded-full after:bg-primary after:transition-transform after:duration-300 after:content-[''] ${
                  active ? 'text-primary after:scale-x-100' : `${textColor} after:scale-x-0`
                }`;

                if (link.dropdown) {
                  return (
                    <li key={link.href}>
                      <div
                        ref={servicesWrapperRef}
                        className="relative flex items-center"
                        onPointerEnter={openServicesOnHover}
                        onPointerLeave={closeServicesOnLeave}
                        onBlur={handleServicesBlur}
                      >
                        <Link
                          href={link.href}
                          aria-current={pathname === link.href ? 'page' : undefined}
                          className={linkClass}
                        >
                          {link.label}
                        </Link>
                        <button
                          ref={servicesToggleRef}
                          type="button"
                          aria-expanded={isServicesOpen}
                          aria-controls={SERVICES_MENU_ID}
                          aria-label={t.common.servicesMenu}
                          onClick={() => setIsServicesOpen((prev) => !prev)}
                          onKeyDown={handleServicesKeyDown}
                          className={`ml-0.5 flex h-9 w-7 items-center justify-center rounded-md transition-colors hover:text-primary ${
                            active ? 'text-primary' : textColor
                          }`}
                        >
                          <ChevronDownIcon
                            className={`h-4 w-4 transition-transform duration-200 ${
                              isServicesOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>

                        <div
                          id={SERVICES_MENU_ID}
                          className={`absolute left-1/2 top-full w-[380px] -translate-x-1/2 pt-3 transition-[opacity,transform,visibility] duration-200 ${
                            isServicesOpen
                              ? 'visible translate-y-0 opacity-100'
                              : 'pointer-events-none invisible translate-y-2 opacity-0'
                          }`}
                        >
                          <div className="rounded-2xl border border-primary/10 bg-white/95 p-3 shadow-xl shadow-primary/10 backdrop-blur">
                            <ul className="grid grid-cols-2 gap-1">
                              {serviceLinks.map((item) => {
                                const itemActive = isActive(item.href);
                                return (
                                  <li key={item.href}>
                                    <Link
                                      href={item.href}
                                      aria-current={itemActive ? 'page' : undefined}
                                      onClick={() => setIsServicesOpen(false)}
                                      className={`flex min-h-[44px] items-center rounded-xl px-3 text-sm font-semibold transition-colors hover:bg-primary/5 hover:text-primary-700 ${
                                        itemActive ? 'bg-primary/5 text-primary' : 'text-dark/80'
                                      }`}
                                    >
                                      {item.label}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                            <Link
                              href="/layanan"
                              onClick={() => setIsServicesOpen(false)}
                              className="mt-2 flex min-h-[44px] items-center justify-between rounded-xl border-t border-primary/10 px-3 pt-2 text-sm font-semibold text-primary-700 transition-colors hover:bg-primary/5"
                            >
                              {t.common.viewAllServices}
                              <span aria-hidden="true">&rarr;</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                }

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? 'page' : undefined}
                      className={linkClass}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            {renderLanguageToggle('header')}
            <Link
              href="/konsultasi"
              aria-current={isActive('/konsultasi') ? 'page' : undefined}
              className="inline-flex min-h-[44px] animate-nudge items-center rounded-xl bg-gradient-to-r from-[#6fa6c9] to-accent px-5 text-sm font-semibold text-navy shadow-lg shadow-primary/20 transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/30 motion-reduce:animate-none"
            >
              {t.common.freeConsultation}
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            {renderLanguageToggle('header')}
            <button
              ref={menuButtonRef}
              type="button"
              className={`flex h-11 w-11 items-center justify-center rounded-xl border transition-colors ${
                headerSolid
                  ? 'border-primary/30 bg-primary/5 text-primary'
                  : 'border-white/30 bg-white/10 text-white'
              }`}
              aria-label={isDrawerRendered ? t.common.closeMenu : t.common.openMenu}
              aria-expanded={isDrawerOpen}
              aria-controls={DRAWER_ID}
              aria-haspopup="dialog"
              onClick={() => {
                if (isDrawerRendered) {
                  closeDrawer();
                } else {
                  openDrawer();
                }
              }}
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="16" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {mobileDrawer}
    </>
  );
}
