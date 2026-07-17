import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LocalizedCagrPage } from "@/features/cagr/components/localized-cagr-page";
import type { CagrLocale } from "@/features/cagr/i18n";
import { createCagrMetadata } from "@/features/cagr/metadata";

function isCagrLocale(locale: string): locale is CagrLocale {
  return locale === "ko" || locale === "en";
}

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isCagrLocale(locale)) return {};
  return createCagrMetadata(locale);
}

export default async function CagrLocalizedRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isCagrLocale(locale)) notFound();
  return <LocalizedCagrPage locale={locale} />;
}
