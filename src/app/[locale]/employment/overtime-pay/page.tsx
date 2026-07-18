import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocalizedOvertimePayPage } from "@/features/overtime-pay/components/localized-overtime-pay-page";
import type { OvertimePayLocale } from "@/features/overtime-pay/content";
import { createOvertimePayMetadata } from "@/features/overtime-pay/metadata";
const locales = ["ko", "en"] as const;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return locales.includes(locale as OvertimePayLocale)
    ? createOvertimePayMetadata(locale as OvertimePayLocale)
    : {};
}
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as OvertimePayLocale)) notFound();
  return <LocalizedOvertimePayPage locale={locale as OvertimePayLocale} />;
}
