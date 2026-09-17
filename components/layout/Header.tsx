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
        defile ? "py-2" : "py-3 md:py-4",
      )}
    >
      <div className="conteneur">
        <div
          className={cn(
            "glass flex items-center justify-between gap-4 rounded-lg px-4 py-2.5 transition-shadow duration-300 md:px-5",
            defile && "shadow-lift",
          )}
        >
          <Link
            href="/"
            className="shrink-0 rounded-sm"
            aria-label="Home Consilium — accueil"
          >
            <Logo tailleSymbole="h-8 w-8 md:h-9 md:w-9" />
          </Link>

          {/* Navigation bureau */}
          <nav aria-label="Navigation principale" className="hidden lg:block">
            <ul className="flex items-center gap-1">
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
                          "cible-tactile flex items-center gap-1.5 rounded-sm px-3.5 py-2.5 text-[15px] font-medium transition-colors",
                          estActif(lien.href)
                            ? "text-terre-700 dark:text-terre-300"
                            : "text-ardoise-900 hover:text-terre-700 dark:text-ardoise-100 dark:hover:text-terre-300",
                        )}
                      >
                        {lien.label}
                      </Link>
                      <button
                        type="button"
                        aria-expanded={megaOuvert}
                        aria-haspopup="true"
                        aria-label="Afficher les domaines de service"
                        onClick={() => setMegaOuvert((v) => !v)}
                        className="cible-tactile -ml-2 flex items-center rounded-sm px-1 text-ardoise-900 dark:text-ardoise-100"
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
                        "cible-tactile flex items-center rounded-sm px-3.5 py-2.5 text-[15px] font-medium transition-colors",
                        estActif(lien.href)
                          ? "text-terre-700 dark:text-terre-300"
                          : "text-ardoise-900 hover:text-terre-700 dark:text-ardoise-100 dark:hover:text-terre-300",
                      )}
                    >
                      {lien.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-1.5">
            <ThemeToggle className="hidden sm:inline-flex" />
            <ButtonLink
              href={contact.telephoneLien}
              variante="discret"
              className="hidden xl:inline-flex"
              aria-label={`Appeler le ${contact.telephone}`}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3Z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinejoin="round"
                />
              </svg>
              {contact.telephone}
            </ButtonLink>
            <ButtonLink href="/contact" className="hidden sm:inline-flex">
              Devis gratuit
            </ButtonLink>

            <button
              type="button"
              onClick={() => setMobileOuvert((v) => !v)}
              aria-expanded={mobileOuvert}
              aria-controls="menu-mobile"
              aria-label={mobileOuvert ? "Fermer le menu" : "Ouvrir le menu"}
              className="cible-tactile inline-flex items-center justify-center rounded-sm p-2.5 text-ardoise-900 dark:text-ardoise-100 lg:hidden"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
              aria-label="Navigation mobile"
              initial={reduit ? false : { opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduit ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: reduit ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="glass glass-lg glass-readable mt-2 max-h-[calc(100vh-120px)] overflow-y-auto rounded-lg p-4 lg:hidden"
            >
              <ul className="space-y-0.5">
                {navigationPrincipale.map((lien) => (
                  <li key={lien.href}>
                    <Link
                      href={lien.href}
                      className="cible-tactile flex items-center rounded-sm px-3 py-3 text-[16px] font-medium text-ardoise-900 dark:text-ardoise-100"
                    >
                      {lien.label}
                    </Link>
                    {lien.megaMenu && (
                      <ul className="ml-3 border-l pl-3">
                        {liensMegaMenu.map((sl) => (
                          <li key={sl.href}>
                            <Link
                              href={sl.href}
                              className="cible-tactile flex items-center rounded-sm px-3 py-2.5 text-[14.5px] text-ink-muted"
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
              <div className="mt-4 flex flex-col gap-2 border-t pt-4">
                <ButtonLink href="/contact" taille="lg">
                  Devis gratuit
                </ButtonLink>
                <ButtonLink href={contact.telephoneLien} variante="glass">
                  {contact.telephone}
                </ButtonLink>
                <div className="pt-1 sm:hidden">
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
