/**
 * La méthode Home Consilium — « Quatre étapes, zéro zone d'ombre ».
 * Contenu réel du site actuel.
 */

export type EtapeMethode = {
  numero: string;
  titre: string;
  resume: string;
  details: string[];
};

export const methode = {
  titre: "Quatre étapes, zéro zone d'ombre",
  intro:
    "De la première visite à la réception du chantier, la même personne suit votre projet.",
  etapes: [
    {
      numero: "01",
      titre: "Un interlocuteur unique",
      resume:
        "Écoute de votre projet, visite des lieux et rédaction d'un cahier des charges précis.",
      details: [
        "Écoute de votre projet et de vos contraintes",
        "Visite des lieux",
        "Rédaction d'un cahier des charges précis",
      ],
    },
    {
      numero: "02",
      titre: "Sélection rigoureuse",
      resume:
        "Des artisans qualifiés, assurés et vérifiés, choisis pour votre chantier et pas pour leur visibilité.",
      details: [
        "Assurance décennale et responsabilité civile à jour",
        "Situation administrative régulière",
        "Qualifications vérifiées",
        "Réalisations passées et retours de chantiers précédents",
      ],
    },
    {
      numero: "03",
      titre: "Comparaison et négociation",
      resume:
        "Des devis comparables poste par poste, négociés. Vous voyez les devis, vous décidez.",
      details: [
        "Devis présentés poste par poste pour être réellement comparables",
        "Négociation des conditions",
        "Transparence totale : vous voyez les devis, vous décidez",
      ],
    },
    {
      numero: "04",
      titre: "Suivi de chantier",
      resume:
        "Coordination des entreprises, points d'avancement et arbitrages jusqu'à la réception.",
      details: [
        "Coordination des corps de métier",
        "Points d'avancement réguliers",
        "Arbitrages jusqu'à la livraison et la réception du chantier",
      ],
    },
  ] as EtapeMethode[],
  verification: {
    titre: "Comment nous vérifions les artisans",
    intro:
      "Avant de vous présenter une entreprise, nous contrôlons systématiquement :",
    points: [
      "Assurance décennale et responsabilité civile à jour",
      "Situation administrative régulière",
      "Qualifications correspondant au lot concerné",
      "Réalisations passées",
      "Retours de chantiers précédents",
    ],
  },
  delais: {
    titre: "Les délais, clairement",
    points: [
      "Premier échange sans engagement, à votre initiative.",
      "Visite technique sur place pour cadrer le projet.",
      "Devis transmis 1 à 2 semaines après la visite technique.",
      "Aucune obligation de donner suite après réception des devis.",
    ],
  },
} as const;

/** Version condensée utilisée sur l'accueil et les pages service. */
export const etapesCondensees = methode.etapes.map((e) => ({
  numero: e.numero,
  titre: e.titre,
  resume: e.resume,
}));
