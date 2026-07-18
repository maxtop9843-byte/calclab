import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import {
  retirementPensionContent,
  type RetirementPensionLocale,
} from "./content";

export function createRetirementPensionMetadata(
  locale: RetirementPensionLocale,
): Metadata {
  const copy = retirementPensionContent[locale];
  const path = `/${locale}/employment/retirement-pension`;
  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/employment/retirement-pension",
        en: "/en/employment/retirement-pension",
        "x-default": "/ko/employment/retirement-pension",
      },
    },
    openGraph: {
      title: `${copy.title} | ${siteConfig.name}`,
      description: copy.description,
      type: "website",
      url: absoluteUrl(path),
      locale: locale === "ko" ? "ko_KR" : "en_US",
      alternateLocale: [locale === "ko" ? "en_US" : "ko_KR"],
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: `${copy.title} | ${siteConfig.name}`,
      description: copy.description,
    },
  };
}
