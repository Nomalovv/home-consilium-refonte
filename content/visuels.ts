/**
 * Libellés des illustrations SVG dessinées pour le site.
 *
 * Aucune photo n'est utilisée : les visuels sont des dessins vectoriels
 * maison (traits, aplats terre cuite / miel / ardoise). Ils ne représentent
 * aucun chantier réel, aucune réalisation et aucune personne réelle — ils
 * donnent simplement de la chaleur et du rythme aux pages.
 *
 * Règle du projet : aucun texte en dur dans les composants. Les titres
 * accessibles des SVG passent donc par ce fichier.
 */

export const visuels = {
  maison: {
    titre:
      "Illustration : une maison à colombages sous un ciel doux, sa cheminée fume",
  },
  outils: {
    titre: "Illustration : une truelle, un mètre ruban et un pinceau croisés",
  },
  artisans: {
    titre:
      "Illustration : deux mains qui se serrent au-dessus d'un plan de travaux",
  },
  cotesEtToits: {
    titre: "Illustration : une ligne de toits normands au-dessus de la mer",
  },
} as const;
