/**
 * Gestion du consentement — structure volontairement minimale mais extensible.
 *
 * État actuel : le site ne dépose AUCUN cookie de suivi ni de publicité.
 * Le bandeau est donc purement informatif (`MODE = "information"`).
 *
 * Si des cookies analytics ou marketing sont ajoutés un jour, passer
 * `MODE` à "consentement" et déclarer les catégories concernées dans
 * `CATEGORIES` : le bandeau bascule alors en vrai recueil de consentement
 * sans autre modification du reste du site.
 */

export type ModeBandeau = "information" | "consentement";

export type CategorieConsentement = {
  id: string;
  label: string;
  description: string;
  /** Une catégorie obligatoire ne peut pas être refusée. */
  obligatoire: boolean;
};

export const MODE: ModeBandeau = "information";

/** Aucune catégorie facultative aujourd'hui : aucun cookie de suivi n'est déposé. */
export const CATEGORIES: CategorieConsentement[] = [];

const CLE_STOCKAGE = "hc-consentement";
const VERSION = 1;

export type EtatConsentement = {
  version: number;
  date: string;
  /** Catégories acceptées (vide tant qu'aucun cookie n'est déposé). */
  accepte: string[];
};

export function lireConsentement(): EtatConsentement | null {
  if (typeof window === "undefined") return null;
  try {
    const brut = window.localStorage.getItem(CLE_STOCKAGE);
    if (!brut) return null;
    const etat = JSON.parse(brut) as EtatConsentement;
    if (etat.version !== VERSION) return null;
    return etat;
  } catch {
    return null;
  }
}

export function enregistrerConsentement(accepte: string[] = []): void {
  if (typeof window === "undefined") return;
  try {
    const etat: EtatConsentement = {
      version: VERSION,
      date: new Date().toISOString(),
      accepte,
    };
    window.localStorage.setItem(CLE_STOCKAGE, JSON.stringify(etat));
  } catch {
    /* stockage indisponible : le bandeau réapparaîtra, sans casser la page */
  }
}
