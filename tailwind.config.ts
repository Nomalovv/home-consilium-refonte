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
        /* Ardoise — couleur signature */
        ardoise: {
          900: "#16302C",
          800: "#1C3B35",
          700: "#234B44",
          500: "#3C6B61",
          300: "#8FB3AA",
          100: "#DCEAE7",
          50: "#F1F7F5",
        },
        /* Terre cuite — accent */
        terre: {
          700: "#9C4F30",
          600: "#B5623E",
          500: "#C77850",
          300: "#E3B79E",
        },
        /* Neutres pilotés par tokens CSS (clair / sombre) */
        surface: "rgb(var(--hc-bg) / <alpha-value>)",
        ink: "rgb(var(--hc-text) / <alpha-value>)",
        "ink-muted": "rgb(var(--hc-text-muted) / <alpha-value>)",
        /* États */
        etat: {
          succes: "#3F7D5C",
          attention: "#C99A3B",
          erreur: "#B23B32",
          info: "#3C6B61",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-archivo)", "system-ui", "sans-serif"],
      },
      fontSize: {
        /* Échelle fluide */
        h1: ["clamp(30px, 4.4vw, 50px)", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        h2: ["clamp(22px, 3vw, 32px)", { lineHeight: "1.18", letterSpacing: "-0.01em" }],
        h3: ["clamp(19px, 2vw, 23px)", { lineHeight: "1.25" }],
        corps: ["16px", { lineHeight: "1.65" }],
        "corps-lg": ["clamp(17px, 1.4vw, 19px)", { lineHeight: "1.6" }],
      },
      borderRadius: {
        sm: "10px",
        md: "16px",
        lg: "24px",
        xl: "32px",
      },
      boxShadow: {
        "glass-light":
          "0 10px 40px rgba(22,48,44,.16), inset 0 1px 0 rgba(255,255,255,.7)",
        "glass-dark":
          "0 10px 40px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.14)",
        soft: "0 2px 10px rgba(22,48,44,.08)",
        lift: "0 18px 50px rgba(22,48,44,.18)",
      },
      backdropBlur: {
        sm: "10px",
        md: "22px",
        lg: "32px",
      },
      maxWidth: {
        lisible: "68ch",
        contenu: "1200px",
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
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
      },
      animation: {
        "blob-drift": "blob-drift 28s ease-in-out infinite",
        "fade-up": "fade-up .5s ease-out both",
      },
      transitionTimingFunction: {
        doux: "cubic-bezier(.22,1,.36,1)",
      },
    },
  },
  plugins: [],
};

export default config;
