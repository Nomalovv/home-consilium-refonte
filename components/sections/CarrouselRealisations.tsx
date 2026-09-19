"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
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
 * Il défile tout seul, une vignette à la fois, et s'arrête dès qu'on s'y
 * intéresse : survol à la souris, focus clavier, tape sur une image, flèche,
 * point de progression ou glissement tactile figent le défilement pendant
 * `dureePauseMs`, avec un compte à rebours visible. Un bouton Pause / Lecture
 * permet de le figer aussi longtemps qu'on veut.
 *
 * Le défilement reste celui du navigateur (`scroll-snap`) : le glissement
 * tactile est donc natif, fluide et interruptible ; le minuteur ne fait que
 * piloter un `scrollTo`. Les seules propriétés animées sont `transform` et
 * `opacity`.
 *
 * WCAG 2.2.2 : aucun autoplay si `prefers-reduced-motion`, bouton de pause
 * toujours atteignable, arrêt quand l'onglet passe en arrière-plan ou quand la
 * section sort du champ, annonces `aria-live` uniquement à l'arrêt.
 *
 * Seuls les projets réellement photographiés sont affichés. Tant qu'il n'y en
 * a aucun, la section montre des vignettes d'**aperçu** — des illustrations
 * dessinées pour le site, étiquetées « Aperçu ». Aucune photo empruntée, aucun
 * chantier inventé. `carrouselRealisations.afficherApercu` à `false` ramène
 * l'état vide.
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
      <div className="relative overflow-hidden">
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
        {/* Terre cuite 800 + crème : 6,8:1, identique en clair et en sombre. */}
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
  const { dureeSlideMs, dureePauseMs } = carrouselRealisations;

  const piste = useRef<HTMLUListElement>(null);
  const bloc = useRef<HTMLDivElement>(null);
  /** Jusqu'à quand les événements `scroll` viennent de nous, pas de la personne. */
  const defilementProgramme = useRef(0);
  const figeRef = useRef<number | null>(null);

  const [actif, setActif] = useState(0);
  const [positions, setPositions] = useState(1);
  const [versGauche, setVersGauche] = useState(false);
  const [versDroite, setVersDroite] = useState(false);
  const [pauseManuelle, setPauseManuelle] = useState(false);
  const [figeJusqua, setFigeJusqua] = useState<number | null>(null);
  const [restant, setRestant] = useState(0);
  const [survol, setSurvol] = useState(false);
  const [dansLeChamp, setDansLeChamp] = useState(false);
  const [ongletVisible, setOngletVisible] = useState(true);
  /** Relance l'animation de la barre quand on reprend sans changer de vignette. */
  const [cycle, setCycle] = useState(0);

  const mouvementReduit = useReducedMotion();

  /** Fige le défilement pour `dureePauseMs`, à chaque geste de la personne. */
  const figer = useCallback(() => {
    const cible = Date.now() + dureePauseMs;
    // Pendant un glissement, `scroll` se déclenche en rafale : on ne repousse
    // l'échéance que si elle a déjà bougé d'au moins une seconde.
    if (figeRef.current && cible - figeRef.current < 1000) return;
    figeRef.current = cible;
    setFigeJusqua(cible);
    setRestant(Math.ceil(dureePauseMs / 1000));
  }, [dureePauseMs]);

  const majEtat = useCallback(() => {
    const el = piste.current;
    if (!el) return;
    const restantPx = el.scrollWidth - el.clientWidth;
    const pas = pasDeDefilement(el) || 1;
    // Marge de 4 px : les navigateurs arrondissent le scrollLeft.
    setVersGauche(el.scrollLeft > 4);
    setVersDroite(el.scrollLeft < restantPx - 4);
    setPositions(Math.max(1, Math.round(restantPx / pas) + 1));
    setActif(
      Math.max(0, Math.min(cartes.length - 1, Math.round(el.scrollLeft / pas))),
    );
  }, [cartes.length]);

  useEffect(() => {
    const el = piste.current;
    if (!el) return;
    majEtat();
    const surDefilement = () => {
      majEtat();
      // Défilement déclenché par la personne (glissement tactile, molette) :
      // on fige, comme pour les autres commandes.
      if (Date.now() > defilementProgramme.current) figer();
    };
    el.addEventListener("scroll", surDefilement, { passive: true });
    window.addEventListener("resize", majEtat);
    return () => {
      el.removeEventListener("scroll", surDefilement);
      window.removeEventListener("resize", majEtat);
    };
  }, [majEtat, figer]);

  /** Arrêt quand la section n'est plus à l'écran. */
  useEffect(() => {
    const el = bloc.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setDansLeChamp(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entree]) => setDansLeChamp(entree.isIntersecting),
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /** Arrêt quand l'onglet passe en arrière-plan. */
  useEffect(() => {
    const surChangement = () => setOngletVisible(!document.hidden);
    surChangement();
    document.addEventListener("visibilitychange", surChangement);
    return () => document.removeEventListener("visibilitychange", surChangement);
  }, []);

  /** Compte à rebours du figeage, puis reprise. */
  useEffect(() => {
    if (figeJusqua === null) return;
    const tic = () => {
      const secondes = Math.ceil((figeJusqua - Date.now()) / 1000);
      if (secondes <= 0) {
        figeRef.current = null;
        setFigeJusqua(null);
        setRestant(0);
        setCycle((c) => c + 1);
      } else {
        setRestant(secondes);
      }
    };
    tic();
    const id = window.setInterval(tic, 500);
    return () => window.clearInterval(id);
  }, [figeJusqua]);

  const allerA = useCallback(
    (index: number, parLaPersonne: boolean) => {
      const el = piste.current;
      if (!el) return;
      const pas = pasDeDefilement(el) || 1;
      const cible = Math.max(
        0,
        Math.min(index, Math.round((el.scrollWidth - el.clientWidth) / pas)),
      );
      defilementProgramme.current = Date.now() + 1000;
      el.scrollTo({
        left: cible * pas,
        behavior: mouvementReduit ? "auto" : "smooth",
      });
      if (parLaPersonne) figer();
    },
    [mouvementReduit, figer],
  );

  const glisser = useCallback(
    (sens: 1 | -1) => allerA(actif + sens, true),
    [allerA, actif],
  );

  const enPause = pauseManuelle || figeJusqua !== null || survol;
  const defilementAuto =
    !mouvementReduit && !enPause && dansLeChamp && ongletVisible && positions > 1;

  /** Avance automatique : un minuteur par vignette, remis à zéro à chaque arrêt. */
  useEffect(() => {
    if (!defilementAuto) return;
    const id = window.setTimeout(() => {
      allerA(actif + 1 >= positions ? 0 : actif + 1, false);
    }, dureeSlideMs);
    return () => window.clearTimeout(id);
  }, [defilementAuto, actif, positions, cycle, dureeSlideMs, allerA]);

  /** Flèches, Début et Fin sur la piste (qui est focalisable au clavier). */
  const surTouche = (e: KeyboardEvent<HTMLUListElement>) => {
    const el = piste.current;
    if (!el) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      glisser(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      glisser(-1);
    } else if (e.key === "Home") {
      e.preventDefault();
      allerA(0, true);
    } else if (e.key === "End") {
      e.preventDefault();
      allerA(positions - 1, true);
    }
  };

  /** Le survol n'existe qu'à la souris : sur un écran tactile, il collerait. */
  const surEntree = (e: ReactPointerEvent) => {
    if (e.pointerType === "mouse") setSurvol(true);
  };
  const surSortie = (e: ReactPointerEvent) => {
    if (e.pointerType === "mouse") setSurvol(false);
  };

  const positionLisible = Math.min(actif + 1, positions);

  return (
    <Section id="realisations" aria={carrouselRealisations.titre}>
      <div
        ref={bloc}
        onPointerEnter={surEntree}
        onPointerLeave={surSortie}
        onFocusCapture={() => setSurvol(true)}
        onBlurCapture={() => setSurvol(false)}
        style={{ ["--duree-slide" as string]: `${dureeSlideMs}ms` }}
      >
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
          onPointerDown={figer}
          className={cn(
            "carrousel-photos",
            apercu ? "mt-5 sm:mt-7" : "mt-7 sm:mt-10",
          )}
        >
          {cartes.map((c, i) => (
            <li
              key={c.cle}
              data-actif={i === actif ? "true" : "false"}
              className={cn(
                "flex transition-[transform,opacity] duration-500 ease-doux",
                /* Zoom très lent sur la vignette active, façon Ken Burns. */
                "[&_img]:transition-transform [&_img]:ease-out",
                i === actif
                  ? "opacity-100 [&>article]:shadow-lift [&>article]:ring-1 [&>article]:ring-terre-500/60 [&_img]:scale-[1.06] [&_img]:duration-[6000ms]"
                  : /* 0,85 et pas moins : en dessous, le badge « Aperçu »
                       posé sur la vignette tombe sous le seuil AA. */
                    "scale-[0.97] opacity-[0.85] [&_img]:scale-100 [&_img]:duration-700",
              )}
            >
              {c.carte}
            </li>
          ))}
        </ul>

        {/* Barre de progression « story » + compteur */}
        <div className="mt-4 flex items-center gap-3 sm:mt-5">
          <ul className="flex flex-1 flex-wrap items-center gap-0.5">
            {Array.from({ length: positions }, (_, i) => (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => allerA(i, true)}
                  aria-label={carrouselRealisations.allerA(i + 1)}
                  aria-current={i === actif ? "true" : undefined}
                  className="group flex h-11 items-center px-1"
                >
                  <span
                    className={cn(
                      "block h-1.5 overflow-hidden rounded-full transition-all duration-500 ease-doux",
                      i === actif
                        ? "w-10 bg-terre-200 dark:bg-terre-700/60"
                        : "w-4 bg-terre-300/80 group-hover:bg-terre-500 dark:bg-terre-700",
                    )}
                  >
                    {i === actif && (
                      <span
                        key={`${actif}-${cycle}`}
                        className={cn(
                          "block h-full w-full origin-left rounded-full bg-terre-600 dark:bg-terre-300",
                          defilementAuto || enPause
                            ? "animate-progression"
                            : "scale-x-0",
                        )}
                        style={{
                          animationPlayState: enPause ? "paused" : "running",
                        }}
                      />
                    )}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <p className="shrink-0 font-display text-[13px] font-semibold tabular-nums tracking-wide text-ink-muted sm:text-[14px]">
            {carrouselRealisations.compteur(positionLisible, positions)}
          </p>
        </div>

        {/* État du défilement : figeage en cours, ou mouvement réduit. */}
        {mouvementReduit ? (
          <p className="mt-2 text-[13px] text-ink-muted">
            {carrouselRealisations.mouvementReduit}
          </p>
        ) : (
          (figeJusqua !== null || pauseManuelle) && (
            <p className="mt-2 flex items-center gap-2 text-[13px] text-ink-muted">
              <span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 rounded-full bg-terre-600"
              />
              {carrouselRealisations.etiquettePause}
              {figeJusqua !== null && !pauseManuelle && (
                <> · {carrouselRealisations.repriseDans(restant)}</>
              )}
            </p>
          )
        )}

        {/*
          Annonce vocale seulement à l'arrêt : pendant le défilement automatique,
          une annonce toutes les quelques secondes serait insupportable.
        */}
        <p className="sr-only" aria-live="polite">
          {!defilementAuto
            ? carrouselRealisations.annonce(positionLisible, positions)
            : ""}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-3 sm:mt-5">
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
            <BoutonPauseLecture
              enPause={pauseManuelle}
              onClick={() => {
                setPauseManuelle((p) => {
                  if (p) {
                    // Reprise explicite : on annule aussi le figeage en cours.
                    figeRef.current = null;
                    setFigeJusqua(null);
                    setCycle((c) => c + 1);
                  }
                  return !p;
                });
              }}
            />
          </div>

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

/** Commande explicite exigée par le critère WCAG 2.2.2 (mouvement automatique). */
function BoutonPauseLecture({
  enPause,
  onClick,
}: {
  enPause: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={enPause}
      aria-label={
        enPause ? carrouselRealisations.ariaLecture : carrouselRealisations.ariaPause
      }
      className={cn(
        "glass glass-sm cible-tactile inline-flex h-11 items-center gap-2 rounded-full px-3.5",
        "text-[13.5px] font-semibold text-ardoise-900 dark:text-ardoise-100",
        "transition-all duration-300 ease-doux hover:-translate-y-0.5 hover:shadow-lift",
        "motion-reduce:hover:translate-y-0",
      )}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
        {enPause ? (
          <path d="M8 5.5 18.5 12 8 18.5z" fill="currentColor" />
        ) : (
          <g fill="currentColor">
            <rect x="7" y="5.5" width="4" height="13" rx="1.5" />
            <rect x="13" y="5.5" width="4" height="13" rx="1.5" />
          </g>
        )}
      </svg>
      {enPause
        ? carrouselRealisations.boutonLecture
        : carrouselRealisations.boutonPause}
    </button>
  );
}

/**
 * Aucun projet photographié et aperçu désactivé : un bloc court et honnête,
 * sans fausses cartes ni images d'illustration empruntées. Les trois cadres
 * sont explicitement vides — ils montrent la place qui attend les photos, ils
 * ne simulent aucun chantier.
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
