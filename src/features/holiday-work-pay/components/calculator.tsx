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
import { formatMoneyInput } from "@/lib/input/money";
import { calculateHolidayWorkPay, type HolidayWorkResult } from "../calculate";
import { content, type Locale } from "../content";
import { validateHolidayWorkPay } from "../validation";
const cls = "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-base";
export function HolidayWorkPayCalculator({ locale }: { locale: Locale }) {
  const c = content[locale],
    [w, setW] = useState(""),
    [h, setH] = useState(""),
    [r, setR] = useState("50"),
    [e, setE] = useState<Record<string, string>>({}),
    [x, setX] = useState<HolidayWorkResult | null>(null),
    [k, setK] = useState(0);
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(x);
  function submit(ev: FormEvent) {
    ev.preventDefault();
    const q = validateHolidayWorkPay(
      { hourlyWage: w, holidayHours: h, premiumRate: r },
      locale,
    );
    setE(q.errors);
    if (!q.data) return;
    requestResultScroll();
    setX(calculateHolidayWorkPay(q.data));
    setK((v) => v + 1);
  }
  return (
    <section>
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          className={compactCalculatorSettingsClass}
        >
          <h1 className="text-xl font-semibold">{c.input}</h1>
          {Object.keys(e).length ? <p role="alert">{c.error}</p> : null}
          <F l={c.wage} v={w} ch={(v) => setW(formatMoneyInput(v, w))} />
          <F l={c.hours} v={h} ch={setH} />
          <F l={c.rate} v={r} ch={setR} />
          <div className="mt-4 flex gap-2">
            <Button type="submit">{c.calculate}</Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                cancelResultScroll();
                setW("");
                setH("");
                setR("50");
                setX(null);
                setE({});
              }}
            >
              {c.reset}
            </Button>
          </div>
        </form>
        <section ref={resultRef} className="rounded-xl border bg-card p-4">
          <PrimaryResults
            metrics={[
              {
                label: c.total,
                value: (
                  <AnimatedWon value={x?.totalPay ?? null} animationKey={k} />
                ),
                featured: true,
              },
              {
                label: c.base,
                value: (
                  <AnimatedWon value={x?.basePay ?? null} animationKey={k} />
                ),
              },
              {
                label: c.premium,
                value: (
                  <AnimatedWon value={x?.premiumPay ?? null} animationKey={k} />
                ),
              },
            ]}
          />
          <p>{c.note}</p>
          <details open>
            <summary>{c.details}</summary>
            <p>{x ? `${x.holidayHours}h · ${x.premiumRate}%` : c.empty}</p>
          </details>
        </section>
      </div>
    </section>
  );
}
function F({ l, v, ch }: { l: string; v: string; ch: (v: string) => void }) {
  return (
    <label className="mt-4 block">
      {l}
      <input
        className={cls}
        value={v}
        inputMode="decimal"
        onChange={(e) => ch(e.target.value)}
      />
    </label>
  );
}
