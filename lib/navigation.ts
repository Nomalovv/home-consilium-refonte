import { services } from "@/content/services";

export type LienNav = {
  href: string;
  label: string;
  megaMenu?: boolean;
};

export const navigationPrincipale: LienNav[] = [
  { href: "/services", label: "Services", megaMenu: true },
  { href: "/methode", label: "Méthode" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/a-propos", label: "À propos" },
  { href: "/faq", label: "FAQ" },
];

export const liensMegaMenu = services.map((s) => ({
  href: `/services/${s.slug}`,
  label: s.titre,
  description: s.description,
}));

export const liensFooterLegal: LienNav[] = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/confidentialite", label: "Confidentialité" },
];

/** Libellés des segments d'URL pour le fil d'Ariane. */
export const libellesFilAriane: Record<string, string> = {
  services: "Services",
  methode: "Méthode",
  realisations: "Réalisations",
  "a-propos": "À propos",
  faq: "FAQ",
  contact: "Contact",
  "mentions-legales": "Mentions légales",
  confidentialite: "Confidentialité",
  ...Object.fromEntries(services.map((s) => [s.slug, s.titre])),
};
