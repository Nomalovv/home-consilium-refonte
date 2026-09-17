"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { bandeauCookies } from "@/content/legal";
import {
  CATEGORIES,
  MODE,
  enregistrerConsentement,
  lireConsentement,
} from "@/lib/consentement";
import { Button } from "@/components/ui/Button";
import { useReducedMotion } from "@/lib/hooks";

/**
 * Bandeau honnête : le site ne dépose aucun cookie de suivi, le bandeau est
 * donc informatif. Il bascule automatiquement en recueil de consentement si
 * `MODE` passe à "consentement" dans /lib/consentement.ts.
 */
export function CookieNotice() {
  const [visible, setVisible] = useState(false);
  const reduit = useReducedMotion();

  useEffect(() => {
    if (!lireConsentement()) setVisible(true);
  }, []);

  function accepter(categories: string[] = []) {
    enregistrerConsentement(categories);
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="region"
          aria-label="Information sur les cookies"
          initial={reduit ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduit ? undefined : { opacity: 0, y: 24 }}
          transition={{ duration: reduit ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-3 bottom-3 z-[70] md:inset-x-auto md:bottom-5 md:left-5 md:max-w-[440px]"
        >
          <div className="glass glass-lg glass-readable rounded-lg p-5">
            <p className="font-display text-[16px] font-semibold text-ardoise-900 dark:text-ardoise-100">
              {bandeauCookies.message}
            </p>
            <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">
              {bandeauCookies.detail}
            </p>

            {MODE === "consentement" && CATEGORIES.length > 0 && (
              <ul className="mt-3 space-y-2">
                {CATEGORIES.map((c) => (
                  <li key={c.id} className="text-[14px] text-ink-muted">
                    <span className="font-medium text-ardoise-900 dark:text-ardoise-100">
                      {c.label}
                    </span>{" "}
                    — {c.description}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Button onClick={() => accepter()}>{bandeauCookies.bouton}</Button>
              <Link
                href={bandeauCookies.lien.href}
                className="lien-souligne cible-tactile inline-flex items-center text-[14px] text-ardoise-700 dark:text-ardoise-100"
              >
                {bandeauCookies.lien.label}
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
