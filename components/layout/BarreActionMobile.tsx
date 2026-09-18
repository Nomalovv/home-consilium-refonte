"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { contact } from "@/content/entreprise";
import { barreAction } from "@/content/interface";
import { useReducedMotion } from "@/lib/hooks";

/**
 * Barre d'action unique, visible uniquement sur mobile.
 *
 * Elle remplace les blocs d'appel à l'action répétés au fil du défilement :
 * un seul CTA principal (« Devis gratuit ») et l'appel direct, dans une
 * barre basse compacte qui respecte la zone sûre iOS.
 *
 * Elle n'apparaît qu'après le premier écran (pour ne pas doubler le CTA du
 * hero) et jamais sur /contact, où le formulaire est déjà la page entière.
 */
export function BarreActionMobile() {
  const pathname = usePathname();
  const reduit = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname.startsWith("/contact")) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="region"
          aria-label={barreAction.aria}
          initial={reduit ? false : { y: 70, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduit ? undefined : { y: 70, opacity: 0 }}
          transition={{ duration: reduit ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-[55] md:hidden"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <div className="glass glass-lg glass-readable m-2.5 flex items-center gap-2 rounded-full p-1.5 pl-2 shadow-lift">
            <a
              href={contact.telephoneLien}
              aria-label={barreAction.ariaAppeler}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ardoise-100 text-ardoise-800 transition-colors hover:bg-ardoise-200 dark:bg-white/10 dark:text-ardoise-100"
            >
              <svg
                width="19"
                height="19"
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
            </a>

            <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-ink-muted">
              {contact.telephone}
            </span>

            <Link
              href="/contact"
              className="inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-terre-700 px-5 text-[14.5px] font-semibold text-white shadow-chaud transition-colors hover:bg-terre-800"
            >
              {barreAction.devis}
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
