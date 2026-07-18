import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocalizedRetirementPensionPage } from "@/features/retirement-pension/components/localized-retirement-pension-page";
import type { RetirementPensionLocale } from "@/features/retirement-pension/content";
import { createRetirementPensionMetadata } from "@/features/retirement-pension/metadata";
const locales = ["ko", "en"] as const;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return locales.includes(locale as RetirementPensionLocale)
    ? createRetirementPensionMetadata(locale as RetirementPensionLocale)
    : {};
}
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as RetirementPensionLocale)) notFound();
  return (
    <LocalizedRetirementPensionPage
      locale={locale as RetirementPensionLocale}
    />
  );
}
