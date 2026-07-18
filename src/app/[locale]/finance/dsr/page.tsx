import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocalizedDsrPage } from "@/features/dsr/components/localized-dsr-page";
import type { DsrLocale } from "@/features/dsr/content";
import { createDsrMetadata } from "@/features/dsr/metadata";

const locales = ["ko", "en"] as const;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return locales.includes(locale as DsrLocale)
    ? createDsrMetadata(locale as DsrLocale)
    : {};
}
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as DsrLocale)) notFound();
  return <LocalizedDsrPage locale={locale as DsrLocale} />;
}
