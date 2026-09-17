import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/sections/Section";
import { CTA } from "@/components/sections/CTA";
import { Breadcrumb, maillesDepuisChemin } from "@/components/layout/Breadcrumb";
import { ServicesExplorer } from "@/components/sections/ServicesExplorer";
import { construireMetadata } from "@/lib/seo";
import { zoneIntervention } from "@/content/entreprise";

export const metadata = construireMetadata({
  titre: "Nos services",
  description:
    "Rénovation complète, cuisine et salle de bain, extension et surélévation, aménagement intérieur et extérieur : les cinq domaines de Home Consilium, courtier en travaux dans le Calvados.",
  chemin: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <Hero
        compact
        badge={zoneIntervention.badge}
        surtitre="Services"
        titre="Cinq domaines, un seul interlocuteur"
        intro="Chaque domaine regroupe les corps de métier que nous coordonnons pour vous. Votre projet n'entre dans aucune case ? Parlez-nous-en quand même."
      />

      <Section className="pt-0">
        <Breadcrumb mailles={maillesDepuisChemin("/services")} />
        <ServicesExplorer />
      </Section>

      <CTA
        titre="Un doute sur le domaine concerné ?"
        texte="Décrivez-nous votre projet : nous identifions les lots à consulter et les entreprises adaptées. Si nous ne sommes pas les mieux placés, nous vous le dirons franchement."
      />
    </>
  );
}
