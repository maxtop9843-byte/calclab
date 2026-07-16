import { notFound } from "next/navigation";

import { isCompoundLocale } from "@/features/compound-interest/i18n";
import { LocalizedDepositPage } from "@/features/deposit/components/localized-deposit-page";
import { createDepositMetadata } from "@/features/deposit/metadata";

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isCompoundLocale(locale)) return {};
  return createDepositMetadata(locale);
}
export default async function FixedDepositPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isCompoundLocale(locale)) notFound();
  return <LocalizedDepositPage locale={locale} />;
}
