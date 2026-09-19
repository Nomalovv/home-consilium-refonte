"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

import { CarteRealisation } from "@/components/sections/CarteRealisation";
import { Section } from "@/components/sections/Section";
import { ButtonLink } from "@/components/ui/Button";
import {
  Visionneuse,
  type ImageVisionneuse,
} from "@/components/ui/Visionneuse";
import {
  carrouselRealisations,
  realisations,
  type Projet,
  type SlideApercu,
} from "@/content/entreprise";
import { visionneuse as libellesVisionneuse } from "@/content/interface";
import { useReducedMotion } from "@/lib/hooks";
import { asset, cn } from "@/lib/utils";

/** Une vignette du carrousel, avec ce qu'il faut pour l'agrandir. */
type Vignette = {
  cle: string;
  legende: string;
  carte: ReactNode;
  /** Image principale puis, le cas échéant, le reste de la galerie du projet. */
  images: ImageVisionneuse[];
};

/**
 * Carrousel de réalisations de l'accueil.
 *
 * Le mouvement est permanent et visible : un **anneau 3D** qui tourne d'un
 * cran toutes les `dureeSlideMs` à partir de la tablette, une **bande qui
 * défile en boucle** sur téléphone. Les deux sont animés en `transform` /
 * `opacity` seulement, sans aucun rendu React par image : l'anneau ne bouge
 * qu'au changement de cran, la bande est une animation CSS pure.
 *
 * Un clic sur une vignette ouvre la visionneuse plein écran ; le carrousel
 * s'arrête tant qu'elle est ouverte et repart à sa fermeture.
 *
 * WCAG 2.2.2 : bouton Pause / Lecture toujours atteignable, arrêt au survol,
 * au focus, hors écran et en arrière-plan, aucun mouvement automatique sous
 * `prefers-reduced-motion` (l'anneau reste navigable à la main).
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
    return <Piste vignettes={projets.map(vignetteDeProjet)} />;
  }

  if (carrouselRealisations.afficherApercu && carrouselRealisations.apercu.length > 0) {
    return (
      <Piste
        apercu
        vignettes={carrouselRealisations.apercu.map(vignetteDApercu)}
      />
    );
  }

  return <EtatVide />;
}

function vignetteDeProjet(projet: Projet): Vignette {
  const legende = `${projet.titre} — ${projet.categorie} · ${projet.ville}`;
  const alt =
    projet.alt ?? realisations.altParDefaut(projet.titre, projet.ville);
  return {
    cle: projet.titre,
    legende,
    carte: <CarteRealisation projet={projet} className="w-full" />,
    images: [
      { src: projet.image, alt, legende },
      ...(projet.images ?? []).map((src) => ({ src, alt, legende })),
    ],
  };
}

function vignetteDApercu(slide: SlideApercu): Vignette {
  return {
    cle: slide.image,
    legende: slide.legende,
    carte: <CarteApercu slide={slide} />,
    images: [
      {
        src: slide.image,
        alt: slide.alt,
        legende: slide.legende,
        badge: carrouselRealisations.badgeApercu,
      },
    ],
  };
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
        <span
          data-legende
          className="absolute left-3 top-3 rounded-full bg-terre-800 px-2.5 py-1 text-[12px] font-semibold uppercase tracking-[0.1em] text-terre-100"
        >
          {carrouselRealisations.badgeApercu}
        </span>
      </div>

      <div data-legende className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-balance font-display text-[17px] font-semibold text-ardoise-900 dark:text-ardoise-100 sm:text-[18px]">
          {slide.legende}
        </p>
      </div>
    </article>
  );
}

/** Écart angulaire entre deux vignettes de l'anneau. */
const PAS_ANGULAIRE = 30;
/** Nombre de vignettes visibles de chaque côté de celle de devant. */
const PROFONDEUR = 2;

/** Distance circulaire la plus courte de `i` à `actif` : l'anneau boucle. */
function ecartCirculaire(i: number, actif: number, total: number): number {
  const brut = (((i - actif) % total) + total) % total;
  return brut > total / 2 ? brut - total : brut;
}

/** Place une vignette sur le demi-cercle (variables lues par `.anneau-carte`). */
function placement(ecart: number): CSSProperties {
  const angle = ecart * PAS_ANGULAIRE;
  const rad = (angle * Math.PI) / 180;
  const distance = Math.min(Math.abs(ecart), PROFONDEUR + 1);
  return {
    "--sin": Math.sin(rad).toFixed(4),
    "--cos": Math.cos(rad).toFixed(4),
    "--angle": `${-angle}deg`,
    "--echelle": (1 - distance * 0.11).toFixed(3),
    zIndex: 20 - distance,
    opacity: distance === 0 ? 1 : distance === 1 ? 0.62 : distance === 2 ? 0.34 : 0,
  } as CSSProperties;
}

function Piste({
  vignettes,
  apercu = false,
}: {
  vignettes: Vignette[];
  apercu?: boolean;
}) {
  const { dureeSlideMs, dureePauseMs, dureeBandeParVignetteMs } =
    carrouselRealisations;
  const total = vignettes.length;

  const bloc = useRef<HTMLDivElement>(null);
  const figeRef = useRef<number | null>(null);
  const departToucher = useRef<number | null>(null);

  const [actif, setActif] = useState(0);
  const [decalageBande, setDecalageBande] = useState(0);
  const [pauseManuelle, setPauseManuelle] = useState(false);
  const [figeJusqua, setFigeJusqua] = useState<number | null>(null);
  const [restant, setRestant] = useState(0);
  const [survol, setSurvol] = useState(false);
  const [dansLeChamp, setDansLeChamp] = useState(false);
  const [ongletVisible, setOngletVisible] = useState(true);
  const [vue, setVue] = useState<number | null>(null);
  const [cycle, setCycle] = useState(0);

  const mouvementReduit = useReducedMotion();

  /* Toutes les images agrandissables, dans l'ordre des vignettes. */
  const imagesVisionneuse = vignettes.flatMap((v) => v.images);
  const departVisionneuse: number[] = [];
  vignettes.reduce((n, v) => {
    departVisionneuse.push(n);
    return n + v.images.length;
  }, 0);

  /** Fige le défilement après une navigation manuelle. */
  const figer = useCallback(() => {
    const cible = Date.now() + dureePauseMs;
    if (figeRef.current && cible - figeRef.current < 1000) return;
    figeRef.current = cible;
    setFigeJusqua(cible);
    setRestant(Math.ceil(dureePauseMs / 1000));
  }, [dureePauseMs]);

  const tourner = useCallback(
    (pas: 1 | -1, parLaPersonne: boolean) => {
      setActif((i) => (i + pas + total) % total);
      setDecalageBande((d) => d - pas);
      if (parLaPersonne) figer();
    },
    [total, figer],
  );

  const allerA = useCallback(
    (i: number) => {
      setDecalageBande((d) => d - ecartCirculaire(i, actif, total) * -1);
      setActif(i);
      figer();
    },
    [actif, total, figer],
  );

  /* Arrêt quand la section n'est plus à l'écran. */
  useEffect(() => {
    const el = bloc.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setDansLeChamp(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entree]) => setDansLeChamp(entree.isIntersecting),
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* Arrêt quand l'onglet passe en arrière-plan. */
  useEffect(() => {
    const surChangement = () => setOngletVisible(!document.hidden);
    surChangement();
    document.addEventListener("visibilitychange", surChangement);
    return () => document.removeEventListener("visibilitychange", surChangement);
  }, []);

  /* Compte à rebours du figeage, puis reprise. */
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

  const visionneuseOuverte = vue !== null;
  const enPause =
    pauseManuelle || figeJusqua !== null || survol || visionneuseOuverte;
  const defilementAuto =
    !mouvementReduit && !enPause && dansLeChamp && ongletVisible && total > 1;

  /* Rotation automatique : un minuteur par cran, remis à zéro à chaque arrêt. */
  useEffect(() => {
    if (!defilementAuto) return;
    const id = window.setTimeout(() => tourner(1, false), dureeSlideMs);
    return () => window.clearTimeout(id);
  }, [defilementAuto, actif, cycle, dureeSlideMs, tourner]);

  const surToucheAnneau = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      tourner(1, true);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      tourner(-1, true);
    }
  };

  /** Glissement horizontal : un cran par geste, sur l'anneau comme sur la bande. */
  const surDepartToucher = (e: React.TouchEvent) => {
    departToucher.current = e.touches[0]?.clientX ?? null;
  };
  const surFinToucher = (e: React.TouchEvent) => {
    const depart = departToucher.current;
    const fin = e.changedTouches[0]?.clientX;
    departToucher.current = null;
    if (depart === null || fin === undefined) return;
    if (Math.abs(fin - depart) < 44) return;
    tourner(fin < depart ? 1 : -1, true);
  };

  /** Le survol n'existe qu'à la souris : sur un écran tactile, il collerait. */
  const surEntree = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") setSurvol(true);
  };
  const surSortie = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") setSurvol(false);
  };

  const ouvrir = (indexVignette: number) => setVue(departVisionneuse[indexVignette]);

  return (
    <Section id="realisations" aria={carrouselRealisations.titre}>
      <div
        ref={bloc}
        style={
          {
            "--duree-slide": `${dureeSlideMs}ms`,
            "--duree-bande": `${(dureeBandeParVignetteMs * total) / 1000}s`,
          } as CSSProperties
        }
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

        {/* Téléphone : bande qui défile en boucle. */}
        <Bande
          vignettes={vignettes}
          decalage={decalageBande}
          enPause={enPause}
          onOuvrir={ouvrir}
          onDepartToucher={surDepartToucher}
          onFinToucher={surFinToucher}
          onEntree={surEntree}
          onSortie={surSortie}
          onFocus={() => setSurvol(true)}
          onBlur={() => setSurvol(false)}
        />

        {/* Tablette et plus : demi-arc de cercle en rotation. */}
        <Anneau
          vignettes={vignettes}
          actif={actif}
          onOuvrir={ouvrir}
          onTouche={surToucheAnneau}
          onDepartToucher={surDepartToucher}
          onFinToucher={surFinToucher}
          onEntree={surEntree}
          onSortie={surSortie}
          onFocus={() => setSurvol(true)}
          onBlur={() => setSurvol(false)}
        />

        {/* Points de progression et compteur : l'anneau a des crans, pas la bande. */}
        <div className="mt-4 hidden items-center gap-3 md:flex">
          <ul className="flex flex-1 flex-wrap items-center gap-0.5">
            {vignettes.map((v, i) => (
              <li key={v.cle}>
                <button
                  type="button"
                  onClick={() => allerA(i)}
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
            {carrouselRealisations.compteur(actif + 1, total)}
          </p>
        </div>

        {/* État du défilement : figeage en cours, ou mouvement réduit. */}
        {mouvementReduit ? (
          <p className="mt-3 text-[13px] text-ink-muted">
            {carrouselRealisations.mouvementReduit}
          </p>
        ) : (
          (figeJusqua !== null || pauseManuelle) && (
            <p className="mt-3 flex items-center gap-2 text-[13px] text-ink-muted">
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
          Annonce vocale seulement à l'arrêt : pendant la rotation, une annonce
          toutes les quelques secondes serait insupportable.
        */}
        <p className="sr-only" aria-live="polite">
          {!defilementAuto ? carrouselRealisations.annonce(actif + 1, total) : ""}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-3 sm:mt-5">
          <div className="flex items-center gap-2">
            <BoutonPiste
              libelle={carrouselRealisations.precedent}
              onClick={() => tourner(-1, true)}
              sens="precedent"
            />
            <BoutonPiste
              libelle={carrouselRealisations.suivant}
              onClick={() => tourner(1, true)}
              sens="suivant"
            />
            <BoutonPauseLecture
              enPause={pauseManuelle}
              onClick={() => {
                setPauseManuelle((p) => {
                  if (p) {
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

      {vue !== null && (
        <Visionneuse
          images={imagesVisionneuse}
          index={vue}
          onIndex={setVue}
          onFermer={() => setVue(null)}
        />
      )}
    </Section>
  );
}

/**
 * Anneau 3D — tablette et grand écran.
 *
 * Les vignettes sont posées sur un demi-cercle : celle de devant fait face et
 * porte seule le texte, les latérales sont inclinées, reculées et atténuées.
 * Comme elles n'affichent plus que leur image, leur atténuation ne pose aucun
 * problème de contraste ; elles sont sorties de l'arbre d'accessibilité et du
 * parcours clavier, la vignette de devant restant le seul élément actionnable.
 */
function Anneau({
  vignettes,
  actif,
  onOuvrir,
  onTouche,
  onDepartToucher,
  onFinToucher,
  onEntree,
  onSortie,
  onFocus,
  onBlur,
}: {
  vignettes: Vignette[];
  actif: number;
  onOuvrir: (i: number) => void;
  onTouche: (e: React.KeyboardEvent) => void;
  onDepartToucher: (e: React.TouchEvent) => void;
  onFinToucher: (e: React.TouchEvent) => void;
  onEntree: (e: React.PointerEvent) => void;
  onSortie: (e: React.PointerEvent) => void;
  onFocus: () => void;
  onBlur: () => void;
}) {
  const total = vignettes.length;
  return (
    <div
      onKeyDown={onTouche}
      onTouchStart={onDepartToucher}
      onTouchEnd={onFinToucher}
      onPointerEnter={onEntree}
      onPointerLeave={onSortie}
      onFocusCapture={onFocus}
      onBlurCapture={onBlur}
      className="anneau mt-6 hidden h-[clamp(330px,33vw,470px)] md:block"
    >
      <span aria-hidden="true" className="anneau-ombre" />
      {vignettes.map((v, i) => {
        const ecart = ecartCirculaire(i, actif, total);
        const devant = ecart === 0;
        const cachee = Math.abs(ecart) > PROFONDEUR;
        return (
          <div
            key={v.cle}
            style={placement(ecart)}
            aria-hidden={!devant}
            className={cn(
              "anneau-carte w-[min(46%,420px)]",
              cachee && "pointer-events-none",
              !devant && "[&_[data-legende]]:opacity-0",
              "[&_[data-legende]]:transition-opacity [&_[data-legende]]:duration-500",
            )}
          >
            <button
              type="button"
              tabIndex={devant ? 0 : -1}
              onClick={() => onOuvrir(i)}
              aria-label={libellesVisionneuse.agrandir(v.legende)}
              className={cn(
                "block w-full rounded-lg text-left transition-shadow duration-500",
                devant && "shadow-lift [&>article]:ring-1 [&>article]:ring-terre-500/60",
              )}
            >
              {v.carte}
            </button>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Bande défilante — téléphone.
 *
 * Deux copies de la liste glissent d'une demi-longueur en boucle : le
 * mouvement est continu, sans coupure, et ne coûte rien (animation CSS sur
 * `transform`, aucun rendu React). Le décalage manuel des boutons est porté
 * par un conteneur séparé pour ne pas perturber l'animation.
 */
function Bande({
  vignettes,
  decalage,
  enPause,
  onOuvrir,
  onDepartToucher,
  onFinToucher,
  onEntree,
  onSortie,
  onFocus,
  onBlur,
}: {
  vignettes: Vignette[];
  decalage: number;
  enPause: boolean;
  onOuvrir: (i: number) => void;
  onDepartToucher: (e: React.TouchEvent) => void;
  onFinToucher: (e: React.TouchEvent) => void;
  onEntree: (e: React.PointerEvent) => void;
  onSortie: (e: React.PointerEvent) => void;
  onFocus: () => void;
  onBlur: () => void;
}) {
  const copies = [0, 1];
  return (
    <div
      onTouchStart={onDepartToucher}
      onTouchEnd={onFinToucher}
      onPointerEnter={onEntree}
      onPointerLeave={onSortie}
      onFocusCapture={onFocus}
      onBlurCapture={onBlur}
      className="bande mt-5 md:hidden"
    >
      <div
        className="transition-transform duration-700 ease-doux"
        style={{ transform: `translate3d(${decalage * 274}px, 0, 0)` }}
      >
        <div
          className="bande-piste"
          style={{ animationPlayState: enPause ? "paused" : "running" }}
        >
          {copies.map((copie) =>
            vignettes.map((v, i) => (
              <div
                key={`${copie}-${v.cle}`}
                aria-hidden={copie === 1}
                className="w-[260px] shrink-0"
              >
                <button
                  type="button"
                  tabIndex={copie === 1 ? -1 : 0}
                  onClick={() => onOuvrir(i)}
                  aria-label={libellesVisionneuse.agrandir(v.legende)}
                  className="block w-full rounded-lg text-left"
                >
                  {v.carte}
                </button>
              </div>
            )),
          )}
        </div>
      </div>
    </div>
  );
}

function BoutonPiste({
  libelle,
  onClick,
  sens,
}: {
  libelle: string;
  onClick: () => void;
  sens: "precedent" | "suivant";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={libelle}
      className={cn(
        "glass glass-sm cible-tactile inline-flex h-11 w-11 items-center justify-center rounded-full",
        "text-ardoise-900 transition-all duration-300 ease-doux dark:text-ardoise-100",
        "hover:-translate-y-0.5 hover:shadow-lift motion-reduce:hover:translate-y-0",
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
