"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";

import { CarteRealisation } from "@/components/sections/CarteRealisation";
import { Section } from "@/components/sections/Section";
import { ButtonLink } from "@/components/ui/Button";
import {
  carrouselRealisations,
  realisations,
  type SlideApercu,
} from "@/content/entreprise";
import { useReducedMotion } from "@/lib/hooks";
import { asset, cn } from "@/lib/utils";

/**
 * Carrousel de réalisations de l'accueil.
 *
 * Défilement horizontal natif avec accrochage : le glissement tactile reste
 * celui du navigateur (donc fluide et interruptible), les boutons ne font que
 * le piloter. Pas d'autoplay : rien ne bouge tant que la personne n'agit pas.
 *
 * Seuls les projets réellement photographiés sont affichés. Tant qu'il n'y en
 * a aucun, la section montre des vignettes d'**aperçu** — des illustrations
 * dessinées pour le site, étiquetées « Aperçu », qui laissent voir comment le
 * carrousel se comportera une fois les vraies photos déposées. Aucune photo
 * empruntée, aucun chantier inventé. `carrouselRealisations.afficherApercu`
 * à `false` ramène l'état vide.
 */
export function CarrouselRealisations() {
  const projets = realisations.projets.filter((p) => p.image);

  // Dès qu'une vraie photo existe, l'aperçu s'efface de lui-même.
  if (projets.length > 0) {
    return (
      <Piste
        cartes={projets.map((p) => ({
          cle: p.titre,
          carte: <CarteRealisation projet={p} className="w-full" />,
        }))}
      />
    );
  }

  if (carrouselRealisations.afficherApercu && carrouselRealisations.apercu.length > 0) {
    return (
      <Piste
        apercu
        cartes={carrouselRealisations.apercu.map((slide) => ({
          cle: slide.image,
          carte: <CarteApercu slide={slide} />,
        }))}
      />
    );
  }

  return <EtatVide />;
}

/**
 * Vignette de démonstration : même gabarit que la carte de réalisation, mais
 * étiquetée « Aperçu » et légendée de façon générique. Rien n'y est présenté
 * comme un chantier de l'entreprise.
 */
function CarteApercu({ slide }: { slide: SlideApercu }) {
  return (
    <article className="glass glass-readable flex h-full w-full flex-col overflow-hidden rounded-lg">
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset(slide.image)}
          alt={slide.alt}
          width={800}
          height={600}
          loading="lazy"
          decoding="async"
          className="aspect-[4/3] w-full bg-lin object-cover dark:bg-white/[0.06]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-terre-800/20 via-transparent to-transparent"
        />
        {/* Terre cuite 800 + crème : 6,7:1, identique en clair et en sombre. */}
        <span className="absolute left-3 top-3 rounded-full bg-terre-800 px-2.5 py-1 text-[12px] font-semibold uppercase tracking-[0.1em] text-terre-100">
          {carrouselRealisations.badgeApercu}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-balance font-display text-[17px] font-semibold text-ardoise-900 dark:text-ardoise-100 sm:text-[18px]">
          {slide.legende}
        </p>
      </div>
    </article>
  );
}

/** Distance d'un « pas » : d'une carte à la suivante, gouttière comprise. */
function pasDeDefilement(piste: HTMLElement): number {
  const premiere = piste.children[0] as HTMLElement | undefined;
  const seconde = piste.children[1] as HTMLElement | undefined;
  if (premiere && seconde) return seconde.offsetLeft - premiere.offsetLeft;
  if (premiere) return premiere.getBoundingClientRect().width;
  return piste.clientWidth;
}

function Piste({
  cartes,
  apercu = false,
}: {
  cartes: { cle: string; carte: ReactNode }[];
  /** Mode démonstration : intro honnête + mention « Aperçu du rendu ». */
  apercu?: boolean;
}) {
  const piste = useRef<HTMLUListElement>(null);
  const [versGauche, setVersGauche] = useState(false);
  const [versDroite, setVersDroite] = useState(false);
  const [actif, setActif] = useState(0);
  const mouvementReduit = useReducedMotion();

  const majEtat = useCallback(() => {
    const el = piste.current;
    if (!el) return;
    const restant = el.scrollWidth - el.clientWidth;
    // Marge de 4 px : les navigateurs arrondissent le scrollLeft.
    setVersGauche(el.scrollLeft > 4);
    setVersDroite(el.scrollLeft < restant - 4);
    const pas = pasDeDefilement(el) || 1;
    setActif(Math.max(0, Math.min(cartes.length - 1, Math.round(el.scrollLeft / pas))));
  }, [cartes.length]);

  useEffect(() => {
    const el = piste.current;
    if (!el) return;
    majEtat();
    el.addEventListener("scroll", majEtat, { passive: true });
    window.addEventListener("resize", majEtat);
    return () => {
      el.removeEventListener("scroll", majEtat);
      window.removeEventListener("resize", majEtat);
    };
  }, [majEtat]);

  const glisser = useCallback(
    (sens: 1 | -1) => {
      const el = piste.current;
      if (!el) return;
      el.scrollBy({
        left: sens * pasDeDefilement(el),
        behavior: mouvementReduit ? "auto" : "smooth",
      });
    },
    [mouvementReduit],
  );

  /** Flèches, Début et Fin sur la piste (qui est focalisable au clavier). */
  const surTouche = (e: KeyboardEvent<HTMLUListElement>) => {
    const el = piste.current;
    if (!el) return;
    const doux = mouvementReduit ? ("auto" as const) : ("smooth" as const);
    if (e.key === "ArrowRight") {
      e.preventDefault();
      glisser(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      glisser(-1);
    } else if (e.key === "Home") {
      e.preventDefault();
      el.scrollTo({ left: 0, behavior: doux });
    } else if (e.key === "End") {
      e.preventDefault();
      el.scrollTo({ left: el.scrollWidth, behavior: doux });
    }
  };

  return (
    <Section id="realisations" aria={carrouselRealisations.titre}>
      <div className="max-w-3xl">
        <p className="mb-2.5 flex items-center gap-2 text-[12.5px] font-semibold uppercase tracking-[0.16em] text-terre-700 dark:text-terre-300 sm:text-[13px]">
          <span aria-hidden="true" className="h-px w-6 shrink-0 bg-terre-500" />
          {carrouselRealisations.surtitre}
        </p>
        <h2 className="text-balance font-display text-h2 font-semibold text-ardoise-900 dark:text-ardoise-100">
          {carrouselRealisations.titre}
        </h2>
        {apercu ? (
          /*
            En mode aperçu, l'intro habituelle serait fausse : ces vignettes ne
            sont pas des chantiers photographiés. On garde donc le texte de
            l'état vide, qui dit la vérité, et la mention d'aperçu juste après.
          */
          <p className="mt-3 max-w-lisible text-corps-lg text-ink-muted sm:mt-4">
            {carrouselRealisations.etatVide}
          </p>
        ) : (
          <p className="mt-3 max-w-lisible text-corps-lg text-ink-muted sm:mt-4">
            <span className="sm:hidden">{carrouselRealisations.introCourte}</span>
            <span className="hidden sm:inline">{carrouselRealisations.intro}</span>
          </p>
        )}
      </div>

      {apercu && (
        <p className="glass glass-readable mt-5 inline-flex items-center gap-2.5 rounded-full py-2 pe-4 ps-2.5 text-[13px] text-ink sm:mt-6 sm:text-[13.5px]">
          <span className="rounded-full bg-terre-800 px-2.5 py-1 text-[11.5px] font-semibold uppercase tracking-[0.1em] text-terre-100">
            {carrouselRealisations.badgeApercu}
          </span>
          {carrouselRealisations.mentionApercu}
        </p>
      )}

      {/*
        Région défilante focalisable : sans `tabIndex`, un contenu qui déborde
        reste inatteignable au clavier.
      */}
      <ul
        ref={piste}
        tabIndex={0}
        role="group"
        aria-label={carrouselRealisations.aria}
        onKeyDown={surTouche}
        className={cn(
          "carrousel-photos",
          apercu ? "mt-5 sm:mt-7" : "mt-7 sm:mt-10",
        )}
      >
        {cartes.map((c) => (
          <li key={c.cle} className="flex">
            {c.carte}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3 sm:mt-6">
        <div className="flex items-center gap-2">
          <BoutonPiste
            libelle={carrouselRealisations.precedent}
            disponible={versGauche}
            onClick={() => glisser(-1)}
            sens="precedent"
          />
          <BoutonPiste
            libelle={carrouselRealisations.suivant}
            disponible={versDroite}
            onClick={() => glisser(1)}
            sens="suivant"
          />
        </div>

        {/* Indicateur décoratif : la position est déjà lisible à l'écran. */}
        <ul aria-hidden="true" className="flex items-center gap-1.5">
          {cartes.map((c, i) => (
            <li
              key={c.cle}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300 ease-doux",
                i === actif
                  ? "w-5 bg-terre-600"
                  : "w-1.5 bg-terre-300 dark:bg-terre-700",
              )}
            />
          ))}
        </ul>

        {/* En aperçu, la section garde son appel à l'action. */}
        {apercu && (
          <ButtonLink
            href={carrouselRealisations.etatVideHref}
            variante="secondaire"
            className="sm:ms-auto"
          >
            {carrouselRealisations.etatVideLien}
          </ButtonLink>
        )}

        <Link
          href={carrouselRealisations.href}
          className={cn(
            "lien-souligne cible-tactile group inline-flex items-center gap-2 font-semibold text-terre-700 dark:text-terre-300",
            !apercu && "ms-auto",
          )}
        >
          {carrouselRealisations.lien}
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1.5"
          >
            →
          </span>
        </Link>
      </div>
    </Section>
  );
}

function BoutonPiste({
  libelle,
  disponible,
  onClick,
  sens,
}: {
  libelle: string;
  disponible: boolean;
  onClick: () => void;
  sens: "precedent" | "suivant";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!disponible}
      aria-label={libelle}
      className={cn(
        "glass glass-sm cible-tactile inline-flex h-11 w-11 items-center justify-center rounded-full",
        "text-ardoise-900 transition-all duration-300 ease-doux dark:text-ardoise-100",
        "hover:-translate-y-0.5 hover:shadow-lift motion-reduce:hover:translate-y-0",
        "disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-none",
      )}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d={sens === "precedent" ? "M14.5 5 8 12l6.5 7" : "M9.5 5 16 12l-6.5 7"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

/**
 * Aucun projet photographié : un bloc court et honnête, sans fausses cartes
 * ni images d'illustration empruntées. Les trois cadres sont explicitement
 * vides — ils montrent la place qui attend les photos, ils ne simulent aucun
 * chantier.
 */
function EtatVide() {
  return (
    <Section id="realisations" aria={carrouselRealisations.titre}>
      <div className="glass glass-readable grid gap-6 rounded-xl p-5 sm:p-7 md:grid-cols-[1.05fr_0.95fr] md:items-center md:gap-10 md:p-9">
        <div>
          <p className="mb-2 flex items-center gap-2 text-[12.5px] font-semibold uppercase tracking-[0.16em] text-terre-700 dark:text-terre-300 sm:text-[13px]">
            <span aria-hidden="true" className="h-px w-6 shrink-0 bg-terre-500" />
            {carrouselRealisations.surtitre}
          </p>
          <h2 className="text-balance font-display text-h2 font-semibold text-ardoise-900 dark:text-ardoise-100">
            {carrouselRealisations.titre}
          </h2>
          <p className="mt-3 max-w-lisible text-ink-muted">
            {carrouselRealisations.etatVide}
          </p>
          <div className="mt-5 flex flex-col items-start gap-3 sm:mt-6 sm:flex-row sm:items-center">
            <ButtonLink
              href={carrouselRealisations.etatVideHref}
              variante="secondaire"
            >
              {carrouselRealisations.etatVideLien}
            </ButtonLink>
            <ButtonLink href={carrouselRealisations.href} variante="lien">
              {carrouselRealisations.lien}
            </ButtonLink>
          </div>
        </div>

        <div>
          <ul
            aria-hidden="true"
            className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3.5"
          >
            {[0, 1, 2].map((i) => (
              <li
                key={i}
                className={cn(
                  "motif-tuiles flex aspect-[4/3] items-center justify-center rounded-md border border-dashed",
                  "border-terre-300 bg-terre-100/40 dark:border-terre-700 dark:bg-terre-700/10",
                  i === 2 && "hidden sm:flex",
                )}
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-terre-600/70 dark:text-terre-300/60"
                >
                  <rect
                    x="3"
                    y="6"
                    width="18"
                    height="13"
                    rx="3"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <path
                    d="M8.5 6 10 3.6h4L15.5 6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="12.5"
                    r="3.4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                </svg>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[13px] text-ink-muted sm:text-[13.5px]">
            {carrouselRealisations.etatVideMention}
          </p>
        </div>
      </div>
    </Section>
  );
}
