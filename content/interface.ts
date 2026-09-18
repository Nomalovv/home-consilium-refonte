/**
 * Libellés d'interface (boutons, titres de colonnes, états).
 *
 * Règle du projet : aucun texte en dur dans les composants — y compris les
 * valeurs par défaut des props. Tout ce qui s'affiche transite par /content.
 *
 * Chaque libellé long possède, quand c'est utile, une variante `…Court`
 * affichée en dessous du point de rupture `sm` (téléphones).
 */

import { contact, devis } from "./entreprise";

/** Bloc d'appel à l'action réutilisé en fin de page. */
export const ctaGlobal = {
  titre: "Parlons de votre projet",
  texte:
    "Un café, votre projet, et des réponses franches. Premier échange sans engagement, devis gratuit — et si nous ne sommes pas les mieux placés, nous vous le dirons.",
  texteCourt:
    "Premier échange sans engagement, devis gratuit, et des réponses franches.",
  href: "/contact",
  libelle: "Demander un devis gratuit",
  libelleCourt: devis.gratuit,
  /** Libellé du lien téléphone secondaire (le numéro suit). */
  libelleAppel: "ou appelez-nous au",
  reassurance: `${devis.gratuit} · ${devis.sansEngagement} · ${contact.horairesResume}`,
  reassuranceCourte: `${devis.sansEngagement} · ${contact.horairesCourt}`,
} as const;

/** En-tête. */
export const header = {
  ariaAccueil: "Home Consilium — accueil",
  ariaNavPrincipale: "Navigation principale",
  ariaNavMobile: "Navigation mobile",
  ariaDomaines: "Afficher les domaines de service",
  ouvrirMenu: "Ouvrir le menu",
  fermerMenu: "Fermer le menu",
  cta: devis.gratuit,
  ariaAppel: `Appeler le ${contact.telephone}`,
} as const;

/** Méga-menu bureau. */
export const megaMenu = {
  tousLesServices: "Voir tous les services",
} as const;

/** Pied de page. */
export const footer = {
  colonneServices: "Services",
  colonneNavigation: "Navigation",
  colonneContact: "Contact",
  labelContact: "Contact",
  labelAdresse: "Adresse",
} as const;

/** Section méthode condensée (accueil, pages service). */
export const methodeCondensee = {
  surtitre: "Notre méthode",
  lienDetail: "Voir la méthode en détail",
} as const;

/** Section zone d'intervention. */
export const zoneSection = {
  surtitre: "Où nous intervenons",
  legendeDepartements: "Les cinq départements normands",
  legendeVilles: "Quelques repères, parmi d'autres",
} as const;

/** Section avis clients (état vide honnête). */
export const sectionAvis = {
  surtitre: "Avis clients",
  mentionFicheGoogle: "Fiche Google Business",
  cta: "Devenir notre premier avis",
} as const;

/** Titres et liens des sections de l'accueil. */
export const accueil = {
  quiz: {
    surtitre: "En une minute",
    titre: "Quel est votre besoin ?",
    intro:
      "Trois questions pour identifier le domaine concerné et préparer votre demande. Rien n'est enregistré à cette étape.",
    introCourte: "Trois questions, rien d'enregistré à cette étape.",
  },
  services: {
    surtitre: "Nos domaines",
    titre: "Cinq domaines, un seul interlocuteur",
    intro:
      "Du chantier complet au lot technique, nous choisissons les entreprises adaptées et coordonnons leur intervention.",
    introCourte: "Du chantier complet au petit lot technique.",
    lien: "Voir tous les services",
  },
  faq: {
    surtitre: "FAQ",
    titre: "Les questions qui reviennent le plus",
    relance:
      "D'autres questions sur les délais, la zone d'intervention ou la sélection des artisans ?",
    lien: "Consulter la FAQ complète",
  },
  panneau: {
    labelDevis: "Devis",
    labelContact: "Contact",
  },
} as const;

/** Questionnaire guidé de l'accueil. */
export const quiz = {
  etapes: [
    "Quel type de projet avez-vous en tête ?",
    "Où se situe le bien ?",
    "À quel stade en êtes-vous ?",
    "Voilà où nous vous orientons",
  ],
  optionInconnu: "Je ne sais pas encore",
  stades: [
    { valeur: "idee", label: "Juste une idée" },
    { valeur: "devis", label: "J'ai des devis ailleurs" },
    { valeur: "pret", label: "Je suis prêt à démarrer" },
  ],
  progression: "Progression du questionnaire",
  etapeCourante: (n: number, total: number) => `Étape ${n} / ${total}`,
  precedent: "Étape précédente",
  recommencer: "Recommencer",
  resultatConnu: "Votre projet relève de notre domaine",
  resultatInconnu:
    "Vous n'avez pas encore mis un mot sur votre projet ? Ce n'est pas grave : parlez-nous-en, et si nous ne sommes pas les mieux placés, nous vous le dirons franchement.",
  ctaFormulaire: "Continuer vers le formulaire",
  ctaService: "Découvrir ce service",
  note: "Le formulaire de contact sera pré-rempli avec vos réponses.",
} as const;

/** Barre d'action fixe affichée sur mobile uniquement. */
export const barreAction = {
  aria: "Actions rapides",
  devis: devis.gratuit,
  appeler: "Appeler",
  ariaAppeler: `Appeler Home Consilium au ${contact.telephone}`,
} as const;
