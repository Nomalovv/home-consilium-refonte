import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/sections/Section";
import { CTA } from "@/components/sections/CTA";
import { Breadcrumb, maillesDepuisChemin } from "@/components/layout/Breadcrumb";
import { GalerieRealisations } from "@/components/sections/GalerieRealisations";
import { construireMetadata } from "@/lib/seo";
import { zoneIntervention } from "@/content/entreprise";

export const metadata = construireMetadata({
  titre: "Réalisations",
  description:
    "Les réalisations suivies par Home Consilium, courtier en travaux dans le Calvados. Galerie en préparation : nos premiers chantiers seront publiés avec l'accord des clients concernés.",
  chemin: "/realisations",
});

export default function RealisationsPage() {
  return (
    <>
      <Hero
        compact
        badge={zoneIntervention.badge}
        surtitre="Réalisations"
        titre="Nos chantiers, bientôt en images"
        intro="Nous préférons une page honnête à une galerie empruntée. Les projets que nous aurons suivis seront publiés ici, avec l'accord des clients concernés."
      />

      <Section className="pt-0">
        <Breadcrumb mailles={maillesDepuisChemin("/realisations")} />
        <GalerieRealisations />
      </Section>

      <CTA
        titre="Votre projet pourrait être le premier"
        texte="Parlez-nous de vos travaux : premier échange sans engagement, devis gratuit, et un seul interlocuteur du cahier des charges à la réception."
        libelle="Discuter du vôtre"
      />
    </>
  );
}
