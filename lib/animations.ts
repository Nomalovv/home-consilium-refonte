import type { Variants } from "framer-motion";

export const DUREE = 0.5;

export const apparition: Variants = {
  cachee: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUREE, ease: [0.22, 1, 0.36, 1] },
  },
};

export const apparitionSequencee: Variants = {
  cachee: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

export const enfantSequence: Variants = {
  cachee: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUREE, ease: [0.22, 1, 0.36, 1] },
  },
};

export const transitionPage: Variants = {
  cachee: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  sortie: { opacity: 0, y: -8, transition: { duration: 0.2, ease: "easeIn" } },
};

/** Options `whileInView` partagées. */
export const vueUneFois = { once: true, amount: 0.25 } as const;
