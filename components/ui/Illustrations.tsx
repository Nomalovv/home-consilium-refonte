import { cn } from "@/lib/utils";
import { visuels } from "@/content/visuels";

/**
 * Illustrations vectorielles dessinées pour le site — aucune photo, aucun
 * visuel de stock, aucune réalisation représentée. Elles apportent la
 * chaleur et l'aspect « maison » de la nouvelle direction artistique.
 *
 * Toutes les couleurs passent par les tokens Tailwind (terre cuite, miel,
 * ardoise), donc le mode sombre est géré automatiquement. Les animations
 * douces sont neutralisées par la règle globale `prefers-reduced-motion`.
 *
 * **Dimensionnement** : chaque SVG occupe 100 % de la largeur de son parent
 * (`w-full`). Il faut donc le placer dans un conteneur à la bonne taille — une
 * classe `w-…` passée en `className` serait écrasée par `w-full` (Tailwind
 * émet `.w-full` après les largeurs de l'échelle, donc elle gagne l'arbitrage)
 * et l'illustration s'étalerait sur toute la largeur disponible. `max-w-…`
 * reste en revanche sans conflit.
 */

type PropsIllustration = {
  className?: string;
  /** Sans titre, l'illustration est purement décorative (aria-hidden). */
  decoratif?: boolean;
};

function racine(titre: string, decoratif?: boolean) {
  return decoratif
    ? { role: "presentation" as const, "aria-hidden": true as const }
    : { role: "img" as const, "aria-label": titre };
}

/* ------------------------------------------------------------------ */
/* Maison normande — le visuel principal de l'accueil                  */
/* ------------------------------------------------------------------ */

export function IllustrationMaison({ className, decoratif }: PropsIllustration) {
  const titre = visuels.maison.titre;
  return (
    <svg
      viewBox="0 0 320 260"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("block h-auto w-full", className)}
      focusable="false"
      {...racine(titre, decoratif)}
    >
      {!decoratif && <title>{titre}</title>}

      {/* Soleil / halo de miel */}
      <circle cx="252" cy="58" r="30" className="fill-miel-300/60" />
      <circle cx="252" cy="58" r="17" className="fill-miel-500/70" />

      {/* Collines */}
      <path
        d="M0 214c46-26 78-26 118-8s72 20 118 2 84-16 84-16v68H0z"
        className="fill-ardoise-300/35"
      />
      <path
        d="M0 232c54-20 96-16 140 0s86 14 180-10v46H0z"
        className="fill-ardoise-500/30"
      />

      {/* Fumée de la cheminée */}
      <g className="animate-fumee" style={{ transformOrigin: "88px 62px" }}>
        <circle cx="88" cy="58" r="6" className="fill-ardoise-300/70" />
        <circle cx="96" cy="46" r="4.5" className="fill-ardoise-300/50" />
      </g>

      {/* Cheminée */}
      <rect x="80" y="62" width="17" height="34" rx="5" className="fill-terre-700" />

      {/* Toit — terre cuite, deux pans */}
      <path
        d="M160 44 44 122c-5 3-3 11 4 11h224c7 0 9-8 4-11L160 44z"
        className="fill-terre-600"
      />
      <path
        d="M160 44 44 122c-5 3-3 11 4 11h108V44z"
        className="fill-terre-700"
      />

      {/* Corps de la maison, façade crème */}
      <rect x="66" y="133" width="188" height="92" rx="10" className="fill-lin" />
      <rect
        x="66"
        y="133"
        width="188"
        height="92"
        rx="10"
        className="fill-none stroke-ardoise-700/35"
        strokeWidth="3"
      />

      {/* Colombages */}
      <g className="stroke-terre-700/70" strokeWidth="5" strokeLinecap="round">
        <path d="M96 141v76M224 141v76" />
        <path d="M96 141l38 76M224 141l-38 76" />
        <path d="M66 180h188" />
      </g>

      {/* Porte */}
      <rect x="143" y="171" width="36" height="54" rx="8" className="fill-ardoise-700" />
      <circle cx="171" cy="200" r="3.2" className="fill-miel-300" />

      {/* Fenêtres allumées */}
      <g>
        <rect x="88" y="147" width="30" height="24" rx="6" className="fill-miel-300" />
        <rect x="202" y="147" width="30" height="24" rx="6" className="fill-miel-300" />
        <rect x="88" y="190" width="30" height="24" rx="6" className="fill-miel-300/70" />
        <rect x="202" y="190" width="30" height="24" rx="6" className="fill-miel-300/70" />
      </g>

      {/* Arbuste */}
      <circle cx="279" cy="207" r="20" className="fill-ardoise-500/70" />
      <rect x="276" y="207" width="6" height="22" rx="3" className="fill-terre-700/80" />

      {/* Sol */}
      <path
        d="M20 227h280"
        className="stroke-ardoise-700/30"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Outils croisés — sections « services » / « méthode »                */
/* ------------------------------------------------------------------ */

export function IllustrationOutils({ className, decoratif }: PropsIllustration) {
  const titre = visuels.outils.titre;
  return (
    <svg
      viewBox="0 0 160 160"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("block h-auto w-full", className)}
      focusable="false"
      {...racine(titre, decoratif)}
    >
      {!decoratif && <title>{titre}</title>}

      <circle cx="80" cy="80" r="70" className="fill-miel-200/60" />

      {/* Mètre ruban */}
      <rect
        x="26"
        y="94"
        width="50"
        height="34"
        rx="10"
        className="fill-miel-500"
      />
      <circle cx="51" cy="111" r="9" className="fill-lin" />
      <path
        d="M76 106h44"
        className="stroke-lin"
        strokeWidth="9"
        strokeLinecap="round"
      />
      <g className="stroke-miel-700" strokeWidth="2.4" strokeLinecap="round">
        <path d="M88 103v6M98 103v6M108 103v6" />
      </g>

      {/* Truelle */}
      <g transform="rotate(-24 80 70)">
        <rect x="74" y="20" width="9" height="26" rx="4.5" className="fill-ardoise-700" />
        <path
          d="M78.5 46c16 0 27 11 27 25s-12 27-27 27-27-13-27-27 11-25 27-25z"
          className="fill-terre-600"
        />
      </g>

      {/* Pinceau */}
      <g transform="rotate(28 110 96)">
        <rect x="104" y="42" width="12" height="42" rx="6" className="fill-ardoise-700" />
        <rect x="101" y="82" width="18" height="12" rx="4" className="fill-miel-500" />
        <path
          d="M101 94h18l-4 22c-1 5-9 5-10 0l-4-22z"
          className="fill-terre-500"
        />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Poignée de main sur un plan — sections « confiance » / « à propos »  */
/* ------------------------------------------------------------------ */

export function IllustrationArtisans({ className, decoratif }: PropsIllustration) {
  const titre = visuels.artisans.titre;
  return (
    <svg
      viewBox="0 0 200 150"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("block h-auto w-full", className)}
      focusable="false"
      {...racine(titre, decoratif)}
    >
      {!decoratif && <title>{titre}</title>}

      {/* Halo doux derrière la scène */}
      <circle cx="100" cy="66" r="52" className="fill-miel-200/70" />

      {/* Le plan de travaux posé sur la table */}
      <rect x="26" y="96" width="148" height="40" rx="10" className="fill-lin" />
      <rect
        x="26"
        y="96"
        width="148"
        height="40"
        rx="10"
        fill="none"
        className="stroke-ardoise-700/30"
        strokeWidth="2.5"
      />
      <g
        fill="none"
        className="stroke-ardoise-500/55"
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        <path d="M40 108h42M40 118h28M40 128h50" />
        <rect x="112" y="106" width="46" height="24" rx="3" />
        <path d="M112 118h46" />
      </g>

      {/* Manche gauche, terre cuite */}
      <path
        d="M10 44h34a10 10 0 0 1 10 10v16a10 10 0 0 1-10 10H10z"
        className="fill-terre-600"
      />
      {/* Manche droite, ardoise */}
      <path
        d="M190 44h-34a10 10 0 0 0-10 10v16a10 10 0 0 0 10 10h34z"
        className="fill-ardoise-700"
      />

      {/* Les deux mains qui se serrent */}
      <rect x="46" y="50" width="56" height="24" rx="12" className="fill-miel-500" />
      <rect x="98" y="50" width="56" height="24" rx="12" className="fill-miel-300" />
      <path
        d="M100 50v24"
        className="stroke-miel-700/50"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Pouces */}
      <path
        d="M76 46c8 0 12 3 12 8"
        fill="none"
        className="stroke-miel-700/45"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Étincelle d'accord */}
      <g
        fill="none"
        className="stroke-terre-600"
        strokeWidth="3.4"
        strokeLinecap="round"
      >
        <path d="M100 28V16M74 34l-7-8M126 34l7-8" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Toits et côte — séparateur décoratif, section zone d'intervention    */
/* ------------------------------------------------------------------ */

export function IllustrationCotesEtToits({
  className,
  decoratif,
}: PropsIllustration) {
  const titre = visuels.cotesEtToits.titre;
  return (
    <svg
      viewBox="0 0 400 120"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      className={cn("block h-auto w-full", className)}
      focusable="false"
      {...racine(titre, decoratif)}
    >
      {!decoratif && <title>{titre}</title>}

      {/* Vagues */}
      <path
        d="M0 92c26-14 52-14 78 0s52 14 78 0 52-14 78 0 52 14 78 0 52-14 88 0v28H0z"
        className="fill-ardoise-500/30"
      />
      <path
        d="M0 106c26-12 52-12 78 0s52 12 78 0 52-12 78 0 52 12 78 0 52-12 88 0v14H0z"
        className="fill-ardoise-700/25"
      />

      {/* Ligne de toits */}
      <g className="fill-terre-600">
        <path d="M22 78 54 48l32 30z" />
        <path d="M100 78 140 40l40 38z" />
        <path d="M194 78 224 52l30 26z" />
        <path d="M268 78 312 38l44 40z" />
      </g>
      <g className="fill-lin">
        <rect x="32" y="76" width="44" height="16" rx="4" />
        <rect x="112" y="74" width="56" height="18" rx="4" />
        <rect x="202" y="76" width="44" height="16" rx="4" />
        <rect x="282" y="74" width="60" height="18" rx="4" />
      </g>

      {/* Clocher */}
      <path d="M362 78 378 34l16 44z" className="fill-ardoise-700" />
    </svg>
  );
}
