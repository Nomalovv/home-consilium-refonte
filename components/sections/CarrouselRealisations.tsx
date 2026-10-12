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
import { asset, cn } from "@/lib/utils";

/** Une vignette du carrousel, avec ce qu'il faut pour l'agrandir. */
type Vignette = {
  cle: string;
  legende: string;
  carte: ReactNode;
  /** Image affichée en grand au clic. */
  image: ImageVisionneuse;
};

/**
 * Carrousel de réalisations de l'accueil.
 *
 * Le mouvement est permanent, sans aucune commande : un **anneau 3D** qui
 * tourne en continu à partir de la tablette (une vignette toutes les
 * `dureeSlideMs` en moyenne), une **bande qui défile en boucle** sur
 * téléphone. Les deux sont animés en `transform` / `opacity` seulement, sans
 * aucun rendu React par image.
 *
 * L'anneau ne s'arrête jamais, y compris sous `prefers-reduced-motion` (choix
 * assumé), mais ralentit quand une vignette passe devant pour la mettre en
 * valeur. Il n'est suspendu que hors écran, en arrière-plan, ou pendant
 * qu'une photo est ouverte.
 *
 * Un clic sur une vignette l'affiche en grand, sans limite de temps : la
 * visionneuse reste ouverte jusqu'à ce qu'on la ferme.
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
    image: { src: projet.image, alt, legende },
  };
}

function vignetteDApercu(slide: SlideApercu): Vignette {
  return {
    cle: slide.image,
    legende: slide.legende,
    carte: <CarteApercu slide={slide} />,
    image: {
      src: slide.image,
      alt: slide.alt,
      legende: slide.legende,
      badge: carrouselRealisations.badgeApercu,
    },
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

/** Espace constant entre deux vignettes, en pixels : elles ne se touchent jamais. */
const ESPACE = 28;
/** Réduction par cran d'écart (jusqu'à deux crans). */
const REDUCTION = 0.18;
/** Largeur de référence avant la première mesure (rendu serveur). */
const LARGEUR_DEFAUT = 380;
/**
 * Ralentissement au centre (0 = vitesse constante, 1 = arrêt complet) : la
 * file ne s'arrête jamais, mais s'attarde sur la vignette du centre et passe
 * plus vite entre deux.
 */
const ATTARDEMENT = 0.65;

/** Écart circulaire continu de `i` à `position`, dans [-total/2, total/2[. */
function ecartContinu(i: number, position: number, total: number): number {
  const brut = (((i - position) % total) + total) % total;
  return brut >= total / 2 ? brut - total : brut;
}

/** Échelle d'une vignette selon sa distance au centre. */
function echelleA(distance: number): number {
  return 1 - REDUCTION * Math.min(distance, 2);
}

/**
 * Intégrale de l'échelle de 0 à `d`. Le centre d'une vignette est posé à
 * `largeur × aire(d) + ESPACE × d` du milieu : comme l'échelle varie
 * linéairement, la distance entre deux voisines vaut exactement la moitié de
 * leurs deux largeurs plus `ESPACE`. Elles restent donc côte à côte, sans
 * jamais se chevaucher, à tout instant du défilement.
 */
function aire(d: number): number {
  const a = Math.min(d, 2);
  return a - (REDUCTION * a * a) / 2 + Math.max(0, d - 2) * echelleA(2);
}

/**
 * Les latérales sont assombries par un voile couleur de fond ; la vignette
 * qui boucle d'un bout à l'autre de la file est effacée pendant son saut.
 */
function voileA(distance: number): number {
  return Math.min(distance, 2) * 0.3;
}
function opaciteA(distance: number, total: number): number {
  return Math.max(0, Math.min(1, (total / 2 - distance) / 0.5));
}

/** Place une vignette dans la file (variables lues par `.anneau-carte`). */
function placement(ecart: number, total: number, largeur: number): CSSProperties {
  const distance = Math.abs(ecart);
  const x = Math.sign(ecart) * (largeur * aire(distance) + ESPACE * distance);
  return {
    "--x": `${x.toFixed(1)}px`,
    "--echelle": echelleA(distance).toFixed(4),
    zIndex: Math.round(1000 - distance * 100),
    opacity: opaciteA(distance, total).toFixed(3),
    "--voile": voileA(distance).toFixed(3),
  } as CSSProperties;
}

function Piste({
  vignettes,
  apercu = false,
}: {
  vignettes: Vignette[];
  apercu?: boolean;
}) {
  const { dureeSlideMs, dureeBandeParVignetteMs } =
    carrouselRealisations;
  const total = vignettes.length;

  const bloc = useRef<HTMLDivElement>(null);
  const departToucher = useRef<number | null>(null);

  const [actif, setActif] = useState(0);
  const [decalageBande, setDecalageBande] = useState(0);
  const [dansLeChamp, setDansLeChamp] = useState(false);
  const [ongletVisible, setOngletVisible] = useState(true);
  const [vue, setVue] = useState<number | null>(null);

  /** Un cran à la main : la bande glisse, l'anneau rattrape en douceur. */
  const tourner = useCallback((pas: 1 | -1) => {
    setDecalageBande((d) => d - pas);
  }, []);

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

  const enPause = vue !== null || !dansLeChamp || !ongletVisible;
  const defilementAuto = !enPause && total > 1;

  const surToucheAnneau = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      tourner(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      tourner(-1);
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
    tourner(fin < depart ? 1 : -1);
  };

  return (
    <Section id="realisations" aria={carrouselRealisations.titre}>
      <div
        ref={bloc}
        style={
          {
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
          onOuvrir={setVue}
          onDepartToucher={surDepartToucher}
          onFinToucher={surFinToucher}
        />

        {/* Tablette et plus : demi-arc de cercle en rotation. */}
        <Anneau
          vignettes={vignettes}
          enMouvement={defilementAuto}
          dureeCranMs={dureeSlideMs}
          crans={-decalageBande}
          actif={actif}
          onActif={setActif}
          onOuvrir={setVue}
          onTouche={surToucheAnneau}
          onDepartToucher={surDepartToucher}
          onFinToucher={surFinToucher}
        />

        {/* Progression et compteur, purement indicatifs : l'anneau a des crans, pas la bande. */}
        <div aria-hidden="true" className="mt-4 hidden items-center gap-3 md:flex">
          <ul className="flex flex-1 flex-wrap items-center gap-1.5">
            {vignettes.map((v, i) => (
              <li
                key={v.cle}
                className={cn(
                  "block h-1.5 rounded-full transition-all duration-700 ease-doux",
                  i === actif
                    ? "w-10 bg-terre-600 dark:bg-terre-300"
                    : "w-4 bg-terre-300/80 dark:bg-terre-700",
                )}
              />
            ))}
          </ul>

          <p className="shrink-0 font-display text-[13px] font-semibold tabular-nums tracking-wide text-ink-muted sm:text-[14px]">
            {carrouselRealisations.compteur(actif + 1, total)}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-3 sm:mt-5">
          {/* En aperçu, la section garde son appel à l'action. */}
          {apercu && (
            <ButtonLink
              href={carrouselRealisations.etatVideHref}
              variante="secondaire"
            >
              {carrouselRealisations.etatVideLien}
            </ButtonLink>
          )}

          <Link
            href={carrouselRealisations.href}
            className="lien-souligne cible-tactile group ms-auto inline-flex items-center gap-2 font-semibold text-terre-700 dark:text-terre-300"
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
          image={vignettes[vue].image}
          onFermer={() => setVue(null)}
        />
      )}
    </Section>
  );
}

/**
 * File défilante — tablette et grand écran.
 *
 * Les vignettes sont alignées côte à côte, séparées d'un espace constant :
 * aucune ne passe jamais sur une autre. Celle du centre est en grand et porte
 * seule le texte ; plus on s'en éloigne, plus elles sont petites et
 * assombries, et les bords de la file s'estompent.
 *
 * Le défilement est continu : une boucle `requestAnimationFrame` calcule à
 * chaque image la place et la taille de chaque vignette, sans aucun rendu
 * React (seul le changement de vignette centrale en déclenche un).
 *
 * Les latérales sont sorties de l'arbre d'accessibilité et du parcours
 * clavier, la vignette de devant restant le seul élément actionnable.
 */
function Anneau({
  vignettes,
  enMouvement,
  dureeCranMs,
  crans,
  actif,
  onActif,
  onOuvrir,
  onTouche,
  onDepartToucher,
  onFinToucher,
}: {
  vignettes: Vignette[];
  enMouvement: boolean;
  /** Durée moyenne pour passer d'une vignette à la suivante. */
  dureeCranMs: number;
  /** Crans ajoutés à la main (glissement, flèches), rattrapés en douceur. */
  crans: number;
  actif: number;
  onActif: (i: number) => void;
  onOuvrir: (i: number) => void;
  onTouche: (e: React.KeyboardEvent) => void;
  onDepartToucher: (e: React.TouchEvent) => void;
  onFinToucher: (e: React.TouchEvent) => void;
}) {
  const total = vignettes.length;
  const cartes = useRef<(HTMLDivElement | null)[]>([]);
  /* Avancée automatique (en crans) et part manuelle affichée : survivent aux
     relances de la boucle. */
  const avance = useRef(0);
  const manuel = useRef(crans);
  const devant = useRef(actif);
  /* Largeur réelle d'une vignette au centre : l'écartement en dépend. */
  const [largeur, setLargeur] = useState(LARGEUR_DEFAUT);

  useEffect(() => {
    const el = cartes.current[0];
    if (!el || typeof ResizeObserver === "undefined") return;
    const obs = new ResizeObserver(() => {
      if (el.offsetWidth > 0) setLargeur(el.offsetWidth);
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    let id = 0;
    let precedent: number | null = null;

    const image = (maintenant: number) => {
      if (enMouvement && precedent !== null) {
        // Un écart énorme (onglet repris, machine lente) ne fait pas sauter la file.
        avance.current += Math.min(maintenant - precedent, 100) / dureeCranMs;
      }
      precedent = maintenant;

      manuel.current += (crans - manuel.current) * 0.1;
      const stable = Math.abs(crans - manuel.current) < 0.002;
      if (stable) manuel.current = crans;

      const f = avance.current % 1;
      const position =
        Math.floor(avance.current) +
        f -
        (ATTARDEMENT * Math.sin(2 * Math.PI * f)) / (2 * Math.PI) +
        manuel.current;

      for (let i = 0; i < total; i++) {
        const el = cartes.current[i];
        if (!el) continue;
        const ecart = ecartContinu(i, position, total);
        const style = placement(ecart, total, largeur) as Record<string, string | number>;
        for (const [cle, valeur] of Object.entries(style)) {
          el.style.setProperty(
            cle === "zIndex" ? "z-index" : cle,
            String(valeur),
          );
        }
        el.style.pointerEvents = Math.abs(ecart) > 1.5 ? "none" : "";
      }

      const nouveau = ((Math.round(position) % total) + total) % total;
      if (nouveau !== devant.current) {
        devant.current = nouveau;
        onActif(nouveau);
      }

      if (enMouvement || !stable) id = requestAnimationFrame(image);
    };

    id = requestAnimationFrame(image);
    return () => cancelAnimationFrame(id);
  }, [enMouvement, dureeCranMs, crans, total, largeur, onActif]);

  return (
    <div
      onKeyDown={onTouche}
      onTouchStart={onDepartToucher}
      onTouchEnd={onFinToucher}
      className="anneau mt-6 hidden h-[clamp(330px,33vw,470px)] md:block"
    >
      <span aria-hidden="true" className="anneau-ombre" />
      {vignettes.map((v, i) => {
        const estDevant = i === actif;
        return (
          <div
            key={v.cle}
            ref={(el) => {
              cartes.current[i] = el;
            }}
            // Position de départ, avant la première image : identique à chaque
            // rendu, pour que React ne réécrive jamais ce que la boucle a posé.
            style={placement(ecartContinu(i, 0, total), total, LARGEUR_DEFAUT)}
            aria-hidden={!estDevant}
            className={cn(
              "anneau-carte w-[min(34%,380px)]",
              !estDevant && "[&_[data-legende]]:opacity-0",
              "[&_[data-legende]]:transition-opacity [&_[data-legende]]:duration-500",
            )}
          >
            <button
              type="button"
              tabIndex={estDevant ? 0 : -1}
              onClick={() => onOuvrir(i)}
              aria-label={libellesVisionneuse.agrandir(v.legende)}
              className={cn(
                "block w-full rounded-lg text-left transition-shadow duration-700",
                estDevant && "shadow-lift [&>article]:ring-1 [&>article]:ring-terre-500/60",
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
}: {
  vignettes: Vignette[];
  decalage: number;
  enPause: boolean;
  onOuvrir: (i: number) => void;
  onDepartToucher: (e: React.TouchEvent) => void;
  onFinToucher: (e: React.TouchEvent) => void;
}) {
  const copies = [0, 1];
  return (
    <div
      onTouchStart={onDepartToucher}
      onTouchEnd={onFinToucher}
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
