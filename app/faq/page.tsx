import dynamic from "next/dynamic";

import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/sections/Section";
import { CTA } from "@/components/sections/CTA";
import { Breadcrumb, maillesDepuisChemin } from "@/components/layout/Breadcrumb";
import { categoriesFaq, faq } from "@/content/faq";
import { construireMetadata, jsonLdFaq } from "@/lib/seo";

const FaqSearch = dynamic(() => import("@/components/interactive/FaqSearch"));

export const metadata = construireMetadata({
  titre: "Questions fréquentes",
  description:
    "Engagement, délais, zone d'intervention, sélection des artisans, petits chantiers : les réponses de Home Consilium, courtier en travaux dans le Calvados.",
  chemin: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq()) }}
      />

      <Hero
        compact
        surtitre="FAQ"
        titre="Vos questions, nos réponses"
        intro={`${faq.length} questions réparties en ${categoriesFaq.length} catégories : engagement, délais, zone géographique, sélection des artisans et petits chantiers.`}
      />

      <Section className="pt-0">
        <Breadcrumb mailles={maillesDepuisChemin("/faq")} />
        <FaqSearch />
      </Section>

      <CTA
        titre="Vous n'avez pas trouvé votre réponse ?"
        texte="Posez-nous directement la question. Premier échange sans engagement, et une réponse franche même si nous ne sommes pas les mieux placés."
        libelle="Poser ma question"
      />
    </>
  );
}
