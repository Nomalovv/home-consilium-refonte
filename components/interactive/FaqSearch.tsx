"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { categoriesFaq, faq } from "@/content/faq";
import { Accordion } from "@/components/ui/Accordion";
import { Input } from "@/components/ui/Input";
import { normaliser } from "@/lib/utils";

type Props = {
  /** Mode compact : simple champ renvoyant vers /faq (utilisé sur la page 404). */
  compact?: boolean;
};

export default function FaqSearch({ compact = false }: Props) {
  const [requete, setRequete] = useState("");
  const q = normaliser(requete);

  const resultats = useMemo(() => {
    if (!q) return faq;
    return faq.filter(
      (item) =>
        normaliser(item.question).includes(q) ||
        normaliser(item.reponse).includes(q),
    );
  }, [q]);

  if (compact) {
    return (
      <form action="/faq" role="search" className="w-full max-w-md">
        <label htmlFor="faq-q-compact" className="mb-1.5 block text-[14px] font-medium">
          Chercher une réponse dans la FAQ
        </label>
        <div className="flex gap-2">
          <Input
            id="faq-q-compact"
            name="q"
            type="search"
            placeholder="Délais, zone d'intervention, engagement…"
          />
          <button
            type="submit"
            className="cible-tactile shrink-0 rounded-full bg-terre-700 px-5 text-[15px] font-semibold text-white shadow-chaud transition-colors hover:bg-terre-800"
          >
            Chercher
          </button>
        </div>
      </form>
    );
  }

  const parCategorie = categoriesFaq
    .map((cat) => ({
      ...cat,
      questions: resultats.filter((r) => r.categorie === cat.id),
    }))
    .filter((c) => c.questions.length > 0);

  return (
    <div>
      <div className="mx-auto max-w-xl">
        <label
          htmlFor="faq-recherche"
          className="mb-2 block text-[14px] font-medium text-ardoise-900 dark:text-ardoise-100"
        >
          Rechercher dans la FAQ
        </label>
        <Input
          id="faq-recherche"
          type="search"
          value={requete}
          onChange={(e) => setRequete(e.target.value)}
          placeholder="Délais, zone d'intervention, engagement…"
          aria-describedby="faq-resultats-compte"
        />
        <p
          id="faq-resultats-compte"
          aria-live="polite"
          className="mt-2 text-[13.5px] text-ink-muted"
        >
          {requete
            ? `${resultats.length} réponse${resultats.length > 1 ? "s" : ""} trouvée${resultats.length > 1 ? "s" : ""}.`
            : `${faq.length} questions réparties en ${categoriesFaq.length} catégories.`}
        </p>
      </div>

      {parCategorie.length === 0 ? (
        <div className="glass glass-readable mx-auto mt-8 max-w-xl rounded-lg p-6 text-center sm:mt-10 sm:p-8">
          <p className="text-corps-lg text-ink">
            Aucune réponse ne correspond à « {requete} ».
          </p>
          <p className="mt-3 text-ink-muted">
            Posez-nous directement la question : nous vous répondrons
            franchement.
          </p>
          <Link
            href="/contact"
            className="lien-souligne cible-tactile mt-5 inline-flex items-center gap-2 font-medium text-terre-700 dark:text-terre-300"
          >
            Nous poser la question
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      ) : (
        <div className="mt-8 space-y-9 sm:mt-12 sm:space-y-12">
          {parCategorie.map((cat) => (
            <section key={cat.id} aria-labelledby={`cat-${cat.id}`}>
              <h2
                id={`cat-${cat.id}`}
                className="font-display text-[19px] font-semibold text-terre-700 dark:text-terre-300 sm:text-[20px] md:text-[22px]"
              >
                {cat.label}
              </h2>
              <Accordion
                className="mt-2"
                elements={cat.questions.map((q2) => ({
                  id: q2.id,
                  question: q2.question,
                  reponse: q2.reponse,
                }))}
              />
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
