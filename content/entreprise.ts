/**
 * Identité, coordonnées et positionnement de Home Consilium.
 * Source unique de vérité : contenu réel du site homeconsilium.fr.
 * Toute information non publiée reste un placeholder "[À COMPLÉTER : ...]".
 *
 * Règle de ton : chaleureux, humain, « comme si on en parlait à table » —
 * sans jamais ajouter un fait, un chiffre ou une référence qui n'existe pas.
 */

export const A_COMPLETER = (quoi: string) => `[À COMPLÉTER : ${quoi}]`;

export const entreprise = {
  nom: "Home Consilium",
  activite: "Courtier en travaux",
  baseline: "Votre projet, notre expertise, votre sérénité",
  accroche: "Un seul interlocuteur pour tous vos travaux",
  /** Version courte de l'accroche, pour les petits écrans. */
  accrocheCourte: "Vos travaux, un seul interlocuteur",
  sousTitre: "Courtier en travaux · Normandie",
  definition:
    "Intermédiaire entre les particuliers et les artisans et entreprises du bâtiment.",
  /** Intro du hero d'accueil : chaleureuse, concrète, sans jargon. */
  introAccueil:
    "Vous nous racontez votre projet, on trouve les bons artisans près de chez vous, on compare les devis et on suit le chantier à vos côtés. Du premier appel au dernier coup de pinceau, c'est la même personne qui vous répond.",
  /** Version courte de l'intro, affichée en dessous de `sm`. */
  introAccueilCourte:
    "Vous racontez votre projet, on trouve les bons artisans et on suit le chantier avec vous. Une seule personne, du début à la fin.",
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
  /** Version très courte pour la barre d'action mobile. */
  horairesCourt: "Lun-ven 8h-19h",
} as const;

/** Aucun lien de réseau social réel n'existe : on n'affiche rien plutôt que des liens morts. */
export const reseauxSociaux: { nom: string; url: string }[] = [];

export const zoneIntervention = {
  titre: "Toute la Normandie, et surtout près de chez vous",
  titreCourt: "Partout en Normandie",
  badge: "100% Normandie",
  region: "Normandie",
  /** Les cinq départements qui composent la région Normandie. */
  departements: [
    "Calvados",
    "Manche",
    "Orne",
    "Eure",
    "Seine-Maritime",
  ],
  /**
   * Villes et territoires normands cités comme repères géographiques.
   * Aucune promesse de couverture commune par commune : c'est une carte
   * de repères, et la mention « en limite de région » reste affichée.
   */
  villes: [
    "Caen et son agglomération",
    "Bayeux",
    "Lisieux",
    "Falaise",
    "Vire",
    "La Côte de Nacre",
    "Le Pays d'Auge",
    "Deauville",
    "Saint-Lô",
    "Cherbourg",
    "Rouen",
    "Le Havre",
    "Dieppe",
    "Évreux",
    "Alençon",
  ],
  /** Valeurs courtes réutilisées par le quiz guidé et le formulaire. */
  zonesQuiz: [
    "Caen",
    "Bayeux",
    "Lisieux",
    "Falaise",
    "Vire",
    "Côte de Nacre",
    "Pays d'Auge",
    "Deauville",
    "Saint-Lô",
    "Cherbourg",
    "Rouen",
    "Le Havre",
    "Dieppe",
    "Évreux",
    "Alençon",
    "Autre",
  ],
  limiteRegion:
    "Votre maison est aux portes de la Normandie ? Appelez-nous quand même : on vous dira franchement si on peut suivre votre chantier dans de bonnes conditions.",
  /** Version courte de la même idée, pour les écrans étroits. */
  limiteRegionCourte:
    "Aux portes de la Normandie ? Appelez-nous : on vous répondra franchement.",
} as const;

export const valeurs = [
  {
    titre: "On connaît le terrain",
    texte:
      "Le tissu artisanal normand, on le connaît de l'intérieur : les bonnes entreprises, pas les plus visibles.",
  },
  {
    titre: "On vous répond vite",
    texte:
      "Disponibilité et réponses rapides du premier échange jusqu'à la réception du chantier. Pas de silence radio.",
  },
  {
    titre: "Rien sous le tapis",
    texte: "Vous voyez les devis, vous décidez. Aucune zone d'ombre, jamais.",
  },
  {
    titre: "Une seule personne à appeler",
    texte:
      "Un interlocuteur unique qui coordonne tous les corps de métier, du cahier des charges à la livraison.",
  },
] as const;

export const benefices = [
  {
    titre: "Vous gagnez du temps",
    texte:
      "Chercher les entreprises, relancer, comparer les devis : on s'en occupe pendant que vous vivez votre vie.",
  },
  {
    titre: "Vous maîtrisez le budget",
    texte:
      "Des devis comparables poste par poste, négociés. Vous voyez les devis, vous décidez.",
  },
  {
    titre: "Vous dormez tranquille",
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
      "Toute la Normandie, avec des entreprises qui savent ce que le climat d'ici fait aux façades et aux toitures.",
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
  { valeur: "100%", libelle: "Normandie" },
] as const;

/**
 * Version courte des valeurs/bénéfices, réservée à l'accueil : trois phrases,
 * pas de titre + paragraphe séparés. Le détail complet (valeurs + bénéfices)
 * reste sur /a-propos.
 */
export const reassurancesAccueil = [
  "Une seule personne vous suit, du premier appel à la réception du chantier.",
  "Vous voyez les devis, vous décidez : aucune zone d'ombre.",
  "Des artisans que nous choisirions pour notre propre maison.",
] as const;

export const temoignages = {
  titre: "Ils nous font confiance",
  etatVide:
    "Les mots de nos premiers clients arriveront bientôt ici. Nous préférons une page honnête à des témoignages de complaisance.",
  lienGoogle: entreprise.ficheGoogle,
} as const;

/**
 * Une photo fournie par l'entreprise.
 * `src` est un chemin depuis /public (ex. "/images/batiment.jpg").
 * Chaîne vide = aucune photo fournie : le site garde son illustration dessinée
 * plutôt que d'afficher une image d'illustration qui ne serait pas la sienne.
 * `alt` vide = image purement décorative : elle est alors masquée aux lecteurs
 * d'écran (`aria-hidden`), ce qui est le cas de l'image d'ambiance du hero.
 */
export type Photo = {
  src: string;
  alt: string;
};

/**
 * Portrait du dirigeant, accompagné des seules informations réelles
 * communiquées à son sujet : un prénom et une durée d'expérience. Aucun nom de
 * famille ni titre n'a été fourni, donc aucun n'est affiché.
 */
export type PhotoPortrait = Photo & {
  prenom: string;
  experience: string;
  /** Version courte de l'expérience, pour les étiquettes serrées. */
  experienceCourte: string;
  /** Étiquette posée sur le portrait (prénom + expérience). */
  etiquette: string;
};

const dirigeantPrenom = "Eren";
const dirigeantExperience = "11 ans d'expérience dans le bâtiment";
const dirigeantExperienceCourte = "11 ans d'expérience";

/**
 * Photos réelles fournies par l'entreprise. Voir « Ajouter vos photos » dans le
 * README. Tant que `src` est vide, rien de faux n'est affiché à la place.
 *
 * `fondHero` est une **image d'ambiance** (une villa normande face à la mer) :
 * ce n'est ni le bâtiment de l'entreprise, ni un chantier qu'elle a réalisé.
 * Elle sert uniquement de décor au premier écran de l'accueil et n'est jamais
 * présentée comme une réalisation.
 */
export const photos: {
  batiment: Photo;
  fondHero: Photo;
  dirigeant: PhotoPortrait;
} = {
  batiment: {
    src: "",
    alt: "Le bâtiment de Home Consilium, vu depuis la rue",
  },
  fondHero: {
    src: "/images/villa-normande.jpg",
    // Décorative : le texte du hero dit déjà tout. `alt` vide + aria-hidden.
    alt: "",
  },
  dirigeant: {
    src: "/images/dirigeant.jpg",
    alt: `${dirigeantPrenom}, dirigeant de Home Consilium, à son bureau`,
    prenom: dirigeantPrenom,
    experience: dirigeantExperience,
    experienceCourte: dirigeantExperienceCourte,
    etiquette: `${dirigeantPrenom} · ${dirigeantExperience}`,
  },
};

/** Une réalisation documentée, avec l'accord du client concerné. */
export type Projet = {
  titre: string;
  categorie: string;
  ville: string;
  /** Photo principale : chemin depuis /public, ex. "/images/realisations/cuisine-caen.jpg". */
  image: string;
  /** Description de la photo pour les lecteurs d'écran (sinon, texte par défaut). */
  alt?: string;
  /** Autres photos du même chantier, pour une future visionneuse. */
  images?: string[];
};

export const realisations = {
  /** Aucun projet réel documenté : la galerie reste volontairement vide. */
  projets: [] as Projet[],
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
  /** Texte alternatif de repli quand une photo de projet n'a pas son propre `alt`. */
  altParDefaut: (titre: string, ville: string) =>
    `Photo du chantier « ${titre} », à ${ville}`,
} as const;

/**
 * Une vignette de démonstration du carrousel.
 *
 * Ce sont des **illustrations dessinées pour le site** (SVG, palette terre
 * cuite / miel / crème), pas des photos : aucune image empruntée, aucun
 * chantier réel représenté. Les légendes restent génériques — pas de nom de
 * client, pas de ville, aucune prétention que ce soit une réalisation de
 * l'entreprise.
 */
export type SlideApercu = {
  /** Chemin depuis /public. */
  image: string;
  /** Légende générique, de la forme « Exemple · Cuisine ». */
  legende: string;
  /** Description de l'illustration pour les lecteurs d'écran. */
  alt: string;
};

const apercuCarrousel: SlideApercu[] = [
  {
    image: "/images/apercu/renovation-complete.svg",
    legende: "Exemple · Rénovation complète",
    alt: "Illustration d'aperçu : une maison normande à colombages entourée d'un échafaudage",
  },
  {
    image: "/images/apercu/cuisine.svg",
    legende: "Exemple · Cuisine",
    alt: "Illustration d'aperçu : une cuisine avec plan de travail, crédence et meubles",
  },
  {
    image: "/images/apercu/salle-de-bain.svg",
    legende: "Exemple · Salle de bain",
    alt: "Illustration d'aperçu : une salle de bain avec baignoire, vasque et miroir",
  },
  {
    image: "/images/apercu/extension.svg",
    legende: "Exemple · Extension",
    alt: "Illustration d'aperçu : une extension vitrée accolée à une maison",
  },
  {
    image: "/images/apercu/surelevation.svg",
    legende: "Exemple · Surélévation",
    alt: "Illustration d'aperçu : une charpente en cours de pose au-dessus d'un étage existant",
  },
  {
    image: "/images/apercu/amenagement-interieur.svg",
    legende: "Exemple · Aménagement intérieur",
    alt: "Illustration d'aperçu : un salon aménagé, canapé, étagère et lampadaire",
  },
  {
    image: "/images/apercu/amenagement-exterieur.svg",
    legende: "Exemple · Aménagement extérieur",
    alt: "Illustration d'aperçu : une terrasse en bois avec pergola et jardinières",
  },
];

/**
 * Carrousel de réalisations affiché sur l'accueil.
 * Il ne montre que les projets qui ont une photo réelle. Tant qu'il n'y en a
 * pas, il présente des vignettes d'**aperçu** clairement étiquetées (voir
 * `afficherApercu`) — ou, si l'aperçu est désactivé, un état vide honnête.
 */
export const carrouselRealisations = {
  surtitre: "En images",
  titre: "Des chantiers, pas des images de catalogue",
  intro:
    "Les projets que nous avons suivis, photographiés sur place et publiés avec l'accord des clients concernés. Faites défiler pour les parcourir.",
  introCourte: "Nos chantiers, photographiés sur place. Faites défiler.",
  /** Libellés accessibles des commandes du carrousel. */
  aria: "Carrousel des réalisations",
  precedent: "Voir les réalisations précédentes",
  suivant: "Voir les réalisations suivantes",
  lien: "Voir toutes les réalisations",
  href: "/realisations",
  /** État vide : court, sans faux projets ni faux visuels. */
  etatVide:
    "Nos premières photos de chantier arriveront ici, avec l'accord des clients concernés.",
  /** Mention posée sous les cadres vides : dit clairement ce qui manque. */
  etatVideMention: "Les photos de nos chantiers arrivent bientôt",
  etatVideLien: "Parler de votre projet",
  etatVideHref: "/contact",

  /**
   * Aperçu du rendu, en attendant les vraies photos de chantier.
   *
   * `false` suffit à revenir à l'état vide, sans toucher au code. Dès qu'un
   * projet de `realisations.projets` a une image, l'aperçu s'efface tout seul :
   * le carrousel montre alors les vraies réalisations.
   */
  afficherApercu: true,
  apercu: apercuCarrousel,
  /** Étiquette posée sur chaque vignette de démonstration. */
  badgeApercu: "Aperçu",
  /** Mention affichée au-dessus des vignettes : dit ce que l'on regarde. */
  mentionApercu:
    "Aperçu du rendu — vos photos de chantier remplaceront ces images",
} as const;

export const devis = {
  gratuit: "Devis gratuit",
  sansEngagement: "Premier échange sans engagement",
  delai: "1 à 2 semaines après la visite technique",
} as const;

export const SITE_URL = "https://homeconsilium.fr";
