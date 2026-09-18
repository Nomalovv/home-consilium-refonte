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
diagonal franc. Palette **Ardoise** (couleur signature) + **Terre cuite**
(accent), traitement **liquid glass** (3 niveaux de flou : `sm` 10px pour les
badges, `md` 22px pour la nav et les cartes, `lg` 32px pour les panneaux et
modales), blobs d'arrière-plan en ardoise / terre cuite.

Support **clair / sombre complet** : les tokens CSS suivent
`prefers-color-scheme` par défaut et restent surchargeables par l'utilisateur
(attribut `data-theme` sur `<html>`, bouton dans le header).

**Accessibilité (WCAG 2.2 AA)**

- Repli vers une surface **opaque** si `prefers-reduced-transparency: reduce`,
  `prefers-contrast: more`, ou si `backdrop-filter` n'est pas supporté.
- Tout bloc de texte long posé sur du glass utilise la sous-couche opaque
  (`.glass-readable`, ≥ 94 % d'opacité) — voir la prop `lisible` de
  `GlassSurface` / `Card`.
- Terre cuite 600 (#B5623E, 4,4:1 sur blanc) est **réservé aux gros boutons et
  aux titres ≥ 18px**. Le texte courant utilise Ardoise 700 (9,7:1) ou 900 (13,5:1).
- `prefers-reduced-motion` respecté partout (blobs, transitions, timeline,
  accordéons, transitions de page).
- Navigation clavier, cibles tactiles ≥ 44px, ARIA, lien d'évitement, gestion du
  focus au changement de route (`PageTransition`).

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
                             ReadingProgress, CookieNotice
  ui/                        Button, Card, Input, Badge, Accordion, GlassSurface,
                             Logo, Blobs, ThemeToggle
  sections/                  Hero, CTA, ServiceGrid, ServicesExplorer, Testimonials,
                             MethodeCondensee, CitationValeurs, ZoneIntervention,
                             TraitsMarque, GalerieRealisations, PageEditoriale, Section
  interactive/               GuidedQuiz, ProcessTimeline, MultiStepForm, FaqSearch,
                             EstCePourMoi
/content                     services.ts, faq.ts, entreprise.ts, methode.ts, legal.ts
/lib                         utils, hooks, animations, navigation, seo, consentement
/public                      logo.svg, favicon.svg
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
  `content/entreprise.ts` : la galerie sort alors de son état vide et les
  filtres deviennent actifs.
- **Publier des avis clients** : la section « Ils nous font confiance » affiche
  volontairement un état vide honnête tant qu'aucun avis réel n'existe.

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

- **Réalisations** — aucune fiche projet inventée ; la galerie filtrable est
  prête, les filtres restent inertes tant que `realisations.projets` est vide.
- **Avis clients** — aucun témoignage fictif ; état vide honnête.
- **Réseaux sociaux** — aucun lien réel connu, donc aucune icône affichée
  (plutôt que des liens morts). Remplir `reseauxSociaux` dans
  `content/entreprise.ts` les fera apparaître dans le footer.
- **Chiffres business** — aucun (années d'expérience, nombre de clients,
  certifications). Seuls des chiffres structurels et vérifiables sont affichés :
  4 étapes de méthode, 5 domaines de service, 100 % Normandie.
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
