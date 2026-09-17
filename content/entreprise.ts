/**
 * Identité, coordonnées et positionnement de Home Consilium.
 * Source unique de vérité : contenu réel du site homeconsilium.fr.
 * Toute information non publiée reste un placeholder "[À COMPLÉTER : ...]".
 */

export const A_COMPLETER = (quoi: string) => `[À COMPLÉTER : ${quoi}]`;

export const entreprise = {
  nom: "Home Consilium",
  activite: "Courtier en travaux",
  baseline: "Votre projet, notre expertise, votre sérénité",
  accroche: "Un seul interlocuteur pour tous vos travaux",
  sousTitre: "Courtier en travaux · Calvados",
  definition:
    "Intermédiaire entre les particuliers et les artisans et entreprises du bâtiment.",
  citation: "Le trait d'union entre votre projet et les bons artisans",
  formeJuridique: A_COMPLETER("forme juridique non renseignée"),
  siret: A_COMPLETER("SIRET / SIREN"),
  adresse: A_COMPLETER("aucune adresse fournie"),
  hebergeur: A_COMPLETER("hébergeur du site"),
  directeurPublication: A_COMPLETER("directeur de la publication"),
  capitalSocial: A_COMPLETER("capital social"),
  rcs: A_COMPLETER("RCS"),
  tvaIntracom: A_COMPLETER("TVA intracommunautaire"),
  ficheGoogle: A_COMPLETER("lien fiche Google Business"),
} as const;

export const contact = {
  telephone: "07 61 66 09 80",
  telephoneLien: "tel:+33761660980",
  telephoneE164: "+33761660980",
  email: "contact@homeconsilium.fr",
  emailLien: "mailto:contact@homeconsilium.fr",
  horaires: [
    { jours: "Lundi – vendredi", heures: "8h – 19h" },
    { jours: "Samedi", heures: "Sur rendez-vous" },
  ],
  horairesResume: "Lundi-vendredi 8h-19h · samedi sur rendez-vous",
} as const;

/** Aucun lien de réseau social réel n'existe : on n'affiche rien plutôt que des liens morts. */
export const reseauxSociaux: { nom: string; url: string }[] = [];

export const zoneIntervention = {
  titre: "Tout le Calvados et ses alentours",
  badge: "100% Calvados",
  departement: "Calvados",
  region: "Normandie",
  villes: [
    "Caen et son agglomération",
    "Bayeux",
    "Lisieux",
    "Falaise",
    "Vire",
    "La Côte de Nacre",
    "Le Pays d'Auge",
  ],
  /** Valeurs courtes réutilisées par le quiz guidé. */
  zonesQuiz: [
    "Caen",
    "Bayeux",
    "Lisieux",
    "Falaise",
    "Vire",
    "Côte de Nacre",
    "Pays d'Auge",
    "Autre",
  ],
  limiteDepartement:
    "En limite de département, contactez-nous : nous vous dirons franchement si nous pouvons assurer le suivi dans de bonnes conditions.",
} as const;

export const valeurs = [
  {
    titre: "Proximité locale",
    texte:
      "Une connaissance concrète du tissu artisanal du Calvados : les bonnes entreprises, pas les plus visibles.",
  },
  {
    titre: "Réactivité",
    texte:
      "Disponibilité et réponses rapides tout au long du projet, du premier échange à la réception du chantier.",
  },
  {
    titre: "Transparence totale",
    texte: "Vous voyez les devis, vous décidez. Aucune zone d'ombre.",
  },
  {
    titre: "Un seul interlocuteur",
    texte:
      "Un interlocuteur unique qui coordonne l'ensemble des corps de métier, du cahier des charges à la livraison.",
  },
] as const;

export const benefices = [
  {
    titre: "Gagnez du temps",
    texte:
      "La recherche des entreprises, les relances et la comparaison des devis sont prises en charge.",
  },
  {
    titre: "Maîtrise du budget",
    texte:
      "Des devis comparables poste par poste, négociés. Vous voyez les devis, vous décidez.",
  },
  {
    titre: "Sérénité assurée",
    texte:
      "Des artisans vérifiés et un suivi de chantier jusqu'à la réception des travaux.",
  },
] as const;

/** Personnalité de marque — 4 traits validés. */
export const traitsMarque = [
  {
    mot: "Lucide",
    texte:
      "Si nous ne sommes pas les mieux placés pour votre projet, nous vous le disons franchement.",
  },
  {
    mot: "Rigoureux",
    texte:
      "Assurance décennale et RC à jour, situation administrative régulière, qualifications et retours de chantiers : chaque artisan est vérifié.",
  },
  {
    mot: "Ancré",
    texte:
      "Tout le Calvados et ses alentours, avec les entreprises habituées au climat et aux usages normands.",
  },
  {
    mot: "Direct",
    texte:
      "Un seul interlocuteur, des devis comparables poste par poste, zéro zone d'ombre.",
  },
] as const;

/** Chiffres structurels et vérifiables uniquement. Aucun chiffre business inventé. */
export const chiffresStructurels = [
  { valeur: "4", libelle: "étapes de méthode" },
  { valeur: "5", libelle: "domaines de service" },
  { valeur: "100%", libelle: "Calvados" },
] as const;

export const temoignages = {
  titre: "Ils nous font confiance",
  etatVide:
    "Les avis de nos premiers clients arriveront bientôt ici. Nous préférons une page honnête à des témoignages de complaisance.",
  lienGoogle: entreprise.ficheGoogle,
} as const;

export const realisations = {
  /** Aucun projet réel documenté : la galerie reste volontairement vide. */
  projets: [] as {
    titre: string;
    categorie: string;
    ville: string;
    image: string;
  }[],
  filtres: [
    "Tous",
    "Rénovation complète",
    "Cuisine & salle de bain",
    "Extension & surélévation",
    "Aménagement intérieur",
    "Aménagement extérieur",
  ],
  etatVide:
    "Nos premières réalisations seront publiées ici, avec l'accord des clients concernés. Plutôt que d'afficher des projets qui ne sont pas les nôtres, nous préférons attendre d'avoir de vraies photos de chantier à vous montrer.",
} as const;

export const devis = {
  gratuit: "Devis gratuit",
  sansEngagement: "Premier échange sans engagement",
  delai: "1 à 2 semaines après la visite technique",
} as const;

export const SITE_URL = "https://homeconsilium.fr";
