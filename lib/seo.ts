import type { Metadata } from "next";
import { contact, entreprise, SITE_URL, zoneIntervention } from "@/content/entreprise";
import { faq as faqData } from "@/content/faq";

type OptionsMeta = {
  titre: string;
  description: string;
  chemin: string;
};

export function construireMetadata({
  titre,
  description,
  chemin,
}: OptionsMeta): Metadata {
  const url = `${SITE_URL}${chemin}`;
  const titreComplet = `${titre} | ${entreprise.nom}`;

  return {
    title: titre,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: titreComplet,
      description,
      url,
      siteName: entreprise.nom,
      locale: "fr_FR",
      type: "website",
      images: [{ url: `${SITE_URL}/logo.svg`, alt: entreprise.nom }],
    },
    twitter: {
      card: "summary",
      title: titreComplet,
      description,
    },
  };
}

/** JSON-LD LocalBusiness — coordonnées réelles, adresse en attente. */
export function jsonLdLocalBusiness() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#localbusiness`,
    name: entreprise.nom,
    description: entreprise.definition,
    slogan: entreprise.baseline,
    url: SITE_URL,
    telephone: contact.telephoneE164,
    email: contact.email,
    image: `${SITE_URL}/logo.svg`,
    logo: `${SITE_URL}/logo.svg`,
    address: {
      "@type": "PostalAddress",
      // Adresse non publiée par l'entreprise à ce jour.
      streetAddress: entreprise.adresse,
      addressLocality: "Caen",
      addressRegion: zoneIntervention.region,
      postalCode: "14000",
      addressCountry: "FR",
    },
    areaServed: zoneIntervention.villes.map((ville) => ({
      "@type": "Place",
      name: ville,
    })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "08:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        description: "Sur rendez-vous",
      },
    ],
  };
}

/** JSON-LD FAQPage à partir du contenu réel de la FAQ. */
export function jsonLdFaq(
  questions: { question: string; reponse: string }[] = faqData.map((q) => ({
    question: q.question,
    reponse: q.reponse,
  })),
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.reponse },
    })),
  };
}

export function jsonLdFilAriane(
  elements: { nom: string; chemin: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: elements.map((el, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: el.nom,
      item: `${SITE_URL}${el.chemin}`,
    })),
  };
}
