"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { sujetsContact } from "@/content/services";
import { contact, zoneIntervention } from "@/content/entreprise";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Erreur, Input, Label, Select, Textarea } from "@/components/ui/Input";
import { useReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";

const ETAPES = ["Vos coordonnées", "Votre projet", "Récapitulatif"];

type Donnees = {
  prenom: string;
  nom: string;
  telephone: string;
  email: string;
  sujet: string;
  ville: string;
  message: string;
  rgpd: boolean;
};

const VIDE: Donnees = {
  prenom: "",
  nom: "",
  telephone: "",
  email: "",
  sujet: "",
  ville: "",
  message: "",
  rgpd: false,
};

const LIBELLES_STADE: Record<string, string> = {
  idee: "J'en suis au stade de l'idée.",
  devis: "J'ai des devis en cours ailleurs.",
  pret: "Je suis prêt à démarrer.",
};

/**
 * Aucun backend n'est fourni avec ce site. Si `NEXT_PUBLIC_FORM_ENDPOINT` est
 * défini, le formulaire y est envoyé en POST JSON ; sinon il bascule sur un
 * envoi par email (mailto:) afin que la demande parvienne réellement à
 * Home Consilium plutôt que de se perdre dans le vide.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

export default function MultiStepForm() {
  const params = useSearchParams();
  const reduit = useReducedMotion();
  const [etape, setEtape] = useState(0);
  const [donnees, setDonnees] = useState<Donnees>(VIDE);
  const [erreurs, setErreurs] = useState<Partial<Record<keyof Donnees, string>>>({});
  const [envoi, setEnvoi] = useState<"inactif" | "en-cours" | "ok" | "erreur">(
    "inactif",
  );

  // Pré-remplissage depuis le quiz guidé ou une page service.
  useEffect(() => {
    const sujet = params.get("sujet");
    const ville = params.get("ville");
    const stade = params.get("stade");
    setDonnees((d) => ({
      ...d,
      sujet: sujet && sujetsContact.some((s) => s.valeur === sujet) ? sujet : d.sujet,
      ville: ville && ville !== "Autre" ? ville : d.ville,
      message: stade && LIBELLES_STADE[stade] ? LIBELLES_STADE[stade] : d.message,
    }));
  }, [params]);

  const libelleSujet = useMemo(
    () => sujetsContact.find((s) => s.valeur === donnees.sujet)?.label ?? "",
    [donnees.sujet],
  );

  function maj<K extends keyof Donnees>(cle: K, valeur: Donnees[K]) {
    setDonnees((d) => ({ ...d, [cle]: valeur }));
    setErreurs((e) => ({ ...e, [cle]: undefined }));
  }

  function validerEtape(index: number): boolean {
    const e: Partial<Record<keyof Donnees, string>> = {};

    if (index === 0) {
      if (!donnees.prenom.trim()) e.prenom = "Merci d'indiquer votre prénom.";
      if (!donnees.nom.trim()) e.nom = "Merci d'indiquer votre nom.";
      if (!/^[0-9\s+().-]{10,}$/.test(donnees.telephone.trim()))
        e.telephone = "Merci d'indiquer un numéro de téléphone valide.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(donnees.email.trim()))
        e.email = "Merci d'indiquer une adresse email valide.";
    }

    if (index === 1) {
      if (!donnees.sujet) e.sujet = "Merci de choisir un sujet.";
      if (!donnees.ville.trim()) e.ville = "Merci d'indiquer la commune du projet.";
      if (donnees.message.trim().length < 10)
        e.message = "Quelques mots sur votre projet nous aideront à vous répondre.";
    }

    if (index === 2 && !donnees.rgpd) {
      e.rgpd = "Merci d'accepter le traitement de vos données pour continuer.";
    }

    setErreurs(e);
    return Object.keys(e).length === 0;
  }

  function suivant() {
    if (validerEtape(etape)) setEtape((s) => Math.min(s + 1, 2));
  }

  function corpsEmail() {
    return [
      `Prénom : ${donnees.prenom}`,
      `Nom : ${donnees.nom}`,
      `Téléphone : ${donnees.telephone}`,
      `Email : ${donnees.email}`,
      `Sujet : ${libelleSujet}`,
      `Commune : ${donnees.ville}`,
      "",
      "Projet :",
      donnees.message,
    ].join("\n");
  }

  async function envoyer(e: React.FormEvent) {
    e.preventDefault();
    if (!validerEtape(2)) return;

    if (!ENDPOINT) {
      // Repli : ouverture du client mail de l'utilisateur.
      const sujet = encodeURIComponent(
        `Demande de devis — ${libelleSujet} (${donnees.ville})`,
      );
      window.location.href = `${contact.emailLien}?subject=${sujet}&body=${encodeURIComponent(corpsEmail())}`;
      setEnvoi("ok");
      return;
    }

    setEnvoi("en-cours");
    try {
      const reponse = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donnees),
      });
      setEnvoi(reponse.ok ? "ok" : "erreur");
    } catch {
      setEnvoi("erreur");
    }
  }

  if (envoi === "ok") {
    return (
      <div className="glass glass-lg glass-readable rounded-xl p-8 text-center md:p-12">
        <span
          aria-hidden="true"
          className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-etat-succes/15 text-etat-succes"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path
              d="m5 12.5 4.5 4.5L19 7"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h2 className="font-display text-h2 font-semibold text-ardoise-900 dark:text-ardoise-100">
          Votre demande est partie
        </h2>
        <p className="mx-auto mt-4 max-w-lisible text-ink-muted">
          {ENDPOINT
            ? "Nous revenons vers vous rapidement. Un premier échange sans engagement permettra de cadrer votre projet."
            : "Votre logiciel de messagerie vient de s'ouvrir avec votre demande pré-remplie : il ne vous reste qu'à l'envoyer. Vous pouvez aussi nous appeler directement."}
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href={contact.telephoneLien} variante="secondaire" taille="lg">
            {contact.telephone}
          </ButtonLink>
          <ButtonLink href="/" variante="glass" taille="lg">
            Retour à l&apos;accueil
          </ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={envoyer}
      noValidate
      className="glass glass-lg glass-readable rounded-xl p-6 md:p-10"
    >
      {/* Barre de progression */}
      <div className="mb-8">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-terre-700 dark:text-terre-300">
            Étape {etape + 1} / 3 — {ETAPES[etape]}
          </p>
          {etape > 0 && (
            <button
              type="button"
              onClick={() => setEtape((s) => s - 1)}
              className="cible-tactile inline-flex items-center gap-1.5 rounded-sm px-2 text-[14px] text-ink-muted transition-colors hover:text-terre-700 dark:hover:text-terre-300"
            >
              <span aria-hidden="true">←</span> Retour
            </button>
          )}
        </div>
        <div
          className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-ardoise-100 dark:bg-white/10"
          role="progressbar"
          aria-valuenow={etape + 1}
          aria-valuemin={1}
          aria-valuemax={3}
          aria-label="Progression du formulaire"
        >
          <div
            className="h-full rounded-full bg-terre-600 transition-[width] duration-500 ease-doux"
            style={{ width: `${((etape + 1) / 3) * 100}%` }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={etape}
          initial={reduit ? false : { opacity: 0, x: 14 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduit ? undefined : { opacity: 0, x: -14 }}
          transition={{ duration: reduit ? 0 : 0.26, ease: [0.22, 1, 0.36, 1] }}
        >
          {etape === 0 && (
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="prenom" obligatoire>
                  Prénom
                </Label>
                <Input
                  id="prenom"
                  name="prenom"
                  autoComplete="given-name"
                  value={donnees.prenom}
                  onChange={(e) => maj("prenom", e.target.value)}
                  aria-invalid={Boolean(erreurs.prenom)}
                  aria-describedby={erreurs.prenom ? "err-prenom" : undefined}
                />
                <Erreur id="err-prenom" message={erreurs.prenom} />
              </div>
              <div>
                <Label htmlFor="nom" obligatoire>
                  Nom
                </Label>
                <Input
                  id="nom"
                  name="nom"
                  autoComplete="family-name"
                  value={donnees.nom}
                  onChange={(e) => maj("nom", e.target.value)}
                  aria-invalid={Boolean(erreurs.nom)}
                  aria-describedby={erreurs.nom ? "err-nom" : undefined}
                />
                <Erreur id="err-nom" message={erreurs.nom} />
              </div>
              <div>
                <Label htmlFor="telephone" obligatoire>
                  Téléphone
                </Label>
                <Input
                  id="telephone"
                  name="telephone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={donnees.telephone}
                  onChange={(e) => maj("telephone", e.target.value)}
                  aria-invalid={Boolean(erreurs.telephone)}
                  aria-describedby={erreurs.telephone ? "err-telephone" : undefined}
                />
                <Erreur id="err-telephone" message={erreurs.telephone} />
              </div>
              <div>
                <Label htmlFor="email" obligatoire>
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={donnees.email}
                  onChange={(e) => maj("email", e.target.value)}
                  aria-invalid={Boolean(erreurs.email)}
                  aria-describedby={erreurs.email ? "err-email" : undefined}
                />
                <Erreur id="err-email" message={erreurs.email} />
              </div>
            </div>
          )}

          {etape === 1 && (
            <div className="grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="sujet" obligatoire>
                    Sujet
                  </Label>
                  <Select
                    id="sujet"
                    name="sujet"
                    value={donnees.sujet}
                    onChange={(e) => maj("sujet", e.target.value)}
                    aria-invalid={Boolean(erreurs.sujet)}
                    aria-describedby={erreurs.sujet ? "err-sujet" : undefined}
                  >
                    <option value="">Choisissez un sujet…</option>
                    {sujetsContact.map((s) => (
                      <option key={s.valeur} value={s.valeur}>
                        {s.label}
                      </option>
                    ))}
                  </Select>
                  <Erreur id="err-sujet" message={erreurs.sujet} />
                </div>
                <div>
                  <Label htmlFor="ville" obligatoire>
                    Commune du projet
                  </Label>
                  <Input
                    id="ville"
                    name="ville"
                    list="communes-calvados"
                    autoComplete="address-level2"
                    value={donnees.ville}
                    onChange={(e) => maj("ville", e.target.value)}
                    aria-invalid={Boolean(erreurs.ville)}
                    aria-describedby={erreurs.ville ? "err-ville" : "aide-ville"}
                  />
                  <datalist id="communes-calvados">
                    {zoneIntervention.zonesQuiz
                      .filter((z) => z !== "Autre")
                      .map((z) => (
                        <option key={z} value={z} />
                      ))}
                  </datalist>
                  <Erreur id="err-ville" message={erreurs.ville} />
                  {!erreurs.ville && (
                    <p id="aide-ville" className="mt-1.5 text-[13px] text-ink-muted">
                      {zoneIntervention.titre}.
                    </p>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="message" obligatoire>
                  Votre projet
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={donnees.message}
                  onChange={(e) => maj("message", e.target.value)}
                  placeholder="Décrivez votre projet en quelques lignes : nature des travaux, surface, échéance souhaitée…"
                  aria-invalid={Boolean(erreurs.message)}
                  aria-describedby={erreurs.message ? "err-message" : undefined}
                />
                <Erreur id="err-message" message={erreurs.message} />
              </div>
            </div>
          )}

          {etape === 2 && (
            <div>
              <dl className="divide-y divide-[color:var(--hairline)] rounded-md border">
                {[
                  { t: "Prénom", v: donnees.prenom },
                  { t: "Nom", v: donnees.nom },
                  { t: "Téléphone", v: donnees.telephone },
                  { t: "Email", v: donnees.email },
                  { t: "Sujet", v: libelleSujet },
                  { t: "Commune", v: donnees.ville },
                  { t: "Projet", v: donnees.message },
                ].map((l) => (
                  <div
                    key={l.t}
                    className="grid gap-1 px-4 py-3 sm:grid-cols-[150px_1fr] sm:gap-4"
                  >
                    <dt className="text-[14px] font-medium text-ink-muted">{l.t}</dt>
                    <dd className="whitespace-pre-wrap text-[15px] text-ink">
                      {l.v || "—"}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6">
                <div className="flex items-start gap-3">
                  <input
                    id="rgpd"
                    name="rgpd"
                    type="checkbox"
                    checked={donnees.rgpd}
                    onChange={(e) => maj("rgpd", e.target.checked)}
                    aria-invalid={Boolean(erreurs.rgpd)}
                    aria-describedby={erreurs.rgpd ? "err-rgpd" : undefined}
                    className="mt-1 h-5 w-5 shrink-0 accent-[#B5623E]"
                  />
                  <label htmlFor="rgpd" className="text-[14.5px] leading-relaxed text-ink-muted">
                    J&apos;accepte que mes données soient utilisées pour répondre à
                    ma demande, évaluer mon projet et m&apos;orienter vers les
                    entreprises adaptées. Elles sont conservées 12 mois à compter du
                    dernier contact si la demande reste sans suite.{" "}
                    <Link href="/confidentialite" className="lien-souligne text-terre-700 dark:text-terre-300">
                      Politique de confidentialité
                    </Link>
                    .
                  </label>
                </div>
                <Erreur id="err-rgpd" message={erreurs.rgpd} />
              </div>

              {envoi === "erreur" && (
                <p role="alert" className="mt-5 rounded-sm border-l-2 border-etat-erreur bg-etat-erreur/10 px-4 py-3 text-[14.5px] text-ink">
                  L&apos;envoi a échoué. Vous pouvez nous joindre directement au{" "}
                  <a href={contact.telephoneLien} className="lien-souligne font-medium">
                    {contact.telephone}
                  </a>{" "}
                  ou par email à{" "}
                  <a href={contact.emailLien} className="lien-souligne font-medium">
                    {contact.email}
                  </a>
                  .
                </p>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className={cn("mt-8 flex flex-col gap-3 sm:flex-row", etape > 0 && "sm:justify-between")}>
        {etape > 0 && (
          <Button type="button" variante="glass" taille="lg" onClick={() => setEtape((s) => s - 1)}>
            Étape précédente
          </Button>
        )}
        {etape < 2 ? (
          <Button type="button" variante="secondaire" taille="lg" onClick={suivant}>
            Continuer
          </Button>
        ) : (
          <Button type="submit" variante="secondaire" taille="lg" disabled={envoi === "en-cours"}>
            {envoi === "en-cours" ? "Envoi en cours…" : "Envoyer ma demande"}
          </Button>
        )}
      </div>

      <p className="mt-5 text-[13.5px] text-ink-muted">
        Champs marqués d&apos;un astérisque obligatoires. Premier échange sans
        engagement — vous n&apos;avez aucune obligation de donner suite.
      </p>
    </form>
  );
}
