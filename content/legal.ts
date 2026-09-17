/**
 * Textes juridiques : mentions légales et politique de confidentialité.
 * Contenu réel du site actuel. Les informations non publiées restent
 * des placeholders "[À COMPLÉTER : ...]" visibles.
 */

import { contact, entreprise } from "./entreprise";

export const mentionsLegales = {
  titre: "Mentions légales",
  miseAJour: "Informations à compléter avant la mise en ligne.",
  blocs: [
    {
      titre: "Éditeur du site",
      lignes: [
        { label: "Raison sociale", valeur: "Home Consilium — courtier en travaux" },
        { label: "Forme juridique", valeur: entreprise.formeJuridique },
        { label: "SIRET / SIREN", valeur: entreprise.siret },
        { label: "Adresse du siège", valeur: entreprise.adresse },
        { label: "Capital social", valeur: entreprise.capitalSocial },
        { label: "RCS", valeur: entreprise.rcs },
        { label: "TVA intracommunautaire", valeur: entreprise.tvaIntracom },
      ],
    },
    {
      titre: "Contact",
      lignes: [
        { label: "Téléphone", valeur: contact.telephone },
        { label: "Email", valeur: contact.email },
      ],
    },
    {
      titre: "Directeur de la publication",
      lignes: [{ label: "Directeur de la publication", valeur: entreprise.directeurPublication }],
    },
    {
      titre: "Hébergement",
      lignes: [{ label: "Hébergeur", valeur: entreprise.hebergeur }],
    },
    {
      titre: "Propriété intellectuelle",
      lignes: [
        {
          label: "",
          valeur:
            "L'ensemble des contenus de ce site (textes, identité visuelle, éléments graphiques) est la propriété de Home Consilium, sauf mention contraire.",
        },
      ],
    },
  ],
} as const;

export const confidentialite = {
  titre: "Politique de confidentialité",
  intro:
    "Home Consilium traite vos données personnelles dans le respect du Règlement général sur la protection des données (RGPD).",
  sections: [
    {
      titre: "Données collectées",
      paragraphes: [
        "Via le formulaire de contact : prénom, nom, téléphone et adresse email.",
        "Lors de nos échanges directs : les détails de votre projet nécessaires à son évaluation.",
      ],
    },
    {
      titre: "Finalités du traitement",
      paragraphes: [
        "Répondre à vos demandes.",
        "Évaluer les projets qui nous sont soumis.",
        "Vous orienter vers les entreprises adaptées à votre projet.",
        "Assurer le suivi contractuel.",
      ],
    },
    {
      titre: "Durée de conservation",
      paragraphes: [
        "Demande restée sans suite : 12 mois à compter du dernier contact.",
        "Projet concrétisé : durée de la relation contractuelle, augmentée des durées imposées par les obligations légales commerciales.",
      ],
    },
    {
      titre: "Destinataires des données",
      paragraphes: [
        "Home Consilium et, si nécessaire, les prestataires consultés pour l'établissement des devis — auxquels seules les informations pertinentes pour votre projet sont transmises.",
      ],
    },
    {
      titre: "Vos droits",
      paragraphes: [
        "Vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation, d'opposition et de portabilité de vos données.",
        `Pour les exercer, écrivez à ${contact.email}. Une réponse vous sera apportée dans un délai maximum d'un mois.`,
        "Vous pouvez également introduire une réclamation auprès de la CNIL.",
      ],
    },
    {
      titre: "Cookies",
      paragraphes: [
        "En l'état actuel, ce site ne dépose aucun cookie de suivi ni de publicité.",
      ],
    },
    {
      titre: "Contact",
      paragraphes: [
        `Pour toute question relative à vos données : ${contact.email} — ${contact.telephone}.`,
        "Aucun délégué à la protection des données (DPO) n'est désigné à ce jour.",
      ],
    },
  ],
} as const;

/** Bandeau d'information cookies — honnête : aucun cookie de suivi n'est déposé. */
export const bandeauCookies = {
  message: "Ce site n'utilise aucun cookie de suivi ni publicitaire.",
  detail:
    "Seules les informations que vous nous transmettez volontairement via le formulaire de contact sont traitées.",
  bouton: "J'ai compris",
  lien: { label: "Politique de confidentialité", href: "/confidentialite" },
} as const;
