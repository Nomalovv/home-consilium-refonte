"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { liensMegaMenu } from "@/lib/navigation";
import { megaMenu } from "@/content/interface";
import { useReducedMotion } from "@/lib/hooks";

export function MegaMenu({ onNaviguer }: { onNaviguer: () => void }) {
  const reduit = useReducedMotion();

  return (
    <motion.div
      initial={reduit ? false : { opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduit ? undefined : { opacity: 0, y: -8 }}
      transition={{ duration: reduit ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="glass glass-lg glass-readable absolute left-1/2 top-[calc(100%+10px)] w-[min(880px,calc(100vw-40px))] -translate-x-1/2 rounded-lg p-3"
    >
      <ul className="grid gap-1 md:grid-cols-2">
        {liensMegaMenu.map((lien) => (
          <li key={lien.href}>
            <Link
              href={lien.href}
              onClick={onNaviguer}
              className="group block rounded-md p-4 transition-colors hover:bg-terre-100 dark:hover:bg-white/[0.07]"
            >
              <span className="flex items-baseline gap-2 font-display text-[16px] font-semibold text-ardoise-900 dark:text-ardoise-100">
                {lien.label}
                <span
                  aria-hidden="true"
                  className="text-terre-600 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                >
                  →
                </span>
              </span>
              <span className="mt-1 block text-[13.5px] leading-relaxed text-ink-muted">
                {lien.description}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-2 border-t pt-3">
        <Link
          href="/services"
          onClick={onNaviguer}
          className="cible-tactile flex items-center gap-2 rounded-full px-4 py-2.5 text-[15px] font-semibold text-terre-700 transition-colors hover:bg-terre-100 dark:text-terre-300 dark:hover:bg-white/[0.07]"
        >
          {megaMenu.tousLesServices}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </motion.div>
  );
}
