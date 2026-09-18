type ValeurClasse = string | number | bigint | boolean | null | undefined;

export function cn(...classes: ValeurClasse[]): string {
  return classes.filter((c): c is string => typeof c === "string" && c.length > 0).join(" ");
}

/**
 * Préfixe un chemin de `/public` par le chemin de base de publication.
 *
 * Le site est servi à la racine du domaine en production (Vercel) mais aussi
 * en export statique sous `/home-consilium-refonte` (GitHub Pages) : sans ce
 * préfixe, les images seraient introuvables sur la seconde. `next/image`
 * n'étant pas utilisé (export statique, images non optimisées), c'est ici que
 * le `basePath` est appliqué aux `src` des balises `<img>`.
 *
 * Les URLs absolues et les `data:` sont renvoyées telles quelles.
 */
export function asset(chemin: string): string {
  if (!chemin) return chemin;
  if (/^([a-z]+:)?\/\//i.test(chemin) || chemin.startsWith("data:")) {
    return chemin;
  }
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${chemin.startsWith("/") ? "" : "/"}${chemin}`;
}

/** Normalise une chaîne pour la recherche (sans accents, sans casse). */
export function normaliser(texte: string): string {
  return texte
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}
