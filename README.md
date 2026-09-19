# Home Consilium — site web

Refonte du site de **Home Consilium**, courtier en travaux en **Normandie** :
l'intermédiaire entre les particuliers et les artisans et entreprises du
bâtiment.

> « Le trait d'union entre votre projet et les bons artisans »

---

## Stack technique

| Brique | Choix |
| --- | --- |
| Framework | Next.js 15 (App Router) |
| Langage | TypeScript |
| Styles | Tailwind CSS 3 (tokens de la DA dans `tailwind.config.ts`) |
| Animations | Framer Motion |
| Polices | Fraunces (titres, variable `opsz` 9..144) + Archivo (texte/UI), via `next/font` |
| Qualité | ESLint (`eslint-config-next`) |

### Direction artistique

Identité **« Le Trait d'Union »** : deux formes disjointes reliées par un trait
diagonal franc.

Palette **chaleureuse** : fonds **crème / lin / sable**, **Terre cuite** en
accent dominant, touches **Miel / ocre**, **Ardoise** adoucie réservée au texte
et aux ancrages. Traitement **liquid glass** conservé (3 niveaux de flou : `sm`
10px pour les badges, `md` 22px pour la nav et les cartes, `lg` 32px pour les
panneaux et modales), nappes d'arrière-plan terre cuite / miel / ardoise avec
fondu en bas de section, ombres teintées terre cuite, rayons généreux
(12 / 20 / 28 / 36 px, boutons et pastilles en galet).

**Illustrations** : des SVG dessinés pour le site
(`components/ui/Illustrations.tsx`) — maison à colombages, outils, poignée de
main, toits et côte. Leurs titres accessibles vivent dans `content/visuels.ts`.

**Photos** : les seules photos affichées sont celles **fournies par
l'entreprise** — aucune banque d'images, aucune réalisation ni personne réelle
empruntée. Le premier écran de l'accueil est bâti sur deux d'entre elles : une
villa normande face à la mer en **fond plein écran** (image d'ambiance, sous un
voile chaleureux qui garde le texte lisible) et le **portrait du dirigeant** au
premier plan, dans un cadre arrondi. Tant qu'une photo n'est pas déposée, les
illustrations tiennent la place et le carrousel de réalisations affiche un état
vide honnête. Voir [Ajouter vos photos](#ajouter-vos-photos).

Support **clair / sombre complet** : les tokens CSS suivent
`prefers-color-scheme` par défaut et restent surchargeables par l'utilisateur
(attribut `data-theme` sur `<html>`, bouton dans le header).

**Accessibilité (WCAG 2.2 AA)**

- Repli vers une surface **opaque** si `prefers-reduced-transparency: reduce`,
  `prefers-contrast: more`, ou si `backdrop-filter` n'est pas supporté.
- Tout bloc de texte long posé sur du glass utilise la sous-couche opaque
  (`.glass-readable`, ≥ 94 % d'opacité) — voir la prop `lisible` de
  `GlassSurface` / `Card`. Seule exception, le hero photo de l'accueil : ses
  deux panneaux utilisent `.glass-photo` (88 %) pour laisser deviner la villa,
  et le voile posé sous eux complète la couverture (0,45 + 0,88 = 0,93). Le
  contraste y est mesuré ligne par ligne (ci-dessous) plutôt que déduit.
- Contrastes mesurés sur crème `#FBF6EE` (clair) et brun chaud `#1A1613`
  (sombre). **Terre cuite 600 (#B5623E) = 4,1:1 → jamais de texte dessus** :
  il ne sert qu'aux aplats et aux éléments décoratifs. Le texte d'accent
  utilise Terre cuite 700 (5,5:1), les boutons pleins Terre cuite 700 + blanc
  (5,9:1), les pastilles miel Miel 800 (5,9:1 sur Miel 200). Le texte courant
  reste en `ink` (15,2:1) ou `ink-muted` (8,1:1).
- Le texte posé sur la **photo d'ambiance du hero** est mesuré, pas estimé :
  un script Playwright relève la boîte de chaque ligne, photographie le fond
  réellement composé (voile + photo) et compare — 232 lignes contrôlées en
  clair et en sombre, de 360 à 1536 px, toutes au-dessus du seuil AA.
- `prefers-reduced-motion` respecté partout (blobs, flottements, fumée,
  transitions, timeline, accordéons, transitions de page). La photo du hero est
  fixe : aucun parallaxe, aucune animation d'entrée.
- Navigation clavier, cibles tactiles ≥ 44px (hors liens en ligne dans une
  phrase, couverts par l'exception 2.5.8), ARIA, lien d'évitement, gestion du
  focus au changement de route (`PageTransition`).

**Responsive** — testé de 320 px à 1536 px, en clair et en sombre.

- Échelle typographique fluide en `clamp()`, bornes basses calées sur 320 px.
- Sur téléphone : **un seul CTA plein** par bloc, l'action secondaire passe en
  lien texte (variante `lien` du `Button`) ; une **unique** barre d'action fixe
  en bas (`BarreActionMobile`, masquée sur /contact, `env(safe-area-inset-*)`).
- Grilles de cartes en **carrousel horizontal à accrochage** sous 640 px
  (`.carrousel-mobile`), grille classique au-dessus.
- Les paragraphes longs ont une variante courte dans `/content`, affichée sous
  640 px (`introCourte`, `texteCourt`, `limiteRegionCourte`…).
- Aucun défilement horizontal : vérifié par capture automatisée à 320, 360,
  390, 430, 768, 1024, 1280 et 1536 px sur les 7 gabarits de page.

---

## Structure du projet

```
/app
  layout.tsx                 Layout global (header, footer, JSON-LD LocalBusiness)
  page.tsx                   Accueil
  services/page.tsx          Vue d'ensemble (5 cartes + carte « Autre »)
  services/[slug]/page.tsx   Gabarit de page service (generateStaticParams)
  methode/page.tsx
  realisations/page.tsx
  a-propos/page.tsx
  faq/page.tsx
  contact/page.tsx
  mentions-legales/page.tsx
  confidentialite/page.tsx
  not-found.tsx              404
  sitemap.ts  robots.ts
/components
  layout/                    Header, MegaMenu, Footer, Breadcrumb, PageTransition,
                             BarreActionMobile (CTA fixe mobile),
                             ReadingProgress, CookieNotice
  ui/                        Button, Card, Input, Badge, Accordion, GlassSurface,
                             Logo, Blobs, ThemeToggle, Illustrations
  sections/                  Hero, CTA, ServiceGrid, ServicesExplorer, Testimonials,
                             MethodeCondensee, CitationValeurs, ZoneIntervention,
                             TraitsMarque, GalerieRealisations, CarrouselRealisations,
                             CarteRealisation, PageEditoriale, Section
  interactive/               GuidedQuiz, ProcessTimeline, MultiStepForm, FaqSearch,
                             EstCePourMoi
/content                     services.ts, faq.ts, entreprise.ts, methode.ts, legal.ts,
                             interface.ts (libellés d'UI), visuels.ts (titres des SVG)
/lib                         utils, hooks, animations, navigation, seo, consentement
/public                      logo.svg, favicon.svg
  images/                    photos fournies par l'entreprise
                             (villa-normande.jpg, dirigeant.jpg…)
  images/realisations/       photos de chantier
```

### Règle de contenu

**Aucun texte n'est écrit en dur dans les composants.** Tout passe par `/content`.

- **Ajouter un domaine de service** = ajouter une entrée dans
  `content/services.ts`. La route `/services/<slug>`, le méga-menu, le footer,
  le quiz guidé, le sélecteur du formulaire et le `sitemap.xml` se mettent à
  jour automatiquement.
- **Ajouter une question de FAQ** = ajouter une entrée dans `content/faq.ts`
  (la recherche instantanée et le JSON-LD `FAQPage` la reprennent).
- **Publier des réalisations** = remplir le tableau `realisations.projets` dans
  `content/entreprise.ts` : la galerie sort alors de son état vide, les filtres
  deviennent actifs et le carrousel de l'accueil apparaît. Voir
  [Ajouter vos photos](#ajouter-vos-photos).
- **Publier des avis clients** : la section « Ils nous font confiance » affiche
  volontairement un état vide honnête tant qu'aucun avis réel n'existe.

---

## Ajouter vos photos

Quatre emplacements accueillent des photos réelles :

| Emplacement | État | Où c'est visible |
| --- | --- | --- |
| **Image d'ambiance du hero** (`fondHero`) | ✅ fournie | fond plein écran du premier écran de l'accueil |
| **Portrait du dirigeant** (`dirigeant`) | ✅ fourni | premier plan du hero de l'accueil |
| **Bâtiment de l'entreprise** (`batiment`) | ⏳ vide | panneau du hero, si aucun portrait n'est fourni |
| **Chantiers / réalisations** (`realisations.projets`) | ⏳ vide | carrousel de l'accueil + galerie `/realisations` |

Tant qu'un emplacement est vide, le site reste cohérent : illustration dessinée
d'un côté, état vide honnête de l'autre. Aucune photo d'illustration n'est
ajoutée à la place.

> **L'image d'ambiance n'est pas une réalisation.** La villa normande du fond
> du hero est un décor : elle n'est ni le bâtiment de l'entreprise, ni un
> chantier qu'elle a suivi. Elle n'apparaît donc jamais dans
> `realisations.projets` et n'est jamais présentée comme un chantier.

### 1. Déposer les fichiers

| Photo | Où la déposer |
| --- | --- |
| Image d'ambiance du hero | `public/images/villa-normande.jpg` |
| Portrait du dirigeant | `public/images/dirigeant.jpg` |
| Bâtiment de l'entreprise | `public/images/batiment.jpg` |
| Chantiers / réalisations | `public/images/realisations/<nom-du-chantier>.jpg` |

Noms de fichiers en minuscules, sans accent ni espace (`cuisine-caen.jpg`,
pas `Cuisine Caen (1).JPG`).

**Format et poids conseillés**

- **JPG** ou **WebP** (le WebP pèse ~30 % de moins à qualité égale).
- **1600 px de large maximum** — au-delà, c'est du poids pour rien. Ne jamais
  *agrandir* une photo plus petite : elle deviendrait floue.
- **moins de 250 Ko par photo** (qualité JPG 78-84 suffit largement).
- **Cadrage** : horizontal, ratio **3/2** ou **4/3**, pour l'image d'ambiance
  et les chantiers (les cartes recadrent en 4/3) ; **vertical 4/5** pour le
  portrait du dirigeant.
- Pas de visage identifiable ni de plaque d'immatriculation sans accord écrit
  des personnes concernées, et accord du client avant de publier son chantier.

### 2. Renseigner le contenu

Tout se passe dans `content/entreprise.ts` — aucun composant à modifier.

**Image d'ambiance du hero** : c'est le fond plein écran du premier écran de
l'accueil. Elle est **décorative**, donc son `alt` reste vide (elle est masquée
aux lecteurs d'écran : le titre du hero dit déjà tout). Laisser `src` vide
(`""`) rend au hero ses nappes de couleur dessinées.

**Portrait du dirigeant** : il se pose au premier plan, dans un cadre arrondi.
Vignette compacte sur téléphone, grand portrait à partir de la tablette. Seuls
le prénom et l'expérience réellement communiqués sont affichés, sur une petite
étiquette de verre — pas de nom de famille ni de titre inventés. Laisser `src`
vide fait retomber le panneau sur la photo du bâtiment, puis sur l'illustration.

**Photo du bâtiment** : utilisée dans le panneau du hero **si aucun portrait**
n'est fourni.

```ts
export const photos = {
  batiment: {
    src: "", // vide : aucune photo du bâtiment fournie
    alt: "Le bâtiment de Home Consilium, vu depuis la rue",
  },
  fondHero: {
    src: "/images/villa-normande.jpg",
    alt: "", // décorative : aria-hidden, pas de description
  },
  dirigeant: {
    src: "/images/dirigeant.jpg",
    // Décrire ce que l'on voit : c'est lu par les lecteurs d'écran.
    alt: "Eren, dirigeant de Home Consilium, à son bureau",
    prenom: "Eren",
    experience: "11 ans d'expérience dans le bâtiment",
    experienceCourte: "11 ans d'expérience",
    etiquette: "Eren · 11 ans d'expérience dans le bâtiment",
  },
};
```

La lisibilité du hero repose sur **deux couches**, pas sur un voile opaque :
un voile léger sur toute la photo (`.voile-hero`, 0,26 à 0,55 selon la zone,
plus dense seulement sous l'en-tête) et un **panneau de verre** derrière chaque
bloc de texte (`.glass-photo`, 88 %). La villa reste donc franchement visible,
y compris derrière le texte. Les opacités sont calées sur des **mesures** : un
script Playwright relève la boîte de chaque ligne de texte, photographie le
fond réellement composé et la compare au pixel le plus défavorable, en clair et
en sombre, de 360 à 1536 px. Si vous remplacez l'image de fond par une photo
plus contrastée (ciel très sombre, grands aplats blancs), refaites ce contrôle
avant de publier.

**Réalisations** : ajouter une entrée par chantier dans `realisations.projets`.
`categorie` doit reprendre **exactement** un libellé de `realisations.filtres`
(sinon le filtre correspondant ne la trouvera pas).

```ts
projets: [
  {
    titre: "Rénovation d'une longère",
    categorie: "Rénovation complète",   // un libellé de `realisations.filtres`
    ville: "Bayeux",
    image: "/images/realisations/longere-bayeux.jpg",
    // `alt` est optionnel : sans lui, un texte par défaut est généré.
    alt: "Longère normande rénovée, façade en pierre et menuiseries neuves",
    // `images` (optionnel) : autres photos du même chantier, en réserve.
    images: ["/images/realisations/longere-bayeux-2.jpg"],
  },
] as Projet[],
```

Un projet **sans `image`** reste visible dans la galerie `/realisations` (en
carte texte) mais **n'apparaît pas dans le carrousel** de l'accueil, qui est une
section d'images. Le carrousel apparaît dès qu'**une seule** photo est
renseignée.

### 3. Vérifier puis publier

```bash
npm run dev     # contrôler l'accueil et /realisations, en clair et en sombre
npm run build   # doit passer sans erreur
```

Puis pousser les fichiers et le contenu modifié : le déploiement se fait
automatiquement (voir *Mise en ligne sur Vercel* ci-dessous). Les chemins
d'images passent par le helper `asset()` de `lib/utils.ts`, qui applique le
préfixe `NEXT_PUBLIC_BASE_PATH` : les mêmes photos fonctionnent donc à la
racine d'un domaine **et** dans un export statique publié dans un sous-dossier.

---

## Installation et lancement

```bash
npm install     # installer les dépendances
npm run dev     # serveur de développement : http://localhost:3000
npm run build   # build de production
npm run start   # servir le build de production
npm run lint    # ESLint
```

Node.js 18.18+ requis (testé avec Node 24).

---

## Variables d'environnement

Le site fonctionne **sans aucune variable d'environnement**. Une seule est
optionnelle :

| Variable | Rôle |
| --- | --- |
| `NEXT_PUBLIC_FORM_ENDPOINT` | URL recevant en `POST` JSON les demandes du formulaire de contact. |
| `NEXT_PUBLIC_BASE_PATH` | Préfixe des chemins d'images (`asset()`), uniquement si le site est publié dans un sous-dossier — par exemple `/home-consilium-refonte` pour un export statique sur GitHub Pages. Vide par défaut. |

Aucun backend n'est fourni avec ce site. Si `NEXT_PUBLIC_FORM_ENDPOINT` n'est
**pas** défini, le formulaire bascule sur un envoi par email (`mailto:` vers
`contact@homeconsilium.fr`, corps pré-rempli) afin qu'aucune demande ne se perde.
Pour un vrai envoi serveur, renseigner par exemple une URL Formspree, Resend ou
une route API maison :

```bash
# .env.local
NEXT_PUBLIC_FORM_ENDPOINT=https://exemple-endpoint/contact
```

---

## Mise en ligne sur Vercel

1. Se connecter sur [vercel.com](https://vercel.com) avec le compte GitHub.
2. **Add New… → Project**, puis importer le dépôt `home-consilium`.
3. Vercel détecte automatiquement Next.js. Laisser les réglages par défaut :
   - Framework preset : **Next.js**
   - Build command : `next build` (valeur par défaut)
   - Output directory : géré par l'adaptateur Next.js (ne rien saisir)
   - Install command : `npm install`
4. **Environment Variables** : rien d'obligatoire. Ajouter
   `NEXT_PUBLIC_FORM_ENDPOINT` uniquement si un endpoint de formulaire est mis
   en place (scopes *Production* / *Preview*).
5. **Deploy**. Chaque push sur la branche principale redéploie automatiquement ;
   les autres branches génèrent des *preview deployments*.
6. **Domaine** : onglet *Settings → Domains*, ajouter `homeconsilium.fr` et
   `www.homeconsilium.fr`, puis suivre les instructions DNS.
7. Après branchement du domaine définitif, vérifier `SITE_URL` dans
   `content/entreprise.ts` : cette constante alimente les URLs canoniques, les
   balises Open Graph, `sitemap.xml` et `robots.txt`.

---

## À compléter avant la mise en ligne

Le site n'invente aucune information. Les champs non publiés par l'entreprise
apparaissent littéralement dans les pages sous la forme
`[À COMPLÉTER : ...]`. Ils sont tous centralisés dans
`content/entreprise.ts` (objet `entreprise`) :

| Champ | Où il s'affiche |
| --- | --- |
| `formeJuridique` | /mentions-legales |
| `siret` | /mentions-legales |
| `adresse` | /mentions-legales, /contact, footer, JSON-LD LocalBusiness |
| `capitalSocial` | /mentions-legales |
| `rcs` | /mentions-legales |
| `tvaIntracom` | /mentions-legales |
| `directeurPublication` | /mentions-legales |
| `hebergeur` | /mentions-legales (« Vercel Inc. » une fois déployé sur Vercel) |
| `ficheGoogle` | section « Ils nous font confiance » (accueil) |

Autres points laissés volontairement vides, en attente de contenu réel :

- **Réalisations** — aucune fiche projet inventée, aucune photo empruntée ; la
  galerie filtrable et le carrousel de l'accueil sont prêts et se remplissent
  dès que `realisations.projets` est renseigné (voir
  [Ajouter vos photos](#ajouter-vos-photos)). Les filtres restent inertes tant
  que le tableau est vide.
- **Photo du bâtiment** — `photos.batiment.src` est vide. Ce n'est plus
  bloquant : le panneau du hero affiche le portrait du dirigeant. La photo du
  bâtiment reprendrait sa place si le portrait était retiré.
- **Avis clients** — aucun témoignage fictif ; état vide honnête.
- **Réseaux sociaux** — aucun lien réel connu, donc aucune icône affichée
  (plutôt que des liens morts). Remplir `reseauxSociaux` dans
  `content/entreprise.ts` les fera apparaître dans le footer.
- **Chiffres business** — aucun chiffre inventé (nombre de clients, de
  chantiers, certifications). Les seuls chiffres affichés sont structurels et
  vérifiables — 4 étapes de méthode, 5 domaines de service, 100 % Normandie —
  plus l'expérience du dirigeant (11 ans), communiquée par l'entreprise et
  citée une seule fois, sur l'étiquette de son portrait.
- **Zone d'intervention** — la liste de `zoneIntervention.villes` /
  `zonesQuiz` (`content/entreprise.ts`) est une liste de **repères**, pas une
  promesse de couverture commune par commune : elle doit être validée par
  l'entreprise. La mention « aux portes de la Normandie, appelez-nous »
  (`limiteRegion`) reste affichée partout où la zone est citée.
- **Tarifs** — aucun tarif public, donc pas de simulateur de prix : uniquement
  « devis gratuit » et « premier échange sans engagement ».

---

## Cookies et RGPD

Le site **ne dépose aucun cookie de suivi ni de publicité**. Le bandeau est donc
purement **informatif**, pas un faux bandeau de consentement.

La structure reste extensible : si des cookies analytics sont ajoutés un jour,
passer `MODE` à `"consentement"` dans `lib/consentement.ts` et déclarer les
catégories dans `CATEGORIES`. Le bandeau (`components/layout/CookieNotice.tsx`)
bascule alors en véritable recueil de consentement sans autre modification.

Le seul stockage navigateur utilisé aujourd'hui est du `localStorage` :
la préférence de thème clair/sombre et la validation du bandeau d'information.

---

## SEO

- `metadata` unique par page (title, description, canonical, Open Graph, Twitter).
- JSON-LD `LocalBusiness` (global), `FAQPage` (accueil, /faq, pages service),
  `BreadcrumbList` (pages service).
- `sitemap.xml` et `robots.txt` générés par `app/sitemap.ts` et `app/robots.ts`.
- URLs en français, une route par page.
