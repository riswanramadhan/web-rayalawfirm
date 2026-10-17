'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { ExternalLinkIcon, ChevronLeftIcon, GlobeIcon } from './shell/icons';
import { ADMIN_MAIN_NAV, ADMIN_NAV_HREFS, ADMIN_QUICK_NAV, ADMIN_WRITE_ITEM, type AdminNavItem } from './shell/nav';
import { getBackLink, getSectionTitle, isFocusRoute, pickActiveHref } from './shell/paths';
import SignOutButton from './shell/SignOutButton';

interface AdminShellProps {
  email: string;
  children: ReactNode;
}

const MOBILE_TAB_HREFS = [...ADMIN_MAIN_NAV.map((item) => item.href), ADMIN_WRITE_ITEM.href];

function initialOf(email: string): string {
  const letter = email.trim().charAt(0);
  return letter ? letter.toUpperCase() : 'A';
}

function Avatar({ email, tone = 'light' }: { email: string; tone?: 'light' | 'dark' }) {
  return (
    <span
      aria-hidden="true"
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-sans text-sm font-semibold ${
        tone === 'dark' ? 'bg-gold text-navy' : 'bg-navy text-white'
      }`}
    >
      {initialOf(email)}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Desktop sidebar                                                     */
/* ------------------------------------------------------------------ */

function SidebarLink({ item, active }: { item: AdminNavItem; active: boolean }) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      aria-current={active ? 'page' : undefined}
      className={`group relative flex min-h-[44px] items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 ${
        active ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'
      }`}
    >
      {active && <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-gold" aria-hidden="true" />}
      <Icon className={`h-5 w-5 shrink-0 ${active ? 'text-gold' : 'text-white/55 group-hover:text-white/80'}`} />
      <span className="truncate">{item.label}</span>
    </Link>
  );
}

function SidebarGroupLabel({ children }: { children: ReactNode }) {
  return <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">{children}</p>;
}

function Sidebar({ email, activeHref }: { email: string; activeHref: string | null }) {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col bg-navy text-white shadow-xl shadow-navy/10 lg:flex">
      <div className="border-b border-white/10 px-5 pb-5 pt-6">
        <Link
          href="/admin"
          className="flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
            <Image src="/images/logo-rayalawfirm.png" alt="" width={34} height={34} className="h-[34px] w-[34px] object-contain" priority />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-sans text-[15px] font-semibold leading-tight text-white">Raya Law Firm</span>
            <span className="mt-1 block text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">Dashboard Admin</span>
          </span>
        </Link>
      </div>

      <nav aria-label="Navigasi admin" className="flex-1 overflow-y-auto px-3 py-6">
        <SidebarGroupLabel>Menu</SidebarGroupLabel>
        <ul className="space-y-1">
          {ADMIN_MAIN_NAV.map((item) => (
            <li key={item.href}>
              <SidebarLink item={item} active={activeHref === item.href} />
            </li>
          ))}
        </ul>

        <div className="mt-7">
          <SidebarGroupLabel>Aksi cepat</SidebarGroupLabel>
          <ul className="space-y-1">
            {ADMIN_QUICK_NAV.map((item) => (
              <li key={item.href}>
                <SidebarLink item={item} active={activeHref === item.href} />
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-7">
          <SidebarGroupLabel>Website</SidebarGroupLabel>
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex min-h-[44px] items-center gap-3 rounded-xl px-3 text-sm font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
          >
            <GlobeIcon className="h-5 w-5 shrink-0 text-white/55 group-hover:text-white/80" />
            <span className="flex-1">Lihat Website</span>
            <ExternalLinkIcon className="h-4 w-4 shrink-0 text-white/40" />
            <span className="sr-only">(membuka tab baru)</span>
          </Link>
        </div>
      </nav>

      <div className="border-t border-white/10 p-3">
        <div className="flex items-center gap-3 rounded-xl bg-white/[0.06] px-3 py-3">
          <Avatar email={email} tone="dark" />
          <div className="min-w-0">
            <p className="text-[11px] text-white/50">Masuk sebagai</p>
            <p className="truncate text-sm font-medium text-white" title={email}>
              {email || 'Admin'}
            </p>
          </div>
        </div>
        <SignOutButton variant="sidebar" className="mt-1" />
      </div>
    </aside>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile: app bar + menu akun                                         */
/* ------------------------------------------------------------------ */

function AccountMenu({ email, pathname }: { email: string; pathname: string }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (!target || panelRef.current?.contains(target) || buttonRef.current?.contains(target)) return;
      setOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? 'Tutup menu akun' : 'Buka menu akun'}
        onClick={() => setOpen((value) => !value)}
        className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25 ${
          open ? 'bg-dark/5' : 'hover:bg-dark/5'
        }`}
      >
        <Avatar email={email} />
      </button>

      <div
        ref={panelRef}
        id={panelId}
        hidden={!open}
        className="absolute right-0 top-[calc(100%+0.5rem)] z-50 w-[min(18rem,calc(100vw-1.5rem))] origin-top-right rounded-2xl border border-dark/10 bg-white p-2 shadow-xl shadow-navy/10"
      >
        <div className="flex items-center gap-3 rounded-xl bg-[#f4f7fa] px-3 py-3">
          <Avatar email={email} />
          <div className="min-w-0">
            <p className="text-xs text-dark/50">Masuk sebagai</p>
            <p className="break-all text-sm font-semibold text-dark">{email || 'Admin'}</p>
          </div>
        </div>
        <div className="mt-1 space-y-0.5">
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex min-h-[48px] items-center gap-3 rounded-xl px-3 text-[15px] font-medium text-dark transition-colors hover:bg-dark/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <GlobeIcon className="h-5 w-5 shrink-0 text-dark/50" />
            <span className="flex-1">Lihat Website</span>
            <ExternalLinkIcon className="h-4 w-4 shrink-0 text-dark/35" />
            <span className="sr-only">(membuka tab baru)</span>
          </Link>
          <div className="mx-3 border-t border-dark/5" aria-hidden="true" />
          <SignOutButton variant="menu" />
        </div>
      </div>
    </div>
  );
}

function MobileTopBar({ email, pathname }: { email: string; pathname: string }) {
  const back = getBackLink(pathname);
  const title = getSectionTitle(pathname);

  return (
    <header className="sticky top-0 z-40 border-b border-dark/[0.06] bg-white/90 pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] pt-[env(safe-area-inset-top)] backdrop-blur-xl lg:hidden">
      <div className="flex h-14 items-center gap-1.5 px-2 sm:px-4">
        {back ? (
          <Link
            href={back.href}
            aria-label={back.label}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-dark transition-colors hover:bg-dark/5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </Link>
        ) : (
          <Link
            href="/admin"
            aria-label="Beranda dashboard admin"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25"
          >
            <Image src="/images/logo-rayalawfirm.png" alt="" width={34} height={34} className="h-[34px] w-[34px] object-contain" priority />
          </Link>
        )}
        <div className="min-w-0 flex-1 px-1">
          <p className="text-[10px] font-semibold uppercase leading-none tracking-[0.18em] text-gold">Admin Raya Law Firm</p>
          <p className="mt-1 truncate font-sans text-base font-semibold leading-tight text-dark">{title}</p>
        </div>
        <AccountMenu email={email} pathname={pathname} />
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile: tab bar bawah                                               */
/* ------------------------------------------------------------------ */

function BottomTabBar({ activeHref }: { activeHref: string | null }) {
  return (
    <nav
      aria-label="Navigasi utama"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-dark/10 bg-white/95 pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] shadow-[0_-8px_24px_-16px_rgba(13,27,42,0.25)] backdrop-blur-xl lg:hidden"
    >
      <ul className="mx-auto grid max-w-lg grid-cols-4 px-1">
        {ADMIN_MAIN_NAV.map((item) => {
          const active = activeHref === item.href;
          const Icon = item.icon;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className="group flex min-h-[60px] flex-col items-center justify-center gap-1 rounded-xl px-1 py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/40"
              >
                <span
                  className={`flex h-8 w-14 items-center justify-center rounded-full transition-colors ${
                    active ? 'bg-primary/15 text-navy' : 'text-dark/50 group-hover:text-dark/80'
                  }`}
                >
                  <Icon className="h-[22px] w-[22px]" strokeWidth={active ? 2 : 1.8} />
                </span>
                <span className={`text-[11px] leading-none ${active ? 'font-semibold text-navy' : 'font-medium text-dark/60'}`}>
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
        <li>
          <Link
            href={ADMIN_WRITE_ITEM.href}
            aria-current={activeHref === ADMIN_WRITE_ITEM.href ? 'page' : undefined}
            aria-label="Tulis artikel baru"
            className="group flex min-h-[60px] flex-col items-center justify-center gap-1 rounded-xl px-1 py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/40"
          >
            <span
              className={`flex h-8 w-14 items-center justify-center rounded-full text-white shadow-md shadow-navy/25 transition-colors ${
                activeHref === ADMIN_WRITE_ITEM.href ? 'bg-primary' : 'bg-navy group-hover:bg-primary'
              }`}
            >
              <ADMIN_WRITE_ITEM.icon className="h-[20px] w-[20px]" strokeWidth={2} />
            </span>
            <span className="text-[11px] font-semibold leading-none text-navy">{ADMIN_WRITE_ITEM.shortLabel}</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

/* ------------------------------------------------------------------ */

export default function AdminShell({ email, children }: AdminShellProps) {
  const pathname = usePathname() ?? '/admin';
  const focusMode = isFocusRoute(pathname);
  const sidebarActive = pickActiveHref(pathname, ADMIN_NAV_HREFS);
  const tabActive = pickActiveHref(pathname, MOBILE_TAB_HREFS);

  return (
    <div className="min-h-[100dvh]">
      <a
        href="#admin-main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-xl focus:bg-navy focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
      >
        Lewati ke konten utama
      </a>

      <Sidebar email={email} activeHref={sidebarActive} />
      <MobileTopBar email={email} pathname={pathname} />

      <main
        id="admin-main"
        tabIndex={-1}
        className={`outline-none focus-visible:shadow-none focus-visible:outline-none lg:pb-12 lg:pl-64 ${
          focusMode ? 'pb-6' : 'pb-[calc(7rem_+_env(safe-area-inset-bottom))]'
        }`}
      >
        <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-10 lg:py-10">{children}</div>
      </main>

      {!focusMode && <BottomTabBar activeHref={tabActive} />}
    </div>
  );
}
