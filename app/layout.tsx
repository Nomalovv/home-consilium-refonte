import type { Metadata, Viewport } from "next";
import { Archivo, Fraunces } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { CookieNotice } from "@/components/layout/CookieNotice";
import { entreprise, SITE_URL } from "@/content/entreprise";
import { jsonLdLocalBusiness } from "@/lib/seo";

// Fraunces en police variable : axe optique 9..144 + graisses 400 à 700.
const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${entreprise.nom} — ${entreprise.activite} en Normandie`,
    template: `%s | ${entreprise.nom}`,
  },
  description:
    "Home Consilium, courtier en travaux en Normandie (Calvados et alentours) : un seul interlocuteur pour tous vos travaux. Sélection d'artisans vérifiés, devis comparés et négociés, suivi de chantier.",
  applicationName: entreprise.nom,
  authors: [{ name: entreprise.nom }],
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: entreprise.nom,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F6F3EE" },
    { media: "(prefers-color-scheme: dark)", color: "#0F1512" },
  ],
};

/** Applique la préférence de thème enregistrée avant le premier rendu. */
const scriptTheme = `(function(){try{var t=localStorage.getItem('hc-theme');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${archivo.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: scriptTheme }} />
      </head>
      <body className="font-sans antialiased">
        <a href="#contenu" className="skip-link">
          Aller au contenu principal
        </a>
        <Header />
        <main id="contenu">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <CookieNotice />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdLocalBusiness()),
          }}
        />
      </body>
    </html>
  );
}
