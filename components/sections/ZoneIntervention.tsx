import { zoneIntervention } from "@/content/entreprise";
import { Section, TitreSection } from "@/components/sections/Section";
import { Badge } from "@/components/ui/Badge";
import { Blobs } from "@/components/ui/Blobs";

export function ZoneIntervention() {
  return (
    <Section className="relative overflow-hidden">
      <Blobs variante="discret" />
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <TitreSection
          surtitre="Zone d'intervention"
          titre={zoneIntervention.titre}
          intro={zoneIntervention.limiteDepartement}
        />
        <div className="glass glass-readable rounded-lg p-6 md:p-8">
          <Badge ton="terre" className="mb-5">
            {zoneIntervention.badge}
          </Badge>
          <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {zoneIntervention.villes.map((ville) => (
              <li
                key={ville}
                className="flex items-start gap-2.5 text-[15px] text-ink"
              >
                <span
                  aria-hidden="true"
                  className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-terre-600"
                />
                {ville}
              </li>
            ))}
          </ul>
          <p className="mt-6 border-t pt-5 text-[14px] text-ink-muted">
            {zoneIntervention.departement} · {zoneIntervention.region}
          </p>
        </div>
      </div>
    </Section>
  );
}
