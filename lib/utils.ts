type ValeurClasse = string | number | bigint | boolean | null | undefined;

export function cn(...classes: ValeurClasse[]): string {
  return classes.filter((c): c is string => typeof c === "string" && c.length > 0).join(" ");
}

/** Normalise une chaîne pour la recherche (sans accents, sans casse). */
export function normaliser(texte: string): string {
  return texte
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}
