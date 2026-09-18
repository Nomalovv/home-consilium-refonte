"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { ButtonLink } from "@/components/ui/Button";
import { MegaMenu } from "@/components/layout/MegaMenu";
import { liensMegaMenu, navigationPrincipale } from "@/lib/navigation";
import { contact } from "@/content/entreprise";
import { header } from "@/content/interface";
import { useEchap, useReducedMotion, useVerrouScroll } from "@/lib/hooks";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [megaOuvert, setMegaOuvert] = useState(false);
  const [mobileOuvert, setMobileOuvert] = useState(false);
  const [defile, setDefile] = useState(false);
  const zoneServices = useRef<HTMLLIElement>(null);
  const reduit = useReducedMotion();

  const fermerTout = useCallback(() => {
    setMegaOuvert(false);
    setMobileOuvert(false);
  }, []);

  useEffect(() => {
    fermerTout();
  }, [pathname, fermerTout]);

  useEffect(() => {
    const onScroll = () => setDefile(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEchap(megaOuvert || mobileOuvert, fermerTout);
  useVerrouScroll(mobileOuvert);

  // Ferme le méga-menu quand le focus ou le pointeur quitte la zone.
  useEffect(() => {
    if (!megaOuvert) return;
    const onClick = (e: MouseEvent) => {
      if (!zoneServices.current?.contains(e.target as Node)) setMegaOuvert(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [megaOuvert]);

  const estActif = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-doux",
        defile ? "py-1.5 sm:py-2" : "py-2 sm:py-3 md:py-4",
      )}
    >
      <div className="conteneur">
        <div
          className={cn(
            "glass flex items-center justify-between gap-2 rounded-full px-3 py-2 transition-shadow duration-300 sm:gap-4 sm:px-4 sm:py-2.5 md:px-5",
            defile && "shadow-lift",
          )}
        >
          <Link
            href="/"
            className="shrink-0 rounded-full"
            aria-label={header.ariaAccueil}
          >
            <Logo tailleSymbole="h-8 w-8 md:h-9 md:w-9" />
          </Link>

          {/* Navigation bureau */}
          <nav aria-label={header.ariaNavPrincipale} className="hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {navigationPrincipale.map((lien) =>
                lien.megaMenu ? (
                  <li
                    key={lien.href}
                    ref={zoneServices}
                    className="relative"
                    onMouseEnter={() => setMegaOuvert(true)}
                    onMouseLeave={() => setMegaOuvert(false)}
                  >
                    <div className="flex items-center">
                      <Link
                        href={lien.href}
                        className={cn(
                          "cible-tactile flex items-center gap-1.5 rounded-full px-3.5 py-2.5 text-[15px] font-medium transition-colors",
                          estActif(lien.href)
                            ? "bg-terre-100 text-terre-800 dark:bg-white/10 dark:text-terre-300"
                            : "text-ardoise-800 hover:bg-terre-100/70 hover:text-terre-800 dark:text-ardoise-100 dark:hover:bg-white/10 dark:hover:text-terre-300",
                        )}
                      >
                        {lien.label}
                      </Link>
                      <button
                        type="button"
                        aria-expanded={megaOuvert}
                        aria-haspopup="true"
                        aria-label={header.ariaDomaines}
                        onClick={() => setMegaOuvert((v) => !v)}
                        className="cible-tactile -ml-2 flex items-center rounded-full px-1 text-ardoise-800 dark:text-ardoise-100"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 16 16"
                          fill="none"
                          aria-hidden="true"
                          className={cn(
                            "transition-transform duration-300",
                            megaOuvert && "rotate-180",
                          )}
                        >
                          <path
                            d="M4 6l4 4 4-4"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                    <AnimatePresence>
                      {megaOuvert && (
                        <MegaMenu onNaviguer={() => setMegaOuvert(false)} />
                      )}
                    </AnimatePresence>
                  </li>
                ) : (
                  <li key={lien.href}>
                    <Link
                      href={lien.href}
                      aria-current={estActif(lien.href) ? "page" : undefined}
                      className={cn(
                        "cible-tactile flex items-center rounded-full px-3.5 py-2.5 text-[15px] font-medium transition-colors",
                        estActif(lien.href)
                          ? "bg-terre-100 text-terre-800 dark:bg-white/10 dark:text-terre-300"
                          : "text-ardoise-800 hover:bg-terre-100/70 hover:text-terre-800 dark:text-ardoise-100 dark:hover:bg-white/10 dark:hover:text-terre-300",
                      )}
                    >
                      {lien.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-1">
            <ThemeToggle className="hidden sm:inline-flex" />
            <ButtonLink
              href={contact.telephoneLien}
              variante="discret"
              taille="sm"
              className="hidden xl:inline-flex"
              aria-label={header.ariaAppel}
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3Z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinejoin="round"
                />
              </svg>
              {contact.telephone}
            </ButtonLink>
            <ButtonLink
              href="/contact"
              variante="secondaire"
              taille="sm"
              className="hidden sm:inline-flex"
            >
              {header.cta}
            </ButtonLink>

            <button
              type="button"
              onClick={() => setMobileOuvert((v) => !v)}
              aria-expanded={mobileOuvert}
              aria-controls="menu-mobile"
              aria-label={mobileOuvert ? header.fermerMenu : header.ouvrirMenu}
              className="cible-tactile inline-flex items-center justify-center rounded-full p-2.5 text-ardoise-900 transition-colors hover:bg-terre-100 dark:text-ardoise-100 dark:hover:bg-white/10 lg:hidden"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                {mobileOuvert ? (
                  <path
                    d="M5 5l14 14M19 5 5 19"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                  />
                ) : (
                  <path
                    d="M3.5 7h17M3.5 12h17M3.5 17h17"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation mobile */}
        <AnimatePresence>
          {mobileOuvert && (
            <motion.nav
              id="menu-mobile"
              aria-label={header.ariaNavMobile}
              initial={reduit ? false : { opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduit ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: reduit ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="glass glass-lg glass-readable mt-2 max-h-[calc(100dvh-108px)] overflow-y-auto overscroll-contain rounded-lg p-3 lg:hidden"
              style={{ paddingBottom: "calc(12px + env(safe-area-inset-bottom))" }}
            >
              <ul className="space-y-0.5">
                {navigationPrincipale.map((lien) => (
                  <li key={lien.href}>
                    <Link
                      href={lien.href}
                      className="cible-tactile flex items-center rounded-full px-3 py-2.5 text-[15.5px] font-semibold text-ardoise-900 transition-colors hover:bg-terre-100 dark:text-ardoise-100 dark:hover:bg-white/10"
                    >
                      {lien.label}
                    </Link>
                    {lien.megaMenu && (
                      <ul className="ml-3 mt-0.5 space-y-0.5 border-l-2 border-terre-200 pl-3 dark:border-terre-700/50">
                        {liensMegaMenu.map((sl) => (
                          <li key={sl.href}>
                            <Link
                              href={sl.href}
                              className="cible-tactile flex items-center rounded-full px-3 py-2 text-[14.5px] text-ink-muted transition-colors hover:bg-terre-100/70 dark:hover:bg-white/10"
                            >
                              {sl.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>

              <div className="mt-3 flex items-center gap-2 border-t pt-3">
                <ButtonLink
                  href="/contact"
                  variante="secondaire"
                  className="flex-1"
                >
                  {header.cta}
                </ButtonLink>
                <ButtonLink
                  href={contact.telephoneLien}
                  variante="glass"
                  aria-label={header.ariaAppel}
                  className="shrink-0 px-3"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3Z"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinejoin="round"
                    />
                  </svg>
                </ButtonLink>
                <div className="shrink-0 sm:hidden">
                  <ThemeToggle />
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
