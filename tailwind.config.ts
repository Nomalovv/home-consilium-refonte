import type { Config } from "tailwindcss";

const config: Config = {
  /**
   * Le mode sombre suit `prefers-color-scheme` par défaut, tout en restant
   * surchargeable par l'attribut `data-theme` posé sur <html> (préférence
   * explicite de l'utilisateur).
   */
  darkMode: [
    "variant",
    [
      '@media (prefers-color-scheme: dark) { &:not(:is([data-theme="light"] *)):not([data-theme="light"]) }',
      '&:is([data-theme="dark"] *)',
    ],
  ],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /**
         * Ardoise — couleur signature, réchauffée d'un cran (moins bleutée,
         * plus « pierre de Caen mouillée ») pour adoucir les grands aplats.
         * Contrastes sur crème #FBF6EE : 900 = 12,7:1 · 800 = 10,5:1 ·
         * 700 = 8,3:1 · 500 = 5,2:1.
         */
        ardoise: {
          900: "#1A322B",
          800: "#22403A",
          700: "#2B5049",
          500: "#457066",
          300: "#96B7AE",
          200: "#C4DAD3",
          100: "#DFEAE5",
          50: "#F4F8F5",
        },
        /**
         * Terre cuite — accent, désormais beaucoup plus présent.
         * Texte : 700 (5,5:1 sur crème) ou 800 (7,4:1). 600 est réservé aux
         * aplats pleins avec texte blanc et aux éléments décoratifs.
         */
        terre: {
          800: "#7E3F26",
          700: "#9C4F30",
          600: "#B5623E",
          500: "#C77850",
          300: "#E3B79E",
          200: "#F0D6C5",
          100: "#F8EAE0",
        },
        /**
         * Miel / ocre — la touche lumineuse.
         * Texte : 800 (7,1:1 sur crème, 5,9:1 sur Miel 200) ou 700 sur crème
         * uniquement (5,0:1). Jamais 600 ou plus clair pour du texte.
         */
        miel: {
          800: "#6E4E17",
          700: "#8A6320",
          600: "#A97B2C",
          500: "#C9993F",
          300: "#E8C98A",
          200: "#F3E0B8",
          100: "#FAF0DA",
        },
        /** Neutres chauds : crème, lin, sable. */
        creme: "#FBF6EE",
        lin: "#F5EDE1",
        sable: {
          DEFAULT: "#EADFCE",
          fonce: "#D9C8B0",
        },
        /* Neutres pilotés par tokens CSS (clair / sombre) */
        surface: "rgb(var(--hc-bg) / <alpha-value>)",
        "surface-douce": "rgb(var(--hc-bg-douce) / <alpha-value>)",
        ink: "rgb(var(--hc-text) / <alpha-value>)",
        "ink-muted": "rgb(var(--hc-text-muted) / <alpha-value>)",
        /* États */
        etat: {
          succes: "#3F7D5C",
          attention: "#9A7526",
          erreur: "#B23B32",
          info: "#2B5049",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-archivo)", "system-ui", "sans-serif"],
      },
      fontSize: {
        /* Échelle fluide — bornes basses calées sur un écran de 320 px */
        h1: ["clamp(29px, 6.2vw, 52px)", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        h2: ["clamp(22px, 4.2vw, 34px)", { lineHeight: "1.16", letterSpacing: "-0.01em" }],
        h3: ["clamp(18px, 2.6vw, 23px)", { lineHeight: "1.25" }],
        corps: ["clamp(15.5px, 1.1vw, 16px)", { lineHeight: "1.65" }],
        "corps-lg": ["clamp(16px, 1.4vw, 19px)", { lineHeight: "1.62" }],
        "corps-sm": ["clamp(14px, 1vw, 15px)", { lineHeight: "1.6" }],
      },
      borderRadius: {
        sm: "12px",
        md: "20px",
        lg: "28px",
        xl: "36px",
        "2xl": "48px",
      },
      boxShadow: {
        /* Ombres teintées terre cuite plutôt que grises : plus chaleureuses. */
        "glass-light":
          "0 12px 44px rgba(124, 74, 48, .16), inset 0 1px 0 rgba(255,255,255,.75)",
        "glass-dark":
          "0 12px 44px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.12)",
        soft: "0 2px 12px rgba(124, 74, 48, .10)",
        lift: "0 20px 52px rgba(124, 74, 48, .20)",
        chaud: "0 10px 30px rgba(181, 98, 62, .22)",
      },
      backdropBlur: {
        sm: "10px",
        md: "22px",
        lg: "32px",
      },
      maxWidth: {
        lisible: "66ch",
        contenu: "1200px",
        large: "1360px",
      },
      keyframes: {
        "blob-drift": {
          "0%,100%": { transform: "translate3d(0,0,0) scale(1)" },
          "33%": { transform: "translate3d(3%, -4%, 0) scale(1.06)" },
          "66%": { transform: "translate3d(-3%, 3%, 0) scale(0.96)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        /** Flottement très lent des illustrations : donne de la vie sans distraire. */
        flottement: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        /** Fumée de cheminée de l'illustration « maison ». */
        fumee: {
          "0%": { opacity: "0", transform: "translateY(2px) scale(.85)" },
          "35%": { opacity: ".7" },
          "100%": { opacity: "0", transform: "translateY(-14px) scale(1.25)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
      },
      animation: {
        "blob-drift": "blob-drift 28s ease-in-out infinite",
        "fade-up": "fade-up .5s ease-out both",
        flottement: "flottement 7s ease-in-out infinite",
        fumee: "fumee 4.5s ease-out infinite",
      },
      transitionTimingFunction: {
        doux: "cubic-bezier(.22,1,.36,1)",
        rebond: "cubic-bezier(.34,1.56,.64,1)",
      },
    },
  },
  plugins: [],
};

export default config;
