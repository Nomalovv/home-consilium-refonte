import { zoneIntervention } from "@/content/entreprise";
import { zoneSection } from "@/content/interface";
import { Section, TitreSection } from "@/components/sections/Section";
import { Badge } from "@/components/ui/Badge";
import { Blobs } from "@/components/ui/Blobs";
import { IllustrationCotesEtToits } from "@/components/ui/Illustrations";

export function ZoneIntervention() {
  return (
    <Section className="relative overflow-hidden">
      <Blobs variante="discret" />
      <div className="grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-12">
        <div>
          <TitreSection
            surtitre={zoneSection.surtitre}
            titre={zoneIntervention.titre}
            intro={zoneIntervention.limiteRegion}
            introCourte={zoneIntervention.limiteRegionCourte}
          />
          <IllustrationCotesEtToits
            decoratif
            className="mt-6 h-16 w-full opacity-70 sm:h-20 lg:mt-8"
          />
        </div>

        <div className="glass glass-readable rounded-lg p-5 sm:p-6 md:p-8">
          <Badge ton="terre" className="mb-4 sm:mb-5">
            {zoneIntervention.badge}
          </Badge>

          <p className="text-[12.5px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
            {zoneSection.legendeDepartements}
          </p>
          <ul className="mt-2.5 flex flex-wrap gap-1.5">
            {zoneIntervention.departements.map((d) => (
              <li key={d}>
                <Badge ton="miel">{d}</Badge>
              </li>
            ))}
          </ul>

          <p className="mt-6 border-t pt-5 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
            {zoneSection.legendeVilles}
          </p>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5 sm:grid-cols-3">
            {zoneIntervention.villes.map((ville) => (
              <li
                key={ville}
                className="flex items-start gap-2 text-[14px] leading-snug text-ink sm:text-[14.5px]"
              >
                <span
                  aria-hidden="true"
                  className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-terre-600"
                />
                {ville}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
