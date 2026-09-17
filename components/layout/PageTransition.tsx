"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks";

/**
 * Transition de page + gestion du focus au changement de route :
 * le focus est replacé sur le conteneur principal et annoncé aux
 * lecteurs d'écran, comme le ferait une navigation classique.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduit = useReducedMotion();
  const conteneur = useRef<HTMLDivElement>(null);
  const premierRendu = useRef(true);

  useEffect(() => {
    if (premierRendu.current) {
      premierRendu.current = false;
      return;
    }
    conteneur.current?.focus();
    window.scrollTo({ top: 0, behavior: reduit ? "auto" : "smooth" });
  }, [pathname, reduit]);

  return (
    <motion.div
      key={pathname}
      ref={conteneur}
      tabIndex={-1}
      className="outline-none"
      initial={reduit ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduit ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
