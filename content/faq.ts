/**
 * FAQ — contenu réel du site actuel, réparti en 5 catégories.
 */

export type QuestionFaq = {
  id: string;
  categorie: CategorieFaqId;
  question: string;
  reponse: string;
  /** Mise en avant sur l'accueil (3 questions clés). */
  cle?: boolean;
};

export type CategorieFaqId =
  | "engagement"
  | "delais"
  | "zone"
  | "selection"
  | "petits-chantiers";

export const categoriesFaq: { id: CategorieFaqId; label: string }[] = [
  { id: "engagement", label: "Engagement" },
  { id: "delais", label: "Délais" },
  { id: "zone", label: "Zone géographique" },
  { id: "selection", label: "Sélection des artisans" },
  { id: "petits-chantiers", label: "Petits chantiers" },
];

export const faq: QuestionFaq[] = [
  {
    id: "sans-engagement",
    categorie: "engagement",
    question: "Suis-je engagé si je vous contacte ?",
    reponse:
      "Non. Le premier échange est sans engagement et vous n'avez aucune obligation de donner suite.",
    cle: true,
  },
  {
    id: "cout-service",
    categorie: "engagement",
    question: "Le devis est-il gratuit ?",
    reponse:
      "Oui, le devis est gratuit et le premier échange se fait sans engagement de votre part.",
  },
  {
    id: "delai-devis",
    categorie: "delais",
    question: "Sous quel délai recevrai-je mes devis ?",
    reponse:
      "Les devis vous sont transmis 1 à 2 semaines après la visite technique.",
    cle: true,
  },
  {
    id: "etapes-projet",
    categorie: "delais",
    question: "Comment se déroule le début du projet ?",
    reponse:
      "Un premier échange sans engagement, puis une visite technique sur place pour cadrer le projet et rédiger un cahier des charges précis. Les devis suivent sous 1 à 2 semaines.",
  },
  {
    id: "zone-intervention",
    categorie: "zone",
    question: "Dans quelle zone intervenez-vous ?",
    reponse:
      "Tout le Calvados et ses alentours : Caen et son agglomération, Bayeux, Lisieux, Falaise, Vire, la Côte de Nacre et le Pays d'Auge.",
    cle: true,
  },
  {
    id: "limite-departement",
    categorie: "zone",
    question: "Et si mon projet se situe en limite de département ?",
    reponse:
      "En limite de département, contactez-nous : nous vous dirons franchement si nous pouvons assurer le suivi dans de bonnes conditions.",
  },
  {
    id: "verification-artisans",
    categorie: "selection",
    question: "Comment sélectionnez-vous les artisans ?",
    reponse:
      "Chaque entreprise est vérifiée avant de vous être présentée : assurance décennale et responsabilité civile à jour, situation administrative régulière, qualifications, réalisations passées et retours de chantiers précédents.",
  },
  {
    id: "choix-artisan",
    categorie: "selection",
    question: "Qui choisit finalement l'entreprise ?",
    reponse:
      "Vous. Nous vous présentons des devis comparables poste par poste et négociés : vous voyez les devis, vous décidez.",
  },
  {
    id: "petit-chantier",
    categorie: "petits-chantiers",
    question: "Acceptez-vous les projets de petite envergure ?",
    reponse:
      "Parlez-nous de votre projet, quelle que soit sa taille : nous vous dirons franchement si nous pouvons vous accompagner.",
  },
  {
    id: "projet-hors-liste",
    categorie: "petits-chantiers",
    question: "Mon projet n'entre dans aucune de vos catégories, que faire ?",
    reponse:
      "Parlez-nous-en. Si nous ne sommes pas les mieux placés, nous vous le dirons franchement.",
  },
];

export const faqCles = faq.filter((q) => q.cle);

export function faqParCategorie(id: CategorieFaqId): QuestionFaq[] {
  return faq.filter((q) => q.categorie === id);
}
