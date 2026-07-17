"use client";

import { type FormEvent, useState } from "react";
import {
  PrimaryResults,
  compactCalculatorSettingsClass,
  dashboardCalculatorWorkspaceClass,
} from "@/components/calculators/calculator-workspace";
import { Button } from "@/components/ui/button";
import { AnimatedWon } from "@/features/compound-interest/components/animated-won";
import { useStableResultScroll } from "@/hooks/use-stable-result-scroll";
import { calculateMinimumWage, type MinimumWageResult } from "../calculate";
import { minimumWageContent, type MinimumWageLocale } from "../content";
import { validateMinimumWageHours } from "../validation";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-base tabular-nums outline-none placeholder:text-muted-foreground/70 focus-visible:ring-3 focus-visible:ring-ring/30 sm:text-sm";

export function MinimumWageCalculator({
  locale,
}: {
  locale: MinimumWageLocale;
}) {
  const copy = minimumWageContent[locale];
  const [hours, setHours] = useState("");
  const [includesPaidWeeklyHoliday, setIncludesPaidWeeklyHoliday] =
    useState(true);
  const [error, setError] = useState("");
  const [result, setResult] = useState<MinimumWageResult | null>(null);
  const [animationKey, setAnimationKey] = useState(0);
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result);

  function submit(event: FormEvent) {
    event.preventDefault();
    const weeklyHours = validateMinimumWageHours(hours);
    if (!weeklyHours) {
      setError(copy.error);
      return;
    }
    setError("");
    requestResultScroll();
    setResult(calculateMinimumWage({ weeklyHours, includesPaidWeeklyHoliday }));
    setAnimationKey((value) => value + 1);
  }

  function reset() {
    cancelResultScroll();
    setHours("");
    setIncludesPaidWeeklyHoliday(true);
    setError("");
    setResult(null);
  }

  return (
    <section aria-labelledby="minimum-wage-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2
            id="minimum-wage-input-title"
            className="mt-1 text-xl font-semibold"
          >
            {copy.input}
          </h2>
          {error ? (
            <p
              role="alert"
              className="mt-3 rounded-lg border border-destructive/30 p-3 text-sm text-destructive"
            >
              {error}
            </p>
          ) : null}
          <label className="mt-4 block text-sm font-medium">
            {copy.weeklyHours}
            <input
              inputMode="decimal"
              value={hours}
              placeholder={locale === "ko" ? "예: 40" : "e.g. 40"}
              onChange={(event) => setHours(event.target.value)}
              className={fieldClass}
            />
          </label>
          <label className="mt-4 flex min-h-11 items-center gap-2 rounded-lg border px-3 text-sm">
            <input
              type="checkbox"
              checked={includesPaidWeeklyHoliday}
              onChange={(event) =>
                setIncludesPaidWeeklyHoliday(event.target.checked)
              }
            />
            {copy.holiday}
          </label>
          <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
            <Button type="submit">{copy.calculate}</Button>
            <Button type="button" variant="outline" onClick={reset}>
              {copy.reset}
            </Button>
          </div>
        </form>
        <section
          ref={resultRef}
          aria-labelledby="minimum-wage-result-title"
          className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
        >
          <h2 id="minimum-wage-result-title" className="text-xl font-semibold">
            {copy.result}
          </h2>
          <PrimaryResults
            metrics={[
              {
                label: copy.hourly,
                value: (
                  <AnimatedWon
                    value={result?.hourlyMinimum ?? null}
                    animationKey={animationKey}
                  />
                ),
                featured: true,
              },
              {
                label: copy.weekly,
                value: (
                  <AnimatedWon
                    value={result?.weeklyMinimum ?? null}
                    animationKey={animationKey}
                  />
                ),
              },
              {
                label: copy.monthly,
                value: (
                  <AnimatedWon
                    value={result?.monthlyMinimum ?? null}
                    animationKey={animationKey}
                  />
                ),
              },
            ]}
          />
          <p className="mt-3 text-sm text-muted-foreground">
            {result ? copy.resultNote : copy.description}
          </p>
        </section>
      </div>
    </section>
  );
}
