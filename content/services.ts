/**
 * Les 5 domaines de service réels + la carte « Autre ».
 * Ajouter un service = ajouter une entrée dans `services` : la route
 * /services/[slug] et le sitemap se mettent à jour automatiquement.
 */

export type SousService = {
  titre: string;
};

export type Service = {
  slug: string;
  titre: string;
  titreCourt: string;
  description: string;
  sousServices: SousService[];
  /** 3 affirmations du bloc « Est-ce pour moi ? » — orientation, pas de scoring. */
  estCePourMoi: string[];
  /** FAQ spécifique au service (reprise du contenu réel, contextualisée). */
  faq: { question: string; reponse: string }[];
  /** Slugs des 2 services connexes. */
  connexes: string[];
  metaDescription: string;
};

export const CTA_SERVICE = "Parler de ce projet";

export const services: Service[] = [
  {
    slug: "renovation-complete",
    titre: "Rénovation complète",
    titreCourt: "Rénovation complète",
    description:
      "Maison ou appartement repris dans leur ensemble : gros œuvre, second œuvre, réseaux et finitions, coordonnés dans un planning unique.",
    sousServices: [
      { titre: "Rénovation de A à Z" },
      { titre: "Mise aux normes" },
      { titre: "Rénovation énergétique" },
    ],
    estCePourMoi: [
      "Mon projet touche plusieurs corps de métier en même temps (maçonnerie, électricité, plomberie, finitions).",
      "Je ne sais pas dans quel ordre faire intervenir les entreprises.",
      "Je veux un planning unique et un seul interlocuteur pour tout le chantier.",
    ],
    faq: [
      {
        question:
          "Combien de temps faut-il pour recevoir les devis d'une rénovation complète ?",
        reponse:
          "Les devis vous sont transmis 1 à 2 semaines après la visite technique. Une rénovation complète mobilise plusieurs entreprises : nous les consultons en parallèle pour vous présenter des devis comparables poste par poste.",
      },
      {
        question: "Qui coordonne les différents corps de métier ?",
        reponse:
          "Nous. Un interlocuteur unique assure la coordination, les points d'avancement et les arbitrages jusqu'à la livraison et la réception du chantier.",
      },
      {
        question: "Suis-je engagé après le premier échange ?",
        reponse:
          "Non. Le premier échange est sans engagement et vous n'avez aucune obligation de donner suite.",
      },
    ],
    connexes: ["amenagement-interieur", "extension-surelevation"],
    metaDescription:
      "Rénovation complète de maison ou d'appartement dans le Calvados : gros œuvre, second œuvre, réseaux et finitions coordonnés dans un planning unique par votre courtier en travaux.",
  },
  {
    slug: "cuisine-salle-de-bain",
    titre: "Cuisine & salle de bain",
    titreCourt: "Cuisine & salle de bain",
    description:
      "Les pièces les plus techniques du logement : plomberie, électricité, carrelage et agencement pilotés dans le bon ordre.",
    sousServices: [
      { titre: "Cuisine sur-mesure" },
      { titre: "Salle d'eau & douche à l'italienne" },
      { titre: "Salle de bain PMR" },
    ],
    estCePourMoi: [
      "Mon projet implique de déplacer ou de reprendre des arrivées d'eau ou des circuits électriques.",
      "Je veux que le carrelage, la plomberie et l'agencement soient faits dans le bon ordre, sans reprise.",
      "J'ai besoin d'un aménagement adapté (douche à l'italienne, accessibilité PMR).",
    ],
    faq: [
      {
        question: "Une salle de bain, est-ce un chantier trop petit pour vous ?",
        reponse:
          "Parlez-nous de votre projet, quelle que soit sa taille : nous vous dirons franchement si nous pouvons vous accompagner.",
      },
      {
        question: "Comment sont choisis les artisans qui interviennent ?",
        reponse:
          "Chaque entreprise est vérifiée : assurance décennale et RC à jour, situation administrative régulière, qualifications, réalisations passées et retours de chantiers précédents.",
      },
    ],
    connexes: ["amenagement-interieur", "renovation-complete"],
    metaDescription:
      "Rénovation de cuisine et de salle de bain dans le Calvados : plomberie, électricité, carrelage et agencement pilotés dans le bon ordre par votre courtier en travaux.",
  },
  {
    slug: "extension-surelevation",
    titre: "Extension & surélévation",
    titreCourt: "Extension & surélévation",
    description:
      "Gagner des mètres carrés sans déménager, avec les bons interlocuteurs pour la conception, les démarches et la réalisation.",
    sousServices: [
      { titre: "Extension ossature bois ou maçonnée" },
      { titre: "Surélévation" },
      { titre: "Aménagement de combles" },
    ],
    estCePourMoi: [
      "Je manque de place mais je ne souhaite pas déménager.",
      "J'ai besoin d'être orienté vers les bons interlocuteurs pour la conception et les démarches administratives.",
      "J'hésite encore entre extension, surélévation et aménagement de combles.",
    ],
    faq: [
      {
        question: "Prenez-vous en charge les démarches administratives ?",
        reponse:
          "Nous vous orientons vers les bons interlocuteurs pour la conception, les démarches et la réalisation, et nous coordonnons leur intervention dans le planning du projet.",
      },
      {
        question: "Intervenez-vous en limite du Calvados ?",
        reponse:
          "En limite de département, contactez-nous : nous vous dirons franchement si nous pouvons assurer le suivi dans de bonnes conditions.",
      },
    ],
    connexes: ["renovation-complete", "amenagement-interieur"],
    metaDescription:
      "Extension, surélévation et aménagement de combles dans le Calvados : conception, démarches et réalisation coordonnées par votre courtier en travaux.",
  },
  {
    slug: "amenagement-interieur",
    titre: "Aménagement intérieur",
    titreCourt: "Aménagement intérieur",
    description:
      "Redessiner les volumes et soigner les finitions : cloisons, sols, peintures, menuiseries et lumière.",
    sousServices: [
      { titre: "Optimisation des volumes" },
      { titre: "Peinture & revêtements" },
      { titre: "Menuiseries intérieures" },
    ],
    estCePourMoi: [
      "Mes volumes actuels ne correspondent plus à mon usage du logement.",
      "Je veux reprendre les sols, les peintures ou les menuiseries intérieures avec un rendu soigné.",
      "Je cherche des artisans finisseurs fiables plutôt que les plus visibles.",
    ],
    faq: [
      {
        question: "Les finitions sont-elles suivies jusqu'à la réception ?",
        reponse:
          "Oui. Le suivi de chantier comprend la coordination, les points d'avancement et les arbitrages jusqu'à la livraison et la réception des travaux.",
      },
      {
        question: "Puis-je comparer plusieurs devis ?",
        reponse:
          "C'est le principe : nous vous présentons des devis comparables poste par poste, négociés. Vous voyez les devis, vous décidez.",
      },
    ],
    connexes: ["cuisine-salle-de-bain", "renovation-complete"],
    metaDescription:
      "Aménagement intérieur dans le Calvados : cloisons, sols, peintures, menuiseries et lumière coordonnés par votre courtier en travaux.",
  },
  {
    slug: "amenagement-exterieur",
    titre: "Aménagement extérieur",
    titreCourt: "Aménagement extérieur",
    description:
      "Prolonger la maison dehors : terrasses, clôtures, allées et façades, avec des entreprises habituées au climat normand.",
    sousServices: [
      { titre: "Terrasse & pergola" },
      { titre: "Clôture & portail" },
      { titre: "Ravalement de façade" },
    ],
    estCePourMoi: [
      "Je veux prolonger mon espace de vie à l'extérieur (terrasse, pergola).",
      "Ma façade, ma clôture ou mes allées ont besoin d'être reprises.",
      "Je veux des entreprises habituées au climat normand et à ses contraintes.",
    ],
    faq: [
      {
        question: "Les entreprises tiennent-elles compte du climat normand ?",
        reponse:
          "Nous travaillons avec des entreprises locales habituées au climat normand et aux contraintes qu'il impose aux ouvrages extérieurs.",
      },
      {
        question: "Dans quelles communes intervenez-vous ?",
        reponse:
          "Tout le Calvados et ses alentours : Caen et son agglomération, Bayeux, Lisieux, Falaise, Vire, la Côte de Nacre et le Pays d'Auge.",
      },
    ],
    connexes: ["renovation-complete", "extension-surelevation"],
    metaDescription:
      "Aménagement extérieur dans le Calvados : terrasse, pergola, clôture, portail et ravalement de façade avec des entreprises habituées au climat normand.",
  },
];

/** Carte « Autre » : renvoie vers /contact, pas de page dédiée. */
export const serviceAutre = {
  titre: "Autre",
  description:
    "Votre projet n'est pas dans la liste ? Parlez-nous-en. Si nous ne sommes pas les mieux placés, nous vous le dirons franchement.",
  href: "/contact",
  cta: "Nous en parler",
};

/** Filtres « par besoin » de la page /services (chips). */
export const filtresBesoin = [
  { id: "tous", label: "Tous les besoins", slugs: services.map((s) => s.slug) },
  {
    id: "agrandir",
    label: "Agrandir",
    slugs: ["extension-surelevation"],
  },
  {
    id: "renover",
    label: "Rénover",
    slugs: ["renovation-complete", "cuisine-salle-de-bain"],
  },
  {
    id: "embellir",
    label: "Embellir",
    slugs: ["amenagement-interieur", "amenagement-exterieur"],
  },
  {
    id: "adapter",
    label: "Adapter & mettre aux normes",
    slugs: ["renovation-complete", "cuisine-salle-de-bain"],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServices(slugs: string[]): Service[] {
  return slugs
    .map((slug) => getService(slug))
    .filter((s): s is Service => Boolean(s));
}

/** Options du champ « Sujet » du formulaire de contact : 5 services + Autre. */
export const sujetsContact = [
  ...services.map((s) => ({ valeur: s.slug, label: s.titre })),
  { valeur: "autre", label: "Autre" },
];
