import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/entreprise";
import { services } from "@/content/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const maintenant = new Date();

  const statiques: {
    chemin: string;
    priorite: number;
    frequence: "weekly" | "monthly" | "yearly";
  }[] = [
    { chemin: "/", priorite: 1, frequence: "weekly" },
    { chemin: "/services", priorite: 0.9, frequence: "monthly" },
    { chemin: "/methode", priorite: 0.8, frequence: "monthly" },
    { chemin: "/realisations", priorite: 0.6, frequence: "monthly" },
    { chemin: "/a-propos", priorite: 0.7, frequence: "monthly" },
    { chemin: "/faq", priorite: 0.7, frequence: "monthly" },
    { chemin: "/contact", priorite: 0.9, frequence: "monthly" },
    { chemin: "/mentions-legales", priorite: 0.2, frequence: "yearly" },
    { chemin: "/confidentialite", priorite: 0.2, frequence: "yearly" },
  ];

  return [
    ...statiques.map((p) => ({
      url: `${SITE_URL}${p.chemin}`,
      lastModified: maintenant,
      changeFrequency: p.frequence,
      priority: p.priorite,
    })),
    ...services.map((s) => ({
      url: `${SITE_URL}/services/${s.slug}`,
      lastModified: maintenant,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
