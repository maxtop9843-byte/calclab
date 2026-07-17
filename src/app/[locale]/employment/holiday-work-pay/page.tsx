import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HolidayWorkPayCalculator } from "@/features/holiday-work-pay/components/calculator";
import { content, type Locale } from "@/features/holiday-work-pay/content";
import { createMetadata } from "@/features/holiday-work-pay/metadata";
import {
  createPageStructuredData,
  JsonLdScript,
} from "@/lib/seo/structured-data";
const locales = ["ko", "en"] as const;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return locales.includes(locale as Locale)
    ? createMetadata(locale as Locale)
    : {};
}
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const c = content[locale as Locale],
    path = `/${locale}/employment/holiday-work-pay`;
  return (
    <main id="main-content" className="flex-1">
      <JsonLdScript
        data={createPageStructuredData({
          name: c.title,
          description: c.description,
          path,
          locale: locale as Locale,
          breadcrumbs: [
            { name: locale === "ko" ? "홈" : "Home", path: "/" },
            { name: c.title, path },
          ],
        })}
      />
      <div className="mx-auto w-full max-w-[1440px] px-5 py-8">
        <h1 className="text-4xl font-semibold">{c.title}</h1>
        <p>{c.description}</p>
        <div className="mt-6">
          <HolidayWorkPayCalculator locale={locale as Locale} />
        </div>
      </div>
    </main>
  );
}
