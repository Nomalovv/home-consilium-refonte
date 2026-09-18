import { realisations, type Projet } from "@/content/entreprise";
import { asset, cn } from "@/lib/utils";

/**
 * Carte d'une réalisation : photo en haut (ratio 4/3), puis le titre et
 * « catégorie · ville ». Partagée par le carrousel de l'accueil et la galerie
 * de /realisations, pour que les deux racontent exactement la même chose.
 *
 * `next/image` n'est pas utilisé : le site est aussi publié en export statique
 * sans optimiseur d'images. On garde donc une balise `<img>` avec ses
 * dimensions intrinsèques (pas de saut de mise en page) et un chargement
 * paresseux.
 */
export function CarteRealisation({
  projet,
  className,
}: {
  projet: Projet;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "glass glass-readable flex h-full flex-col overflow-hidden rounded-lg",
        className,
      )}
    >
      {projet.image && (
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset(projet.image)}
            alt={projet.alt ?? realisations.altParDefaut(projet.titre, projet.ville)}
            width={1200}
            height={900}
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full bg-lin object-cover dark:bg-white/[0.06]"
          />
          {/* Voile chaleureux très discret : relie la photo à la palette du site. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-terre-800/20 via-transparent to-transparent"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-balance font-display text-h3 font-semibold text-ardoise-900 dark:text-ardoise-100">
          {projet.titre}
        </h3>
        <p className="mt-2 text-[14.5px] text-ink-muted">
          {projet.categorie} · {projet.ville}
        </p>
      </div>
    </article>
  );
}
