import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import { overtimePayContent, type OvertimePayLocale } from "./content";
export function createOvertimePayMetadata(locale: OvertimePayLocale): Metadata {
  const copy = overtimePayContent[locale],
    path = `/${locale}/employment/overtime-pay`;
  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/employment/overtime-pay",
        en: "/en/employment/overtime-pay",
        "x-default": "/ko/employment/overtime-pay",
      },
    },
    openGraph: {
      title: `${copy.metaTitle} | ${siteConfig.name}`,
      description: copy.description,
      type: "website",
      url: absoluteUrl(path),
      locale: locale === "ko" ? "ko_KR" : "en_US",
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: `${copy.metaTitle} | ${siteConfig.name}`,
      description: copy.description,
    },
  };
}
